/**
 * 
 * @author ZHANG BEi
 */

$jit.Voronoi = {};

/**
 * Voronoi Tessellation with Fortune's algorithm
 * 
 * @param vertices
 *          [p1,p2,p3, ...]
 * @returns polygons [[p1,p2,p3,...], ...]
 */
var voronoiFortune = $jit.Voronoi.voronoiFortune = function(vertices, boundary) {
  var polygon = vertices.map(function(v) {
    return boundary.slice(0);
  });
  for ( var i = 0; i < vertices.length; i++) {
    var v = vertices[i];
    for ( var j = i + 1; j < vertices.length; j++) {
      var t = vertices[j];
      var dx = t.x - v.x;
      var dy = t.y - v.y;
      var c = $C((v.x + t.x) * 0.5, (v.y + t.y) * 0.5);
      var c2 = $C(c.x + dy, c.y - dx);
      polygon[i] = convexCut(polygon[i], [ c2, c ], [ j ]);
      polygon[j] = convexCut(polygon[j], [ c, c2 ], [ i ]);
    }
    polygon[i].area = v.area;
  }
  return polygon;
};

TM.Plot.NodeTypes
    .implement({
      'polygon' : {
        'render' : function(node, canvas, animating) {
          var leaf = this.viz.leaf(node), config = this.config, border = node.getData('border'), vertices = node
              .getData('vertices'), ctx = canvas.getCtx(), titleHeight = config.titleHeight, offset = config.offset;
          if (!vertices) {
            return;
          }
          if (vertices.length == 0)
            return;
          var pts = vertices.slice(0);
          if (area(pts) < 0)
            pts.reverse();
          if (offset)
            pts = offsetConvex(pts, -offset * 0.5);

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
              var lg = ctx.createRadialGradient(x, y, 1, x, y, width < height ? height : width);
              var color = node.getData('color');
              var colorGrad = $.rgbToHex($.map($.hexToRgb(color), function(r) {
                return r * 0.2 >> 0;
              }));
              lg.addColorStop(0, color);
              lg.addColorStop(1, colorGrad);
              ctx.fillStyle = lg;
            }
            // Fill polygon

            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for ( var i = 1; i < pts.length; i++) {
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
            for ( var i = 1; i < pts.length; i++) {
              ctx.lineTo(pts[i].x, pts[i].y);
            }
            ctx.lineTo(pts[0].x, pts[0].y);
            ctx.save();
            ctx.lineWidth = config.offset;
            ctx.stroke();
            ctx.restore();
            ctx.closePath();
          }
        },
        'contains' : function(node, pos) {
          var config = this.config;

          if (node.ignore)
            return false;
          if (node.getData('alpha') < 1)
            return false;

          var curr = this.viz.clickedNode ? this.viz.clickedNode.id : this.viz.root;
          curr = this.viz.graph.getNode(curr);
          if (this.config.levelsToShow) {
            if (!(node._depth > curr._depth && node._depth <= curr._depth
                + this.config.levelsToShow))
              return false;
          } else if (node._depth <= curr._depth)
            return false;

          var vert = node.getData('vertices');
          if (!vert)
            return false;

          // if (node.getParents().length == 0
          // || node.getParents()[0].id != curr)
          // return false;
          if (config.levelsToShow && node._depth < curr._depth + config.levelsToShow
              || !config.levelsToShow && node.getSubnodes([ 1, 1 ]).length) {
            if (config.offset == 0)
              return false;

            var ivert = offsetConvex(vert, -config.offset * 2);
            return pointInPolygon([ pos ], vert)[0] && !pointInPolygon([ pos ], ivert)[0];
          }
          return pointInPolygon([ pos ], node.getData('vertices'))[0];
        }
      }
    });

Layouts.TM.Voronoi = new Class(
    {
      Implements : Layouts.TM.Area,
      compute : function(prop) {
        var root = this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root);
        this.controller.onBeforeCompute(root);
        var size = this.canvas.getSize(), config = this.config, offset = config.offset, width = size.width
            - offset * 2, height = size.height - offset * 2;
        this.graph.computeLevels(this.root, 0, 0);
        // set root position and dimensions
        root.getPos(prop).setc(-5, -5);
        if (!root.histoPos)
          root.histoPos = [];
        root.histoPos[0] = $C(0, 0);
        var bound = [ $C(-width * 0.5, -height * 0.5), $C(width * 0.5, -height * 0.5),
            $C(width * 0.5, height * 0.5), $C(-width * 0.5, height * 0.5) ];
        root.setData('vertices', bound, prop);
        // root.setData('width', width, prop);
        // root.setData('height', height, prop);

        root.setData('width', 0, prop);
        root.setData('height', 0, prop);
        this.computePositions(root, bound, prop, 0);
        this.controller.onAfterCompute(root);
      },
      centroid : function(sites, bound) {
        var tdist = 2;
        while (tdist > 1e-3) {
          var polygons = voronoiFortune(sites, bound);
          tdist = 0;
          sites = polygons.map(function(p, j) {
            var c = centroid(p);
            tdist += dist(c, sites[j]);
            return c;
          });
        }
        return sites;
      },
      presure : function(sites, bound) {
        sites = this.centroid(sites, bound);
        var tw = 0;
        $jit.util.each(sites, function(s) {
          tw += s.area;
        });
        tw = area(bound) / tw;
        for ( var iter = 0; iter < 100; iter++) {
          var polygons = voronoiFortune(sites, bound);
          for ( var j = 0; j < sites.length; j++) {
            if (polygons[j].length == 0) {
              sites = polygons.map(function(p, j) {
                return centroid(p);
              });
              iter = 1;
              break;
            }
          }
          var presure = polygons.map(function(p, ind) {
            return p.area * tw / (area(p) + 1e-10);
          });
          var polygons = voronoiFortune(sites, bound);
          sites = polygons
              .map(function(p, ind) {
                var po = $C(sites[ind].x, sites[ind].y);
                po.area = sites[ind].area;
                var totalPresure = $C(0, 0);
                for ( var i = 0; i < p.length; i++) {
                  var target = (p[i].attached) ? p[i].attached : -1, targetPresure = (p[i].attached) ? presure[p[i].attached[0]]
                      : 1, start = p[i], stop = p[i + 1] || p[0], pr = (presure[ind] - targetPresure), dx = stop.x
                      - start.x, dy = stop.y - start.y;
                  totalPresure.x += dy * pr;
                  totalPresure.y -= dx * pr;
                  if (target == -1) {

                  }
                }
                po.x += totalPresure.x / 10;
                po.y += totalPresure.y / 10;
                po.tp = totalPresure;
                return po;
              });
        }
        return sites;
      },
      computePositions : function(node, bound, prop, level) {
        var chs = node.getSubnodes([ 1, 1 ], "ignore"), config = this.config, offset = config.offset;
        // if( config.levelsToShow && level > config.levelsToShow) return;

        var histoPos = node.histoPos[level] || c(0, 0);

        node.setData('width', 0, prop);
        node.setData('height', 0, prop);
        node.getPos(prop).setc(histoPos.x, histoPos.y);
        if (chs.length > 0) {
          if (!chs[0].histoPos || !chs[0].histoPos[level + 1]) {
            var sites = $jit.util.map(chs, function(ch) {
              var pt = randPointInPolygon(bound);
              if (ch.data && ch.data.$area)
                pt.area = ch.data.$area;
              return pt;
            });
            sites = this[this.config.centroidType](sites, bound);
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
          var me = this;
          $jit.util.each(chs, function(ch, i) {
            var vertices = polygons[i];
            if (area(vertices) < 0)
              vertices.reverse();
            var vertices0 = vertices;
            if (offset) {
              vertices0 = offsetConvex(vertices, -offset);
              ch.offset = offset;
            }
            ch.setData('vertices', vertices, prop);
            me.computePositions(ch, vertices0, prop, level + 1);
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
  Implements : [ Loader, Extras, TM.Base, Layouts.TM.Voronoi ],
  initialize : function(controller) {
    var config = {
      centroidType : "presure",
      Node : {
        type : 'polygon',
        props : 'node-property:width:height:vertices'
      },
      Label : {
        textBaseline : 'center',
        type : 'Native'
      }
    };

    this.controller = this.config = $.merge(config, controller);
    TM.Base.initialize.apply(this, [ this.controller ]);
  }
});