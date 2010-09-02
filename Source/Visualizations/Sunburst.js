/*
 * File: Sunburst.js
 */

/*
   Class: Sunburst
      
   A radial space filling tree visualization.
   
   Inspired by:
 
   Sunburst <http://www.cc.gatech.edu/gvu/ii/sunburst/>.
   
   Note:
   
   This visualization was built and engineered from scratch, taking only the paper as inspiration, and only shares some features with the visualization described in the paper.
   
  Implements:
  
  All <Loader> methods
  
   Constructor Options:
   
   Inherits options from
   
   - <Options.Canvas>
   - <Options.Controller>
   - <Options.Node>
   - <Options.Edge>
   - <Options.Label>
   - <Options.Events>
   - <Options.Tips>
   - <Options.NodeStyles>
   - <Options.Navigation>
   
   Additionally, there are other parameters and some default values changed
   
   interpolation - (string) Default's *linear*. Describes the way nodes are interpolated. Possible values are 'linear' and 'polar'.
   levelDistance - (number) Default's *100*. The distance between levels of the tree. 
   Node.type - Described in <Options.Node>. Default's to *multipie*.
   Node.height - Described in <Options.Node>. Default's *0*.
   Edge.type - Described in <Options.Edge>. Default's *none*.
   Label.textAlign - Described in <Options.Label>. Default's *start*.
   Label.textBaseline - Described in <Options.Label>. Default's *middle*.
     
   Instance Properties:

   canvas - Access a <Canvas> instance.
   graph - Access a <Graph> instance.
   op - Access a <Sunburst.Op> instance.
   fx - Access a <Sunburst.Plot> instance.
   labels - Access a <Sunburst.Label> interface implementation.   

*/

$jit.Sunburst = new Class({

  Implements: [ Loader, Extras, Layouts.Radial ],

  initialize: function(controller) {
    var $Sunburst = $jit.Sunburst;

    var config = {
      interpolation: 'linear',
      levelDistance: 100,
      Node: {
        'type': 'multipie',
        'height':0
      },
      Edge: {
        'type': 'none'
      },
      Label: {
        textAlign: 'start',
        textBaseline: 'middle'
      }
    };

    this.controller = this.config = $.merge(Options("Canvas", "Node", "Edge",
        "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label"), config, controller);

    var canvasConfig = this.config;
    if(canvasConfig.useCanvas) {
      this.canvas = canvasConfig.useCanvas;
      this.config.labelContainer = this.canvas.id + '-label';
    } else {
      if(canvasConfig.background) {
        canvasConfig.background = $.merge({
          type: 'Circles'
        }, canvasConfig.background);
      }
      this.canvas = new Canvas(this, canvasConfig);
      this.config.labelContainer = (typeof canvasConfig.injectInto == 'string'? canvasConfig.injectInto : canvasConfig.injectInto.id) + '-label';
    }

    this.graphOptions = {
      'klass': Polar,
      'Node': {
        'selected': false,
        'exist': true,
        'drawn': true
      }
    };
    this.graph = new Graph(this.graphOptions, this.config.Node,
        this.config.Edge);
    this.labels = new $Sunburst.Label[canvasConfig.Label.type](this);
    this.fx = new $Sunburst.Plot(this, $Sunburst);
    this.op = new $Sunburst.Op(this);
    this.json = null;
    this.root = null;
    this.rotated = null;
    this.busy = false;
    // initialize extras
    this.initializeExtras();
  },

  /* 
  
    createLevelDistanceFunc 
  
    Returns the levelDistance function used for calculating a node distance 
    to its origin. This function returns a function that is computed 
    per level and not per node, such that all nodes with the same depth will have the 
    same distance to the origin. The resulting function gets the 
    parent node as parameter and returns a float.

   */
  createLevelDistanceFunc: function() {
    var ld = this.config.levelDistance;
    return function(elem) {
      return (elem._depth + 1) * ld;
    };
  },

  /* 
     Method: refresh 
     
     Computes positions and plots the tree.

   */
  refresh: function() {
    this.compute();
    this.plot();
  },

  /*
   reposition
  
   An alias for computing new positions to _endPos_

   See also:

   <Sunburst.compute>
   
  */
  reposition: function() {
    this.compute('end');
  },

  /*
  Method: rotate
  
  Rotates the graph so that the selected node is horizontal on the right.

  Parameters:
  
  node - (object) A <Graph.Node>.
  method - (string) Whether to perform an animation or just replot the graph. Possible values are "replot" or "animate".
  opt - (object) Configuration options merged with this visualization configuration options.
  
  See also:

  <Sunburst.rotateAngle>
  
  */
  rotate: function(node, method, opt) {
    var theta = node.getPos(opt.property || 'current').getp(true).theta;
    this.rotated = node;
    this.rotateAngle(-theta, method, opt);
  },

  /*
  Method: rotateAngle
  
  Rotates the graph of an angle theta.
  
   Parameters:
   
   node - (object) A <Graph.Node>.
   method - (string) Whether to perform an animation or just replot the graph. Possible values are "replot" or "animate".
   opt - (object) Configuration options merged with this visualization configuration options.
   
   See also:

   <Sunburst.rotate>
  
  */
  rotateAngle: function(theta, method, opt) {
    var that = this;
    var options = $.merge(this.config, opt || {}, {
      modes: [ 'polar' ]
    });
    var prop = opt.property || (method === "animate" ? 'end' : 'current');
    if(method === 'animate') {
      this.fx.animation.pause();
    }
    this.graph.eachNode(function(n) {
      var p = n.getPos(prop);
      p.theta += theta;
      if (p.theta < 0) {
        p.theta += Math.PI * 2;
      }
    });
    if (method == 'animate') {
      this.fx.animate(options);
    } else if (method == 'replot') {
      this.fx.plot();
      this.busy = false;
    }
  },

  /*
   Method: plot
  
   Plots the Sunburst. This is a shortcut to *fx.plot*.
  */
  plot: function() {
    this.fx.plot();
  }
});

$jit.Sunburst.$extend = true;

(function(Sunburst) {

  /*
     Class: Sunburst.Op

     Custom extension of <Graph.Op>.

     Extends:

     All <Graph.Op> methods
     
     See also:
     
     <Graph.Op>

  */
  Sunburst.Op = new Class( {

    Implements: Graph.Op

  });

  /*
     Class: Sunburst.Plot

    Custom extension of <Graph.Plot>.
  
    Extends:
  
    All <Graph.Plot> methods
    
    See also:
    
    <Graph.Plot>
  
  */
  Sunburst.Plot = new Class( {

    Implements: Graph.Plot

  });

  /*
    Class: Sunburst.Label

    Custom extension of <Graph.Label>. 
    Contains custom <Graph.Label.SVG>, <Graph.Label.HTML> and <Graph.Label.Native> extensions.
  
    Extends:
  
    All <Graph.Label> methods and subclasses.
  
    See also:
  
    <Graph.Label>, <Graph.Label.Native>, <Graph.Label.HTML>, <Graph.Label.SVG>.
  
   */
  Sunburst.Label = {};

  /*
     Sunburst.Label.Native

     Custom extension of <Graph.Label.Native>.

     Extends:

     All <Graph.Label.Native> methods

     See also:

     <Graph.Label.Native>
  */
  Sunburst.Label.Native = new Class( {
    Implements: Graph.Label.Native,

    initialize: function(viz) {
      this.viz = viz;
      this.label = viz.config.Label;
      this.config = viz.config;
    },

    renderLabel: function(canvas, node, controller) {
      var span = node.getData('span');
      if(span < Math.PI /2 && Math.tan(span) * 
          this.config.levelDistance * node._depth < 10) {
        return;
      }
      var ctx = canvas.getCtx();
      var measure = ctx.measureText(node.name);
      if (node.id == this.viz.root) {
        var x = -measure.width / 2, y = 0, thetap = 0;
        var ld = 0;
      } else {
        var indent = 5;
        var ld = controller.levelDistance - indent;
        var clone = node.pos.clone();
        clone.rho += indent;
        var p = clone.getp(true);
        var ct = clone.getc(true);
        var x = ct.x, y = ct.y;
        // get angle in degrees
        var pi = Math.PI;
        var cond = (p.theta > pi / 2 && p.theta < 3 * pi / 2);
        var thetap = cond ? p.theta + pi : p.theta;
        if (cond) {
          x -= Math.abs(Math.cos(p.theta) * measure.width);
          y += Math.sin(p.theta) * measure.width;
        } else if (node.id == this.viz.root) {
          x -= measure.width / 2;
        }
      }
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(thetap);
      ctx.fillText(node.name, 0, 0);
      ctx.restore();
    }
  });

  /*
     Sunburst.Label.SVG

    Custom extension of <Graph.Label.SVG>.
  
    Extends:
  
    All <Graph.Label.SVG> methods
  
    See also:
  
    <Graph.Label.SVG>
  
  */
  Sunburst.Label.SVG = new Class( {
    Implements: Graph.Label.SVG,

    initialize: function(viz) {
      this.viz = viz;
    },

    /* 
       placeLabel

       Overrides abstract method placeLabel in <Graph.Plot>.

       Parameters:

       tag - A DOM label element.
       node - A <Graph.Node>.
       controller - A configuration/controller object passed to the visualization.
      
     */
    placeLabel: function(tag, node, controller) {
      var pos = node.pos.getc(true), viz = this.viz, canvas = this.viz.canvas;
      var radius = canvas.getSize();
      var labelPos = {
        x: Math.round(pos.x + radius.width / 2),
        y: Math.round(pos.y + radius.height / 2)
      };
      tag.setAttribute('x', labelPos.x);
      tag.setAttribute('y', labelPos.y);

      var bb = tag.getBBox();
      if (bb) {
        // center the label
    var x = tag.getAttribute('x');
    var y = tag.getAttribute('y');
    // get polar coordinates
    var p = node.pos.getp(true);
    // get angle in degrees
    var pi = Math.PI;
    var cond = (p.theta > pi / 2 && p.theta < 3 * pi / 2);
    if (cond) {
      tag.setAttribute('x', x - bb.width);
      tag.setAttribute('y', y - bb.height);
    } else if (node.id == viz.root) {
      tag.setAttribute('x', x - bb.width / 2);
    }

    var thetap = cond ? p.theta + pi : p.theta;
    if(node._depth)
      tag.setAttribute('transform', 'rotate(' + thetap * 360 / (2 * pi) + ' ' + x
          + ' ' + y + ')');
  }

  controller.onPlaceLabel(tag, node);
}
  });

  /*
     Sunburst.Label.HTML

     Custom extension of <Graph.Label.HTML>.

     Extends:

     All <Graph.Label.HTML> methods.

     See also:

     <Graph.Label.HTML>

  */
  Sunburst.Label.HTML = new Class( {
    Implements: Graph.Label.HTML,

    initialize: function(viz) {
      this.viz = viz;
    },
    /* 
       placeLabel

       Overrides abstract method placeLabel in <Graph.Plot>.

       Parameters:

       tag - A DOM label element.
       node - A <Graph.Node>.
       controller - A configuration/controller object passed to the visualization.
      
     */
    placeLabel: function(tag, node, controller) {
      var pos = node.pos.clone(), 
          canvas = this.viz.canvas,
          height = node.getData('height'),
          ldist = ((height || node._depth == 0)? height : this.viz.config.levelDistance) /2,
          radius = canvas.getSize();
      pos.rho += ldist;
      pos = pos.getc(true);
      
      var labelPos = {
        x: Math.round(pos.x + radius.width / 2),
        y: Math.round(pos.y + radius.height / 2)
      };

      var style = tag.style;
      style.left = labelPos.x + 'px';
      style.top = labelPos.y + 'px';
      style.display = this.fitsInCanvas(labelPos, canvas) ? '' : 'none';

      controller.onPlaceLabel(tag, node);
    }
  });

  /*
    Class: Sunburst.Plot.NodeTypes

    This class contains a list of <Graph.Node> built-in types. 
    Node types implemented are 'none', 'pie', 'multipie', 'gradient-pie' and 'gradient-multipie'.

    You can add your custom node types, customizing your visualization to the extreme.

    Example:

    (start code js)
      Sunburst.Plot.NodeTypes.implement({
        'mySpecialType': {
          'render': function(node, canvas) {
            //print your custom node to canvas
          },
          //optional
          'contains': function(node, pos) {
            //return true if pos is inside the node or false otherwise
          }
        }
      });
    (end code)

  */
  Sunburst.Plot.NodeTypes = new Class( {
    'none': {
      'render': $.empty,
      'contains': $.lambda(false),
      'anglecontains': function(node, pos) {
        var span = node.getData('span') / 2, theta = node.pos.theta;
        var begin = theta - span, end = theta + span;
        if (begin < 0)
          begin += Math.PI * 2;
        var atan = Math.atan2(pos.y, pos.x);
        if (atan < 0)
          atan += Math.PI * 2;
        if (begin > end) {
          return (atan > begin && atan <= Math.PI * 2) || atan < end;
        } else {
          return atan > begin && atan < end;
        }
      }
    },

    'pie': {
      'render': function(node, canvas) {
        var span = node.getData('span') / 2, theta = node.pos.theta;
        var begin = theta - span, end = theta + span;
        var polarNode = node.pos.getp(true);
        var polar = new Polar(polarNode.rho, begin);
        var p1coord = polar.getc(true);
        polar.theta = end;
        var p2coord = polar.getc(true);

        var ctx = canvas.getCtx();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(p1coord.x, p1coord.y);
        ctx.moveTo(0, 0);
        ctx.lineTo(p2coord.x, p2coord.y);
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, polarNode.rho * node.getData('dim-quotient'), begin, end,
            false);
        ctx.fill();
      },
      'contains': function(node, pos) {
        if (this.nodeTypes['none'].anglecontains.call(this, node, pos)) {
          var rho = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
          var ld = this.config.levelDistance, d = node._depth;
          return (rho <= ld * d);
        }
        return false;
      }
    },
    'multipie': {
      'render': function(node, canvas) {
        var height = node.getData('height');
        var ldist = height? height : this.config.levelDistance;
        var span = node.getData('span') / 2, theta = node.pos.theta;
        var begin = theta - span, end = theta + span;
        var polarNode = node.pos.getp(true);

        var polar = new Polar(polarNode.rho, begin);
        var p1coord = polar.getc(true);

        polar.theta = end;
        var p2coord = polar.getc(true);

        polar.rho += ldist;
        var p3coord = polar.getc(true);

        polar.theta = begin;
        var p4coord = polar.getc(true);

        var ctx = canvas.getCtx();
        ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.arc(0, 0, polarNode.rho, begin, end, false);
        ctx.arc(0, 0, polarNode.rho + ldist, end, begin, true);
        ctx.moveTo(p1coord.x, p1coord.y);
        ctx.lineTo(p4coord.x, p4coord.y);
        ctx.moveTo(p2coord.x, p2coord.y);
        ctx.lineTo(p3coord.x, p3coord.y);
        ctx.fill();

        if (node.collapsed) {
          ctx.save();
          ctx.lineWidth = 2;
          ctx.moveTo(0, 0);
          ctx.beginPath();
          ctx.arc(0, 0, polarNode.rho + ldist + 5, end - 0.01, begin + 0.01,
              true);
          ctx.stroke();
          ctx.restore();
        }
      },
      'contains': function(node, pos) {
        if (this.nodeTypes['none'].anglecontains.call(this, node, pos)) {
          var rho = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
          var height = node.getData('height');
          var ldist = height? height : this.config.levelDistance;
          var ld = this.config.levelDistance, d = node._depth;
          return (rho >= ld * d) && (rho <= (ld * d + ldist));
        }
        return false;
      }
    },

    'gradient-multipie': {
      'render': function(node, canvas) {
        var ctx = canvas.getCtx();
        var height = node.getData('height');
        var ldist = height? height : this.config.levelDistance;
        var radialGradient = ctx.createRadialGradient(0, 0, node.getPos().rho,
            0, 0, node.getPos().rho + ldist);

        var colorArray = $.hexToRgb(node.getData('color')), ans = [];
        $.each(colorArray, function(i) {
          ans.push(parseInt(i * 0.5, 10));
        });
        var endColor = $.rgbToHex(ans);
        radialGradient.addColorStop(0, endColor);
        radialGradient.addColorStop(1, node.getData('color'));
        ctx.fillStyle = radialGradient;
        this.nodeTypes['multipie'].render.call(this, node, canvas);
      },
      'contains': function(node, pos) {
        return this.nodeTypes['multipie'].contains.call(this, node, pos);
      }
    },

    'gradient-pie': {
      'render': function(node, canvas) {
        var ctx = canvas.getCtx();
        var radialGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, node
            .getPos().rho);

        var colorArray = $.hexToRgb(node.getData('color')), ans = [];
        $.each(colorArray, function(i) {
          ans.push(parseInt(i * 0.5, 10));
        });
        var endColor = $.rgbToHex(ans);
        radialGradient.addColorStop(1, endColor);
        radialGradient.addColorStop(0, node.getData('color'));
        ctx.fillStyle = radialGradient;
        this.nodeTypes['pie'].render.call(this, node, canvas);
      },
      'contains': function(node, pos) {
        return this.nodeTypes['pie'].contains.call(this, node, pos);
      }
    }
  });

  /*
    Class: Sunburst.Plot.EdgeTypes

    This class contains a list of <Graph.Adjacence> built-in types. 
    Edge types implemented are 'none', 'line' and 'arrow'.
  
    You can add your custom edge types, customizing your visualization to the extreme.
  
    Example:
  
    (start code js)
      Sunburst.Plot.EdgeTypes.implement({
        'mySpecialType': {
          'render': function(adj, canvas) {
            //print your custom edge to canvas
          },
          //optional
          'contains': function(adj, pos) {
            //return true if pos is inside the arc or false otherwise
          }
        }
      });
    (end code)
  
  */
  Sunburst.Plot.EdgeTypes = new Class({
    'none': $.empty,
    'line': {
      'render': function(adj, canvas) {
        var from = adj.nodeFrom.pos.getc(true),
            to = adj.nodeTo.pos.getc(true);
        this.edgeHelper.line.render(from, to, canvas);
      },
      'contains': function(adj, pos) {
        var from = adj.nodeFrom.pos.getc(true),
            to = adj.nodeTo.pos.getc(true);
        return this.edgeHelper.line.contains(from, to, pos, this.edge.epsilon);
      }
    },
    'arrow': {
      'render': function(adj, canvas) {
        var from = adj.nodeFrom.pos.getc(true),
            to = adj.nodeTo.pos.getc(true),
            dim = adj.getData('dim'),
            direction = adj.data.$direction,
            inv = (direction && direction.length>1 && direction[0] != adj.nodeFrom.id);
        this.edgeHelper.arrow.render(from, to, dim, inv, canvas);
      },
      'contains': function(adj, pos) {
        var from = adj.nodeFrom.pos.getc(true),
            to = adj.nodeTo.pos.getc(true);
        return this.edgeHelper.arrow.contains(from, to, pos, this.edge.epsilon);
      }
    },
    'hyperline': {
      'render': function(adj, canvas) {
        var from = adj.nodeFrom.pos.getc(),
            to = adj.nodeTo.pos.getc(),
            dim = Math.max(from.norm(), to.norm());
        this.edgeHelper.hyperline.render(from.$scale(1/dim), to.$scale(1/dim), dim, canvas);
      },
      'contains': $.lambda(false) //TODO(nico): Implement this!
    }
  });

})($jit.Sunburst);
