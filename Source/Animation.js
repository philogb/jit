/*
 * File: Animation.js
 * 
 * Core <Animation> and <Trans> transition classes.
 *
*/

/*
   Object: Trans
    
     An object containing multiple type of transformations. 
     
     Based on:
         
     Easing and Transition animation methods are based in the MooTools Framework <http://mootools.net>. Copyright (c) 2006-2009 Valerio Proietti, <http://mad4milk.net/>. MIT license <http://mootools.net/license.txt>.

     Used by:

     <RGraph>, <Hypertree> and <ST> classes.

     Description:

     This object is used for specifying different animation transitions in the <RGraph>, <Hypertree> and <ST> classes.

     There are many different type of animation transitions.

     linear:

     Displays a linear transition

     >Trans.linear
     
     (see Linear.png)

     Quad:

     Displays a Quadratic transition.
  
     >Trans.Quad.easeIn
     >Trans.Quad.easeOut
     >Trans.Quad.easeInOut
     
    (see Quad.png)

    Cubic:

    Displays a Cubic transition.

    >Trans.Cubic.easeIn
    >Trans.Cubic.easeOut
    >Trans.Cubic.easeInOut

    (see Cubic.png)

    Quart:

    Displays a Quartetic transition.

    >Trans.Quart.easeIn
    >Trans.Quart.easeOut
    >Trans.Quart.easeInOut

    (see Quart.png)

    Quint:

    Displays a Quintic transition.

    >Trans.Quint.easeIn
    >Trans.Quint.easeOut
    >Trans.Quint.easeInOut

    (see Quint.png)

    Expo:

    Displays an Exponential transition.

    >Trans.Expo.easeIn
    >Trans.Expo.easeOut
    >Trans.Expo.easeInOut

    (see Expo.png)

    Circ:

    Displays a Circular transition.

    >Trans.Circ.easeIn
    >Trans.Circ.easeOut
    >Trans.Circ.easeInOut

    (see Circ.png)

    Sine:

    Displays a Sineousidal transition.

    >Trans.Sine.easeIn
    >Trans.Sine.easeOut
    >Trans.Sine.easeInOut

    (see Sine.png)

    Back:

    >Trans.Back.easeIn
    >Trans.Back.easeOut
    >Trans.Back.easeInOut

    (see Back.png)

    Bounce:

    Bouncy transition.

    >Trans.Bounce.easeIn
    >Trans.Bounce.easeOut
    >Trans.Bounce.easeInOut

    (see Bounce.png)

    Elastic:

    Elastic curve.

    >Trans.Elastic.easeIn
    >Trans.Elastic.easeOut
    >Trans.Elastic.easeInOut

    (see Elastic.png)



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
    
   A Class that can perform animations for generic objects.

   If you are looking for animation transitions please take a look at the <Trans> object.

   Used by:

   <Graph.Plot>
   
   Based on:
   
   The Animation class is based in the MooTools Framework <http://mootools.net>. Copyright (c) 2006-2009 Valerio Proietti, <http://mad4milk.net/>. MIT license <http://mootools.net/license.txt>.

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

