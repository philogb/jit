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

var Canvas;
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
    return elem;
  }
  //canvas widget which we will call just Canvas
  $jit.Canvas = Canvas = new Class({
    canvases: [],
    pos: false,
    element: false,
    labelContainer: false,
    translateOffsetX: 0,
    translateOffsetY: 0,
    scaleOffsetX: 1,
    scaleOffsetY: 1,
    
    initialize: function(viz, opt) {
      this.viz = viz;
      this.opt = opt;
      var id = $.type(opt.injectInto) == 'string'? 
          opt.injectInto:opt.injectInto.id,
          idLabel = id + "-label", 
          wrapper = $(id),
          width = opt.width || wrapper.offsetWidth,
          height = opt.height || wrapper.offsetHeight;
      this.id = id;
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
      this.labelContainer = this.createLabelContainer(opt.Label.type, 
          idLabel, canvasOptions);
      //create primary canvas
      this.canvases.push(new Canvas.Base({
        config: $.extend({idSuffix: '-canvas'}, canvasOptions),
        plot: function(base) {
          viz.fx.plot();
        },
        resize: function() {
          viz.refresh();
        }
      }));
      //create secondary canvas
      var back = opt.background;
      if(back) {
        var backCanvas = new Canvas.Background[back.type](viz, $.extend(back, canvasOptions));
        this.canvases.push(new Canvas.Base(backCanvas));
      }
      //insert canvases
      var len = this.canvases.length;
      while(len--) {
        this.element.appendChild(this.canvases[len].canvas);
        if(len > 0) {
          this.canvases[len].plot();
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
      this.translateOffsetX += x*this.scaleOffsetX;
      this.translateOffsetY += y*this.scaleOffsetY;
      for(var i=0, l=this.canvases.length; i<l; i++) {
        this.canvases[i].translate(x, y);
      }
    },
    /*
      Method: scale
      
      Scales the canvas(ses)
      
      Parameters:
      
      x - value.
      y - value.
      
      Example:
      
      (start code js)
       canvas.scale(0.5, 0.5);
      (end code)
    
    */
    scale: function(x, y) {
      this.scaleOffsetX *= x;
      this.scaleOffsetY *= y;
      for(var i=0, l=this.canvases.length; i<l; i++) {
        this.canvases[i].scale(x, y);
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
      this.canvases[i||0].clear();
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
    translateOffsetX: 0,
    translateOffsetY: 0,
    scaleOffsetX: 1,
    scaleOffsetY: 1,

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
          width = ps? (size.width - ps.width) : size.width;
          height = ps? (size.height - ps.height) : size.height;
      this.getCtx().translate(width/2, height/2);
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
      this.clear();
      this.viz.resize(width, height, this);
    },
    translate: function(x, y) {
      var sx = this.scaleOffsetX,
          sy = this.scaleOffsetY;
      this.translateOffsetX += x*sx;
      this.translateOffsetY += y*sy;
      this.getCtx().translate(x, y);
      this.plot();
    },
    scale: function(x, y) {
      this.scaleOffsetX *= x;
      this.scaleOffsetY *= y;
      this.getCtx().scale(x, y);
      this.plot();
    },
    clear: function(){
      var size = this.getSize(),
          ox = this.translateOffsetX,
          oy = this.translateOffsetY,
          sx = this.scaleOffsetX,
          sy = this.scaleOffsetY;
      this.getCtx().clearRect((-size.width / 2 - ox) * 1/sx, 
                              (-size.height / 2 - oy) * 1/sy, 
                              size.width * 1/sx, size.height * 1/sy);
    },
    plot: function() {
      this.clear();
      this.viz.plot(this);
    }
  });
  //background canvases
  Canvas.Background = {};
  Canvas.Background.Circles = new Class({
    initialize: function(viz, options) {
      this.viz = viz;
      this.config = $.merge({
        idSuffix: '-bkcanvas',
        levelDistance: 100,
        numberOfCircles: 6,
        CanvasStyles: {},
        offset: 0
      }, options);
    },
    resize: function(width, height, base) {
      this.plot(base);
    },
    plot: function(base) {
      var canvas = base.canvas,
          ctx = base.getCtx(),
          conf = this.config,
          styles = conf.CanvasStyles;
      //set canvas styles
      for(var s in styles) ctx[s] = styles[s];
      var n = conf.numberOfCircles,
          rho = conf.levelDistance;
      for(var i=1; i<=n; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, rho * i, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
      }
      //TODO(nico): print labels too!
    }
  });
})();
