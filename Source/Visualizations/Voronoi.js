/**
 * 
 * @author ZHANG BEi 
 */

(function(){
  
  if(!TM) TM = {};
  $jit.Voronoi = {};
  var V = $jit.Voronoi;

  /**
   * Tests whether all points are in a polygon
   */
  var pointInPolygon = function(pts, polygon) {
    if(polygon.length < 3) return false;
    var conj = [];
    $jit.util.each(pts, function(){ conj.push(0); });
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
      });
    }
    conj = $jit.util.map(conj, function(c){ return  c % 2 != 0;});
    return conj;
  };
  
  /**
   * Counter-clockwise is positive.
   * @param p1, p2, p3 [x,y]
   */
  var cross = $jit.Voronoi.cross = function(p1, p2, p3) {
    if (!p1 || !p2 || !p3) debugger;
    return p1.x * p2.y + p2.x * p3.y + p3.x * p1.y -
      p1.x * p3.y - p2.x * p1.y - p3.x * p2.y;
  }
  /**
   * Reserves those l[0],l[1],c[i] is counter-clockwise
   * @param c [p1,p2,...]
   * @param l [p1,p2] as a ex line
   */
  var convexCut = $jit.Voronoi.convexCut = function(c, l) {
    if (c.length < 3) return [];
    var result = [];
    for(var i = 0; i < c.length; i++)
    {
      var start = c[i];
      var stop = c[i + 1] || c[0];
      if (start.x == stop.x && start.y == stop.y) continue;
      var c1, c2;
      if ((c1 = cross(l[0], l[1], start)) > 0) {
        if ((c2 = cross(l[0], l[1], stop)) >= 0) {
          result.push(stop);
        } else {
          var sc =  c1 / (c1 - c2);
          if (c1 - c2)
            result.push(new $jit.Complex(
              (stop.x - start.x) * sc + start.x,
              (stop.y - start.y) * sc + start.y
              ));
        }
      } else {
        if ((c2 = cross(l[0], l[1], stop)) > 0) {
          var sc = c1 / (c1 - c2);
          result.push(new $jit.Complex(
            (stop.x - start.x) * sc + start.x,
            (stop.y - start.y) * sc + start.y
            ));
          result.push(stop);
        } else if (c2 == 0) {
          if (c1)
            result.push(stop);
        }
      }
    }
    return result;
  }
  
  
  var area = $jit.Voronoi.area = function(p) {
    if (p.length < 3) return 0;
    var sum = 0;
    for(var i = 2; i < p.length; i++) {
      sum += cross(p[0], p[i - 1], p[i]);
    }
    return sum / 2;
  }

  var convexIntersect = $jit.Voronoi.convexIntersect = function(c1, c2) {
    if (c1.length < 3) return [];
    if (c2.length < 3) return [];
    for (var i = 0; i < c2.length ; i++) {
      var start = c2[i];
      var stop = c2[i + 1] || c2[0];
      c1 = convexCut(c1, [start, stop]);
    }
    return c1;
  };
  
  var bisector = function(p1, p2){
    return [
      2 * (p2.x - p1.x),
      2 * (p2.y - p1.y),
      -(p2.x * p2.x - p1.x * p1.x + p2.y * p2.y - p1.y * p1.y)
      ];
  };
  V.bisector = bisector;
  
  var intersection = function(l1, l2) {
    var det = l1[0]*l2[1] - l1[1] * l2[0];
    if(det == 0) 
      if(l1[0] * l2[2] - l1[2] * l2[0] == 0) return l1;
    else return;
    return new $jit.Complex(
      -(l1[2] * l2[1] - l1[1] * l2[2]) / det,
      -(l1[0] * l2[2] - l1[2] * l2[0]) / det
    );
  }
  V.intersection = intersection;
  
  // Adapted from Nicolas Garcia Belmonte's JIT implementation:
  // http://blog.thejit.org/2010/02/12/voronoi-tessellation/
  // http://blog.thejit.org/assets/voronoijs/voronoi.js
  // See lib/jit/LICENSE for details.
  
  var d3_voronoi_opposite = {"l": "r", "r": "l"};
  var c = $jit.Complex;
  function d3_voronoi_tessellate(vertices, callback) {
    var Sites = {
      list: vertices
        .map(function(v, i) {
          v.index = i;
          return v;
        })
        .sort(function(a, b) {
          return a.y < b.y ? -1
            : a.y > b.y ? 1
            : a.x < b.x ? -1
            : a.x > b.x ? 1
            : 0;
        }),
      bottomSite: null
    };
  
    var EdgeList = {
      list: [],
      leftEnd: null,
      rightEnd: null,
  
      init: function() {
        EdgeList.leftEnd = EdgeList.createHalfEdge(null, "l");
        EdgeList.rightEnd = EdgeList.createHalfEdge(null, "l");
        EdgeList.leftEnd.r = EdgeList.rightEnd;
        EdgeList.rightEnd.l = EdgeList.leftEnd;
        EdgeList.list.unshift(EdgeList.leftEnd, EdgeList.rightEnd);
      },
  
      createHalfEdge: function(edge, side) {
        return {
          edge: edge,
          side: side,
          vertex: null,
          "l": null,
          "r": null
        };
      },
  
      insert: function(lb, he) {
        he.l = lb;
        he.r = lb.r;
        lb.r.l = he;
        lb.r = he;
      },
  
      leftBound: function(p) {
        var he = EdgeList.leftEnd;
        do {
          he = he.r;
        } while (he != EdgeList.rightEnd && Geom.rightOf(he, p));
        he = he.l;
        return he;
      },
  
      del: function(he) {
        he.l.r = he.r;
        he.r.l = he.l;
        he.edge = null;
      },
  
      right: function(he) {
        return he.r;
      },
  
      left: function(he) {
        return he.l;
      },
  
      leftRegion: function(he) {
        return he.edge == null
            ? Sites.bottomSite
            : he.edge.region[he.side];
      },
  
      rightRegion: function(he) {
        return he.edge == null
            ? Sites.bottomSite
            : he.edge.region[d3_voronoi_opposite[he.side]];
      }
    };
  
    var Geom = {
  
      bisect: function(s1, s2) {
        var newEdge = {
          region: {"l": s1, "r": s2},
          ep: {"l": null, "r": null}
        };
  
        var dx = s2.x - s1.x,
            dy = s2.y - s1.y,
            adx = dx > 0 ? dx : -dx,
            ady = dy > 0 ? dy : -dy;
  
        newEdge.c = s1.x * dx + s1.y * dy
            + (dx * dx + dy * dy) * .5;
  
        if (adx > ady) {
          newEdge.a = 1;
          newEdge.b = dy / dx;
          newEdge.c /= dx;
        } else {
          newEdge.b = 1;
          newEdge.a = dx / dy;
          newEdge.c /= dy;
        }
  
        return newEdge;
      },
  
      intersect: function(el1, el2) {
        var e1 = el1.edge,
            e2 = el2.edge;
        if (!e1 || !e2 || (e1.region.r == e2.region.r)) {
          return null;
        }
        var d = (e1.a * e2.b) - (e1.b * e2.a);
        if (Math.abs(d) < 1e-10) {
          return null;
        }
        var xint = (e1.c * e2.b - e2.c * e1.b) / d,
            yint = (e2.c * e1.a - e1.c * e2.a) / d,
            e1r = e1.region.r,
            e2r = e2.region.r,
            el,
            e;
        if ((e1r.y < e2r.y) ||
           (e1r.y == e2r.y && e1r.x < e2r.x)) {
          el = el1;
          e = e1;
        } else {
          el = el2;
          e = e2;
        }
        var rightOfSite = (xint >= e.region.r.x);
        if ((rightOfSite && (el.side == "l")) ||
          (!rightOfSite && (el.side == "r"))) {
          return null;
        }
        return {
          x: xint,
          y: yint
        };
      },
  
      rightOf: function(he, p) {
        var e = he.edge,
            topsite = e.region.r,
            rightOfSite = (p.x > topsite.x);
  
        if (rightOfSite && (he.side == "l")) {
          return 1;
        }
        if (!rightOfSite && (he.side == "r")) {
          return 0;
        }
        if (e.a == 1) {
          var dyp = p.y - topsite.y,
              dxp = p.x - topsite.x,
              fast = 0,
              above = 0;
  
          if ((!rightOfSite && (e.b < 0)) ||
            (rightOfSite && (e.b >= 0))) {
            above = fast = (dyp >= e.b * dxp);
          } else {
            above = ((p.x + p.y * e.b) > e.c);
            if (e.b < 0) {
              above = !above;
            }
            if (!above) {
              fast = 1;
            }
          }
          if (!fast) {
            var dxs = topsite.x - e.region.l.x;
            above = (e.b * (dxp * dxp - dyp * dyp)) <
              (dxs * dyp * (1 + 2 * dxp / dxs + e.b * e.b));
  
            if (e.b < 0) {
              above = !above;
            }
          }
        } else /* e.b == 1 */ {
          var yl = e.c - e.a * p.x,
              t1 = p.y - yl,
              t2 = p.x - topsite.x,
              t3 = yl - topsite.y;
  
          above = (t1 * t1) > (t2 * t2 + t3 * t3);
        }
        return he.side == "l" ? above : !above;
      },
  
      endPoint: function(edge, side, site) {
        edge.ep[side] = site;
        if (!edge.ep[d3_voronoi_opposite[side]]) return;
        callback(edge);
      },
  
      distance: function(s, t) {
        var dx = s.x - t.x,
            dy = s.y - t.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    };
  
    var EventQueue = {
      list: [],
  
      insert: function(he, site, offset) {
        he.vertex = site;
        he.ystar = site.y + offset;
        for (var i=0, list=EventQueue.list, l=list.length; i<l; i++) {
          var next = list[i];
          if (he.ystar > next.ystar ||
            (he.ystar == next.ystar &&
            site.x > next.vertex.x)) {
            continue;
          } else {
            break;
          }
        }
        list.splice(i, 0, he);
      },
  
      del: function(he) {
        for (var i=0, ls=EventQueue.list, l=ls.length; i<l && (ls[i] != he); ++i) {}
        ls.splice(i, 1);
      },
  
      empty: function() { return EventQueue.list.length == 0; },
  
      nextEvent: function(he) {
        for (var i=0, ls=EventQueue.list, l=ls.length; i<l; ++i) {
          if (ls[i] == he) return ls[i+1];
        }
        return null;
      },
  
      min: function() {
        var elem = EventQueue.list[0];
        return {
          x: elem.vertex.x,
          y: elem.ystar
        };
      },
  
      extractMin: function() {
        return EventQueue.list.shift();
      }
    };
  
    EdgeList.init();
    Sites.bottomSite = Sites.list.shift();
  
    var newSite = Sites.list.shift(), newIntStar;
    var lbnd, rbnd, llbnd, rrbnd, bisector;
    var bot, top, temp, p, v;
    var e, pm;
  
    while (true) {
      if (!EventQueue.empty()) {
        newIntStar = EventQueue.min();
      }
      if (newSite && (EventQueue.empty()
        || newSite.y < newIntStar.y
        || (newSite.y == newIntStar.y
        && newSite.x < newIntStar.x))) { //new site is smallest
        lbnd = EdgeList.leftBound(newSite);
        rbnd = EdgeList.right(lbnd);
        bot = EdgeList.rightRegion(lbnd);
        e = Geom.bisect(bot, newSite);
        bisector = EdgeList.createHalfEdge(e, "l");
        EdgeList.insert(lbnd, bisector);
        p = Geom.intersect(lbnd, bisector);
        if (p) {
          EventQueue.del(lbnd);
          EventQueue.insert(lbnd, p, Geom.distance(p, newSite));
        }
        lbnd = bisector;
        bisector = EdgeList.createHalfEdge(e, "r");
        EdgeList.insert(lbnd, bisector);
        p = Geom.intersect(bisector, rbnd);
        if (p) {
          EventQueue.insert(bisector, p, Geom.distance(p, newSite));
        }
        newSite = Sites.list.shift();
      } else if (!EventQueue.empty()) { //intersection is smallest
        lbnd = EventQueue.extractMin();
        llbnd = EdgeList.left(lbnd);
        rbnd = EdgeList.right(lbnd);
        rrbnd = EdgeList.right(rbnd);
        bot = EdgeList.leftRegion(lbnd);
        top = EdgeList.rightRegion(rbnd);
        v = lbnd.vertex;
        Geom.endPoint(lbnd.edge, lbnd.side, v);
        Geom.endPoint(rbnd.edge, rbnd.side, v);
        EdgeList.del(lbnd);
        EventQueue.del(rbnd);
        EdgeList.del(rbnd);
        pm = "l";
        if (bot.y > top.y) {
          temp = bot;
          bot = top;
          top = temp;
          pm = "r";
        }
        e = Geom.bisect(bot, top);
        bisector = EdgeList.createHalfEdge(e, pm);
        EdgeList.insert(llbnd, bisector);
        Geom.endPoint(e, d3_voronoi_opposite[pm], v);
        p = Geom.intersect(llbnd, bisector);
        if (p) {
          EventQueue.del(llbnd);
          EventQueue.insert(llbnd, p, Geom.distance(p, bot));
        }
        p = Geom.intersect(bisector, rrbnd);
        if (p) {
          EventQueue.insert(bisector, p, Geom.distance(p, bot));
        }
      } else {
        break;
      }
    }//end while
  
    for (lbnd = EdgeList.right(EdgeList.leftEnd);
        lbnd != EdgeList.rightEnd;
        lbnd = EdgeList.right(lbnd)) {
      callback(lbnd.edge);
    }
  }
  
  /**
   * Voronoi Tessellation with Fortune's algorithm
   * @param vertices [p1,p2,p3, ...]
   * @returns polygons [[p1,p2,p3,...], ...]
   */
  var voronoiFortune = function (vertices, boundary) {
    if (vertices.length == 1)
      return [boundary];
    else if (vertices.length == 2) {
      var v1 = vertices[0];
      var v2 = vertices[1];
      var cx = (v1.x + v2.x) / 2;
      var cy = (v1[1] + v2[1]) / 2;
      var dx = v1.x - cx;
      var dy = v1.x - cy;
      var l1 = new c(cx - dy, cy + dx);
      var l2 = new c(cx + dy, cy - dx);
      return [convexCut(boundary, [l1,l2]), convexCut(boundary, [l2,l1])];
    }
    var polygons = vertices.map(function() { return []; });
    // Note: we expect the caller to clip the polygons, if needed.
    d3_voronoi_tessellate(vertices, function(e) {
      var s1,
          s2,
          x1,
          x2,
          y1,
          y2;
      if (e.a == 1 && e.b >= 0) {
        s1 = e.ep.r;
        s2 = e.ep.l;
      } else {
        s1 = e.ep.l;
        s2 = e.ep.r;
      }
      if (e.a == 1) {
        y1 = s1 ? s1.y : -1e6;
        x1 = e.c - e.b * y1;
        y2 = s2 ? s2.y : 1e6;
        x2 = e.c - e.b * y2;
      } else {
        x1 = s1 ? s1.x : -1e6;
        y1 = e.c - e.a * x1;
        x2 = s2 ? s2.x : 1e6;
        y2 = e.c - e.a * x2;
      }
      var v1 = new c(x1, y1),
          v2 = new c(x2, y2);
      polygons[e.region.l.index].push(v1, v2);
      polygons[e.region.r.index].push(v1, v2);
    });
  
    // Reconnect the polygon segments into counterclockwise loops.
    polygons = polygons.map(function(polygon, i) {
      var cx = vertices[i].x,
          cy = vertices[i][1];
      polygon.forEach(function(v) {
        v.angle = Math.atan2(v.x - cx, v.y - cy);
      });
      return polygon.sort(function(a, b) {
        return a.angle - b.angle;
      }).filter(function(d, i) {
        return !i || (d.angle - polygon[i - 1].angle > 1e-10);
      });
    });
    if (boundary) {
      polygons = polygons.map(function(p) {
        return $jit.Voronoi.convexIntersect(p, boundary);
      });
    }
    
    return polygons;
  };
  $jit.Voronoi.voronoiFortune = voronoiFortune;

  var offsetLine = $jit.Voronoi.offsetLine = function (l, offset) {
    var dx = l[1].x - l[0].x;
    var dy = l[1].y - l[0].y;
    var r = dx * dx + dy * dy;
    r = Math.sqrt(r);
    r = offset / r;
    dx *= r;
    dy *= r;
    return [new c(l[0].x - dy, l[0].y + dx), new c(l[1].x - dy, l[1].y + dx)];
  };
  
  var intersection = $jit.Voronoi.intersection = function (l1, l2) {
    var c1 = cross(l1[0], l2[0], l2[1]);
    var c2 = cross(l1[1], l2[0], l2[1]);
    if (c1 == c2) return;
    var k = c1 / (c1 - c2);
    return new c(k*(l1[1].x - l1[0].x) + l1[0].x, k*(l1[1].y - l1[0].y) + l1[0].y);
  };
  
  var centroid3 = $jit.Voronoi.centroid3 = function (triangle) {
    var c1 = new c((triangle[0].x + triangle[1].x) / 2, (triangle[0].y + triangle[1].y) / 2);
    var c2 = new c((triangle[0].x + triangle[2].x) / 2, (triangle[0].y + triangle[2].y) / 2);
    return intersection([triangle[2], c1], [triangle[1], c2]);
  }
  
  var centroid = $jit.Voronoi.centroid = function (convex) {
    if(convex.length == 1) return convex[0];
    var c3s = new c(0, 0);
    var total = 0;
    for (var i = 2; i < convex.length; i++) {
      var a = area(convex[0], convex[i - 1], convex[i - 2]);
      var c3 = centroid3(convex[0], convex[i - 1], convex[i - 2]);
      total += a;
      c3s.x += a * c3.x;
      c3s.y += a * c3.y;
    }
    c3s.x /= total;
    c3s.y /= total;
    return c3s;
  }
  
  var offsetConvex = $jit.Voronoi.offsetConvex = function (convex, offset) {
    if (convex.length < 3) return [];
    var inversed = function (l) {
      var dx = l.line[1].x - l.line[0].x;
      var cdx = l.cline[1].x - l.cline[0].x;
      if (dx == cdx && dx == 0) {
        var dy = l.line[1].y - l.line[0].y;
        var cdy = l.cline[1].y - l.cline[0].y;
        return ((dy > 0) ^ (cdy > 0));
      } else return ((dx > 0) ^ (cdx > 0));
    };
    if (area(convex) > 0) convex = convex.reverse();
    var last_line, first_line, cnt = 0;
    // Offset edges
    for (var i = 0; i < convex.length; i++) {
      var start = convex[i];
      var stop = convex[i + 1] || convex[0];
      if (start.x == stop.x && start.y == stop.y) continue;
      var line = { line : offsetLine([start, stop], -offset), cline: [-1, -1] };
      line.prev = last_line;
      if (last_line) last_line.next = line;
      else first_line = line;
      last_line = line;
      cnt ++;
    }
    last_line.next = first_line;
    first_line.prev = last_line;
    
    if (cnt < 3) return [];
    // Connect all the edges
    for (var start = first_line, stop = start.next; 
      true;
      start = stop, stop = stop.next) {
      var inters = intersection(start.line, stop.line);
      stop.cline[0] = start.cline[1] = inters;
      if (stop == first_line) break; 
    }
    // Delete inversed edges
//    var cont = false;
//    do {
//      var cont = false;
//      var l = first_line
//      while (true) {
//        while (inversed(l)) {
//          l.prev.next = l.next;
//          l.next.prev = l.prev;
//          cnt--;
//          if (cnt < 3) return [];
//          var inters = intersection(l.prev.cline, l.next.cline);
//          l.prev.cline[1] = inters;
//          l.next.cline[0] = inters;
//          if (l == first_line) first_line = l.next;
//          l = l.next;
//          cont = true;
//          
//        }
//        l = l.next;
//        if (l == first_line) break;
//      }
//    } while (cont);
    
    var result = [];
    result.push(first_line.cline[1]);
    for (var i = first_line.next; i != first_line; i = i.next ) {
      result.push(i.cline[1]);
    }
    return result;
  }
  
  TM.Plot.NodeTypes.implement({
  'polygon' : {
    'render' : function(node, canvas, animating) {
      var leaf = this.viz.leaf(node), config = this.config,
      border = node.getData('border'),
      vertics = node.getData('vertics'), ctx = canvas.getCtx(),
      titleHeight = config.titleHeight;
      if (!vertics) {
        return;
      }
      if (vertics.length == 0) return;
      var pts = vertics.slice(0);
      if (leaf) {
        if (pts.length == 0) return;
        if (config.cushion) {
          var x = 0, y = 0, minX = pts[0].x, maxX = pts[0].x, minY = pts[0].y, maxY = pts[0].y;
          $jit.util.each(pts, function(pt) {
                x += pt.x;
                y += pt.y;
                if (minX > pt.x)
                  minX = pt.x;
                if (minY > pt.y)
                  minY = pt.y;
                if (maxX < pt.x)
                  minX = pt.x;
                if (maxY < pt.y)
                  maxY = pt.y;
              });
          x /= pts.length;
          y /= pts.length;
          var width = maxX - minX + 1, height = maxY - minY + 1;
          var lg = ctx.createRadialGradient(x, y, 1, x, y,
              width < height ? height : width);
          var color = node.getData('color');
          var colorGrad = $.rgbToHex($.map($.hexToRgb(color),
              function(r) {
                return r * 0.2 >> 0;
              }));
          lg.addColorStop(0, color);
          lg.addColorStop(1, colorGrad);
          ctx.fillStyle = lg;
        }
        // Fill polygon
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (var i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.closePath();
        ctx.fill();
        if (border) {
          ctx.save();
          ctx.strokeStyle = border;
          ctx.stroke();
          ctx.restore();
        }
      } else if(titleHeight > 0) {
        // Fill polygon
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (var i = 1; i < vertics.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.lineTo(pts[0].x, pts[0].y);
        ctx.save();
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
        ctx.closePath();
      }
    },
    'contains' : function(node, pos) {
      if(!this.viz.leaf(node)) return false;
      if(this.viz.clickedNode && !node.isDescendantOf(this.viz.clickedNode.id) || node.ignore) return false;
      var ps = node.getData('vertics').slice(0);
      $jit.util.each(ps, function(pt, i) {
            ps[i] = pt.getc(true);
          });
      return pointInPolygon([pos], ps)[0];
    }
  }});
  
  Layouts.TM.Voronoi = new Class({
    Implements : Layouts.TM.Area,
    compute: function(prop) {
      var root = this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root);
      this.controller.onBeforeCompute(root);
      var size = this.canvas.getSize(),
          config = this.config,
          offset = config.offset,
          width = size.width - offset * 2,
          height = size.height - offset * 2;
      this.graph.computeLevels(this.root, 0, 0);
      //set root position and dimensions
      root.getPos(prop).setc(-5, -5);
      if(!root.histoPos) 
        root.histoPos = [];
      root.histoPos[0] = new c(0, 0);
      var bound = [
          new c(-width/2,-height/2),
          new c(width/2,-height/2),
          new c(width/2,height/2),
          new c(-width/2,height/2)
        ];
      root.setData('vertics', bound, prop);
      root.setData('width', width, prop);
      root.setData('height', height, prop);
      this.computePositions(root, bound, prop, 0);
      this.controller.onAfterCompute(root);
    },
    
    computePositions : function(node, bound, prop, level) {
      // FIXME: Where can i find the level of each node?
      var chs = node.getSubnodes([1, 1], "ignore"), 
          config = this.config,
          offset = config.offset,
          max = Math.max;
      var extent = [0, 0, 0, 0];
      var histoPos = node.histoPos[level] || c(0, 0);
      $jit.util.each(bound, function(p) {
        if(extent[0] > p.x) extent[0] = p.x;
        if(extent[1] > p.y) extent[1] = p.y;
        if(extent[2] < p.x) extent[2] = p.x;
        if(extent[3] < p.y) extent[3] = p.y;
      });
      node.setData('width' , extent[2] - extent[0], prop);
      node.setData('height' , extent[3] - extent[1], prop);
      node.getPos(prop).setc(histoPos[0] - (extent[2] - extent[0]) / 2, histoPos[1]);
      if (chs.length > 0) {
        if (!chs[0].histoPos || !chs[0].histoPos[level + 1]) {
          var sites = $jit.util.map(chs, function(ch) {
            var point = new $jit.Complex(
              Math.random() * (extent[2] - extent[0]) + extent[0],
              Math.random() * (extent[3] - extent[1]) + extent[1]
              );
            while(!pointInPolygon([point], bound)[0]) {
              point = new $jit.Complex(
              Math.random() * (extent[2] - extent[0]) + extent[0],
              Math.random() * (extent[3] - extent[1]) + extent[1]
              );
            }
            return new c(point.x, point.y);
          });
          
//          sites = polygons.map(function(p) { return centroid(p); });
//          polygons = voronoiFortune(sites, bound);
//          sites = polygons.map(function(p) { return centroid(p); });
//          polygons = voronoiFortune(sites, bound);
//          sites = polygons.map(function(p) { return centroid(p); });
          $jit.util.each(sites, function(p, i) {
            if (!chs[i].histoPos) chs[i].histoPos = [];
            chs[i].histoPos[level + 1] = [p.x, p.y];
          });
        }
        var polygons = voronoiFortune(chs.map(function(ch){return ch.histoPos[level + 1];}), bound);
        debugger;
        var self = this;
        $jit.util.each(chs, function(ch, i) {
          var vertics = polygons[i];
          if (offset)
            vertics = offsetConvex(vertics, offset);
          ch.setData('vertics', vertics, prop);
          self.computePositions(ch, vertics, prop, level + 1);
        });
      }
    }
  });
  
  /*
   * Class: TM.Voronoi
   * 
   * A Voronoi TreeMap visualization.
   * 
   * Implements:
   * 
   * All <TM.Base> methods and properties.
   */
  TM.Voronoi = new Class({
    Implements : [Loader, Extras, TM.Base, Layouts.TM.Voronoi],
    initialize : function(config) {
      config.Node = config.Node || {};
      config.Node.type = 'polygon';
      config.Node.props = 'node-property:width:height:vertics';
      this.config = config;
      TM.Base.initialize.apply(this, [config]);
    }
  });

})();
