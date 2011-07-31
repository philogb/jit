$jit.LineChart = new Class({
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
      Edge: {
        overridable:true,
        type:'line',
      },
      Label: {
        textAlign: 'center',
        textBaseline: 'middle'
      }
    };
    var opts = Options("Canvas", "Margin", "Node", "Edge", "Fx", "Tips", "NodeStyles",
        "Events", "Navigation", "Controller", "Label");
    this.controller = this.config = $.merge(opts, opt, config);
    this.graphOptions = {
      'klass': Complex,
      'Node': {
        'selected': false,
        'exist': true,
        'drawn': true
      }
    };


    // this.initializeExtras();
    this.delegate = new $jit.Scatter({
      //id of the visualization container
      injectInto: 'infovis',
      //Native canvas text styling
      Label: {
        type: 'HTML',
        size: 10,
        style: 'bold',
        color: '#ccc'
      },
      // with animation
      animate: true,
      Events: {
        enable: true,
        type: 'Native',
        onMouseEnter: function(node) {
          console.log(node);
        },
        onMouseLeave: function(node) {
          console.log(node);
        },
        onClick: function(node) {
          console.log(node);
        }
      },
      background: {
        type: 'Grid',
        CanvasStyles: {
          fillStyle: 'white',
          font: 'bold 12px Arial'
        },
        legendX: 'legend X',
      },
      Node: {
        overridable:true
      },
      Margin: {
        top: 10,
        left: 0,
        bottom: 0,
        right: 0
      }
    });
    this.canvas = this.delegate.canvas;
  },
  
  refresh: function() {
    this.delegate.refresh();
  },
   /*
     Method: loadJSON

     Loads JSON data into the visualization. 

     Parameters:

     json - The JSON data format. This format is described in <http://blog.thejit.org/2010/04/24/new-javascript-infovis-toolkit-visualizations/#json-data-format>.

     Example:
     (start code js)
     var lineChart = new $jit.LineChart(options);
     lineChart.loadJSON(json);
     (end code)
  */  
   loadJSON: function(json) {
     var ch = [], 
         delegate = this.delegate,
         that = this;
     console.log(delegate);
     console.log(this.canvas);
     console.log('carregou');
     delegate.loadJSON(json);
     delegate.compute();
     delegate.refresh();
  }
});

var LineChart = $jit.LineChart;

/*
  LineChart.Plot
  
  Custom extension of <Graph.Plot>.
  
  Extends:
  
  All <Graph.Plot> methods
  
  See also:
  
  <Graph.Plot>

*/
LineChart.Plot = new Class( {
  
  Implements: Graph.Plot
  
});

/* 
  LineChart.Op 
  
  Custom extension of <Graph.Op>.
  
  Extends:
  
  All <Graph.Op> methods
  
  See also:
  
  <Graph.Op>
  
*/
LineChart.Op = new Class( {
  
  Implements: Graph.Op
  
});


/*
  LineChart.Label
  
  Custom extension of <Graph.Label>. 
  Contains custom <Graph.Label.SVG>, <Graph.Label.HTML> and <Graph.Label.Native> extensions.
  
  Extends:
  
  All <Graph.Label> methods and subclasses.
  
  See also:
  
  <Graph.Label>, <Graph.Label.Native>, <Graph.Label.HTML>, <Graph.Label.SVG>.

*/
LineChart.Label = {};

/*
 LineChart.Label.Native
 
 Custom extension of <Graph.Label.Native>.

 Extends:

 All <Graph.Label.Native> methods

 See also:

 <Graph.Label.Native>

*/
LineChart.Label.Native = new Class( {
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
  LineChart.Label.SVG
  
  Custom extension of <Graph.Label.SVG>.
  
  Extends:
  
  All <Graph.Label.SVG> methods
  
  See also:
  
  <Graph.Label.SVG>

*/
LineChart.Label.SVG = new Class( {
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
 LineChart.Label.HTML
 
 Custom extension of <Graph.Label.HTML>.

 Extends:

 All <Graph.Label.HTML> methods.

 See also:

 <Graph.Label.HTML>

*/
LineChart.Label.HTML = new Class( {
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
  LineChart.Plot.NodeTypes
  
  This class contains a list of <Graph.Node> built-in types.
  
  Node types implemented are 'none', 'rectangle', 'circle', 'square', 'triangle', 'star' and 'ellipse'.
  
  You can add your custom node types, customizing your visualization to the extreme.
  
  Example:
  
  (start code js)
    LineChart.Plot.NodeTypes.implement({
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
LineChart.Plot.NodeTypes = new Class({
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
  LineChart.Plot.EdgeTypes
  
  This class contains a list of <Graph.Adjacence> built-in types. 
  Edge types implemented are 'none', 'line' and 'arrow'.
  
  You can add your custom edge types, customizing your visualization to the extreme.
  
  Example:
  
  (start code js)
    LineChart.Plot.EdgeTypes.implement({
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
LineChart.Plot.EdgeTypes = new Class({
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
  }
});
