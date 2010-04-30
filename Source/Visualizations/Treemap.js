$jit.TM = {};

var TM = $jit.TM;

$jit.TM.$extend = true;

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
      levelsToShow: 3,
      constrained: false,
      addLeftClickHandler: false,
      addRightClickHandler: false,
      selectPathOnHover: false,
      Node: {
        type: 'rectangle',
        overridable: true
      },
      Edge: {
        type: 'none'
      },
      duration: 700,
      fps: 25
    };

    this.controller = this.config = $.merge(Options("Canvas", "Node", "Edge",
        "Fx", "Controller", "Tips", "NodeStyles", "Label"), config, controller);
    this.layout.orientation = this.config.orientation;

    var canvasConfig = this.config;
    if (canvasConfig.useCanvas) {
      this.canvas = canvasConfig.useCanvas;
      this.config.labelContainer = this.canvas.id + '-label';
    } else {
      this.canvas = new Canvas(canvasConfig);
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
    this.labels = new TM.Label[canvasConfig.Label.type](this);
    this.fx = new TM.Plot(this);
    this.op = new TM.Op(this);
    this.group = new TM.Group(this);
    this.clickedNode = null;
    // initialize extras
    this.initializeExtras();
  },

  refresh: function(){
    this.compute();
    this.plot();
  },

  plot: function(){
    this.fx.plot(this.config);
  },

  leaf: function(n){
    return Graph.Util.getSubnodes(n, [
        1, 1
    ], "ignore").length == 0;
  },

  enter: function(n){
    this.view(n.id);
  },

  onLeftClick: function(n){
    this.enter(n);
  },

  out: function(){
    var GUtil = Graph.Util, parents = GUtil.getParents(this.graph
        .getNode(this.root));
    if (parents.length > 0) {
      var parent = parents[0];
      if (this.controller.request)
        this.op.prune(parent, this.config.levelsToShow);
      this.view(parent.id);
    }
  },

  onRightClick: function(){
    this.out();
  },

  view: function(id){
    var config = this.config, that = this;
    var rootNode = this.graph.getNode(this.root);
    var clickedNode = this.graph.getNode(id);
    var post = {
      onComplete: function(){
        that.root = rootNode;
        that.clickedNode = clickedNode;
        that.plot();
      }
    };

    if (this.controller.request) {
      this.requestNodes(clickedNode, post);
    } else {
      post.onComplete();
    }
  },

  requestNodes: function(node, onComplete){
    var handler = $.merge(this.controller, onComplete), lev = this.config.levelsToShow, GUtil = Graph.Util;
    if (handler.request) {
      var leaves = [], d = node._depth;
      GUtil.eachLevel(node, 0, lev, function(n){
        if (n.drawn && !GUtil.anySubnode(n)) {
          leaves.push(n);
          n._level = lev - (n._depth - d);
        }
      });
      this.group.requestNodes(leaves, handler);
    } else {
      handler.onComplete();
    }
  },

  selectPath: function(node){
    var GUtil = Graph.Util, that = this;
    GUtil.eachNode(this.graph, function(n){
      n.selected = false;
    });
    function path(node){
      if (node == null || node.selected)
        return;
      node.selected = true;
      $.each(that.group.getSiblings( [
        node
      ])[node.id], function(n){
        n.exist = true;
        n.drawn = true;
      });
      var parents = GUtil.getParents(node);
      parents = (parents.length > 0)? parents[0] : null;
      path(parents);
    }
    path(node);
  }
};

TM.Op = new Class( {
  Implements: Graph.Op,

  initialize: function(viz){
    this.viz = viz;
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
            Graph.Util.computeLevels(viz.graph, viz.root, 0);
            complete();
          }
        }
      });
    }
  }
});

TM.Plot = new Class( {

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
    var viz = this.viz, graph = viz.graph;
    this.plotTree(graph.getNode(viz.root), $.merge(opt, {
      'withLabels': true,
      'hideLabels': !!animating,
      'plotSubtree': function(n, ch){
        return true;
      }
    }), animating);
  }
});

/*
Object: TM.Label

Label interface implementation for the ST

See Also:

<Graph.Label>, <ST.Label.HTML>, <RGraph.Label.SVG>

*/
TM.Label = {};

/*
 Class: ST.Label.Native

 Implements labels natively, using the Canvas text API.

 Extends:

 <Graph.Label.Native>

 See also:

 <ST.Label>, <Hypertree.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
TM.Label.Native = new Class( {
  Implements: Graph.Label.Native,

  renderLabel: function(canvas, node, controller){
    var ctx = canvas.getCtx();
    var coord = node.pos.getc(true);
    ctx.fillText(node.name, coord.x, coord.y);
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
TM.Label.SVG = new Class( {
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
 Class: ST.Label.HTML

 Implements labels using plain old HTML.

 Extends:

 <ST.Label.DOM>, <Graph.Label.HTML>

 See also:

 <ST.Label>, <Hypertree.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
TM.Label.HTML = new Class( {
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
    style.display = '';

    controller.onPlaceLabel(tag, node);
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
TM.Plot.NodeTypes = new Class( {
  'none': {
    'render': $.empty
  },

  'rectangle': {
    'render': function(node, canvas){
      var leaf = this.viz.leaf(node);
      var config = this.viz.config;
      var offst = config.offset;
      var titleHeight = config.titleHeight;
      var pos = node.pos.getc(true);
      var width = node.getData('width');
      var height = node.getData('height');
      var ctx = canvas.getCtx();
      var posx = pos.x + offst / 2, posy = pos.y + offst / 2;
      if (leaf) {
        var lg = ctx.createLinearGradient(posx, posy, posx + width - offst,
            posy + height - offst);
        lg.addColorStop(0, '#555');
        lg.addColorStop(1, '#ccc');
        ctx.fillStyle = lg;
        ctx.fillRect(posx, posy, width - offst, height - offst);
      } else {
        var lg = ctx.createLinearGradient(posx, posy, posx + width - offst,
            posy + titleHeight);
        lg.addColorStop(0, '#111');
        lg.addColorStop(1, '#444');
        ctx.fillStyle = lg;
        ctx.fillRect(pos.x + offst / 2, pos.y + offst / 2, width - offst,
            titleHeight);
      }
    },
    'contains': $.lambda(false)
  }
});

TM.Plot.EdgeTypes = new Class( {
  'none': $.empty
});

TM.SliceAndDice = new Class( {
  Implements: [
      Loader, Extras, TM.Base, Layouts.TM.SliceAndDice
  ]
});

TM.Squarified = new Class( {
  Implements: [
      Loader, Extras, TM.Base, Layouts.TM.Squarified
  ]
});

TM.Strip = new Class( {
  Implements: [
      Loader, Extras, TM.Base, Layouts.TM.Strip
  ]
});
