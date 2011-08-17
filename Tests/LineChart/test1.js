var json = {
    'label': ['label A', 'label B', 'label C'],
    'values': [
    {
      'label': 'dateA',
      'valuesX': [-100, 0, 100, 150],
      'valuesY': [-100, -40, 55, 105]
    },
    {
      'label': 'dateB',
      'valuesX': [-100, 0, 100, 150],
      'valuesY': [-80, -10, 45, 100]
    },
    {
      'label': 'dateC',
      'valuesX': [-100, 0, 100, 150],
      'valuesY': [-38, -10, 125, 150]
    }]
};

var json2 = {
    'label': ['label A', 'label B', 'label C'],
    'values': [
    {
      'label': 'dateA',
      'valuesX': [-100, 0, 100, 150],
      'valuesY': [-200, -80, 15, 55]
    },
    {
      'label': 'dateB',
      'valuesX': [-100, 0, 100, 150],
      'valuesY': [-10, -50, -90, -150]
    },
    {
      'label': 'dateC',
      'valuesX': [-100, 0, 100, 150],
      'valuesY': [-150, 100, -25, 90]
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
