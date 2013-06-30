var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
  //init data
  var json = [
      //"root" node is invisible
      {
        "id": "node0",
        "name": "",
        "data": {
          "$type": "none"
        },
        "adjacencies": [
            {
              "nodeTo": "node1",
              "data": {
                '$type': 'none'
              }
            }, {
              "nodeTo": "node2",
              "data": {
                '$type': 'none'
              }
            }, {
              "nodeTo": "node3",
              "data": {
                '$type': 'none'
              }
            }, {
              "nodeTo": "node4",
              "data": {
                "$type": "none"
              }
            }, {
              "nodeTo": "node5",
              "data": {
                "$type": "none"
              }
            }, {
              "nodeTo": "node6",
              "data": {
                "$type": "none"
              }
            }, {
              "nodeTo": "node7",
              "data": {
                "$type": "none"
              }
            }, {
              "nodeTo": "node8",
              "data": {
                "$type": "none"
              }
            }, {
              "nodeTo": "node9",
              "data": {
                "$type": "none"
              }
            }, {
              "nodeTo": "node10",
              "data": {
                "$type": "none"
              }
            }
        ]
      }, {
        "id": "node1",
        "name": "node 1",
        "data": {
          "$angularWidth": 13.00,
          "$color": "#33a",
          "$height": 70
        },
        "adjacencies": [
            {
              "nodeTo": "node3",
              "data": {
                "$color": "#ddaacc",
                "$lineWidth": 4
              }
            }, {
              "nodeTo": "node5",
              "data": {
                "$color": "#ccffdd",
                "$lineWidth": 4
              }
            }, {
              "nodeTo": "node7",
              "data": {
                "$color": "#dd99dd",
                "$lineWidth": 4
              }
            }, {
              "nodeTo": "node8",
              "data": {
                "$color": "#dd99dd",
                "$lineWidth": 4
              }
            }, {
              "nodeTo": "node10",
              "data": {
                "$color": "#ddaacc",
                "$lineWidth": 4
              }
            }
        ]
      }, {
        "id": "node2",
        "name": "node 2",
        "data": {
          "$angularWidth": 24.90,
          "$color": "#55b",
          "$height": 73
        },
        "adjacencies": [
            "node8", "node9", "node10"
        ]
      }, {
        "id": "node3",
        "name": "node 3",
        "data": {
          "$angularWidth": 10.50,
          "$color": "#77c",
          "$height": 75
        },
        "adjacencies": [
            "node8", "node9", "node10"
        ]
      }, {
        "id": "node4",
        "name": "node 4",
        "data": {
          "$angularWidth": 5.40,
          "$color": "#99d",
          "$height": 75
        },
        "adjacencies": [
            "node8", "node9", "node10"
        ]
      }, {
        "id": "node5",
        "name": "node 5",
        "data": {
          "$angularWidth": 32.26,
          "$color": "#aae",
          "$height": 80
        },
        "adjacencies": [
            "node8", "node9", "node10"
        ]
      }, {
        "id": "node6",
        "name": "node 6",
        "data": {
          "$angularWidth": 24.90,
          "$color": "#bf0",
          "$height": 85
        },
        "adjacencies": [
            "node8", "node9", "node10"
        ]
      }, {
        "id": "node7",
        "name": "node 7",
        "data": {
          "$angularWidth": 14.90,
          "$color": "#cf5",
          "$height": 85
        },
        "adjacencies": [
            "node8", "node9", "node10"
        ]
      }, {
        "id": "node8",
        "name": "node 8",
        "data": {
          "$angularWidth": 34.90,
          "$color": "#dfa",
          "$height": 80
        },
        "adjacencies": [
            "node9", "node10"
        ]
      }, {
        "id": "node9",
        "name": "node 9",
        "data": {
          "$angularWidth": 42.90,
          "$color": "#CCC",
          "$height": 75
        },
        "adjacencies": [
          "node10"
        ]
      }, {
        "id": "node10",
        "name": "node 10",
        "data": {
          "$angularWidth": 100.90,
          "$color": "#C37",
          "$height": 70
        },
        "adjacencies": []
      }
  ];
  //end
  //init Sunburst
  var sb = new $jit.Sunburst({
    //id container for the visualization
    injectInto: 'infovis',
    //Change node and edge styles such as
    //color, width, lineWidth and edge types
    Node: {
      overridable: true,
      type: useGradients? 'gradient-multipie' : 'multipie'
    },
    Edge: {
      overridable: true,
      type: 'hyperline',
      lineWidth: 2,
      color: '#777'
    },
    //Draw canvas text. Can also be
    //'HTML' or 'SVG' to draw DOM labels
    Label: {
      type: nativeTextSupport? 'Native' : 'SVG'
    },
    //Add animations when hovering and clicking nodes
    NodeStyles: {
      enable: true,
      type: 'Native',
      stylesClick: {
        'color': '#33dddd'
      },
      stylesHover: {
        'color': '#dd3333'
      },
      duration: 700
    },
    Events: {
      enable: true,
      type: 'Native',
      //List node connections onClick
      onClick: function(node, eventInfo, e){
        if (!node) return;
        var html = "<h4>" + node.name + " connections</h4><ul><li>", ans = [];
        node.eachAdjacency(function(adj){
          // if on the same level i.e siblings
            if (adj.nodeTo._depth == node._depth) {
              ans.push(adj.nodeTo.name);
            }
          });
        $jit.id('inner-details').innerHTML = html + ans.join("</li><li>") + "</li></ul>";
      }
    },
    levelDistance: 190,
    // Only used when Label type is 'HTML' or 'SVG'
    // Add text to the labels. 
    // This method is only triggered on label creation
    onCreateLabel: function(domElement, node){
      var labels = sb.config.Label.type;
      if (labels === 'HTML') {
        domElement.innerHTML = node.name;
      } else if (labels === 'SVG') {
        domElement.firstChild.appendChild(document.createTextNode(node.name));
      }
    },
    // Only used when Label type is 'HTML' or 'SVG'
    // Change node styles when labels are placed
    // or moved.
    onPlaceLabel: function(domElement, node){
      var labels = sb.config.Label.type;
      if (labels === 'SVG') {
        var fch = domElement.firstChild;
        var style = fch.style;
        style.display = '';
        style.cursor = 'pointer';
        style.fontSize = "0.8em";
        fch.setAttribute('fill', "#fff");
      } else if (labels === 'HTML') {
        var style = domElement.style;
        style.display = '';
        style.cursor = 'pointer';
        if (node._depth <= 1) {
          style.fontSize = "0.8em";
          style.color = "#ddd";
        } 
        var left = parseInt(style.left);
        var w = domElement.offsetWidth;
        style.left = (left - w / 2) + 'px';
      }
    }
  });
  // load JSON data.
  sb.loadJSON(json);
  // compute positions and plot.
  sb.refresh();
  //end
}
