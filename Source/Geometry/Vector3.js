/*
 * Vector3 class based on three.js http://github.com/mrdoob/three.js, Copyright (c) Mr.doob http://mrdoob.com/, MIT License http://github.com/mrdoob/three.js/blob/master/LICENSE 
 */

var Vector3 = function(x, y, z) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};

$jit.Vector3 = Vector3;

Vector3.prototype = {
  set: function(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
  },

  setc: function(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	},
	
	getc: function() {
	  return this;
	},
	
	//TODO(nico): getp

	add: function(v1, v2) {
		this.x = v1.x + v2.x;
		this.y = v1.y + v2.y;
		this.z = v1.z + v2.z;
		return this;
	},

	$add: function(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	},

	addScalar: function(s) {
		this.x += s;
		this.y += s;
		this.z += s;
		return this;
	},

	sub: function(v1, v2) {
		this.x = v1.x - v2.x;
		this.y = v1.y - v2.y;
		this.z = v1.z - v2.z;
		return this;
	},

	$sub: function(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	},

	cross: function(v1, v2) {
		this.x = v1.y * v2.z - v1.z * v2.y;
		this.y = v1.z * v2.x - v1.x * v2.z;
		this.z = v1.x * v2.y - v1.y * v2.x;
		return this;
	},

	$cross: function(v) {
		var tx = this.x, ty = this.y, tz = this.z;

		this.x = ty * v.z - tz * v.y;
		this.y = tz * v.x - tx * v.z;
		this.z = tx * v.y - ty * v.x;
		return this;
	},

	$multiply: function(v) {
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		return this;
	},

	$scale: function(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
		return this;
	},

	dot: function(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},

	distanceTo: function(v) {
		return Math.sqrt(this.distanceToSquared(v));
	},

	distanceToSquared: function(v) {
		var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
		return dx * dx + dy * dy + dz * dz;
	},

	norm: function() {
		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
	},

	normSquared: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	},

	negate: function() {
		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;
		return this;
	},

	normalize: function() {
	  var len = this.norm();
		if ( len > 0 ) {
			this.$scale(1 / len);
		} 
		return this;
	},

	isZero: function() {
		var almostZero = 0.0001,
		    abs = Math.abs;
		
		return abs(this.x) < almostZero && abs(this.y) < almostZero && abs(this.z) < almostZero;
	},

	clone: function() {
		return new Vector3(this.x, this.y, this.z);
	}
};

var $V3 = function(a, b, c) { return new Vector3(a, b, c); };