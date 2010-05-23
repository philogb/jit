Graph.Geom = new Class({

  initialize: function(viz) {
    this.viz = viz;
    this.config = viz.config;
    this.node = viz.config.Node;
    this.edge = viz.config.Edge;
  },
  /*
    Method: translate
    
    Applies a translation to the tree.
  
    Parameters:
  
    pos - A <Complex> number specifying translation vector.
    prop - A <Graph.Node> position property ('pos', 'startPos' or 'endPos').
  
    Example:
  
    (start code js)
      st.geom.translate(new Complex(300, 100), 'endPos');
    (end code)
  */  
  translate: function(pos, prop) {
     prop = $.splat(prop);
     Graph.Util.eachNode(this.viz.graph, function(elem) {
         $.each(prop, function(p) { elem[p].$add(pos); });
     });
  },
  /*
    Hides levels of the tree until it properly fits in canvas.
  */  
  setRightLevelToShow: function(node, canvas) {
     var level = this.getRightLevelToShow(node, canvas), fx = this.viz.labels;
     Graph.Util.eachLevel(node, 0, this.config.levelsToShow, function(n) {
         var d = n._depth - node._depth;
         if(d > level) {
             n.drawn = false; 
             n.exist = false;
             fx.hideLabel(n, false);
         } else {
             n.exist = true;
         }
     });
     node.drawn= true;
  },
  /*
    Returns the right level to show for the current tree in order to fit in canvas.
  */  
  getRightLevelToShow: function(node, canvas) {
     var config = this.config;
   var level = config.levelsToShow;
   var constrained = config.constrained;
     if(!constrained) return level;
     while(!this.treeFitsInCanvas(node, canvas, level) && level > 1) { level-- ; }
     return level;
  }
});