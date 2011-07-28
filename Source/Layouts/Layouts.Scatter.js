Layouts.Scatter = new Class({
  compute: function(prop) {
    this.controller.onBeforeCompute();
    var size = this.canvas.getSize(),
        config = this.config,
        margin = config.Margin,
        width = size.width - margin.left - margin.right,
        height = size.height - margin.top - margin.bottom,
        legendX = config.legendX,
        legendY = config.legendY,
        elemWidth = width / legendX.length,
        elemHeight = height / legendY.length,
        ranges = this.calculateRanges(),
        xRange = ranges[0],
        yRange = ranges[1],
        that = this;
    
    this.graph.eachNode(function(n) {
      var x = n.getData('x'),
          y = n.getData('y'),
          posx = that.calculateX(xRange, x),
          posy = that.calculateY(yRange, y);
      n.getPos(prop).setc(posx, posy);
    });
    this.controller.onAfterCompute(this);
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
  
  calculateX: function(xRange, x) {
    var size = this.canvas.getSize();
    return (x * size.width / xRange) + this.config.Margin.left - this.config.Margin.right;
  },
  
  calculateY: function(yRange, y) {
    var size = this.canvas.getSize();
    return (-y * size.height / yRange) + this.config.Margin.top - this.config.Margin.bottom;
  },
  
  calculateRanges: function() {
    var maxX = 0,
        maxY = 0,
        minX = 0,
        minY = 0;
    this.graph.eachNode(function(n) {
      var x = n.getData('x'),
          y = n.getData('y');
      maxX = ((x > maxX) ? x : maxX);
      maxY = ((y > maxY) ? y : maxY);
      minX = ((x < minX) ? x : minX);
      minY = ((y < minY) ? y : minY);
    });
    var absMinX = Math.abs(minX),
        absMaxX = Math.abs(maxX),
        absMinY = Math.abs(minY),
        absMaxY = Math.abs(maxY);
    
    var xRange = ((absMaxX > absMinX) ? absMaxX*2 : absMinX*2),
        yRange = ((absMaxY > absMinY) ? absMaxY*2 : absMinY*2);
    return [xRange, yRange];
  }
  
});
