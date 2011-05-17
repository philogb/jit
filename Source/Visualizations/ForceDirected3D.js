$jit.ForceDirected3D = new Class( {

  Implements: [ Loader, Extras, Layouts.ForceDirected3D ],

  initialize: function(controller) {
    var $ForceDirected3D = $jit.ForceDirected3D;

    var config = {
      iterations: 50,
      levelDistance: 50
    };

    this.controller = this.config = $.merge(Options("Canvas", "Node", "Edge",
        "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label"), config, controller);

    var canvasConfig = this.config;
    if(canvasConfig.useCanvas) {
      this.canvas = canvasConfig.useCanvas;
      this.config.labelContainer = this.canvas.id + '-label';
    } else {
      if(canvasConfig.background) {
        canvasConfig.background = $.merge({
          type: 'Circles'
        }, canvasConfig.background);
      }
      this.canvas = new Canvas(this, canvasConfig);
      this.config.labelContainer = (typeof canvasConfig.injectInto == 'string'? canvasConfig.injectInto : canvasConfig.injectInto.id) + '-label';
    }

    this.graphOptions = {
      'klass': Vector3,
      'Node': {
        'selected': false,
        'exist': true,
        'drawn': true
      }
    };
    this.graph = new Graph(this.graphOptions, this.config.Node,
        this.config.Edge);
    this.labels = new $ForceDirected3D.Label[canvasConfig.Label.type](this);
    this.fx = new $ForceDirected3D.Plot(this, $ForceDirected3D);
    this.op = new $ForceDirected3D.Op(this);
    this.json = null;
    this.busy = false;
    // initialize extras
    this.initializeExtras();
  },

  /* 
    refresh 
    
    Computes positions and plots the tree.
  */
  refresh: function() {
    this.compute();
    this.plot();
  },

  reposition: function() {
    this.compute('end');
  },

/*
  computeIncremental
  
  Performs the Force Directed algorithm incrementally.
  
  Description:
  
  ForceDirected3D algorithms can perform many computations and lead to JavaScript taking too much time to complete. 
  This method splits the algorithm into smaller parts allowing the user to track the evolution of the algorithm and 
  avoiding browser messages such as "This script is taking too long to complete".
  
  Parameters:
  
  opt - (object) The object properties are described below
  
  iter - (number) Default's *20*. Split the algorithm into pieces of _iter_ iterations. For example, if the _iterations_ configuration property 
  of your <ForceDirected3D> class is 100, then you could set _iter_ to 20 to split the main algorithm into 5 smaller pieces.
  
  property - (string) Default's *end*. Whether to update starting, current or ending node positions. Possible values are 'end', 'start', 'current'. 
  You can also set an array of these properties. If you'd like to keep the current node positions but to perform these 
  computations for final animation positions then you can just choose 'end'.
  
  onStep - (function) A callback function called when each "small part" of the algorithm completed. This function gets as first formal 
  parameter a percentage value.
  
  onComplete - A callback function called when the algorithm completed.
  
  Example:
  
  In this example I calculate the end positions and then animate the graph to those positions
  
  (start code js)
  var fd = new $jit.ForceDirected3D(...);
  fd.computeIncremental({
    iter: 20,
    property: 'end',
    onStep: function(perc) {
      Log.write("loading " + perc + "%");
    },
    onComplete: function() {
      Log.write("done");
      fd.animate();
    }
  });
  (end code)
  
  In this example I calculate all positions and (re)plot the graph
  
  (start code js)
  var fd = new ForceDirected3D(...);
  fd.computeIncremental({
    iter: 20,
    property: ['end', 'start', 'current'],
    onStep: function(perc) {
      Log.write("loading " + perc + "%");
    },
    onComplete: function() {
      Log.write("done");
      fd.plot();
    }
  });
  (end code)
  
  */
  computeIncremental: function(opt) {
    opt = $.merge( {
      iter: 20,
      property: 'end',
      onStep: $.empty,
      onComplete: $.empty
    }, opt || {});

    this.config.onBeforeCompute(this.graph.getNode(this.root));
    this.compute(opt.property, opt);
  },

  /*
    plot
   
    Plots the ForceDirected3D graph. This is a shortcut to *fx.plot*.
   */
  plot: function() {
    this.fx.plot();
  },

  /*
     animate
    
     Animates the graph from the current positions to the 'end' node positions.
  */
  animate: function(opt) {
    this.fx.animate($.merge( {
      modes: [ 'linear' ]
    }, opt || {}));
  }
});

$jit.ForceDirected3D.$extend = true;

(function(ForceDirected3D) {

  /*
     ForceDirected3D.Op
     
     Custom extension of <Graph.Op>.

     Extends:

     All <Graph.Op> methods
     
     See also:
     
     <Graph.Op>

  */
  ForceDirected3D.Op = new Class( {

    Implements: Graph.Op

  });

  /*
    ForceDirected3D.Plot
    
    Custom extension of <Graph.Plot>.
  
    Extends:
  
    All <Graph.Plot> methods
    
    See also:
    
    <Graph.Plot>
  
  */
  ForceDirected3D.Plot = new Class( {

    Implements: Graph.Plot3D

  });

  /*
    ForceDirected3D.Label
    
    Custom extension of <Graph.Label>. 
    Contains custom <Graph.Label.SVG>, <Graph.Label.HTML> and <Graph.Label.Native> extensions.
  
    Extends:
  
    All <Graph.Label> methods and subclasses.
  
    See also:
  
    <Graph.Label>, <Graph.Label.Native>, <Graph.Label.HTML>, <Graph.Label.SVG>.
  
  */
  ForceDirected3D.Label = {};

  /*
     ForceDirected3D.Label.Native
     
     Custom extension of <Graph.Label.Native>.

     Extends:

     All <Graph.Label.Native> methods

     See also:

     <Graph.Label.Native>

  */
  ForceDirected3D.Label.Native = new Class( {
    Implements: Graph.Label.Native
  });

  /*
    ForceDirected3D.Label.SVG
    
    Custom extension of <Graph.Label.SVG>.
  
    Extends:
  
    All <Graph.Label.SVG> methods
  
    See also:
  
    <Graph.Label.SVG>
  
  */
  ForceDirected3D.Label.SVG = new Class( {
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
     ForceDirected3D.Label.HTML
     
     Custom extension of <Graph.Label.HTML>.

     Extends:

     All <Graph.Label.HTML> methods.

     See also:

     <Graph.Label.HTML>

  */
  ForceDirected3D.Label.HTML = new Class( {
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
      style.display = this.fitsInCanvas(labelPos, canvas) ? '' : 'none';

      controller.onPlaceLabel(tag, node);
    }
  });

  /*
    ForceDirected3D.Plot.NodeTypes

    This class contains a list of <Graph.Node> built-in types. 
    Node types implemented are 'none', 'circle', 'triangle', 'rectangle', 'star', 'ellipse' and 'square'.

    You can add your custom node types, customizing your visualization to the extreme.

    Example:

    (start code js)
      ForceDirected3D.Plot.NodeTypes.implement({
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
  ForceDirected3D.Plot.NodeTypes = new Class({
    'none': {
      'render': $.empty,
      'contains': $.lambda(false)
    },
    'circle': {
      'render': function(node, canvas){
        var pos = node.pos.getc(true), 
            dim = node.getData('dim');
        this.nodeHelper.circle.render('fill', pos, dim, canvas);
      },
      'contains': function(node, pos){
        var npos = node.pos.getc(true), 
            dim = node.getData('dim');
        return this.nodeHelper.circle.contains(npos, pos, dim);
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
    'square': {
      'render': function(node, canvas){
        var pos = node.pos.getc(true), 
            dim = node.getData('dim');
        this.nodeHelper.square.render('fill', pos, dim, canvas);
      },
      'contains': function(node, pos){
        var npos = node.pos.getc(true), 
            dim = node.getData('dim');
        return this.nodeHelper.square.contains(npos, pos, dim);
      }
    },
    'rectangle': {
      'render': function(node, canvas){
        var pos = node.pos.getc(true), 
            width = node.getData('width'), 
            height = node.getData('height');
        this.nodeHelper.rectangle.render('fill', pos, width, height, canvas);
      },
      'contains': function(node, pos){
        var npos = node.pos.getc(true), 
            width = node.getData('width'), 
            height = node.getData('height');
        return this.nodeHelper.rectangle.contains(npos, pos, width, height);
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
    ForceDirected3D.Plot.EdgeTypes
  
    This class contains a list of <Graph.Adjacence> built-in types. 
    Edge types implemented are 'none', 'line' and 'arrow'.
  
    You can add your custom edge types, customizing your visualization to the extreme.
  
    Example:
  
    (start code js)
      ForceDirected3D.Plot.EdgeTypes.implement({
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
  ForceDirected3D.Plot.EdgeTypes = new Class({
    'none': $.empty,
    'line': {
      'render': function(adj, canvas) {
        var from = adj.nodeFrom.pos.getc(true),
            to = adj.nodeTo.pos.getc(true);
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
        var from = adj.nodeFrom.pos.getc(true),
            to = adj.nodeTo.pos.getc(true),
            dim = adj.getData('dim'),
            direction = adj.data.$direction,
            inv = (direction && direction.length>1 && direction[0] != adj.nodeFrom.id);
        this.edgeHelper.arrow.render(from, to, dim, inv, canvas);
      },
      'contains': function(adj, pos) {
        var from = adj.nodeFrom.pos.getc(true),
            to = adj.nodeTo.pos.getc(true);
        return this.edgeHelper.arrow.contains(from, to, pos, this.edge.epsilon);
      }
    }
  });

})($jit.ForceDirected3D);
