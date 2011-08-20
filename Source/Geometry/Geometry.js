$jit.geometry = {
  /**
   * The distance between two points
   * @param {Complex} p1
   * @param {Complex} p2
   */
  dist2 : function(p1, p2) {
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y;
    return dx * dx + dy * dy;
  },

  /**
   * The distance between two points
   * @param {Complex} p1
   * @param {Complex} p2
   */
  dist : function(p1, p2) {
    return Math.sqrt(Geometry.dist2(p1,p2));
  },

  /**
   *
   * @param {Complex} p1
   * @param {Complex} p2
   * @param {Number} weight
   * @return {Complex}
   */
  weightedPoint: function(p1, p2, weight) {
    return $C((p2.x - p1.x) * weight + p1.x, (p2.y -p1.y) * weight + p1.y);
  },

  /**
   *
   * @param {Complex} p1
   * @param {Complex} p2
   * @param {Complex} p3
   */
  weightOfPoint: function(p1, p2, p3) {
    return (p3.x - p1.x) / (p2.x - p1.x);
  },

  /**
   * Tests whether all points are in a polygon
   * @param {Complex[]} pts Points to be tested.
   * @param {Complex[]} polygon The Polygon.
   */
  pointInPolygon : function(pts, polygon) {
    if (!(pts instanceof Array)) {
      pts = [pts];
    }
    if (polygon.length < 3) {
      return false;
    }
    var conj = [], start, stop, k, cx;
    $jit.util.each(pts, function() {
      conj.push(0);
    });
    for (var i = 0; i < polygon.length; i++) {
      start = polygon[i];
      stop = polygon[i + 1] || polygon[0];
      $jit.util.each(pts, function(pos, i) {
        if (start.y >= pos.y && stop.y < pos.y ||
            start.y <= pos.y && stop.y > pos.y) {
          // find inverse k
          k = (stop.x - start.x) / (stop.y - start.y);
          cx = (pos.y - start.y) * k + start.x;
          if (cx == pos.x) {
            return true;
          } else if (cx > pos.x) {
            conj[i]++;
          }
        }
        return true;
      });
    }
    conj = $jit.util.map(conj, function(conjs) {
      return conjs % 2 != 0;
    });
    return conj;
  },

  /**
   * Counter-clockwise is positive.
   *
   * @param {Complex} p1
   * @param {Complex} p2
   * @param {Complex} p3
   */
  cross: function(p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
  },

  /**
   * Reserves those l[0],l[1],c[i] is counter-clockwise
   *
   * @param {Complex[]} convex
   * @param {Complex[]} l as a ex line
   * @param {?Object} attached
   */
  convexCut : function(convex, l, attached) {
    if (convex.length < 3) {
      return [];
    }
    var result = [], i = 0, start, stop, c1, c2, sc, cut;
    for (; i < convex.length; i++) {
      start = convex[i];
      stop = convex[i + 1] || convex[0];
      if (start.x == stop.x && start.y == stop.y)
        continue;
      if ((c1 = Geometry.cross(l[0], l[1], start)) > 0) {
        if ((c2 = Geometry.cross(l[0], l[1], stop)) >= 0) {
          result.push(stop);
        } else {
          if (c1 - c2 !== 0) {
            sc = c1 / (c1 - c2);
            cut = $C((stop.x - start.x) * sc + start.x,
                (stop.y - start.y) * sc + start.y);
            cut.attached = attached;
            result.push(cut);
          }
        }
      } else {
        if ((c2 = Geometry.cross(l[0], l[1], stop)) > 0) {
          sc = c1 / (c1 - c2);
          cut = $C((stop.x - start.x) * sc + start.x,
              (stop.y - start.y) * sc + start.y);
          cut.attached = start.attached;
          result.push(cut);
          result.push(stop);
        } else if (c2 == 0) {
          if (c1) {
            result.push(stop);
          }
        }
      }
    }
    return result;
  },

  /**
   * Get the area of polygon
   * @param {Complex[]} p The polygon
   */
  area : function(p) {
    if (p.length < 3) {
      return 0;
    }
    var sum = 0, i = 2;
    for (; i < p.length; i++) {
      sum += Geometry.cross(p[0], p[i - 1], p[i]);
    }
    return sum * 0.5;
  },

  /**
   * Get the circumeter of polygon
   * @param {Complex[]} p The polygon
   */
  circum : function(p) {
    var circ = 0, i = 1;
    for (; i < p.length; i++) {
      var dx = p[i].x - p[i - 1].x;
      var dy = p[i].y - p[i - 1].y;
      circ += Math.sqrt(dx * dx + dy * dy);
    }
    return circ;
  },

  /**
   * Intersect two polygons
   * @param {Complex[]} c1
   * @param {Complex[]} c2
   */
  convexIntersect : function(c1, c2) {
    if (c1.length < 3 || c2.length < 3) {
      return [];
    }
    if (Geometry.area(c1) < 0) {
      c1.reverse();
    }
    if (Geometry.area(c2) < 0) {
      c2.reverse();
    }
    var i = 0, start, stop;
    for (; i < c2.length; i++) {
      start = c2[i];
      stop = c2[i + 1] || c2[0];
      c1 = Geometry.convexCut(c1, [start, stop]);
    }
    return c1;
  },

  /**
   * The bisector of two point
   * @param {Complex} p1
   * @param {Complex} p2
   * @returns {Number[]}
   */
  bisector : function(p1, p2) {
    return [
      2 * (p2.x - p1.x),
      2 * (p2.y - p1.y),
      -(p2.x * p2.x - p1.x * p1.x + p2.y * p2.y - p1.y * p1.y)];
  },

  /**
   * Get the intersection of two lines
   * @param {Number[]} l1
   * @param {Number[]} l2
   * @returns {Complex}
   */
  intersection : function(l1, l2) {
    var det = l1[0] * l2[1] - l1[1] * l2[0];
    if (det == 0) {
      if (l1[0] * l2[2] - l1[2] * l2[0] == 0) {
        return l1;
      }
      else {
        return null;
      }
    }
    return $C(
        -(l1[2] * l2[1] - l1[1] * l2[2]) / det,
        -(l1[0] * l2[2] - l1[2] * l2[0]) / det);
  },

  /**
   * Get the extent of a series of points
   * @param {Complex[]} bound
   * @param {Number[]} Extent of points
   */
  getExtent : function(bound) {
    if (!bound[0])
      return [0, 0, 0, 0];
    var l = bound[0].x, t = bound[0].y, r = l, b = t;
    bound.each(function(p) {
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
  },

  /**
   * Offset a line.
   * @param {Complex[]} l
   * @param {Number} offset
   * @returns {Complex[]}
   */
  offsetLine : function(l, offset) {
    var dx = l[1].x - l[0].x,
        dy = l[1].y - l[0].y,
        r = dx * dx + dy * dy;
    r = Math.sqrt(r);
    r = offset / r;
    dx *= r;
    dy *= r;
    return [$C(l[0].x - dy, l[0].y + dx), $C(l[1].x - dy, l[1].y + dx)];
  },

  /**
   * The intersection of two segments
   * @param {Complex[]} l1
   * @param {Complex[]} l2
   * @param {Boolean} [constraint]
   * @returns {Complex}
   */
  intersectionSeg : function(l1, l2, constraint) {
    var c1 = Geometry.cross(l1[0], l2[0], l2[1]),
        c2 = Geometry.cross(l1[1], l2[0], l2[1]), k;
    if (c1 == c2) {
      return null;
    }
    k = c1 / (c1 - c2);
    if (constraint) {
      if (k < 0 || k > 1) {
        return null;
      }
      var c3 = Geometry.cross(l2[0], l1[0], l1[1]),
          c4 = Geometry.cross(l2[1], l1[0], l1[1]);
      if (c3 == c4) {
        return null;
      }
      var k2 = c3 / (c3 - c4);
      if (k2 < 0 || k2 > 1) {
        return null;
      }
    }
    return Geometry.weightedPoint(l1[0], l1[1], k);
  },

  /**
   * The centroid of triangle
   * @param {Complex[]} triangle
   */
  centroid3 : function(triangle) {
    return $C((triangle[0].x + triangle[1].x + triangle[2].x) * 0.333333333333,
        (triangle[0].y + triangle[1].y + triangle[2].y) * 0.333333333333);
  },

  /**
   *
   * @param {Complex[]} convex
   */
  centroid : function(convex) {
    if (convex.length == 1) {
      return convex[0];
    }
    var c3s = $C(0, 0), total = 0, i, area, c3;
    if (convex.area) {
      c3s.area = convex.area;
    }
    for (i = 2; i < convex.length; i++) {
      area = Geometry.area([convex[0], convex[i - 1], convex[i]]);
      if (Math.abs(area) > 1e-5) {
        c3 = Geometry.centroid3([convex[0], convex[i - 1], convex[i]]);
        total += area;
        c3s.x += area * c3.x;
        c3s.y += area * c3.y;
      }
    }
    total = 1 / total;
    c3s.x *= total;
    c3s.y *= total;
    return c3s;
  },

  inverse : function(l) {
    var dx = l.line[1].x - l.line[0].x,
        cdx = l.cline[1].x - l.cline[0].x, dy, cdy;
    if (dx == cdx && dx == 0) {
      dy = l.line[1].y - l.line[0].y;
      cdy = l.cline[1].y - l.cline[0].y;
      return ((dy > 0) ^ (cdy > 0));
    } else
      return ((dx > 0) ^ (cdx > 0));
  },

  offsetConvex : function(convex, offset) {
    if (convex.length < 3) {
      return [];
    }
    if (Geometry.area(convex) < 0) {
      convex.reverse();
    }

    var last_line = null, first_line = null, cnt = 0, i, start, stop, line, result;
    // Offset edges
    for (i = 0; i < convex.length; i++) {
      start = convex[i];
      stop = convex[i + 1] || convex[0];
      if (start.x == stop.x && start.y == stop.y) {
        continue;
      }
      line = {
        line : Geometry.offsetLine([start, stop], -offset),
        cline : [-1, -1]
      };
      line.prev = last_line;
      if (last_line) {
        last_line.next = line;
      }
      else {
        first_line = line;
      }
      last_line = line;
      cnt++;
    }
    last_line.next = first_line;
    first_line.prev = last_line;

    if (cnt < 3)
      return [];
    // Connect all the edges
    for (var start = first_line, stop = start.next; true; start = stop,stop = stop.next) {
      var inters = Geometry.intersectionSeg(start.line, stop.line);
      stop.cline[0] = start.cline[1] = inters;
      if (stop == first_line)
        break;
    }

    result = [];
    result.push(first_line.cline[1]);
    for (start = first_line.next; start != first_line; start = start.next) {
      result.push(start.cline[1]);
    }
    if (offset < 0) return Geometry.cleanConvexHull(result);
    return result;
  },

  cleanConvexHull: function(convex) {
    var last = convex[0], stack = [last], found = [], inter, np;
    for (var i = 1; i <= convex.length; i++) {
      var curr = convex[i] || convex[0];
      for (var j = stack.length - 1; j > 0; j --) {
        var p1 = stack[j], p2 = stack[j - 1];
        if (inter = Geometry.intersectionSeg([last, curr], [p1, p2], true)) {
          if(Geometry.area(np = [inter].concat(stack.slice(j))) > 0) {
            found.push(np);
          }
          stack.length = j;
          stack.push(inter);
        }
      }
      stack.push(curr);
      last = curr;
    }
    if (Geometry.area(stack)) found.push(stack);
    return found[0] || Geometry.centroid(convex);
  },

  randPointInTriangle : function(t) {
    var x = Math.random(),
        y = Math.random(),
        dx1, dy1, dx2, dy2;
    if (x + y > 1) {
      x = 1 - x;
      y = 1 - y;
    }
    dx1 = t[1].x - t[0].x;
    dy1 = t[1].y - t[0].y;
    dx2 = t[2].x - t[0].x;
    dy2 = t[2].y - t[0].y;
    return $C(
        t[0].x + dx1 * x + dx2 * y,
        t[0].y + dy1 * x + dy2 * y);
  },

  randPointInPolygon : function(polygon) {
    var argument = Math.random();
    if (polygon.length == 1) {
      return polygon[0];
    }
    if (polygon.length == 2) {
      return $C(polygon[0].x + argument * (polygon[1].x - polygon[0].x),
          polygon[0].y + argument * (polygon[1].y - polygon[0].y));
    }
    var odds = [],
        area = 0, i, a;
    for (i = 2; i < polygon.length; i++) {
      a = Geometry.cross(polygon[0], polygon[i - 1], polygon[i]);
      area += a;
      odds.push(a);
    }
    odds.forEach(function(o, i) {
      odds[i] = o / area;
    });
    for (var i = 0; i < polygon.length - 2; i++) {
      if (argument < odds[i]) {
        return Geometry.randPointInTriangle([polygon[0], polygon[i + 1], polygon[i + 2]]);
      }
      argument -= odds[i];
    }
    return Geometry.randPointInTriangle([
      polygon[0],
      polygon[polygon.length - 2],
      polygon[polygon.length - 1]]);
  },

  /**
   *
   * @param sites
   *            {[Array}
   */
  convexHull : function (sites) {
    var stack_top = 0, i, temp, base, result, N = sites.length;
    for (i = 1; i < N; i++) {
      if (sites[i].y < sites[0].y
          || (sites[i].y == sites[0].y && sites[i].x < sites[0].x)) {
        temp = sites[i];
        sites[i] = sites[0];
        sites[0] = temp;
      }
    }
    base = sites[0];
    sites.sort(Geometry.convexHull.polarComp(base));
    result = [sites[0], sites[1]];
    for (i = 2; i < N; i++) {
      while (result.length && Geometry.cross(result[result.length - 2], result[result.length - 1], sites[i]) <= 0) {
        result.pop();
      }
      result.push(sites[i]);
    }
    return result;
  },

  /**
   * Circumcenter of triangle
   *
   * @param {Array}
      *            triangle The triangle
   * @return {Complex}
   */

  circumcenter : function (triangle) {
    var bx = triangle[1].x - triangle[0].x,
        by = triangle[1].y - triangle[0].y,
        bl = bx * bx + by * by,
        cx = triangle[2].x - triangle[0].x,
        cy = triangle[2].y - triangle[0].y,
        cl = cx * cx + cy * cy,
        d = 2 * (bx * cy - by * cx),
        x = cy * bl - by * cl,
        y = bx * cl - cx * bl;
    return $C(x / d + triangle[0].x, y / d + triangle[0].y);
  },

  /**
   *
   * @param {Complex}
      *            p1
   * @param {Complex}
      *            p2
   * @param {number}
      *            y
   */
  hyperbola : function (p1, p2) {
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
  },

  /**
   * Voronoi Tessellation with naive algorithm
   *
   * @param vertices
   *          [p1,p2,p3, ...]
   * @returns polygons [[p1,p2,p3,...], ...]
   */
  voronoi : function(vertices, boundary) {
    var polygon = vertices.map(function(v) {
      return boundary.slice(0);
    }), i, v, j, dx, dy, c, c2, t;
    for (i = 0; i < vertices.length; i++) {
      var v = vertices[i];
      for (j = i + 1; j < vertices.length; j++) {
        t = vertices[j];
        dx = t.x - v.x;
        dy = t.y - v.y;
        c = $C((v.x + t.x) * 0.5, (v.y + t.y) * 0.5);
        c2 = $C(c.x + dy, c.y - dx);
        polygon[i] = Geometry.convexCut(polygon[i], [ c2, c ], [ j ]);
        polygon[j] = Geometry.convexCut(polygon[j], [ c, c2 ], [ i ]);
      }
      polygon[i].area = v.area;
    }
    return polygon;
  }
};

$jit.geometry.convexHull.polarComp = function (base) {
  return function(p, q) {
    if (p == base) {
      return -1;
    }
    if (q == base) {
      return 1;
    }
    var cm = Geometry.cross(base, p, q);
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
      if (p.__distBase[0] < q.__distBase[0]) {
        return -1;
      } else if (p.__distBase[0] == q.__distBase[0]) {
        return 0;
      } else {
        return 1;
      }
    } else if (cm > 0) {
      return -1;
    } else if (cm < 0) {
      return 1;
    }
  }
};

var Geometry = $jit.geometry;
