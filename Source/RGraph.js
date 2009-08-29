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

     <Loader>, <AngularWidth>

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
     - _dim_ An extra parameter used by other complex shapes such as square and circle to determine the shape's diameter. Default's 3.

     *Edge*

     Customize the visualization edges' shape, color, and other style properties.

     - _Edge_

     This object has as properties

     - _overridable_ Determine whether or not edges properties can be overriden by a particular edge object. Default's false.

     If given a JSON _complex_ graph (defined in <Loader.loadJSON>), an adjacency _data_ property contains properties which are the same as defined here but prefixed with 
     a dollar sign (i.e $), the adjacency properties will override the global edge properties.

     - _type_ Edge type (shape). Possible options are "none", "line" and "arrow". Default's "line".
     - _color_ Edge color. Default's '#ccb'.
     - _lineWidth_ Line width. If edges aren't drawn with strokes then this property won't be of any use. Default's 1.

     *Animations*

     - _duration_ Duration of the animation in milliseconds. Default's 2500.
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

  Instance Properties:

   - _graph_ Access a <Graph> instance.
   - _op_ Access a <RGraph.Op> instance.
   - _fx_ Access a <RGraph.Plot> instance.
   - _labels_ Access a <RGraph.Label> interface implementation.

*/

this.RGraph = new Class({
  
    Implements: [Loader, AngularWidth],
    
  initialize: function(canvas, controller) {
    var config= {
      labelContainer: canvas.id + '-label',
      interpolation: 'linear',
      levelDistance: 100,
      withLabels: true,
                
      Node: {
        overridable: false,
        type: 'circle',
        dim: 3,
        color: '#ccb',
        width: 5,
        height: 5,   
        lineWidth: 1
      },
        
      Edge: {
        overridable: false,
        type: 'line',
        color: '#ccb',
        lineWidth: 1
      },

      fps:40,
      duration: 2500,
      transition: Trans.Quart.easeInOut,
      clearCanvas: true
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
    this.labels = new RGraph.Label[canvas.getConfig().labels](this);
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

     <RGraph.compute>
     
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
     
     Computes nodes' positions. 

     Parameters:

     property - _optional_ A <Graph.Node> position property to store the new positions. Possible values are 'pos', 'endPos' or 'startPos'.

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
     computePositions
    
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
     getNodeAndParentAngle
    
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
     tagChildren
    
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
    onClick: function(id, opt) {
        if(this.root != id && !this.busy) {
            this.busy = true;
            this.root = id; 
            that = this;
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
                modes: [mode]
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
RGraph.Op = new Class({

    Implements: Graph.Op,

    initialize: function(viz) {
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
RGraph.Label.Native = new Class({
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
RGraph.Label.SVG = new Class({
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
        var radius= canvas.getSize();
        var labelPos= {
            x: Math.round(pos.x + radius.width/2),
            y: Math.round(pos.y + radius.height/2)
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
RGraph.Label.HTML = new Class({
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
