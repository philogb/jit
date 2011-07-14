var dist = $jit.util.dist = function(p1, p2) {
	var dx = p1.x - p2.x;
	var dy = p1.y - p2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Tests whether all points are in a polygon
 */
var pointInPolygon = $jit.util.pointInPolygon = function(pts, polygon) {
	if (polygon.length < 3)
		return false;
	var conj = [];
	$jit.util.each(pts, function() {
				conj.push(0);
			});
	for (var i = 0; i < polygon.length; i++) {
		var start = polygon[i];
		var stop = polygon[i + 1] || polygon[0];
		$jit.util.each(pts, function(pos, i) {
					if (start.y >= pos.y && stop.y < pos.y || start.y <= pos.y
							&& stop.y > pos.y) {
						// find inversed k
						var k = (stop.x - start.x) / (stop.y - start.y);
						var cx = (pos.y - start.y) * k + start.x;
						if (cx == pos.x)
							return true;
						else if (cx > pos.x)
							conj[i]++;
					}
					return true;
				});
	}
	conj = $jit.util.map(conj, function(conjs) {
				return conjs % 2 != 0;
			});
	return conj;
};

/**
 * Counter-clockwise is positive.
 * 
 * @param p1,
 *            p2, p3 [x,y]
 */
var cross = $jit.util.cross = function(p1, p2, p3) {
	return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

/**
 * Reserves those l[0],l[1],c[i] is counter-clockwise
 * 
 * @param convex
 *            [p1,p2,...]
 * @param l
 *            [p1,p2] as a ex line
 */
var convexCut = $jit.util.convexCut = function(convex, l, attached) {
	if (convex.length < 3)
		return [];
	var result = [];
	for (var i = 0; i < convex.length; i++) {
		var start = convex[i];
		var stop = convex[i + 1] || convex[0];
		if (start.x == stop.x && start.y == stop.y)
			continue;
		var c1, c2;
		if ((c1 = cross(l[0], l[1], start)) > 0) {
			if ((c2 = cross(l[0], l[1], stop)) >= 0) {
				result.push(stop);
			} else {
				var sc = c1 / (c1 - c2);
				if (c1 - c2) {
					var cut = $C((stop.x - start.x) * sc + start.x,
							(stop.y - start.y) * sc + start.y);
					cut.attached = attached;
					result.push(cut);
				}
			}
		} else {
			if ((c2 = cross(l[0], l[1], stop)) > 0) {
				var sc = c1 / (c1 - c2);
				var cut = $C((stop.x - start.x) * sc + start.x,
						(stop.y - start.y) * sc + start.y);
				cut.attached = start.attached;
				result.push(cut);
				result.push(stop);
			} else if (c2 == 0) {
				if (c1)
					result.push(stop);
			}
		}
	}
	return result;
}

var area = $jit.util.area = function(p) {
	if (p.length < 3)
		return 0;
	var sum = 0;
	for (var i = 2; i < p.length; i++) {
		sum += cross(p[0], p[i - 1], p[i]);
	}
	return sum * 0.5;
}

var circum = $jit.util.circum = function(p) {
	var circ = 0;
	for (var i = 1; i < p.length; i++) {
		var dx = p[i].x - p[i - 1].x;
		var dy = p[i].y - p[i - 1].y;
		circ += Math.sqrt(dx * dx + dy * dy);
	}
	return circ;
}

var convexIntersect = $jit.util.convexIntersect = function(c1, c2) {
	if (c1.length < 3)
		return [];
	if (c2.length < 3)
		return [];
	if (area(c1) < 0)
		c1.reverse();
	if (area(c2) < 0)
		c1.reverse();
	for (var i = 0; i < c2.length; i++) {
		var start = c2[i];
		var stop = c2[i + 1] || c2[0];
		c1 = convexCut(c1, [start, stop]);
	}
	return c1;
};

var bisector = $jit.util.bisector = function(p1, p2) {
	return [2 * (p2.x - p1.x), 2 * (p2.y - p1.y),
			-(p2.x * p2.x - p1.x * p1.x + p2.y * p2.y - p1.y * p1.y)];
};

var intersection = $jit.util.intersection = function(l1, l2) {
	var det = l1[0] * l2[1] - l1[1] * l2[0];
	if (det == 0)
		if (l1[0] * l2[2] - l1[2] * l2[0] == 0)
			return l1;
		else
			return null;
	return new $jit.Complex(-(l1[2] * l2[1] - l1[1] * l2[2]) / det, -(l1[0]
					* l2[2] - l1[2] * l2[0])
					/ det);
};

var getExtent = $jit.util.getExtent = function(bound) {
	if (!bound[0])
		return [0, 0, 0, 0];
	var l = bound[0].x, t = bound[0].y, r = l, b = t;
	$jit.util.each(bound, function(p) {
				if (l > p.x)
					l = p.x;
				if (t > p.y)
					t = p.y;
				if (r < p.x)
					r = p.x;
				if (b < p.y)
					b = p.y;
			});
	return [l, t, r, b];
};

var offsetLine = $jit.util.offsetLine = function(l, offset) {
	var dx = l[1].x - l[0].x;
	var dy = l[1].y - l[0].y;
	var r = dx * dx + dy * dy;
	r = Math.sqrt(r);
	r = offset / r;
	dx *= r;
	dy *= r;
	return [$C(l[0].x - dy, l[0].y + dx), $C(l[1].x - dy, l[1].y + dx)];
};

var intersectionSeg = $jit.util.intersectionSeg = function(l1, l2) {
	var c1 = cross(l1[0], l2[0], l2[1]);
	var c2 = cross(l1[1], l2[0], l2[1]);
	if (c1 == c2)
		return null;
	var k = c1 / (c1 - c2);
	return $C(k * (l1[1].x - l1[0].x) + l1[0].x, k * (l1[1].y - l1[0].y)
					+ l1[0].y);
};

var centroid3 = $jit.util.centroid3 = function(triangle) {
	return $C((triangle[0].x + triangle[1].x + triangle[2].x) * 0.333333333333,
			(triangle[0].y + triangle[1].y + triangle[2].y) * 0.333333333333);
};

var centroid = $jit.util.centroid = function(convex) {
	if (convex.length == 1)
		return convex[0];
	var c3s = $C(0, 0);
	if (convex.area)
		c3s.area = convex.area;
	var total = 0;
	for (var i = 2; i < convex.length; i++) {
		var a = area([convex[0], convex[i - 1], convex[i]]);
		if (Math.abs(a) > 1e-5) {
			var c3 = centroid3([convex[0], convex[i - 1], convex[i]]);
			total += a;
			c3s.x += a * c3.x;
			c3s.y += a * c3.y;
		}
	}
	if (total == 0)
		debugger;
	total = 1 / total;
	c3s.x *= total;
	c3s.y *= total;
	return c3s;
};

var inversed = function(l) {
	var dx = l.line[1].x - l.line[0].x;
	var cdx = l.cline[1].x - l.cline[0].x;
	if (dx == cdx && dx == 0) {
		var dy = l.line[1].y - l.line[0].y;
		var cdy = l.cline[1].y - l.cline[0].y;
		return ((dy > 0) ^ (cdy > 0));
	} else
		return ((dx > 0) ^ (cdx > 0));
};

var offsetConvex = $jit.util.offsetConvex = function(convex, offset) {
	if (convex.length < 3)
		return [];
	if (area(convex) < 0)
		convex.reverse();
	var last_line, first_line, cnt = 0;
	// Offset edges
	for (var i = 0; i < convex.length; i++) {
		var start = convex[i];
		var stop = convex[i + 1] || convex[0];
		if (start.x == stop.x && start.y == stop.y)
			continue;
		var line = {
			line : offsetLine([start, stop], -offset),
			cline : [-1, -1]
		};
		line.prev = last_line;
		if (last_line)
			last_line.next = line;
		else
			first_line = line;
		last_line = line;
		cnt++;
	}
	last_line.next = first_line;
	first_line.prev = last_line;

	if (cnt < 3)
		return [];
	// Connect all the edges
	for (var start = first_line, stop = start.next; true; start = stop, stop = stop.next) {
		var inters = intersectionSeg(start.line, stop.line);
		stop.cline[0] = start.cline[1] = inters;
		if (stop == first_line)
			break;
	}
	var result = [];
	result.push(first_line.cline[1]);
	for (var i = first_line.next; i != first_line; i = i.next) {
		result.push(i.cline[1]);
	}
	return result.filter(function(d) {
				return !!d;
			});
};

var randPointInTriangle = $jit.util.randPointInTriangle = function(t) {
	var x = Math.random();
	var y = Math.random();
	if (x + y > 1) {
		x = 1 - x;
		y = 1 - y;
	}
	var dx1 = t[1].x - t[0].x;
	var dy1 = t[1].y - t[0].y;
	var dx2 = t[2].x - t[0].x;
	var dy2 = t[2].y - t[0].y;
	return $C(t[0].x + dx1 * x + dx2 * y, t[0].y + dy1 * x + dy2 * y);
}

var randPointInPolygon = $jit.util.randPointInPolygon = function(polygon) {
	if (polygon.length == 1)
		return polygon[0];
	if (polygon.length == 2) {
		var la = Math.random();
		return $C(polygon[0].x + la * (polygon[1].x - polygon[0].x),
				polygon[0].y + la * (polygon[1].y - polygon[0].y));
	}
	var odds = [];
	var area = 0;
	for (var i = 2; i < polygon.length; i++) {
		var a = cross(polygon[0], polygon[i - 1], polygon[i]);
		area += a;
		odds.push(a);
	}
	odds.forEach(function(o, i) {
				odds[i] = o / area;
			});
	var o = Math.random();
	for (var i = 0; i < polygon.length - 2; i++) {
		if (o < odds[i])
			return randPointInTriangle([polygon[0], polygon[i + 1],
					polygon[i + 2]]);
		o -= odds[i];
	}
	return randPointInTriangle([polygon[0], polygon[polygon.length - 2],
			polygon[polygon.length - 1]]);
}

function polarComp(base) {
	return function(p, q) {
		if (p == base)
			return -1;
		if (q == base)
			return 1;
		var cm = cross(base, p, q);
		if (cm == 0) {
			if (!p.__distBase) {
				var dxp = base.x - p.x;
				var dyp = base.y - p.y;
				p.__distBase = [dxp * dxp + dyp * dyp];
			}
			if (!q.__distBase) {
				var dxq = base.x - q.x;
				var dyq = base.y - q.y;
				q.__distBase = [dxq * dxq + dyq * dyq];
			}
			if (p.__distBase[0] < q.__distBase[0])
				return -1;
			else if (p.__distBase[0] == q.__distBase[0])
				return 0;
			else
				return 1;
		} else if (cm > 0)
			return -1;
		else if (cm < 0)
			return 1;
	}
};

/**
 * 
 * @param sites
 *            {[Array}
 */
function convexHull(sites) {
	var stack_top = 0;
	for (var i = 1; i < sites.length; i++) {
		if (sites[i].y < sites[0].y
				|| (sites[i].y == sites[0].y && sites[i].x < sites[0].x)) {
			var temp = sites[i];
			sites[i] = sites[0];
			sites[0] = temp;
		}
	}
	var base = sites[0];
	sites.sort(polarComp(base));
	var result = [sites[0], sites[1]];
	stack_top = 1;
	for (var i = 2; i < N; i++) {
		while (stack_top
				&& cross(result[stack_top - 1], result[stack_top], sites[i]) <= 0)
			stack_top--;
		result[++stack_top] = sites[i];
	}
	return result.slice(stack_top + 1);
}
$jit.util.convexHull = convexHull;

/**
 * Classic binary heap that pops the minimum element when Heap.compare is
 * defined as a "<" operator.
 * 
 * @param {Array}
 *            array
 * @param {Function}
 *            compare
 */
function Heap(array, compare) {
	if (compare)
		this.compare = compare;
	if (array) {
		this.array = array.slice(0);
		this.heapify();
	}
}

Heap.prototype = {
	/**
	 * 
	 * @type {Array}
	 */
	array : [],
	/**
	 * 
	 * @return {Boolean}
	 */
	empty : function() {
		return this.array.length > 0;
	},
	/**
	 * 
	 * @param {Any}
	 *            a
	 * @param {Any}
	 *            b
	 * @return {Boolean}
	 */
	compare : function(a, b) {
		return a < b;
	},
	min : function() {
		return this.array[0];
	},
	heapify : function() {
		var array = this.array;
		for (var i = array.length >> 1; i >= 0; i--) {
			var curr = i, c = array[curr];
			do {
				var l = (curr << 1) + 1, r = (curr << 1) + 2, tar, tarEl;
				if (l < array.length) {
					if (r < array.length && this.compare(array[r], array[l]))
						tar = r;
					else
						tar = l;
					tarEl = array[tar];
				} else {
					array[curr] = c;
					break;
				}
				if (this.compare(tarEl, c)) {
					array[curr] = tarEl;
					curr = tar;
				} else {
					array[curr] = c;
					break;
				}
			} while (true);
		}
	},
	/**
	 * 
	 * @param {Any}
	 *            el
	 */
	push : function(el) {
		this.array.push(el);
		this.adjustUp();
	},
	pop : function() {
		var el = this.array[0];
		this.array[0] = this.array.pop();
		this.adjustDown();
		return el;
	},
	peek : function() {
		return this.array[0];
	},
	adjustUp : function() {
		var pos = this.array.length - 1;
		var parent = (pos - 1) >> 1;
		var curr = this.array[pos];
		while (pos > 0 && this.compare(curr, this.array[parent])) {
			this.array[pos] = this.array[parent];
			pos = parent;
			parent = (pos - 1) >> 1;
		}
		this.array[pos] = curr;
	},
	adjustDown : function(start) {
		var pos = start || 0;
		var c = this.array[pos];
		while (pos < this.array.length) {
			var ch1 = ((pos << 1) + 1), ch2 = ((pos << 1) + 2), ch, nc, nc1, nc2;
			if (ch1 < this.array.length) {
				if (ch2 < this.array.length
						&& this.compare(nc2 = this.array[ch2],
								nc1 = this.array[ch1])) {
					ch = ch2;
					nc = nc2;
				} else {
					ch = ch1;
					nc = nc1;
				}
			} else {
				this.array[pos] = c;
				break;
			}

			if (this.compare(nc, c)) {
				this.array[pos] = nc;
				pos = ch;
			} else {
				break;
			}
		}
	}
};
$jit.util.Heap = Heap;

var Set = $jit.util.Set;

/**
 * Circumcenter of triangle
 * 
 * @param {Array}
 *            triangle The triangle
 * @return {Complex}
 */

function circumcenter(triangle) {
	var bx = tria[1].x - tria[0].x, by = tria[1].y - tria[0].y, bl = bx * bx
			+ by * by, cx = tria[2].x - tria[0].x, cy = tria[2].y - tria[0].y, cl = cx
			* cx + cy * cy, d = 2 * (bx * cy - by * cx), x = cy * bl - by * cl, y = bx
			* cl - cx * bl;
	return $C(x / d + tria[0].x, y / d + tria[0].y);
}

/**
 * 
 * @param {Complex}
 *            p1
 * @param {Complex}
 *            p2
 * @param {number}
 *            y
 */
function hyperbola(p1, p2) {
	// TODO : finish this
	if (p1.x == p2.x) {
		var my = (p1.y + p2.y) * 0.5;
		return [function(x) {
					return my;
				}, function(x) {
					return my;
				}];

	} else {
		var l = -(p1.y - p2.y) / (p1.x - p2.x);
		var mx = (p1.x + p2.x) * 0.5;
		var my = (p1.y + p2.y) * 0.5;
		var d = mx - l * my;
		return [function(x) {
					var b = (x - x1) * l - p1.y;
					var c = p1.x * p1.x + p2.y * p2.y - x * x * +2 * (x - p1.x)
							* d;
					var d = (b * b - c);
					return -b - Math.sqrt(d);
				}, function(x) {
					var b = (x - x1) * l - p1.y;
					var c = p1.x * p1.x + p2.y * p2.y - x * x * +2 * (x - p1.x)
							* d;
					var d = (b * b - c);
					return -b + Math.sqrt(d);
				}];

	}
	return;
}

/**
 * Unbounded fortune's algorithm
 * 
 * @param {Array}
 *            sites
 */
function fortune(sites) {
	var q = new Heap(sites, function(s1, s2) {
				return s1.x < s2.x
						|| s1.x == s2.x
						&& (s1.y < s2.y || s1.y == s2.y && s1.sites
								&& !s2.sites);
			});
	var x = q.peek().x;
	var regions = new Set([q.pop(), null, $.lambda(-1e300)], [q.pop(), null,
					$.lambda(1e300)], function(bound1, bound2) {
				var b1 = bound1[2](x);
				var b2 = bound2[2](x);
				if (b1 < b2)
					return -1;
				else if (b1 > b2)
					return 1;
				return 0;
			});

	function findRegion(y) {
		if (regions.size == 1)
			return regions.first();
		return regions.find(y, function(b, y) {
					var b1 = b[2](x);
					var b2 = y;
					if (b1 < b2)
						return -1;
					else if (b1 > b2)
						return 1;
					return 0;
				});
	}
	
	for (var i = 0; i < q.array.length; i++) {
		q.array[i].site = true;
	}
	while (!q.empty()) {
		var w = q.pop();
		if (w.site) {
			// It's a site point
		} else {
			// It's a intersection
		}
	}
	return [];
}
$jit.util.fortune = fortune;