var json = {
    'label': ['label A', 'label B', 'label C'],
    'values': [
    {
      'label': 'dateA',
      'values': [20, 40, 15, 5]
    }, 
    {
      'label': 'dateB',
      'values': [30, 10, 45, 10]
    }, 
    {
      'label': 'dateE',
      'values': [38, 20, 35, 17]
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
}