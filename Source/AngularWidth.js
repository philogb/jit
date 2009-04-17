/*
 * File: AngularWidth.js
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
   Object: AngularWidth

   Provides utility methods for calculating angular widths.
*/
var AngularWidth = {
    /*
     Method: setAngularWidthForNodes
    
     Sets nodes angular widths.
    */
    setAngularWidthForNodes: function() {
        var config = this.config;
		var overridable = config.overridable;
		var dim = config.Node.dim;
        
		Graph.Util.eachBFS(this.graph, this.root, function(elem, i) {
            var diamValue = (overridable 
			 && elem.data 
			 && elem.data.$dim) || dim;
            elem._angularWidth = diamValue / i;
        }, "ignore");
    },
    
    /*
     Method: setSubtreesAngularWidths
    
     Sets subtrees angular widths.
    */
    setSubtreesAngularWidth: function() {
        var that = this;
        Graph.Util.eachNode(this.graph, function(elem) {
            that.setSubtreeAngularWidth(elem);
        }, "ignore");
    },
    
    /*
     Method: setSubtreeAngularWidth
    
     Sets the angular width for a subtree.
    */
    setSubtreeAngularWidth: function(elem) {
        var that = this, nodeAW = elem._angularWidth, sumAW = 0;
        Graph.Util.eachSubnode(elem, function(child) {
            that.setSubtreeAngularWidth(child);
            sumAW += child._treeAngularWidth;
        }, "ignore");
        elem._treeAngularWidth = Math.max(nodeAW, sumAW);
    },
    
    /*
     Method: computeAngularWidths
    
     Computes nodes and subtrees angular widths.
    */
    computeAngularWidths: function () {
        this.setAngularWidthForNodes();
        this.setSubtreesAngularWidth();
    }
	
};
