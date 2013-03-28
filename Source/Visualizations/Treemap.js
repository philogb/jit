/*
 * File: Treemap.js
 *
*/

$jit.TM = {};

var TM = $jit.TM;

$jit.TM.$extend = true;

/*
  Class: TM.Base
  
  Abstract class providing base functionality for <TM.Squarified>, <TM.Strip> and <TM.SliceAndDice> visualizations.
  
  Implements:
  
  All <Loader> methods
  
  Constructor Options:
  
  Inherits options from
  
  - <Options.Canvas>
  - <Options.Controller>
  - <Options.Node>
  - <Options.Edge>
  - <Options.Label>
  - <Options.Events>
  - <Options.Tips>
  - <Options.NodeStyles>
  - <Options.Navigation>
  
  Additionally, there are other parameters and some default values changed

  orientation - (string) Default's *h*. Whether to set horizontal or vertical layouts. Possible values are 'h' and 'v'.
  titleHeight - (number) Default's *13*. The height of the title rectangle for inner (non-leaf) nodes.
  offset - (number) Default's *2*. Boxes offset.
  constrained - (boolean) Default's *false*. Whether to show the entire tree when loaded or just the number of levels specified by _levelsToShow_.
  levelsToShow - (number) Default's *3*. The number of levels to show for a subtree. This number is relative to the selected node.
  labelsToShow - describe the range of levels to show for labels of sub tree. Default's [0, -1].
  animate - (boolean) Default's *false*. Whether to animate transitions.
  Node.type - Described in <Options.Node>. Default's *rectangle*.
  duration - Described in <Options.Fx>. Default's *700*.
  fps - Described in <Options.Fx>. Default's *45*.
  
  
  Instance Properties:
  
  canvas - Access a <Canvas> instance.
  graph - Access a <Graph> instance.
  op - Access a <TM.Op> instance.
  fx - Access a <TM.Plot> instance.
  labels - Access a <TM.Label> interface implementation.

  Inspired by:
  
  Squarified Treemaps (Mark Bruls, Kees Huizing, and Jarke J. van Wijk) <http://www.win.tue.nl/~vanwijk/stm.pdf>
  
  Tree visualization with tree-maps: 2-d space-filling approach (Ben Shneiderman) <http://hcil.cs.umd.edu/trs/91-03/91-03.html>
  
   Note:
   
   This visualization was built and engineered from scratch, taking only the paper as inspiration, and only shares some features with the visualization described in the paper.

*/
TM.Base = {
  layout: {
    orientation: "h",
    vertical: function(){
      return this.orientation == "v";
    },
    horizontal: function(){
      return this.orientation == "h";
    },
    change: function(){
      this.orientation = this.vertical()? "h" : "v";
    }
  },

  initialize: function(controller){
    var config = {
      orientation: "h",
      titleHeight: 13,
      offset: 2,
      levelsToShow: 0,
      labelsToShow: [0, -1],
      constrained: false,
      animate: false,
      Node: {
        type: 'rectangle',
        overridable: true,
        //we all know why this is not zero,
        //right, Firefox?
        width: 3,
        height: 3,
        color: '#444',
        props: 'node-property:width:height'
      },
      Label: {
        textAlign: 'center',
        textBaseline: 'top'
      },
      Edge: {
        type: 'none'
      },
      duration: 700,
      fps: 45
    };

    this.controller = this.config = $.merge(Options("Canvas", "Node", "Edge",
        "Fx", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"), config, controller);
    this.layout.orientation = this.config.orientation;

    var canvasConfig = this.config;
    if (canvasConfig.useCanvas) {
      this.canvas = canvasConfig.useCanvas;
      this.config.labelContainer = this.canvas.id + '-label';
    } else {
      if(canvasConfig.background) {
        canvasConfig.background = $.merge({
          type: 'Circles'
        }, canvasConfig.background);
      }
      this.canvas = new Canvas(this, canvasConfig);
      this.config.labelContainer = (
        typeof canvasConfig.injectInto == 'string'? 
        canvasConfig.injectInto : 
        canvasConfig.injectInto.id) + '-label';
    }

    this.graphOptions = {
      'klass': Complex,
      'Node': {
        'selected': false,
        'exist': true,
        'drawn': true
      }
    };
    this.graph = new Graph(this.graphOptions, this.config.Node,
        this.config.Edge);
    this.labels = new TM.Label[canvasConfig.Label.type](this);
    this.fx = new TM.Plot(this);
    this.op = new TM.Op(this);
    this.group = new TM.Group(this);
    this.geom = new TM.Geom(this);
    this.clickedNode = null;
    this.busy = false;
    // initialize extras
    this.initializeExtras();
  },

  /* 
    Method: refresh 
    
    Computes positions and plots the tree.
  */
  refresh: function(){
    if(this.busy) return;
    this.busy = true;
    var that = this;
    if(this.config.animate) {
      this.compute('end');
      this.geom.setRightLevelToShow(this.graph.getNode(this.clickedNode
          && this.clickedNode.id || this.root));
      this.fx.animate($.merge(this.config, {
        modes: ['linear', this.config.Node.props],
        onComplete: function() {
          that.busy = false;
        }
      }));
    } else {
      var labelType = this.config.Label.type;
      if(labelType != 'Native') {
        this.graph.eachNode(function(n) { that.labels.hideLabel(n, false); });
      }
      this.busy = false;
      this.compute();
      this.geom.setRightLevelToShow(this.graph.getNode(this.clickedNode 
          && this.clickedNode.id || this.root));
      this.plot();
    }
  },

  /* 
    Method: plot 
    
    Plots the TreeMap. This is a shortcut to *fx.plot*. 
  
   */
  plot: function(){
    this.fx.plot();
  },

  /* 
  Method: leaf 
  
  Returns whether the node is a leaf.
  
   Parameters:
   
   n - (object) A <Graph.Node>.

 */
  leaf: function(n){
    return n.getSubnodes([
        1, 1
    ], "ignore").length == 0;
  },
  
  /* 
  Method: enter 
  
  Sets the node as root.
  
   Parameters:
   
   n - (object) A <Graph.Node>.

 */
  enter: function(n){
    if(this.busy) return;
    this.busy = true;
    var that = this,
        config = this.config,
        graph = this.graph,
        clickedNode = n,
        previousClickedNode = this.clickedNode;

    var callback = {
      onComplete: function() {
        //ensure that nodes are shown for that level
        that.geom.setRightLevelToShow(n);
        
        //compute positions of newly inserted nodes
        if(config.request) that.compute();
        if(config.animate) {
          //fade nodes
          graph.nodeList.setData('alpha', 0, 'end');
          n.eachSubgraph(function(n) {
            n.setData('alpha', 1, 'end');
            n.selected = false;
          }, "ignore");
          clickedNode.selected = true;
          that.fx.animate({
            duration: that.config.duration / 3,
            modes:['node-property:alpha'],
            onComplete: function() {
              //compute end positions
              that.clickedNode = clickedNode;
              that.compute('end');
              //animate positions
              //TODO(nico) commenting this line didn't seem to throw errors...
              that.clickedNode = previousClickedNode;
              that.fx.animate({
                duration: 2 * that.config.duration / 3,
                modes:['linear', that.config.Node.props],
                onComplete: function() { 
                  that.busy = false;
                  //TODO(nico) check comment above
                  that.clickedNode = clickedNode;
                  that.geom.setRightLevelToShow(clickedNode);
                }
              });
            }
          });
        } else {
          that.busy = false;
          that.clickedNode = n;
          that.refresh();
        }
      }
    };
    this.geom.setRightLevelToShow(n);
    if(config.request) {
      this.requestNodes(clickedNode, callback);
    } else {
      callback.onComplete();
    }
  },

  /* 
  Method: out 
  
  Sets the parent node of the current selected node as root.

 */
  out: function(){
    if(this.busy) return;
    this.busy = true;
    this.events.hoveredNode = false;
    var that = this,
        config = this.config,
        graph = this.graph,
        parents = graph.getNode(this.clickedNode 
            && this.clickedNode.id || this.root).getParents(),
        parent = parents[0],
        clickedNode = parent,
        previousClickedNode = this.clickedNode;
    
    //if no parents return
    if(!parent) {
      this.busy = false;
      return;
    }
    parent.selected = true;
    
    //final plot callback
    var callback = {
      onComplete: function() {
        previousClickedNode.selected = false;
        that.clickedNode = parent;
        if(config.request) {
          that.requestNodes(parent, {
            onComplete: function() {
              that.compute();
              that.plot();
              that.busy = false;
            }
          });
        } else {
          that.compute();
          that.plot();
          that.busy = false;
        }
        that.geom.setRightLevelToShow(parent);
        that.plot();
      }
    };
    //prune tree
    this.geom.setRightLevelToShow(parent);
    //animate node positions
    if(config.animate) {
      this.clickedNode = clickedNode;
      this.compute('end');
      //animate the visible subtree only
      this.clickedNode = previousClickedNode;
      this.fx.animate({
        duration: 2 * this.config.duration / 3,
        modes:['linear', this.config.Node.props],
        onComplete: function() {
          //animate the parent subtree
          that.clickedNode = clickedNode;
          //change nodes alpha
          clickedNode.eachSubgraph(function(n) {
            n.setDataset(['current', 'end'], {
              'alpha': [0, 1]
            });
          }, "ignore");
          previousClickedNode.eachSubgraph(function(node) {
            node.setData('alpha', 1);
          }, "ignore");
          that.geom.setRightLevelToShow(parent);
          that.fx.animate({
            duration: that.config.duration / 3,
            modes:['node-property:alpha'],
            onComplete: function() {
              callback.onComplete();
            }
          });
        }
      });
    } else {
      callback.onComplete();
    }
  },

  requestNodes: function(node, onComplete){
    var handler = $.merge(this.controller, onComplete), 
        lev = this.config.levelsToShow;
    if (handler.request) {
      var leaves = [], d = node._depth;
      node.eachLevel(0, lev, function(n){
        var nodeLevel = lev - (n._depth - d);
        if (n.drawn && !n.anySubnode() && nodeLevel > 0) {
          leaves.push(n);
          n._level = nodeLevel;
        }
      });
      this.group.requestNodes(leaves, handler);
    } else {
      handler.onComplete();
    }
  },
  
  reposition: function() {
    this.compute('end');
  }
};


/*
  Class: TM.Op
  
  Custom extension of <Graph.Op>.
  
  Extends:
  
  All <Graph.Op> methods
  
  See also:
  
  <Graph.Op>
  
  */
TM.Op = new Class({
  Implements: Graph.Op,

  initialize: function(viz){
    this.viz = viz;
  }
});

//extend level methods of Graph.Geom
TM.Geom = new Class({
  Implements: Graph.Geom,
  
  getRightLevelToShow: function() {
    return this.viz.config.levelsToShow;
  },
  
  setRightLevelToShow: function(node) {
    var level = this.getRightLevelToShow(),
        labelRange = this.viz.config.labelsToShow,
        fx = this.viz.labels;
    var dump = {};
    node.eachLevel(0, false, function(n) {
      var d = n._depth - node._depth;
      n._hideLabel = labelRange[0] >= 0 && d < labelRange[0] || labelRange[1] >= 0 && d > labelRange[1];
      if(level > 0 && d > level) {
        n.drawn = false; 
        n.exist = false;
        n.ignore = true;
        fx.hideLabel(n, false);
      } else {
        n.drawn = true;
        n.exist = true;
        delete n.ignore;
      }
      dump[n.name] = n._hideLabel;
    });
    node.drawn = true;
    delete node.ignore;
  }
});

/*

Performs operations on group of nodes.

*/
TM.Group = new Class( {

  initialize: function(viz){
    this.viz = viz;
    this.canvas = viz.canvas;
    this.config = viz.config;
  },

  /*
  
    Calls the request method on the controller to request a subtree for each node. 
  */
  requestNodes: function(nodes, controller){
    var counter = 0, len = nodes.length, nodeSelected = {};
    var complete = function(){
      controller.onComplete();
    };
    var viz = this.viz;
    if (len == 0)
      complete();
    for ( var i = 0; i < len; i++) {
      nodeSelected[nodes[i].id] = nodes[i];
      controller.request(nodes[i].id, nodes[i]._level, {
        onComplete: function(nodeId, data){
          if (data && data.children) {
            data.id = nodeId;
            viz.op.sum(data, {
              type: 'nothing'
            });
          }
          if (++counter == len) {
            viz.graph.computeLevels(viz.root, 0);
            complete();
          }
        }
      });
    }
  }
});

/*
  Class: TM.Plot
  
  Custom extension of <Graph.Plot>.
  
  Extends:
  
  All <Graph.Plot> methods
  
  See also:
  
  <Graph.Plot>
  
  */
TM.Plot = new Class({

  Implements: Graph.Plot,

  initialize: function(viz){
    this.viz = viz;
    this.config = viz.config;
    this.node = this.config.Node;
    this.edge = this.config.Edge;
    this.animation = new Animation;
    this.nodeTypes = new TM.Plot.NodeTypes;
    this.edgeTypes = new TM.Plot.EdgeTypes;
    this.labels = viz.labels;
  },

  plot: function(opt, animating){
    var viz = this.viz, 
        graph = viz.graph;
    viz.canvas.clear();
    this.plotTree(graph.getNode(viz.clickedNode && viz.clickedNode.id || viz.root), $.merge(viz.config, opt || {}, {
      'withLabels': true,
      'hideLabels': false,
      'plotSubtree': function(n, ch){
        return n.anySubnode("exist");
      }
    }), animating);
  }
});

/*
  Class: TM.Label
  
  Custom extension of <Graph.Label>. 
  Contains custom <Graph.Label.SVG>, <Graph.Label.HTML> and <Graph.Label.Native> extensions.

  Extends:

  All <Graph.Label> methods and subclasses.

  See also:

  <Graph.Label>, <Graph.Label.Native>, <Graph.Label.HTML>, <Graph.Label.SVG>.
  
*/
TM.Label = {};

/*
 TM.Label.Native

 Custom extension of <Graph.Label.Native>.

 Extends:

 All <Graph.Label.Native> methods

 See also:

 <Graph.Label.Native>
*/
TM.Label.Native = new Class({
  Implements: Graph.Label.Native,

  initialize: function(viz) {
    this.config = viz.config;
    this.leaf = viz.leaf;
  },
  
  renderLabel: function(canvas, node, controller){
    if(node._hideLabel || !this.leaf(node) && !this.config.titleHeight) return;
    var pos = node.pos.getc(true), 
        ctx = canvas.getCtx(),
        width = node.getData('width'),
        height = node.getData('height'),
        x = pos.x + width / 2,
        y = pos.y;
      if (isNaN(width) || width === 0) {
        ctx.fillText(node.name, x, y);
      } else {
        ctx.fillText(node.name, x, y, width);  
      }
  }
});

/*
 TM.Label.SVG

  Custom extension of <Graph.Label.SVG>.

  Extends:

  All <Graph.Label.SVG> methods

  See also:

  <Graph.Label.SVG>
*/
TM.Label.SVG = new Class( {
  Implements: Graph.Label.SVG,

  initialize: function(viz){
    this.viz = viz;
    this.leaf = viz.leaf;
    this.config = viz.config;
  },

  /* 
  placeLabel

  Overrides abstract method placeLabel in <Graph.Plot>.

  Parameters:

  tag - A DOM label element.
  node - A <Graph.Node>.
  controller - A configuration/controller object passed to the visualization.
  
  */
  placeLabel: function(tag, node, controller){
  	controller = controller || this.viz.controller;
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

    if(node._hideLabel || !this.leaf(node) && !this.config.titleHeight) {
      tag.style.display = 'none';
    }
    controller.onPlaceLabel(tag, node);
  }
});

/*
 TM.Label.HTML

 Custom extension of <Graph.Label.HTML>.

 Extends:

 All <Graph.Label.HTML> methods.

 See also:

 <Graph.Label.HTML>

*/
TM.Label.HTML = new Class( {
  Implements: Graph.Label.HTML,

  initialize: function(viz){
    this.viz = viz;
    this.leaf = viz.leaf;
    this.config = viz.config;
  },

  /* 
    placeLabel
  
    Overrides abstract method placeLabel in <Graph.Plot>.
  
    Parameters:
  
    tag - A DOM label element.
    node - A <Graph.Node>.
    controller - A configuration/controller object passed to the visualization.
  
  */
  placeLabel: function(tag, node, controller){
    controller = controller || this.viz.controller;
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
    style.width = Math.max(0, node.getData('width') * sx) + 'px';
    style.height = Math.max(0, node.getData('height') * sy) + 'px';
    style.zIndex = node._depth * 100;
    style.display = '';

    if(node._hideLabel || !this.leaf(node) && !this.config.titleHeight) {
      tag.style.display = 'none';
    }
    controller.onPlaceLabel(tag, node);
  }
});

/*
  Class: TM.Plot.NodeTypes

  This class contains a list of <Graph.Node> built-in types. 
  Node types implemented are 'none', 'rectangle'.

  You can add your custom node types, customizing your visualization to the extreme.

  Example:

  (start code js)
    TM.Plot.NodeTypes.implement({
      'mySpecialType': {
        'render': function(node, canvas) {
          //print your custom node to canvas
        },
        //optional
        'contains': function(node, pos) {
          //return true if pos is inside the node or false otherwise
        }
      }
    });
  (end code)

*/
TM.Plot.NodeTypes = new Class( {
  'none': {
    'render': $.empty
  },

  'rectangle': {
    'render': function(node, canvas, animating){
      var leaf = this.viz.leaf(node),
          config = this.config,
          offst = config.offset,
          titleHeight = config.titleHeight,
          pos = node.pos.getc(true),
          width = node.getData('width'),
          height = node.getData('height'),
          border = node.getData('border'),
          ctx = canvas.getCtx(),
          posx = pos.x + offst / 2, 
          posy = pos.y + offst / 2;
      if(width <= offst || height <= offst) return;
      if (leaf) {
        if(config.cushion) {
          var lg = ctx.createRadialGradient(posx + (width-offst)/2, posy + (height-offst)/2, 1, 
              posx + (width-offst)/2, posy + (height-offst)/2, width < height? height : width);
          var color = node.getData('color');
          var colorGrad = $.rgbToHex($.map($.hexToRgb(color), 
              function(r) { return r * 0.2 >> 0; }));
          lg.addColorStop(0, color);
          lg.addColorStop(1, colorGrad);
          ctx.fillStyle = lg;
        }
        ctx.fillRect(posx, posy, width - offst, height - offst);
        if(border) {
          ctx.save();
          ctx.strokeStyle = border;
          ctx.strokeRect(posx, posy, width - offst, height - offst);
          ctx.restore();
        }
      } else if(titleHeight > 0){
        ctx.fillRect(pos.x + offst / 2, pos.y + offst / 2, width - offst,
            titleHeight - offst);
        if(border) {
          ctx.save();
          ctx.strokeStyle = border;
          ctx.strokeRect(pos.x + offst / 2, pos.y + offst / 2, width - offst,
              height - offst);
          ctx.restore();
        }
      }
    },
    'contains': function(node, pos) {
      if(this.viz.clickedNode && !node.isDescendantOf(this.viz.clickedNode.id) || node.ignore) return false;
      var npos = node.pos.getc(true),
          width = node.getData('width'), 
          leaf = this.viz.leaf(node),
          height = leaf? node.getData('height') : this.config.titleHeight;
      return this.nodeHelper.rectangle.contains({x: npos.x + width/2, y: npos.y + height/2}, pos, width, height);
    }
  }
});

TM.Plot.EdgeTypes = new Class( {
  'none': $.empty
});

/*
  Class: TM.SliceAndDice
  
  A slice and dice TreeMap visualization.
  
  Implements:
  
  All <TM.Base> methods and properties.
*/
TM.SliceAndDice = new Class( {
  Implements: [
      Loader, Extras, TM.Base, Layouts.TM.SliceAndDice
  ]
});

/*
  Class: TM.Squarified
  
  A squarified TreeMap visualization.

  Implements:
  
  All <TM.Base> methods and properties.
*/
TM.Squarified = new Class( {
  Implements: [
      Loader, Extras, TM.Base, Layouts.TM.Squarified
  ]
});

/*
  Class: TM.Strip
  
  A strip TreeMap visualization.

  Implements:
  
  All <TM.Base> methods and properties.
*/
TM.Strip = new Class( {
  Implements: [
      Loader, Extras, TM.Base, Layouts.TM.Strip
  ]
});
