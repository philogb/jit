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

     <Loader>

     Parameters:

     canvas - A <Canvas> Class
     config - A configuration/controller object.

     Configuration:
    
     The configuration object can have the following properties (all properties are optional and have a default value)
      
     *General*

     - _orientation_ Sets the orientation layout. Implemented orientations are _left_ (the root node will be placed on the left side of the screen), _top_ (the root node will be placed on top of the screen), _bottom_ and _right_. Default's "left".
     - _levelsToShow_ Depth of the plotted tree. The plotted tree will be pruned in order to fit the specified depth. Default's 2.
     - _subtreeOffset_ Separation offset between subtrees. Default's 8.
     - _siblingOffset_ Separation offset between siblings. Default's 5.
     - _levelDistance_ Distance between levels. Default's 30.

     *Node*
     
     Customize the visualization nodes' shape, color, and other style properties.

     - _Node_

     This object has as properties

     - _overridable_ Determine whether or not nodes properties can be overriden by a particular node. Default's false.

     If given a JSON tree or graph, a node _data_ property contains properties which are the same as defined here but prefixed with 
     a dollar sign (i.e $), the node properties will override the global node properties.

     - _type_ Node type (shape). Possible options are "none", "square", "rectangle", "ellipse" and "circle". Default's "rectangle".
     - _color_ Node color. Default's '#ccb'.
     - _lineWidth_ Line width. If nodes aren't drawn with strokes then this property won't be of any use. Default's 1.
     - _height_ Node height. Used for plotting rectangular nodes. _Width_ and _height_ properties are also used as bounding box for nodes of different shapes. 
     This means that for all shapes you'd have to make sure that the node's shape is contained in the bounding box defined by _width_ and _height_ parameters. Default's 20.
     - _width_ Node width. Used for plotting rectangular nodes and for calculating a node's bounding box. Default's 90.
     - _dim_ An extra parameter used by other complex shapes such as square and circle to determine the shape's diameter. 
     Please notice that even if these complex shapes (square, circle) only use _dim_ for calculating it's diameter property, the complex shape must be 
     contained in the bounding box calculated with the _width_ and _height_ parameters. Default's 15.
     - _align_ Defines a node's alignment. Possible values are "center", "left", "right". Default's "center".

     *Edge*

     Customize the visualization edges' shape, color, and other style properties.

     - _Edge_

     This object has as properties

     - _overridable_ Determine whether or not edges properties can be overriden by a particular edge object. Default's false.

     If given a JSON _complex_ graph (defined in <Loader.loadJSON>), an adjacency _data_ property contains properties which are the same as defined here but prefixed with 
     a dollar sign (i.e $), the adjacency properties will override the global edge properties.

     - _type_ Edge type (shape). Possible options are "none", "line", "quadratic:begin", "quadratic:end", "bezier" and "arrow". Default's "line".
     - _color_ Edge color. Default's '#ccb'.
     - _lineWidth_ Line width. If edges aren't drawn with strokes then this property won't be of any use. Default's 1.
     - _dim_ An extra parameter used by other complex shapes such as quadratic, arrow and bezier to determine the shape's diameter. 

     *Animations*

     - _duration_ Duration of the animation in milliseconds. Default's 700.
     - _fps_ Frames per second. Default's 25.
     - _transition_ One of the transitions defined in the <Animation> class. Default's Quart.easeInOut.

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
    - _request(nodeId, level, onComplete)_ This method is used for buffering information into the visualization. When clicking on an empty node,
 the visualization will make a request for this node's subtree, specifying a given level for this subtree. Once this request is completed the _onComplete_ 
object must be called with the given result.

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
 */

this.ST= (function() {
    //Define some private methods first...
    //Lowest Common Ancestor
    var lca;
    //Nodes in path
    var nodesInPath = [];
    //Nodes to contract
    function getNodesToHide(node) {
        node = node || this.clickedNode;
        var Geom = this.geom, GUtil = Graph.Util;
        var graph = this.graph;
        var canvas = this.canvas;
        var level = node._depth, nodeArray = [];
        GUtil.eachNode(graph, function(n) {
            if(n._depth <= level && n.exist && !n.selected) {
                nodeArray.push(n);
            }
        });
        var leafLevel = Geom.getRightLevelToShow(node, canvas);
        GUtil.eachLevel(node, leafLevel, leafLevel, function(n) {
            if(n.exist && !n.selected) nodeArray.push(n);
        });
        return nodeArray;       
     };
    //Nodes to expand
     function getNodesToShow(node) {
        var nodeArray= [], GUtil = Graph.Util;
        node = node || this.clickedNode;
        GUtil.eachLevel(this.clickedNode, 0, this.config.levelsToShow, function(n) {
            if(n.drawn && !GUtil.anySubnode(n, "drawn")) {
                nodeArray.push(n);
            }
        });
        return nodeArray;
     };
     //Lowest Common Ancestor
     function getLCA(node) {
         if (nodesInPath.length == 0) {
            lca = node? node.id : false;
            return;
         }
         //Preprocess
         var GUtil = Graph.Util, graph = this.graph, root = this.root, treeDepth = 0;
         GUtil.eachNode(graph, function(n) { 
            treeDepth = (n._depth > treeDepth)? n._depth : treeDepth; 
         });
         var nr = Math.sqrt(treeDepth), p = {};
         (function dfs(n) {
             if(n._depth < nr) {
                 p[n.id] = root;
             } else {
                 var par = GUtil.getParents(n)[0].id;
                 if(!(n._depth % nr)) {
                     p[n.id] = par;
                 } else {
                     p[n.id] = p[par];
                 }
             }
             GUtil.eachSubnode(n, dfs);
         })(graph.getNode(root));
         
         //Find LCA algorithm
         function findLCA(n, m) {
           while(p[n] != p[m]) {
               var noden = graph.getNode(n), nodem = graph.getNode(m);
               if(n._depth > m._depth) {
                   n = p[n];
               } else {
                   m = p[m];
               }
           }
           
           while(n != m) {
               var noden = graph.getNode(n), nodem = graph.getNode(m);
               if(n._depth > m._depth) {
                   n = GUtil.getParents(noden)[0].id;
               } else {
                   m = GUtil.getParents(nodem)[0].id;
               }
           }
           return n;  
         };
         //Reduce LCA for all nodes
         lca = root;
         for(var i = 0; i < nodesInPath.length; i++) {
             lca = findLCA(lca, nodesInPath[i]);
         }
     };
    
    //Now define the actual class.    
    return new Class({
    
        Implements: Loader,
        
        initialize: function(canvas, controller) {
            var innerController = {
                onBeforeCompute: $empty,
                onAfterCompute:  $empty,
                onCreateLabel:   $empty,
                onPlaceLabel:    $empty,
                onComplete:      $empty,
                onBeforePlotNode:$empty,
                onAfterPlotNode: $empty,
                onBeforePlotLine:$empty,
                onAfterPlotLine: $empty,
                request:         false
            };
            
            var config= {
                orientation: "left",
                labelContainer: canvas.id + '-label',
                levelsToShow: 2,
                subtreeOffset: 8,
                siblingOffset: 5,
                levelDistance: 30,
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
                transition: Trans.Quart.easeInOut
            };
            
            this.controller = this.config = $merge(config, innerController, controller);
            this.canvas = canvas;
            this.graphOptions = {
                'complex': true
            };
            this.graph = new Graph(this.graphOptions);
            this.fx = new ST.Plot(this);
            this.op = new ST.Op(this);
            this.group = new ST.Group(this);
            this.geom = new ST.Geom(this);
            this.clickedNode=  null;
            
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
        onComplete - _optional_ This callback is called once the "switching" animation is complete.

         Example:

         (start code js)
           st.switchPosition("right", {
            onComplete: function() {
              alert('completed!');
            } 
           });
         (end code)
        */  
        switchPosition: function(pos, onComplete) {
          var Geom = this.geom, Plot = this.fx, that = this;
          if(!Plot.busy) {
              Plot.busy = true;
              this.contract({
                  onComplete: function() {
                      Geom.switchOrientation(pos);
                      that.compute('endPos', false);
                      Plot.busy = false;
                      that.onClick(that.clickedNode.id, onComplete);
                  }
              }, pos);
          }
        },

       addNodeInPath: function(id) {
           nodesInPath.push(id);
       },       

       clearNodesInPath: function(id) {
           nodesInPath.length = 0;
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
            this.compute('endPos');
        },
    
        /*
         Method: compute
        
         Computes nodes' positions.

        */  
        compute: function (property, computeLevels) {
            var prop = property || 'startPos';
            var node = this.graph.getNode(this.root);
            $extend(node, {
                'drawn':true,
                'exist':true,
                'selected':true
            });
            if(!!computeLevels || !("_depth" in node))
                Graph.Util.computeLevels(this.graph, this.root, 0, "ignore");
            getLCA.call(this, this.clickedNode);
            this.computePositions(node, $C(0, 0), prop);
        },
        
        computePositions: function (node, initialPos, property, contracted) {
            var GUtil = Graph.Util, geom = this.geom,
            contracted = (arguments.length == 3) || contracted;
    
            if(lca && (node.id == lca) && contracted) 
                  contracted = false;
            
            node[property] = initialPos;
    
            var ch = [];
            GUtil.eachSubnode(node, function(n) {
                ch.push(n);
            });
            
            if (ch.length > 0) {
                var baseHeight   = geom.getBaseSize(node, contracted);
                var prevBaseSize = geom.getBaseSize(ch[0], contracted, 'available');
                var subtreeOffset   = (ch.length == 1)? this.config.subtreeOffset : baseHeight - prevBaseSize;
                var firstPos= ch[0][property]= geom.getFirstPos(node, initialPos, subtreeOffset);
                this.computePositions(ch[0], firstPos, property, contracted);
                for(var i=1; i<ch.length; i++) {
                    var leaf = !GUtil.anySubnode(ch[i], "exist") || !GUtil.anySubnode(ch[i -1], "exist");
                    var nextBaseSize = geom.getBaseSize(ch[i], contracted, 'available');
                    var siblingOffset = leaf? (geom.getSize(ch[i], true) + geom.getSize(ch[i -1], true)) / 2 : (prevBaseSize + nextBaseSize) / 2;
                    firstPos = geom.nextPosition(firstPos, siblingOffset);
                    prevBaseSize = nextBaseSize;
                    this.computePositions(ch[i], firstPos, property, contracted);
                }
            }
        },
    
          requestNodes: function(node, onComplete) {
            var handler = $merge(this.controller, onComplete), 
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
            Group.contract(nodes, $merge(this.controller, onComplete));
          },
      
         move: function(node, offset, onComplete) {
            this.compute('endPos', false);
            this.geom.translate(node.endPos.add(offset).$scale(-1), "endPos");
            this.fx.animate($merge(this.controller, { modes: ['linear'] }, onComplete));
         },
      
      
        expand: function (node, onComplete) {
            var nodeArray = getNodesToShow.call(this, node);
            this.group.expand(nodeArray, $merge(this.controller, onComplete));
        },
    
    
        selectPath: function(node) {
          var GUtil = Graph.Util, that = this;
          GUtil.eachNode(this.graph, function(n) { n.selected = false; }); 
          function path(node) {
              if(node == null || node.selected) return;
              node.selected = true;
              $each(that.group.getSiblings([node])[node.id], 
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
                this.op.sum(subtree, { type: 'replot' });
            } else if (method == 'animate') {
                this.op.sum(subtree, { type: 'fade:seq' });
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
                this.op.removeNode(subids, { type: 'replot' });
            } else if (method == 'animate') {
                this.op.removeNode(subids, { type: 'fade:seq'});
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
            var complete = $merge(this.controller, onComplete);
            var that = this;
    
            complete.onBeforeCompute(node);
            this.selectPath(node);
            this.clickedNode= node;
            this.requestNodes(node, {
                onComplete: function(){
                    group.hide(group.prepare(getNodesToHide.call(that)), complete);
                    geom.setRightLevelToShow(node, canvas);
                    that.compute("pos");
                    Graph.Util.eachNode(that.graph, function(n) { 
                        var pos = n.pos.getc(true);
                        n.startPos.setc(pos.x, pos.y);
                        n.endPos.setc(pos.x, pos.y);
                        n.visited = false; 
                    });
                    that.geom.translate(node.endPos.scale(-1), ["pos", "startPos", "endPos"]);
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

        Example:

        (start code js)
          st.onClick('mynodeid', {
            onComplete: function() {
              alert('yay!');
            }
          });
        (end code)
    
        */    
      onClick: function (id, options) {
        var canvas = this.canvas, that = this, Fx = this.fx, Util = Graph.Util, Geom = this.geom;
        var innerController = {
            onBeforeRequest: $empty,
            onBeforeContract: $empty,
            onBeforeMove: $empty,
            onBeforeExpand: $empty
        };
        var complete = $merge(this.controller, innerController, options);
        
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
                            var offset = {x: 0, y: 0};
                            complete.onBeforeMove(node, offset);
                            that.move(node, offset, {
                                onComplete: function() {
                                    complete.onBeforeExpand(node);
                                    that.expand(node, {
                                        onComplete: function() {
                                            that.busy = false;
                                            complete.onAfterCompute(id);
                                            complete.onComplete();
                                        }
                                    }); //expand
                                }
                            }); //move
                        }
                    });//contract
                }
            });//request
        }
      }
    });

})();

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
ST.Op = new Class({
    Implements: Graph.Op,
    
    initialize: function(viz) {
        this.viz = viz;
    }
});

/*
    
     Performs operations on group of nodes.

*/
ST.Group = new Class({
    
    initialize: function(viz) {
        this.viz = viz;
        this.canvas = viz.canvas;
        this.config = viz.config;
        this.animation = new Animation();
        this.nodes = null;
        this.siblings = null;
        this.bbs = null;
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
        this.animation.setOptions($merge(controller, {
            compute: function(delta) {
              if(delta == 1) delta = .99;
              that.plotStep(1 - delta, controller);
            },
            
            complete: function() {
                that.hide(nodes, controller);
            }       
        })).start();
    },
    
    hide: function(nodes, controller) {
        var GUtil = Graph.Util, viz = this.viz;
        for(var i=0; i<nodes.length; i++) {
            if (!controller || !controller.request) {
                GUtil.eachLevel(nodes[i], 1, false, function(elem){
                    if (elem.exist) {
                        $extend(elem, {
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
                viz.fx.clearLabels();
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
        this.animation.setOptions($merge(controller, {
            compute: function(delta) {
                that.plotStep(delta, controller);
            },
            
            complete: function() {
                that.plotStep(undefined, controller);
                controller.onComplete();
            }       
        })).start();
        
    },
    
    show: function(nodes) {
        var GUtil = Graph.Util, config = this.config;
        this.prepare(nodes);
        $each(nodes, function(n) { 
            GUtil.eachLevel(n, 0, config.levelsToShow, function(n) {
                if(n.exist) n.drawn = true;
            });     
        });
    },
    
    prepare: function(nodes) {
        this.nodes = this.getNodesWithChildren(nodes);
        this.siblings = this.getSiblings(this.nodes);
        this.bbs = this.getBoundingBoxes(this.nodes);
        return this.nodes;
    },
    
    /*
    
       Filters an array of nodes leaving only nodes with children.
    */
    getNodesWithChildren: function(nodes) {
        var ans = [], GUtil = Graph.Util;
        for(var i=0; i<nodes.length; i++) {
            if(GUtil.anySubnode(nodes[i], "exist")) {
                ans.push(nodes[i]);
            }
        }
        return ans;
    },
    
    plotStep: function(delta, controller) {
      var viz = this.viz, 
      canvas = viz.canvas, 
      ctx = canvas.getCtx(),
      bbs = this.bbs, 
      siblings = this.siblings, 
      nodes = this.nodes;
      
      for(var i=0; i<nodes.length; i++) {
        ctx.save();
        var node= nodes[i];
        var bb= bbs[i];
        canvas.clearRectangle(bb.top, bb.right, bb.bottom, bb.left);
        viz.fx.plotSubtree(node, controller, delta);                
        ctx.restore();
        $each(siblings[node.id], function(elem) {
            viz.fx.plotNode(elem, canvas);
        });
      }
    },
    
    getSiblings: function(nodes) {
        var siblings = {}, GUtil = Graph.Util;
        $each(nodes, function(n) {
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
    },
    
    getBoundingBoxes: function(nodes) {
        var bbs = [], geom = this.viz.geom;
        $each(nodes, function(n) {
            bbs.push(geom.getBoundingBox(n));
        });
        return bbs;
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

ST.Geom = new Class({
    
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
        prop = $splat(prop);
        Graph.Util.eachNode(this.viz.graph, function(elem) {
            $each(prop, function(p) { elem[p].$add(pos); });
        });
    },

    /*
       Changes the tree current orientation to the one specified.

       You should usually use <ST.switchPosition> instead.
    */  
    switchOrientation: function() {
        var args = arguments;
        if(args.length > 0) {
          this.config.orientation = args[0];
        } else {
          var s = this.dispatch("bottom", "top", "left", "right");
          this.config.orientation = s;   
        }
    },

    /*
       Makes a value dispatch according to the current layout
       Works like a CSS property, either _top-right-bottom-left_ or _top|bottom - left|right_.
     */
    dispatch: function() {
        var args = arguments, len = args.length, s = this.config.orientation;
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
    },

    /*
       Returns label height or with, depending on the tree current orientation.
    */  
    getSize: function(n, invert) {
        var node = this.node, data = n.data;
        var cond = this.node.overridable, siblingOffset = this.config.siblingOffset;
        var w = (cond && data.$width || node.width) + siblingOffset;
        var h = (cond && data.$height || node.height) + siblingOffset;
        if(!invert)
            return this.dispatch(h, w);
        else
            return this.dispatch(w, h);
    },
    
    /*
       Calculates the max width and height for a tree's level.
    */  
    getMaxSiblingWidthAndHeight: function(node) {
        var dim = this.node, GUtil = Graph.Util, graph = this.viz.graph;
        var level = node._depth;
        if(this.node.overridable) {
            var w = -1, h = -1;
            GUtil.eachNode(graph, function(n) {
                if(n._depth == level) {
                    var dw = n.data.$width || dim.width;
                    var dh = n.data.$height || dim.height;
                    w = (w < dw)? dw : w;
                    h = (h < dh)? dh : h;
                }
            });
            return {
                'width':  w,
                'height': h
            };
        } else {
            return this.node;
        }
    },

    /*
       Method: getBoundingBox
       
       Calculates a tree bounding box for a given node. TODO: refactor

       Parameters:

       node - A <Graph.Node>, the root of the subtree to calculate its bounding box.
    */  
    getBoundingBox: function (node) {
        var dim = this.node, pos = node.pos, siblingOffset = this.config.siblingOffset;
        var GUtil = Graph.Util;
        var calc = function(level, n) {
            if(level === 0 || !Graph.Util.anySubnode(n, "exist")) {
                calc.boundary = calc.boundary || { 'w': -1, 'h': -1 };
                var w = n.data.$width || dim.width;
                var h = n.data.$height || dim.height;
                var b = calc.boundary;
                b.w = (w > b.w)? w : b.w;
                b.h = (h > b.h)? h : b.h;
                calc.leaf = (calc.leaf && calc.leaf._depth > n._depth)? calc.leaf : n;
                return true;                
            }
            return false;
        };
        var baseSize = this.getTreeBaseSize(node, Number.MAX_VALUE, calc);
        var b = calc.boundary;
        var leaf = calc.leaf;
        var root = node;
        var rw = root.data.$width || dim.width;
        var rh = root.data.$height || dim.height;
        
        if(dim.align == "left") {
            return this.dispatch({
                left: root.pos.x - baseSize / 2,
                bottom: leaf.pos.y + b.h,
                top: root.pos.y + rh,
                right: root.pos.x + baseSize / 2
            }, {
                left: leaf.pos.x,
                bottom: root.pos.y + baseSize / 2,
                top: root.pos.y - baseSize / 2,
                right: root.pos.x
            }, {
                left: root.pos.x - baseSize / 2,
                bottom: root.pos.y,
                top: leaf.pos.y - b.h,
                right: root.pos.x + baseSize / 2
            }, {
                left: root.pos.x + rw,
                bottom: root.pos.y + baseSize / 2,
                top: root.pos.y - baseSize / 2,
                right: leaf.pos.x + b.w
            });
        } else if(dim.align == "center") {
            return this.dispatch({
                left: root.pos.x - baseSize / 2,
                bottom: leaf.pos.y + b.h / 2,
                top: root.pos.y + rh / 2,
                right: root.pos.x + baseSize / 2
            }, {
                left: leaf.pos.x - b.w / 2,
                bottom: root.pos.y + baseSize / 2,
                top: root.pos.y - baseSize / 2,
                right: root.pos.x - rw / 2
            }, {
                left: root.pos.x - baseSize / 2,
                bottom: root.pos.y - rh / 2,
                top: leaf.pos.y - b.h / 2,
                right: root.pos.x + baseSize / 2
            }, {
                left: root.pos.x + rw / 2,
                bottom: root.pos.y + baseSize / 2,
                top: root.pos.y - baseSize / 2,
                right: leaf.pos.x + b.w / 2
            });
        } else if(dim.align == "right") {
            return this.dispatch({
                left: root.pos.x - baseSize / 2,
                bottom: leaf.pos.y,
                top: root.pos.y,
                right: root.pos.x + baseSize / 2
            }, {
                left: leaf.pos.x - b.w,
                bottom: root.pos.y + baseSize / 2,
                top: root.pos.y - baseSize / 2,
                right: root.pos.x
            }, {
                left: root.pos.x - baseSize / 2,
                bottom: root.pos.y - rh,
                top: leaf.pos.y - b.h,
                right: root.pos.x + baseSize / 2
            }, {
                left: root.pos.x,
                bottom: root.pos.y + baseSize / 2,
                top: root.pos.y - baseSize / 2,
                right: leaf.pos.x + b.w
            });
        } else throw "align: not implemented";
     },

    /*
       Calculates a subtree base size.
    */  
    getBaseSize: function(node, contracted, type) {
        if(contracted) {
            if(type == 'available') 
             return this.getSize(node, true);
            else
             return this.getTreeBaseSize(node, 1, function(level, node) {
                 return level === 0 && node.exist;
             });
        }
        return this.getTreeBaseSize(node, Number.MAX_VALUE, function(level, n) {
            return level === 0 || !Graph.Util.anySubnode(n, "exist");
        });
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
    getEdge: function(node, type) {
        var $C = function(a, b) { 
          return function(){
            return node.pos.add(new Complex(a, b));
          }; 
        };
        var dim = this.node;
        var cond = this.node.overridable, data = node.data;
        var w = cond && data.$width || dim.width;
        var h = cond && data.$height || dim.height;
        if(type == 'begin') {
            if(dim.align == "center") {
                return this.dispatch($C(0, h/2), $C(-w/2, 0),
                                     $C(0, -h/2),$C(w/2, 0));
            } else if(dim.align == "left") {
                return this.dispatch($C(0, h), $C(0, 0),
                                     $C(0, 0), $C(w, 0));
            } else if(dim.align == "right") {
                return this.dispatch($C(0, 0), $C(-w, 0),
                                     $C(0, -h),$C(0, 0));
            } else throw "align: not implemented";
            
            
        } else if(type == 'end') {
            if(dim.align == "center") {
                return this.dispatch($C(0, -h/2), $C(w/2, 0),
                                     $C(0, h/2),  $C(-w/2, 0));
            } else if(dim.align == "left") {
                return this.dispatch($C(0, 0), $C(w, 0),
                                     $C(0, h), $C(0, 0));
            } else if(dim.align == "right") {
                return this.dispatch($C(0, -h),$C(0, 0),
                                     $C(0, 0), $C(-w, 0));
            } else throw "align: not implemented";
        }
    },

    /*
       Adjusts the tree position due to canvas scaling or translation.
    */  
    getScaledTreePosition: function(node, scale) {
        var dim = this.node;
        var cond = this.node.overridable, data = node.data;
        var w = (cond && data.$width || dim.width);
        var h = (cond && data.$height || dim.height);
        var $C = function(a, b) { 
          return function(){
            return node.pos.add(new Complex(a, b)).$scale(1 - scale);
          }; 
        };
        if(dim.align == "left") {
            return this.dispatch($C(0, h), $C(0, 0),
                                 $C(0, 0), $C(w, 0));
        } else if(dim.align == "center") {
            return this.dispatch($C(0, h / 2), $C(-w / 2, 0),
                                 $C(0, -h / 2),$C(w / 2, 0));
        } else if(dim.align == "right") {
            return this.dispatch($C(0, 0), $C(-w, 0),
                                 $C(0, -h),$C(0, 0));
        } else throw "align: not implemented"
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
        var size = this.dispatch(csize.width, csize.height);
        var baseSize = this.getTreeBaseSize(node, level, function(level, node) { 
          return level === 0 || !Graph.Util.anySubnode(node);
        });
        return (baseSize < size);
    },
    
    /*
       Calculates the _first_ children position given a node position.
    */  
    getFirstPos: function(node, initialPos, baseHeight) {
        var $C = function(a, b) { 
          return function() {
            return new Complex(a, b);
          }; 
        };
        var msize = this.getMaxSiblingWidthAndHeight(node);
        var nSize = {
            'data': {
                '$width': msize.width,
                '$height': msize.height
            }
        };
        var size = this.getSize(nSize) + this.config.levelDistance;
        var factor = -baseHeight / 2 + this.config.subtreeOffset / 2;
        return this.dispatch($C(initialPos.x + factor, initialPos.y + size),
                             $C(initialPos.x - size, initialPos.y + factor),
                             $C(initialPos.x + factor, initialPos.y - size),
                             $C(initialPos.x + size, initialPos.y + factor));
    },
    
    /*
       Calculates a siblings node position given a node position.
    */  
    nextPosition: function(firstPos, siblingOffset) {
        var $C = function(a, b) { 
          return function(){
            return new Complex(a, b);
          }; 
        };
        return this.dispatch($C(firstPos.x + siblingOffset, firstPos.y),
                             $C(firstPos.x, firstPos.y + siblingOffset),
                             $C(firstPos.x + siblingOffset, firstPos.y),
                             $C(firstPos.x, firstPos.y + siblingOffset));
    },
    
    /*
       Hides levels of the tree until it properly fits in canvas.
    */  
    setRightLevelToShow: function(node, canvas) {
        var level = this.getRightLevelToShow(node, canvas), fx = this.viz.fx;
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
        var level = this.config.levelsToShow;
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
    st.fx.placeLabel //or can also call any other <ST.Plot> method
   (end code)


*/
ST.Plot = new Class({
    
    Implements: Graph.Plot,
    
    initialize: function(viz) {
        this.viz = viz;
        this.config = viz.config;
        this.node = this.config.Node;
        this.edge = this.config.Edge;
        this.animation = new Animation;
        this.nodeTypes = new ST.Plot.NodeTypes;
        this.edgeTypes = new ST.Plot.EdgeTypes;        
    },
    
    /*
       Plots a subtree from the spacetree.
    */
    plotSubtree: function(node, opt, scale) {
        var viz = this.viz, canvas = viz.canvas;
        scale = Math.min(Math.max(0.001, scale), 1);
        if(scale >= 0) {
            node.drawn = false;     
            var ctx = canvas.getCtx();
            var diff = viz.geom.getScaledTreePosition(node, scale);
            ctx.translate(diff.x, diff.y);
            ctx.scale(scale, scale);
        }
        this.plotTree(node, !scale, opt);
        if(scale >= 0) node.drawn = true;
    },
    /*
       Plots a Subtree.
    */
    plotTree: function(node, plotLabel, opt) {
        var that = this, 
        viz = this.viz, 
        canvas = viz.canvas,
        ctx = canvas.getCtx();
        Graph.Util.eachSubnode(node, function(elem) {
            if(elem.exist) {
                if(elem.drawn) {
                    var adj = node.getAdjacency(elem.id);
                    opt.onBeforePlotLine(adj);
                    ctx.globalAlpha = Math.min(node.alpha, elem.alpha);
                    that.plotLine(adj, canvas);
                    opt.onAfterPlotLine(adj);
                }
                that.plotTree(elem, plotLabel, opt);
            }
        });

        if(node.drawn && node.exist) {
            ctx.globalAlpha = node.alpha;
            opt.onBeforePlotNode(node);
            this.plotNode(node, canvas);
            opt.onAfterPlotNode(node);
            if(plotLabel && ctx.globalAlpha >= .95) 
                this.plotLabel(canvas, node, opt);
            else 
                this.hideLabel(node, false);
        } else {
            this.hideLabel(node, true);
        }
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
        var pos = node.pos.getc(true), dim = this.node, canvas = this.viz.canvas;
        var w = dim.overridable && node.data.$width || dim.width;
        var h = dim.overridable && node.data.$height || dim.height;
        var radius = canvas.getSize();
        if(dim.align == "center") {
            var labelPos= {
                x: Math.round(pos.x - w / 2 + radius.width/2),
                y: Math.round(pos.y - h / 2 + radius.height/2)
            };
        } else if (dim.align == "left") {
            var orn = this.config.orientation;
            if(orn == "bottom" || orn == "top") {
                var labelPos= {
                    x: Math.round(pos.x - w / 2 + radius.width/2),
                    y: Math.round(pos.y + radius.height/2)
                };
            } else {
                var labelPos= {
                    x: Math.round(pos.x + radius.width/2),
                    y: Math.round(pos.y - h / 2 + radius.height/2)
                };
            }
        } else if(dim.align == "right") {
            var orn = this.config.orientation;
            if(orn == "bottom" || orn == "top") {
                var labelPos= {
                    x: Math.round(pos.x - w / 2 + radius.width/2),
                    y: Math.round(pos.y - h + radius.height/2)
                };
            } else {
                var labelPos= {
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
    },
    
    
    getAlignedPos: function(pos, width, height) {
        var nconfig = this.node;
        if(nconfig.align == "center") {
            var square = {
                x: pos.x - width / 2,
                y: pos.y - height / 2
            };
        } else if (nconfig.align == "left") {
            var orn = this.config.orientation;
            if(orn == "bottom" || orn == "top") {
                var square = {
                    x: pos.x - width / 2,
                    y: pos.y
                };
            } else {
                var square = {
                    x: pos.x,
                    y: pos.y - height / 2
                };
            }
        } else if(nconfig.align == "right") {
            var orn = this.config.orientation;
            if(orn == "bottom" || orn == "top") {
                var square = {
                    x: pos.x - width / 2,
                    y: pos.y - height
                };
            } else {
                var square = {
                    x: pos.x - width,
                    y: pos.y - height / 2
                };
            }
        } else throw "align: not implemented";
        
        return square;
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
ST.Plot.NodeTypes = new Class({
    'none': function() {},
    
    'circle': function(node, canvas) {
        var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
        var cond = nconfig.overridable && data;
        var dim  = cond && data.$dim || nconfig.dim;
        var algnPos = this.getAlignedPos(pos, dim * 2, dim * 2);
        canvas.path('fill', function(context) {
            context.arc(algnPos.x + dim, algnPos.y + dim, dim, 0, Math.PI * 2, true);            
        });
    },

    'square': function(node, canvas) {
        var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
        var cond = nconfig.overridable && data;
        var dim  = cond && data.$dim || nconfig.dim;
        var algnPos = this.getAlignedPos(pos, dim, dim);
        canvas.getCtx().fillRect(algnPos.x, algnPos.y, dim, dim);
    },

    'ellipse': function(node, canvas) {
        var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
        var cond = nconfig.overridable && data;
        var width  = (cond && data.$width || nconfig.width) / 2;
        var height = (cond && data.$height || nconfig.height) / 2;
        var algnPos = this.getAlignedPos(pos, width * 2, height * 2);
        var ctx = canvas.getCtx();
        ctx.save();
        ctx.scale(width / height, height / width);
        canvas.path('fill', function(context) {
            context.arc((algnPos.x + width) * (height / width), (algnPos.y + height) * (width / height), height, 0, Math.PI * 2, true);            
        });
        ctx.restore();
    },

    'rectangle': function(node, canvas) {
        var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
        var cond = nconfig.overridable && data;
        var width  = cond && data.$width || nconfig.width;
        var height = cond && data.$height || nconfig.height;
        var algnPos = this.getAlignedPos(pos, width, height);
        canvas.getCtx().fillRect(algnPos.x, algnPos.y, width, height);
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
ST.Plot.EdgeTypes = new Class({
    'none': function() {},
    
    'line': function(adj, canvas) {
        var begin = this.viz.geom.getEdge(adj.nodeFrom, 'begin');
        var end =  this.viz.geom.getEdge(adj.nodeTo, 'end');
        canvas.path('stroke', function(ctx) {
            ctx.moveTo(begin.x, begin.y);
            ctx.lineTo(end.x, end.y);
        });
    },
    
    'quadratic:begin': function(adj, canvas) {
        var orn = this.config.orientation;
        var data = adj.data, econfig = this.edge;
        var begin = this.viz.geom.getEdge(adj.nodeFrom, 'begin');
        var end =  this.viz.geom.getEdge(adj.nodeTo, 'end');
        var cond = econfig.overridable && data;
        var dim = cond && data.$dim || econfig.dim;
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
        var orn = this.config.orientation;
        var data = adj.data, econfig = this.edge;
        var begin = this.viz.geom.getEdge(adj.nodeFrom, 'begin');
        var end =  this.viz.geom.getEdge(adj.nodeTo, 'end');
        var cond = econfig.overridable && data;
        var dim = cond && data.$dim || econfig.dim;
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
        var data = adj.data, econfig = this.edge, orn = this.config.orientation;
        var begin = this.viz.geom.getEdge(adj.nodeFrom, 'begin');
        var end =  this.viz.geom.getEdge(adj.nodeTo, 'end');
        var cond = econfig.overridable && data;
        var dim = cond && data.$dim || econfig.dim;
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
        var node = adj.nodeFrom, child = adj.nodeTo;
        var data = adj.data, econfig = this.edge;
        //get edge dim
        var cond = econfig.overridable && data;
        var edgeDim = cond && data.$dim || econfig.dim;
        //get edge direction
        if(cond && data.$direction && data.$direction.length > 1) {
            var nodeHash = {};
            nodeHash[node.id] = node;
            nodeHash[child.id] = child;
            var sense = data.$direction;
            node = nodeHash[sense[0]];
            child = nodeHash[sense[1]];
        }
        var posFrom = this.viz.geom.getEdge(node, 'begin');
        var posTo =  this.viz.geom.getEdge(child, 'end');
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
