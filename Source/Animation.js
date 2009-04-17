/*
 * File: Animation.js
 * 
 * Author: Nicolas Garcia Belmonte
 * 
 * Copyright: Copyright 2008-2009 by Nicolas Garcia Belmonte.
 * 
 * License: BSD License
 * 
 * Homepage: <http://thejit.org>
 * 
 * Version: 1.0.8a
 *
*/

/*
   Object: Trans
    
     An object containing multiple type of transformations. Based on the mootools library <http://mootools.net>.

*/
this.Trans = {
    linear: function(p) { return p; }
};

(function() {

	var makeTrans = function(transition, params){
	    params = $splat(params);
	    return $extend(transition, {
	        easeIn: function(pos){
	            return transition(pos, params);
	        },
	        easeOut: function(pos){
	            return 1 - transition(1 - pos, params);
	        },
	        easeInOut: function(pos){
	            return (pos <= 0.5) ? transition(2 * pos, params) / 2 : (2 - transition(2 * (1 - pos), params)) / 2;
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
	        for (var a = 0, b = 1; 1; a += b, b /= 2){
	            if (p >= (7 - 4 * a) / 11){
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
	
	$each(transitions, function(val, key) {
		Trans[key] = makeTrans(val);
	});

	$each(['Quad', 'Cubic', 'Quart', 'Quint'], function(elem, i) {
		Trans[elem] = makeTrans(function(p){
            return Math.pow(p, [i + 2]);
        });
	});
	
})();

/*
   Class: Animation
    
   A Class that can perform graph animations. Based on Fx.Base from Mootools: <http://mootools.net>.

*/

var Animation = new Class({

    initalize: function(options) {
	   this.setOptions(options);
	},
	
	setOptions: function(options) {
        var opt = {
            duration: 2500,
            fps: 40,
            transition: Trans.Quart.easeInOut,
            compute: $empty,
            complete: $empty
        };
        this.opt = $merge(opt, options || {});
		return this;
	},
	
	getTime: function() {
        return $time();
    },
    
    step: function(){
        var time = this.getTime(), opt = this.opt;
        if (time < this.time + opt.duration){
            var delta = opt.transition((time - this.time) / opt.duration);
            opt.compute(delta);
        } else {
            this.timer = clearInterval(this.timer);
            opt.compute(1);
            opt.complete();
        }
    },

    start: function(){
        this.time = 0;
        this.startTimer();
        return this;
    },

    startTimer: function(){
		var that = this, opt = this.opt;
        if (this.timer) return false;
        this.time = this.getTime() - this.time;
        this.timer = setInterval((function () { that.step(); }), Math.round(1000 / opt.fps));
        return true;
    }
});

