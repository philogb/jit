function init(){
  document.getElementById('center-container').style.backgroundColor = '#111';
  // init data
  var json = [
      {
        "adjacencies": [
            "graphnode21", 
            {
              "nodeTo": "graphnode1",
              "nodeFrom": "graphnode0",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode13",
              "nodeFrom": "graphnode0",
              "data": {
                "$color": "#909291"
              }
            }, {
              "nodeTo": "graphnode14",
              "nodeFrom": "graphnode0",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode15",
              "nodeFrom": "graphnode0",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode16",
              "nodeFrom": "graphnode0",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode17",
              "nodeFrom": "graphnode0",
              "data": {
                "$color": "#557EAA"
              }
            }
        ],
        "data": {
          "$color": "#83548B",
          "$type": "sphere",
          "$dim": 10
        },
        "id": "graphnode0",
        "name": "graphnode0"
      }, {
        "adjacencies": [
            {
              "nodeTo": "graphnode2",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode4",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#909291"
              }
            }, {
              "nodeTo": "graphnode5",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#909291"
              }
            }, {
              "nodeTo": "graphnode6",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#909291"
              }
            }, {
              "nodeTo": "graphnode7",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#909291"
              }
            }, {
              "nodeTo": "graphnode8",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#909291"
              }
            }, {
              "nodeTo": "graphnode10",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode11",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#909291"
              }
            }, {
              "nodeTo": "graphnode12",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#909291"
              }
            }, {
              "nodeTo": "graphnode13",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode14",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode15",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode16",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#909291"
              }
            }, {
              "nodeTo": "graphnode17",
              "nodeFrom": "graphnode1",
              "data": {
                "$color": "#557EAA"
              }
            }
        ],
        "data": {
          "$color": "#EBB056",
          "$type": "sphere",
          "$dim": 11
        },
        "id": "graphnode1",
        "name": "graphnode1"
      }, {
        "adjacencies": [
            {
              "nodeTo": "graphnode5",
              "nodeFrom": "graphnode2",
              "data": {
                "$color": "#909291"
              }
            }, {
              "nodeTo": "graphnode9",
              "nodeFrom": "graphnode2",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode18",
              "nodeFrom": "graphnode2",
              "data": {
                "$color": "#557EAA"
              }
            }
        ],
        "data": {
          "$color": "#416D9C",
          "$type": "sphere",
          "$dim": 7
        },
        "id": "graphnode2",
        "name": "graphnode2"
      }, {
        "adjacencies": [
            {
              "nodeTo": "graphnode5",
              "nodeFrom": "graphnode3",
              "data": {
                "$color": "#909291"
              }
            }, {
              "nodeTo": "graphnode9",
              "nodeFrom": "graphnode3",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode10",
              "nodeFrom": "graphnode3",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode12",
              "nodeFrom": "graphnode3",
              "data": {
                "$color": "#557EAA"
              }
            }
        ],
        "data": {
          "$color": "#416D9C",
          "$type": "cube",
          "$dim": 10
        },
        "id": "graphnode3",
        "name": "graphnode3"
      }, {
        "adjacencies": [],
        "data": {
          "$color": "#83548B",
          "$type": "cube",
          "$dim": 11
        },
        "id": "graphnode4",
        "name": "graphnode4"
      }, {
        "adjacencies": [
          {
            "nodeTo": "graphnode9",
            "nodeFrom": "graphnode5",
            "data": {
              "$color": "#909291"
            }
          }
        ],
        "data": {
          "$color": "#C74243",
          "$type": "cube",
          "$dim": 8
        },
        "id": "graphnode5",
        "name": "graphnode5"
      }, {
        "adjacencies": [
            {
              "nodeTo": "graphnode10",
              "nodeFrom": "graphnode6",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode11",
              "nodeFrom": "graphnode6",
              "data": {
                "$color": "#557EAA"
              }
            }
        ],
        "data": {
          "$color": "#83548B",
          "$type": "sphere",
          "$dim": 11
        },
        "id": "graphnode6",
        "name": "graphnode6"
      }, {
        "adjacencies": [],
        "data": {
          "$color": "#EBB056",
          "$type": "cube",
          "$dim": 12
        },
        "id": "graphnode7",
        "name": "graphnode7"
      }, {
        "adjacencies": [],
        "data": {
          "$color": "#C74243",
          "$type": "sphere",
          "$dim": 10
        },
        "id": "graphnode8",
        "name": "graphnode8"
      }, {
        "adjacencies": [],
        "data": {
          "$color": "#83548B",
          "$type": "sphere",
          "$dim": 12
        },
        "id": "graphnode9",
        "name": "graphnode9"
      }, {
        "adjacencies": [
          {
            "nodeTo": "graphnode11",
            "nodeFrom": "graphnode10",
            "data": {
              "$color": "#909291"
            }
          }
        ],
        "data": {
          "$color": "#70A35E",
          "$type": "cube",
          "$dim": 11
        },
        "id": "graphnode10",
        "name": "graphnode10"
      }, {
        "adjacencies": [],
        "data": {
          "$color": "#70A35E",
          "$type": "sphere",
          "$dim": 11
        },
        "id": "graphnode11",
        "name": "graphnode11"
      }, {
        "adjacencies": [],
        "data": {
          "$color": "#83548B",
          "$type": "cube",
          "$dim": 10
        },
        "id": "graphnode12",
        "name": "graphnode12"
      }, {
        "adjacencies": [
          {
            "nodeTo": "graphnode14",
            "nodeFrom": "graphnode13",
            "data": {
              "$color": "#557EAA"
            }
          }
        ],
        "data": {
          "$color": "#EBB056",
          "$type": "sphere",
          "$dim": 7
        },
        "id": "graphnode13",
        "name": "graphnode13"
      }, {
        "adjacencies": [],
        "data": {
          "$color": "#EBB056",
          "$type": "cube",
          "$dim": 12
        },
        "id": "graphnode14",
        "name": "graphnode14"
      }, {
        "adjacencies": [
            {
              "nodeTo": "graphnode16",
              "nodeFrom": "graphnode15",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode17",
              "nodeFrom": "graphnode15",
              "data": {
                "$color": "#557EAA"
              }
            }
        ],
        "data": {
          "$color": "#83548B",
          "$type": "cube",
          "$dim": 11
        },
        "id": "graphnode15",
        "name": "graphnode15"
      }, {
        "adjacencies": [
          {
            "nodeTo": "graphnode17",
            "nodeFrom": "graphnode16",
            "data": {
              "$color": "#557EAA"
            }
          }
        ],
        "data": {
          "$color": "#C74243",
          "$type": "sphere",
          "$dim": 7
        },
        "id": "graphnode16",
        "name": "graphnode16"
      }, {
        "adjacencies": [],
        "data": {
          "$color": "#416D9C",
          "$type": "sphere",
          "$dim": 7
        },
        "id": "graphnode17",
        "name": "graphnode17"
      }, {
        "adjacencies": [
            {
              "nodeTo": "graphnode19",
              "nodeFrom": "graphnode18",
              "data": {
                "$color": "#557EAA"
              }
            }, {
              "nodeTo": "graphnode20",
              "nodeFrom": "graphnode18",
              "data": {
                "$color": "#557EAA"
              }
            }
        ],
        "data": {
          "$color": "#EBB056",
          "$type": "cube",
          "$dim": 9
        },
        "id": "graphnode18",
        "name": "graphnode18"
      }, {
        "adjacencies": [],
        "data": {
          "$color": "#70A35E",
          "$type": "sphere",
          "$dim": 8
        },
        "id": "graphnode19",
        "name": "graphnode19"
      }, {
        "adjacencies": [],
        "data": {
          "$color": "#C74243",
          "$type": "sphere",
          "$dim": 8
        },
        "id": "graphnode20",
        "name": "graphnode20"
      }
  ];
  
  // end
  // init ForceDirected3D
  var n = 0, prefix = 'newnode',
      stop = true, add = false, remove = true;
  
  var fd = new $jit.ForceDirected3D({
    //id of the visualization container
    injectInto: 'infovis',
    type: '3D',
    Scene: {
      Lighting: {
        enable: true,
        ambient: [0.7, 0.6, 0.6],
        directional: {
          direction: { x: 1, y: 0, z: 0 },
          color: [0.8, 0.8, 0.8]
        }
      }
    },
    //Enable zooming and panning
    //by scrolling and DnD
    Navigation: {
      enable: false,
      //Enable panning events only if we're dragging the empty
      //canvas (and not a node).
      panning: 'avoid nodes',
      zooming: 10 //zoom speed. higher is more sensible
    },
    // Change node and edge styles such as
    // color and width.
    // These properties are also set per node
    // with dollar prefixed data-properties in the
    // JSON structure.
    Node: {
      overridable: true,
      type: 'sphere',
      dim: 15,
      color: '#ff1111'
    },
    Edge: {
      type: 'tube',
      color: '#ddd',
      lineWidth: 3
    },
    //Native canvas text styling
    Label: {
      type: 'HTML', //Native or HTML
      size: 10,
      style: 'bold'
    },
    // Add node events
    Events: {
      enable: true,
      type: 'Native',
      i: 0,
      onMouseMove: function(node, eventInfo, e) {
        //if(this.i++ % 3) return;
        var pos = eventInfo.getPos();
        cameraPosition.x += (pos.x - cameraPosition.x) * 0.5;
        cameraPosition.y += (-pos.y - cameraPosition.y) * 0.5;
        fd.plot();
      },
      onMouseWheel: function(delta) {
        cameraPosition.z += -delta * 20;
        fd.plot();
      },
      onClick: function() {
        stop = !stop;
        if(!stop) {
          add = !add;
          remove = !remove;
          add && addNodes();
          remove && removeNodes();
        }
      }
    },
    //Number of iterations for the FD algorithm
    iterations: 200,
    //Edge length
    levelDistance: 100
  });
  var cameraPosition = fd.canvas.canvases[0].camera.position;
  // load JSON data.
  fd.loadJSON(json);
  // compute positions incrementally and animate.
  fd.computeIncremental({
    iter: 40,
    property: 'end',
    onStep: function(perc){
      Log.write(perc + '% loaded...');
    },
    onComplete: function(){
      Log.write('done');
      fd.animate({
        modes: ['linear'],
        transition: $jit.Trans.Elastic.easeOut,
        duration: 2500,
        onComplete: function() {
        }
      });
    }
  });
  
  function addNodes() {
    fd.config.iterations = 50;
    fd.op.sum([{ 
      'id': prefix + n++, 
      'name': '',
      'adjacencies': ['graphnode' + (n % 20)]
    }], {
      type: "fade:con",
      transition: $jit.Trans.Quart.easeOut,
      duration: 300,
      onComplete: function() {
        add && !stop && addNodes();
      }
    });
  }

  function removeNodes() {
    fd.config.iterations = 50;
    var nodeid = "";
    fd.graph.eachNode(function(n) {
      nodeid = n.id;
    });
    fd.op.removeNode(nodeid, {
      type: 'fade:con',
      transition: $jit.Trans.Quart.easeOut,
      duration: 300,
      onComplete: function() {
        remove && !stop && removeNodes();
      }
    });
  }
  
  // end
}
