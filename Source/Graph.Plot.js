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
    
    Interpolator: {
        //Mapping property to parser
        'map': {
          'color': 'color',
          'width': 'number',
          'height': 'number',
          'lineWidth': 'number',
          'dim': 'number',
          'alpha': 'number',
          'aw':'number'
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
        'number': function(elem, prop, delta) {
          var from = elem.getData(prop, 'start');
          var to = elem.getData(prop, 'end');
          elem.setData(prop, this.compute(from, to, delta));
        },

        'color': function(elem, prop, delta) {
          var from = $hexToRgb(elem.getData(prop, 'start'));
          var to = $hexToRgb(elem.getData(prop, 'end'));
          var comp = this.compute;
          var val = $rgbToHex([parseInt(comp(from[0], to[0], delta)),
                                parseInt(comp(from[1], to[1], delta)),
                                parseInt(comp(from[2], to[2], delta))]);
          
          elem.setData(prop, val);
        },
        
        'node-property': function(elem, props, delta) {
            var map = this.map;
            if(props) {
              var len = props.length;
              for(var i=0; i<len; i++) {
                var pi = props[i];
                this[map[pi]](elem, pi, delta);
              }
            } else {
              for(var pi in map) {
                this[map[pi]](elem, pi, delta);
              }
            }
        },
        
        'edge-property': function(elem, props, delta) {
            var adjs = elem.adjacencies;
            for(var id in adjs) this['node-property'](adjs[id], props, delta);
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
        options = $merge({
          condition: $lambda(false),
          step: $empty,
          onComplete: $empty,
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
      var GUtil = Graph.Util, graph = this.viz.graph;

      //parse modes
      var m = {};
      for(var i=0, len=modes.length; i < len; i++) {
        var elems = modes[i].split(':');
        m[elems.shift()] = elems;
      }
      
      GUtil.eachNode(graph, function(node) { 
        node.startPos.set(node.pos);
        if('node-property' in m) {
          var prop = m['node-property'];
          for(var i=0, l=prop.length; i < l; i++) {
            node.setData(prop[i], node.getData(prop[i]), 'start');
          }
        }
        if('edge-property' in m) {
          var prop = m['edge-property'];
          GUtil.eachAdjacency(node, function(adj) {
            for(var i=0, l=prop.length; i < l; i++) {
              adj.setData(prop[i], adj.getData(prop[i]), 'start');
            }
          });
        }
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
      opt = $merge(this.viz.config, opt || {});
      var that = this,
      viz = this.viz,
      graph  = viz.graph,
      GUtil = Graph.Util,
      interp = this.Interpolator;
      
      //prepare graph values
      var m = this.prepare(opt.modes);
      
      //animate
      if(opt.hideLabels) this.labels.hideLabels(true);
      this.animation.setOptions($merge(opt, {
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
     options = $merge(this.viz.config, {
       'elements': {
         'id': false,
         'properties': {}
       },
       'reposition': false
     });
     opt = $merge(options, opt || {}, {
       onBeforeCompute: $empty,
       onAfterCompute: $empty
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
       var ids = $splat(opt.elements.id);
       $each(ids, function(id) {
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
     this.animate($merge(opt, {
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
            ctx.globalAlpha = min(min(nodeAlpha, 
                nodeTo.getData('alpha')), 
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
       Method: plotNode
    
       Plots a <Graph.Node>.

       Parameters:
       
       node - A <Graph.Node>.
       canvas - A <Canvas> element.

    */
    plotNode: function(node, canvas, animating) {
        var width = node.getData('lineWidth');
        var color = node.getData('color');
        var alpha = node.getData('alpha');
        var ctx = canvas.getCtx();
        
        ctx.lineWidth = width;
        ctx.fillStyle = color;
        ctx.strokeStyle = color; 
        ctx.globalAlpha = alpha;

        var f = node.getData('type');
        this.nodeTypes[f].call(this, node, canvas, animating);
    },
    
    /*
       Method: plotLine
    
       Plots a line.

       Parameters:

       adj - A <Graph.Adjacence>.
       canvas - A <Canvas> instance.

    */
    plotLine: function(adj, canvas, animating) {
        var width = adj.getData('lineWidth');
        var color = adj.getData('color');
        var ctx = canvas.getCtx();
        
        ctx.lineWidth = width;
        ctx.fillStyle = color;
        ctx.strokeStyle = color; 

        var f = adj.getData('type');
        this.edgeTypes[f].call(this, adj, canvas, animating);
    }    
  
};

/*
   Object: Graph.Label

   Generic interface for plotting labels.

   Description:

   This is a generic interface for plotting/hiding/showing labels.
   The <Graph.Label> interface is implemented in multiple ways to provide 
   different label types.

   For example, the Graph.Label interface is implemented as Graph.Label.DOM to provide 
   DOM label elements. Also we provide the Graph.Label.SVG interface (currently not working in IE) 
   for providing SVG type labels. The Graph.Label.Native interface implements these methods with the 
   native Canvas text rendering functions (currently not working in Opera).

   Implemented by:

   <Hypertree.Label>, <RGraph.Label>, <ST.Label>.

   Access:

   The subclasses for this abstract class can be accessed by using the _labels_ property of the <Hypertree>, <RGraph>, or <ST> instances created.

   See also:

   <Hypertree.Plot>, <RGraph.Plot>, <ST.Plot>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/

Graph.Label = {};

/*
   Class: Graph.Label.Native

   Implements labels natively, using the Canvas text API.

   See also:

   <Hypertree.Label>, <RGraph.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
Graph.Label.Native = new Class({
     /*
       Method: plotLabel
    
       Plots a label for a given node.

       Parameters:

       canvas - A <Canvas> instance.
       node - A <Graph.Node>.
       controller - A configuration object. See also <Hypertree>, <RGraph>, <ST>.

    */
    plotLabel: function(canvas, node, controller) {
        var ctx = canvas.getCtx();
        var coord = node.pos.getc(true);
        ctx.fillText(node.name, coord.x, coord.y);
    },

    hideLabel: $empty
});

/*
   Class: Graph.Label.DOM

   Abstract Class implementing some DOM label methods.

   Implemented by:

   <Graph.Label.HTML>, <Graph.Label.SVG>.

   See also:

   <Hypertree.Label>, <RGraph.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
Graph.Label.DOM = new Class({
    //A flag value indicating if node labels are being displayed or not.
    labelsHidden: false,
    //Label container 
    labelContainer: false,
    //Label elements hash.
    labels: {},

    /*
       Method: getLabelContainer
    
       Lazy fetcher for the label container.

       Returns:

       The label container DOM element.

       Example:

      (start code js)
        var rg = new RGraph(canvas, config); //can be also Hypertree or ST
        var labelContainer = rg.fx.getLabelContainer();
        alert(labelContainer.innerHTML);
      (end code)
    */
    getLabelContainer: function() {
        return this.labelContainer? this.labelContainer 
        : this.labelContainer = document
          .getElementById(this.viz.config.labelContainer);
    },
    
    /*
       Method: getLabel
      
       Lazy fetcher for the label element.

       Parameters:

       id - The label id (which is also a <Graph.Node> id).

       Returns:

       The label element.

       Example:

      (start code js)
        var rg = new RGraph(canvas, config); //can be also Hypertree or ST
        var label = rg.fx.getLabel('someid');
        alert(label.innerHTML);
      (end code)
      
    */
    getLabel: function(id) {
        return (id in this.labels && this.labels[id] != null)? this.labels[id] 
          : this.labels[id] = document.getElementById(id);
    },
    
    /*
       Method: hideLabels
    
       Hides all labels (by hiding the label container).

       Parameters:

       hide - A boolean value indicating if the label container must be hidden or not.

       Example:
       (start code js)
        var rg = new RGraph(canvas, config); //can be also Hypertree or ST
        rg.fx.hideLabels(true);
       (end code)
       
    */
    hideLabels: function (hide) {
        var container = this.getLabelContainer();
        if(hide) container.style.display = 'none';
        else container.style.display = '';
        this.labelsHidden = hide;
    },
    
    /*
       Method: clearLabels
    
       Clears the label container.

       Useful when using a new visualization with the same canvas element/widget.

       Parameters:

       force - Forces deletion of all labels.

       Example:
       (start code js)
        var rg = new RGraph(canvas, config); //can be also Hypertree or ST
        rg.fx.clearLabels();
        (end code)
    */
    clearLabels: function(force) {
        for(var id in this.labels) {
            if (force || !this.viz.graph.hasNode(id)) {
                this.disposeLabel(id);
                delete this.labels[id];
            }
        }
    },
    /*
       Method: disposeLabel
    
       Removes a label.

       Parameters:

       id - A label id (which generally is also a <Graph.Node> id).

       Example:
       (start code js)
        var rg = new RGraph(canvas, config); //can be also Hypertree or ST
        rg.fx.disposeLabel('labelid');
       (end code)
    */
    disposeLabel: function(id) {
        var elem = this.getLabel(id);
        if(elem && elem.parentNode) {
          elem.parentNode.removeChild(elem);
        }  
    },

    /*
       Method: hideLabel
    
       Hides the corresponding <Graph.Node> label.
        
       Parameters:

       node - A <Graph.Node>. Can also be an array of <Graph.Nodes>.
       flag - If *true*, nodes will be shown. Otherwise nodes will be hidden.

       Example:
       (start code js)
        var rg = new RGraph(canvas, config); //can be also Hypertree or ST
        rg.fx.hideLabel(rg.graph.getNode('someid'), false);
       (end code)
    */
    hideLabel: function(node, flag) {
      node = $splat(node);
      var st = flag? "" : "none", lab, that = this;
      $each(node, function(n) {
        var lab = that.getLabel(n.id);
        if (lab) {
           lab.style.display = st;
        } 
      });
    },
  /*
       Method: fitsInCanvas
    
       Returns _true_ or _false_ if the label for the node is contained in the canvas dom element or not.

       Parameters:

       pos - A <Complex> instance (I'm doing duck typing here so any object with _x_ and _y_ parameters will do).
       canvas - A <Canvas> instance.
       
       Returns:

       A boolean value specifying if the label is contained in the <Canvas> DOM element or not.

    */
    fitsInCanvas: function(pos, canvas) {
        var size = canvas.getSize();
        if(pos.x >= size.width || pos.x < 0 
            || pos.y >= size.height || pos.y < 0) return false;
        return true;                    
    }
});

/*
   Class: Graph.Label.HTML

   Implements HTML labels.

   Extends:

   <Graph.Label.DOM>.

   See also:

   <Hypertree.Label>, <RGraph.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
Graph.Label.HTML = new Class({
    Implements: Graph.Label.DOM,
    
    /*
       Method: plotLabel
    
       Plots a label for a given node.

       Parameters:

       canvas - A <Canvas> instance.
       node - A <Graph.Node>.
       controller - A configuration object. See also <Hypertree>, <RGraph>, <ST>.

    */
    plotLabel: function(canvas, node, controller) {
        var id = node.id, tag = this.getLabel(id);
        if(!tag && !(tag = document.getElementById(id))) {
            tag = document.createElement('div');
            var container = this.getLabelContainer();
            tag.id = id;
            tag.className = 'node';
            tag.style.position = 'absolute';
            controller.onCreateLabel(tag, node);
            container.appendChild(tag);
            this.labels[node.id] = tag;

            //extras
            var viz = this.viz, config = viz.config;
            if(config.Tips) {
              viz.attachTip(node, tag);
            }
            if(config.nodeStylesOnHover) {
              viz.attachNodeStylesOnHover(node, tag);
            }
            if(config.nodeStylesSelected) {
              viz.attachNodeStylesSelected(node, tag);
            }
        }
        this.placeLabel(tag, node, controller);
    }
});

/*
   Class: Graph.Label.SVG

   Implements SVG labels.

   Extends:

   <Graph.Label.DOM>.

   See also:

   <Hypertree.Label>, <RGraph.Label>, <ST.Label>, <Hypertree>, <RGraph>, <ST>, <Graph>.

*/
Graph.Label.SVG = new Class({
    Implements: Graph.Label.DOM,
    
    /*
       Method: plotLabel
    
       Plots a label for a given node.

       Parameters:

       canvas - A <Canvas> instance.
       node - A <Graph.Node>.
       controller - A configuration object. See also <Hypertree>, <RGraph>, <ST>.

    */
    plotLabel: function(canvas, node, controller) {
        var id = node.id, tag = this.getLabel(id);
        if(!tag && !(tag = document.getElementById(id))) {
            var ns = 'http://www.w3.org/2000/svg';
            tag = document.createElementNS(ns, 'svg:text');
            var tspan = document.createElementNS(ns, 'svg:tspan');
            tag.appendChild(tspan);
            var container = this.getLabelContainer();
            tag.setAttribute('id', id);
            tag.setAttribute('class', 'node');
            container.appendChild(tag);
            controller.onCreateLabel(tag, node);
            this.labels[node.id] = tag;

            //extras
            var viz = this.viz, config = viz.config;
            if(config.Tips) {
              viz.attachTip(node, tag);
            }
            if(config.nodeStylesOnHover) {
              viz.attachNodeStylesOnHover(node, tag);
            }
            if(config.nodeStylesSelected) {
              viz.attachNodeStylesSelected(node, tag);
            }
        }
        this.placeLabel(tag, node, controller);
    }
});

