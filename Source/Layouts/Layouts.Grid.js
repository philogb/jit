Layouts.Grid = new Class({
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
        elemHeight = height / legendY.length;
    this.graph.eachNode(function(n) {
      var x = $.indexOf(legendX, n.getData('legendX') || 0) * elemWidth - size.width/2 + margin.left,
          y = $.indexOf(legendY, n.getData('legendY') || 0) * elemHeight - size.height/2 + margin.top;
      n.getPos(prop).setc(x, y);
      n.setData('width', elemWidth);
      n.setData('height', elemHeight);
    });
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
  }
});