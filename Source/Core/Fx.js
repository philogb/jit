var Animation;
(function() {

  //Utility functions
  function $(d) {
    return document.getElementById(d);
  }

  $.empty = function() {};

  $.time = Date.now;

  $.uid = (function() {
    var t = $.time();

    return function() {
      return t++;
    };
  })();

  $.extend = function(to, from) {
    for (var p in from) {
      to[p] = from[p];
    }
    return to;
  };

  $.type = (function() {
    var oString = Object.prototype.toString,
        type = function(e) {
          var t = oString.call(e);
          return t.substr(8, t.length - 9).toLowerCase();
        };

    return function(elem) {
      var elemType = type(elem);
      if (elemType != 'object') {
        return elemType;
      }
      if (elem.$$family) return elem.$$family;
      return (elem && elem.nodeName && elem.nodeType == 1) ? 'element' : elemType;
    };
  })();

  (function() {
    function detach(elem) {
      var type = $.type(elem), ans;
      if (type == 'object') {
        ans = {};
        for (var p in elem) {
          ans[p] = detach(elem[p]);
        }
        return ans;
      } else if (type == 'array') {
        ans = [];
        for (var i = 0, l = elem.length; i < l; i++) {
          ans[i] = detach(elem[i]);
        }
        return ans;
      } else {
        return elem;
      }
    }

    $.merge = function() {
      var mix = {};
      for (var i = 0, l = arguments.length; i < l; i++){
          var object = arguments[i];
          if ($.type(object) != 'object') continue;
          for (var key in object){
              var op = object[key], mp = mix[key];
              if (mp && $.type(op) == 'object' && $.type(mp) == 'object') {
                mix[key] = $.merge(mp, op);
              } else{
                mix[key] = detach(op);
              }
          }
      }
      return mix;
    };
  })();

  $.splat = (function() {
    var isArray = Array.isArray;
    return function(a) {
      return isArray(a) && a || [a];
    };
  })();

  //Timer based animation
  Animation = function(options) {
      this.opt = $.merge({
        delay: 0,
        duration: 1000,
        transition: function(x) { return x; },
        compute: $.empty,
        complete: $.empty
      }, options || {});
  };

  var Queue = Animation.Queue = [];

  Animation.prototype = {
    time:null,

    start: function(options) {
      this.opt = $.merge(this.opt, options || {});
      this.time = $.time();
      this.animating = true;
      Queue.push(this);
    },

    setOptions: function(options) {
      this.opt = $.merge(this.opt, options || {});
      return this;
    },

    pause: function() {
      this.animating = false;
    },

    stopTimer: function() {
      this.animating = false;
    },

    //perform a step in the animation
    step: function() {
      //if not animating, then return
      if (!this.animating) return;
      var currentTime = $.time(),
          time = this.time,
          opt = this.opt,
          delay = opt.delay,
          duration = opt.duration,
          delta = 0;
      //hold animation for the delay
      if (currentTime < time + delay) {
        opt.compute.call(this, delta);
        return;
      }
      //if in our time window, then execute animation
      if (currentTime < time + delay + duration) {
        delta = opt.transition((currentTime - time - delay) / duration);
        opt.compute.call(this, delta);
      } else {
        this.animating = false;
        opt.compute.call(this, 1);
        opt.complete.call(this);
      }
    }
  };

  Animation.compute = function(from, to, delta) {
    return from + (to - from) * delta;
  };

  //Easing equations
  Animation.Transition = {
    linear: function(p){
      return p;
    }
  };

  var Trans = $jit.Trans = Animation.Transition;

  (function(){

    var makeTrans = function(transition, params){
      params = $.splat(params);
      return $.extend(transition, {
        easeIn: function(pos){
          return transition(pos, params);
        },
        easeOut: function(pos){
          return 1 - transition(1 - pos, params);
        },
        easeInOut: function(pos){
          return (pos <= 0.5)? transition(2 * pos, params) / 2 : (2 - transition(
              2 * (1 - pos), params)) / 2;
        }
      });
    };

    var transitions = {

      Pow: function(p, x){
        return Math.pow(p, x[0] || 6);
      },

      Expo: function(p){
        return Math.pow(2, 8 * (p - 1));
      },

      Circ: function(p){
        return 1 - Math.sin(Math.acos(p));
      },

      Sine: function(p){
        return 1 - Math.sin((1 - p) * Math.PI / 2);
      },

      Back: function(p, x){
        x = x[0] || 1.618;
        return Math.pow(p, 2) * ((x + 1) * p - x);
      },

      Bounce: function(p){
        var value;
        for ( var a = 0, b = 1; 1; a += b, b /= 2) {
          if (p >= (7 - 4 * a) / 11) {
            value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
            break;
          }
        }
        return value;
      },

      Elastic: function(p, x){
        return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
      }

    };

    for (var t in transitions) {
      Trans[t] = makeTrans(transitions[t]);
    }

    ['Quad', 'Cubic', 'Quart', 'Quint'].forEach(function(elem, i){
      Trans[elem] = makeTrans(function(p){
        return Math.pow(p, [
          i + 2
        ]);
      });
    });

  })();

  //animationTime - function branching
  var global = self || window,
      checkFxQueue = function() {
        var oldQueue = Queue;
        Queue = [];
        if (oldQueue.length) {
          for (var i = 0, l = oldQueue.length, fx; i < l; i++) {
            fx = oldQueue[i];
            fx.step();
            if (fx.animating) {
              Queue.push(fx);
            }
          }
          Animation.Queue = Queue;
        }
      };

  if (global) {
    var found = false;
    ['webkitAnimationTime', 'mozAnimationTime', 'animationTime',
     'webkitAnimationStartTime', 'mozAnimationStartTime', 'animationStartTime'].forEach(function(impl) {
      if (impl in global) {
        Animation.animationTime = function() {
          return global[impl];
        };
        found = true;
      }
    });
    if (!found) {
      Animation.animationTime = $.time;
    }
    //requestAnimationFrame - function branching
    found = false;
    ['webkitRequestAnimationFrame', 'mozRequestAnimationFrame', 'requestAnimationFrame'].forEach(function(impl) {
      if (impl in global) {
        Animation.requestAnimationFrame = function(callback) {
          global[impl](function() {
            checkFxQueue();
            callback();
          });
        };
        found = true;
      }
    });
    if (!found) {
      Animation.requestAnimationFrame = function(callback) {
        setTimeout(function() {
          checkFxQueue();
          callback();
        }, 1000 / 60);
      };
    }
  }

  (function loop() { Animation.requestAnimationFrame(loop); }());

}());
