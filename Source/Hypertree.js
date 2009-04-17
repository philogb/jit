/*
 * File: Hypertree.js
 * 
 * Author: Nicolas Garcia Belmonte
 * 
 * Homepage: <http://thejit.org>
 * 
 * Version: 1.0.8a
 *
 * Copyright: Copyright 2008-2009 by Nicolas Garcia Belmonte.
 * 
 * License: BSD License
 * 
 */


/*
   Class: Complex
    
     A multi-purpose Complex Class with common methods. Exetended for the Hypertree.

*/
/*
   Method: moebiusTransformation

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
   Object: Graph.Util

   A multi purpose object to do graph traversal and processing. Extended for use with the Hypertree.
*/

/*
   Method: getClosestNodeToOrigin

   Returns the closest node to the center of canvas.
*/
Graph.Util.getClosestNodeToOrigin = function(graph, prop, flags) {
        var node = null;
        this.eachNode(graph, function(elem) {
            node = (node == null || elem[prop].rho < node[prop].rho)? elem : node;
        }, flags);
        return node;
};

/*
     Method: moebiusTransformation
    
    Calculates a moebius transformation for the hyperbolic tree.
    For more information go to:
    <http://en.wikipedia.org/wiki/Moebius_transformation>
     
     Parameters:
    
        theta - Rotation angle.
        c - Translation Complex.
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


	Go to <http://blog.thejit.org/?p=7> to know what kind of JSON structure feeds this object.
	
	Go to <http://blog.thejit.org/?p=8> to know what kind of controller this class accepts.
	
	Refer to the <config> object to know what properties can be modified in order to customize this object. 

	The simplest way to create and layout a Hypertree is:
	
	(start code)

	  var canvas= new Canvas('infovis', {
	    'injectInto': 'infovis'
	  });
	  var ht= new Hypertree(canvas);
	  ht.loadJSON(json);
	  ht.refresh();

	(end code)

	A user should only interact with the Canvas, and Hypertree objects/classes.
	By implementing Hypertree controllers you can also customize the Hypertree behavior.
*/

this.Hypertree = new Class({
	
	Implements: [Loader, AngularWidth],
	
	/*
	 Constructor: Hypertree
	
	 Creates a new Hypertree instance.
	 
	 Parameters:
	
	    canvas - A <Canvas> instance.
	    controller - _optional_ a Hypertree controller <http://blog.thejit.org/?p=8>
	*/
	initialize: function(canvas, controller) {

		/*
		   Object: config
		
		   <Hypertree> configuration object. These properties are overriden when passing a configuration|controller object to the <Hypertree> constructor.
		   
		   Here you can add/change node and edge styles, animation options and interpolation options. 
		   
		   You can also bind function handlers.
		*/
		var config = {
                labelContainer: canvas.id + '-label',
		        
                //Property: Node
                //What kind of node to plot, built-in types are none|circle|squared|triangle|star
                //You can also add any other property that suits the node rendering function.
                //If _overridable_ is set to true, then these global values can be overriden by
                //adding a similar _$nodeType_ object to the data property of your JSON tree|graph node.
                Node: {
                    overridable: false,
                    type: 'circle',
                    dim: 7,
                    color: '#ccc',
                    width: 5,
                    height: 5,   
                    lineWidth: 1,
                    transform: true
                },
                
                //Property: Edge
                //What kind of edge to plot, built-ins are none|line|arrow|multi
                //You can also add any other property that suits the edge rendering function.
                //If _overridable_ is set to true, then these global values can be overriden by
                //adding a similar _edgeType_ object to the data property of your JSON tree|graph adj.
                Edge: {
                    overridable: false,
                    type: 'hyperline',
                    color: '#ccc',
                    lineWidth: 1
                },

		        //Property: fps
		        //animation frames per second
		        fps:40,
		
		        //Property: duration
		        //Time of the animation
		        duration: 1500,
		
                //Property: transition
                //Transition function
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
	        onAfterPlotNode: $empty,
	        request:         false
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
    
     Computes positions and then plots.
     
    */
    refresh: function(reposition) {
        if(reposition) {
            this.reposition();
            Graph.Util.eachNode(this.graph, function(node) {
                node.startPos = node.pos = node.endPos;
            });
        } else {
            this.compute();
        }
        this.plot();
    },
    
    /*
     Method: reposition
    
     Computes new positions and repositions the tree where it was before. 
     (For calculating new positions the root must be on its origin, and that may lead to an undesired 
     repositioning of the graph, this method attempts to solve this problem.
     
    */
    reposition: function() {
        this.compute('endPos');
        var vector = this.graph.getNode(this.root).pos.getc().scale(-1);
        Graph.Util.moebiusTransformation(this.graph, [vector], ['endPos'], 'endPos', "ignore");
        Graph.Util.eachNode(this.graph, function(node) {
            if(node.ignore) node.endPos = node.pos;
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
    
     Computes the graph nodes positions and stores this positions on _property_.
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
     Method: computePositions
    
     Performs the main algorithm for computing node positions.
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
    
     Performs all calculations and animation when clicking on a label specified by _id_. The label id is the same id as its homologue node.
    */
    onClick: function(id, opt) {
        var pos = this.graph.getNode(id).pos.getc(true);
        this.move(pos, opt);
    },
    
    /*
     Method: move
    
     Translates the tree to the given position.
    */
    move: function(pos, opt) {
        var versor = $C(pos.x, pos.y);
        if(this.busy === false && versor.norm() < 1) {
            this.busy = true;
            var root = this.graph.getNode(this.root), that = this;
            this.controller.onBeforeCompute(root);
            if (versor.norm() < 1) {
                opt = $merge({ onComplete: $empty }, opt || {});
                this.fx.animate($merge({
                    modes: ['moebius'],
                    hideLabels: true,
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

   <Hypertree.Op> performs hypertree operations like sum, morphing, removing nodes|edges.
   
   Implements methods from the generic <Graph.Op> object.
   
*/
Hypertree.Op = new Class({

    Implements: Graph.Op,

    initialize: function(viz) {
        this.viz = viz;
    }
});

/*
   Class: Hypertree.Plot

   <Hypertree> plotting capabilities.
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
       Method: computeArcThroughTwoPoints
    
       Calculates the arc parameters through two points. More information in 
       <http://en.wikipedia.org/wiki/Poincar%C3%A9_disc_model#Analytic_geometry_constructions_in_the_hyperbolic_plane>
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
	   Method: sense
	
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
