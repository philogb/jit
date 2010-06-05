function init(){
  var json = Feeder.makeTree( {
    idPrefix: "node",
    levelStart: 0,
    levelEnd: 5,
    maxChildrenPerNode: 5,
    minChildrenPerNode: 2,
    counter: 0,
    color: false,
    dim: true
  });
  var startColor = [Math.floor(Math.random()*360), 80, 100]; // HSV
  function setDepthColors(json, depth, area) {
    var color = startColor.slice(0);
    // some rainbowy color according to depth
    color[0] = (color[0] + 30 * depth) % 360;
    // different saturation according to area percentage
    color[1] = area / 2 + 50;
    json.data["$color"] = $jit.util.hsvToHex(color);

    var totalArea = 0;
    for (var i=0; i < json.children.length; i++)
      totalArea += json.children[i].data["$area"];

    for (var i=0; i < json.children.length; i++)
      setDepthColors(json.children[i], depth+1, json.children[i].data["$area"] / totalArea * 100);
  }
  setDepthColors(json, 0, 100);

  var icicle  = new $jit.Icicle( {
    'injectInto': 'infovis',
    //orientation: "v",
    animate: true,
    titleHeight: 10,
    offset: 1,
    cushion: true,

    //Allow tips
    Tips: {
      allow: true,
      //add positioning offsets
      offsetX: 10,
      offsetY: -30,
      //implement the onShow method to
      //add content to the tooltip when a node
      //is hovered
      onShow: function(tip, node, isLeaf, domElement) {
          tip.innerHTML = "<div class=\"tip-title\">" + node.name + "</div>";
      }
    },

    Events: {
      enable: true,
      onClick: function(node) {
        if(node)
          icicle.enter(node);
      },
      onRightClick: function() {
        icicle.out();
      }
    },

    Label: {
      type: labelType // "Native" or "HTML"
    },

    //Add the name of the node in the correponding label
    //and a click handler to move the graph.
    //This method is called once, on label creation.
    onCreateLabel: function(domElement, node){
      if (this.orientation == "h" && node.getData('height') > 15 || this.orientation == "v" && node.getData('width') > 30)
        domElement.innerHTML = node.name;
      var style = domElement.style;
      style.fontSize = '0.9em';
      style.display = '';
      style.cursor = 'pointer';
      style.color = '#333';
      style.border = '1px solid transparent';
      domElement.onmouseover = function() {
        style.border = '1px solid #fff';
      };
      domElement.onmouseout = function() {
        style.border = '1px solid transparent';
      };
    },

    //Change some label dom properties.
    //This method is called each time a label is plotted.
    onPlaceLabel: function(domElement, node){
      var style = domElement.style;
      style.width = node.getData('width') -2 + 'px';
      style.height = node.getData('height') -2 + 'px';
    }
  });

  icicle.loadJSON(json);
  icicle.refresh();
}

