$jit.Scatter = new Class({
  Implements: [Layouts.Scatter, Loader, Extras],
  
  initialize: function(config) {
    var opt = {
      legendX: '',
      legendY: '',
      animate: false,
      nodeOffsetWidth: 0,
      nodeOffsetHeight: 0,
      showNodeNames: false,
      
      colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
      Node: {
        overridable: true,
        color: 'rgba(0, 0, 0, 0)',
        type: 'square'
      },
      Label: {
        textAlign: 'center',
        textBaseline: 'middle'
      }
    };
    var opts = Options("Canvas", "Margin", "Node", "Edge", "Fx", "Tips", "NodeStyles",
        "Events", "Navigation", "Controller", "Label");
    this.controller = this.config = $.merge(opts, opt, config);
    
    var canvasConfig = this.config;
    if (canvasConfig.useCanvas) {
      this.canvas = canvasConfig.useCanvas;
      this.config.labelContainer = this.canvas.id + '-label';
    } else {
      this.canvas = new Canvas(this, canvasConfig);
      this.config.labelContainer = (typeof canvasConfig.injectInto == 'string'? canvasConfig.injectInto : canvasConfig.injectInto.id) + '-label';
    }
    
    this.graphOptions = {
      'klass': Complex,
      'Node': {
        'selected': false,
        'exist': true,
        'drawn': true
      }
    };

    this.graph = new Graph(
      this.graphOptions, this.config.Node, this.config.Edge, this.config.Label);

    this.labels = new $jit.Scatter.Label[this.config.Label.type](this);
    this.fx = new $jit.Scatter.Plot(this, $jit.Scatter);
    this.op = new $jit.Scatter.Op(this);
    this.initializeExtras();
  },
  
  refresh: function() {
    this.compute();
    this.plot();
  },
  
  plot: function() {
    this.fx.plot();
  },
  
  reposition: function() {
    this.compute('end');
  },
  
  /*
    Method: updateJSON
   
    Use this method when updating values for the current JSON data. If the items specified by the JSON data already exist in the graph then their values will be updated.
    
    Parameters:
    
    json - (object) JSON data to be updated.
    onComplete - (object) A callback object to be called when the animation transition when updating the data end.
    
    Example:
    
    (start code js)
    scatter.updateJSON(json, {
      onComplete: function() {
        alert('update complete!');
      }
    });
    (end code)
  */  
  updateJSON: function(json, onComplete) {
    if(this.busy) return;
    this.busy = true;
    
    var graph = this.graph,
        animate = this.config.animate,
        that = this;
    $.each(json, function(v) {
      var n = graph.getByName(v.name),
              end_properties = ['dim', 'width', 'height'];
      if(n) {
        for (var prop in v.data) {
          var name = prop.slice(1);
          if (end_properties.indexOf(name) >= 0) {
            /*
              TODO FIX WIDTH AND HEIGHT
            */
            n.setData(name, v.data[prop], 'end');
          }
          else n.setData(name, v.data[prop]);
        }
      }
    });
    
    if(animate) {
      this.compute('end');
      this.fx.animate({
        modes: {
          'node-property': ['width', 'height', 'dim'],
          'position':'linear',
        },
        duration:1500,
        onComplete: function() {
          that.busy = false;
          onComplete && onComplete.onComplete();
        }
      });
    } else {
      this.refresh();
    }
  },
  
});

var Scatter = $jit.Scatter;

/*
  Scatter.Plot
  
  Custom extension of <Graph.Plot>.
  
  Extends:
  
  All <Graph.Plot> methods
  
  See also:
  
  <Graph.Plot>

*/
Scatter.Plot = new Class( {
  
  Implements: Graph.Plot
  
});

/* 
  Scatter.Op 
  
  Custom extension of <Graph.Op>.
  
  Extends:
  
  All <Graph.Op> methods
  
  See also:
  
  <Graph.Op>
  
*/
Scatter.Op = new Class( {
  
  Implements: Graph.Op
  
});


/*
  Scatter.Label
  
  Custom extension of <Graph.Label>. 
  Contains custom <Graph.Label.SVG>, <Graph.Label.HTML> and <Graph.Label.Native> extensions.
  
  Extends:
  
  All <Graph.Label> methods and subclasses.
  
  See also:
  
  <Graph.Label>, <Graph.Label.Native>, <Graph.Label.HTML>, <Graph.Label.SVG>.

*/
Scatter.Label = {};

/*
 Scatter.Label.Native
 
 Custom extension of <Graph.Label.Native>.

 Extends:

 All <Graph.Label.Native> methods

 See also:

 <Graph.Label.Native>

*/
Scatter.Label.Native = new Class( {
  Implements: Graph.Label.Native,

  renderLabel: function(canvas, node, controller) {
    if(!controller.showNodeNames) return;
    var ctx = canvas.getCtx(),
        width = node.getData('width'),
        height = node.getData('height');
    var coord = node.pos.getc(true);
    ctx.fillText(node.name, coord.x + width/2, coord.y + height/2);
  }
});

/*
  Scatter.Label.SVG
  
  Custom extension of <Graph.Label.SVG>.
  
  Extends:
  
  All <Graph.Label.SVG> methods
  
  See also:
  
  <Graph.Label.SVG>

*/
Scatter.Label.SVG = new Class( {
  Implements: Graph.Label.SVG,
  
  initialize: function(viz) {
    this.viz = viz;
  },
  
  /* 
     placeLabel
  
     Overrides abstract method placeLabel in <Graph.Label>.
  
     Parameters:
  
     tag - A DOM label element.
     node - A <Graph.Node>.
     controller - A configuration/controller object passed to the visualization.
    
   */
  placeLabel: function(tag, node, controller) {
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
  
    controller.onPlaceLabel(tag, node);
  }
});

/*
 Scatter.Label.HTML
 
 Custom extension of <Graph.Label.HTML>.

 Extends:

 All <Graph.Label.HTML> methods.

 See also:

 <Graph.Label.HTML>

*/
Scatter.Label.HTML = new Class( {
  Implements: Graph.Label.HTML,
  
  initialize: function(viz) {
    this.viz = viz;
  },
  /* 
     placeLabel
  
     Overrides abstract method placeLabel in <Graph.Plot>.
  
     Parameters:
  
     tag - A DOM label element.
     node - A <Graph.Node>.
     controller - A configuration/controller object passed to the visualization.
    
   */
  placeLabel: function(tag, node, controller) {
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
    style.width = ((node.getData('width') * sx) >> 0) + 'px';
    style.height = ((node.getData('height') * sy) >> 0) + 'px';
  
    controller.onPlaceLabel(tag, node);
  }
});

/*
  Scatter.Plot.NodeTypes
  
  This class contains a list of <Graph.Node> built-in types.
  
  Node types implemented are 'none', 'rectangle', 'circle', 'square', 'triangle', 'star' and 'ellipse'.
  
  You can add your custom node types, customizing your visualization to the extreme.
  
  Example:
  
  (start code js)
    Scatter.Plot.NodeTypes.implement({
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
Scatter.Plot.NodeTypes = new Class({
  'none': {
    'render': $.empty,
    'contains': $.lambda(false)
  },
  'rectangle': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true),
          config = this.viz.config,
          width = node.getData('width'), 
          height = node.getData('height');
      this.nodeHelper.rectangle.render('fill', 
          {x:pos.x+width/2, y:pos.y+height/2}, 
          width - config.nodeOffsetWidth, 
          height - config.nodeOffsetHeight, canvas);
    },
    'contains': function(node, pos){
      var npos = node.pos.getc(true), 
          width = node.getData('width'), 
          height = node.getData('height');
      return this.nodeHelper.rectangle.contains({x: npos.x + width/2, y: npos.y + height/2}, pos, width, height);
    }
  },
  'square': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true),
          config = this.viz.config,
          dim = node.getData('dim') || 5;
      this.nodeHelper.square.render('fill',
          {x:pos.x-dim, y:pos.y-dim}, dim, canvas);
    },
    'contains': function(node, pos){
      var npos = node.pos.getc(true),
          dim = node.getData('dim') || 5;
      return this.nodeHelper.square.contains({x: npos.x - dim , y: npos.y - dim}, pos, dim, dim);
    }
  },
  'circle': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true),
          config = this.viz.config,
          dim = node.getData('dim') || 5;
      this.nodeHelper.circle.render('fill',
          {x:pos.x-dim, y:pos.y-dim}, dim, canvas);
    },
    'contains': function(node, pos){
      var npos = node.pos.getc(true),
          dim = node.getData('dim') || 5;
      return this.nodeHelper.circle.contains({x: npos.x - dim , y: npos.y - dim}, pos, dim, dim);
    }
  },
  'ellipse': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true),
          width = node.getData('width'),
          height = node.getData('height');
      this.nodeHelper.ellipse.render('fill', pos, width, height, canvas);
      },
    'contains': function(node, pos){
      var npos = node.pos.getc(true),
          width = node.getData('width'),
          height = node.getData('height');
      return this.nodeHelper.ellipse.contains(npos, pos, width, height);
    }
  },
  'triangle': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true),
          dim = node.getData('dim');
      this.nodeHelper.triangle.render('fill', pos, dim, canvas);
    },
    'contains': function(node, pos) {
      var npos = node.pos.getc(true),
          dim = node.getData('dim');
      return this.nodeHelper.triangle.contains(npos, pos, dim);
    }
  },
  'star': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true),
          dim = node.getData('dim');
      this.nodeHelper.star.render('fill', pos, dim, canvas);
    },
    'contains': function(node, pos) {
      var npos = node.pos.getc(true),
          dim = node.getData('dim');
      return this.nodeHelper.star.contains(npos, pos, dim);
    }
  }
});

/*
  Scatter.Plot.EdgeTypes
  
  This class contains a list of <Graph.Adjacence> built-in types. 
  Edge types implemented are 'none', 'line' and 'arrow'.
  
  You can add your custom edge types, customizing your visualization to the extreme.
  
  Example:
  
  (start code js)
    Scatter.Plot.EdgeTypes.implement({
      'mySpecialType': {
        'render': function(adj, canvas) {
          //print your custom edge to canvas
        },
        //optional
        'contains': function(adj, pos) {
          //return true if pos is inside the arc or false otherwise
        }
      }
    });
  (end code)

*/
Scatter.Plot.EdgeTypes = new Class({
  'none': $.empty,
  'line': {
    'render': function(adj, canvas) {
      var from = adj.nodeFrom,
          fromDim = from.getData('dim'),
          to = adj.nodeTo,
          toDim = to.getData('dim'),
          fromPos = from.pos.getc(true),
          toPos = to.pos.getc(true);
      from = {
        x: fromPos.x - fromDim,
        y: fromPos.y - fromDim
      };
      to = {
        x: toPos.x - toDim,
        y: toPos.y - toDim
      };
      this.edgeHelper.line.render(from, to, canvas);
    },
    'contains': function(adj, pos) {
      var from = adj.nodeFrom.pos.getc(true),
          to = adj.nodeTo.pos.getc(true);
      return this.edgeHelper.line.contains(from, to, pos, this.edge.epsilon);
    }
  },
  'arrow': {
    'render': function(adj, canvas) {
    var from = adj.nodeFrom,
        to = adj.nodeTo,
        fromWidth = from.getData('width'),
        fromHeight = from.getData('height'),
        toWidth = to.getData('width'),
        toHeight = to.getData('height'),
        fromPos = from.pos.getc(true),
        toPos = to.pos.getc(true),
        dim = adj.getData('dim'),
        direction = adj.data.$direction,
        inv = (direction && direction.length>1 && direction[0] != from.id);
      from = {
        x: fromPos.x + fromWidth/2,
        y: fromPos.y + fromHeight/2
      };
      to = {
        x: toPos.x + toWidth/2,
        y: toPos.y + toHeight/2
      };
      this.edgeHelper.arrow.render(from, to, dim, inv, canvas);
    },
    'contains': function(adj, pos) {
      var from = adj.nodeFrom.pos.getc(true),
          to = adj.nodeTo.pos.getc(true);
      return this.edgeHelper.arrow.contains(from, to, pos, this.edge.epsilon);
    }
  }
});
