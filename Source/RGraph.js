/*
 * File: RGraph.js
 * 
 * Author: Nicolas Garcia Belmonte
 * 
 * Copyright: Copyright 2008-2009 by Nicolas Garcia Belmonte.
 *
 * Homepage: <http://thejit.org>
 * 
 * Version: 1.0.8a
 * 
 * License: BSD License
 * 
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the organization nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Nicolas Garcia Belmonte ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL Nicolas Garcia Belmonte BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */

/*
   Class: RGraph

	An animated Graph with radial layout.

	Go to <http://blog.thejit.org> to know what kind of JSON structure feeds this object.
	
	Go to <http://blog.thejit.org/?p=8> to know what kind of controller this class accepts.
	
	Refer to the <config> object to know what properties can be modified in order to customize this object. 

	The simplest way to create and layout a RGraph is:
	
	(start code)

		  var canvas= new Canvas('mycanvas', {
		      'injectInto': 'infovis'
		  });
		  var rgraph= new RGraph(canvas);
		  rgraph.loadJSON(json);
		  rgraph.refresh();

	(end code)

	A user should only interact with the <Canvas>, and <RGraph> objects/classes.
	By implementing RGraph controllers you can also customize the RGraph behavior.
*/

/*
 Constructor: RGraph

 Creates a new RGraph instance.
 
 Parameters:

    canvas - A <Canvas> instance.
    controller - _optional_ a RGraph controller <http://blog.thejit.org/?p=8>
*/
this.RGraph = new Class({
	
    Implements: [Loader, AngularWidth],
    
	initialize: function(canvas, controller) {
		/*
		   Object: config
		
		   <RGraph> configuration object. Contains important properties to enable customization and proper behavior for the <RGraph>.
		*/
		var config= {
		        //Property: labelContainer
		        //Id for label container. Don't change this.
		        labelContainer: canvas.id + '-label',

                //Property: interpolation
				//What kind of interpolation we shoud use. Possible options are linear|polar
                interpolation: 'linear',

		        //Property: levelDistance
		        //The actual distance between a node and its child node
		        levelDistance: 100,
		        
                //Property: Node
                //What kind of node to plot, built-in types are none|circle|squared|triangle|star
				//You can also add any other property that suits the node rendering function.
				//If _overridable_ is set to true, then these global values can be overriden by
				//adding a similar _$nodeType_ object to the data property of your JSON tree|graph node.
				Node: {
					overridable: false,
				    type: 'circle',
					dim: 3,
					color: '#999',
                    width: 5,
                    height: 5,   
					lineWidth: 1
				},
				
				//Property: Edge
                //What kind of edge to plot, built-ins are none|line|arrow|multi
                //You can also add any other property that suits the edge rendering function.
                //If _overridable_ is set to true, then these global values can be overriden by
                //adding a similar _edgeType_ object to the data property of your JSON tree|graph adj.
				Edge: {
					overridable: false,
				    type: 'line',
					color: '#999',
					lineWidth: 1
				},

		        //Property: fps
		        //Animation frames per second.
		        fps:40,
		        
		        //Property: duration
				//Animation duration.
		        duration: 2500,
		        
                //Property: transition
                //Animation transition type.
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
	    this.fx = new RGraph.Plot(this);
		this.op = new RGraph.Op(this);
		this.json = null;
	    this.canvas = canvas;
	    this.root = null;
	    this.busy = false;
	    this.parent = false;
	},

    /*
     Method: refresh
    
     Computes positions and then plots.
     
    */
    refresh: function() {
        this.compute();
        this.plot();
    },
    
    /*
     Method: reposition
    
     An alias for computing new positions to _endPos_
     
    */
    reposition: function() {
        this.compute('endPos');
    },


    /*
     Method: plot
    
     Plots the RGraph
    */
    plot: function() {
        this.fx.plot();
    },
    
    /*
     Method: compute
    
     Computes the graph nodes positions and stores this positions on _property_.
    */
    compute: function(property) {
        var prop = property || ['pos', 'startPos', 'endPos'];
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
        var aGraph = this.graph;
        var GUtil = Graph.Util;
        var root = this.graph.getNode(this.root);
        var parent = this.parent;
		var config = this.config;

        for(var i=0; i<propArray.length; i++)
            root[propArray[i]] = $P(0, 0);
        
        root.angleSpan = {
            begin: 0,
            end: 2 * Math.PI
        };
        root._rel = 1;
        
        GUtil.eachBFS(this.graph, this.root, function (elem) {
            var angleSpan = elem.angleSpan.end - elem.angleSpan.begin;
            var rho = (elem._depth + 1) * config.levelDistance;
            var angleInit = elem.angleSpan.begin;
            
			var totalAngularWidths = 0, subnodes = [];
            GUtil.eachSubnode(elem, function(sib) {
                totalAngularWidths += sib._treeAngularWidth;
				subnodes.push(sib);
            }, "ignore");
            
            if(parent && parent.id == elem.id && subnodes.length > 0 && subnodes[0].dist) {
                subnodes.sort(function(a, b) {
                    return  (a.dist >= b.dist) - (a.dist <= b.dist);
                });
            }
            for(var k=0; k < subnodes.length; k++) {
                var child = subnodes[k];
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
            }
        }, "ignore");
    },

    /*
     Method: getNodeAndParentAngle
    
     Returns the _parent_ of the given node, also calculating its angle span.
    */
    getNodeAndParentAngle: function(id) {
        var theta = false;
        var n  = this.graph.getNode(id);
        var ps = Graph.Util.getParents(n);
        var p  = (ps.length > 0)? ps[0] : false;
        if(p) {
            var posParent = p.pos.getc(), posChild = n.pos.getc();
            var newPos    = posParent.add(posChild.scale(-1));
            theta = Math.atan2(newPos.y, newPos.x);
            if(theta < 0) theta += 2 * Math.PI;
        }
        return {parent: p, theta: theta};
    },
    
    /*
     Method: tagChildren
    
     Enumerates the children in order to mantain child ordering (second constraint of the paper).
    */
    tagChildren: function(par, id) {
        if(par.angleSpan) {
          var adjs = [];
          Graph.Util.eachAdjacency(par, function(elem) {
            adjs.push(elem.nodeTo);
          }, "ignore");
          var len = adjs.length;
          for(var i=0; i < len && id != adjs[i].id; i++);
          for(var j= (i+1) % len, k = 0; id !=  adjs[j].id; j = (j+1) % len) {
            adjs[j].dist = k++;
          }
        }
    },
    
    /*
     Method: onClick
    
     Performs all calculations and animation when clicking on a label specified by _id_. 
     The label id is the same id as its homologue node.
    
	*/
    onClick: function(id, opt) {
        if(this.root != id && !this.busy) {
            this.busy = true;
            this.root = id, that = this;
            this.controller.onBeforeCompute(this.graph.getNode(id));
            var obj = this.getNodeAndParentAngle(id);
            
			//second constraint
			this.tagChildren(obj.parent, id);
            this.parent = obj.parent;
            this.compute('endPos');
            
            //first constraint
            var thetaDiff = obj.theta - obj.parent.endPos.theta;
            Graph.Util.eachNode(this.graph, function(elem) {
                elem.endPos.set(elem.endPos.getp().add($P(thetaDiff, 0)));
            });

            var mode = this.config.interpolation;
            opt = $merge({ onComplete: $empty }, opt || {});

			this.fx.animate($merge({
                hideLabels: true,
                modes: [mode],
            }, opt, {
                onComplete: function() {
                    that.busy = false;
                    opt.onComplete();
                }
            }));
        }       
    }
});

/*
   Class: RGraph.Op

   <RGraph.Op> performs rgraph operations like sum, morphing, removing nodes|edges.
   
   Implements methods from the generic <Graph.Op> object.
   
*/
RGraph.Op = new Class({

    Implements: Graph.Op,

    initialize: function(viz) {
        this.viz = viz;
    }
});

/*
   Class: RGraph.Plot

   <RGraph> plotting capabilities.
*/
RGraph.Plot = new Class({
	
	Implements: Graph.Plot,
	
    initialize: function(viz) {
        this.viz = viz;
		this.config = viz.config;
		this.node = viz.config.Node;
		this.edge = viz.config.Edge;
		this.animation = new Animation;
	    this.nodeTypes = new RGraph.Plot.NodeTypes;
		this.edgeTypes = new RGraph.Plot.EdgeTypes;
    },
	
    placeLabel: function(tag, node, controller) {
        var pos = node.pos.getc(true), canvas = this.viz.canvas; 
        var radius= canvas.getSize();
        var labelPos= {
            x: Math.round(pos.x + radius.width/2),
            y: Math.round(pos.y + radius.height/2)
        };
        var style = tag.style;
        style.left = labelPos.x + 'px';
        style.top  = labelPos.y + 'px';
        style.display = this.fitsInCanvas(labelPos, canvas)? '' : 'none';
        controller.onPlaceLabel(tag, node);
	}
});

RGraph.Plot.NodeTypes = new Class({
    'none': function() {},
    
    'circle': function(node, canvas) {
        var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim;
        canvas.path('fill', function(context) {
            context.arc(pos.x, pos.y, nodeDim, 0, Math.PI*2, true);            
        });
    },
    
    'square': function(node, canvas) {
        var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim;
		var nodeDim2 = 2 * nodeDim;
        canvas.getCtx().fillRect(pos.x - nodeDim, pos.y - nodeDim, nodeDim2, nodeDim2);
    },
    
    'rectangle': function(node, canvas) {
        var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
        var width = nconfig.overridable && data && data.$width || nconfig.width;
		var height = nconfig.overridable && data && data.$height || nconfig.height;
        canvas.getCtx().fillRect(pos.x - width / 2, pos.y - height / 2, width, height);
    },
    
    'triangle': function(node, canvas) {
        var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim;
        var c1x = pos.x, c1y = pos.y - nodeDim,
        c2x = c1x - nodeDim, c2y = pos.y + nodeDim,
        c3x = c1x + nodeDim, c3y = c2y;
        canvas.path('fill', function(ctx) {
            ctx.moveTo(c1x, c1y);
            ctx.lineTo(c2x, c2y);
            ctx.lineTo(c3x, c3y);
        });
    },
    
    'star': function(node, canvas) {
        var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
        var nodeDim = nconfig.overridable && data && data.$dim || nconfig.dim;
        var ctx = canvas.getCtx(), pi5 = Math.PI / 5;
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.beginPath();
        ctx.moveTo(nodeDim, 0);
        for (var i=0; i<9; i++){
          ctx.rotate(pi5);
          if(i % 2 == 0) {
            ctx.lineTo((nodeDim / 0.525731) * 0.200811, 0);
          } else {
            ctx.lineTo(nodeDim, 0);
          }
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
});

RGraph.Plot.EdgeTypes = new Class({
    'none': function() {},
    
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
        //get edge dim
		var cond = econfig.overridable && data;
		var edgeDim = cond && data.$dim || 14;
        //get edge direction
        if(cond && data.$direction && data.$direction.length > 1) {
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
        var v1 = intermediatePoint.add(normal), v2 = intermediatePoint.$add(normal.$scale(-1));
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
