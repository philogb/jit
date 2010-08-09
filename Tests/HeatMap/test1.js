var json = [
  {
    "id": "node0",
    "name": "event0",
    "data": {
      "$legendX": "2010-01-01",
      "$legendY": "category0",
      "$color": "#ccc"
    }
  },
  {
    "id": "node1",
    "name": "event1",
    "data": {
      "$legendX": "2010-01-01",
      "$legendY": "category2",
      "$color": "#456"      
    }
  },
  {
    "id": "node2",
    "name": "event2",
    "data": {
      "$legendX": "2010-01-02",
      "$legendY": "category1",
      "$color": "#459"
    }
  },
  {
    "id": "node3",
    "name": "event3",
    "data": {
      "$legendX": "2010-01-02",
      "$legendY": "category2",
      "$color": "#ff7"
    }
  },
  {
    "id": "node4",
    "name": "event4",
    "data": {
      "$legendX": "2010-01-03",
      "$legendY": "category0",
      "$color": "#234"
    }
  },
  {
    "id": "node5",
    "name": "event5",
    "data": {
      "$legendX": "2010-01-04",
      "$legendY": "category2",
      "$color": "#432"
    }
  },
  {
    "id": "node6",
    "name": "event6",
    "data": {
      "$legendX": "2010-01-05",
      "$legendY": "category0",
      "$color": "#8974ac"
    }
  },
  {
    "id": "node7",
    "name": "event7",
    "data": {
      "$legendX": "2010-01-05",
      "$legendY": "category1",
      "$color": "#f974af"      
    }
  },
  {
    "id": "node8",
    "name": "event8",
    "data": {
      "$legendX": "2010-01-06",
      "$legendY": "category0",
      "$color": "#29acf4"
    }
  },
  {
    "id": "node9",
    "name": "event9",
    "data": {
      "$legendX": "2010-01-06",
      "$legendY": "category1",
      "$color": "#459aca"
    }
  },
  {
    "id": "node10",
    "name": "event10",
    "data": {
      "$legendX": "2010-01-07",
      "$legendY": "category1",
      "$color": "#888aaa"
    }
  },
  {
    "id": "node11",
    "name": "event11",
    "data": {
      "$legendX": "2010-01-08",
      "$legendY": "category2",
      "$color": "#674fde"
    }
  },
  {
    "id": "node12",
    "name": "event12",
    "data": {
      "$legendX": "2010-01-09",
      "$legendY": "category3",
      "$color": "#333111"
    }
  }
];

$jit.Canvas.Background.Grid = new $jit.Class({
  initialize: function(viz, options) {
    this.viz = viz;
    this.config = $jit.util.merge({
      idSuffix: '-bkcanvas',
      angleLegendX: 0,
      angleLegendY: 0,
      marginLegendX: 0,
      marginLegendY: 0
    }, options);
  },
  resize: function(width, height, base) {
    this.plot(base);
  },
  plot: function(base) {
    if(!this.viz.graph) return;
    var canvas = base.canvas,
        ctx = base.getCtx(),
        conf = this.config,
        styles = conf.CanvasStyles;
    //set canvas styles
    for(var s in styles) ctx[s] = styles[s];

    var viz = this.viz,
        lx = viz.getLegendX(),
        ly = viz.getLegendY(),
        config = viz.config,
        margin = config.Margin,
        size = base.getSize(),
        width = size.width - margin.left - margin.right,
        height = size.height - margin.top - margin.bottom,
        stripeHeight = height / (ly.length || 1),
        bandWidth = width / (lx.length || 1);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    if(conf.angleLegendX) {
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
    } else {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    }
    for(var i=0, l=lx.length; i<l; i++) {
      if(conf.angleLegendX) {
        ctx.save();
        ctx.translate(-size.width/2 + margin.left + i * bandWidth + bandWidth/2, 
            size.height/2 - margin.bottom + conf.marginLegendX);
        ctx.rotate(-conf.angleLegendX);
        ctx.fillText(lx[i], 0, 0);
        ctx.restore();
      } else {
        ctx.fillText(lx[i], -size.width/2 + margin.left + i * bandWidth + bandWidth/2, 
            size.height/2 - margin.bottom + conf.marginLegendX);
      }
    }
    if(conf.angleLegendY) {
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
    } else {
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
    }
    for(var i=0, l=ly.length; i<l; i++) {
      if(conf.angleLegendY) {
        ctx.save();
        ctx.translate(-size.width/2 + margin.left - conf.marginLegendY, 
            -size.height/2 + i * stripeHeight + margin.top + stripeHeight /2);
        ctx.rotate(-conf.angleLegendY);
        ctx.fillText(ly[i], 0, 0);
        ctx.restore();
      } else {
        ctx.fillText(ly[i], -size.width/2 + margin.left - conf.marginLegendY, 
            -size.height/2 + i * stripeHeight + margin.top + stripeHeight /2);
      }
    }
  }
});

function init() {
  var hm = new $jit.HeatMap({
    //id of the visualization container
    injectInto: 'infovis',
    //Native canvas text styling
    Label: {
      type: 'HTML',
      size: 10,
      style: 'bold',
      color: '#ccc'
    },
    Events: {
      enable: true,
      type: 'Native',
      onMouseEnter: function(node) {
        console.log(node);
      },
      onMouseLeave: function(node) {
        console.log(node);
      },
      onClick: function(node) {
        console.log(node);
      }
    },
    background: {
      type: 'Grid',
      CanvasStyles: {
        fillStyle: 'white',
        font: 'bold 12px Arial'
      },
      angleLegendX: Math.PI/4,
      angleLegendY: 0,
      marginLegendX: 10,
      marginLegendY: 10
    },
    Margin: {
      top: 0,
      left: 70,
      bottom: 70,
      right: 0
    }
  });

  hm.loadJSON(json);
  hm.refresh();
  hm.canvas.canvases[1].plot();
}
