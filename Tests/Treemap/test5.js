function init(){
  //init data
  var json = {
    "id": "root",
    "name": "Colors",
    "data": {},
    "children": [ {
      "id": "Red",
      "name": "Red",
      "data": {
        "$area": 32.01,
        "$color": "#FF0000"
      },
      "children": [ {
        "id": "e51919",
        "name": "e51919",
        "data": {
          "$area": 13,
          "$color": "#e51919"
        },
        "children": []
      }, {
        "id": "720c0c",
        "name": "720c0c",
        "data": {
          "$area": 3,
          "$color": "#720c0c"
        },
        "children": []
      }, {
        "id": "eb5252",
        "name": "eb5252",
        "data": {
          "$area": 1,
          "$color": "#eb5252"
        },
        "children": []
      }, {
        "id": "ac1313",
        "name": "ac1313",
        "data": {
          "$area": 13.01,
          "$color": "#ac1313"
        },
        "children": []
      }, {
        "id": "390606",
        "name": "390606",
        "data": {
          "$area": 2,
          "$color": "#390606"
        },
        "children": []
      } ]
    }, {
      "id": "Gray",
      "name": "Gray",
      "data": {
        "$area": 9.01,
        "$color": "#808080"
      },
      "children": [ {
        "id": "7f7f7f",
        "name": "7f7f7f",
        "data": {
          "$area": 1,
          "$color": "#7f7f7f"
        },
        "children": []
      }, {
        "id": "949494",
        "name": "949494",
        "data": {
          "$area": 1.01,
          "$color": "#949494"
        },
        "children": []
      }, {
        "id": "6a6a6a",
        "name": "6a6a6a",
        "data": {
          "$area": 5,
          "$color": "#6a6a6a"
        },
        "children": []
      }, {
        "id": "3f3f3f",
        "name": "3f3f3f",
        "data": {
          "$area": 2,
          "$color": "#3f3f3f"
        },
        "children": []
      } ]
    }, {
      "id": "Orange",
      "name": "Orange",
      "data": {
        "$area": 1,
        "$color": "#FF8C00"
      },
      "children": [ {
        "id": "f2bf8c",
        "name": "f2bf8c",
        "data": {
          "$area": 1,
          "$color": "#f2bf8c"
        },
        "children": []
      } ]
    }, {
      "id": "Pink",
      "name": "Pink",
      "data": {
        "$area": 8.01,
        "$color": "#FF00FF"
      },
      "children": [ {
        "id": "ac135f",
        "name": "ac135f",
        "data": {
          "$area": 3,
          "$color": "#ac135f"
        },
        "children": []
      }, {
        "id": "e5197f",
        "name": "e5197f",
        "data": {
          "$area": 2,
          "$color": "#e5197f"
        },
        "children": []
      }, {
        "id": "720c3f",
        "name": "720c3f",
        "data": {
          "$area": 3.01,
          "$color": "#720c3f"
        },
        "children": []
      } ]
    }, {
      "id": "Green",
      "name": "Green",
      "data": {
        "$area": 19.060000000000002,
        "$color": "#008000"
      },
      "children": [ {
        "id": "5fac13",
        "name": "5fac13",
        "data": {
          "$area": 4,
          "$color": "#5fac13"
        },
        "children": []
      }, {
        "id": "3f720c",
        "name": "3f720c",
        "data": {
          "$area": 11,
          "$color": "#3f720c"
        },
        "children": []
      }, {
        "id": "063906",
        "name": "063906",
        "data": {
          "$area": 1,
          "$color": "#063906"
        },
        "children": []
      }, {
        "id": "0c723f",
        "name": "0c723f",
        "data": {
          "$area": 1.01,
          "$color": "#0c723f"
        },
        "children": []
      }, {
        "id": "9feb52",
        "name": "9feb52",
        "data": {
          "$area": 1.02,
          "$color": "#9feb52"
        },
        "children": []
      }, {
        "id": "06391f",
        "name": "06391f",
        "data": {
          "$area": 1.03,
          "$color": "#06391f"
        },
        "children": []
      } ]
    }, {
      "id": "Cyan",
      "name": "Cyan",
      "data": {
        "$area": 1,
        "$color": "#00FFFF"
      },
      "children": [ {
        "id": "063939",
        "name": "063939",
        "data": {
          "$area": 1,
          "$color": "#063939"
        },
        "children": []
      } ]
    }, {
      "id": "Yellow",
      "name": "Yellow",
      "data": {
        "$area": 5.029999999999999,
        "$color": "#FFFF00"
      },
      "children": [ {
        "id": "ebeb52",
        "name": "ebeb52",
        "data": {
          "$area": 1,
          "$color": "#ebeb52"
        },
        "children": []
      }, {
        "id": "f8f8c5",
        "name": "f8f8c5",
        "data": {
          "$area": 1.01,
          "$color": "#f8f8c5"
        },
        "children": []
      }, {
        "id": "f2f28c",
        "name": "f2f28c",
        "data": {
          "$area": 2,
          "$color": "#f2f28c"
        },
        "children": []
      }, {
        "id": "acac13",
        "name": "acac13",
        "data": {
          "$area": 1.02,
          "$color": "#acac13"
        },
        "children": []
      } ]
    } ]
  };
  //end
  //init TreeMap
  var tm = new $jit.TM.Squarified({
    //where to inject the visualization
    injectInto: 'infovis',
    width: 200,
    height: 210,
    //parent box title heights
    titleHeight: 0,
    levelsToShow: 1,
    //enable animations
    animate: animate,
    //box offsets
    offset: 1,
    //Attach left and right click events
    Events: {
      enable: true,
      onClick: function(node) {
        if(node) tm.enter(node);
      },
      onRightClick: function() {
        tm.out();
      }
    },
    duration: 1000,
    //Enable tips
    Tips: {
      enable: true,
      //add positioning offsets
      offsetX: 20,
      offsetY: 20,
      //implement the onShow method to
      //add content to the tooltip when a node
      //is hovered
      onShow: function(tip, node, isLeaf, domElement) {
        var html = "<div class=\"tip-title\">" + node.name 
          + "</div><div class=\"tip-text\">";
        var data = node.data;
        if(data.playcount) {
          html += "play count: " + data.playcount;
        }
        if(data.image) {
          html += "<img src=\""+ data.image +"\" class=\"album\" />";
        }
        tip.innerHTML =  html; 
      }  
    },
    //Add the name of the node in the correponding label
    //This method is called once, on label creation.
    onCreateLabel: function(domElement, node){
        domElement.innerHTML = node.name;
        var style = domElement.style;
        style.display = '';
        style.border = '1px solid transparent';
        domElement.onmouseover = function() {
          style.border = '1px solid #9FD4FF';
        };
        domElement.onmouseout = function() {
          style.border = '1px solid transparent';
        };
    }
  });
  tm.loadJSON(json);
  tm.refresh();
  //end
  //add events to radio buttons
  var sq = $jit.id('r-sq'),
      st = $jit.id('r-st'),
      sd = $jit.id('r-sd');
  var util = $jit.util;
  util.addEvent(sq, 'change', function() {
    if(!sq.checked) return;
    util.extend(tm, new $jit.Layouts.TM.Squarified);
    tm.refresh();
  });
  util.addEvent(st, 'change', function() {
    if(!st.checked) return;
    util.extend(tm, new $jit.Layouts.TM.Strip);
    tm.layout.orientation = "v";
    tm.refresh();
  });
  util.addEvent(sd, 'change', function() {
    if(!sd.checked) return;
    util.extend(tm, new $jit.Layouts.TM.SliceAndDice);
    tm.layout.orientation = "v";
    tm.refresh();
  });
  //add event to the back button
  var back = $jit.id('back');
  $jit.util.addEvent(back, 'click', function() {
    tm.out();
  });
}
