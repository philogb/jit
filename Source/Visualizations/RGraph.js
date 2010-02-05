/*
 * File: RGraph.js
 * 
 * Implements the <RGraph> class and other derived classes.
 *
 * Description:
 *
 * A radial layout of a tree puts the root node on the center of the canvas, places its children on the first concentric ring away from the root node, its grandchildren on a second concentric ring, and so on...
 *
 * Ka-Ping Yee, Danyel Fisher, Rachna Dhamija and Marti Hearst introduced a very interesting paper called "Animated Exploration of Dynamic Graphs with Radial Layout". In this paper they describe a way to animate a radial layout of a tree with ease-in and ease-out transitions, which make transitions from a graph's state to another easier to understand for the viewer.
 *
 * Inspired by:
 *
 * Animated Exploration of Dynamic Graphs with Radial Layout (Ka-Ping Yee, Danyel Fisher, Rachna Dhamija, Marti Hearst)
 *
 * <http://bailando.sims.berkeley.edu/papers/infovis01.htm>
 *
 * Disclaimer:
 *
 * This visualization was built from scratch, taking only the paper as inspiration, and only shares some features with this paper.
 *
 * 
 */

/*
   Class: RGraph
      
     The main RGraph class

     Extends:

     <Loader>, <Layouts.Radial>

     Parameters:

     canvas - A <Canvas> Class
     config - A configuration/controller object.

     Configuration:
    
     The configuration object can have the following properties (all properties are optional and have a default value)
     
     *General*

     - _interpolation_ Interpolation type used for animations. Possible options are 'polar' and 'linear'. Default's 'linear'.
     - _levelDistance_ Distance between a parent node and its children. Default's 100.
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
    - _op_ Access a <RGraph.Op> instance.
    - _fx_ Access a <RGraph.Plot> instance.
    - _labels_ Access a <RGraph.Label> interface implementation.

    Example:

    Here goes a complete example. In most cases you won't be forced to implement all properties and methods. In fact, 
    all configuration properties  have the default value assigned.

    I won't be instantiating a <Canvas> class here. If you want to know more about instantiating a <Canvas> class 
    please take a look at the <Canvas> class documentation.

    (start code js)
      var rgraph = new RGraph(canvas, {
        interpolation: 'linear',
        levelDistance: 100,
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

$jit.RGraph = new Class( {

  Implements: [
      Loader, Extras, Layouts.Radial
  ],

  initialize: function(controller){
    var $RGraph = $jit.RGraph;

    var config = {
      interpolation: 'linear',
      levelDistance: 100,
      withLabels: true
    };

    this.controller = this.config = $.merge(Options("Canvas", "Node", "Edge",
        "Fx", "Controller", "Tips", "NodeStyles"), config, controller);

    var canvasConfig = this.config;
    if(canvasConfig.useCanvas) {
      this.canvas = canvasConfig.useCanvas;
      this.config.labelContainer = this.canvas.id + '-label';
    } else {
      this.canvas = new Canvas(canvasConfig);
      this.config.labelContainer = canvasConfig.injectInto + '-label';
    }

    this.graphOptions = {
      'complex': false,
      'Node': {
        'selected': false,
        'exist': true,
        'drawn': true
      }
    };
    this.graph = new Graph(this.graphOptions, this.config.Node,
        this.config.Edge);
    this.labels = new $RGraph.Label[canvasConfig.labels](this);
    this.fx = new $RGraph.Plot(this);
    this.op = new $RGraph.Op(this);
    this.json = null;
    this.root = null;
    this.busy = false;
    this.parent = false;
    // initialize extras
    this.initializeExtras();
  },

  /* 
  
    Method: createLevelDistanceFunc 
  
    Returns the levelDistance function used for calculating a node distance 
    to its origin. This function returns a function that is computed 
    per level and not per node, such that all nodes with the same depth will have the 
    same distance to the origin. The resulting function gets the 
    parent node as parameter and returns a float.

   */
  createLevelDistanceFunc: function(){
    var ld = this.config.levelDistance;
    return function(elem){
      return (elem._depth + 1) * ld;
    };
  },

  /* 
     Method: refresh 
     
     Computes nodes' positions and replots the tree.

   */
  refresh: function(){
    this.compute();
    this.plot();
  },

  /*
   Method: reposition
  
   An alias for computing new positions to _endPos_

   See also:

   <RGraph.compute>
   
  */
  reposition: function(){
    this.compute('end');
  },

  /*
   Method: plot
  
   Plots the RGraph
  */
  plot: function(){
    this.fx.plot();
  },
  /*
   getNodeAndParentAngle
  
   Returns the _parent_ of the given node, also calculating its angle span.
  */
  getNodeAndParentAngle: function(id){
    var theta = false;
    var n = this.graph.getNode(id);
    var ps = Graph.Util.getParents(n);
    var p = (ps.length > 0)? ps[0] : false;
    if (p) {
      var posParent = p.pos.getc(), posChild = n.pos.getc();
      var newPos = posParent.add(posChild.scale(-1));
      theta = Math.atan2(newPos.y, newPos.x);
      if (theta < 0)
        theta += 2 * Math.PI;
    }
    return {
      parent: p,
      theta: theta
    };
  },

  /*
   tagChildren
  
   Enumerates the children in order to mantain child ordering (second constraint of the paper).
  */
  tagChildren: function(par, id){
    if (par.angleSpan) {
      var adjs = [];
      Graph.Util.eachAdjacency(par, function(elem){
        adjs.push(elem.nodeTo);
      }, "ignore");
      var len = adjs.length;
      for ( var i = 0; i < len && id != adjs[i].id; i++)
        ;
      for ( var j = (i + 1) % len, k = 0; id != adjs[j].id; j = (j + 1) % len) {
        adjs[j].dist = k++;
      }
    }
  },

  /* 
  Method: onClick 
  
  Performs all calculations and animations to center the node specified by _id_.

  Parameters:

  id - A <Graph.Node> id.
  opt - _optional_ An object containing some extra properties like

  - _hideLabels_ Hide labels when performing the animation. Default's *true*.

  Example:

  (start code js)
    rgraph.onClick('someid');
    //or also...
    rgraph.onClick('someid', {
     hideLabels: false
    });
   (end code)
   
  */
  onClick: function(id, opt){
    if (this.root != id && !this.busy) {
      this.busy = true;
      this.root = id;
      that = this;
      this.controller.onBeforeCompute(this.graph.getNode(id));
      var obj = this.getNodeAndParentAngle(id);

      // second constraint
      this.tagChildren(obj.parent, id);
      this.parent = obj.parent;
      this.compute('end');

      // first constraint
      var thetaDiff = obj.theta - obj.parent.endPos.theta;
      Graph.Util.eachNode(this.graph, function(elem){
        elem.endPos.set(elem.endPos.getp().add($P(thetaDiff, 0)));
      });

      var mode = this.config.interpolation;
      opt = $.merge( {
        onComplete: $.empty
      }, opt || {});

      this.fx.animate($.merge( {
        hideLabels: true,
        modes: [
          mode
        ]
      }, opt, {
        onComplete: function(){
          that.busy = false;
          opt.onComplete();
        }
      }));
    }
  }
});

$jit.RGraph.$extend = true;

(function(RGraph){

  /*
     Class: RGraph.Op

     Performs advanced operations on trees and graphs.

     Extends:

     All <Graph.Op> methods

     Access:

     This instance can be accessed with the _op_ parameter of the <RGraph> instance created.

     Example:

     (start code js)
      var rgraph = new RGraph(canvas, config);
      rgraph.op.morph //or can also call any other <Graph.Op> method
     (end code)
     
  */
  RGraph.Op = new Class( {

    Implements: Graph.Op,

    initialize: function(viz){
      this.viz = viz;
    }
  });

  /*
     Class: RGraph.Plot

     Performs plotting operations.

     Extends:

     All <Graph.Plot> methods

     Access:

     This instance can be accessed with the _fx_ parameter of the <RGraph> instance created.

     Example:

     (start code js)
      var rgraph = new RGraph(canvas, config);
      rgraph.fx.placeLabel //or can also call any other <RGraph.Plot> method
     (end code)

  */
  RGraph.Plot = new Class( {

    Implements: Graph.Plot,

    initialize: function(viz){
      this.viz = viz;
      this.config = viz.config;
      this.node = viz.config.Node;
      this.edge = viz.config.Edge;
      this.animation = new Animation;
      this.nodeTypes = new RGraph.Plot.NodeTypes;
      this.edgeTypes = new RGraph.Plot.EdgeTypes;
      this.labels = viz.labels;
    }
  });

  /*
    Object: RGraph.Label

    Label interface implementation for the RGraph

    See Also:

    <Graph.Label>, <RGraph.Label.HTML>, <RGraph.Label.SVG>

   */
  RGraph.Label = {};

  /*
     Class: RGraph.Label.Native

     Implements labels natively, using the Canvas text API.

     Extends:

     <Graph.Label.Native>

     See also:

     <Hypertree.Label>, <RGraph.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

  */
  RGraph.Label.Native = new Class( {
    Implements: Graph.Label.Native
  });

  /*
     Class: RGraph.Label.SVG

     Implements labels using SVG (currently not supported in IE).

     Extends:

     <Graph.Label.SVG>

     See also:

     <Hypertree.Label>, <RGraph.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

  */
  RGraph.Label.SVG = new Class( {
    Implements: Graph.Label.SVG,

    initialize: function(viz){
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
    placeLabel: function(tag, node, controller){
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
     Class: RGraph.Label.HTML

     Implements labels using plain old HTML.

     Extends:

     <Graph.Label.HTML>

     See also:

     <Hypertree.Label>, <RGraph.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

  */
  RGraph.Label.HTML = new Class( {
    Implements: Graph.Label.HTML,

    initialize: function(viz){
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
    placeLabel: function(tag, node, controller){
      var pos = node.pos.getc(true), canvas = this.viz.canvas;
      var radius = canvas.getSize();
      var labelPos = {
        x: Math.round(pos.x + radius.width / 2),
        y: Math.round(pos.y + radius.height / 2)
      };

      var style = tag.style;
      style.left = labelPos.x + 'px';
      style.top = labelPos.y + 'px';
      style.display = this.fitsInCanvas(labelPos, canvas)? '' : 'none';

      controller.onPlaceLabel(tag, node);
    }
  });

  /*
    Class: RGraph.Plot.NodeTypes

    Here are implemented all kinds of node rendering functions. 
    Rendering functions implemented are 'none', 'circle', 'triangle', 'rectangle', 'star' and 'square'.

    You can add new Node types by implementing a new method in this class

    Example:

    (start code js)
      RGraph.Plot.NodeTypes.implement({
        'newnodetypename': function(node, canvas) {
          //Render my node here.
        }
      });
    (end code)

  */
  RGraph.Plot.NodeTypes = new Class(
      {
        'circle': {
          'render': function(node, canvas){
            var pos = node.pos.getc(true);
            var nodeDim = node.getData('dim') / 2;
            canvas.path('fill', function(context){
              context.arc(pos.x, pos.y, nodeDim, 0, Math.PI * 2, true);
            });
          },
          'contains': $.lambda(false)
        },

        'ellipse': {
          'render': function(node, canvas){
            var pos = node.pos.getc(true);
            var width = node.getData('width') / 2;
            var height = node.getData('height') / 2;
            var ctx = canvas.getCtx();
            ctx.save();
            ctx.scale(width / height, height / width);
            canvas.path('fill', function(context){
              context.arc(pos.x * (height / width), pos.y * (width / height),
                  height, 0, Math.PI * 2, true);
            });
            ctx.restore();
          },
          'contains': $.lambda(false)
        },

        'square': {
          'render': function(node, canvas){
            var pos = node.pos.getc(true);
            var nodeDim = node.getData('dim');
            var nodeDim2 = 2 * nodeDim;
            canvas.getCtx().fillRect(pos.x - nodeDim, pos.y - nodeDim,
                nodeDim2, nodeDim2);
          },
          'contains': $.lambda(false)
        },

        'rectangle': {
          'render': function(node, canvas){
            var pos = node.pos.getc(true);
            var width = node.getData('width');
            var height = node.getData('height');
            canvas.getCtx().fillRect(pos.x - width / 2, pos.y - height / 2,
                width, height);
          },
          'contains': $.lambda(false)
        },

        'triangle': {
          'render': function(node, canvas){
            var pos = node.pos.getc(true);
            var nodeDim = node.getData('dim');
            var c1x = pos.x, c1y = pos.y - nodeDim, c2x = c1x - nodeDim, c2y = pos.y
                + nodeDim, c3x = c1x + nodeDim, c3y = c2y;
            canvas.path('fill', function(ctx){
              ctx.moveTo(c1x, c1y);
              ctx.lineTo(c2x, c2y);
              ctx.lineTo(c3x, c3y);
            });
          },
          'contains': $.lambda(false)
        },

        'star': {
          'render': function(node, canvas){
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
    Class: RGraph.Plot.EdgeTypes

    Here are implemented all kinds of edge rendering functions. 
    Rendering functions implemented are 'none', 'line' and 'arrow'.

    You can add new Edge types by implementing a new method in this class

    Example:

    (start code js)
      RGraph.Plot.EdgeTypes.implement({
        'newedgetypename': function(adj, canvas) {
          //Render my edge here.
        }
      });
    (end code)

  */
  RGraph.Plot.EdgeTypes = new Class( {
    'none': $.empty,

    'line': function(adj, canvas){
      var pos = adj.nodeFrom.pos.getc(true);
      var posChild = adj.nodeTo.pos.getc(true);
      canvas.path('stroke', function(context){
        context.moveTo(pos.x, pos.y);
        context.lineTo(posChild.x, posChild.y);
      });
    },

    'arrow': function(adj, canvas){
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
    var v1 = intermediatePoint.add(normal), v2 = intermediatePoint.$add(normal
        .$scale(-1));
    canvas.path('stroke', function(context){
      context.moveTo(posFrom.x, posFrom.y);
      context.lineTo(posTo.x, posTo.y);
    });
    canvas.path('fill', function(context){
      context.moveTo(v1.x, v1.y);
      context.lineTo(v2.x, v2.y);
      context.lineTo(posTo.x, posTo.y);
    });
  }
  });

})($jit.RGraph);
