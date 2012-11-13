/*
 * File: Graph.Op.js
 *
*/

/*
   Object: Graph.Op

   Perform <Graph> operations like adding/removing <Graph.Nodes> or <Graph.Adjacences>, 
   morphing a <Graph> into another <Graph>, contracting or expanding subtrees, etc.

*/
Graph.Op = {

    options: {
      type: 'nothing',
      duration: 2000,
      hideLabels: true,
      fps:30
    },
    
    initialize: function(viz) {
      this.viz = viz;
    },

    /*
       Method: removeNode
    
       Removes one or more <Graph.Nodes> from the visualization. 
       It can also perform several animations like fading sequentially, fading concurrently, iterating or replotting.

       Parameters:
    
        node - (string|array) The node's id. Can also be an array having many ids.
        opt - (object) Animation options. It's an object with optional properties described below
        type - (string) Default's *nothing*. Type of the animation. Can be "nothing", "replot", "fade:seq",  "fade:con" or "iter".
        duration - Described in <Options.Fx>.
        fps - Described in <Options.Fx>.
        transition - Described in <Options.Fx>.
        hideLabels - (boolean) Default's *true*. Hide labels during the animation.
   
      Example:
      (start code js)
        var viz = new $jit.Viz(options);
        viz.op.removeNode('nodeId', {
          type: 'fade:seq',
          duration: 1000,
          hideLabels: false,
          transition: $jit.Trans.Quart.easeOut
        });
        //or also
        viz.op.removeNode(['someId', 'otherId'], {
          type: 'fade:con',
          duration: 1500
        });
      (end code)
    */
  
    removeNode: function(node, opt) {
        var viz = this.viz;
        var options = $.merge(this.options, viz.controller, opt);
        var n = $.splat(node);
        var i, that, nodeObj;
        switch(options.type) {
            case 'nothing':
                for(i=0; i<n.length; i++) {
                    options.onBeforeRemoveNode(viz.graph.getNode(n[i]));
                    viz.graph.removeNode(n[i]);
                }
                break;
            
            case 'replot':
                this.removeNode(n, { type: 'nothing' });
                viz.labels.clearLabels();
                viz.refresh(true);
                break;
            
            case 'fade:seq': case 'fade':
                that = this;
                //set alpha to 0 for nodes to remove.
                for(i=0; i<n.length; i++) {
                    nodeObj = viz.graph.getNode(n[i]);
                    nodeObj.setData('alpha', 0, 'end');
                }
                viz.fx.animate($.merge(options, {
                    modes: ['node-property:alpha'],
                    onComplete: function() {
                        that.removeNode(n, { type: 'nothing' });
                        viz.labels.clearLabels();
                        viz.reposition();
                        viz.fx.animate($.merge(options, {
                            modes: ['linear']
                        }));
                    }
                }));
                break;
            
            case 'fade:con':
                that = this;
                //set alpha to 0 for nodes to remove. Tag them for being ignored on computing positions.
                for(i=0; i<n.length; i++) {
                    nodeObj = viz.graph.getNode(n[i]);
                    nodeObj.setData('alpha', 0, 'end');
                    nodeObj.ignore = true;
                }
                viz.reposition();
                viz.fx.animate($.merge(options, {
                    modes: ['node-property:alpha', 'linear'],
                    onComplete: function() {
                        that.removeNode(n, { type: 'nothing' });
                        options.onComplete && options.onComplete();
                    }
                }));
                break;
            
            case 'iter':
                that = this;
                viz.fx.sequence({
                    condition: function() { return n.length != 0; },
                    step: function() { that.removeNode(n.shift(), { type: 'nothing' });  viz.labels.clearLabels(); },
                    onComplete: function() { options.onComplete && options.onComplete(); },
                    duration: Math.ceil(options.duration / n.length)
                });
                break;
                
            default: this.doError();
        }
    },
    
    /*
       Method: removeEdge
    
       Removes one or more <Graph.Adjacences> from the visualization. 
       It can also perform several animations like fading sequentially, fading concurrently, iterating or replotting.

       Parameters:
    
       vertex - (array) An array having two strings which are the ids of the nodes connected by this edge (i.e ['id1', 'id2']). Can also be a two dimensional array holding many edges (i.e [['id1', 'id2'], ['id3', 'id4'], ...]).
       opt - (object) Animation options. It's an object with optional properties described below
       type - (string) Default's *nothing*. Type of the animation. Can be "nothing", "replot", "fade:seq",  "fade:con" or "iter".
       duration - Described in <Options.Fx>.
       fps - Described in <Options.Fx>.
       transition - Described in <Options.Fx>.
       hideLabels - (boolean) Default's *true*. Hide labels during the animation.
   
      Example:
      (start code js)
        var viz = new $jit.Viz(options);
        viz.op.removeEdge(['nodeId', 'otherId'], {
          type: 'fade:seq',
          duration: 1000,
          hideLabels: false,
          transition: $jit.Trans.Quart.easeOut
        });
        //or also
        viz.op.removeEdge([['someId', 'otherId'], ['id3', 'id4']], {
          type: 'fade:con',
          duration: 1500
        });
      (end code)
    
    */
    removeEdge: function(vertex, opt) {
        var viz = this.viz;
        var options = $.merge(this.options, viz.controller, opt);
        var v = ($.type(vertex[0]) == 'string')? [vertex] : vertex;
        var i, that, adj;
        switch(options.type) {
            case 'nothing':
                for(i=0; i<v.length; i++)   viz.graph.removeAdjacence(v[i][0], v[i][1]);
                break;
            
            case 'replot':
                this.removeEdge(v, { type: 'nothing' });
                viz.refresh(true);
                break;
            
            case 'fade:seq': case 'fade':
                that = this;
                //set alpha to 0 for edges to remove.
                for(i=0; i<v.length; i++) {
                    adj = viz.graph.getAdjacence(v[i][0], v[i][1]);
                    if(adj) {
                        adj.setData('alpha', 0,'end');
                    }
                }
                viz.fx.animate($.merge(options, {
                    modes: ['edge-property:alpha'],
                    onComplete: function() {
                        that.removeEdge(v, { type: 'nothing' });
                        viz.reposition();
                        viz.fx.animate($.merge(options, {
                            modes: ['linear']
                        }));
                    }
                }));
                break;
            
            case 'fade:con':
                that = this;
                //set alpha to 0 for nodes to remove. Tag them for being ignored when computing positions.
                for(i=0; i<v.length; i++) {
                    adj = viz.graph.getAdjacence(v[i][0], v[i][1]);
                    if(adj) {
                        adj.setData('alpha',0 ,'end');
                        adj.ignore = true;
                    }
                }
                viz.reposition();
                viz.fx.animate($.merge(options, {
                    modes: ['edge-property:alpha', 'linear'],
                    onComplete: function() {
                        that.removeEdge(v, { type: 'nothing' });
                        options.onComplete && options.onComplete();
                    }
                }));
                break;
            
            case 'iter':
                that = this;
                viz.fx.sequence({
                    condition: function() { return v.length != 0; },
                    step: function() { that.removeEdge(v.shift(), { type: 'nothing' }); viz.labels.clearLabels(); },
                    onComplete: function() { options.onComplete(); },
                    duration: Math.ceil(options.duration / v.length)
                });
                break;
                
            default: this.doError();
        }
    },
    
    /*
       Method: sum
    
       Adds a new graph to the visualization. 
       The JSON graph (or tree) must at least have a common node with the current graph plotted by the visualization. 
       The resulting graph can be defined as follows <http://mathworld.wolfram.com/GraphSum.html>

       Parameters:
    
       json - (object) A json tree or graph structure. See also <Loader.loadJSON>.
       opt - (object) Animation options. It's an object with optional properties described below
       type - (string) Default's *nothing*. Type of the animation. Can be "nothing", "replot", "fade:seq",  "fade:con".
       duration - Described in <Options.Fx>.
       fps - Described in <Options.Fx>.
       transition - Described in <Options.Fx>.
       hideLabels - (boolean) Default's *true*. Hide labels during the animation.
   
      Example:
      (start code js)
        //...json contains a tree or graph structure...

        var viz = new $jit.Viz(options);
        viz.op.sum(json, {
          type: 'fade:seq',
          duration: 1000,
          hideLabels: false,
          transition: $jit.Trans.Quart.easeOut
        });
        //or also
        viz.op.sum(json, {
          type: 'fade:con',
          duration: 1500
        });
      (end code)
    
    */
    sum: function(json, opt) {
        var viz = this.viz;
        var options = $.merge(this.options, viz.controller, opt), root = viz.root;
        var graph;
        viz.root = opt.id || viz.root;
        switch(options.type) {
            case 'nothing':
                graph = viz.construct(json);
                graph.eachNode(function(elem) {
                    elem.eachAdjacency(function(adj) {
                        viz.graph.addAdjacence(adj.nodeFrom, adj.nodeTo, adj.data);
                    });
                });
                break;
            
            case 'replot':
                viz.refresh(true);
                this.sum(json, { type: 'nothing' });
                viz.refresh(true);
                break;
            
            case 'fade:seq': case 'fade': case 'fade:con':
                that = this;
                graph = viz.construct(json);

                //set alpha to 0 for nodes to add.
                var fadeEdges = this.preprocessSum(graph);
                var modes = !fadeEdges? ['node-property:alpha'] : ['node-property:alpha', 'edge-property:alpha'];
                viz.reposition();
                if(options.type != 'fade:con') {
                    viz.fx.animate($.merge(options, {
                        modes: ['linear'],
                        onComplete: function() {
                            viz.fx.animate($.merge(options, {
                                modes: modes,
                                onComplete: function() {
                                    options.onComplete();
                                }
                            }));
                        }
                    }));
                } else {
                    viz.graph.eachNode(function(elem) {
                        if (elem.id != root && elem.pos.isZero()) {
                          elem.pos.set(elem.endPos); 
                          elem.startPos.set(elem.endPos);
                        }
                    });
                    viz.fx.animate($.merge(options, {
                        modes: ['linear'].concat(modes)
                    }));
                }
                break;

            default: this.doError();
        }
    },
    
    /*
       Method: morph
    
       This method will transform the current visualized graph into the new JSON representation passed in the method. 
       The JSON object must at least have the root node in common with the current visualized graph.

       Parameters:
    
       json - (object) A json tree or graph structure. See also <Loader.loadJSON>.
       opt - (object) Animation options. It's an object with optional properties described below
       type - (string) Default's *nothing*. Type of the animation. Can be "nothing", "replot", "fade:con".
       duration - Described in <Options.Fx>.
       fps - Described in <Options.Fx>.
       transition - Described in <Options.Fx>.
       hideLabels - (boolean) Default's *true*. Hide labels during the animation.
       id - (string) The shared <Graph.Node> id between both graphs.
       
       extraModes - (optional|object) When morphing with an animation, dollar prefixed data parameters are added to 
                    *endData* and not *data* itself. This way you can animate dollar prefixed parameters during your morphing operation. 
                    For animating these extra-parameters you have to specify an object that has animation groups as keys and animation 
                    properties as values, just like specified in <Graph.Plot.animate>.
   
      Example:
      (start code js)
        //...json contains a tree or graph structure...

        var viz = new $jit.Viz(options);
        viz.op.morph(json, {
          type: 'fade',
          duration: 1000,
          hideLabels: false,
          transition: $jit.Trans.Quart.easeOut
        });
        //or also
        viz.op.morph(json, {
          type: 'fade',
          duration: 1500
        });
        //if the json data contains dollar prefixed params
        //like $width or $height these too can be animated
        viz.op.morph(json, {
          type: 'fade',
          duration: 1500
        }, {
          'node-property': ['width', 'height']
        });
      (end code)
    
    */
    morph: function(json, opt, extraModes) {
        extraModes = extraModes || {};
        var viz = this.viz;
        var options = $.merge(this.options, viz.controller, opt), root = viz.root;
        var graph;
        //TODO(nico) this hack makes morphing work with the Hypertree. 
        //Need to check if it has been solved and this can be removed.
        viz.root = opt.id || viz.root;
        switch(options.type) {
            case 'nothing':
                graph = viz.construct(json);
                graph.eachNode(function(elem) {
                  var nodeExists = viz.graph.hasNode(elem.id);  
                  elem.eachAdjacency(function(adj) {
                    var adjExists = !!viz.graph.getAdjacence(adj.nodeFrom.id, adj.nodeTo.id);
                    viz.graph.addAdjacence(adj.nodeFrom, adj.nodeTo, adj.data);
                    //Update data properties if the node existed
                    if(adjExists) {
                      var addedAdj = viz.graph.getAdjacence(adj.nodeFrom.id, adj.nodeTo.id);
                      for(var prop in (adj.data || {})) {
                        addedAdj.data[prop] = adj.data[prop];
                      }
                    }
                  });
                  //Update data properties if the node existed
                  if(nodeExists) {
                    var addedNode = viz.graph.getNode(elem.id);
                    for(var prop in (elem.data || {})) {
                      addedNode.data[prop] = elem.data[prop];
                    }
                  }
                });
                viz.graph.eachNode(function(elem) {
                    elem.eachAdjacency(function(adj) {
                        if(!graph.getAdjacence(adj.nodeFrom.id, adj.nodeTo.id)) {
                            viz.graph.removeAdjacence(adj.nodeFrom.id, adj.nodeTo.id);
                        }
                    });
                    if(!graph.hasNode(elem.id)) viz.graph.removeNode(elem.id);
                });
                
                break;
            
            case 'replot':
                viz.labels.clearLabels(true);
                this.morph(json, { type: 'nothing' });
                viz.refresh(true);
                viz.refresh(true);
                break;
                
            case 'fade:seq': case 'fade': case 'fade:con':
                that = this;
                graph = viz.construct(json);
                //preprocessing for nodes to delete.
                //get node property modes to interpolate
                var nodeModes = ('node-property' in extraModes) 
                  && $.map($.splat(extraModes['node-property']), 
                      function(n) { return '$' + n; });
                viz.graph.eachNode(function(elem) {
                  var graphNode = graph.getNode(elem.id);   
                  if(!graphNode) {
                      elem.setData('alpha', 1);
                      elem.setData('alpha', 1, 'start');
                      elem.setData('alpha', 0, 'end');
                      elem.ignore = true;
                    } else {
                      //Update node data information
                      var graphNodeData = graphNode.data;
                      for(var prop in graphNodeData) {
                        if(nodeModes && ($.indexOf(nodeModes, prop) > -1)) {
                          elem.endData[prop] = graphNodeData[prop];
                        } else {
                          elem.data[prop] = graphNodeData[prop];
                        }
                      }
                    }
                }); 
                viz.graph.eachNode(function(elem) {
                    if(elem.ignore) return;
                    elem.eachAdjacency(function(adj) {
                        if(adj.nodeFrom.ignore || adj.nodeTo.ignore) return;
                        var nodeFrom = graph.getNode(adj.nodeFrom.id);
                        var nodeTo = graph.getNode(adj.nodeTo.id);
                        if(!nodeFrom.adjacentTo(nodeTo)) {
                            var adj = viz.graph.getAdjacence(nodeFrom.id, nodeTo.id);
                            fadeEdges = true;
                            adj.setData('alpha', 1);
                            adj.setData('alpha', 1, 'start');
                            adj.setData('alpha', 0, 'end');
                            adj._hiding = true;
                        } else if (adj.data.$direction && adj.data.$direction[0] === nodeFrom.id) {
                            // only check one direction (from -> to)
                            if (!nodeFrom.adjacentWithDirectionTo(nodeTo)) {
                                adj._reversing = true;
                            }
                        }
                    });
                }); 
                //preprocessing for adding nodes.
                var fadeEdges = this.preprocessSum(graph);

                var modes = !fadeEdges? ['node-property:alpha'] : 
                                        ['node-property:alpha', 
                                         'edge-property:alpha'];
                //Append extra node-property animations (if any)
                modes[0] = modes[0] + (('node-property' in extraModes)? 
                    (':' + $.splat(extraModes['node-property']).join(':')) : '');
                //Append extra edge-property animations (if any)
                modes[1] = (modes[1] || 'edge-property:alpha') + (('edge-property' in extraModes)? 
                    (':' + $.splat(extraModes['edge-property']).join(':')) : '');
                //Add label-property animations (if any)
                if('label-property' in extraModes) {
                  modes.push('label-property:' + $.splat(extraModes['label-property']).join(':'))
                }
                //only use reposition if its implemented.
                if (viz.reposition) {
                  viz.reposition();
                } else {
                  viz.compute('end');
                }
                this._updateDirectedEdges();

                viz.graph.eachNode(function(elem) {
                    if (elem.id != root && elem.pos.getp().equals(Polar.KER)) {
                      elem.pos.set(elem.endPos); elem.startPos.set(elem.endPos);
                    }
                });
                viz.fx.animate($.merge(options, {
                    modes: [extraModes.position || 'polar'].concat(modes),
                    onComplete: function() {
                        viz.graph.eachNode(function(elem) {
                            if(elem.ignore) viz.graph.removeNode(elem.id);
                        });
                        viz.graph.eachNode(function(elem) {
                            elem.eachAdjacency(function(adj) {
                                if(adj.ignore) viz.graph.removeAdjacence(adj.nodeFrom.id, adj.nodeTo.id);
                            });
                        });
                        options.onComplete();
                    }
                }));
                break;

            default:;
        }
    },

    _updateDirectedEdges: function () {
        var graph = this.viz.graph;
        graph.eachNode(function(node) {
            node.eachAdjacency(function (adj) {

                var isDirectedEdge = adj.data.$direction;
                if (isDirectedEdge && adj.nodeFrom.id !== adj.data.$direction[0]) {
                    return;
                }

                if (adj._hiding) {
                    graph.removeAdjacence(adj.nodeFrom.id, adj.nodeTo.id);
                }

                if (adj._reversing) {
                    var from = adj.nodeFrom.id;
                    var to = adj.nodeTo.id;
//
//                    // swap instead of adding and removing
                    var edge1 = graph.edges[from][to];
                    var edge2 = graph.edges[to][from];

                    edge1.data.$direction = [to, from];
                    edge2.data.$direction = [to, from];

                    adj._reversing = undefined;
                }
            });
        });
    },
    
  /*
    Method: contract
 
    Collapses the subtree of the given node. The node will have a _collapsed=true_ property.
    
    Parameters:
 
    node - (object) A <Graph.Node>.
    opt - (object) An object containing options described below
    type - (string) Whether to 'replot' or 'animate' the contraction.
   
    There are also a number of Animation options. For more information see <Options.Fx>.

    Example:
    (start code js)
     var viz = new $jit.Viz(options);
     viz.op.contract(node, {
       type: 'animate',
       duration: 1000,
       hideLabels: true,
       transition: $jit.Trans.Quart.easeOut
     });
   (end code)
 
   */
    contract: function(node, opt) {
      var viz = this.viz;
      if(node.collapsed || !node.anySubnode($.lambda(true))) return;
      opt = $.merge(this.options, viz.config, opt || {}, {
        'modes': ['node-property:alpha:span', 'linear']
      });
      node.collapsed = true;
      (function subn(n) {
        n.eachSubnode(function(ch) {
          ch.ignore = true;
          ch.setData('alpha', 0, opt.type == 'animate'? 'end' : 'current');
          subn(ch);
        });
      })(node);
      if(opt.type == 'animate') {
        viz.compute('end');
        if(viz.rotated) {
          viz.rotate(viz.rotated, 'none', {
            'property':'end'
          });
        }
        (function subn(n) {
          n.eachSubnode(function(ch) {
            ch.setPos(node.getPos('end'), 'end');
            subn(ch);
          });
        })(node);
        viz.fx.animate(opt);
      } else if(opt.type == 'replot'){
        viz.refresh();
      }
    },
    
    /*
    Method: expand
 
    Expands the previously contracted subtree. The given node must have the _collapsed=true_ property.
    
    Parameters:
 
    node - (object) A <Graph.Node>.
    opt - (object) An object containing options described below
    type - (string) Whether to 'replot' or 'animate'.
     
    There are also a number of Animation options. For more information see <Options.Fx>.

    Example:
    (start code js)
      var viz = new $jit.Viz(options);
      viz.op.expand(node, {
        type: 'animate',
        duration: 1000,
        hideLabels: true,
        transition: $jit.Trans.Quart.easeOut
      });
    (end code)
 
   */
    expand: function(node, opt) {
      if(!('collapsed' in node)) return;
      var viz = this.viz;
      opt = $.merge(this.options, viz.config, opt || {}, {
        'modes': ['node-property:alpha:span', 'linear']
      });
      delete node.collapsed;
      (function subn(n) {
        n.eachSubnode(function(ch) {
          delete ch.ignore;
          ch.setData('alpha', 1, opt.type == 'animate'? 'end' : 'current');
          subn(ch);
        });
      })(node);
      if(opt.type == 'animate') {
        viz.compute('end');
        if(viz.rotated) {
          viz.rotate(viz.rotated, 'none', {
            'property':'end'
          });
        }
        viz.fx.animate(opt);
      } else if(opt.type == 'replot'){
        viz.refresh();
      }
    },

    preprocessSum: function(graph) {
        var viz = this.viz;
        graph.eachNode(function(elem) {
            if(!viz.graph.hasNode(elem.id)) {
                viz.graph.addNode(elem);
                var n = viz.graph.getNode(elem.id);
                n.setData('alpha', 0);
                n.setData('alpha', 0, 'start');
                n.setData('alpha', 1, 'end');
            }
        }); 
        var fadeEdges = false;
        graph.eachNode(function(elem) {
            elem.eachAdjacency(function(adj) {
                var nodeFrom = viz.graph.getNode(adj.nodeFrom.id);
                var nodeTo = viz.graph.getNode(adj.nodeTo.id);
                if(!nodeFrom.adjacentTo(nodeTo)) {
                    var adj = viz.graph.addAdjacence(nodeFrom, nodeTo, adj.data);
                    if(nodeFrom.startAlpha == nodeFrom.endAlpha 
                    && nodeTo.startAlpha == nodeTo.endAlpha) {
                        fadeEdges = true;
                        adj.setData('alpha', 0);
                        adj.setData('alpha', 0, 'start');
                        adj.setData('alpha', 1, 'end');
                    } 
                }
            });
        }); 
        return fadeEdges;
    }
};

