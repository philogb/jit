/*
 * File: Layouts.js
 * 
 * Implements base Tree and Graph layouts.
 *
 * Description:
 *
 * Implements base Tree and Graph layouts like Radial, Tree, etc.
 * 
 */

/*
 * Object: Layouts
 * 
 * Parent object for common layouts.
 *
 */
var Layouts = {};

/*
 * Class: Layouts.Radial
 * 
 * Implements a Radial Layout.
 * 
 * Implemented By:
 * 
 * <RGraph>, <Hypertree>
 * 
 */
Layouts.Radial = new Class({

  /*
   * Method: compute
   * 
   * Computes nodes' positions.
   * 
   * Parameters:
   * 
   * property - _optional_ A <Graph.Node> position property to store the new
   * positions. Possible values are 'pos', 'endPos' or 'startPos'.
   * 
   */
  compute : function(property) {
    var prop = property || [ 'pos', 'startPos', 'endPos' ];
    Graph.Util.computeLevels(this.graph, this.root, 0, "ignore");
    var lengthFunc = this.createLevelDistanceFunc(); 
    this.computeAngularWidths();
    this.computePositions(prop, lengthFunc);
  },

  /*
   * computePositions
   * 
   * Performs the main algorithm for computing node positions.
   */
  computePositions : function(property, getLength) {
    var propArray = $splat(property);
    var aGraph = this.graph;
    var GUtil = Graph.Util;
    var root = this.graph.getNode(this.root);
    var parent = this.parent;
    var config = this.config;

    for ( var i = 0; i < propArray.length; i++)
      root[propArray[i]] = $P(0, 0);

    root.angleSpan = {
      begin : 0,
      end : 2 * Math.PI
    };
    root._rel = 1;

    GUtil.eachBFS(this.graph, this.root, function(elem) {
      var angleSpan = elem.angleSpan.end - elem.angleSpan.begin;
      var angleInit = elem.angleSpan.begin;
      var len = getLength(elem);
      //Calculate the sum of all angular widths
      var totalAngularWidths = 0, subnodes = [];
      GUtil.eachSubnode(elem, function(sib) {
        totalAngularWidths += sib._treeAngularWidth;
        subnodes.push(sib);
      }, "ignore");
      //Maintain children order
      //Second constraint for <http://bailando.sims.berkeley.edu/papers/infovis01.htm>
      if (parent && parent.id == elem.id && subnodes.length > 0
          && subnodes[0].dist) {
        subnodes.sort(function(a, b) {
          return (a.dist >= b.dist) - (a.dist <= b.dist);
        });
      }
      //Calculate nodes' positions.
      for (var k = 0; k < subnodes.length; k++) {
        var child = subnodes[k];
        if (!child._flag) {
          child._rel = child._treeAngularWidth / totalAngularWidths;
          var angleProportion = child._rel * angleSpan;
          var theta = angleInit + angleProportion / 2;

          for ( var i = 0; i < propArray.length; i++)
            child[propArray[i]] = $P(theta, len);

          child.angleSpan = {
            begin : angleInit,
            end : angleInit + angleProportion
          };
          angleInit += angleProportion;
        }
      }
    }, "ignore");
  },

  /*
   * Method: setAngularWidthForNodes
   * 
   * Sets nodes angular widths.
   */
  setAngularWidthForNodes : function() {
    var config = this.config.Node;
    var overridable = config.overridable;
    var dim = config.dim;

    Graph.Util.eachBFS(this.graph, this.root, function(elem, i) {
      var diamValue = (overridable && elem.data && elem.data.$aw) || dim;
      elem._angularWidth = diamValue / i;
    }, "ignore");
  },

  /*
   * Method: setSubtreesAngularWidth
   * 
   * Sets subtrees angular widths.
   */
  setSubtreesAngularWidth : function() {
    var that = this;
    Graph.Util.eachNode(this.graph, function(elem) {
      that.setSubtreeAngularWidth(elem);
    }, "ignore");
  },

  /*
   * Method: setSubtreeAngularWidth
   * 
   * Sets the angular width for a subtree.
   */
  setSubtreeAngularWidth : function(elem) {
    var that = this, nodeAW = elem._angularWidth, sumAW = 0;
    Graph.Util.eachSubnode(elem, function(child) {
      that.setSubtreeAngularWidth(child);
      sumAW += child._treeAngularWidth;
    }, "ignore");
    elem._treeAngularWidth = Math.max(nodeAW, sumAW);
  },

  /*
   * Method: computeAngularWidths
   * 
   * Computes nodes and subtrees angular widths.
   */
  computeAngularWidths : function() {
    this.setAngularWidthForNodes();
    this.setSubtreesAngularWidth();
  }

});