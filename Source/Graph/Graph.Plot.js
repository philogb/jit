/*
 * File: Graph.Plot.js
 *
 * Defines an abstract classes for performing <Graph> rendering and animation.
 *
 */

/*
   Object: Graph.Plot

   Generic <Graph> rendering and animation methods.
   
   Description:

   An abstract class for plotting a generic graph structure.

   Implemented by:

   <Hypertree.Plot>, <RGraph.Plot>, <ST.Plot>.

   Access:

   The subclasses for this abstract class can be accessed by using the _fx_ property of the <Hypertree>, <RGraph>, or <ST> instances created.

   See also:

   <Hypertree.Plot>, <RGraph.Plot>, <ST.Plot>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
Graph.Plot = {
    //Add helpers
    nodeHelper: NodeHelper,
    edgeHelper: EdgeHelper,
    
    Interpolator: {
        //node/edge property parsers
        'map': {
          'color': 'color',
          'width': 'number',
          'height': 'number',
          'dim': 'number',
          'alpha': 'number',
          'lineWidth': 'number',
          'angularWidth':'number',
          'span':'number',
          'valueArray':'array-number',
          'dimArray':'array-number'
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
          'size': 'number'
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

        'node-style': function(elem, props, delta) {
          this['node'](elem, props, delta, 'canvas', 'getCanvasStyle', 'setCanvasStyle');
        },
        
        'edge-style': function(elem, props, delta) {
          this['edge'](elem, props, delta, 'canvas', 'getCanvasStyle', 'setCanvasStyle');  
        }
    },
    
  
    /*
       Method: sequence
    
       Iteratively performs an action while refreshing the state of the visualization.

       Parameters:

       options - Some sequence options like
      
       - _condition_ A function returning a boolean instance in order to stop iterations.
       - _step_ A function to execute on each step of the iteration.
       - _onComplete_ A function to execute when the sequence finishes.
       - _duration_ Duration (in milliseconds) of each step.

      Example:
       (start code js)
        var rg = new RGraph(canvas, config); //can be also Hypertree or ST
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
      Method: prepare
 
      Prepare graph position and other attribute values before performing an Animation. 
      This method is used internally by the Toolkit.
      
      See also:
       
       <Animation>, <Graph.Plot.animate>

    */
    prepare: function(modes) {
      var GUtil = Graph.Util, 
          graph = this.viz.graph,
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
      for(var i=0, len=modes.length; i < len; i++) {
        var elems = modes[i].split(':');
        m[elems.shift()] = elems;
      }
      
      GUtil.eachNode(graph, function(node) { 
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
            GUtil.eachAdjacency(node, function(adj) {
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
    
       Animates a <Graph> by interpolating some <Graph.Nodes> properties.

       Parameters:

       opt - Animation options. This object contains as properties

       - _modes_ (required) An Array of animation types. Possible values are "linear", "polar", "moebius", "node-property" and "edge-property".

       "linear", "polar" and "moebius" animation options will interpolate <Graph.Nodes> "startPos" and "endPos" properties, storing the result in "pos". 
       This means interpolating either cartesian coordinates, either polar coordinates or interpolation via a moebius transformation <http://en.wikipedia.org/wiki/Moebius_transformation> 
       
       "node-property" interpolates nodes' properties like alpha, color, dim, width, height. For this to work <Options.Graph.Node.overridable> must be *true*. 
       Also, this mode is used with the specific node property you want to change. So for example if you'd wanted to change the nodes color and alpha you should write "node-property:alpha:color". 
       To know more about node specific properties check <Options.Node>.
       
        "edge-property" works just like "node-property". To know more about edge properties check <Options.Graph.Edge>
      

       - _duration_ Duration (in milliseconds) of the Animation.
       - _fps_ Frames per second.
       - _hideLabels_ hide labels or not during the animation.

       ...and other <Hypertree>, <RGraph> or <ST> controller methods.

       Example:
       (start code js)
        var rg = new RGraph(canvas, config); //can be also Hypertree or ST
        rg.fx.animate({
          modes: ['linear'],
          hideLabels: false
        }); 
       (end code)
       
       
    */
    animate: function(opt, versor) {
      opt = $.merge(this.viz.config, opt || {});
      var that = this,
      viz = this.viz,
      graph  = viz.graph,
      GUtil = Graph.Util,
      interp = this.Interpolator;
      
      //prepare graph values
      var m = this.prepare(opt.modes);
      
      //animate
      if(opt.hideLabels) this.labels.hideLabels(true);
      this.animation.setOptions($.merge(opt, {
        $animating: false,
        compute: function(delta) {
          GUtil.eachNode(graph, function(node) { 
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
          opt.onAfterCompute();
        }       
      })).start();
    },
    
    /*
      Method: nodeFx
   
      Apply animation to node properties like color, width, height, dim, etc.
  
      Parameters:
  
      options - Animation options. This object contains as properties
      
      - _elements_ The Elements to be transformed. This is an object that has a properties
      
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
     var viz = this.viz,
     graph  = viz.graph,
     GUtil = Graph.Util,
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
     //check if an animation is running and exit
     //if it's not a nodefx one.
     var anim = this.animation;
     if(anim.timer) {
       if(anim.opt.type 
           && anim.opt.type == 'nodefx') {
         anim.stopTimer();
       } else {
         return;
       }
     }
     var props = opt.elements.properties;
     //set end values for nodes
     if(!opt.elements.id) {
       GUtil.eachNode(graph, function(n) {
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
       type:'nodefx'
     }));
   },

    
    /*
       Method: plot
    
       Plots a <Graph>.

       Parameters:

       opt - _optional_ Plotting options.

       Example:

       (start code js)
       var rg = new RGraph(canvas, config); //can be also Hypertree or ST
       rg.fx.plot(); 
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
      GUtil = Graph.Util;
      opt = opt || this.viz.controller;
      opt.clearCanvas && canvas.clear();
        
      var T = !!aGraph.getNode(id).visited;
      GUtil.eachNode(aGraph, function(node) {
        var nodeAlpha = node.getData('alpha');
        GUtil.eachAdjacency(node, function(adj) {
          var nodeTo = adj.nodeTo;
          if(!!nodeTo.visited === T && node.drawn && nodeTo.drawn) {
            !animating && opt.onBeforePlotLine(adj);
            ctx.save();
            ctx.globalAlpha = min(nodeAlpha, 
                nodeTo.getData('alpha'), 
                adj.getData('alpha'));
            that.plotLine(adj, canvas, animating);
            ctx.restore();
            !animating && opt.onAfterPlotLine(adj);
          }
        });
        ctx.save();
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
        ctx.restore();
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
       Graph.Util.eachSubnode(node, function(elem) {
         if(opt.plotSubtree(node, elem) && elem.exist && elem.drawn) {
             var adj = node.getAdjacency(elem.id);
             !animating && opt.onBeforePlotLine(adj);
             ctx.globalAlpha = Math.min(nodeAlpha, elem.getData('alpha'));
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
       
       node - A <Graph.Node>.
       canvas - A <Canvas> element.

    */
    plotNode: function(node, canvas, animating) {
        var f = node.getData('type'), 
            ctxObj = this.node.CanvasStyles;
        if(f != 'none') {
          var width = node.getData('lineWidth'),
              color = node.getData('color'),
              alpha = node.getData('alpha'),
              ctx = canvas.getCtx();
          
          ctx.lineWidth = width;
          ctx.fillStyle = ctx.strokeStyle = color;
          ctx.globalAlpha = alpha;
          
          for(var s in ctxObj) {
            ctx[s] = node.getCanvasStyle(s);
          }

          this.nodeTypes[f].render.call(this, node, canvas, animating);
        }
    },
    
    /*
       Method: plotLine
    
       Plots a line.

       Parameters:

       adj - A <Graph.Adjacence>.
       canvas - A <Canvas> instance.

    */
    plotLine: function(adj, canvas, animating) {
      var f = adj.getData('type'),
          ctxObj = this.edge.CanvasStyles;
      if(f != 'none') {
        var width = adj.getData('lineWidth'),
            color = adj.getData('color'),
            ctx = canvas.getCtx();
        
        ctx.lineWidth = width;
        ctx.fillStyle = ctx.strokeStyle = color;
        
        for(var s in ctxObj) {
          ctx[s] = adj.getCanvasStyle(s);
        }

        this.edgeTypes[f].call(this, adj, canvas, animating);
      }
    }    
  
};

