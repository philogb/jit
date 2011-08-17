Layouts.Scatter = new Class({
  compute: function(prop) {
    this.controller.onBeforeCompute();
    var size = this.canvas.getSize(),
        config = this.config,
        margin = config.Margin,
        offset = this.backgroundConfig.axisOffset || 0,
        width = size.width - margin.left - margin.right - offset,
        height = size.height - margin.top - margin.bottom - offset,
        legendX = config.legendX,
        legendY = config.legendY,
        ranges = this.calculateRanges(),
        xRange = ranges.xRange,
        yRange = ranges.yRange,
        minX = ranges.minX,
        minY = ranges.minY,
        that = this;
    this.graph.eachNode(function(n) {
          posx = that.calculateX(n, xRange, size.width, width, minX, margin, offset),
          posy = that.calculateY(n, yRange, size.height, height, minY, margin, offset);
      n.getPos(prop).setc(posx, posy);
    });
    this.controller.onAfterCompute(this);
  },
  
  calculateX: function(node, xRange, canvasWidth, width, minX, margin, offset) {
    var x = node.getData('x'),
        dim = node.getData('dim'),
        delta = (x - minX) / xRange; // delta will range from 0 to 1
    return -canvasWidth / 2 + margin.left + delta * width + offset + dim;
  },
  
  calculateY: function(node, yRange, canvasHeight, height, minY, margin, offset) {
    var y = node.getData('y'),
        dim = node.getData('dim'),
        delta = (y - minY) / yRange; // delta will range from 0 to 1
    return canvasHeight / 2 - margin.bottom - delta * height + offset + dim;
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
    
    return {
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY,
      xRange: maxX - minX,
      yRange: maxY - minY
    };
  }
  
});
