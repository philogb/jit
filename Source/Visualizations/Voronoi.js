/**
 * 
 * @author ZHANG BEi
 */

(function() {

	if (!TM)
		TM = {};
	$jit.Voronoi = {};
  var $c = $jit.Complex;
  
	/**
	 * Tests whether all points are in a polygon
	 */
	var pointInPolygon = $jit.Voronoi.pointInPolygon = function(pts, polygon) {
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
						if (start.y >= pos.y && stop.y < pos.y
								|| start.y <= pos.y && stop.y > pos.y) {
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
	var cross = $jit.Voronoi.cross = function(p1, p2, p3) {
		if (!p1 || !p2 || !p3)
			debugger;
		return p1.x * p2.y + p2.x * p3.y + p3.x * p1.y - p1.x * p3.y - p2.x
				* p1.y - p3.x * p2.y;
	}
	/**
	 * Reserves those l[0],l[1],c[i] is counter-clockwise
	 * 
	 * @param convex
	 *            [p1,p2,...]
	 * @param l
	 *            [p1,p2] as a ex line
	 */
	var convexCut = $jit.Voronoi.convexCut = function(convex, l) {
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
					if (c1 - c2)
						result.push(new $jit.Complex((stop.x - start.x) * sc
										+ start.x, (stop.y - start.y) * sc
										+ start.y));
				}
			} else {
				if ((c2 = cross(l[0], l[1], stop)) > 0) {
					var sc = c1 / (c1 - c2);
					result.push(new $jit.Complex((stop.x - start.x) * sc
									+ start.x, (stop.y - start.y) * sc
									+ start.y));
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
		if (p.length < 3)
			return 0;
		var sum = 0;
		for (var i = 2; i < p.length; i++) {
			sum += cross(p[0], p[i - 1], p[i]);
		}
		return sum * 0.5;
	}

	var convexIntersect = $jit.Voronoi.convexIntersect = function(c1, c2) {
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

	var bisector = $jit.Voronoi.bisector = function(p1, p2) {
		return [2 * (p2.x - p1.x), 2 * (p2.y - p1.y),
				-(p2.x * p2.x - p1.x * p1.x + p2.y * p2.y - p1.y * p1.y)];
	};

	var intersection = $jit.Voronoi.intersection = function(l1, l2) {
		var det = l1[0] * l2[1] - l1[1] * l2[0];
		if (det == 0)
			if (l1[0] * l2[2] - l1[2] * l2[0] == 0)
				return l1;
			else
				return null;
		return new $jit.Complex(-(l1[2] * l2[1] - l1[1] * l2[2]) / det, -(l1[0]
						* l2[2] - l1[2] * l2[0])
						/ det);
	}

	var getExtent = $jit.Voronoi.getExtent = function(bound) {
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

	var offsetLine = $jit.Voronoi.offsetLine = function(l, offset) {
		var dx = l[1].x - l[0].x;
		var dy = l[1].y - l[0].y;
		var r = dx * dx + dy * dy;
		r = Math.sqrt(r);
		r = offset / r;
		dx *= r;
		dy *= r;
		return [new $c(l[0].x - dy, l[0].y + dx),
				new $c(l[1].x - dy, l[1].y + dx)];
	};

	var intersectionSeg = $jit.Voronoi.intersectionSeg = function(l1, l2) {
		var c1 = cross(l1[0], l2[0], l2[1]);
		var c2 = cross(l1[1], l2[0], l2[1]);
		if (c1 == c2)
			return null;
		var k = c1 / (c1 - c2);
		return new $c(k * (l1[1].x - l1[0].x) + l1[0].x, k
						* (l1[1].y - l1[0].y) + l1[0].y);
	};

	/**
	 * Voronoi Tessellation with Fortune's algorithm
	 * 
	 * @param vertices
	 *            [p1,p2,p3, ...]
	 * @returns polygons [[p1,p2,p3,...], ...]
	 */
	var voronoiFortune = $jit.Voronoi.voronoiFortune = function(vertices,
			boundary) {
		return vertices.map(function(v, ind) {
					var polygon = boundary.slice(0);
					for (var i = 0; i < vertices.length; i++) {
						if (i == ind)
							continue;
						var t = vertices[i];
						var dx = t.x - v.x;
						var dy = t.y - v.y;
						var c = new $c((v.x + t.x) * 0.5, (v.y + t.y) * 0.5);
						polygon = convexCut(polygon, [
										new $c(c.x + dy, c.y - dx), c]);
					}
					return polygon;
				});
	};

	var centroid3 = $jit.Voronoi.centroid3 = function(triangle) {
		// intersection of two
		var c1 = new $c((triangle[0].x + triangle[1].x) * 0.5,
				(triangle[0].y + triangle[1].y) * 0.5);
		var c2 = new $c((triangle[0].x + triangle[2].x) * 0.5,
				(triangle[0].y + triangle[2].y) * 0.5);
		return intersectionSeg([triangle[2], c1], [triangle[1], c2]);
	}

	var centroid = $jit.Voronoi.centroid = function(convex) {
		if (convex.length == 1)
			return convex[0];
		var c3s = new $c(0, 0);
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
		c3s.x /= total;
		c3s.y /= total;
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

	var offsetConvex = $jit.Voronoi.offsetConvex = function(convex, offset) {
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

	TM.Plot.NodeTypes.implement({
		'polygon' : {
			'render' : function(node, canvas, animating) {
				var leaf = this.viz.leaf(node), config = this.config, border = node
						.getData('border'), vertics = node.getData('vertics'), ctx = canvas
						.getCtx(), titleHeight = config.titleHeight, offset = config.offset;
				if (!vertics) {
					return;
				}
				if (vertics.length == 0)
					return;
				var pts = vertics.slice(0);
				if (area(pts) < 0)
					pts.reverse();
				if (offset)
				  pts = offsetConvex(pts, -offset);
				  
				if (leaf) {
					if (pts.length == 0)
						return;
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
				} else if (titleHeight > 0) {
					// Fill polygon
					ctx.beginPath();
					ctx.moveTo(pts[0].x, pts[0].y);
					for (var i = 1; i < pts.length; i++) {
						ctx.lineTo(pts[i].x, pts[i].y);
					}
					ctx.lineTo(pts[0].x, pts[0].y);
					ctx.save();
					ctx.lineWidth = config.offset * 2;
					ctx.stroke();
					ctx.restore();
					ctx.closePath();
				}
			},
			'contains' : function(node, pos) {
				var config = this.config;
				
				if (node.ignore)
			    return false;
			  if(node.getData('alpha') < 1)
			    return false;
			  
				var curr = this.viz.clickedNode
						? this.viz.clickedNode.id
						: this.viz.root;
        curr = this.viz.graph.getNode(curr);
        if (this.config.levelsToShow) {
          if (!(node._depth > curr._depth && node._depth <= curr._depth + this.config.levelsToShow)) return false;
        } else if (node._depth <= curr._depth) return false;
				
        var vert = node.getData('vertics');
        if (!vert) return false;
        
				// if (node.getParents().length == 0
				// || node.getParents()[0].id != curr)
				// return false;
				if (config.levelsToShow && node._depth < curr._depth + config.levelsToShow || 
				   !config.levelsToShow && node.getSubnodes([1, 1]).length) {
					if (config.offset == 0)
					  return false;
				  
				  
				  var ivert = offsetConvex(vert, - config.offset * 2);
				  return pointInPolygon([pos], vert)[0] && !pointInPolygon([pos], ivert)[0]; 
				}
				return pointInPolygon([pos], node.getData('vertics'))[0];
			}
		}
	});

	var randPointInTriangle = $jit.Voronoi.randPointInTriangle = function(t) {
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
		return new $c(t[0].x + dx1 * x + dx2 * y, t[0].y + dy1 * x + dy2 * y);
	}

	var randPointInPolygon = $jit.Voronoi.randPointInPolygon = function(polygon) {
		if (polygon.length == 1)
			return polygon[0];
		if (polygon.length == 2) {
			var la = Math.random();
			return new $c(polygon[0].x + la * (polygon[1].x - polygon[0].x),
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

	Layouts.TM.Voronoi = new Class({
		Implements : Layouts.TM.Area,
		compute : function(prop) {
			var root = this.graph.getNode(this.clickedNode
					&& this.clickedNode.id || this.root);
			this.controller.onBeforeCompute(root);
			var size = this.canvas.getSize(), config = this.config, offset = config.offset, width = size.width
					- offset * 2, height = size.height - offset * 2;
			this.graph.computeLevels(this.root, 0, 0);
			// set root position and dimensions
			root.getPos(prop).setc(-5, -5);
			if (!root.histoPos)
				root.histoPos = [];
			root.histoPos[0] = new $c(0, 0);
			var bound = [new $c(-width * 0.5, -height * 0.5),
					new $c(width * 0.5, -height * 0.5),
					new $c(width * 0.5, height * 0.5),
					new $c(-width * 0.5, height * 0.5)];
			root.setData('vertics', bound, prop);
//			root.setData('width', width, prop);
//			root.setData('height', height, prop);
			
      root.setData('width', 0, prop);
      root.setData('height', 0, prop);
			this.computePositions(root, bound, prop, 0);
			this.controller.onAfterCompute(root);
		},

		computePositions : function(node, bound, prop, level) {
			 
			var chs = node.getSubnodes([1, 1], "ignore"), config = this.config, offset = config.offset, max = Math.max;
      //if( config.levelsToShow && level > config.levelsToShow) return;
      
			var histoPos = node.histoPos[level] || c(0, 0);
			var extent = getExtent(bound);
//			node.setData('width', extent[2] - extent[0], prop);
//			node.setData('height', extent[3] - extent[1], prop);
      node.setData('width', 0, prop);
      node.setData('height', 0, prop);
			node.getPos(prop).setc(histoPos.x, histoPos.y);
			if (chs.length > 0) {
				if (!chs[0].histoPos || !chs[0].histoPos[level + 1]) {
					var sites = $jit.util.map(chs, function(ch) {
								return randPointInPolygon(bound);
							});
					var polygons = [];

					for (var i = 0; i < 50; i++) {
						polygons = voronoiFortune(sites, bound);
						sites = $jit.util.map(polygons, function(p) {
									return centroid(p);
								});
					}

					polygons = voronoiFortune(sites, bound);
					$jit.util.each(sites, function(p, i) {
								if (!chs[i].histoPos)
									chs[i].histoPos = [];
								chs[i].histoPos[level + 1] = p;
							});
				}
				var sites = chs.map(function(ch) {
							return ch.histoPos[level + 1];
						});
				var polygons = voronoiFortune(sites, bound);
				var self = this;
				$jit.util.each(chs, function(ch, i) {
							var vertics = polygons[i];
							if (area(vertics) < 0)
								vertics.reverse();
							if (offset)
								vertics0 = offsetConvex(vertics, -offset);
							else
								vertics0 = vertics;
							ch.setData('vertics', vertics, prop);
							self
									.computePositions(ch, vertics0, prop, level
													+ 1);
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
				initialize : function(controller) {
					var config = {
						Node : {
							type : 'polygon',
							props : 'node-property:width:height:vertics'
						},
						Label: {
              textBaseline: 'center',
              type : 'Native'
            }
					};

					this.controller = this.config = $.merge(controller, config);
					TM.Base.initialize.apply(this, [this.controller]);
				}
			});

})();
