/*
 * File: Spacetree.js
 * 
 * Implements the <ST> class and other derived classes.
 *
 * Description:
 *
 * The main idea of the spacetree algorithm is to take the most common tree layout, and to expand nodes that are "context-related" .i.e lying on the path between the root node and a selected node. Useful animations to contract and expand nodes are also included.
 *
 * Inspired by:
 *
 * SpaceTree: Supporting Exploration in Large Node Link Tree, Design Evolution and Empirical Evaluation (Catherine Plaisant, Jesse Grosjean, Benjamin B. Bederson)
 *
 * <http://hcil.cs.umd.edu/trs/2002-05/2002-05.pdf>
 *
 * Disclaimer:
 *
 * This visualization was built from scratch, taking only the paper as inspiration, and only shares some features with the Spacetree.
 *
 */

/*
     Class: ST
     
     The main ST class

     Extends:

     <Loader>, <Layouts.Tree>, <Tips>

     Parameters:

     canvas - A <Canvas> Class
     config - A configuration/controller object.

     Configuration:
    
     The configuration object can have the following properties (all properties are optional and have a default value)
      
     *General*

     Inherits all properties from <Options.Tree> and also
     
     - _levelsToShow_ Depth of the plotted tree. The plotted tree will be pruned in order to fit the specified depth if constrained=true. Default's 2.
     - _constrained_ If true, the algorithm will try to plot only the part of the tree that fits the Canvas.
     - _levelDistance_ Distance between levels. Default's 30.

     *Node*
     
     Customize the visualization nodes' shape, color, and other style properties.

     Inherits options from <Options.Graph.Node>.

     *Edge*

     Customize the visualization edges' shape, color, and other style properties.

     Inherits from <Options.Graph.Edge>.
      
     *Animations*

     Inherits from <Options.Animation>, although the following default values are changed.
     
     - _duration_ Duration of the animation in milliseconds. Default's 700.
     - _fps_ Frames per second. Default's 25.
     
    *Controller options*

     Inherits from <Options.Controller>.

    Example:

    Here goes a complete example. In most cases you won't be forced to implement all properties and methods. In fact, 
    all configuration properties  have the default value assigned.

    I won't be instanciating a <Canvas> class here. If you want to know more about instanciating a <Canvas> class 
    please take a look at the <Canvas> class documentation.

    (start code js)
      var st = new ST(canvas, {
        orientation: "left",
        levelsToShow: 2,
        subtreeOffset: 8,
        siblingOffset: 5,
        levelDistance: 30,
        withLabels: true,
        align: "center",
        multitree: false,
        indent: 10,
        Node: {
          overridable: false,
          type: 'rectangle',
          color: '#ccb',
          lineWidth: 1,
          height: 20,
          width: 90,
          dim: 15,
          align: "center"
        },
        Edge: {
          overridable: false,
          type: 'line',
          color: '#ccc',
          dim: 15,
          lineWidth: 1
        },
        duration: 700,
        fps: 25,
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
        },
        request:         false

      });
    (end code)

    Instance Properties:

    - _graph_ Access a <Graph> instance.
    - _op_ Access a <ST.Op> instance.
    - _fx_ Access a  <ST.Plot> instance.
    - _labels_ Access a <ST.Label> instance.
 */

$jit.ST= (function() {
    // Define some private methods first...
    // Nodes in path
    var nodesInPath = [];
    // Nodes to contract
    function getNodesToHide(node) {
      node = node || this.clickedNode;
      if(!this.config.constrained) {
        return [];
      }
      var Geom = this.geom, GUtil = Graph.Util;
      var graph = this.graph;
      var canvas = this.canvas;
      var level = node._depth, nodeArray = [];
  	  GUtil.eachNode(graph, function(n) {
          if(n.exist && !n.selected) {
              if(GUtil.isDescendantOf(n, node.id)) {
                if(n._depth <= level) nodeArray.push(n);
              } else {
                nodeArray.push(n);
              }
          }
  	  });
  	  var leafLevel = Geom.getRightLevelToShow(node, canvas);
  	  GUtil.eachLevel(node, leafLevel, leafLevel, function(n) {
          if(n.exist && !n.selected) nodeArray.push(n);
  	  });
  	    
  	  for (var i = 0; i < nodesInPath.length; i++) {
  	    var n = this.graph.getNode(nodesInPath[i]);
  	    if(!GUtil.isDescendantOf(n, node.id)) {
  	      nodeArray.push(n);
  	    }
  	  } 
  	  return nodeArray;       
    };
    // Nodes to expand
     function getNodesToShow(node) {
        var nodeArray= [], GUtil = Graph.Util, config = this.config;
        node = node || this.clickedNode;
        GUtil.eachLevel(this.clickedNode, 0, config.levelsToShow, function(n) {
            if(config.multitree && !('$orn' in n.data) 
            		&& GUtil.anySubnode(n, function(ch){ return ch.exist && !ch.drawn; })) {
            	nodeArray.push(n);
            } else if(n.drawn && !GUtil.anySubnode(n, "drawn")) {
              nodeArray.push(n);
            }
        });
        return nodeArray;
     };
    // Now define the actual class.
    return new Class({
    
        Implements: [Loader, Extras, Layouts.Tree],
        
        initialize: function(controller) {            
          var $ST = $jit.ST;
          
          var config= {
                levelsToShow: 2,
                levelDistance: 30,
                constrained: true,                
                Node: {
                  type: 'rectangle'
                },
                duration: 700,
                fps: 25,
                offsetX: 0,
                offsetY: 0
            };
            
            this.controller = this.config = $.merge(
                Options("Canvas", "Fx", "Tree", "Node", "Edge", "Controller", 
                    "Tips", "NodeStyles"), config, controller);

            var canvasConfig = this.config;
            if(canvasConfig.useCanvas) {
              this.canvas = canvasConfig.useCanvas;
              this.config.labelContainer = this.canvas.id + '-label';
            } else {
              this.canvas = new Canvas(canvasConfig);
              this.config.labelContainer = canvasConfig.injectInto + '-label';
            }

            this.graphOptions = {
                'complex': true
            };
            this.graph = new Graph(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new $ST.Label[canvasConfig.labels](this);
            this.fx = new $ST.Plot(this);
            this.op = new $ST.Op(this);
            this.group = new $ST.Group(this);
            this.geom = new $ST.Geom(this);
            this.clickedNode=  null;
            // initialize extras
            this.initializeExtras();
        },
    
        /*
         Method: plot
        
         Plots the tree. Usually this method is called right after computing nodes' positions.

        */  
        plot: function() { this.fx.plot(this.controller); },
    
      
        /*
         Method: switchPosition
        
         Switches the tree orientation.

         Parameters:

        pos - The new tree orientation. Possible values are "top", "left", "right" and "bottom".
        method - Set this to "animate" if you want to animate the tree when switching its position. You can also set this parameter to "replot" to just replot the subtree.
        onComplete - _optional_ This callback is called once the "switching" animation is complete.

         Example:

         (start code js)
           st.switchPosition("right", "animate", {
            onComplete: function() {
              alert('completed!');
            } 
           });
         (end code)
        */  
        switchPosition: function(pos, method, onComplete) {
          var Geom = this.geom, Plot = this.fx, that = this;
          if(!Plot.busy) {
              Plot.busy = true;
              this.contract({
                  onComplete: function() {
                      Geom.switchOrientation(pos);
                      that.compute('end', false);
                      Plot.busy = false;
                      if(method == 'animate') {
                    	  that.onClick(that.clickedNode.id, onComplete);  
                      } else if(method == 'replot') {
                    	  that.select(that.clickedNode.id, onComplete);
                      }
                  }
              }, pos);
          }
        },

        /*
        Method: switchAlignment
       
        Switches the tree alignment.

        Parameters:

       align - The new tree alignment. Possible values are "left", "center" and "right".
       method - Set this to "animate" if you want to animate the tree after aligning its position. You can also set this parameter to "replot" to just replot the subtree.
       onComplete - _optional_ This callback is called once the "switching" animation is complete.

        Example:

        (start code js)
          st.switchAlignment("right", "animate", {
           onComplete: function() {
             alert('completed!');
           } 
          });
        (end code)
       */  
       switchAlignment: function(align, method, onComplete) {
        this.config.align = align;
        if(method == 'animate') {
        	this.select(this.clickedNode.id, onComplete);
        } else if(method == 'replot') {
        	this.onClick(this.clickedNode.id, onComplete);	
        }
       },

       /*
        Method: addNodeInPath
       
        Adds a node to the current path as selected node. This node will be visible (as in non-collapsed) at all times.
        

        Parameters:

       id - A <Graph.Node> id.

        Example:

        (start code js)
          st.addNodeInPath("somenodeid");
        (end code)
       */  
       addNodeInPath: function(id) {
           nodesInPath.push(id);
           this.select((this.clickedNode && this.clickedNode.id) || this.root);
       },       

       /*
       Method: clearNodesInPath
      
       Removes all nodes tagged as selected by the <ST.addNodeInPath> method.
       
     See also:
     
     <ST.addNodeInPath>
     
       Example:

       (start code js)
         st.clearNodesInPath();
       (end code)
      */  
       clearNodesInPath: function(id) {
           nodesInPath.length = 0;
           this.select((this.clickedNode && this.clickedNode.id) || this.root);
       },
        
       /*
         Method: refresh
        
         Computes nodes' positions and replots the tree.
         
       */
       refresh: function() {
           this.reposition();
           this.select((this.clickedNode && this.clickedNode.id) || this.root);
       },    

       reposition: function() {
            Graph.Util.computeLevels(this.graph, this.root, 0, "ignore");
             this.geom.setRightLevelToShow(this.clickedNode, this.canvas);
            Graph.Util.eachNode(this.graph, function(n) {
                if(n.exist) n.drawn = true;
            });
            this.compute('end');
        },
        
          requestNodes: function(node, onComplete) {
            var handler = $.merge(this.controller, onComplete), 
            lev = this.config.levelsToShow, GUtil = Graph.Util;
            if(handler.request) {
                var leaves = [], d = node._depth;
                GUtil.eachLevel(node, 0, lev, function(n) {
                    if(n.drawn && 
                     !GUtil.anySubnode(n)) {
                     leaves.push(n);
                     n._level = lev - (n._depth - d);
                    }
                });
                this.group.requestNodes(leaves, handler);
            }
              else
                handler.onComplete();
          },
     
          contract: function(onComplete, switched) {
            var orn  = this.config.orientation;
            var Geom = this.geom, Group = this.group;
            if(switched) Geom.switchOrientation(switched);
            var nodes = getNodesToHide.call(this);
            if(switched) Geom.switchOrientation(orn);
            Group.contract(nodes, $.merge(this.controller, onComplete));
          },
      
         move: function(node, onComplete) {
            this.compute('end', false);
            var move = onComplete.Move, offset = {
                'x': move.offsetX,
                'y': move.offsetY 
            };
            if(move.enable) {
                this.geom.translate(node.endPos.add(offset).$scale(-1), "endPos");
            }
            this.fx.animate($.merge(this.controller, { modes: ['linear'] }, onComplete));
         },
      
      
        expand: function (node, onComplete) {
            var nodeArray = getNodesToShow.call(this, node);
            this.group.expand(nodeArray, $.merge(this.controller, onComplete));
        },
    
    
        selectPath: function(node) {
          var GUtil = Graph.Util, that = this;
          GUtil.eachNode(this.graph, function(n) { n.selected = false; }); 
          function path(node) {
              if(node == null || node.selected) return;
              node.selected = true;
              $.each(that.group.getSiblings([node])[node.id], 
              function(n) { 
                   n.exist = true; 
                   n.drawn = true; 
              });    
              var parents = GUtil.getParents(node);
              parents = (parents.length > 0)? parents[0] : null;
              path(parents);
          };
          for(var i=0, ns = [node.id].concat(nodesInPath); i < ns.length; i++) {
              path(this.graph.getNode(ns[i]));
          }
        },
      
        /*
        Method: setRoot
     
         Switches the current root node.
     
        Parameters:
           id - The id of the node to be set as root.
           method - Set this to "animate" if you want to animate the tree after adding the subtree. You can also set this parameter to "replot" to just replot the subtree.
           onComplete - _optional_ An action to perform after the animation (if any).
 
        Example:

        (start code js)
          st.setRoot('my_node_id', 'animate', {
             onComplete: function() {
               alert('complete!');
             }
          });
        (end code)
     */
     setRoot: function(id, method, onComplete) {
        	var that = this, canvas = this.canvas;
        	var rootNode = this.graph.getNode(this.root);
        	var clickedNode = this.graph.getNode(id);
        	function $setRoot() {
            	if(this.config.multitree && clickedNode.data.$orn) {
            		var orn = clickedNode.data.$orn;
            		var opp = {
            				'left': 'right',
            				'right': 'left',
            				'top': 'bottom',
            				'bottom': 'top'
            		}[orn];
            		rootNode.data.$orn = opp;
            		(function tag(rootNode) {
                		Graph.Util.eachSubnode(rootNode, function(n) {
                			if(n.id != id) {
                				n.data.$orn = opp;
                				tag(n);
                			}
                		});
            		})(rootNode);
            		delete clickedNode.data.$orn;
            	}
            	this.root = id;
            	this.clickedNode = clickedNode;
            	Graph.Util.computeLevels(this.graph, this.root, 0, "ignore");
        	}

        	// delete previous orientations (if any)
        	delete rootNode.data.$orns;

        	if(method == 'animate') {
        		this.onClick(id, {
        			onBeforeMove: function() {
        				$setRoot.call(that);
        				that.selectPath(clickedNode);
        			}
        		});
        	} else if(method == 'replot') {
        		$setRoot.call(this);
        		this.select(this.root);
        	}
     },

     /*
           Method: addSubtree
        
            Adds a subtree, performing optionally an animation.
        
           Parameters:
              subtree - A JSON Tree object. See also <Loader.loadJSON>.
              method - Set this to "animate" if you want to animate the tree after adding the subtree. You can also set this parameter to "replot" to just replot the subtree.
              onComplete - _optional_ An action to perform after the animation (if any).
    
           Example:

           (start code js)
             st.addSubtree(json, 'animate', {
                onComplete: function() {
                  alert('complete!');
                }
             });
           (end code)
        */
        addSubtree: function(subtree, method, onComplete) {
            if(method == 'replot') {
                this.op.sum(subtree, $.extend({ type: 'replot' }, onComplete || {}));
            } else if (method == 'animate') {
                this.op.sum(subtree, $.extend({ type: 'fade:seq' }, onComplete || {}));
            }
        },
    
        /*
           Method: removeSubtree
        
            Removes a subtree, performing optionally an animation.
        
           Parameters:
              id - The _id_ of the subtree to be removed.
              removeRoot - Remove the root of the subtree or only its subnodes.
              method - Set this to "animate" if you want to animate the tree after removing the subtree. You can also set this parameter to "replot" to just replot the subtree.
              onComplete - _optional_ An action to perform after the animation (if any).

          Example:

          (start code js)
            st.removeSubtree('idOfSubtreeToBeRemoved', false, 'animate', {
              onComplete: function() {
                alert('complete!');
              }
            });
          (end code)
    
        */
        removeSubtree: function(id, removeRoot, method, onComplete) {
            var node = this.graph.getNode(id), subids = [];
            Graph.Util.eachLevel(node, +!removeRoot, false, function(n) {
                subids.push(n.id);
            });
            if(method == 'replot') {
                this.op.removeNode(subids, $.extend({ type: 'replot' }, onComplete || {}));
            } else if (method == 'animate') {
                this.op.removeNode(subids, $.extend({ type: 'fade:seq'}, onComplete || {}));
            }
        },
    
        /*
           Method: select
        
            Selects a sepecific node in the Spacetree without performing an animation. Useful when selecting 
            nodes which are currently hidden or deep inside the tree.

          Parameters:
            id - The id of the node to select.
            onComplete - _optional_ onComplete callback.

          Example:
          (start code js)
            st.select('mynodeid', {
              onComplete: function() {
                alert('complete!');
              }
            });
          (end code)
        */
        select: function(id, onComplete) {
            var group = this.group, geom = this.geom;
            var node=  this.graph.getNode(id), canvas = this.canvas;
            var root  = this.graph.getNode(this.root);
            var complete = $.merge(this.controller, onComplete);
            var that = this;
    
            complete.onBeforeCompute(node);
            this.selectPath(node);
            this.clickedNode= node;
            this.requestNodes(node, {
                onComplete: function(){
                    group.hide(group.prepare(getNodesToHide.call(that)), complete);
                    geom.setRightLevelToShow(node, canvas);
                    that.compute("current");
                    Graph.Util.eachNode(that.graph, function(n) { 
                        var pos = n.pos.getc(true);
                        n.startPos.setc(pos.x, pos.y);
                        n.endPos.setc(pos.x, pos.y);
                        n.visited = false; 
                    });
                    var offset = { x: complete.offsetX, y: complete.offsetY };
                    that.geom.translate(node.endPos.add(offset).$scale(-1), ["pos", "startPos", "endPos"]);
                    group.show(getNodesToShow.call(that));              
                    that.plot();
                    complete.onAfterCompute(that.clickedNode);
                    complete.onComplete();
                }
            });     
        },
    
      /*
         Method: onClick
    
        This method is called when clicking on a tree node. It mainly performs all calculations and the animation of contracting, translating and expanding pertinent nodes.
        
            
         Parameters:
        
            id - A node id.
            options - A group of options and callbacks such as

            - _onComplete_ an object callback called when the animation finishes.
            - _Move_ an object that has as properties _offsetX_ or _offsetY_ for adding some offset position to the centered node.

        Example:

        (start code js)
          st.onClick('mynodeid', {
	          Move: {
	          	enable: true,
	            offsetX: 30,
	            offsetY: 5
	          },
	          onComplete: function() {
	              alert('yay!');
	          }
          });
        (end code)
    
        */    
      onClick: function (id, options) {
        var canvas = this.canvas, that = this, Geom = this.geom, config = this.config;
        var innerController = {
            Move: {
        	    enable: true,
              offsetX: config.offsetX || 0,
              offsetY: config.offsetY || 0  
            },
            onBeforeRequest: $.empty,
            onBeforeContract: $.empty,
            onBeforeMove: $.empty,
            onBeforeExpand: $.empty
        };
        var complete = $.merge(this.controller, innerController, options);
        
        if(!this.busy) {
            this.busy= true;
            var node=  this.graph.getNode(id);
            this.selectPath(node, this.clickedNode);
            this.clickedNode= node;
            complete.onBeforeCompute(node);
            complete.onBeforeRequest(node);
            this.requestNodes(node, {
                onComplete: function() {
                    complete.onBeforeContract(node);
                    that.contract({
                        onComplete: function() {
                            Geom.setRightLevelToShow(node, canvas);
                            complete.onBeforeMove(node);
                            that.move(node, {
                                Move: complete.Move,
                                onComplete: function() {
                                    complete.onBeforeExpand(node);
                                    that.expand(node, {
                                        onComplete: function() {
                                            that.busy = false;
                                            complete.onAfterCompute(id);
                                            complete.onComplete();
                                        }
                                    }); // expand
                                }
                            }); // move
                        }
                    });// contract
                }
            });// request
        }
      }
    });

})();

$jit.ST.$extend = true;

/*
   Class: ST.Op
    
   Performs advanced operations on trees and graphs.

   Extends:

   All <Graph.Op> methods

   Access:

   This instance can be accessed with the _op_ parameter of the st instance created.

   Example:

   (start code js)
    var st = new ST(canvas, config);
    st.op.morph //or can also call any other <Graph.Op> method
   (end code)

*/
$jit.ST.Op = new Class({
    Implements: Graph.Op,
    
    initialize: function(viz) {
        this.viz = viz;
    }
});

/*
    
     Performs operations on group of nodes.

*/
$jit.ST.Group = new Class({
    
    initialize: function(viz) {
        this.viz = viz;
        this.canvas = viz.canvas;
        this.config = viz.config;
        this.animation = new Animation;
        this.nodes = null;
    },
    
    /*
    
       Calls the request method on the controller to request a subtree for each node. 
    */
    requestNodes: function(nodes, controller) {
        var counter = 0, len = nodes.length, nodeSelected = {};
        var complete = function() { controller.onComplete(); };
        var viz = this.viz;
        if(len == 0) complete();
        for(var i=0; i<len; i++) {
            nodeSelected[nodes[i].id] = nodes[i];
            controller.request(nodes[i].id, nodes[i]._level, {
                onComplete: function(nodeId, data) {
                    if(data && data.children) {
                        data.id = nodeId;
                        viz.op.sum(data, { type: 'nothing' });
                    }
                    if(++counter == len) {
                        Graph.Util.computeLevels(viz.graph, viz.root, 0);
                        complete();
                    }
                }
            });
        }
    },
    
    /*
    
       Collapses group of nodes. 
    */
    contract: function(nodes, controller) {
        var GUtil = Graph.Util;
        var viz = this.viz;
        var that = this;

        nodes = this.prepare(nodes);
        this.animation.setOptions($.merge(controller, {
            $animating: false,
            compute: function(delta) {
              if(delta == 1) delta = 0.99;
              that.plotStep(1 - delta, controller, this.$animating);
              this.$animating = 'contract';
            },
            
            complete: function() {
                that.hide(nodes, controller);
            }       
        })).start();
    },
    
    hide: function(nodes, controller) {
        var GUtil = Graph.Util, viz = this.viz;
        for(var i=0; i<nodes.length; i++) {
            // TODO nodes are requested on demand, but not
            // deleted when hidden. Would that be a good feature?
            // Currently that feature is buggy, so I'll turn it off
            // Actually this feature is buggy because trimming should take
            // place onAfterCompute and not right after collapsing nodes.
            if (true || !controller || !controller.request) {
                GUtil.eachLevel(nodes[i], 1, false, function(elem){
                    if (elem.exist) {
                        $.extend(elem, {
                            'drawn': false,
                            'exist': false
                        });
                    }
                });
            } else {
                var ids = [];
                GUtil.eachLevel(nodes[i], 1, false, function(n) {
                    ids.push(n.id);
                });
                viz.op.removeNode(ids, { 'type': 'nothing' });
                viz.labels.clearLabels();
            }
        }
        controller.onComplete();
    },    
    

    /*
    
       Expands group of nodes. 
    */
    expand: function(nodes, controller) {
        var that = this, GUtil = Graph.Util;
        this.show(nodes);
        this.animation.setOptions($.merge(controller, {
            $animating: false,
            compute: function(delta) {
                that.plotStep(delta, controller, this.$animating);
                this.$animating = 'expand';
            },
            
            complete: function() {
                that.plotStep(undefined, controller, false);
                controller.onComplete();
            }       
        })).start();
        
    },
    
    show: function(nodes) {
        var GUtil = Graph.Util, config = this.config;
        this.prepare(nodes);
        $.each(nodes, function(n) {
        	// check for root nodes if multitree
        	if(config.multitree && !('$orn' in n.data)) {
        		delete n.data.$orns;
        		var orns = ' ';
        		GUtil.eachSubnode(n, function(ch) {
        			if(('$orn' in ch.data) 
        					&& orns.indexOf(ch.data.$orn) < 0 
        					&& ch.exist && !ch.drawn) {
        				orns += ch.data.$orn + ' ';
        			}
        		});
        		n.data.$orns = orns;
        	}
            GUtil.eachLevel(n, 0, config.levelsToShow, function(n) {
            	if(n.exist) n.drawn = true;
            });     
        });
    },
    
    prepare: function(nodes) {
        this.nodes = this.getNodesWithChildren(nodes);
        return this.nodes;
    },
    
    /*
       Filters an array of nodes leaving only nodes with children.
    */
    getNodesWithChildren: function(nodes) {
        var ans = [], GUtil = Graph.Util, config = this.config, root = this.viz.root;
        nodes.sort(function(a, b) { return (a._depth <= b._depth) - (a._depth >= b._depth); });
        for(var i=0; i<nodes.length; i++) {
            if(GUtil.anySubnode(nodes[i], "exist")) {
            	for (var j = i+1, desc = false; !desc && j < nodes.length; j++) {
                    if(!config.multitree || '$orn' in nodes[j].data) {
                		desc = desc || GUtil.isDescendantOf(nodes[i], nodes[j].id);                    	
                    }
                }
                if(!desc) ans.push(nodes[i]);
            }
        }
        return ans;
    },
    
    plotStep: function(delta, controller, animating) {
        var viz = this.viz,
        config = this.config,
        canvas = viz.canvas, 
        ctx = canvas.getCtx(),
        nodes = this.nodes,
        GUtil = Graph.Util;
        var i, node;
        // hide nodes that are meant to be collapsed/expanded
        var nds = {};
        for(i=0; i<nodes.length; i++) {
          node = nodes[i];
          nds[node.id] = [];
          var root = config.multitree && !('$orn' in node.data);
          var orns = root && node.data.$orns;
          GUtil.eachSubgraph(node, function(n) { 
            // TODO(nico): Cleanup
        	  // special check for root node subnodes when
        	  // multitree is checked.
        	  if(root && orns && orns.indexOf(n.data.$orn) > 0 
        			  && n.drawn) {
        		  n.drawn = false;
                  nds[node.id].push(n);
              } else if((!root || !orns) && n.drawn) {
                n.drawn = false;
                nds[node.id].push(n);
              }
            });	
            node.drawn = true;
        }
        // plot the whole (non-scaled) tree
        if(nodes.length > 0) viz.fx.plot();
        // show nodes that were previously hidden
        for(i in nds) {
          $.each(nds[i], function(n) { n.drawn = true; });
        }
        // plot each scaled subtree
        for(i=0; i<nodes.length; i++) {
          node = nodes[i];
          ctx.save();
          viz.fx.plotSubtree(node, controller, delta, animating);                
          ctx.restore();
        }
      },

      getSiblings: function(nodes) {
        var siblings = {}, GUtil = Graph.Util;
        $.each(nodes, function(n) {
            var par = GUtil.getParents(n);
            if (par.length == 0) {
                siblings[n.id] = [n];
            } else {
                var ans = [];
                GUtil.eachSubnode(par[0], function(sn) {
                    ans.push(sn);
                });
                siblings[n.id] = ans;
            }
        });
        return siblings;
    }
});

/*
   Class: ST.Geom

    Performs low level geometrical computations.

   Access:

   This instance can be accessed with the _geom_ parameter of the st instance created.

   Example:

   (start code js)
    var st = new ST(canvas, config);
    st.geom.translate //or can also call any other <ST.Geom> method
   (end code)

*/

$jit.ST.Geom = new Class({
    
    initialize: function(viz) {
        this.viz = viz;
        this.config = viz.config;
        this.node = viz.config.Node;
        this.edge = viz.config.Edge;
    },
    
    /*
       Method: translate
       
       Applies a translation to the tree.

       Parameters:

       pos - A <Complex> number specifying translation vector.
       prop - A <Graph.Node> position property ('pos', 'startPos' or 'endPos').

       Example:

       (start code js)
         st.geom.translate(new Complex(300, 100), 'endPos');
       (end code)
    */  
    translate: function(pos, prop) {
        prop = $.splat(prop);
        Graph.Util.eachNode(this.viz.graph, function(elem) {
            $.each(prop, function(p) { elem[p].$add(pos); });
        });
    },

    /*
       Changes the tree current orientation to the one specified.

       You should usually use <ST.switchPosition> instead.
    */  
    switchOrientation: function(orn) {
    	this.config.orientation = orn;
    },

    /*
       Makes a value dispatch according to the current layout
       Works like a CSS property, either _top-right-bottom-left_ or _top|bottom - left|right_.
     */
    dispatch: function() {
    	  // TODO(nico) should store Array.prototype.slice.call somewhere.
        var args = Array.prototype.slice.call(arguments);
        var s = args.shift(), len = args.length;
        var val = function(a) { return typeof a == 'function'? a() : a; };
        if(len == 2) {
            return (s == "top" || s == "bottom")? val(args[0]) : val(args[1]);
        } else if(len == 4) {
            switch(s) {
                case "top": return val(args[0]);
                case "right": return val(args[1]);
                case "bottom": return val(args[2]);
                case "left": return val(args[3]);
            }
        }
        return undefined;
    },

    /*
       Returns label height or with, depending on the tree current orientation.
    */  
    getSize: function(n, invert) {
        var data = n.data, config = this.config;
        var siblingOffset = config.siblingOffset;
        var s = (config.multitree 
        		&& ('$orn' in data) 
        		&& data.$orn) || config.orientation;
        var w = n.getData('width') + siblingOffset;
        var h = n.getData('height') + siblingOffset;
        if(!invert)
            return this.dispatch(s, h, w);
        else
            return this.dispatch(s, w, h);
    },
    
    /*
       Calculates a subtree base size. This is an utility function used by _getBaseSize_
    */  
    getTreeBaseSize: function(node, level, leaf) {
        var size = this.getSize(node, true), baseHeight = 0, that = this;
        if(leaf(level, node)) return size;
        if(level === 0) return 0;
        Graph.Util.eachSubnode(node, function(elem) {
            baseHeight += that.getTreeBaseSize(elem, level -1, leaf);
        });
        return (size > baseHeight? size : baseHeight) + this.config.subtreeOffset;
    },


    /*
       Method: getEdge
       
       Returns a Complex instance with the begin or end position of the edge to be plotted.

       Parameters:

       node - A <Graph.Node> that is connected to this edge.
       type - Returns the begin or end edge position. Possible values are 'begin' or 'end'.

       Returns:

       A <Complex> number specifying the begin or end position.
    */  
    getEdge: function(node, type, s) {
    	var $C = function(a, b) { 
          return function(){
            return node.pos.add(new Complex(a, b));
          }; 
        };
        var dim = this.node;
        var w = node.getData('width');
        var h = node.getData('height');

        if(type == 'begin') {
            if(dim.align == "center") {
                return this.dispatch(s, $C(0, h/2), $C(-w/2, 0),
                                     $C(0, -h/2),$C(w/2, 0));
            } else if(dim.align == "left") {
                return this.dispatch(s, $C(0, h), $C(0, 0),
                                     $C(0, 0), $C(w, 0));
            } else if(dim.align == "right") {
                return this.dispatch(s, $C(0, 0), $C(-w, 0),
                                     $C(0, -h),$C(0, 0));
            } else throw "align: not implemented";
            
            
        } else if(type == 'end') {
            if(dim.align == "center") {
                return this.dispatch(s, $C(0, -h/2), $C(w/2, 0),
                                     $C(0, h/2),  $C(-w/2, 0));
            } else if(dim.align == "left") {
                return this.dispatch(s, $C(0, 0), $C(w, 0),
                                     $C(0, h), $C(0, 0));
            } else if(dim.align == "right") {
                return this.dispatch(s, $C(0, -h),$C(0, 0),
                                     $C(0, 0), $C(-w, 0));
            } else throw "align: not implemented";
        }
    },

    /*
       Adjusts the tree position due to canvas scaling or translation.
    */  
    getScaledTreePosition: function(node, scale) {
        var dim = this.node;
        var w = node.getData('width');
        var h = node.getData('height');
        var s = (this.config.multitree 
        		&& ('$orn' in node.data) 
        		&& node.data.$orn) || this.config.orientation;

        var $C = function(a, b) { 
          return function(){
            return node.pos.add(new Complex(a, b)).$scale(1 - scale);
          }; 
        };
        if(dim.align == "left") {
            return this.dispatch(s, $C(0, h), $C(0, 0),
                                 $C(0, 0), $C(w, 0));
        } else if(dim.align == "center") {
            return this.dispatch(s, $C(0, h / 2), $C(-w / 2, 0),
                                 $C(0, -h / 2),$C(w / 2, 0));
        } else if(dim.align == "right") {
            return this.dispatch(s, $C(0, 0), $C(-w, 0),
                                 $C(0, -h),$C(0, 0));
        } else throw "align: not implemented";
    },

    /*
       Method: treeFitsInCanvas
       
       Returns a Boolean if the current subtree fits in canvas.

       Parameters:

       node - A <Graph.Node> which is the current root of the subtree.
       canvas - The <Canvas> object.
       level - The depth of the subtree to be considered.
    */  
    treeFitsInCanvas: function(node, canvas, level) {
        var csize = canvas.getSize(node);
        var s = (this.config.multitree 
        		&& ('$orn' in node.data) 
        		&& node.data.$orn) || this.config.orientation;

        var size = this.dispatch(s, csize.width, csize.height);
        var baseSize = this.getTreeBaseSize(node, level, function(level, node) { 
          return level === 0 || !Graph.Util.anySubnode(node);
        });
        return (baseSize < size);
    },
    
    /*
       Hides levels of the tree until it properly fits in canvas.
    */  
    setRightLevelToShow: function(node, canvas) {
        var level = this.getRightLevelToShow(node, canvas), fx = this.viz.labels;
        Graph.Util.eachLevel(node, 0, this.config.levelsToShow, function(n) {
            var d = n._depth - node._depth;
            if(d > level) {
                n.drawn = false; 
                n.exist = false; 
                fx.hideLabel(n, false);
            } else {
                n.exist = true;
            }
        });
        node.drawn= true;
    },
    
    /*
       Returns the right level to show for the current tree in order to fit in canvas.
    */  
    getRightLevelToShow: function(node, canvas) {
        var config = this.config;
    	var level = config.levelsToShow;
    	var constrained = config.constrained;
        if(!constrained) return level;
        while(!this.treeFitsInCanvas(node, canvas, level) && level > 1) { level-- ; }
        return level;
    }

});

/*
   Object: ST.Plot
    
   Performs plotting operations.

   Extends:

   All <Graph.Plot> methods

   Access:

   This instance can be accessed with the _fx_ parameter of the st instance created.

   Example:

   (start code js)
    var st = new ST(canvas, config);
    st.fx.animate //or can also call any other <ST.Plot> method
   (end code)


*/
$jit.ST.Plot = new Class({
    
    Implements: Graph.Plot,
    
    initialize: function(viz) {
        this.viz = viz;
        this.config = viz.config;
        this.node = this.config.Node;
        this.edge = this.config.Edge;
        this.animation = new Animation;
        this.nodeTypes = new $jit.ST.Plot.NodeTypes;
        this.edgeTypes = new $jit.ST.Plot.EdgeTypes;        
        this.labels = viz.labels;
    },
    
    /*
       Plots a subtree from the spacetree.
    */
    plotSubtree: function(node, opt, scale, animating) {
        var viz = this.viz, canvas = viz.canvas, config = viz.config;
        scale = Math.min(Math.max(0.001, scale), 1);
        if(scale >= 0) {
            node.drawn = false;     
            var ctx = canvas.getCtx();
            var diff = viz.geom.getScaledTreePosition(node, scale);
            ctx.translate(diff.x, diff.y);
            ctx.scale(scale, scale);
        }
        this.plotTree(node, $.merge(opt, {
          'withLabels': true,
          'hideLabels': !!scale,
          'plotSubtree': function(n, ch) {
            var root = config.multitree && !('$orn' in node.data);
            var orns = root && node.getData('orns');
            return !root || orns.indexOf(elem.getData('orn')) > -1;
          }
        }), animating);
        if(scale >= 0) node.drawn = true;
    },   
   
    getAlignedPos: function(pos, width, height) {
        var nconfig = this.node;
        var square, orn;
        if(nconfig.align == "center") {
            square = {
                x: pos.x - width / 2,
                y: pos.y - height / 2
            };
        } else if (nconfig.align == "left") {
            orn = this.config.orientation;
            if(orn == "bottom" || orn == "top") {
                square = {
                    x: pos.x - width / 2,
                    y: pos.y
                };
            } else {
                square = {
                    x: pos.x,
                    y: pos.y - height / 2
                };
            }
        } else if(nconfig.align == "right") {
            orn = this.config.orientation;
            if(orn == "bottom" || orn == "top") {
                square = {
                    x: pos.x - width / 2,
                    y: pos.y - height
                };
            } else {
                square = {
                    x: pos.x - width,
                    y: pos.y - height / 2
                };
            }
        } else throw "align: not implemented";
        
        return square;
    },
    
    getOrientation: function(adj) {
    	var config = this.config;
    	var orn = config.orientation;

    	if(config.multitree) {
        	var nodeFrom = adj.nodeFrom;
        	var nodeTo = adj.nodeTo;
    		orn = (('$orn' in nodeFrom.data) 
        		&& nodeFrom.data.$orn) 
        		|| (('$orn' in nodeTo.data) 
        		&& nodeTo.data.$orn);
    	}

    	return orn; 
    }
});

/*
  Object: ST.Label

  Label interface implementation for the ST

  See Also:

  <Graph.Label>, <ST.Label.HTML>, <RGraph.Label.SVG>

 */ 
$jit.ST.Label = {};

/*
   Class: ST.Label.Native

   Implements labels natively, using the Canvas text API.

   Extends:

   <Graph.Label.Native>

   See also:

   <ST.Label>, <Hypertree.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
$jit.ST.Label.Native = new Class({
  Extends: Graph.Label.Native,
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
        ctx.save();
        ctx.fillStyle = ctx.strokeStyle = '#000';
        ctx.fillText(node.name, coord.x, coord.y);
        ctx.restore();
    }
});

$jit.ST.Label.DOM = new Class({
  Implements: Graph.Label.DOM,

  /* 
      Method: placeLabel

      Overrides abstract method placeLabel in <Graph.Plot>.

      Parameters:

      tag - A DOM label element.
      node - A <Graph.Node>.
      controller - A configuration/controller object passed to the visualization.
     
    */
    placeLabel: function(tag, node, controller) {
        var pos = node.pos.getc(true), config = this.viz.config, 
        dim = config.Node, canvas = this.viz.canvas;
        var w = node.getData('width');
        var h = node.getData('height');
        var radius = canvas.getSize();
        var labelPos, orn;
        if(dim.align == "center") {
            labelPos= {
                x: Math.round(pos.x - w / 2 + radius.width/2),
                y: Math.round(pos.y - h / 2 + radius.height/2)
            };
        } else if (dim.align == "left") {
            orn = config.orientation;
            if(orn == "bottom" || orn == "top") {
                labelPos= {
                    x: Math.round(pos.x - w / 2 + radius.width/2),
                    y: Math.round(pos.y + radius.height/2)
                };
            } else {
                labelPos= {
                    x: Math.round(pos.x + radius.width/2),
                    y: Math.round(pos.y - h / 2 + radius.height/2)
                };
            }
        } else if(dim.align == "right") {
            orn = config.orientation;
            if(orn == "bottom" || orn == "top") {
                labelPos= {
                    x: Math.round(pos.x - w / 2 + radius.width/2),
                    y: Math.round(pos.y - h + radius.height/2)
                };
            } else {
                labelPos= {
                    x: Math.round(pos.x - w + radius.width/2),
                    y: Math.round(pos.y - h / 2 + radius.height/2)
                };
            }
        } else throw "align: not implemented";

        var style = tag.style;
        style.left = labelPos.x + 'px';
        style.top  = labelPos.y + 'px';
        style.display = this.fitsInCanvas(labelPos, canvas)? '' : 'none';
        controller.onPlaceLabel(tag, node);
    }
});

/*
   Class: ST.Label.SVG

   Implements labels using SVG (currently not supported in IE).

   Extends:

   <ST.Label.DOM>, <Graph.Label.SVG>

   See also:

   <ST.Label>, <Hypertree.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
$jit.ST.Label.SVG = new Class({
  Implements: [$jit.ST.Label.DOM, Graph.Label.SVG],

  initialize: function(viz) {
    this.viz = viz;
  }
});

/*
   Class: ST.Label.HTML

   Implements labels using plain old HTML.

   Extends:

   <ST.Label.DOM>, <Graph.Label.HTML>

   See also:

   <ST.Label>, <Hypertree.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
$jit.ST.Label.HTML = new Class({
  Implements: [$jit.ST.Label.DOM, Graph.Label.HTML],

  initialize: function(viz) {
    this.viz = viz;
  }
});


/*
  Class: ST.Plot.NodeTypes

  Here are implemented all kinds of node rendering functions. 
  Rendering functions implemented are 'none', 'circle', 'ellipse', 'rectangle' and 'square'.

  You can add new Node types by implementing a new method in this class

  Example:

  (start code js)
    ST.Plot.NodeTypes.implement({
      'newnodetypename': function(node, canvas) {
        //Render my node here.
      }
    });
  (end code)

*/
$jit.ST.Plot.NodeTypes = new Class({
  'circle': {
    'render': function(node, canvas) {
      var pos = node.pos.getc(true),
          dim  = node.getData('dim'),
          algnPos = this.getAlignedPos(pos, dim, dim),
          ctx = canvas.getCtx();
      ctx.beginPath();
      ctx.arc(algnPos.x + dim/2, algnPos.y + dim/2, dim/2, 0, Math.PI * 2, true);            
      ctx.fill();
    },
    'contains': $.lambda(false)
  },

  'square': {
    'render': function(node, canvas) {
      var pos = node.pos.getc(true);
      var dim  = node.getData('dim');
      var algnPos = this.getAlignedPos(pos, dim, dim);
      canvas.getCtx().fillRect(algnPos.x, algnPos.y, dim, dim);
    },
    'contains': $.lambda(false)
  },

  'ellipse': {
    'render': function(node, canvas) {
      var pos = node.pos.getc(true);
      var width  = node.getData('width') / 2;
      var height = node.getData('height') / 2;
      var algnPos = this.getAlignedPos(pos, width * 2, height * 2);
      var ctx = canvas.getCtx();
      ctx.save();
      ctx.scale(width / height, height / width);
      canvas.path('fill', function(context) {
          context.arc((algnPos.x + width) * (height / width), 
              (algnPos.y + height) * (width / height), height, 0, Math.PI * 2, true);            
      });
      ctx.restore();
    },
    'contains': $.lambda(false)
  },

  'rectangle': {
    'render': function(node, canvas) {
      var pos = node.pos.getc(true);
      var width  = node.getData('width');
      var height = node.getData('height');
      var algnPos = this.getAlignedPos(pos, width, height);
      canvas.getCtx().fillRect(algnPos.x, algnPos.y, width, height);
    },
    'contains': $.lambda(false)
  }
});

/*
  Class: ST.Plot.EdgeTypes

  Here are implemented all kinds of edge rendering functions. 
  Rendering functions implemented are 'none', 'line', 'quadratic:begin', 'quadratic:end', 'bezier' and 'arrow'.

  You can add new Edge types by implementing a new method in this class

  Example:

  (start code js)
    ST.Plot.EdgeTypes.implement({
      'newedgetypename': function(adj, canvas) {
        //Render my edge here.
      }
    });
  (end code)

*/
$jit.ST.Plot.EdgeTypes = new Class({
    'none': function() {},
    
    'line': function(adj, canvas) {
    	var orn = this.getOrientation(adj);
    	var nodeFrom = adj.nodeFrom, nodeTo = adj.nodeTo;
        var begin = this.viz.geom.getEdge(nodeFrom._depth < nodeTo._depth? nodeFrom:nodeTo, 'begin', orn);
        var end =  this.viz.geom.getEdge(nodeFrom._depth < nodeTo._depth? nodeTo:nodeFrom, 'end', orn);
        canvas.path('stroke', function(ctx) {
            ctx.moveTo(begin.x, begin.y);
            ctx.lineTo(end.x, end.y);
        });
    },
    
    'quadratic:begin': function(adj, canvas) {
    	var orn = this.getOrientation(adj);
        var data = adj.data, econfig = this.edge;
    	var nodeFrom = adj.nodeFrom, nodeTo = adj.nodeTo;
        var begin = this.viz.geom.getEdge(nodeFrom._depth < nodeTo._depth? nodeFrom:nodeTo, 'begin', orn);
        var end =  this.viz.geom.getEdge(nodeFrom._depth < nodeTo._depth? nodeTo:nodeFrom, 'end', orn);
        var dim = adj.getData('dim');
        switch(orn) {
            case "left":
                canvas.path('stroke', function(ctx){
                    ctx.moveTo(begin.x, begin.y);
                    ctx.quadraticCurveTo(begin.x + dim, begin.y, end.x, end.y);
                });
                break;
            case "right":
                canvas.path('stroke', function(ctx){
                    ctx.moveTo(begin.x, begin.y);
                    ctx.quadraticCurveTo(begin.x - dim, begin.y, end.x, end.y);
                });
                break;
            case "top":
                canvas.path('stroke', function(ctx){
                    ctx.moveTo(begin.x, begin.y);
                    ctx.quadraticCurveTo(begin.x, begin.y + dim, end.x, end.y);
                });
                break;
            case "bottom":
                canvas.path('stroke', function(ctx){
                    ctx.moveTo(begin.x, begin.y);
                    ctx.quadraticCurveTo(begin.x, begin.y - dim, end.x, end.y);
                });
                break;
        }
    },

    'quadratic:end': function(adj, canvas) {
    	var orn = this.getOrientation(adj);
        var data = adj.data, econfig = this.edge;
    	var nodeFrom = adj.nodeFrom, nodeTo = adj.nodeTo;
        var begin = this.viz.geom.getEdge(nodeFrom._depth < nodeTo._depth? nodeFrom:nodeTo, 'begin', orn);
        var end =  this.viz.geom.getEdge(nodeFrom._depth < nodeTo._depth? nodeTo:nodeFrom, 'end', orn);
        var dim = adj.getData('dim');
        switch(orn) {
            case "left":
                canvas.path('stroke', function(ctx){
                    ctx.moveTo(begin.x, begin.y);
                    ctx.quadraticCurveTo(end.x - dim, end.y, end.x, end.y);
                });
                break;
            case "right":
                canvas.path('stroke', function(ctx){
                    ctx.moveTo(begin.x, begin.y);
                    ctx.quadraticCurveTo(end.x + dim, end.y, end.x, end.y);
                });
                break;
            case "top":
                canvas.path('stroke', function(ctx){
                    ctx.moveTo(begin.x, begin.y);
                    ctx.quadraticCurveTo(end.x, end.y - dim, end.x, end.y);
                });
                break;
            case "bottom":
                canvas.path('stroke', function(ctx){
                    ctx.moveTo(begin.x, begin.y);
                    ctx.quadraticCurveTo(end.x, end.y + dim, end.x, end.y);
                });
                break;
        }
    },

    'bezier': function(adj, canvas) {
        var data = adj.data, econfig = this.edge;
    	var orn = this.getOrientation(adj);
    	var nodeFrom = adj.nodeFrom, nodeTo = adj.nodeTo;
        var begin = this.viz.geom.getEdge(nodeFrom._depth < nodeTo._depth? nodeFrom:nodeTo, 'begin', orn);
        var end =  this.viz.geom.getEdge(nodeFrom._depth < nodeTo._depth? nodeTo:nodeFrom, 'end', orn);
        var dim = adj.getData('dim');
        switch(orn) {
            case "left":
                canvas.path('stroke', function(ctx) {
                    ctx.moveTo(begin.x, begin.y);
                    ctx.bezierCurveTo(begin.x + dim, begin.y, end.x - dim, end.y, end.x, end.y);
                });
                break;
            case "right":
                canvas.path('stroke', function(ctx) {
                    ctx.moveTo(begin.x, begin.y);
                    ctx.bezierCurveTo(begin.x - dim, begin.y, end.x + dim, end.y, end.x, end.y);
                });
                break;
            case "top":
                canvas.path('stroke', function(ctx) {
                    ctx.moveTo(begin.x, begin.y);
                    ctx.bezierCurveTo(begin.x, begin.y + dim, end.x, end.y - dim, end.x, end.y);
                });
                break;
            case "bottom":
                canvas.path('stroke', function(ctx) {
                    ctx.moveTo(begin.x, begin.y);
                    ctx.bezierCurveTo(begin.x, begin.y - dim, end.x, end.y + dim, end.x, end.y);
                });
                break;
        }
    },

    'arrow': function(adj, canvas) {
    	var orn = this.getOrientation(adj);
    	var node = adj.nodeFrom, child = adj.nodeTo;
      var data = adj.data, econfig = this.edge;
      // get edge dim
      var cond = econfig.overridable;
      var edgeDim = adj.getData('dim');
      // get edge direction
      if(cond && data.$direction && data.$direction.length > 1) {
          var nodeHash = {};
          nodeHash[node.id] = node;
          nodeHash[child.id] = child;
          var sense = data.$direction;
          node = nodeHash[sense[0]];
          child = nodeHash[sense[1]];
      }
      var posFrom = this.viz.geom.getEdge(node, 'begin', orn);
      var posTo =  this.viz.geom.getEdge(child, 'end', orn);
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

