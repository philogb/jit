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
//      if (offset) {
//        pts = Geometry.offsetConvex(pts, -offset * 0.75);
//      }
      if (leaf) {
        ctx.lineJoin = "bevel";
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
        pts = Geometry.offsetConvex(pts, -offset * 0.5);
        // Fill polygon
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.lineTo(pts[0].x, pts[0].y);
        ctx.closePath();
        ctx.save();
        ctx.lineWidth = config.offset;
        ctx.stroke();
        ctx.restore();

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
      centroidType : "weightedCentroid",
      Node : {
        type : 'polygon',
        props : 'node-property:width:height:vertices'
      },
      Label : {
        textBaseline : 'middle',
        type : 'Native'
      }
    };

    this.controller = this.config = $.merge(config, controller);
    TM.Base.initialize.apply(this, [ this.controller ]);
  }
});
