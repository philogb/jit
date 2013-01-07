	/*
 * File: Graph.Plot.js
 */

/*
   Object: Graph.Plot

   <Graph> rendering and animation methods.
   
   Properties:
   
   nodeHelper - <NodeHelper> object.
   edgeHelper - <EdgeHelper> object.
*/
Graph.Plot = {
    //Default initializer
    initialize: function(viz, klass){
      this.viz = viz;
      this.config = viz.config;
      this.node = viz.config.Node;
      this.edge = viz.config.Edge;
      this.animation = new Animation;
      this.nodeTypes = new klass.Plot.NodeTypes;
      this.edgeTypes = new klass.Plot.EdgeTypes;
      this.labels = viz.labels;
   },

    //Add helpers
    nodeHelper: NodeHelper,
    edgeHelper: EdgeHelper,
    
    Interpolator: {
        //node/edge property parsers
        'map': {
          'border': 'color',
          'color': 'color',
          'width': 'number',
          'height': 'number',
          'dim': 'number',
          'alpha': 'number',
          'lineWidth': 'number',
          'angularWidth':'number',
          'span':'number',
          'valueArray':'array-number',
          'dimArray':'array-number',
          'vertices':'polygon'
          //'colorArray':'array-color'
        },

        //canvas specific parsers
        'canvas': {
          'globalAlpha': 'number',
          'fillStyle': 'color',
          'strokeStyle': 'color',
          'lineWidth': 'number',
          'shadowBlur': 'number',
          'shadowColor': 'color',
          'shadowOffsetX': 'number',
          'shadowOffsetY': 'number',
          'miterLimit': 'number'
        },

        //label parsers
        'label': {
          'size': 'number',
          'color': 'color'
        },

        //Number interpolator
        'compute': function(from, to, delta) {
          return from + (to - from) * delta;
        },

        //Position interpolators
        'moebius': function(elem, props, delta, vector) {
          var v = vector.scale(-delta);
          if(v.norm() < 1) {
              var x = v.x, y = v.y;
              var ans = elem.startPos
                .getc().moebiusTransformation(v);
              elem.pos.setc(ans.x, ans.y);
              v.x = x; v.y = y;
            }
        },

        'linear': function(elem, props, delta) {
            var from = elem.startPos.getc(true);
            var to = elem.endPos.getc(true);
            elem.pos.setc(this.compute(from.x, to.x, delta),
                          this.compute(from.y, to.y, delta));
        },

        'polar': function(elem, props, delta) {
          var from = elem.startPos.getp(true);
          var to = elem.endPos.getp();
          var ans = to.interpolate(from, delta);
          elem.pos.setp(ans.theta, ans.rho);
        },

        //Graph's Node/Edge interpolators
        'number': function(elem, prop, delta, getter, setter) {
          var from = elem[getter](prop, 'start');
          var to = elem[getter](prop, 'end');
          elem[setter](prop, this.compute(from, to, delta));
        },

        'color': function(elem, prop, delta, getter, setter) {
          var from = $.hexToRgb(elem[getter](prop, 'start'));
          var to = $.hexToRgb(elem[getter](prop, 'end'));
          var comp = this.compute;
          var val = $.rgbToHex([parseInt(comp(from[0], to[0], delta)),
                                parseInt(comp(from[1], to[1], delta)),
                                parseInt(comp(from[2], to[2], delta))]);

          elem[setter](prop, val);
        },

        'array-number': function(elem, prop, delta, getter, setter) {
          var from = elem[getter](prop, 'start'),
              to = elem[getter](prop, 'end'),
              cur = [];
          for(var i=0, l=from.length; i<l; i++) {
            var fromi = from[i], toi = to[i];
            if(fromi.length) {
              for(var j=0, len=fromi.length, curi=[]; j<len; j++) {
                curi.push(this.compute(fromi[j], toi[j], delta));
              }
              cur.push(curi);
            } else {
              cur.push(this.compute(fromi, toi, delta));
            }
          }
          elem[setter](prop, cur);
        },

        'node': function(elem, props, delta, map, getter, setter) {
          map = this[map];
          if(props) {
            var len = props.length;
            for(var i=0; i<len; i++) {
              var pi = props[i];
              this[map[pi]](elem, pi, delta, getter, setter);
            }
          } else {
            for(var pi in map) {
              this[map[pi]](elem, pi, delta, getter, setter);
            }
          }
        },

        'edge': function(elem, props, delta, mapKey, getter, setter) {
            var adjs = elem.adjacencies;
            for(var id in adjs) this['node'](adjs[id], props, delta, mapKey, getter, setter);
        },

        'node-property': function(elem, props, delta) {
          this['node'](elem, props, delta, 'map', 'getData', 'setData');
        },

        'edge-property': function(elem, props, delta) {
          this['edge'](elem, props, delta, 'map', 'getData', 'setData');
        },

        'label-property': function(elem, props, delta) {
          this['node'](elem, props, delta, 'label', 'getLabelData', 'setLabelData');
        },

        'node-style': function(elem, props, delta) {
          this['node'](elem, props, delta, 'canvas', 'getCanvasStyle', 'setCanvasStyle');
        },

        'edge-style': function(elem, props, delta) {
          this['edge'](elem, props, delta, 'canvas', 'getCanvasStyle', 'setCanvasStyle');
        },

        'polygon': function(elem, prop, delta, getter, setter) {
          var from = elem[getter](prop, 'start'),
              to = elem[getter](prop, 'end'),
              cur = [];
          if (typeof from.offset == 'undefined') {
            if (from === 0) {
              from = $.map(to, function() {
                return new $jit.Complex(0, 0);
              });
              from.offset = 0;
            }
            else {
              if (from.length == 0) {
                from.push(new $jit.Complex(0, 0));
              }
              while (from.length < to.length) {
                from.push(from[0]);
              }
              while (from.length > to.length) {
                to.push(to[0] || new $jit.Complex(0, 0));
              }
              if (from.length == 0) return;
              var l = from.length;
              var minDist = 1e300;
              for (var offset = 0; offset < l; offset ++) {
                var d = 0;
                for (var i = 0; i < l; i++) {
                  d +=Geometry.dist2(from[(offset + i) % l], to[i]);
                }
                if (d < minDist) {
                  from.offset = offset;
                  minDist = d;
                }
              }
            }
          }

          for (var i = 0, l = from.length; i < l; i++) {
            var fromi = from[(i + from.offset) % l], toi = to[i];
            cur.push(new $jit.Complex(
                this.compute(fromi.x, toi.x, delta),
                this.compute(fromi.y, toi.y, delta)
            ));
          }
          elem[setter](prop, cur);
        }
    },
    
  
    /*
       sequence
    
       Iteratively performs an action while refreshing the state of the visualization.

       Parameters:

       options - (object) An object containing some sequence options described below
       condition - (function) A function returning a boolean instance in order to stop iterations.
       step - (function) A function to execute on each step of the iteration.
       onComplete - (function) A function to execute when the sequence finishes.
       duration - (number) Duration (in milliseconds) of each step.

      Example:
       (start code js)
        var rg = new $jit.RGraph(options);
        var i = 0;
        rg.fx.sequence({
          condition: function() {
           return i == 10;
          },
          step: function() {
            alert(i++);
          },
          onComplete: function() {
           alert('done!');
          }
        });
       (end code)

    */
    sequence: function(options) {
        var that = this;
        options = $.merge({
          condition: $.lambda(false),
          step: $.empty,
          onComplete: $.empty,
          duration: 200
        }, options || {});

        var interval = setInterval(function() {
          if(options.condition()) {
            options.step();
          } else {
            clearInterval(interval);
            options.onComplete();
          }
          that.viz.refresh(true);
        }, options.duration);
    },
    
    /*
      prepare
 
      Prepare graph position and other attribute values before performing an Animation. 
      This method is used internally by the Toolkit.
      
      See also:
       
       <Animation>, <Graph.Plot.animate>

    */
    prepare: function(modes) {
      var graph = this.viz.graph,
          accessors = {
            'node-property': {
              'getter': 'getData',
              'setter': 'setData'
            },
            'edge-property': {
              'getter': 'getData',
              'setter': 'setData'
            },
            'node-style': {
              'getter': 'getCanvasStyle',
              'setter': 'setCanvasStyle'
            },
            'edge-style': {
              'getter': 'getCanvasStyle',
              'setter': 'setCanvasStyle'
            }
          };

      //parse modes
      var m = {};
      if($.type(modes) == 'array') {
        for(var i=0, len=modes.length; i < len; i++) {
          var elems = modes[i].split(':');
          m[elems.shift()] = elems;
        }
      } else {
        for(var p in modes) {
          if(p == 'position') {
            m[modes.position] = [];
          } else {
            m[p] = $.splat(modes[p]);
          }
        }
      }
      
      graph.eachNode(function(node) { 
        node.startPos.set(node.pos);
        $.each(['node-property', 'node-style'], function(p) {
          if(p in m) {
            var prop = m[p];
            for(var i=0, l=prop.length; i < l; i++) {
              node[accessors[p].setter](prop[i], node[accessors[p].getter](prop[i]), 'start');
            }
          }
        });
        $.each(['edge-property', 'edge-style'], function(p) {
          if(p in m) {
            var prop = m[p];
            node.eachAdjacency(function(adj) {
              for(var i=0, l=prop.length; i < l; i++) {
                adj[accessors[p].setter](prop[i], adj[accessors[p].getter](prop[i]), 'start');
              }
            });
          }
        });
      });
      return m;
    },
    
    /*
       Method: animate
    
       Animates a <Graph> by interpolating some <Graph.Node>, <Graph.Adjacence> or <Graph.Label> properties.

       Parameters:

       opt - (object) Animation options. The object properties are described below
       duration - (optional) Described in <Options.Fx>.
       fps - (optional) Described in <Options.Fx>.
       hideLabels - (optional|boolean) Whether to hide labels during the animation.
       modes - (required|object) An object with animation modes (described below).

       Animation modes:
       
       Animation modes are strings representing different node/edge and graph properties that you'd like to animate. 
       They are represented by an object that has as keys main categories of properties to animate and as values a list 
       of these specific properties. The properties are described below
       
       position - Describes the way nodes' positions must be interpolated. Possible values are 'linear', 'polar' or 'moebius'.
       node-property - Describes which Node properties will be interpolated. These properties can be any of the ones defined in <Options.Node>.
       edge-property - Describes which Edge properties will be interpolated. These properties can be any the ones defined in <Options.Edge>.
       label-property - Describes which Label properties will be interpolated. These properties can be any of the ones defined in <Options.Label> like color or size.
       node-style - Describes which Node Canvas Styles will be interpolated. These are specific canvas properties like fillStyle, strokeStyle, lineWidth, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, etc.
       edge-style - Describes which Edge Canvas Styles will be interpolated. These are specific canvas properties like fillStyle, strokeStyle, lineWidth, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, etc.

       Example:
       (start code js)
       var viz = new $jit.Viz(options);
       //...tweak some Data, CanvasStyles or LabelData properties...
       viz.fx.animate({
         modes: {
           'position': 'linear',
           'node-property': ['width', 'height'],
           'node-style': 'shadowColor',
           'label-property': 'size'
         },
         hideLabels: false
       });
       //...can also be written like this...
       viz.fx.animate({
         modes: ['linear',
                 'node-property:width:height',
                 'node-style:shadowColor',
                 'label-property:size'],
         hideLabels: false
       });
       (end code)
    */
    animate: function(opt, versor) {
      opt = $.merge(this.viz.config, opt || {});
      var that = this,
          viz = this.viz,
          graph  = viz.graph,
          interp = this.Interpolator,
          animation =  opt.type === 'nodefx'? this.nodeFxAnimation : this.animation;
      //prepare graph values
      var m = this.prepare(opt.modes);
      
      //animate
      if(opt.hideLabels) this.labels.hideLabels(true);
      animation.setOptions($.extend(opt, {
        $animating: false,
        compute: function(delta) {
          graph.eachNode(function(node) { 
            for(var p in m) {
              interp[p](node, m[p], delta, versor);
            }
          });
          that.plot(opt, this.$animating, delta);
          this.$animating = true;
        },
        complete: function() {
          if(opt.hideLabels) that.labels.hideLabels(false);
          that.plot(opt);
          opt.onComplete();
          //TODO(nico): This shouldn't be here!
          //opt.onAfterCompute();
        }       
      })).start();
    },
    
    /*
      nodeFx
   
      Apply animation to node properties like color, width, height, dim, etc.
  
      Parameters:
  
      options - Animation options. This object properties is described below
      elements - The Elements to be transformed. This is an object that has a properties
      
      (start code js)
      'elements': {
        //can also be an array of ids
        'id': 'id-of-node-to-transform',
        //properties to be modified. All properties are optional.
        'properties': {
          'color': '#ccc', //some color
          'width': 10, //some width
          'height': 10, //some height
          'dim': 20, //some dim
          'lineWidth': 10 //some line width
        } 
      }
      (end code)
      
      - _reposition_ Whether to recalculate positions and add a motion animation. 
      This might be used when changing _width_ or _height_ properties in a <Layouts.Tree> like layout. Default's *false*.
      
      - _onComplete_ A method that is called when the animation completes.
      
      ...and all other <Graph.Plot.animate> options like _duration_, _fps_, _transition_, etc.
  
      Example:
      (start code js)
       var rg = new RGraph(canvas, config); //can be also Hypertree or ST
       rg.fx.nodeFx({
         'elements': {
           'id':'mynodeid',
           'properties': {
             'color':'#ccf'
           },
           'transition': Trans.Quart.easeOut
         }
       });
      (end code)    
   */
   nodeFx: function(opt) {
     if (this.nodeFxAnimation == undefined) {
       this.nodeFxAnimation = new Animation();
     }

     var viz = this.viz,
         graph  = viz.graph,
         animation = this.nodeFxAnimation,
         options = $.merge(this.viz.config, {
           'elements': {
             'id': false,
             'properties': {}
           },
           'reposition': false
         });
     opt = $.merge(options, opt || {}, {
       onBeforeCompute: $.empty,
       onAfterCompute: $.empty
     });
     //check if an animation is running
     animation.stopTimer();
     var props = opt.elements.properties;
     //set end values for nodes
     if(!opt.elements.id) {
       graph.eachNode(function(n) {
         for(var prop in props) {
           n.setData(prop, props[prop], 'end');
         }
       });
     } else {
       var ids = $.splat(opt.elements.id);
       $.each(ids, function(id) {
         var n = graph.getNode(id);
         if(n) {
           for(var prop in props) {
             n.setData(prop, props[prop], 'end');
           }
         }
       });
     }
     //get keys
     var propnames = [];
     for(var prop in props) propnames.push(prop);
     //add node properties modes
     var modes = ['node-property:' + propnames.join(':')];
     //set new node positions
     if(opt.reposition) {
       modes.push('linear');
       viz.compute('end');
     }
     //animate
     this.animate($.merge(opt, {
       modes: modes,
       type: 'nodefx'
     }));
   },

    
    /*
       Method: plot
    
       Plots a <Graph>.

       Parameters:

       opt - (optional) Plotting options. Most of them are described in <Options.Fx>.

       Example:

       (start code js)
       var viz = new $jit.Viz(options);
       viz.fx.plot(); 
       (end code)

    */
   plot: function(opt, animating) {
     var viz = this.viz, 
         aGraph = viz.graph, 
         canvas = viz.canvas, 
         id = viz.root, 
         that = this, 
         ctx = canvas.getCtx(), 
         min = Math.min,
         opt = opt || this.viz.controller;
     
     opt.clearCanvas && canvas.clear();
       
     var root = aGraph.getNode(id);
     if(!root) return;
     
     var T = !!root.visited;
     aGraph.eachNode(function(node) {
       var nodeAlpha = node.getData('alpha');
       node.eachAdjacency(function(adj) {
         var nodeTo = adj.nodeTo;
         if(!!nodeTo.visited === T && node.drawn && nodeTo.drawn) {
           !animating && opt.onBeforePlotLine(adj);
           that.plotLine(adj, canvas, animating);
           !animating && opt.onAfterPlotLine(adj);
         }
       });
       if(node.drawn) {
         !animating && opt.onBeforePlotNode(node);
         that.plotNode(node, canvas, animating);
         !animating && opt.onAfterPlotNode(node);
       }
       if(!that.labelsHidden && opt.withLabels) {
         if(node.drawn && nodeAlpha >= 0.95) {
           that.labels.plotLabel(canvas, node, opt);
         } else {
           that.labels.hideLabel(node, false);
         }
       }
       node.visited = !T;
     });
    },

  /*
      Plots a Subtree.
   */
   plotTree: function(node, opt, animating) {
       var that = this, 
           viz = this.viz, 
           canvas = viz.canvas,
           config = this.config,
           ctx = canvas.getCtx();
       var nodeAlpha = node.getData('alpha');
       node.eachSubnode(function(elem) {
         if(opt.plotSubtree(node, elem) && elem.exist && elem.drawn) {
             var adj = node.getAdjacency(elem.id);
             !animating && opt.onBeforePlotLine(adj);
             that.plotLine(adj, canvas, animating);
             !animating && opt.onAfterPlotLine(adj);
             that.plotTree(elem, opt, animating);
         }
       });
       if(node.drawn) {
           !animating && opt.onBeforePlotNode(node);
           this.plotNode(node, canvas, animating);
           !animating && opt.onAfterPlotNode(node);
           if(!opt.hideLabels && opt.withLabels && nodeAlpha >= 0.95) 
               this.labels.plotLabel(canvas, node, opt);
           else 
               this.labels.hideLabel(node, false);
       } else {
           this.labels.hideLabel(node, true);
       }
   },

  /*
       Method: plotNode
    
       Plots a <Graph.Node>.

       Parameters:
       
       node - (object) A <Graph.Node>.
       canvas - (object) A <Canvas> element.

    */
    plotNode: function(node, canvas, animating) {
        var f = node.getData('type'), 
            ctxObj = this.node.CanvasStyles;
        if(f != 'none') {
          var width = node.getData('lineWidth'),
              color = node.getData('color'),
              alpha = node.getData('alpha'),
              ctx = canvas.getCtx();
          ctx.save();
          ctx.lineWidth = width;
          ctx.fillStyle = ctx.strokeStyle = color;
          ctx.globalAlpha = alpha;
          
          for(var s in ctxObj) {
            ctx[s] = node.getCanvasStyle(s);
          }

          this.nodeTypes[f].render.call(this, node, canvas, animating);
          ctx.restore();
        }
    },
    
    /*
       Method: plotLine
    
       Plots a <Graph.Adjacence>.

       Parameters:

       adj - (object) A <Graph.Adjacence>.
       canvas - (object) A <Canvas> instance.

    */
    plotLine: function(adj, canvas, animating) {
      var f = adj.getData('type'),
          ctxObj = this.edge.CanvasStyles;
      if(f != 'none') {
        var width = adj.getData('lineWidth'),
            color = adj.getData('color'),
            ctx = canvas.getCtx(),
            nodeFrom = adj.nodeFrom,
            nodeTo = adj.nodeTo;
        
        ctx.save();
        ctx.lineWidth = width;
        ctx.fillStyle = ctx.strokeStyle = color;
        ctx.globalAlpha = Math.min(nodeFrom.getData('alpha'), 
            nodeTo.getData('alpha'), 
            adj.getData('alpha'));
        
        for(var s in ctxObj) {
          ctx[s] = adj.getCanvasStyle(s);
        }

        this.edgeTypes[f].render.call(this, adj, canvas, animating);
        ctx.restore();
      }
    }    
  
};

/*
  Object: Graph.Plot3D
  
  <Graph> 3D rendering and animation methods.
  
  Properties:
  
  nodeHelper - <NodeHelper> object.
  edgeHelper - <EdgeHelper> object.

*/
Graph.Plot3D = $.merge(Graph.Plot, {
  Interpolator: {
    'linear': function(elem, props, delta) {
      var from = elem.startPos.getc(true);
      var to = elem.endPos.getc(true);
      elem.pos.setc(this.compute(from.x, to.x, delta), 
                    this.compute(from.y, to.y, delta),
                    this.compute(from.z, to.z, delta));
    }
  },
  
  plotNode: function(node, canvas) {
    if(node.getData('type') == 'none') return;
    this.plotElement(node, canvas, {
      getAlpha: function() {
        return node.getData('alpha');
      }
    });
  },
  
  plotLine: function(adj, canvas) {
    if(adj.getData('type') == 'none') return;
    this.plotElement(adj, canvas, {
      getAlpha: function() {
        return Math.min(adj.nodeFrom.getData('alpha'),
                        adj.nodeTo.getData('alpha'),
                        adj.getData('alpha'));
      }
    });
  },
  
  plotElement: function(elem, canvas, opt) {
    var gl = canvas.getCtx(),
        viewMatrix = new Matrix4,
        lighting = canvas.config.Scene.Lighting,
        wcanvas = canvas.canvases[0],
        program = wcanvas.program,
        camera = wcanvas.camera;
    
    if(!elem.geometry) {
      elem.geometry = new O3D[elem.getData('type')];
    }
    elem.geometry.update(elem);
    if(!elem.webGLVertexBuffer) {
      var vertices = [],
          faces = [],
          normals = [],
          vertexIndex = 0,
          geom = elem.geometry;
      
      for(var i=0, vs=geom.vertices, fs=geom.faces, fsl=fs.length; i<fsl; i++) {
        var face = fs[i],
            v1 = vs[face.a],
            v2 = vs[face.b],
            v3 = vs[face.c],
            v4 = face.d? vs[face.d] : false,
            n = face.normal;
        
        vertices.push(v1.x, v1.y, v1.z);
        vertices.push(v2.x, v2.y, v2.z);
        vertices.push(v3.x, v3.y, v3.z);
        if(v4) vertices.push(v4.x, v4.y, v4.z);
            
        normals.push(n.x, n.y, n.z);
        normals.push(n.x, n.y, n.z);
        normals.push(n.x, n.y, n.z);
        if(v4) normals.push(n.x, n.y, n.z);
            
        faces.push(vertexIndex, vertexIndex +1, vertexIndex +2);
        if(v4) {
          faces.push(vertexIndex, vertexIndex +2, vertexIndex +3);
          vertexIndex += 4;
        } else {
          vertexIndex += 3;
        }
      }
      //create and store vertex data
      elem.webGLVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, elem.webGLVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      //create and store faces index data
      elem.webGLFaceBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elem.webGLFaceBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), gl.STATIC_DRAW);
      elem.webGLFaceCount = faces.length;
      //calculate vertex normals and store them
      elem.webGLNormalBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, elem.webGLNormalBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    }
    viewMatrix.multiply(camera.matrix, elem.geometry.matrix);
    //send matrix data
    gl.uniformMatrix4fv(program.viewMatrix, false, viewMatrix.flatten());
    gl.uniformMatrix4fv(program.projectionMatrix, false, camera.projectionMatrix.flatten());
    //send normal matrix for lighting
    var normalMatrix = Matrix4.makeInvert(viewMatrix);
    normalMatrix.$transpose();
    gl.uniformMatrix4fv(program.normalMatrix, false, normalMatrix.flatten());
    //send color data
    var color = $.hexToRgb(elem.getData('color'));
    color.push(opt.getAlpha());
    gl.uniform4f(program.color, color[0] / 255, color[1] / 255, color[2] / 255, color[3]);
    //send lighting data
    gl.uniform1i(program.enableLighting, lighting.enable);
    if(lighting.enable) {
      //set ambient light color
      if(lighting.ambient) {
        var acolor = lighting.ambient;
        gl.uniform3f(program.ambientColor, acolor[0], acolor[1], acolor[2]);
      }
      //set directional light
      if(lighting.directional) {
        var dir = lighting.directional,
            color = dir.color,
            pos = dir.direction,
            vd = new Vector3(pos.x, pos.y, pos.z).normalize().$scale(-1);
        gl.uniform3f(program.lightingDirection, vd.x, vd.y, vd.z);
        gl.uniform3f(program.directionalColor, color[0], color[1], color[2]);
      }
    }
    //send vertices data
    gl.bindBuffer(gl.ARRAY_BUFFER, elem.webGLVertexBuffer);
    gl.vertexAttribPointer(program.position, 3, gl.FLOAT, false, 0, 0);
    //send normals data
    gl.bindBuffer(gl.ARRAY_BUFFER, elem.webGLNormalBuffer);
    gl.vertexAttribPointer(program.normal, 3, gl.FLOAT, false, 0, 0);
    //draw!
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elem.webGLFaceBuffer );
    gl.drawElements(gl.TRIANGLES, elem.webGLFaceCount, gl.UNSIGNED_SHORT, 0);
  }
});
