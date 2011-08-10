var json = [
  {
    "id": "node1",
    "name": "event1",
    "data": {
      "$legendX": "2010-01-01",
      "$legendY": "category2",
      "$x": -100,
      "$y": 12,
      "$color": "#4f5f6f",
      "$dim":5,
    }
  },
  {
    "id": "node2",
    "name": "event2",
    "data": {
      "$x": 25,
      "$y": 148,
      "$legendX": "2010-01-02",
      "$legendY": "category1",
      "$dim": 5,
      "$color": "#4f5f9f",
    }
  },
  {
    "id": "node4",
    "name": "event4",
    "data": {
      "$legendX": "2010-01-03",
      "$legendY": "category0",
      "$x": 67,
      "$y": 84,
      "$color": "#c2c3c4",
    }
  },
  {
    "id": "node5",
    "name": "event5",
    "data": {
      "$legendX": "2010-01-04",
      "$legendY": "category2",
      "$x": 34,
      "$y": 150,
      "$color": "#f43f2f"
    }
  },
  {
    "id": "node6",
    "name": "event6",
    "data": {
      "$legendX": "2010-01-05",
      "$legendY": "category0",
      "$x": 25,
      "$y": 56,
      "$color": "#8974ac"
    }
  },
  {
    "id": "node7",
    "name": "event7",
    "data": {
      "$legendX": "2010-01-05",
      "$legendY": "category1",
      "$x": 93,
      "$y": 7,
      "$color": "#f974af"
    }
  },
  {
    "id": "node8",
    "name": "event8",
    "data": {
      "$legendX": "2010-01-06",
      "$legendY": "category0",
      "$x": 46,
      "$y": 80,
      "$color": "#29acf4"
    }
  },
  {
    "id": "node9",
    "name": "event9",
    "data": {
      "$legendX": "2010-01-06",
      "$legendY": "category1",
      "$x": 63,
      "$y": 91,
      "$color": "#459aca"
    }
  },
  {
    "id": "node10",
    "name": "event10",
    "data": {
      "$legendX": "2010-01-07",
      "$legendY": "category1",
      "$x": 77,
      "$y": 11,
      "$color": "#888aaa"
    }
  }
];

var json2 = [
  {
    "id": "node1",
    "name": "event1",
    "data": {
      "$legendX": "2010-01-01",
      "$legendY": "category2",
      "$x": 50,
      "$y": 2,
      "$color": "#4f5f6f",
      "$dim":10,
    }
  },
  {
    "id": "node2",
    "name": "event2",
    "data": {
      "$x": -25,
      "$y": 250,
      "$legendX": "2010-01-02",
      "$legendY": "category1",
      "$color": "#4f5f9f",
      "$dim": 5
    }
  },
  {
    "id": "node4",
    "name": "event4",
    "data": {
      "$legendX": "2010-01-03",
      "$legendY": "category0",
      "$x": -200,
      "$y": -50,
      "$color": "#c2c3c4",
      "$dim": 5,
    }
  },
  {
    "id": "node5",
    "name": "event5",
    "data": {
      "$legendX": "2010-01-04",
      "$legendY": "category2",
      "$x": -14,
      "$y": 0,
      "$color": "#f43f2f"
    }
  },
  {
    "id": "node6",
    "name": "event6",
    "data": {
      "$legendX": "2010-01-05",
      "$legendY": "category0",
      "$x": 50,
      "$y": -10,
      "$color": "#8974ac"
    }
  },
  {
    "id": "node7",
    "name": "event7",
    "data": {
      "$legendX": "2010-01-05",
      "$legendY": "category1",
      "$x": 93,
      "$y": 7,
      "$color": "#f974af"
    }
  },
  {
    "id": "node8",
    "name": "event8",
    "data": {
      "$legendX": "2010-01-06",
      "$legendY": "category0",
      "$x": 46,
      "$y": 80,
      "$color": "#29acf4"
    }
  },
  {
    "id": "node9",
    "name": "event9",
    "data": {
      "$legendX": "2010-01-06",
      "$legendY": "category1",
      "$x": 63,
      "$y": 91,
      "$color": "#459aca"
    }
  },
  {
    "id": "node10",
    "name": "event10",
    "data": {
      "$legendX": "2010-01-07",
      "$legendY": "category1",
      "$x": 77,
      "$y": 11,
      "$color": "#888aaa"
    }
  }
];

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
    var divisions = conf.numberOfDivisions,
        rho = conf.levelDistance,
        fill = (conf.filled) ? 'fillRect' : 'rect',
        offset = conf.axisOffset,
        heightDivision = canvas.height / divisions,
        widthDivision = (canvas.width - offset) / (divisions-1),
        colors = [conf.oddColor, conf.evenColor];
    ctx.beginPath();
    // painting background of white
    ctx.fillStyle = ctx.strokeStyle= '#ffffff';
    ctx.fillRect(canvas.width/-2, canvas.height/-2, canvas.width, canvas.height);
    
    for(var i=0; i<=divisions-1; i++) {
      ctx.fillStyle = colors[i%2];
      ctx[fill](canvas.width/-2 + conf.axisOffset, canvas.height/2 - (heightDivision*i), canvas.width, heightDivision);
      ctx.fillStyle = ctx.strokeStyle = '#000000';
      // y axis lines
      ctx.moveTo(canvas.width/-2 + offset, -canvas.height/2 + heightDivision*i);
      ctx.lineTo(canvas.width/-2 + offset/1.5, -canvas.height/2 + heightDivision*i);
      
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
  var sp = new $jit.Scatter({
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
      top: 20,
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
          xRange = ranges.xRange,
          yRange = ranges.yRange,
          offset = viz.backgroundConfig.axisOffset,
          numberOfDivisions = viz.backgroundConfig.numberOfDivisions,
          heightDivision = canvas.height / numberOfDivisions,
          widthDivision = canvas.width / numberOfDivisions;

      // DRAWING NUMBERS
      var size = sp.canvas.getSize();
      sp.canvas.getCtx(1).clearRect(-size.width / 2, -size.height / 2, size.width, size.height);
      base.plot(base);

      var interY = yRange / (numberOfDivisions-1),
          startY = ranges.minY,
          interX = xRange / (numberOfDivisions-1),
          startX = ranges.minX,
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
  sp.loadJSON(json);
  sp.refresh();
  
  var list = $jit.id('id-list'),
      button = $jit.id('update');

  //update json on click
  var jsoncount = 0;
  var jsons = [json, json2];
  $jit.util.addEvent(button, 'click', function() {
    jsoncount = jsoncount + 1;
    sp.updateJSON(jsons[jsoncount%2]);
  });
}
