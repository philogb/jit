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
this.Canvas = (function(){
    var config = {
        'injectInto': 'id',
        
        'width': 200,
        'height': 200,
        //deprecated
        'backgroundColor': '#333333',
        
        'styles': {
            'fillStyle': '#000000',
            'strokeStyle': '#000000'
        },

        'labels': 'HTML', //can also be 'SVG' or 'Native'
        
        'backgroundCanvas': false
    };
    
    function hasCanvas(){
        hasCanvas.t = hasCanvas.t || typeof(HTMLCanvasElement);
        return "function" == hasCanvas.t || "object" == hasCanvas.t;
    };
    
    function create(tag, prop, styles){
        var elem = document.createElement(tag);
        (function(obj, prop){
            if (prop) {
              for (var p in prop) {
                obj[p] = prop[p];
              }  
            }
            return arguments.callee;
        })(elem, prop)(elem.style, styles);
        //feature check
        if (tag == "canvas" && !hasCanvas() && G_vmlCanvasManager) {
            elem = G_vmlCanvasManager.initElement(document.body.appendChild(elem));
        }
        return elem;
    };

    function createLabelContainer(labels, idLabel, dim) {
      var NS = 'http://www.w3.org/2000/svg';

      if(labels == 'HTML' || labels == 'Native') {
        return create("div", {
            'id': idLabel
        }, {
            'overflow': 'visible',
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'width': dim.width + 'px',
            'height': 0
        });

      } else if(labels == 'SVG') {
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
    }; 
    
    function get(id){
        return document.getElementById(id);
    };
    
    function translateToCenter(canvas, ctx, w, h){
        var width = w ? (canvas.width - w) : canvas.width;
        var height = h ? (canvas.height - h) : canvas.height;
        ctx.translate(width / 2, height / 2);
    };
    
    return function(id, opt){
        var ctx, bkctx, mainContainer, labelContainer, canvas, bkcanvas;
        if (arguments.length < 1) 
            throw "Arguments missing";
        var idLabel = id + "-label", idCanvas = id + "-canvas", idBCanvas = id + "-bkcanvas";
        opt = $merge(config, opt || {});
        //create elements
        var dim = {
            'width': opt.width,
            'height': opt.height
        };
        mainContainer = create("div", {
            'id': id
        }, $merge(dim, {
            'position': 'relative'
        }));
        labelContainer =  createLabelContainer(opt.labels, idLabel, dim);       
        var dimPos = {
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'width': dim.width + 'px',
            'height': dim.height + 'px'
        };
        canvas = create("canvas", $merge({
            'id': idCanvas
        }, dim), dimPos);
        var bc = opt.backgroundCanvas;
        if (bc) {
            bkcanvas = create("canvas", $merge({
                'id': idBCanvas
            }, dim), dimPos);
            //append elements
            mainContainer.appendChild(bkcanvas);
        }
        mainContainer.appendChild(canvas);
        mainContainer.appendChild(labelContainer);
        if($type(opt.injectInto) == 'string') {
          get(opt.injectInto).appendChild(mainContainer);
        } else {
          opt.injectInto.appendChild(mainContainer);
        }
        
        //create contexts
        ctx = canvas.getContext('2d');
        translateToCenter(canvas, ctx);
        var st = opt.styles;
        var s;
        for (s in st) 
            ctx[s] = st[s];
        if (bc) {
            bkctx = bkcanvas.getContext('2d');
            st = bc.styles;
            for (s in st) {
              bkctx[s] = st[s];
            }
            translateToCenter(bkcanvas, bkctx);
            bc.impl.init(bkcanvas, bkctx);
            bc.impl.plot(bkcanvas, bkctx);
        }
        //create methods
        return {
            'id': id,
            
            'pos': null,
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
            getCtx: function(){
                return ctx;
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
            getConfig: function(){
                return opt;
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
            getElement: function(){
                return mainContainer;
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
             	function resizeViz(width, height) {
             		canvas.resize(width, height);
             		rgraph.refresh(); //ht.refresh or st.refresh() also work.
             		rgraph.onAfterCompute();
             	}
             (end code)
             
             */
            resize: function(width, height){
                var pwidth = canvas.width, pheight = canvas.height;
            	canvas.width = width;
                canvas.height = height;
                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
                if (bc) {
                    bkcanvas.width = width;
                    bkcanvas.height = height;
                    bkcanvas.style.width = width + "px";
                    bkcanvas.style.height = height + "px";
                }
                //small ExCanvas fix
                if(!hasCanvas()) {
                	translateToCenter(canvas, ctx, pwidth, pheight);
                } else {
                	translateToCenter(canvas, ctx);
                }
                
                var st = opt.styles;
                var s;
                for (s in st) {
                  ctx[s] = st[s];
                }
                if (bc) {
                    st = bc.styles;
                    for (s in st) 
                        bkctx[s] = st[s];
                    //same ExCanvas fix here
                    if(!hasCanvas()) {
                    	translateToCenter(bkcanvas, bkctx, pwidth, pheight);
                    } else {
                    	translateToCenter(bkcanvas, bkctx);	
                    }
                    
                    bc.impl.init(bkcanvas, bkctx);
                    bc.impl.plot(bkcanvas, bkctx);
                }
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
            getSize: function(){
                return {
                    'width': canvas.width,
                    'height': canvas.height
                };
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
                return this.pos = $getPos(this.getElement());
              }
              return this.pos;
           },

           path: function(type, action){
                ctx.beginPath();
                action(ctx);
                ctx[type]();
                ctx.closePath();
            },
            
            /*
             Method: clear
             
             Clears the canvas object.
             */
            clear: function(){
                var size = this.getSize();
                ctx.clearRect(-size.width / 2, -size.height / 2, size.width, size.height);
            }
        };
    };
    
})();

