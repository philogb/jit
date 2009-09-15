/*
 * File: Hypertree.js
 * 
 * Implements the <Hypertree> class and other derived classes.
 *
 * Description:
 *
 * A Hyperbolic Tree (HT) is a focus+context information visualization technique used to display large amount of inter-related data. This technique was originally developed at Xerox PARC.
 *
 * The HT algorithm plots a tree in what's called the Poincare Disk model of Hyperbolic Geometry, a kind of non-Euclidean geometry. By doing this, the HT algorithm applies a moebius transformation to the tree in order to display it with a magnifying glass effect.
 *
 * Inspired by:
 *
 * A Focus+Context Technique Based on Hyperbolic Geometry for Visualizing Large Hierarchies (John Lamping, Ramana Rao, and Peter Pirolli).
 *
 * <http://www.cs.tau.ac.il/~asharf/shrek/Projects/HypBrowser/startree-chi95.pdf>
 *
 * Disclaimer:
 *
 * This visualization was built from scratch, taking only the paper as inspiration, and only shares some features with the Hypertree.
 *

*/

/* 
     Complex 
     
     A multi-purpose Complex Class with common methods. Extended for the Hypertree. 
 
*/ 
/* 
   moebiusTransformation 
 
   Calculates a moebius transformation for this point / complex. 
    For more information go to: 
        http://en.wikipedia.org/wiki/Moebius_transformation. 
 
   Parameters: 
 
      c - An initialized Complex instance representing a translation Vector. 
*/ 
 
Complex.prototype.moebiusTransformation = function(c) { 
    var num = this.add(c); 
    var den = c.$conjugate().$prod(this); den.x++; 
    return num.$div(den); 
}; 
 
/* 
   Method: getClosestNodeToOrigin 
 
   Extends <Graph.Util>. Returns the closest node to the center of canvas.

   Parameters:
  
    graph - A <Graph> instance.
    prop - _optional_ a <Graph.Node> position property. Possible properties are 'startPos', 'pos' or 'endPos'. Default's 'pos'.

   Returns:

    Closest node to origin. Returns *null* otherwise.
  
*/ 
Graph.Util.getClosestNodeToOrigin = function(graph, prop, flags) { 
    return this.getClosestNodeToPos(graph, Polar.KER, prop, flags);
}; 

/* 
   Method: getClosestNodeToPos
 
   Extends <Graph.Util>. Returns the closest node to the given position.

   Parameters:
  
    graph - A <Graph> instance.
    p[os - A <Complex> or <Polar> instance.
    prop - _optional_ a <Graph.Node> position property. Possible properties are 'startPos', 'pos' or 'endPos'. Default's 'pos'.

   Returns:

    Closest node to the given position. Returns *null* otherwise.
  
*/ 
Graph.Util.getClosestNodeToPos = function(graph, pos, prop, flags) { 
  var node = null; prop = prop || 'pos'; pos = pos && pos.getc(true) || Complex.KER;
  var distance = function(a, b) { 
    var d1 = a.x - b.x, d2 = a.y - b.y;
    return d1 * d1 + d2 * d2;
  };
  this.eachNode(graph, function(elem) { 
    node = (node == null || distance(elem[prop].getc(true), pos) < distance(node[prop].getc(true), pos))? elem : node; 
  }, flags); 
  return node; 
}; 

/* 
    moebiusTransformation 
     
    Calculates a moebius transformation for the hyperbolic tree. 
     
    <http://en.wikipedia.org/wiki/Moebius_transformation> 
      
     Parameters: 
     
        graph - A <Graph> instance.
        pos - A <Complex>.
        prop - A property array.
        theta - Rotation angle. 
        startPos - _optional_ start position. 
*/   
Graph.Util.moebiusTransformation = function(graph, pos, prop, startPos, flags) { 
    this.eachNode(graph, function(elem) { 
        for(var i=0; i<prop.length; i++) { 
            var p = pos[i].scale(-1), property = startPos? startPos : prop[i];  
            elem[prop[i]].set(elem[property].getc().moebiusTransformation(p)); 
        } 
    }, flags); 
}; 
 
/* 
   Class: Hypertree 
      
     The main Hypertree class

     Extends:

     <Loader>, <Layout.Radial>

     Parameters:

     canvas - A <Canvas> Class
     config - A configuration/controller object.

     Configuration:
    
     The configuration object can have the following properties (all properties are optional and have a default value)
      
     *General*
     
     - _withLabels_ Whether the visualization should use/create labels or not. Default's *true*.
     - _radius_ The radius length of the visualization. Default's "auto" which means that the radius will be calculated to 
     fit the canvas. You can change this value to any float value.
     
     *Node*
     
     Customize the visualization nodes' shape, color, and other style properties.

     Inherits options from <Options.Graph.Node>.

     *Edge*

     Customize the visualization edges' shape, color, and other style properties.

     Inherits from <Options.Graph.Edge>.
      
     *Animations*

     Inherits from <Options.Animation>.
     
    *Controller options*

     Inherits from <Options.Controller>.
     
    Instance Properties:

    - _graph_ Access a <Graph> instance.
    - _op_ Access a <Hypertree.Op> instance.
    - _fx_ Access a <Hypertree.Plot> instance.
    - _labels_ Access a <Hypertree.Label> instance.

    Example:

    Here goes a complete example. In most cases you won't be forced to implement all properties and methods. In fact, 
    all configuration properties  have the default value assigned.

    I won't be instantiating a <Canvas> class here. If you want to know more about instantiating a <Canvas> class 
    please take a look at the <Canvas> class documentation.

    (start code js)
      var ht = new Hypertree(canvas, {
        
        Node: {
          overridable: false,
          type: 'circle',
          color: '#ccb',
          lineWidth: 1,
          height: 5,
          width: 5,
          dim: 7,
          transform: true
        },
        Edge: {
          overridable: false,
          type: 'hyperline',
          color: '#ccb',
          lineWidth: 1
        },
        duration: 1500,
        fps: 40,
        transition: Trans.Quart.easeInOut,
        clearCanvas: true,
        withLabels: true,
        radius: "auto",
        
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
 
this.Hypertree = new Class({ 
   
  Implements: [Loader, Layouts.Radial], 
   
  initialize: function(canvas, controller) { 
    var config = { 
      labelContainer: canvas.id + '-label',
      radius: "auto",
      Edge: { 
          type: 'hyperline' 
      },
      withLabels: true,
      duration: 1500,
      fps: 35
    }; 
    this.controller = this.config = $merge(Options.Graph, 
        Options.Animation, 
        Options.Controller, 
        config, controller); 
    
    this.graphOptions = { 
        'complex': false, 
        'Node': { 
            'selected': false, 
            'exist': true, 
            'drawn': true 
        } 
    }; 
    this.graph = new Graph(this.graphOptions); 
    this.labels = new Hypertree.Label[canvas.getConfig().labels](this);
    this.fx = new Hypertree.Plot(this); 
    this.op = new Hypertree.Op(this); 
    this.json = null; 
    this.canvas = canvas; 
    this.root = null; 
    this.busy = false; 
  }, 

  /* 
  
  Method: createLevelDistanceFunc 

  Returns the levelDistance function used for calculating a node distance 
  to its origin. This function returns a function that is computed 
  per level and not per node, such that all nodes with the same depth will have the 
  same distance to the origin. The resulting function gets the 
  parent node as parameter and returns a float.

 */
  createLevelDistanceFunc: function() {
    //get max viz. length.
    var r = this.getRadius();
    //get max depth.
    var depth = 0, max = Math.max;
    Graph.Util.eachNode(this.graph, function(node) {
        depth = max(node._depth, depth);
    }, "ignore");
    depth++;
    //node distance generator
    var genDistFunc = function(a) {
      return function(node) {
        node.scale = r;
        var d = node._depth +1;
        var acum = 0, pow = Math.pow;
        while(d) {
          acum += pow(a, d--);  
        }
        return acum;
      };
    };
    //estimate better edge length.
    for(var i=0.51; i<=1; i+=0.01) {
      var valSeries = (1 - Math.pow(i, depth)) / (1 - i);
      if(valSeries >= 2) {
        return genDistFunc(i - 0.01);
      }
    } 
    return genDistFunc(0.5);
  },

  /* 
    Method: getRadius 
    
    Returns the current radius of the visualization. If *config.radius* is *auto* then it 
    calculates the radius by taking the smaller size of the <Canvas> widget.
    
    See also:
    
    <Canvas.getSize>
   
 */ 
 getRadius: function() { 
    var rad = this.config.radius;
    if(rad !== "auto") {
      return rad;
    }
    var s = this.canvas.getSize();
    return Math.min(s.width, s.height) / 2;
 }, 

 /* 
     Method: refresh 
     
     Computes nodes' positions and replots the tree.

     Parameters:

     reposition - _optional_ Set this to *true* to force repositioning.

     See also:

     <Hypertree.reposition>
      
    */ 
    refresh: function(reposition) { 
        if(reposition) { 
            this.reposition(); 
            Graph.Util.eachNode(this.graph, function(node) { 
                node.startPos.rho = node.pos.rho = node.endPos.rho;
                node.startPos.theta = node.pos.theta = node.endPos.theta; 
            }); 
        } else { 
            this.compute(); 
        } 
        this.plot(); 
    }, 
     
    /* 
     Method: reposition 
     
     Computes nodes' positions and restores the tree to its previous position.

     For calculating nodes' positions the root must be placed on its origin. This method does this 
       and then attemps to restore the hypertree to its previous position.
      
    */ 
    reposition: function() { 
        this.compute('endPos'); 
        var vector = this.graph.getNode(this.root).pos.getc().scale(-1); 
        Graph.Util.moebiusTransformation(this.graph, [vector], ['endPos'], 'endPos', "ignore"); 
        Graph.Util.eachNode(this.graph, function(node) { 
          if (node.ignore) {
            node.endPos.rho = node.pos.rho;
            node.endPos.theta = node.pos.theta;
          } 
        }); 
    }, 
 
    /* 
     Method: plot 
     
     Plots the Hypertree 

    */ 
    plot: function() { 
        this.fx.plot(); 
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
       ht.onClick('someid');
       //or also...
       ht.onClick('someid', {
        hideLabels: false
       });
      (end code)
      
    */ 
    onClick: function(id, opt) { 
        var pos = this.graph.getNode(id).pos.getc(true); 
        this.move(pos, opt); 
    }, 
     
    /* 
     Method: move 

     Translates the tree to the given position. 

     Parameters:

     pos - A <Complex> number determining the position to move the tree to.
     opt - _optional_ An object containing some extra properties defined in <Hypertree.onClick>


    */ 
    move: function(pos, opt) {
      var versor = $C(pos.x, pos.y);
      if(this.busy === false && versor.norm() < 1) {
        var GUtil = Graph.Util;
        this.busy = true;
        var root = GUtil.getClosestNodeToPos(this.graph, versor), that = this;
        GUtil.computeLevels(this.graph, root.id, 0);
        this.controller.onBeforeCompute(root);
        opt = $merge({ onComplete: $empty }, opt || {});
        this.fx.animate($merge({
          modes: ['moebius'],
          hideLabels: true
        }, opt, {
            onComplete: function(){
              that.busy = false;
              opt.onComplete();
            }
        }), versor);
      }
    }     
}); 
 
/* 
   Class: Hypertree.Op 
 
   Performs advanced operations on trees and graphs.

   Extends:

   All <Graph.Op> methods

   Access:

   This instance can be accessed with the _op_ parameter of the hypertree instance created.

   Example:

   (start code js)
    var ht = new Hypertree(canvas, config);
    ht.op.morph //or can also call any other <Graph.Op> method
   (end code)
    
*/ 
Hypertree.Op = new Class({ 
 
    Implements: Graph.Op, 
 
    initialize: function(viz) { 
        this.viz = viz; 
    } 
}); 
 
/* 
   Class: Hypertree.Plot 
 
   Performs plotting operations.

   Extends:

   All <Graph.Plot> methods

   Access:

   This instance can be accessed with the _fx_ parameter of the hypertree instance created.

   Example:

   (start code js)
    var ht = new Hypertree(canvas, config);
    ht.fx.placeLabel //or can also call any other <Hypertree.Plot> method
   (end code)

*/ 
Hypertree.Plot = new Class({ 
 
    Implements: Graph.Plot, 
   
  initialize: function(viz) { 
    this.viz = viz; 
    this.config = viz.config; 
    this.node = this.config.Node; 
    this.edge = this.config.Edge; 
    this.animation = new Animation; 
    this.nodeTypes = new Hypertree.Plot.NodeTypes; 
    this.edgeTypes = new Hypertree.Plot.EdgeTypes;
    this.labels = viz.labels;
  }, 
     
    /* 
       Method: hyperline 
     
       Plots a hyperline between two nodes. A hyperline is an arc of a circle which is orthogonal to the main circle. 

       Parameters:

       adj - A <Graph.Adjacence> object.
       canvas - A <Canvas> instance.
    */ 
    hyperline: function(adj, canvas) { 
        var node = adj.nodeFrom, child = adj.nodeTo, data = adj.data; 
        var pos = node.pos.getc(), posChild = child.pos.getc(); 
        var r = this.viz.getRadius();
        var centerOfCircle = this.computeArcThroughTwoPoints(pos, posChild); 
        if (centerOfCircle.a > 1000 || centerOfCircle.b > 1000 || centerOfCircle.ratio < 0) { 
            canvas.path('stroke', function(ctx) { 
                ctx.moveTo(pos.x * r, pos.y * r); 
                ctx.lineTo(posChild.x * r, posChild.y * r); 
            }); 
        } else { 
          var angleBegin = Math.atan2(posChild.y - centerOfCircle.y, posChild.x - centerOfCircle.x); 
          var angleEnd   = Math.atan2(pos.y - centerOfCircle.y, pos.x - centerOfCircle.x); 
          var sense      = this.sense(angleBegin, angleEnd); 
          var context = canvas.getCtx(); 
          canvas.path('stroke', function(ctx) { 
              ctx.arc(centerOfCircle.x * r, centerOfCircle.y * r, centerOfCircle.ratio * r, angleBegin, angleEnd, sense);
          }); 
        } 
    }, 
     
    /* 
       computeArcThroughTwoPoints 
     
       Calculates the arc parameters through two points.
       
       More information in <http://en.wikipedia.org/wiki/Poincar%C3%A9_disc_model#Analytic_geometry_constructions_in_the_hyperbolic_plane> 

       Parameters:

       p1 - A <Complex> instance.
       p2 - A <Complex> instance.
       scale - The Disk's diameter.

       Returns:

       An object containing some arc properties.
    */ 
    computeArcThroughTwoPoints: function(p1, p2) { 
        var aDen = (p1.x * p2.y - p1.y * p2.x), bDen = aDen; 
        var sq1 = p1.squaredNorm(), sq2 = p2.squaredNorm(); 
        //Fall back to a straight line 
        if (aDen == 0) return { x:0, y:0, ratio: -1 }; 
 
        var a = (p1.y * sq2 - p2.y * sq1 + p1.y - p2.y) / aDen; 
        var b = (p2.x * sq1 - p1.x * sq2 + p2.x - p1.x) / bDen; 
        var x = -a /2; 
        var y = -b /2; 
        var squaredRatio = (a * a + b * b) / 4 -1;
        //Fall back to a straight line
        if(squaredRatio < 0) return { x:0, y:0, ratio: -1 }; 
        var ratio = Math.sqrt(squaredRatio); 
        var out= { 
            x: x, 
            y: y, 
            ratio: ratio > 1000? -1 : ratio, 
            a: a, 
            b: b 
        }; 
 
        return out; 
  }, 
 
  /* 
     sense 
   
     Sets angle direction to clockwise (true) or counterclockwise (false). 
      
     Parameters: 
   
        angleBegin - Starting angle for drawing the arc. 
        angleEnd - The HyperLine will be drawn from angleBegin to angleEnd. 
   
     Returns: 
   
        A Boolean instance describing the sense for drawing the HyperLine. 
  */ 
  sense: function(angleBegin, angleEnd) { 
     return (angleBegin < angleEnd)? ((angleBegin + Math.PI > angleEnd)? false : true) :  
         ((angleEnd + Math.PI > angleBegin)? true : false); 
  } 
}); 

/*
  Object: Hypertree.Label

  Label interface implementation for the Hypertree

  See Also:

  <Graph.Label>, <Hypertree.Label.HTML>, <RGraph.Label.SVG>

 */ 
Hypertree.Label = {};

/*
   Class: Hypertree.Label.Native

   Implements labels natively, using the Canvas text API.

   Extends:

   <Graph.Label.Native>

   See also:

   <Hypertree.Label>, <Hypertree.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
Hypertree.Label.Native = new Class({
  Extends: Graph.Label.Native,

  initialize: function(viz) {
    this.viz = viz;
  },

  /*
       Method: plotLabel
    
       Plots a label for a given node.

       Parameters:

       canvas - A <Canvas> instance.
       node - A <Graph.Node>.
       controller - A configuration object. See also <Hypertree>, <RGraph>, <ST>.

    */
    plotLabel: function(canvas, node, controller) {
        var ctx = canvas.getCtx();
        var coord = node.pos.getc(true);
        var s = this.viz.getRadius();
        ctx.fillText(node.name, coord.x * s, coord.y * s);
    }
});

/*
   Class: Hypertree.Label.SVG

   Implements labels using SVG (currently not supported in IE).

   Extends:

   <Graph.Label.SVG>

   See also:

   <Hypertree.Label>, <Hypertree.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
Hypertree.Label.SVG = new Class({
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
        var radius= canvas.getSize(), r = this.viz.getRadius();
        var round = Math.round;
        var labelPos= {
            x: round(pos.x * r + radius.width/2),
            y: round(pos.y * r + radius.height/2)
        };
        tag.setAttribute('x', labelPos.x);
        tag.setAttribute('y', labelPos.y);
        controller.onPlaceLabel(tag, node);
  }
});

/*
   Class: Hypertree.Label.HTML

   Implements labels using plain old HTML.

   Extends:

   <Graph.Label.HTML>

   See also:

   <Hypertree.Label>, <Hypertree.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
Hypertree.Label.HTML = new Class({
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
        var radius= canvas.getSize(), r = this.viz.getRadius();
        var round = Math.round;
        var labelPos= {
            x: round(pos.x * r + radius.width/2),
            y: round(pos.y * r + radius.height/2)
        };
        var style = tag.style;
        style.left = labelPos.x + 'px';
        style.top  = labelPos.y + 'px';
        style.display = this.fitsInCanvas(labelPos, canvas)? '' : 'none';
        
        controller.onPlaceLabel(tag, node);
  }
});


/*
  Class: Hypertree.Plot.NodeTypes

  Here are implemented all kinds of node rendering functions. 
  Rendering functions implemented are 'none', 'circle', 'triangle', 'rectangle', 'star' and 'square'.

  You can add new Node types by implementing a new method in this class

  Example:

  (start code js)
    Hypertree.Plot.NodeTypes.implement({
      'newnodetypename': function(node, canvas) {
        //Render my node here.
      }
    });
  (end code)

*/
Hypertree.Plot.NodeTypes = new Class({
      'none' : $empty,

      'circle' : function(node, canvas) {
        var nconfig = this.node, data = node.data;
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim;
        var p = node.pos.getc(), pos = p.scale(node.scale);
        var prod = nconfig.transform ? nodeDim * (1 - p.squaredNorm())
            : nodeDim;
        if (prod >= nodeDim / 4) {
          canvas.path('fill', function(context) {
            context.arc(pos.x, pos.y, prod, 0, Math.PI * 2, true);
          });
        }
      },

      'square' : function(node, canvas) {
        var nconfig = this.node, data = node.data;
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim;
        var p = node.pos.getc(), pos = p.scale(node.scale);
        var prod = nconfig.transform ? nodeDim * (1 - p.squaredNorm())
            : nodeDim;
        var nodeDim2 = 2 * prod;
        if (prod >= nodeDim / 4) {
          canvas.getCtx().fillRect(pos.x - prod, pos.y - prod, nodeDim2,
              nodeDim2);
        }
      },

      'rectangle' : function(node, canvas) {
        var nconfig = this.node, data = node.data;
        var width = nconfig.overridable && data && data.$width || nconfig.width;
        var height = nconfig.overridable && data && data.$height
            || nconfig.height;
        var p = node.pos.getc(), pos = p.scale(node.scale);
        var prod = 1 - p.squaredNorm();
        width = nconfig.transform ? width * prod : width;
        height = nconfig.transform ? height * prod : height;
        if (prod >= 0.25) {
          canvas.getCtx().fillRect(pos.x - width / 2, pos.y - height / 2,
              width, height);
        }
      },

      'triangle' : function(node, canvas) {
        var nconfig = this.node, data = node.data;
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim;
        var p = node.pos.getc(), pos = p.scale(node.scale);
        var prod = nconfig.transform ? nodeDim * (1 - p.squaredNorm())
            : nodeDim;
        if (prod >= nodeDim / 4) {
          var c1x = pos.x, c1y = pos.y - prod, c2x = c1x - prod, c2y = pos.y
              + prod, c3x = c1x + prod, c3y = c2y;
          canvas.path('fill', function(ctx) {
            ctx.moveTo(c1x, c1y);
            ctx.lineTo(c2x, c2y);
            ctx.lineTo(c3x, c3y);
          });
        }
      },

      'star' : function(node, canvas) {
        var nconfig = this.node, data = node.data;
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim;
        var p = node.pos.getc(), pos = p.scale(node.scale);
        var prod = nconfig.transform ? nodeDim * (1 - p.squaredNorm())
            : nodeDim;
        if (prod >= nodeDim / 4) {
          var ctx = canvas.getCtx(), pi5 = Math.PI / 5;
          ctx.save();
          ctx.translate(pos.x, pos.y);
          ctx.beginPath();
          ctx.moveTo(nodeDim, 0);
          for ( var i = 0; i < 9; i++) {
            ctx.rotate(pi5);
            if (i % 2 == 0) {
              ctx.lineTo((prod / 0.525731) * 0.200811, 0);
            } else {
              ctx.lineTo(prod, 0);
            }
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
    }); 

 /*
  Class: Hypertree.Plot.EdgeTypes

  Here are implemented all kinds of edge rendering functions. 
  Rendering functions implemented are 'none', 'line' and 'hyperline'.

  You can add new Edge types by implementing a new method in this class

  Example:

  (start code js)
    Hypertree.Plot.EdgeTypes.implement({
      'newedgetypename': function(adj, canvas) {
        //Render my edge here.
      }
    });
  (end code)

*/
Hypertree.Plot.EdgeTypes = new Class({ 
    'none': $empty, 
     
    'line': function(adj, canvas) {  
        var pos = adj.nodeFrom.pos.getc(true); 
        var posChild = adj.nodeTo.pos.getc(true); 
        canvas.path('stroke', function(context) { 
            context.moveTo(pos.x, pos.y); 
            context.lineTo(posChild.x, posChild.y); 
        }); 
    }, 
 
    'hyperline': function(adj, canvas) { 
      this.hyperline(adj, canvas); 
    } 
}); 
