var json = [
  {
    "id": "node0",
    "name": "event0",
    "data": {
      "$x": -300,
      "$y": 250,
      "$color": "#ccc",
      "$dim":10,
    }
  },
  {
    "id": "node1",
    "name": "event1",
    "adjacencies": ["node0", "node2"],
    "data": {
      "$x": -240,
      "$y": 2,
      "$color": "#4f5f6f"
    }
  },
  {
    "id": "node2",
    "name": "event2",
    "data": {
      "$x": -150,
      "$y": 300,
      "$color": "#4f5f9f",
      "$dim": 5
    }
  },
  {
    "id": "node3",
    "name": "event3",
    "adjacencies": ["node2", "node4"],
    "data": {
      "$x": -100,
      "$y": -260,
      "$color": "#f2ff27"
    }
  },
  {
    "id": "node4",
    "name": "event4",
    "data": {
      "$x": -90,
      "$y": -50,
      "$color": "#c2c3c4",
    }
  },
  {
    "id": "node5",
    "name": "event5",
    "adjacencies": ["node4", "node6"],
    "data": {
      "$x": -14,
      "$y": 0,
      "$color": "#f43f2f"
    }
  },
  {
    "id": "node6",
    "name": "event6",
    "data": {
      "$x": 0,
      "$y": -90,
      "$color": "#8974ac",
      "$dim": 5
    }
  }
]

$jit.Canvas.Background.Grid_Axis = new $jit.Class({
  initialize: function(viz, options) {
    this.viz = viz;
    this.config = $jit.util.merge({
      idSuffix: '-bkcanvas',
      levelDistance: 100,
      numberOfDivisions: 8,
      CanvasStyles: {},
      filled: true,
      legendX: 'x',
      legendY: 'y',
      oddColor: '#f2f2f2',
      evenColor: '#ffffff',
      axisOffset: 50
    }, options);
  },
  resize: function(width, height, base) {
    this.plot(base);
  },
  plot: function(base) {
    var canvas = base.canvas,
        ctx = base.getCtx(),
        conf = this.config,
        styles = conf.CanvasStyles;
    //set canvas styles
    for(var s in styles) ctx[s] = styles[s];
    var n = conf.numberOfDivisions,
        rho = conf.levelDistance,
        fill = (conf.filled) ? 'fillRect' : 'rect',
        offset = conf.axisOffset,
        heightDivision = canvas.height / n,
        widthDivision = (canvas.width - offset) / (n-1),
        colors = [conf.oddColor, conf.evenColor];
    ctx.beginPath();
    // painting background of white
    ctx.fillStyle = ctx.strokeStyle= '#ffffff';
    ctx.fillRect(canvas.width/-2, canvas.height/-2, canvas.width, canvas.height);
    
    for(var i=0; i<=n; i++) {
      ctx.fillStyle = colors[i%2];
      ctx[fill](canvas.width/-2 + conf.axisOffset, canvas.height/2 - (heightDivision*i), canvas.width, heightDivision);
      ctx.fillStyle = ctx.strokeStyle = '#000000';
      // y axis lines
      ctx.moveTo(canvas.width/-2 + offset, canvas.height/2 - (heightDivision*i));
      ctx.lineTo(canvas.width/-2 + offset/1.5, canvas.height/2 - (heightDivision*i));
      // x axis lines
      ctx.moveTo((canvas.width/-2) + offset + (widthDivision*i), canvas.height/2 - offset*1.5);
      ctx.lineTo((canvas.width/-2) + offset + (widthDivision*i), canvas.height/2 - offset);
    }
    
    // DRAWING AXIS
    ctx.fillStyle = ctx.strokeStyle = '#000000';
    ctx.rect(-canvas.width/2 + offset, -canvas.height/2 - (offset*1.5), canvas.width, canvas.height);
    
    // drawing legends
    ctx.fillText(conf.legendX, 0, canvas.width/2 - 10);
    ctx.rotate(Math.PI/-2);
    ctx.fillText(conf.legendY, conf.axisOffset, -canvas.height/2 + offset - 10);
    ctx.rotate(Math.PI/2);
    ctx.stroke();
    ctx.closePath();
  }
});

function init() {
  var lc = new $jit.LineChart({
    //id of the visualization container
    injectInto: 'infovis',
    //Native canvas text styling
    Label: {
      type: 'HTML',
      size: 10,
      style: 'bold',
      color: '#ccc'
    },
    // with animation
    animate: true,
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
      type: 'Grid_Axis',
      CanvasStyles: {
        fillStyle: 'white',
        font: 'bold 12px Arial'
      },
      legendX: 'legend X',
    },
    Node: {
      overridable:true
    },
    Margin: {
      top: 10,
      left: 0,
      bottom: 0,
      right: 0
    },
    onAfterCompute: function(viz) {
      var ranges = viz.calculateRanges(),
          base = viz.canvas.canvases[1],
          conf = viz.config,
          ctx = base.getCtx(),
          canvas = base.canvas,
          xRange = ranges[0],
          yRange = ranges[1],
          offset = viz.backgroundConfig.axisOffset,
          numberOfDivisions = viz.backgroundConfig.numberOfDivisions,
          heightDivision = canvas.height / numberOfDivisions,
          widthDivision = canvas.width / numberOfDivisions;
      // DRAWING NUMBERS
      var interY = yRange / (numberOfDivisions-1),
          startY = -yRange/2,
          interX = xRange / (numberOfDivisions-1),
          startX = -xRange/2,
          membersX = [startX],
          membersY = [startY];
      for (var i=1; i<numberOfDivisions; i++) {
        startY += interY;
        startX += interX;
        membersX.push(Math.round(startX));
        membersY.push(Math.round(startY));
      }
      for (var i=1, j=0; i<=numberOfDivisions; i++, j++) {
        ctx.fillText(membersX[j], canvas.width/-2 + (widthDivision*i)-25, canvas.height/2 - offset/2);
        ctx.fillText(membersY[j], canvas.width/-2, canvas.height/2 - (heightDivision*i) + 10);
      }
    }
  });
  lc.loadJSON(json);
  lc.refresh();
}
