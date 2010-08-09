var json = [
  {
    "id": "node0",
    "name": "event0",
    "data": {
      "$legendX": "2010-01-01",
      "$legendY": "category0"
    },
    "adjacencies": ["node1", "node3", "node4"]
  },
  {
    "id": "node1",
    "name": "event1",
    "data": {
      "$legendX": "2010-01-01",
      "$legendY": "category2"
    }
  },
  {
    "id": "node2",
    "name": "event2",
    "data": {
      "$legendX": "2010-01-02",
      "$legendY": "category1"
    }
  },
  {
    "id": "node3",
    "name": "event3",
    "data": {
      "$legendX": "2010-01-02",
      "$legendY": "category2"
    }
  },
  {
    "id": "node4",
    "name": "event4",
    "data": {
      "$legendX": "2010-01-03",
      "$legendY": "category0"
    }
  },
  {
    "id": "node5",
    "name": "event5",
    "data": {
      "$legendX": "2010-01-04",
      "$legendY": "category2"
    }
  },
  {
    "id": "node6",
    "name": "event6",
    "data": {
      "$legendX": "2010-01-05",
      "$legendY": "category0"
    }
  },
  {
    "id": "node7",
    "name": "event7",
    "data": {
      "$legendX": "2010-01-05",
      "$legendY": "category1"
    }
  },
  {
    "id": "node8",
    "name": "event8",
    "data": {
      "$legendX": "2010-01-06",
      "$legendY": "category0"
    }
  },
  {
    "id": "node9",
    "name": "event9",
    "data": {
      "$legendX": "2010-01-06",
      "$legendY": "category1"
    }
  },
  {
    "id": "node10",
    "name": "event10",
    "data": {
      "$legendX": "2010-01-07",
      "$legendY": "category1"
    }
  },
  {
    "id": "node11",
    "name": "event11",
    "data": {
      "$legendX": "2010-01-08",
      "$legendY": "category2"
    },
    "adjacencies": ["node12"]
  },
  {
    "id": "node12",
    "name": "event12",
    "data": {
      "$legendX": "2010-01-09",
      "$legendY": "category3"
    }
  }
];

$jit.Canvas.Background.Grid = new $jit.Class({
  initialize: function(viz, options) {
    this.viz = viz;
    this.config = $jit.util.merge({
      idSuffix: '-bkcanvas'
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
        colors = config.colors,
        colorsLen = colors.length,
        size = base.getSize(),
        width = size.width - margin.left - margin.right,
        height = size.height - margin.top - margin.bottom,
        stripeHeight = height / (ly.length || 1),
        bandWidth = width / (lx.length || 1);
    
    for(var i=0, l=ly.length; i<l; i++) {
      ctx.fillStyle = colors[i % colorsLen];
      ctx.fillRect(-size.width/2 + margin.left, -size.height/2 + i * stripeHeight + margin.top, width, stripeHeight);
    }
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for(var i=0, l=lx.length; i<l; i++) {
      ctx.fillText(lx[i], -size.width/2 + margin.left + i * bandWidth + bandWidth/2, size.height/2 - 8);
    }
  }
});

function init() {
  var tg = new $jit.TimeGraph({
    //id of the visualization container
    injectInto: 'infovis',
    //Native canvas text styling
    Label: {
      type: 'Native',
      size: 10,
      style: 'bold',
      color: '#ccc'
    },
    Node: {
      color: 'rgba(0, 0, 0, 0.2)',
      CanvasStyles: {
        shadowBlur: 15,
        shadowColor: '#000',
        shadowOffsetY: 0,
        shadowOffsetX: 0
      }
    },
    Edge: {
      type: 'arrow',
      color: '#dd99dd',
      lineWidth: 2
    },
    background: {
      type: 'Grid'
    },
    Margin: {
      top: 0,
      left: 0,
      bottom: 20,
      right: 0
    },
    nodeOffsetWidth: 30,
    nodeOffsetHeight: 30
  });

  tg.loadJSON(json);
  tg.refresh();
  tg.canvas.canvases[1].plot();
}
