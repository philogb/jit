/*
 * File: Graph.Op.js
 *
 * Defines an abstract class for performing <Graph> Operations.
*/

/*
   Object: Graph.Op

   Generic <Graph> Operations.
   
   Description:

   An abstract class holding unary and binary powerful graph operations such as removingNodes, removingEdges, adding two graphs and morphing.

   Implemented by:

   <Hypertree.Op>, <RGraph.Op> and <ST.Op>.

   Access:

   The subclasses for this abstract class can be accessed by using the _op_ property of the <Hypertree>, <RGraph> or <ST> instances created.

   See also:

   <Hypertree.Op>, <RGraph.Op>, <ST.Op>, <Hypertree>, <RGraph>, <ST>, <Graph>.
*/
Graph.Op = {

    options: {
        type: 'nothing',
        duration: 2000,
    hideLabels: true,
        fps:30
    },
  
    /*
       Method: removeNode
    
       Removes one or more <Graph.Nodes> from the visualization. 
       It can also perform several animations like fading sequentially, fading concurrently, iterating or replotting.

       Parameters:
    
          node - The node's id. Can also be an array having many ids.
          opt - Animation options. It's an object with optional properties
          
          - _type_ Type of the animation. Can be "nothing", "replot", "fade:seq",  "fade:con" or "iter". Default's "nothing".
          - _duration_ Duration of the animation in milliseconds. Default's 2000.
          - _fps_ Frames per second for the animation. Default's 30.
          - _hideLabels_ Hide labels during the animation. Default's *true*.
          - _transition_ Transitions defined in the <Animation> class. Default's the default transition option of the 
          <RGraph>, <Hypertree> or <ST> instance created.
   
      Example:
      (start code js)
        var rg = new RGraph(canvas, config); //could be new ST or new Hypertree also.
        rg.op.removeNode('nodeid', {
          type: 'fade:seq',
          duration: 1000,
          hideLabels: false,
          transition: Trans.Quart.easeOut
        });
        //or also
        rg.op.removeNode(['someid', 'otherid'], {
          type: 'fade:con',
          duration: 1500
        });
      (end code)
    */
  
    removeNode: function(node, opt) {
        var viz = this.viz;
        var options = $merge(this.options, viz.controller, opt);
        var n = $splat(node);
        var i, that, nodeObj;
        switch(options.type) {
            case 'nothing':
                for(i=0; i<n.length; i++) viz.graph.removeNode(n[i]);
                break;
            
            case 'replot':
                this.removeNode(n, { type: 'nothing' });
                viz.fx.clearLabels();
                viz.refresh(true);
                break;
            
            case 'fade:seq': case 'fade':
                that = this;
                //set alpha to 0 for nodes to remove.
                for(i=0; i<n.length; i++) {
                    nodeObj = viz.graph.getNode(n[i]);
                    nodeObj.endAlpha = 0;
                }
                viz.fx.animate($merge(options, {
                    modes: ['fade:nodes'],
                    onComplete: function() {
                        that.removeNode(n, { type: 'nothing' });
                        viz.fx.clearLabels();
                        viz.reposition();
                        viz.fx.animate($merge(options, {
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
                    nodeObj.endAlpha = 0;
                    nodeObj.ignore = true;
                }
                viz.reposition();
                viz.fx.animate($merge(options, {
                    modes: ['fade:nodes', 'linear'],
                    onComplete: function() {
                        that.removeNode(n, { type: 'nothing' });
                    }
                }));
                break;
            
            case 'iter':
                that = this;
                viz.fx.sequence({
                    condition: function() { return n.length != 0; },
                    step: function() { that.removeNode(n.shift(), { type: 'nothing' });  viz.fx.clearLabels(); },
                    onComplete: function() { options.onComplete(); },
                    duration: Math.ceil(options.duration / n.length)
                });
                break;
                
            default: this.doError();
        }
    },
    
    /*
       Method: removeEdge
    
       Removes one or more edges from the visualization. 
       It can also perform several animations like fading sequentially, fading concurrently, iterating or replotting.

       Parameters:
    
       vertex - An array having two strings which are the ids of the nodes connected by this edge (i.e ['id1', 'id2']). Can also be a two dimensional array holding many edges (i.e [['id1', 'id2'], ['id3', 'id4'], ...]).
          opt - Animation options. It's an object with optional properties
          
          - _type_ Type of the animation. Can be "nothing", "replot", "fade:seq",  "fade:con" or "iter". Default's "nothing".
          - _duration_ Duration of the animation in milliseconds. Default's 2000.
          - _fps_ Frames per second for the animation. Default's 30.
          - _hideLabels_ Hide labels during the animation. Default's *true*.
          - _transition_ Transitions defined in the <Animation> class. Default's the default transition option of the 
          <RGraph>, <Hypertree> or <ST> instance created.
   
      Example:
      (start code js)
        var rg = new RGraph(canvas, config); //could be new ST or new Hypertree also.
        rg.op.removeEdge(['nodeid', 'otherid'], {
          type: 'fade:seq',
          duration: 1000,
          hideLabels: false,
          transition: Trans.Quart.easeOut
        });
        //or also
        rg.op.removeEdge([['someid', 'otherid'], ['id3', 'id4']], {
          type: 'fade:con',
          duration: 1500
        });
      (end code)
    
    */
    removeEdge: function(vertex, opt) {
        var viz = this.viz;
        var options = $merge(this.options, viz.controller, opt);
        var v = ($type(vertex[0]) == 'string')? [vertex] : vertex;
        var i, that, adjs;
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
                    adjs = viz.graph.getAdjacence(v[i][0], v[i][1]);
                    if(adjs) {
                        adjs[0].endAlpha = 0;
                        adjs[1].endAlpha = 0;
                    }
                }
                viz.fx.animate($merge(options, {
                    modes: ['fade:vertex'],
                    onComplete: function() {
                        that.removeEdge(v, { type: 'nothing' });
                        viz.reposition();
                        viz.fx.animate($merge(options, {
                            modes: ['linear']
                        }));
                    }
                }));
                break;
            
            case 'fade:con':
                that = this;
                //set alpha to 0 for nodes to remove. Tag them for being ignored when computing positions.
                for(i=0; i<v.length; i++) {
                    adjs = viz.graph.getAdjacence(v[i][0], v[i][1]);
                    if(adjs) {
                        adjs[0].endAlpha = 0;
                        adjs[0].ignore = true;
                        adjs[1].endAlpha = 0;
                        adjs[1].ignore = true;
                    }
                }
                viz.reposition();
                viz.fx.animate($merge(options, {
                    modes: ['fade:vertex', 'linear'],
                    onComplete: function() {
                        that.removeEdge(v, { type: 'nothing' });
                    }
                }));
                break;
            
            case 'iter':
                that = this;
                viz.fx.sequence({
                    condition: function() { return v.length != 0; },
                    step: function() { that.removeEdge(v.shift(), { type: 'nothing' }); viz.fx.clearLabels(); },
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
       
       The json graph (or tree) must at least have a common node with the current graph plotted by the visualization. 
       
       The resulting graph can be defined as follows <http://mathworld.wolfram.com/GraphSum.html>

       Parameters:
    
          json - A json tree or graph structure. See also <Loader.loadJSON>.
           opt - Animation options. It's an object with optional properties
          
          - _type_ Type of the animation. Can be "nothing", "replot", "fade:seq" or "fade:con". Default's "nothing".
          - _duration_ Duration of the animation in milliseconds. Default's 2000.
          - _fps_ Frames per second for the animation. Default's 30.
          - _hideLabels_ Hide labels during the animation. Default's *true*.
          - _transition_ Transitions defined in the <Animation> class. Default's the default transition option of the 
          <RGraph>, <Hypertree> or <ST> instance created.
   
      Example:
      (start code js)
        //json contains a tree or graph structure.

        var rg = new RGraph(canvas, config); //could be new ST or new Hypertree also.
        rg.op.sum(json, {
          type: 'fade:seq',
          duration: 1000,
          hideLabels: false,
          transition: Trans.Quart.easeOut
        });
        //or also
        rg.op.sum(json, {
          type: 'fade:con',
          duration: 1500
        });
      (end code)
    
    */
    sum: function(json, opt) {
        var viz = this.viz;
        var options = $merge(this.options, viz.controller, opt), root = viz.root;
        var GUtil, graph;
        viz.root = opt.id || viz.root;
        switch(options.type) {
            case 'nothing':
                graph = viz.construct(json);
                GUtil = Graph.Util;
                GUtil.eachNode(graph, function(elem) {
                    GUtil.eachAdjacency(elem, function(adj) {
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
                GUtil = Graph.Util;
                that = this;
                graph = viz.construct(json);

                //set alpha to 0 for nodes to add.
                var fadeEdges = this.preprocessSum(graph);
                var modes = !fadeEdges? ['fade:nodes'] : ['fade:nodes', 'fade:vertex'];
                viz.reposition();
                if(options.type != 'fade:con') {
                    viz.fx.animate($merge(options, {
                        modes: ['linear'],
                        onComplete: function() {
                            viz.fx.animate($merge(options, {
                                modes: modes,
                                onComplete: function() {
                                    options.onComplete();
                                }
                            }));
                        }
                    }));
                } else {
                    GUtil.eachNode(viz.graph, function(elem) {
                        if (elem.id != root && elem.pos.getp().equals(Polar.KER)) {
                          elem.pos.set(elem.endPos); elem.startPos.set(elem.endPos);
                        }
                    });
                    viz.fx.animate($merge(options, {
                        modes: ['linear'].concat(modes)
                    }));
                }
                break;

            default: this.doError();
        }
    },
    
    /*
       Method: morph
    
       This method will _morph_ the current visualized graph into the new _json_ representation passed in the method. 
       
       Can also perform multiple animations. The _json_ object must at least have the root node in common with the current visualized graph.

       Parameters:
    
           json - A json tree or graph structure. See also <Loader.loadJSON>.
           opt - Animation options. It's an object with optional properties
          
          - _type_ Type of the animation. Can be "nothing", "replot", or "fade". Default's "nothing".
          - _duration_ Duration of the animation in milliseconds. Default's 2000.
          - _fps_ Frames per second for the animation. Default's 30.
          - _hideLabels_ Hide labels during the animation. Default's *true*.
          - _transition_ Transitions defined in the <Animation> class. Default's the default transition option of the 
          <RGraph>, <Hypertree> or <ST> instance created.
   
      Example:
      (start code js)
        //json contains a tree or graph structure.

        var rg = new RGraph(canvas, config); //could be new ST or new Hypertree also.
        rg.op.morph(json, {
          type: 'fade',
          duration: 1000,
          hideLabels: false,
          transition: Trans.Quart.easeOut
        });
        //or also
        rg.op.morph(json, {
          type: 'fade',
          duration: 1500
        });
      (end code)
    
    */
    morph: function(json, opt) {
        var viz = this.viz;
        var options = $merge(this.options, viz.controller, opt), root = viz.root;
        var GUtil, graph;
        viz.root = opt.id || viz.root;
        switch(options.type) {
            case 'nothing':
                graph = viz.construct(json);
                GUtil = Graph.Util;
                GUtil.eachNode(graph, function(elem) {
                    GUtil.eachAdjacency(elem, function(adj) {
                        viz.graph.addAdjacence(adj.nodeFrom, adj.nodeTo, adj.data);
                    });
                });
                GUtil.eachNode(viz.graph, function(elem) {
                    GUtil.eachAdjacency(elem, function(adj) {
                        if(!graph.getAdjacence(adj.nodeFrom.id, adj.nodeTo.id)) {
                            viz.graph.removeAdjacence(adj.nodeFrom.id, adj.nodeTo.id);
                        }
                    });
                    if(!graph.hasNode(elem.id)) viz.graph.removeNode(elem.id);
                });
                
                break;
            
            case 'replot':
                viz.refresh(true);
                this.morph(json, { type: 'nothing' });
                viz.fx.clearLabels();
                viz.refresh(true);
                break;
                
            case 'fade:seq': case 'fade': case 'fade:con':
                GUtil = Graph.Util;
                that = this;
                graph = viz.construct(json);
                //preprocessing for adding nodes.
                var fadeEdges = this.preprocessSum(graph);
                //preprocessing for nodes to delete.
                GUtil.eachNode(viz.graph, function(elem) {
                    if(!graph.hasNode(elem.id)) {
                        elem.alpha = 1; elem.startAlpha = 1; elem.endAlpha = 0; elem.ignore = true;
                    }
                }); 
                GUtil.eachNode(viz.graph, function(elem) {
                    if(elem.ignore) return;
                    GUtil.eachAdjacency(elem, function(adj) {
                        if(adj.nodeFrom.ignore || adj.nodeTo.ignore) return;
                        var nodeFrom = graph.getNode(adj.nodeFrom.id);
                        var nodeTo = graph.getNode(adj.nodeTo.id);
                        if(!nodeFrom.adjacentTo(nodeTo)) {
                            var adjs = viz.graph.getAdjacence(nodeFrom.id, nodeTo.id);
                            fadeEdges = true;
                            adjs[0].alpha = 1; adjs[0].startAlpha = 1; adjs[0].endAlpha = 0; adjs[0].ignore = true;
                            adjs[1].alpha = 1; adjs[1].startAlpha = 1; adjs[1].endAlpha = 0; adjs[1].ignore = true;
                        }
                    });
                }); 
                var modes = !fadeEdges? ['fade:nodes'] : ['fade:nodes', 'fade:vertex'];
                viz.reposition();
                GUtil.eachNode(viz.graph, function(elem) {
                    if (elem.id != root && elem.pos.getp().equals(Polar.KER)) {
                      elem.pos.set(elem.endPos); elem.startPos.set(elem.endPos);
                    }
                });
                viz.fx.animate($merge(options, {
                    modes: ['polar'].concat(modes),
                    onComplete: function() {
                        GUtil.eachNode(viz.graph, function(elem) {
                            if(elem.ignore) viz.graph.removeNode(elem.id);
                        });
                        GUtil.eachNode(viz.graph, function(elem) {
                            GUtil.eachAdjacency(elem, function(adj) {
                                if(adj.ignore) viz.graph.removeAdjacence(adj.nodeFrom.id, adj.nodeTo.id);
                            });
                        });
                        options.onComplete();
                    }
                }));
                break;

            default: this.doError();
        }
    },
    
    preprocessSum: function(graph) {
        var viz = this.viz;
    var GUtil = Graph.Util;
        GUtil.eachNode(graph, function(elem) {
            if(!viz.graph.hasNode(elem.id)) {
                viz.graph.addNode(elem);
                var n = viz.graph.getNode(elem.id);
                n.alpha = 0; n.startAlpha = 0; n.endAlpha = 1;
            }
        }); 
        var fadeEdges = false;
        GUtil.eachNode(graph, function(elem) {
            GUtil.eachAdjacency(elem, function(adj) {
                var nodeFrom = viz.graph.getNode(adj.nodeFrom.id);
                var nodeTo = viz.graph.getNode(adj.nodeTo.id);
                if(!nodeFrom.adjacentTo(nodeTo)) {
                    var adjs = viz.graph.addAdjacence(nodeFrom, nodeTo, adj.data);
                    if(nodeFrom.startAlpha == nodeFrom.endAlpha 
                    && nodeTo.startAlpha == nodeTo.endAlpha) {
                        fadeEdges = true;
                        adjs[0].alpha = 0; adjs[0].startAlpha = 0; adjs[0].endAlpha = 1;
                        adjs[1].alpha = 0; adjs[1].startAlpha = 0; adjs[1].endAlpha = 1;
                    } 
                }
            });
        }); 
        return fadeEdges;
    }
};

