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
      iterations: 50,
      levelDistance: 50
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
          type: 'Circles',
        }, canvasConfig.background);
      }
      this.canvas = new Canvas(this, canvasConfig);
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
    this.labels = new $ForceDirected.Label[canvasConfig.Label.type](this);
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
    Implements: Graph.Label.Native,
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
      var pos = node.pos.getc(true), 
          canvas = this.viz.canvas,
          ox = canvas.translateOffsetX,
          oy = canvas.translateOffsetY,
          sx = canvas.scaleOffsetX,
          sy = canvas.scaleOffsetY,
          radius = canvas.getSize();
      var labelPos = {
        x: Math.round(pos.x * sx + ox + radius.width / 2),
        y: Math.round(pos.y * sy + oy + radius.height / 2)
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
      var pos = node.pos.getc(true), 
          canvas = this.viz.canvas,
          ox = canvas.translateOffsetX,
          oy = canvas.translateOffsetY,
          sx = canvas.scaleOffsetX,
          sy = canvas.scaleOffsetY,
          radius = canvas.getSize();
      var labelPos = {
        x: Math.round(pos.x * sx + ox + radius.width / 2),
        y: Math.round(pos.y * sy + oy + radius.height / 2)
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
  ForceDirected.Plot.NodeTypes = new Class({
    'none': {
      'render': $.empty,
      'contains': $.lambda(false)
    },
    'circle': {
      'render': function(node, canvas){
        var pos = node.pos.getc(true), 
            dim = node.getData('dim');
        this.nodeHelper.circle.render('fill', pos, dim, canvas);
      },
      'contains': function(node, pos){
        var npos = node.pos.getc(true), 
            dim = node.getData('dim');
        return this.nodeHelper.circle.contains(npos, pos, dim);
      }
    },
    'ellipse': {
      'render': function(node, canvas){
        var pos = node.pos.getc(true), 
            width = node.getData('width'), 
            height = node.getData('height');
        this.nodeHelper.ellipse.render('fill', pos, width, height, canvas);
        },
      // TODO(nico): be more precise...
      'contains': function(node, pos){
        var npos = node.pos.getc(true), 
            width = node.getData('width'), 
            height = node.getData('height');
        return this.nodeHelper.ellipse.contains(npos, pos, width, height);
      }
    },
    'square': {
      'render': function(node, canvas){
        var pos = node.pos.getc(true), 
            dim = node.getData('dim');
        this.nodeHelper.square.render('fill', pos, dim, canvas);
      },
      'contains': function(node, pos){
        var npos = node.pos.getc(true), 
            dim = node.getData('dim');
        return this.nodeHelper.square.contains(npos, pos, dim);
      }
    },
    'rectangle': {
      'render': function(node, canvas){
        var pos = node.pos.getc(true), 
            width = node.getData('width'), 
            height = node.getData('height');
        this.nodeHelper.rectangle.render('fill', pos, width, height, canvas);
      },
      'contains': function(node, pos){
        var npos = node.pos.getc(true), 
            width = node.getData('width'), 
            height = node.getData('height');
        return this.nodeHelper.rectangle.contains(npos, pos, width, height);
      }
    },
    'triangle': {
      'render': function(node, canvas){
        var pos = node.pos.getc(true), 
            dim = node.getData('dim');
        this.nodeHelper.triangle.render('fill', pos, dim, canvas);
      },
      'contains': function(node, pos) {
        var npos = node.pos.getc(true), 
            dim = node.getData('dim');
        return this.nodeHelper.triangle.contains(npos, pos, dim);
      }
    },
    'star': {
      'render': function(node, canvas){
        var pos = node.pos.getc(true),
            dim = node.getData('dim');
        this.nodeHelper.star.render('fill', pos, dim, canvas);
      },
      'contains': function(node, pos) {
        var npos = node.pos.getc(true),
            dim = node.getData('dim');
        return this.nodeHelper.star.contains(npos, pos, dim);
      }
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
  ForceDirected.Plot.EdgeTypes = new Class({
    'none': $.empty,
    'line': function(adj, canvas) {
      var from = adj.nodeFrom.pos.getc(true),
          to = adj.nodeTo.pos.getc(true);
      this.edgeHelper.line(from, to, canvas);
    },
    'arrow': function(adj, canvas) {
      var from = adj.nodeFrom.pos.getc(true),
          to = adj.nodeTo.pos.getc(true),
          dim = adj.getData('dim'),
          direction = adj.data.$direction,
          inv = (direction && direction.length>1 && direction[0] != adj.nodeFrom.id);
      this.edgeHelper.arrow(from, to, dim, inv, canvas);
    }
  });

})($jit.ForceDirected);
