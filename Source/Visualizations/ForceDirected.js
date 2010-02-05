/*
 * File: ForceDirected.js
 * 
 * Implements the <ForceDirected> class and other derived classes.
 *
 * Description:
 *
 *
 * Inspired by:
 *
 * Disclaimer:
 *
 * This visualization was built from scratch, taking only the paper as inspiration, and only shares some features with this paper.
 *
 * 
 */

/*
   Class: ForceDirected
      
     The main ForceDirected class

     Extends:

     <Loader>, <Tips>, <NodeStyles>, <Layouts.ForceDirected>

     Parameters:

     canvas - A <Canvas> Class
     config - A configuration/controller object.

     Configuration:
    
     The configuration object can have the following properties (all properties are optional and have a default value)
     
     *General*

     - _naturalLength_ Natural Length
     - _restoringForce_ Restoring Force 
     - _withLabels_ Whether the visualization should use/create labels or not. Default's *true*.

     *Node*
     
     Customize the visualization nodes' shape, color, and other style properties.

     Inherits options from <Options.Graph.Node>.

     *Edge*

     Customize the visualization edges' shape, color, and other style properties.

     Inherits Options from <Options.Graph.Edge>.
      
    *Animations*

    Inherits from <Options.Animation>.
     
    *Controller options*

    Inherits from <Options.Controller>.
    
    Instance Properties:

    - _graph_ Access a <Graph> instance.
    - _op_ Access a <ForceDirected.Op> instance.
    - _fx_ Access a <ForceDirected.Plot> instance.
    - _labels_ Access a <ForceDirected.Label> interface implementation.

    Example:

    Here goes a complete example. In most cases you won't be forced to implement all properties and methods. In fact, 
    all configuration properties  have the default value assigned.

    I won't be instantiating a <Canvas> class here. If you want to know more about instantiating a <Canvas> class 
    please take a look at the <Canvas> class documentation.

    (start code js)
      var fd = new ForceDirected(canvas, {
        naturalLength: 75,
        restoringForce: 2,
        withLabels: true,
        Node: {
          overridable: false,
          type: 'circle',
          color: '#ccb',
          lineWidth: 1,
          height: 5,
          width: 5,
          dim: 3
        },
        Edge: {
          overridable: false,
          type: 'line',
          color: '#ccb',
          lineWidth: 1
        },
        duration: 2500,
        fps: 40,
        transition: Trans.Quart.easeInOut,
        clearCanvas: true,
        onBeforeCompute: function(node) {
          //do something onBeforeCompute
        },
        onAfterCompute:  function () {
          //do something onAfterCompute
        },
        onCreateLabel:   function(domElement, node) {
          //do something onCreateLabel
        },
        onPlaceLabel:    function(domElement, node) {
          //do something onPlaceLabel
        },
        onBeforePlotNode:function(node) {
          //do something onBeforePlotNode
        },
        onAfterPlotNode: function(node) {
          //do something onAfterPlotNode
        },
        onBeforePlotLine:function(adj) {
          //do something onBeforePlotLine
        },
        onAfterPlotLine: function(adj) {
          //do something onAfterPlotLine
        }
      });
    (end code)

*/

$jit.ForceDirected = new Class( {

  Implements: [ Loader, Extras, Layouts.ForceDirected ],

  initialize: function(controller) {
    var $ForceDirected = $jit.ForceDirected;

    var config = {
      withLabels: true,
      iterations: 50,
      levelDistance: 50
    };

    this.controller = this.config = $.merge(Options("Canvas", "Node", "Edge",
        "Fx", "Tips", "NodeStyles", "Controller"), config, controller);

    var canvasConfig = this.config;
    if(canvasConfig.useCanvas) {
      this.canvas = canvasConfig.useCanvas;
      this.config.labelContainer = this.canvas.id + '-label';
    } else {
      this.canvas = new Canvas(canvasConfig);
      this.config.labelContainer = canvasConfig.injectInto + '-label';
    }

    this.graphOptions = {
      'complex': true,
      'Node': {
        'selected': false,
        'exist': true,
        'drawn': true
      }
    };
    this.graph = new Graph(this.graphOptions, this.config.Node,
        this.config.Edge);
    this.labels = new $ForceDirected.Label[canvasConfig.labels](this);
    this.fx = new $ForceDirected.Plot(this);
    this.op = new $ForceDirected.Op(this);
    this.json = null;
    this.busy = false;
    // initialize extras
    this.initializeExtras();
  },

  /* 
    Method: refresh 
    
    Computes nodes' positions and replots the tree.

  */
  refresh: function() {
    this.compute();
    this.plot();
  },

  /*
   Method: reposition
  
   An alias for computing new positions to _endPos_

   See also:

   <ForceDirected.compute>
   
  */
  reposition: function() {
    this.compute('end');
  },

  /*
  Method: computeIncremental
  
  Perform the <Layout.ForceDirected.compute> method incrementally.
  
  Description:
  
  ForceDirected algorithms can perform many computations and lead to JavaScript taking too much time to complete. 
  This method splits the algorithm into "small parts" allowing the user to track the evolution of the algorithm and 
  avoiding browser messages such as "This script is taking too long to complete".
  
  Parameters:
  
  opt - An Options object containing as properties
  
  _iter_ - Split the algorithm into pieces of _iter_ iterations. For example, if the _iterations_ configuration property 
  of your <ForceDirected> class is 100, then you could set _iter_ to 20 to split the main algorithm into 5 smaller pieces. 
  Default's 20. 
  
  _property_ - Possible values are 'end', 'start', 'current'. You can also set an array of these properties. if you'd like to 
  keep the current node positions but to perform these computations for final animation positions then you can just choose 'end'. 
  Default's 'end'.
  
  _onStep_ - A callback function called when each "small part" of the algorithm completed. This function gets as first formal 
  parameter a percentage value.
  
  _onComplete_ - A callback function called when the algorithm completed.
  
  Example:
  
  In this example I calculate the end positions and then animate the graph to those positions
  
  (start code js)
  var fd = new ForceDirected(...);
  fd.computeIncremental({
    iter: 20,
    property: 'end',
    onStep: function(perc) {
      Log.write("loading " + perc + "%");
    },
    onComplete: function() {
      Log.write("done");
      fd.animate();
    }
  });
  (end code)
  
  In this example I calculate all positions and (re)plot the graph
  
  (start code js)
  var fd = new ForceDirected(...);
  fd.computeIncremental({
    iter: 20,
    property: ['end', 'start', 'current'],
    onStep: function(perc) {
      Log.write("loading " + perc + "%");
    },
    onComplete: function() {
      Log.write("done");
      fd.plot();
    }
  });
  (end code)
  
  See also:

  <Layouts.ForceDirected.compute>
  
  */
  computeIncremental: function(opt) {
    opt = $.merge( {
      iter: 20,
      property: 'end',
      onStep: $.empty,
      onComplete: $.empty
    }, opt || {});

    this.config.onBeforeCompute(this.graph.getNode(this.root));
    this.compute(opt.property, opt);
  },

  /*
    Method: plot
   
    Plots the ForceDirected
   */
  plot: function() {
    this.fx.plot();
  },

  /*
     Method: animate
    
     Animates the graph to the end positions specified.
  */
  animate: function(opt) {
    this.fx.animate($.merge( {
      modes: [ 'linear' ]
    }, opt || {}));
  }
});

$jit.ForceDirected.$extend = true;

(function(ForceDirected) {

  /*
     Class: ForceDirected.Op

     Performs advanced operations on trees and graphs.

     Extends:

     All <Graph.Op> methods

     Access:

     This instance can be accessed with the _op_ parameter of the <ForceDirected> instance created.

     Example:

     (start code js)
      var fd = new ForceDirected(canvas, config);
      fd.op.morph //or can also call any other <Graph.Op> method
     (end code)
     
  */
  ForceDirected.Op = new Class( {

    Implements: Graph.Op,

    initialize: function(viz) {
      this.viz = viz;
    }
  });

  /*
     Class: ForceDirected.Plot

     Performs plotting operations.

     Extends:

     All <Graph.Plot> methods

     Access:

     This instance can be accessed with the _fx_ parameter of the <ForceDirected> instance created.

     Example:

     (start code js)
      var fd = new ForceDirected(canvas, config);
      fd.fx.plot //or can also call any other <ForceDirected.Plot> method
     (end code)

  */
  ForceDirected.Plot = new Class( {

    Implements: Graph.Plot,

    initialize: function(viz) {
      this.viz = viz;
      this.config = viz.config;
      this.node = viz.config.Node;
      this.edge = viz.config.Edge;
      this.animation = new Animation;
      this.nodeTypes = new ForceDirected.Plot.NodeTypes;
      this.edgeTypes = new ForceDirected.Plot.EdgeTypes;
      this.labels = viz.labels;
    }
  });

  /*
    Object: ForceDirected.Label

    Label interface implementation for the ForceDirected

    See Also:

    <Graph.Label>, <ForceDirected.Label.HTML>, <ForceDirected.Label.SVG>

   */
  ForceDirected.Label = {};

  /*
     Class: ForceDirected.Label.Native

     Implements labels natively, using the Canvas text API.

     Extends:

     <Graph.Label.Native>

     See also:

     <Hypertree.Label>, <ForceDirected.Label>, <ST.Label>, <Hypertree>, <ForceDirected>, <ST>, <Graph>.

  */
  ForceDirected.Label.Native = new Class( {
    Implements: Graph.Label.Native
  });

  /*
     Class: ForceDirected.Label.SVG

     Implements labels using SVG (currently not supported in IE).

     Extends:

     <Graph.Label.SVG>

     See also:

     <Hypertree.Label>, <ForceDirected.Label>, <ST.Label>, <Hypertree>, <ForceDirected>, <ST>, <Graph>.

  */
  ForceDirected.Label.SVG = new Class( {
    Implements: Graph.Label.SVG,

    initialize: function(viz) {
      this.viz = viz;
    },

    /* 
       Method: placeLabel

       Overrides abstract method placeLabel in <Graph.Plot>.

       Parameters:

       tag - A DOM label element.
       node - A <Graph.Node>.
       controller - A configuration/controller object passed to the visualization.
      
     */
    placeLabel: function(tag, node, controller) {
      var pos = node.pos.getc(true), canvas = this.viz.canvas;
      var radius = canvas.getSize();
      var labelPos = {
        x: Math.round(pos.x + radius.width / 2),
        y: Math.round(pos.y + radius.height / 2)
      };
      tag.setAttribute('x', labelPos.x);
      tag.setAttribute('y', labelPos.y);

      controller.onPlaceLabel(tag, node);
    }
  });

  /*
     Class: ForceDirected.Label.HTML

     Implements labels using plain old HTML.

     Extends:

     <Graph.Label.HTML>

     See also:

     <Hypertree.Label>, <ForceDirected.Label>, <ST.Label>, <Hypertree>, <ForceDirected>, <ST>, <Graph>.

  */
  ForceDirected.Label.HTML = new Class( {
    Implements: Graph.Label.HTML,

    initialize: function(viz) {
      this.viz = viz;
    },
    /* 
       Method: placeLabel

       Overrides abstract method placeLabel in <Graph.Plot>.

       Parameters:

       tag - A DOM label element.
       node - A <Graph.Node>.
       controller - A configuration/controller object passed to the visualization.
      
     */
    placeLabel: function(tag, node, controller) {
      var pos = node.pos.getc(true), canvas = this.viz.canvas;
      var radius = canvas.getSize();
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
    Class: ForceDirected.Plot.NodeTypes

    Here are implemented all kinds of node rendering functions. 
    Rendering functions implemented are 'none', 'circle', 'triangle', 'rectangle', 'star' and 'square'.

    You can add new Node types by implementing a new method in this class

    Example:

    (start code js)
      ForceDirected.Plot.NodeTypes.implement({
        'newnodetypename': function(node, canvas) {
          //Render my node here.
        }
      });
    (end code)

  */
  ForceDirected.Plot.NodeTypes = new Class(
      {
        'none': {
          'render': $.empty,
          'contains': $.lambda(false)
        },

        'circle': {
          'render': function(node, canvas) {
            var pos = node.pos.getc(true);
            var nodeDim = node.getData('dim');
            canvas.path('fill', function(context) {
              context.arc(pos.x, pos.y, nodeDim, 0, Math.PI * 2, true);
            });
          },
          'contains': $.lambda(false)
        },

        'square': {
          'render': function(node, canvas) {
            var pos = node.pos.getc(true);
            var nodeDim = node.getData('dim');
            var nodeDim2 = 2 * nodeDim;
            canvas.getCtx().fillRect(pos.x - nodeDim, pos.y - nodeDim,
                nodeDim2, nodeDim2);
          },
          'contains': $.lambda(false)
        },

        'rectangle': {
          'render': function(node, canvas) {
            var pos = node.pos.getc(true);
            var width = node.getData('width');
            var height = node.getData('height');
            canvas.getCtx().fillRect(pos.x - width / 2, pos.y - height / 2,
                width, height);
          },
          'contains': $.lambda(false)
        },

        'triangle': {
          'render': function(node, canvas) {
            var pos = node.pos.getc(true);
            var nodeDim = node.getData('dim');
            var c1x = pos.x, c1y = pos.y - nodeDim, c2x = c1x - nodeDim, c2y = pos.y
                + nodeDim, c3x = c1x + nodeDim, c3y = c2y;
            canvas.path('fill', function(ctx) {
              ctx.moveTo(c1x, c1y);
              ctx.lineTo(c2x, c2y);
              ctx.lineTo(c3x, c3y);
            });
          },
          'contains': $.lambda(false)
        },

        'star': {
          'render': function(node, canvas) {
            var pos = node.pos.getc(true);
            var nodeDim = node.getData('dim');
            var ctx = canvas.getCtx(), pi5 = Math.PI / 5;
            ctx.save();
            ctx.translate(pos.x, pos.y);
            ctx.beginPath();
            ctx.moveTo(nodeDim, 0);
            for ( var i = 0; i < 9; i++) {
              ctx.rotate(pi5);
              if (i % 2 == 0) {
                ctx.lineTo((nodeDim / 0.525731) * 0.200811, 0);
              } else {
                ctx.lineTo(nodeDim, 0);
              }
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          },
          'contains': $.lambda(false)
        }
      });

  /*
    Class: ForceDirected.Plot.EdgeTypes

    Here are implemented all kinds of edge rendering functions. 
    Rendering functions implemented are 'none', 'line' and 'arrow'.

    You can add new Edge types by implementing a new method in this class

    Example:

    (start code js)
      ForceDirected.Plot.EdgeTypes.implement({
        'newedgetypename': function(adj, canvas) {
          //Render my edge here.
        }
      });
    (end code)

  */
  ForceDirected.Plot.EdgeTypes = new Class( {
    'none': $.empty,

    'line': function(adj, canvas) {
      var pos = adj.nodeFrom.pos.getc(true);
      var posChild = adj.nodeTo.pos.getc(true);
      canvas.path('stroke', function(context) {
        context.moveTo(pos.x, pos.y);
        context.lineTo(posChild.x, posChild.y);
      });
    },

    'arrow': function(adj, canvas) {
      var node = adj.nodeFrom, child = adj.nodeTo;
      var data = adj.data, econfig = this.edge;
      // get edge dim
      var cond = econfig.overridable;
      var edgeDim = adj.getData('dim');
      // get edge direction
      if (cond && data.$direction && data.$direction.length > 1) {
        var nodeHash = {};
        nodeHash[node.id] = node;
        nodeHash[child.id] = child;
        var sense = data.$direction;
        node = nodeHash[sense[0]];
        child = nodeHash[sense[1]];
      }
      var posFrom = node.pos.getc(true), posTo = child.pos.getc(true);
      var vect = new Complex(posTo.x - posFrom.x, posTo.y - posFrom.y);
      vect.$scale(edgeDim / vect.norm());
      var intermediatePoint = new Complex(posTo.x - vect.x, posTo.y - vect.y);
      var normal = new Complex(-vect.y / 2, vect.x / 2);
      var v1 = intermediatePoint.add(normal), v2 = intermediatePoint.
        $add(normal.$scale(-1));
      canvas.path('stroke', function(context) {
        context.moveTo(posFrom.x, posFrom.y);
        context.lineTo(posTo.x, posTo.y);
      });
      canvas.path('fill', function(context) {
        context.moveTo(v1.x, v1.y);
        context.lineTo(v2.x, v2.y);
        context.lineTo(posTo.x, posTo.y);
      });
    }
  });

})($jit.ForceDirected);
