/*
 * Class: Layouts.PhyloJive
 * 
 * Implements a Tree Layout.
 * 
 * Implemented By:
 * 
 * <PhyloJive>
 * 
 * 
 */
Layouts.PhyloJive = (function() {
  //Layout functions
  var slice = Array.prototype.slice;

  /*
     Calculates the max width and height nodes for a tree level
  */  
  function getBoundaries(graph, config, level, orn, prop) {
    var dim = config.Node;
    var multitree = config.multitree;
    if (dim.overridable) {
      var w = -1, h = -1;
      graph.eachNode(function(n) {
        if (n._depth == level
            && (!multitree || ('$orn' in n.data) && n.data.$orn == orn)) {
          var dw = n.getData('width', prop);
          var dh = n.getData('height', prop);
          w = (w < dw) ? dw : w;
          h = (h < dh) ? dh : h;
        }
      });
      return {
        'width' : w < 0 ? dim.width : w,
        'height' : h < 0 ? dim.height : h
      };
    } else {
      return dim;
    }
  }

  function design(graph, node, prop, config, orn) {
    
    var multitree = config.multitree;
    var auxp = [ 'x', 'y' ], auxs = [ 'width', 'height' ];
    var ind = +(orn == "left" || orn == "right");
    var p = auxp[ind], notp = auxp[1 - ind];

    var cnode = config.Node;
    var s = auxs[ind], nots = auxs[1 - ind];

    var siblingOffset = config.siblingOffset;
    var subtreeOffset = config.subtreeOffset;
    var align = config.align;

    var baseZero = function (pos){ 
  var min = Math.abs(Math.min.apply(this,pos)); 
  for(var i = 0;i<pos.length;i++){
     pos[i]+=min;
  }
  return pos;
    };
//   if ( !graph.maxXpos  ) {
    graph.maxXpos = Number.MIN_VALUE;
//   }
  if ( !graph.maxLen && !graph.minLen && !graph.factor){
  var max = Number.MIN_VALUE , min=Number.MAX_VALUE;
  graph.eachNode( function ( node ) {
    if ( node.data.len < min ){
      min = node.data.len;
    }
    if ( node.data.len > max ){
      max = node.data.len;
    }
  });
  graph.minLen = min;
  graph.maxLen = max;
//  TODO:need to remove hard coding.the number is the width of the canvas.
  var constant = ( config.width / graph.depth.length ) ;
//  var constant = ( 600 / graph.depth.length ) * 20;
  graph.factor = ( constant ) / ( graph.maxLen - graph.minLen );
    }
    function $design(node, maxsize, y, xpos) {
      
      var ymin = Number.MAX_VALUE , ymax= Number.MIN_VALUE ;
      var subnodeVisible = false;
      if ( config.branchLength ) {
        xpos += 10 + (graph.factor * node.data.len) *config.branchMultiplier;
      } else {
        xpos += config.levelDistance ;
      }
      
//  if ( node.collapsed != true) {
      node.eachSubnode(function(n){
        if(n.exist){
          subnodeVisible = true;
          y = $design ( n , null , y, xpos);
          if ( ymin > y.ymid ) {
            ymin = y.ymid;
          }
          if ( ymax < y.ymid ) {
            ymax = y.ymid;
          }
        }
      });
//  }
  
  if ( graph.maxXpos < xpos ) {
    graph.maxXpos = xpos;    
    
  }
  if (subnodeVisible){
    y.ymid = node.getPos( prop )['y'] = ( ymax + ymin ) / 2;
  } else {
    y.ymid = y.ymin = y.ymax = node.getPos( prop )['y'] = ( y.ymax + node.getData( s , prop ) + siblingOffset );
  }

  node.getPos( prop )['x'] = xpos;
  
  // show label for the last visible node in the clade
  if ( !node.data.leaf ) {
    var anyChildVisible = true;
    node.eachLevel ( 1, 1 , function ( n ) {
      if ( !n.exist && !n.drawn ){
        anyChildVisible = false;
      }
    });
    if ( !anyChildVisible ) {
      node.data.display = '';
      node.data.$type = 'triangle';
    } else {
      node.data.display = 'none';
      node.data.$type = 'circle';
    }
  }
  
  return y;
    }
    
    $design(node, false, { ymid : 0 , ymin : 0 , ymax : 0 },0);
    graph.maxXpos += (node.data.$dim +10 ) || 0;
  }


  return new Class({
    /*
    Method: compute
    
    Computes nodes' positions.

     */
    compute : function(property, computeLevels) {
      var prop = property || 'start';
      var node = this.graph.getNode(this.root);
      $.extend(node, {
        'drawn' : true,
        'exist' : true,
        'selected' : true
      });
      NodeDim.compute(this.graph, prop, this.config);
      if (!!computeLevels || !("_depth" in node)) {
        this.graph.computeLevels(this.root, 0, "ignore");
      }
      
      this.computePositions(node, prop);
    },

    computePositions : function(node, prop) {
      var config = this.config;
      var multitree = config.multitree;
      var align = config.align;
      var indent = align !== 'center' && config.indent;
      var orn = config.orientation;
      var orns = multitree ? [ 'top', 'right', 'bottom', 'left' ] : [ orn ];
      var that = this;
      $.each(orns, function(orn) {
        //calculate layout
          design(that.graph, node, prop, that.config, orn, prop);
          var i = [ 'x', 'y' ][+(orn == "left" || orn == "right")];
    var prev;
    if(!prev){
    prev = node;  
    }
        });
    },
    
    computeLeaves : function ( node , leaves) {
      var that = this;
      node.eachSubnode ( function (node) {
  leaves += that.computeLeaves( node , 0 );
      });
      if ( node.data.leaf ) {
  return node.data.leaves = 1;
      }
      return node.data.leaves = leaves;
    }
  });
  
})();