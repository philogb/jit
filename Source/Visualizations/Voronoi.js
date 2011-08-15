/**
 *
 * @author ZHANG BEi
 */


/**
 * @class TM.Plot.NodeTypes.polygon
 */
TM.Plot.NodeTypes.implement({
  polygon : {
    /**
     *
     * @param {Node} node
     * @param {Canvas} canvas
     * @param {Boolean} animating
     */
    'render' : function(node, canvas, animating) {
      var leaf = this.viz.leaf(node),
          config = this.config,
          border = node.getData('border'),
          vertices = node.getData('vertices'),
          ctx = canvas.getCtx(),
          titleHeight = config.titleHeight,
          offset = config.offset,
          i;
      if (!vertices || vertices.length === 0) {
        return;
      }
      var pts = vertices.slice(0);
      if (Geometry.area(pts) < 0) {
        pts.reverse();
      }
      if (offset) {
        pts = Geometry.offsetConvex(pts, -offset * 0.5);
      }
      if (leaf) {
        if (config.cushion) {
          var center = Geometry.centroid(pts), x = 0, y = 0, minX = pts[0].x, maxX = pts[0].x, minY = pts[0].y, maxY = pts[0].y;
          x = center[0];
          y = center[1];
          var width = maxX - minX + 1, height = maxY - minY + 1,
              lg = ctx.createRadialGradient(x, y, 1, x, y, width < height ? height : width),
              color = node.getData('color'),
              colorGrad = $.rgbToHex($.map($.hexToRgb(color), function(r) {
                return r * 0.2 >> 0;
              }));
          lg.addColorStop(0, color);
          lg.addColorStop(1, colorGrad);
          ctx.fillStyle = lg;
        }
        // Fill polygon

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (i = 1; i < pts.length; i++) {
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
        for (i = 1; i < pts.length; i++) {
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
      var config = this.config, curr, vert, ivert;
      if (node.ignore || node.getData('alpha') < 1) {
        return false;
      }
      curr = this.viz.clickedNode ? this.viz.clickedNode.id : this.viz.root;
      curr = this.viz.graph.getNode(curr);
      if (this.config.levelsToShow) {
        if (!(node._depth > curr._depth &&
            node._depth <= curr._depth + this.config.levelsToShow)) {
          return false;
        }
      } else if (node._depth <= curr._depth) {
        return false;
      }

      vert = node.getData('vertices');
      if (!vert) {
        return false;
      }

      // if (node.getParents().length == 0
      // || node.getParents()[0].id != curr)
      // return false;
      if (config.levelsToShow && node._depth < curr._depth + config.levelsToShow
          || !config.levelsToShow && node.getSubnodes([ 1, 1 ]).length) {
        if (config.offset == 0) {
          return false;
        }
        ivert = Geometry.offsetConvex(vert, -config.offset * 2);
        return Geometry.pointInPolygon([ pos ], vert)[0] && !Geometry.pointInPolygon([ pos ], ivert)[0];
      }
      return Geometry.pointInPolygon([ pos ], node.getData('vertices'))[0];
    }
  }
});

Layouts.TM.Voronoi = new Class({
  Implements : Layouts.TM.Area,
  compute : function(prop) {
    this.controller.onBeforeCompute(root);
    var root = this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root),
        size = this.canvas.getSize(),
        config = this.config,
        offset = config.offset,
        width = size.width - offset * 2,
        height = size.height - offset * 2;

    this.graph.computeLevels(this.root, 0, 0);

    // set root position and dimensions
    root.getPos(prop).setc(-5, -5);
    if (!root.histoPos) {
      root.histoPos = [];
    }
    root.histoPos[0] = $C(0, 0);
    var bound = [
      $C(-width * 0.5, -height * 0.5),
      $C(width * 0.5, -height * 0.5),
      $C(width * 0.5, height * 0.5),
      $C(-width * 0.5, height * 0.5)
    ];

    root.setData('vertices', bound, prop);
    root.setData('width', 0, prop);
    root.setData('height', 0, prop);
    this.computePositions(root, bound, prop, 0);
    this.controller.onAfterCompute(root);
  },

  centroid : function(sites, bound) {
    var tdist = 2, polygons;
    while (tdist > 1e-3) {
      polygons = Geometry.voronoi(sites, bound);
      tdist = 0;
      sites = polygons.map(function(p, j) {
        var c = Geometry.centroid(p);
        tdist += Geometry.dist(c, sites[j]);
        return c;
      });
    }
    return sites;
  },

  pressure : function(sites, bound) {
    sites = this.centroid(sites, bound);
    var tw = 0, iter = 0, polygons, pressure, polygons;
    $jit.util.each(sites, function(s) {
      tw += s.area;
    });
    tw = Geometry.area(bound) / tw;
    for (; iter < 100; iter++) {
      polygons = Geometry.voronoi(sites, bound);
      for (var j = 0; j < sites.length; j++) {
        if (polygons[j].length == 0) {
          sites = polygons.map(function(p, j) {
            return Geometry.centroid(p);
          });
          iter = 1;
          break;
        }
      }
      pressure = polygons.map(function(p, ind) {
        return p.area * tw / (Geometry.area(p) + 1e-10);
      });
      polygons = Geometry.voronoi(sites, bound);
      sites = polygons.map(function(p, ind) {
        var po = $C(sites[ind].x, sites[ind].y), totalPressure, i;
        po.area = sites[ind].area;
        totalPressure = $C(0, 0);
        $jit.util.each(p, function(v, i) {
          var target = (v.attached) ? v.attached : -1,
              targetPressure = (v.attached) ? pressure[v.attached[0]] : 1,
              start = v,
              stop = p[i + 1] || p[0],
              pr = (pressure[ind] - targetPressure),
              dx = stop.x - start.x,
              dy = stop.y - start.y;
          totalPressure.x += dy * pr;
          totalPressure.y -= dx * pr;
        });
        po.x += totalPressure.x / 10;
        po.y += totalPressure.y / 10;
        po.tp = totalPressure;
        return po;
      });
    }
    return sites;
  },

  computePositions : function(node, bound, prop, level) {
    var me = this,
        chs = node.getSubnodes([ 1, 1 ], "ignore"),
        config = this.config,
        offset = config.offset,
        histoPos = node.histoPos[level] || c(0, 0),
        sites,
        polygons;

    node.setData('width', 0, prop);
    node.setData('height', 0, prop);
    node.getPos(prop).setc(histoPos.x, histoPos.y);

    if (chs.length > 0) {
      if (!chs[0].histoPos || !chs[0].histoPos[level + 1]) {
        sites = $jit.util.map(chs, function(ch) {
          var pt = Geometry.randPointInPolygon(bound);
          if (ch.data && ch.data.$area)
            pt.area = ch.data.$area;
          return pt;
        });
        sites = me[me.config.centroidType](sites, bound);
        $jit.util.each(sites, function(p, i) {
          if (!chs[i].histoPos) {
            chs[i].histoPos = [];
          }
          chs[i].histoPos[level + 1] = p;
        });
      }
      sites = $jit.util.map(chs, function(ch) {
        return ch.histoPos[level + 1];
      });
      polygons = Geometry.voronoi(sites, bound);

      $jit.util.each(chs, function(ch, i) {
        var vertices = polygons[i];
        if (Geometry.area(vertices) < 0) {
          vertices.reverse();
        }
        var vertices0 = vertices;
        if (offset) {
          vertices0 = Geometry.offsetConvex(vertices, -offset);
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
      centroidType : "pressure",
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