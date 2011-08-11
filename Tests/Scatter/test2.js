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
      "$y": 50,
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
        margin = this.viz.config.Margin,
        iniWidth = -canvas.width/2,
        iniHeight = canvas.height/2,
        width = canvas.width - margin.left - margin.right - offset,
        height = canvas.height - margin.top - margin.bottom - offset,
        heightDivision = height / (divisions-1),
        widthDivision = width / (divisions-1),
        colors = [conf.oddColor, conf.evenColor];
    ctx.beginPath();
    // painting background of white
    ctx.fillStyle = ctx.strokeStyle= '#ffffff';
    ctx.fillRect(iniWidth, -iniHeight, canvas.width, canvas.height);
    
    for(var i=1; i<=divisions; i++) {
      ctx.fillStyle = colors[i%2];
      ctx[fill](iniWidth + offset, iniHeight - height/divisions * i - offset, width, height/divisions);
      ctx.fillStyle = ctx.strokeStyle = '#000000';
    }

    for(var i=0; i<=divisions-1; i++) {
      // y axis lines
      ctx.moveTo(iniWidth + offset, iniHeight - offset - heightDivision*i);
      ctx.lineTo(iniWidth + offset/1.5, iniHeight - offset - heightDivision*i);
      
      // x axis lines
      ctx.moveTo(iniWidth + offset + widthDivision * i, iniHeight - offset*0.8);
      ctx.lineTo(iniWidth + offset + widthDivision * i, iniHeight - offset);
    }
    
    // DRAWING BASE AXIS
    ctx.fillStyle = ctx.strokeStyle = '#000000';
    // x
    ctx.moveTo(iniWidth + offset, iniHeight - offset);
    ctx.lineTo(iniWidth + offset + height, iniHeight - offset);
    // y
    ctx.moveTo(iniWidth + offset, iniHeight - offset);
    ctx.lineTo(iniWidth + offset, iniHeight - offset - height);

    // drawing legends
    ctx.fillText(conf.legendX, 0, iniHeight - 10);
    ctx.rotate(Math.PI/-2);
    ctx.fillText(conf.legendY, offset, -iniHeight + offset - 10);
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
      top: 40,
      left: 0,
      bottom: 0,
      right: 40
    },
    onAfterCompute: function(viz) {
      var ranges = viz.calculateRanges(),
          base = viz.canvas.canvases[1],
          conf = viz.config,
          ctx = base.getCtx(),
          canvas = base.canvas,
          margin = viz.config.Margin,
          iniWidth = -canvas.width/2,
          iniHeight = canvas.height/2,
          xRange = ranges.xRange,
          yRange = ranges.yRange,
          offset = viz.backgroundConfig.axisOffset,
          width = canvas.width - margin.left - margin.right,
          height = canvas.height - margin.top - margin.bottom,
          numberOfDivisions = viz.backgroundConfig.numberOfDivisions,
          heightDivision = height / numberOfDivisions-1,
          widthDivision = canvas.width / numberOfDivisions-1;

      // cleaning canvas
      var size = sp.canvas.getSize();
      sp.canvas.getCtx(1).clearRect(iniWidth, iniHeight, size.width, size.height);
      base.plot(base);

      // DRAWING NUMBERS
      var interY = yRange / (numberOfDivisions-1),
          startY = ranges.minY,
          interX = xRange / (numberOfDivisions-1),
          startX = ranges.minX,
          membersX = [startX.toFixed(2)],
          membersY = [startY.toFixed(2)];
      for (var i=1; i<numberOfDivisions; i++) {
        startY += interY;
        startX += interX;
        membersX.push(startX.toFixed(2));
        membersY.push(startY.toFixed(2));
      }
      for (var i=1, j=0; i<=numberOfDivisions; i++, j++) {
        ctx.fillText(membersX[j], iniWidth + widthDivision * i - 25, iniHeight - offset/2);
        ctx.fillText(membersY[j], iniWidth, iniHeight - heightDivision * i);
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
