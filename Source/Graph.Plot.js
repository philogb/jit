/*
 * File: Graph.Plot.js
 * 
 * Author: Nicolas Garcia Belmonte
 * 
 * Copyright: Copyright 2008-2009 by Nicolas Garcia Belmonte.
 * 
 * License: BSD License
 * 
 * Homepage: <http://thejit.org>
 * 
 * Version: 1.0.8a
 *
 */


/*
   Object: Graph.Plot

   An abstract object for plotting a generic graph structure.
*/
Graph.Plot = {
    
    Interpolator: {
        'moebius': function(elem, delta, vector) {
            if(delta <= 1 || vector.norm() <= 1) {
				var x = vector.x, y = vector.y;
	            var ans = elem.startPos.getc().moebiusTransformation(vector);
	            elem.pos.setc(ans.x, ans.y);
	            vector.x = x; vector.y = y;
            }           
		},

        'linear': function(elem, delta) {
            var from = elem.startPos.getc(true);
            var to = elem.endPos.getc(true);
            elem.pos.setc((to.x - from.x) * delta + from.x, (to.y - from.y) * delta + from.y);
        },

        'fade:nodes': function(elem, delta) {
            if(delta <= 1 && (elem.endAlpha != elem.alpha)) {
                var from = elem.startAlpha;
                var to   = elem.endAlpha;
                elem.alpha = from + (to - from) * delta;
            }
        },
        
        'fade:vertex': function(elem, delta) {
            var adjs = elem.adjacencies;
            for(var id in adjs) this['fade:nodes'](adjs[id], delta);
        },
        
        'polar': function(elem, delta) {
            var from = elem.startPos.getp(true);
            var to = elem.endPos.getp();
			var ans = to.interpolate(from, delta);
            elem.pos.setp(ans.theta, ans.rho);
        }
    },
    
    //Property: labelsHidden
    //A flag value indicating if node labels are being displayed or not.
    labelsHidden: false,
    //Property: labelContainer
    //Label DOM element
    labelContainer: false,
    //Property: labels
    //Label DOM elements hash.
    labels: {},

    /*
       Method: getLabelContainer
    
       Lazy fetcher for the label container.
    */
    getLabelContainer: function() {
        return this.labelContainer? this.labelContainer : this.labelContainer = document.getElementById(this.viz.config.labelContainer);
    },
    
    /*
       Method: getLabel
    
       Lazy fetcher for the label DOM element.
    */
    getLabel: function(id) {
        return (id in this.labels && this.labels[id] != null)? this.labels[id] : this.labels[id] = document.getElementById(id);
    },
    
    /*
       Method: hideLabels
    
       Hides all labels.
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
    */
    clearLabels: function() {
        for(var id in this.labels) 
            if(!this.viz.graph.hasNode(id)) {
                this.disposeLabel(id);
                delete this.labels[id];
            }
    },
    
    /*
       Method: disposeLabel
    
       Removes a label.
    */
    disposeLabel: function(id) {
        var elem = this.getLabel(id);
        if(elem && elem.parentNode) {
			elem.parentNode.removeChild(elem);
		}  
    },

    /*
       Method: hideLabel
    
       Hides a label having _node.id_ as id.
    */
    hideLabel: function(node, flag) {
		node = $splat(node);
		var st = flag? "" : "none", lab, that = this;
		$each(node, function(n) {
			if(lab = that.getLabel(n.id)) {
			     lab.style.display = st;
			} 
		});
    },

    /*
       Method: sequence
    
       Iteratively performs an action while refreshing the state of the visualization.
    */
    sequence: function(options) {
        var that = this;
		options = $merge({
            condition: $lambda(false),
            step: $empty,
            onComplete: $empty,
            duration: 200
        }, options);

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
       Method: animate
    
       Animates the graph. Depends on the _modes_ assigned to the opt property.
       Modes are Interpolators.
    */
    animate: function(opt, versor) {
        var that = this,
		viz = this.viz,
		graph  = viz.graph,
		GUtil = Graph.Util;
		opt = $merge(viz.controller, opt || {}); 
		
        if(opt.hideLabels) this.hideLabels(true);
        this.animation.setOptions($merge(opt, {
            compute: function(delta) {
				var vector = versor? versor.scale(-delta) : null;
				GUtil.eachNode(graph, function(node) { 
                    for(var i=0; i<opt.modes.length; i++) {
						that.Interpolator[opt.modes[i]](node, delta, vector);
					} 
                });
                that.plot(opt);
            },
            complete: function() {
                GUtil.eachNode(graph, function(node) { 
                    node.startPos.set(node.pos);
                    node.startAlpha = node.alpha;
                });
                if(opt.hideLabels) that.hideLabels(false);
                that.plot(opt);
                opt.onComplete();
                opt.onAfterCompute();
            }       
		})).start();
    },
    
    /*
       Method: plot
    
       Plots a Graph.
    */
    plot: function(opt) {
        var viz = this.viz, 
		aGraph = viz.graph, 
		canvas = viz.canvas, 
		id = viz.root, 
		that = this, 
		ctx = canvas.getCtx(), 
		GUtil = Graph.Util;
        opt = opt || this.viz.controller;
		canvas.clear();
        var T = !!aGraph.getNode(id).visited;
        GUtil.eachNode(aGraph, function(node) {
            GUtil.eachAdjacency(node, function(adj) {
				var nodeTo = adj.nodeTo;
                if(!!nodeTo.visited === T && node.drawn && nodeTo.drawn) {
                    opt.onBeforePlotLine(adj);
                    ctx.save();
                    ctx.globalAlpha = Math.min(Math.min(node.alpha, nodeTo.alpha), adj.alpha);
                    that.plotLine(adj, canvas);
                    ctx.restore();
                    opt.onAfterPlotLine(adj);
                }
            });
            ctx.save();
			if(node.drawn) {
	            ctx.globalAlpha = node.alpha;
	            opt.onBeforePlotNode(node);
	            that.plotNode(node, canvas);
	            opt.onAfterPlotNode(node);
			}
            if(!that.labelsHidden) {
				if(node.drawn && ctx.globalAlpha >= .95) {
					that.plotLabel(canvas, node, opt);
				} else {
					that.hideLabel(node, false);
				}
			}
            ctx.restore();
            node.visited = !T;
        });
    },

    /*
       Method: plotLabel
    
       Plots a label for a given node.
    */
    plotLabel: function(canvas, node, controller) {
		var id = node.id, tag = this.getLabel(id);
        if(!tag && !(tag = document.getElementById(id))) {
            tag = document.createElement('div');
            var container = this.getLabelContainer();
            container.appendChild(tag);
            tag.id = id;
            tag.className = 'node';
            tag.style.position = 'absolute';
            controller.onCreateLabel(tag, node);
            this.labels[node.id] = tag;
        }
		this.placeLabel(tag, node, controller);
    },
	
	/*
       Method: plotNode
    
       Plots a graph node.
    */
    plotNode: function(node, canvas) {
        var nconfig = this.node, data = node.data;
        var cond = nconfig.overridable && data;
        var width = cond && data.$lineWidth || nconfig.lineWidth;
        var color = cond && data.$color || nconfig.color;
        var ctx = canvas.getCtx(), lwidth = ctx.lineWidth;
        var fStyle = ctx.fillStyle, sStyle = ctx.strokeStyle;
        
        ctx.lineWidth = width;
		ctx.fillStyle = color;
		ctx.strokeStyle = color; 

        var f = node.data && node.data.$type || nconfig.type;
        this.nodeTypes[f].call(this, node, canvas);

        ctx.lineWidth = lwidth;
        ctx.fillStyle = fStyle;
        ctx.strokeStyle = sStyle; 
    },
    
    /*
       Method: plotLine
    
       Plots a line.
    */
    plotLine: function(adj, canvas) {
        var econfig = this.edge, data = adj.data;
        var cond = econfig.overridable && data;
        var width = cond && data.$lineWidth || econfig.lineWidth;
        var color = cond && data.$color || econfig.color;
        var ctx = canvas.getCtx(), lwidth = ctx.lineWidth;
        var fStyle = ctx.fillStyle, sStyle = ctx.strokeStyle;
        
        ctx.lineWidth = width;
        ctx.fillStyle = color;
        ctx.strokeStyle = color; 

        var f = adj.data && adj.data.$type || econfig.type;
        this.edgeTypes[f].call(this, adj, canvas);

        ctx.lineWidth = lwidth;
        ctx.fillStyle = fStyle;
        ctx.strokeStyle = sStyle; 
    },    
	
	/*
       Method: fitsInCanvas
    
       Returns _true_ or _false_ if the label for the node is contained on the canvas dom element or not.
    */
    fitsInCanvas: function(pos, canvas) {
        var size = canvas.getSize();
        if(pos.x >= size.width || pos.x < 0 
            || pos.y >= size.height || pos.y < 0) return false;
        return true;                    
    }
};
