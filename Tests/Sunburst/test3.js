function init(){
    //init data
  var json = [{
    "id": "node0",
    "name": "node0 name",
    "data": {
      "$angularWidth": 13.077119090372014,
    },
    "adjacencies": [{
        "nodeTo": "node3",
        "data": {}
    }, {
        "nodeTo": "node4",
        "data": {
            "$type":"arrow",
            "$color":"#dd99dd",
            "$dim":25
        }
    }]
  }, {
    "id": "node1",
    "name": "",
    "data": {
      "$type": "none"
    },
    "adjacencies": [{
        "nodeTo": "node0",
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
    }]
  }, {
    "id": "node2",
    "name": "node2 name",
    "data": {
        "$angularWidth": 24.937383149648717,
        "some other key": "some other value"
    },
    "adjacencies": [{
        "nodeTo": "node4",
        "data": {}
    }, {
        "nodeTo": "node5",
        "data": {}
    }]
  }, {
    "id": "node3",
    "name": "node3 name",
    "data": {
        "$angularWidth": 10.53272740718869,
        "some other key": "some other value"
    },
    "adjacencies": [{
        "nodeTo": "node0",
        "data": {}
    }, {
        "nodeTo": "node4",
        "data": {
            "$type":"arrow",
            "$direction": ["node4", "node3"],
            "$dim":25,
            "$color":"#dd99dd"
        }
    }]
  }, {
    "id": "node4",
    "name": "node4 name",
    "data": {
        "$angularWidth": 5.3754347037767345
    },
    "adjacencies": []
  }, {
    "id": "node5",
    "name": "node5 name",
    "data": {
        "$angularWidth": 32.26403873194912
    },
    "adjacencies": []
  }];
    //end
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
    //init Sunburst
    var sb = new $jit.Sunburst({
        'injectInto': 'infovis',
        'width': w,
        'height': h,
        'labels':'Native',
        //Change node and edge styles such as
        //color, width and dimensions.
        Node: {
            dim: 9,
            type:'gradient-multipie',
            color: "#55c",
            overridable: true
        },
        
        Edge: {
          overridable: true,
          type: 'hyperline',
          lineWidth: 3
        },

        Tips: {
          enable: true,
          attachToDOM: false,
          attachToCanvas: true,
          onShow: function(tip, node, elem) {
            tip.innerHTML = node.name + " - " + Math.round(node.getData('angularWidth')) + "%";
          }
        },
        
        NodeStyles: {
          attachToDOM: false,
          attachToCanvas: true,
          stylesHover: {
            'color': '#dddd33'
           }
        },
        
        levelDistance: 110,
        
        //Attach event handlers and add text to the
        //labels. This method is only triggered on label
        //creation
        onCreateLabel: function(domElement, node){
          if(labels === 'HTML') {
            domElement.innerHTML = node.name;
          } else if (labels === 'SVG') {
            domElement.firstChild
            .appendChild(document
              .createTextNode(node.name));
          } 
        },
        //Change node styles when labels are placed
        //or moved.
        onPlaceLabel: function(domElement, node){
          if(labels === 'SVG') {
            var fch = domElement.firstChild;
            var style = fch.style;
            style.display = '';
            style.cursor = 'pointer';
            style.fontSize = "0.8em";
            fch.setAttribute('fill', "#fff");
          } else if(labels === 'HTML') {
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';
            if (node._depth <= 1) {
                style.fontSize = "0.8em";
                style.color = "#ddd";

            } else if(node._depth == 2){
                style.fontSize = "0.7em";
                style.color = "#555";

            } else {
                style.display = 'none';
            }

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
          }
        }
    });
    
    //load JSON data.
    sb.loadJSON(json, 1);
    //compute positions and plot.
    sb.refresh();
    //end
   // sb.config.NodeStyles.onClick(sb.graph.getNode(sb.root));
}
