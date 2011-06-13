Layouts.Scatter = new Class({
  compute: function(prop) {
    this.controller.onBeforeCompute();
    var size = this.canvas.getSize(),
        config = this.config,
        margin = config.Margin,
        width = size.width - margin.left - margin.right,
        height = size.height - margin.top - margin.bottom,
        legendX = this.getLegendX(),
        legendY = this.getLegendY(),
        elemWidth = width / legendX.length,
        elemHeight = height / legendY.length,
        maxX = 0,
        maxY = 0,
        minX = 0,
        minY = 0;
    console.log(size);
    this.graph.eachNode(function(n) {
      var x = n.getData('x'),
          y = n.getData('y');
      maxX = ((x > maxX) ? x : maxX);
      maxY = ((y > maxY) ? x : maxY);
      minX = ((x < minX) ? x : minX);
      minY = ((y < minY) ? y : minY);
      /*
        TODO See a way to do this without two iterations in nodes (using eachNode)
      */
    });
    var x_range = (Math.abs(minX) + Math.abs(maxX)),
        y_range = (Math.abs(minY) + Math.abs(maxY));
    
    this.graph.eachNode(function(n) {
      var x = n.getData('x'),
          y = n.getData('y');
          
      var posx = (x * size.width / x_range) + margin.left - margin.right;
          posy = (-y * size.height / y_range) + margin.top - margin.bottom;
          // y works different in canvas, if it is positive, is below center, and above is negative.
      console.log(posx);
      console.log(posy);
      n.getPos(prop).setc(posx, posy);
      console.log(n);
      n.setData('width', elemWidth);
      n.setData('height', elemHeight);
    });
    // console.log(maxX);
    // console.log(minX);
    // console.log(maxY);
    // console.log(minY);
    this.controller.onAfterCompute();
  },
  
  _get: function(prop) {
    var config = this.config;
    if(config[prop] && config[prop].length) {
      return config[prop];
    }
    var ans = [];
    this.graph.eachNode(function(n) {
      var leg = n.getData(prop);
      if($.indexOf(ans, leg) < 0) {
        ans.push(leg);
      }
    });
    return ans;
  },
  
  getLegendX: function() {
    return this._get('legendX');
  },
  
  getLegendY: function() {
    return this._get('legendY');
  },
  
  getX: function() {
    return this._get('x');
  },
  
  getY: function() {
    return this._get('Y');
  }
});
