/*
 * File: Canvas.js
 *
 * A cross browser Canvas widget.
 *
 * Used By:
 *
 * <ST>, <Hypertree>, <RGraph>, <Icicle>, <Sunburst>, <ForceDirected>
 */
/*
 Class: Canvas
 
 	A multi-purpose Canvas Widget Class. This Class can be used with the ExCanvas library to provide
 cross browser Canvas based visualizations.
 
 Parameters:
 
 id - The canvas id. This id will be used as prefix for the canvas widget DOM elements ids.
 options - An object containing multiple options such as
 
 - _injectInto_ This property is _required_ and it specifies the id of the DOM element
 to which the Canvas widget will be appended. It can also be the actual DOM element container.
 - _width_ The width of the Canvas widget. Default's to 200px
 - _height_ The height of the Canvas widget. Default's to 200px
 - _styles_ A hash containing canvas specific style properties such as _fillStyle_ and _strokeStyle_ among others.
 
 Example:
 
 Suppose we have this HTML
 
 (start code xml)
 	<div id="infovis"></div>
 (end code)
 
 Now we create a new Canvas instance
 
 (start code js)
 	//Create a new canvas instance
 	var canvas = new Canvas('mycanvas', {
 		//Where to inject the canvas. Any div container will do.
 		'injectInto':'infovis',
		 //width and height for canvas. Default's to 200.
		 'width': 900,
		 'height':500,
		 //Canvas styles
		 'styles': {
		 'fillStyle': '#ccddee',
		 'strokeStyle': '#772277'
		 }
	 });
 (end code)

 The generated HTML will look like this
 
 (start code xml)
 <div id="infovis">
 	<div id="mycanvas" style="position:relative;">
 	<canvas id="mycanvas-canvas" width=900 height=500
 	style="position:absolute; top:0; left:0; width:900px; height:500px;" />
 	<div id="mycanvas-label"
 	style="overflow:visible; position:absolute; top:0; left:0; width:900px; height:0px">
 	</div>
 	</div>
 </div>
 (end code)
 
 As you can see, the generated HTML consists of a canvas DOM element of id _mycanvas-canvas_ and a div label container
 of id _mycanvas-label_, wrapped in a main div container of id _mycanvas_.
 You can also add a background canvas, for making background drawings.
 This is how the <RGraph> background concentric circles are drawn
 
 Example:
 
 (start code js)
 	//Create a new canvas instance.
 	var canvas = new Canvas('mycanvas', {
		//Where to inject the canvas. Any div container will do.
		'injectInto':'infovis',
		//width and height for canvas. Default's to 200.
		'width': 900,
		'height':500,
		//Canvas styles
		'styles': {
			'fillStyle': '#ccddee',
			'strokeStyle': '#772277'
		},
		//Add a background canvas for plotting
		//concentric circles.
		'backgroundCanvas': {
			//Add Canvas styles for the bck canvas.
			'styles': {
				'fillStyle': '#444',
				'strokeStyle': '#444'
			},
			//Add the initialization and plotting functions.
			'impl': {
				'init': function() {},
				'plot': function(canvas, ctx) {
					var times = 6, d = 100;
					var pi2 = Math.PI*2;
					for(var i=1; i<=times; i++) {
						ctx.beginPath();
						ctx.arc(0, 0, i * d, 0, pi2, true);
						ctx.stroke();
						ctx.closePath();
					}
				}
			}
		}
	});
 (end code)
 
 The _backgroundCanvas_ object contains a canvas _styles_ property and
 an _impl_ key to be used for implementing background canvas specific code.
 
 The _init_ method is only called once, at the instanciation of the background canvas.
 The _plot_ method is called for plotting a Canvas image.
 */
(function() {
  //check for native canvas support
  var canvasType = typeof HTMLCanvasElement,
      supportsCanvas = (canvasType == 'object' || canvasType == 'function');
  //create element function
  function $E(tag, props) {
    var elem = document.createElement(tag);
    for(var p in props) {
      if(typeof props[p] == "object") {
        $.extend(elem[p], props[p]);
      } else {
        elem[p] = props[p];
      }
    }
    if (tag == "canvas" && !supportsCanvas && G_vmlCanvasManager) {
      elem = G_vmlCanvasManager.initElement(document.body.appendChild(elem));
    }
  }
  //canvas widget which we will call just Canvas
  var Canvas = new Class({
    canvases: [],
    pos: false,
    element: false,
    labelContainer: false,
    
    initialize: function(viz, opt) {
      this.viz = viz;
      this.opt = options;
      var id = $.type(opt.injectInto) == 'string'? 
          opt.injectInto:opt.injectInto.id,
          idLabel = id + "-label", 
          wrapper = $(id),
          width = opt.width || wrapper.offsetWidth,
          height = opt.height || wrapper.offsetHeight;
      //canvas options
      var canvasOptions = {
        injectInto: id,
        width: width,
        height: height
      };
      //create main wrapper
      this.element = $E('div', {
        'id': id + '-canvaswidget',
        'style': {
          'position': 'relative',
          'width': width + 'px',
          'height': height + 'px'
        }
      });
      //create label container
      this.labelContainer = createLabelContainer(opt.Label.type, 
          idLabel, canvasOptions);
      //create primary canvas
      this.canvases.push(new Canvas.Base({
        config: $.extend({idSuffix: '-canvas'}, canvasOptions),
        paint: function(ctx, opt, canvas) {
          viz.refresh();
        }
      }));
      //create secondary canvas
      var background = opt.background;
      if(background) {
        var backgroundCanvas = new Canvas
          .Background($.extend(background, canvasOptions));
        this.canvases.push(new Canvas.Base(backgroundCanvas));
      }
      //insert canvases
      var len = this.canvases.length;
      while(len--) {
        this.element.appendChild(this.canvases[len]);
        if(len > 0) {
          this.canvases[len].paint();
        }
      }
      this.element.appendChild(this.labelContainer);
      wrapper.appendChild(this.element);
    },
    /*
      Method: getCtx
      
      Returns the main canvas context object
      
      Returns:
      
      Main canvas context
      
      Example:
      
      (start code js)
       var ctx = canvas.getCtx();
       //Now I can use the native canvas context
       //and for example change some canvas styles
       ctx.globalAlpha = 1;
      (end code)
    */
    getCtx: function(i) {
      return this.canvases[i || 0].getCtx();
    },
    /*
      Method: getConfig
      
      Returns the current Configuration for this Canvas Widget.
      
      Returns:
      
      Canvas Widget Configuration
      
      Example:
      
      (start code js)
       var config = canvas.getConfig();
      (end code)
    */
    getConfig: function() {
      return this.opt;
    },
    /*
      Method: getElement

      Returns the main Canvas DOM wrapper
      
      Returns:
      
      DOM canvas wrapper generated, (i.e the div wrapper element with id _mycanvas_)
      
      Example:
      
      (start code js)
       var wrapper = canvas.getElement();
       //Returns <div id="mycanvas" ... >...</div> as element
      (end code)
    */
    getElement: function() {
      return this.element;
    },
    /*
      Method: getSize
      
      Returns canvas dimensions.
      
      Returns:
      
      An object with _width_ and _height_ properties.
      Example:
      (start code js)
      canvas.getSize(); //returns { width: 900, height: 500 }
      (end code)
    */
    getSize: function(i) {
      return this.canvases[i || 0].getSize();
    },
    /*
      Method: resize
      
      Resizes the canvas.
      
      Parameters:
      
      width - New canvas width.
      height - New canvas height.
      
      This method can be used with the <ST>, <Hypertree> or <RGraph> visualizations to resize
      the visualizations
      
      Example:
      
      (start code js)
       canvas.resize(width, height);
      (end code)
    
    */
    resize: function(width, height) {
      for(var i=0, l=this.canvases.length; i<l; i++) {
        this.canvases[i].resize(width, height);
      }
    },
    /*
      Method: translate
      
      Applies a translation to canvases.
      
      Parameters:
      
      x - pos.
      y - pos.
      
      Example:
      
      (start code js)
       canvas.translate(30, 30);
      (end code)
    
    */
    translate: function(x, y) {
      for(var i=0, l=this.canvases.length; i<l; i++) {
        this.canvases[i].translate(x, y);
      }
    },
    /*
      Method: getPos
      
      Returns canvas position vector.
      
      Returns:
      
      An object with _x_ and _y_ properties.
      Example:
      (start code js)
      canvas.getPos(); //returns { x: 900, y: 500 }
      (end code)
    */
    getPos: function(force){
      if(force || !this.pos) {
        return this.pos = $.getPos(this.getElement());
      }
      return this.pos;
    },
    /*
       Method: clear
       
       Clears the canvas object.
    */
    clear: function(i){
      var size = this.getSize(i || 0);
      this.canvases[i || 0].getCtx().clearRect(-size.width / 2, -size.height / 2, size.width, size.height);
    },
    
    path: function(type, action){
      var ctx = this.canvases[0].getCtx();
      ctx.beginPath();
      action(ctx);
      ctx[type]();
      ctx.closePath();
    },
    
    createLabelContainer: function(type, idLabel, dim) {
      var NS = 'http://www.w3.org/2000/svg';
      if(type == 'HTML' || type == 'Native') {
        return $E('div', {
          'id': idLabel,
          'style': {
            'overflow': 'visible',
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'width': dim.width + 'px',
            'height': 0
          }
        });
      } else if(type == 'SVG') {
        var svgContainer = document.createElementNS(NS, 'svg:svg');
        svgContainer.setAttribute("width", dim.width);
        svgContainer.setAttribute('height', dim.height);
        var style = svgContainer.style;
        style.position = 'absolute';
        style.left = style.top = '0px';
        var labelContainer = document.createElementNS(NS, 'svg:g');
        labelContainer.setAttribute('width', dim.width);
        labelContainer.setAttribute('height', dim.height);
        labelContainer.setAttribute('x', 0);
        labelContainer.setAttribute('y', 0);
        labelContainer.setAttribute('id', idLabel);
        svgContainer.appendChild(labelContainer);
        return svgContainer;
      }
    }
  });
  //base canvas wrapper
  Canvas.Base = new Class({
    initialize: function(viz) {
      this.viz = viz;
      this.opt = viz.config;
      this.size = false;
      this.createCanvas();
      this.translateToCenter();
    },
    createCanvas: function() {
      var opt = this.opt,
          width = opt.width,
          height = opt.height;
      this.canvas = $E('canvas', {
        'id': opt.injectInto + opt.idSuffix,
        'width': width,
        'height': height,
        'style': {
          'position': 'absolute',
          'top': 0,
          'left': 0,
          'width': width + 'px',
          'height': height + 'px'
        }
      });
    },
    getCtx: function() {
      if(!this.ctx) 
        return this.ctx = this.canvas.getContext('2d');
      return this.ctx;
    },
    getSize: function() {
      if(this.size) return this.size;
      var canvas = this.canvas;
      return this.size = {
        width: canvas.width,
        height: canvas.height
      };
    },
    translateToCenter: function(ps) {
      var size = this.getSize(),
          width = ps? (size.width - size.width) : canvas.width;
          height = ps? (canvas.height - h) : canvas.height;
      this.getCtx().translate(size.width/2, size.height/2);
    },
    resize: function(width, height) {
      var size = this.getSize(),
          canvas = this.canvas,
          styles = canvas.style;
      this.size = false;
      canvas.width = width;
      canvas.height = height;
      styles.width = width + "px";
      styles.height = height + "px";
      //small ExCanvas fix
      if(!supportsCanvas) {
        this.translateToCenter(size);
      } else {
        this.translateToCenter();
      }
      this.viz.resize(width, height, this.getCtx(), this.opt);
    },
    translate: function(x, y) {
      this.getCtx().translate(x, y);
      this.paint();
    },
    clear: function(){
      var size = this.getSize();
      ctx.clearRect(-size.width / 2, -size.height / 2, size.width, size.height);
    },
    paint: function() {
      this.viz.paint(this.getCtx(), this.opt);
    }
  });
  //background canvases
  Canvas.Background.Grid = new Class({
    intialize: function(options) {
      this.config = $.merge({
        idSuffix: '-bkcanvas',
        XAxis: {
          show: false,
          showLabels: false,
          CanvasStyles: {},
          offset: 0,
          getXRange: $.lambda([]),
          getXLabels: $.lambda([])
        },
        YAxis: {
          show: false,
          showLabels: false,
          CanvasStyles: {},
          offset: 0,
          getYRange: $.lambda([]),
          getYLabels: $.lambda([])
        }
      }, options);
    },
    paint: function(ctx, opt, canvas) {
      var xconf = this.config.XAxis,
          yconf = this.config.YAxis;
      if(xconf.show) {
        var xs = xconf.getXRange(),
            ls = xconf.getXLabels(),
            offset = xconf.offset,
            styles = xconf.CanvasStyles;
        //set canvas styles
        for(var s in styles) ctx[s] = styles[s];
        //print lines
        for(var i=0, l=xs.length; i<l; i++) {
          ctx.moveTo(xs[i], -canvas.height/2 + offset);
          ctx.lineTo(x[i], canvas.height/2 - offset);
        }
      }
      if(yconf.show) {
        var ys = yconf.getYRange(),
            ls = yconf.getYLabels(),
            offset = yconf.offset,
            styles = yconf.CanvasStyles;
        //set canvas styles
        for(var s in styles) ctx[s] = styles[s];
        //print lines
        for(var i=0, l=xs.length; i<l; i++) {
          ctx.moveTo(-canvas.width/2 + offset, ys[i]);
          ctx.lineTo(canvas.width/2 - offset, ys[i]);
        }
      }
      //TODO(nico): print labels too!
    }
  });
  Canvas.Background.Circles = new Class({
    intialize: function(options) {
      this.config = $.merge({
        idSuffix: '-bkcanvas',
        show: false,
        showLabels: false,
        CanvasStyles: {},
        offset: 0,
        getRange: $.lambda([]),
        getLabels: $.lambda([])
      }, options);
    },
    paint: function(ctx, opt, canvas) {
      var conf = this.config;
      if(conf.show) {
        var rs = conf.getRange(),
            ls = conf.getLabels(),
            offset = conf.offset,
            styles = conf.CanvasStyles;
        //set canvas styles
        for(var s in styles) ctx[s] = styles[s];
        //print lines
        for(var i=0, l=xs.length; i<l; i++) {
          ctx.arc(0, 0, rs[i], 0, 2 * Math.PI, false);
        }
      }
      //TODO(nico): print labels too!
    }
  });
})();
