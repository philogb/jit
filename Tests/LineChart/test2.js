var json = {
    'label': ['label A', 'label B', 'label C'],
    'values': [
    {
      'label': 'dateA',
      'values': [-100, -40, 55, 105],
      'type': 'circle'
    },
    {
      'label': 'dateB',
      'values': [-80, -15, 45, 100],
      'color': 'red'
    },
    {
      'label': 'dateC',
      'values': [-38, -10, 125, 150]
    }]
};

var json2 = {
    'label': ['label A', 'label B', 'label C'],
    'values': [
    {
      'label': 'dateA',
      'values': [-200, -80, 15, 55],
      'type': 'circle'
    },
    {
      'label': 'dateB',
      'values': [-10, -50, -90, -150],
      'color': 'red'
    },
    {
      'label': 'dateC',
      'values': [-150, 100, -25, 90]
    }]
};

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
      Axis: {
        legendX: 'legend X',
        offset: 50,
	linesX: 3
      },
      evenColor:'#f2f2f2',
      oddColor:'#ffffff'
    },
    Node: {
      overridable:true
    },
    Margin: {
      top: 20,
      left: 10,
      bottom: 0,
      right: 40
    },
    onAfterCompute: function(viz) {
      var ranges = viz.calculateRanges(),
	  axis = viz.config.background.Axis,
          base = viz.canvas.canvases[1],
          conf = viz.config,
          ctx = base.getCtx(),
          canvas = base.canvas,
          margin = viz.config.Margin,
          iniWidth = -canvas.width/2,
          iniHeight = canvas.height/2,
          xRange = ranges.xRange,
          yRange = ranges.yRange,
          offset = axis && axis.offset || 0,
          width = canvas.width - margin.left - margin.right,
          height = canvas.height - margin.top - margin.bottom,
          numberOfDivisions = viz.backgroundConfig.numberOfDivisions,
	  linesX = axis && axis.linesX || numberOfDivisions,
	  linesY = axis && axis.linesY || numberOfDivisions,
          heightDivision = height / linesY,
          widthDivision = width*1.3 / linesX;

      // cleaning canvas
      var size = lc.canvas.getSize();
      lc.canvas.getCtx(1).clearRect(iniWidth, iniHeight, size.width, size.height);
      base.plot(base);
      
      // DRAWING NUMBERS
      var interY = yRange / (numberOfDivisions-1),
          startY = ranges.minY,
          interX = xRange / (numberOfDivisions-1),
          startX = ranges.minX,
          membersY = [startY.toFixed(2)],
	  membersX = json.label;
      for (var i=1; i<numberOfDivisions; i++) {
        startY += interY;
        membersY.push(startY.toFixed(2));
      }
      // x numbers
      for (var i=0; i<linesX; i++) {
        ctx.fillText(membersX[i], iniWidth + offset + widthDivision * i, iniHeight - offset/2);
      }
      // y numbers
      for (var i=1, j=0; i<=linesY; i++, j++) {
        ctx.fillText(membersY[j], iniWidth, iniHeight - heightDivision * i);
      }
    }
  });
  lc.loadJSON(json);
  lc.refresh();
  var list = $jit.id('id-list'),
      button = $jit.id('update');

  //update json on click
  var jsoncount = 0;
  var jsons = [json, json2];
  $jit.util.addEvent(button, 'click', function() {
    jsoncount = jsoncount + 1;
    lc.updateJSON(jsons[jsoncount%2]);
  });
}
