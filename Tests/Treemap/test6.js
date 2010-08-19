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
      "children": []
    }, {
      "id": "Gray",
      "name": "Gray",
      "data": {
        "$area": 9.01,
        "$color": "#808080"
      },
      "children": []
    }, {
      "id": "Orange",
      "name": "Orange",
      "data": {
        "$area": 1,
        "$color": "#FF8C00"
      },
      "children": []
    }, {
      "id": "Green",
      "name": "Green",
      "data": {
        "$area": 19.060000000000002,
        "$color": "#008000"
      },
      "children": [ ]
    }, {
      "id": "Cyan",
      "name": "Cyan",
      "data": {
        "$area": 1,
        "$color": "#00FFFF"
      },
      "children": [ ]
    } ]
  };
  
  var json2 = {
      "id": "root",
      "name": "Colors",
      "data": {},
      "children": [ {
        "id": "Red",
        "name": "Red",
        "data": {
          "$area": 32.01,
          "$color": "#FF00FF"
        },
        "children": []
      }, {
        "id": "Gray",
        "name": "Gray",
        "data": {
          "$area": 29.01,
          "$color": "#87a0cc"
        },
        "children": []
      }, {
        "id": "Orange",
        "name": "Orange",
        "data": {
          "$area": 7,
          "$color": "#CC8C00"
        },
        "children": []
      }, {
        "id": "Green",
        "name": "Green",
        "data": {
          "$area": 19.060000000000002,
          "$color": "#008000"
        },
        "children": [ ]
      }, {
        "id": "Cyan",
        "name": "Cyan",
        "data": {
          "$area": 1,
          "$color": "#00FFFF"
        },
        "children": [ ]
      } ]
    };

  //end
  //init TreeMap
  var tm = new $jit.TM.Squarified({
    //where to inject the visualization
    injectInto: 'infovis',
    //parent box title heights
    titleHeight: 0,
    //enable animations
    animate: true,
    //box offsets
    offset: 1
  });
  tm.loadJSON(json);
  tm.refresh();
  //trigger morph some seconds later
  //animate color, with and height node properties
  //http://thejit.org/static/v20/Docs/files/Graph/Graph-Op-js.html#Graph.Op.morph
  setTimeout(function() {
    tm.op.morph(json2, {
      type: 'fade'
    }, {
      'node-property': ['color', 'width', 'height']
    });
  }, 2500);
  //end
}
