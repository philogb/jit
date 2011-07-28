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
      "$y": 250,
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
  },
  {
    "id": "node7",
    "name": "event7",
    "adjacencies": ["node6", "node8"],
    "data": {
      "$x": 43,
      "$y": 7,
      "$color": "#f974af"
    }
  },
  {
    "id": "node8",
    "name": "event8",
    "data": {
      "$x": 96,
      "$y": -300,
      "$color": "#29acf4"
    }
  },
  {
    "id": "node9",
    "name": "event9",
    "adjacencies": ["node8", "node10"],
    "data": {
      "$x": 133,
      "$y": 91,
      "$color": "#459aca",
      "$dim": 9
    }
  },
  {
    "id": "node10",
    "name": "event10",
    "data": {
      "$x": 170,
      "$y": 11,
      "$color": "#888aaa"
    }
  },
  {
    "id": "node11",
    "name": "event11",
    "adjacencies": ["node10", "node12"],
    "data": {
      "$x": 238,
      "$y": -45,
      "$color": "#674fde"
    }
  },
  {
    "id": "node12",
    "name": "event12",
    "data": {
      "$x": 269,
      "$y": -30,
      "$color": "#333111"
    }
  }
];

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