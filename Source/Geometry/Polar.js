/*
 * File: Polar.js
 * 
 * Defines the <Polar> class.
 *
 * Description:
 *
 * The <Polar> class, just like the <Complex> class, is used by the <Hypertree>, <ST> and <RGraph> as a 2D point representation.
 *
 * See also:
 *
 * <http://en.wikipedia.org/wiki/Polar_coordinates>
 *
*/

/*
   Class: Polar

   A multi purpose polar representation.

   Description:
 
   The <Polar> class, just like the <Complex> class, is used by the <Hypertree>, <ST> and <RGraph> as a 2D point representation.
 
   See also:
 
   <http://en.wikipedia.org/wiki/Polar_coordinates>
 
   Parameters:

      theta - An angle.
      rho - The norm.
*/

var Polar = function(theta, rho) {
  this.theta = theta || 0;
  this.rho = rho || 0;
};

$jit.Polar = Polar;

Polar.prototype = {
    /*
       Method: getc
    
       Returns a complex number.
    
       Parameters:

       simple - _optional_ If *true*, this method will return only an object holding x and y properties and not a <Complex> instance. Default's *false*.

      Returns:
    
          A complex number.
    */
    getc: function(simple) {
        return this.toComplex(simple);
    },

    /*
       Method: getp
    
       Returns a <Polar> representation.
    
       Returns:
    
          A variable in polar coordinates.
    */
    getp: function() {
        return this;
    },


    /*
       Method: set
    
       Sets a number.

       Parameters:

       v - A <Complex> or <Polar> instance.
    
    */
    set: function(v) {
        v = v.getp();
        this.theta = v.theta; this.rho = v.rho;
    },

    /*
       Method: setc
    
       Sets a <Complex> number.

       Parameters:

       x - A <Complex> number real part.
       y - A <Complex> number imaginary part.
    
    */
    setc: function(x, y) {
        this.rho = Math.sqrt(x * x + y * y);
        this.theta = Math.atan2(y, x);
        if(this.theta < 0) this.theta += Math.PI * 2;
    },

    /*
       Method: setp
    
       Sets a polar number.

       Parameters:

       theta - A <Polar> number angle property.
       rho - A <Polar> number rho property.
    
    */
    setp: function(theta, rho) {
        this.theta = theta; 
        this.rho = rho;
    },

    /*
       Method: clone
    
       Returns a copy of the current object.
    
       Returns:
    
          A copy of the real object.
    */
    clone: function() {
        return new Polar(this.theta, this.rho);
    },

    /*
       Method: toComplex
    
        Translates from polar to cartesian coordinates and returns a new <Complex> instance.
    
        Parameters:

        simple - _optional_ If *true* this method will only return an object with x and y properties (and not the whole <Complex> instance). Default's *false*.
 
        Returns:
    
          A new <Complex> instance.
    */
    toComplex: function(simple) {
        var x = Math.cos(this.theta) * this.rho;
        var y = Math.sin(this.theta) * this.rho;
        if(simple) return { 'x': x, 'y': y};
        return new Complex(x, y);
    },

    /*
       Method: add
    
        Adds two <Polar> instances.
    
       Parameters:

       polar - A <Polar> number.

       Returns:
    
          A new Polar instance.
    */
    add: function(polar) {
        return new Polar(this.theta + polar.theta, this.rho + polar.rho);
    },
    
    /*
       Method: scale
    
        Scales a polar norm.
    
        Parameters:

        number - A scale factor.
        
        Returns:
    
          A new Polar instance.
    */
    scale: function(number) {
        return new Polar(this.theta, this.rho * number);
    },
    
    /*
       Method: equals
    
       Comparison method.

       Returns *true* if the theta and rho properties are equal.

       Parameters:

       c - A <Polar> number.

       Returns:

       *true* if the theta and rho parameters for these objects are equal. *false* otherwise.
    */
    equals: function(c) {
        return this.theta == c.theta && this.rho == c.rho;
    },
    
    /*
       Method: $add
    
        Adds two <Polar> instances affecting the current object.
    
       Paramters:

       polar - A <Polar> instance.

       Returns:
    
          The changed object.
    */
    $add: function(polar) {
        this.theta = this.theta + polar.theta; this.rho += polar.rho;
        return this;
    },

    /*
       Method: $madd
    
        Adds two <Polar> instances affecting the current object. The resulting theta angle is modulo 2pi.
    
       Parameters:

       polar - A <Polar> instance.

       Returns:
    
          The changed object.
    */
    $madd: function(polar) {
        this.theta = (this.theta + polar.theta) % (Math.PI * 2); this.rho += polar.rho;
        return this;
    },

    
    /*
       Method: $scale
    
        Scales a polar instance affecting the object.
    
      Parameters:

      number - A scaling factor.

      Returns:
    
          The changed object.
    */
    $scale: function(number) {
        this.rho *= number;
        return this;
    },
    
    /*
      Method: isZero
   
      Returns *true* if the number is zero.
   
   */
    isZero: function () {
      var almostZero = 0.0001, abs = Math.abs;
      return abs(this.theta) < almostZero && abs(this.rho) < almostZero;
    },

    /*
       Method: interpolate
    
        Calculates a polar interpolation between two points at a given delta moment.

        Parameters:
      
        elem - A <Polar> instance.
        delta - A delta factor ranging [0, 1].
    
       Returns:
    
          A new <Polar> instance representing an interpolation between _this_ and _elem_
    */
    interpolate: function(elem, delta) {
        var pi = Math.PI, pi2 = pi * 2;
        var ch = function(t) {
            var a =  (t < 0)? (t % pi2) + pi2 : t % pi2;
            return a;
        };
        var tt = this.theta, et = elem.theta;
        var sum, diff = Math.abs(tt - et);
        if(diff == pi) {
          if(tt > et) {
            sum = ch((et + ((tt - pi2) - et) * delta)) ;
          } else {
            sum = ch((et - pi2 + (tt - (et)) * delta));
          }
        } else if(diff >= pi) {
          if(tt > et) {
            sum = ch((et + ((tt - pi2) - et) * delta)) ;
          } else {
            sum = ch((et - pi2 + (tt - (et - pi2)) * delta));
          }
        } else {  
          sum = ch((et + (tt - et) * delta)) ;
        }
        var r = (this.rho - elem.rho) * delta + elem.rho;
        return {
          'theta': sum,
          'rho': r
        };
    }
};


var $P = function(a, b) { return new Polar(a, b); };

Polar.KER = $P(0, 0);

