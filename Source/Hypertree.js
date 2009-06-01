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
     
     A multi-purpose Complex Class with common methods. Exetended for the Hypertree. 
 
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

     <Loader>, <AngularWidth>

     Parameters:

     canvas - A <Canvas> Class
     config - A configuration/controller object.

     Configuration:
    
     The configuration object can have the following properties (all properties are optional and have a default value)
      
     *General*
     - _withLabels_ Whether the visualization should use/create labels or not. Default's *true*.
     
     *Node*
     
     Customize the visualization nodes' shape, color, and other style properties.

     - _Node_

     This object has as properties

     - _overridable_ Determine whether or not nodes properties can be overriden by a particular node. Default's false.

     If given a JSON tree or graph, a node _data_ property contains properties which are the same as defined here but prefixed with 
     a dollar sign (i.e $), the node properties will override the global node properties.

     - _type_ Node type (shape). Possible options are "none", "square", "rectangle", "circle", "triangle", "star". Default's "circle".
     - _color_ Node color. Default's '#ccb'.
     - _lineWidth_ Line width. If nodes aren't drawn with strokes then this property won't be of any use. Default's 1.
     - _height_ Node height. Used for plotting rectangular nodes. Default's 5.
     - _width_ Node width. Used for plotting rectangular nodes. Default's 5.
     - _dim_ An extra parameter used by other complex shapes such as square and circle to determine the shape's diameter. Default's 7.
     - _transform_ Whether to apply the moebius transformation to the nodes or not. Default's true.

     *Edge*

     Customize the visualization edges' shape, color, and other style properties.

     - _Edge_

     This object has as properties

     - _overridable_ Determine whether or not edges properties can be overriden by a particular edge object. Default's false.

     If given a JSON _complex_ graph (defined in <Loader.loadJSON>), an adjacency _data_ property contains properties which are the same as defined here but prefixed with 
     a dollar sign (i.e $), the adjacency properties will override the global edge properties.

     - _type_ Edge type (shape). Possible options are "none", "line" and "hyperline". Default's "hyperline".
     - _color_ Edge color. Default's '#ccb'.
     - _lineWidth_ Line width. If edges aren't drawn with strokes then this property won't be of any use. Default's 1.

     *Animations*

     - _duration_ Duration of the animation in milliseconds. Default's 1500.
     - _fps_ Frames per second. Default's 40.
     - _transition_ One of the transitions defined in the <Animation> class. Default's Quart.easeInOut.
     - _clearCanvas_ Whether to clear canvas on each animation frame or not. Default's true.

    *Controller options*

    You can also implement controller functions inside the configuration object. This functions are
    
    - _onBeforeCompute(node)_ This method is called right before performing all computation and animations to the JIT visualization.
    - _onAfterCompute()_ This method is triggered right after all animations or computations for the JIT visualizations ended.
    - _onCreateLabel(domElement, node)_ This method receives the label dom element as first parameter, and the corresponding <Graph.Node> as second parameter. This method will only be called on label creation. Note that a <Graph.Node> is a node from the input tree/graph you provided to the visualization. If you want to know more about what kind of JSON tree/graph format is used to feed the visualizations, you can take a look at <Loader.loadJSON>. This method proves useful when adding events to the labels used by the JIT.
    - _onPlaceLabel(domElement, node)_ This method receives the label dom element as first parameter and the corresponding <Graph.Node> as second parameter. This method is called each time a label has been placed on the visualization, and thus it allows you to update the labels properties, such as size or position. Note that onPlaceLabel will be triggered after updating the labels positions. That means that, for example, the left and top css properties are already updated to match the nodes positions.
    - _onBeforePlotNode(node)_ This method is triggered right before plotting a given node. The _node_ parameter is the <Graph.Node> to be plotted. 
This method is useful for changing a node style right before plotting it.
    - _onAfterPlotNode(node)_ This method is triggered right after plotting a given node. The _node_ parameter is the <Graph.Node> plotted.
    - _onBeforePlotLine(adj)_ This method is triggered right before plotting an edge. The _adj_ parameter is a <Graph.Adjacence> object. 
This method is useful for adding some styles to a particular edge before being plotted.
    - _onAfterPlotLine(adj)_ This method is triggered right after plotting an edge. The _adj_ parameter is the <Graph.Adjacence> plotted.

    Example:

    Here goes a complete example. In most cases you won't be forced to implement all properties and methods. In fact, 
    all configuration properties  have the default value assigned.

    I won't be instanciating a <Canvas> class here. If you want to know more about instanciating a <Canvas> class 
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

    Instance Properties:

    - _graph_ Access a <Graph> instance.
    - _op_ Access a <Hypertree.Op> instance.
    - _fx_ Access a <Hypertree.Plot> instance.
*/ 
 
this.Hypertree = new Class({ 
	 
	Implements: [Loader, AngularWidth], 
	 
	initialize: function(canvas, controller) { 
 
		var config = { 
                labelContainer: canvas.id + '-label', 
		         
                withLabels: true,
                
                Node: { 
                    overridable: false, 
                    type: 'circle', 
                    dim: 7, 
                    color: '#ccb', 
                    width: 5, 
                    height: 5,    
                    lineWidth: 1, 
                    transform: true 
                }, 
                 
                Edge: { 
                    overridable: false, 
                    type: 'hyperline', 
                    color: '#ccb', 
                    lineWidth: 1 
                }, 
                clearCanvas: true,
		        fps:40, 
		        duration: 1500, 
                transition: Trans.Quart.easeInOut 
		}; 
 
	    var innerController = { 
	        onBeforeCompute: $empty, 
	        onAfterCompute:  $empty, 
	        onCreateLabel:   $empty, 
	        onPlaceLabel:    $empty, 
	        onComplete:      $empty, 
	        onBeforePlotLine:$empty, 
	        onAfterPlotLine: $empty, 
	        onBeforePlotNode:$empty, 
	        onAfterPlotNode: $empty 
	    }; 
	     
	    this.controller = this.config = $merge(config, innerController, controller); 
        this.graphOptions = { 
            'complex': false, 
            'Node': { 
                'selected': false, 
                'exist': true, 
                'drawn': true 
            } 
        }; 
		this.graph = new Graph(this.graphOptions); 
		this.fx = new Hypertree.Plot(this); 
		this.op = new Hypertree.Op(this); 
	    this.json = null; 
	    this.canvas = canvas; 
 
	    this.root = null; 
	    this.busy = false; 
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
     Method: compute 
     
     Computes nodes' positions. 

     Parameters:

     property - _optional_ A <Graph.Node> position property to store the new positions. Possible values are 'pos', 'endPos' or 'startPos'.


    */ 
    compute: function(property) { 
        var prop = property || ['pos', 'startPos']; 
        var node = this.graph.getNode(this.root); 
        node._depth = 0; 
        Graph.Util.computeLevels(this.graph, this.root, 0, "ignore"); 
        this.computeAngularWidths(); 
        this.computePositions(prop); 
    }, 
     
    /* 
     computePositions 
     
     Performs the main algorithm for computing node positions.

     Parameters:

     property - A <Graph.Node> position property to store the new positions. Possible values are 'pos', 'endPos' or 'startPos'.

  */ 
    computePositions: function(property) { 
        var propArray = $splat(property); 
        var aGraph = this.graph, GUtil = Graph.Util; 
        var root = this.graph.getNode(this.root), that = this, config = this.config; 
        var size = this.canvas.getSize(); 
        var scale = Math.min(size.width, size.height)/ 2; 
 
 
        //Set default values for the root node 
        for(var i=0; i<propArray.length; i++)  
            root[propArray[i]] = $P(0, 0); 
        root.angleSpan = { 
            begin: 0, 
            end: 2 * Math.PI 
        }; 
		root._rel = 1; 
		 
        //Estimate better edge length. 
        var edgeLength = (function() { 
            var depth = 0; 
            GUtil.eachNode(aGraph, function(node) { 
                depth = (node._depth > depth)? node._depth : depth; 
				node._scale = scale; 
            }, "ignore"); 
            for(var i=0.51; i<=1; i+=.01) { 
                var valSeries = (function(a, n) { 
                    return (1 - Math.pow(a, n)) / (1 - a); 
                })(i, depth + 1); 
                if(valSeries >= 2) return i - .01; 
            } 
            return .5; 
        })(); 
         
        GUtil.eachBFS(this.graph, this.root, function (elem) { 
            var angleSpan = elem.angleSpan.end - elem.angleSpan.begin; 
            var angleInit = elem.angleSpan.begin; 
            var totalAngularWidths = (function (element){ 
                var total = 0; 
                GUtil.eachSubnode(element, function(sib) { 
                    total += sib._treeAngularWidth; 
                }, "ignore"); 
                return total; 
            })(elem); 
 
            for(var i=1, rho = 0, lenAcum = edgeLength, depth = elem._depth; i<=depth+1; i++) { 
                rho += lenAcum; 
                lenAcum *= edgeLength; 
            } 
             
            GUtil.eachSubnode(elem, function(child) { 
                if(!child._flag) { 
                    child._rel = child._treeAngularWidth / totalAngularWidths; 
                    var angleProportion = child._rel * angleSpan; 
                    var theta = angleInit + angleProportion / 2; 
 
                    for(var i=0; i<propArray.length; i++) 
                        child[propArray[i]] = $P(theta, rho); 
 
                    child.angleSpan = { 
                        begin: angleInit, 
                        end: angleInit + angleProportion 
                    }; 
                    angleInit += angleProportion; 
                } 
            }, "ignore"); 
 
        }, "ignore"); 
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
            if (versor.norm() < 1) { 
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
        var centerOfCircle = this.computeArcThroughTwoPoints(pos, posChild); 
        var size = canvas.getSize(); 
        var scale = Math.min(size.width, size.height)/2; 
        if (centerOfCircle.a > 1000 || centerOfCircle.b > 1000 || centerOfCircle.ratio > 1000) { 
            canvas.path('stroke', function(ctx) { 
                ctx.moveTo(pos.x * scale, pos.y * scale); 
                ctx.lineTo(posChild.x * scale, posChild.y * scale); 
			}); 
		} else { 
	        var angleBegin = Math.atan2(posChild.y - centerOfCircle.y, posChild.x - centerOfCircle.x); 
	        var angleEnd   = Math.atan2(pos.y - centerOfCircle.y, pos.x - centerOfCircle.x); 
	        var sense      = this.sense(angleBegin, angleEnd); 
	        var context = canvas.getCtx(); 
	        canvas.path('stroke', function(ctx) { 
	            ctx.arc(centerOfCircle.x*scale, centerOfCircle.y*scale, centerOfCircle.ratio*scale, angleBegin, angleEnd, sense); 
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

       Returns:

       An object containing some arc properties.
    */ 
    computeArcThroughTwoPoints: function(p1, p2) { 
        var aDen = (p1.x * p2.y - p1.y * p2.x), bDen = aDen; 
        var sq1 = p1.squaredNorm(), sq2 = p2.squaredNorm(); 
        //Fall back to a straight line 
        if (aDen == 0) return { x:0, y:0, ratio: 1001 }; 
 
        var a = (p1.y * sq2 - p2.y * sq1 + p1.y - p2.y) / aDen; 
        var b = (p2.x * sq1 - p1.x * sq2 + p2.x - p1.x) / bDen; 
        var x = -a / 2; 
        var y = -b / 2; 
        var squaredRatio = (a * a + b * b) / 4 -1; 
        //Fall back to a straight line         
        if(squaredRatio < 0) return { x:0, y:0, ratio: 1001 }; 
        var ratio = Math.sqrt(squaredRatio); 
        var out= { 
            x: x, 
            y: y, 
            ratio: ratio, 
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
	    var radius= canvas.getSize(); 
	    var scale = node._scale; 
	    var labelPos= { 
	        x: Math.round(pos.x * scale + radius.width/2), 
	        y: Math.round(pos.y * scale + radius.height/2) 
	    }; 
	    var style = tag.style; 
	    style.left = labelPos.x + 'px'; 
	    style.top  = labelPos.y + 'px'; 
	    style.display = ''; 
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
    'none': function() {}, 
     
    'circle': function(node, canvas) { 
        var nconfig = this.node, data = node.data; 
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim; 
		var p = node.pos.getc(), pos = p.scale(node._scale); 
		var prod = nconfig.transform?  nodeDim * (1 - p.squaredNorm()) : nodeDim; 
		if(prod >= nodeDim / 4) { 
	        canvas.path('fill', function(context) { 
	            context.arc(pos.x, pos.y, prod, 0, Math.PI * 2, true);           
	        }); 
		} 
    }, 
     
    'square': function(node, canvas) { 
        var nconfig = this.node, data = node.data; 
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim; 
        var p = node.pos.getc(), pos = p.scale(node._scale); 
        var prod = nconfig.transform?  nodeDim * (1 - p.squaredNorm()) : nodeDim; 
        var nodeDim2 = 2 * prod; 
        if (prod >= nodeDim / 4) { 
			canvas.getCtx().fillRect(pos.x - prod, pos.y - prod, nodeDim2, nodeDim2); 
		} 
    }, 
 
    'rectangle': function(node, canvas) { 
        var nconfig = this.node, data = node.data; 
        var width = nconfig.overridable && data && data.$width || nconfig.width; 
        var height = nconfig.overridable && data && data.$height || nconfig.height; 
        var p = node.pos.getc(), pos = p.scale(node._scale); 
		var prod = 1 - p.squaredNorm(); 
        width = nconfig.transform?  width * prod : width; 
		height = nconfig.transform?  height * prod : height; 
		if(prod >= 0.25) { 
            canvas.getCtx().fillRect(pos.x - width / 2, pos.y - height / 2, width, height);			 
		} 
 
    }, 
     
    'triangle': function(node, canvas) { 
        var nconfig = this.node, data = node.data; 
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim; 
        var p = node.pos.getc(), pos = p.scale(node._scale); 
        var prod = nconfig.transform?  nodeDim * (1 - p.squaredNorm()) : nodeDim; 
        if (prod >= nodeDim / 4) { 
			var c1x = pos.x,  
			c1y = pos.y - prod,  
			c2x = c1x - prod,  
			c2y = pos.y + prod,  
			c3x = c1x + prod,  
			c3y = c2y; 
			canvas.path('fill', function(ctx){ 
				ctx.moveTo(c1x, c1y); 
				ctx.lineTo(c2x, c2y); 
				ctx.lineTo(c3x, c3y); 
			}); 
		} 
    }, 
     
    'star': function(node, canvas) { 
        var nconfig = this.node, data = node.data; 
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim; 
        var p = node.pos.getc(), pos = p.scale(node._scale); 
        var prod = nconfig.transform?  nodeDim * (1 - p.squaredNorm()) : nodeDim; 
        if (prod >= nodeDim / 4) { 
			var ctx = canvas.getCtx(), pi5 = Math.PI / 5; 
			ctx.save(); 
			ctx.translate(pos.x, pos.y); 
			ctx.beginPath(); 
			ctx.moveTo(nodeDim, 0); 
			for (var i = 0; i < 9; i++) { 
				ctx.rotate(pi5); 
				if (i % 2 == 0) { 
					ctx.lineTo((prod / 0.525731) * 0.200811, 0); 
				} 
				else { 
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
    'none': function() {}, 
     
    'line': function(adj, canvas) { 
		var s = adj.nodeFrom._scale; 
        var pos = adj.nodeFrom.pos.getc(true); 
        var posChild = adj.nodeTo.pos.getc(true); 
        canvas.path('stroke', function(context) { 
            context.moveTo(pos.x * s, pos.y * s); 
            context.lineTo(posChild.x * s, posChild.y * s); 
        }); 
    }, 
 
    'hyperline': function(adj, canvas) { 
		this.hyperline(adj, canvas); 
	} 
}); 
