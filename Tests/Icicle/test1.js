function init(){
  var get = function(id){
    return document.getElementById(id);
  };

  var json = Feeder.makeTree( {
    idPrefix: "node",
    levelStart: 0,
    levelEnd: 7,
    maxChildrenPerNode: 5,
    minChildrenPerNode: 0,
    counter: 0,
    color: false,
    dim: true
  });

  icicle  = new $jit.Icicle( {
    'injectInto': 'infovis',
    //orientation: "v",
    animate: true,
    titleHeight: 10,
    offset: 1,

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
      type: "HTML"
    },

    //Add the name of the node in the correponding label
    //and a click handler to move the graph.
    //This method is called once, on label creation.
    onCreateLabel: function(domElement, node){
      if (this.orientation == "h" && node.getData('height') > 15 || this.orientation == "v" && node.getData('width') > 30)
        domElement.innerHTML = node.name;
      var style = domElement.style;
      style.display = '';
      //style.cursor = 'pointer';
      style.color = '#333';
      style.border = '1px solid transparent';
      domElement.onmouseover = function() {
        style.border = '2px solid #9FD4FF';
      };
      domElement.onmouseout = function() {
        style.border = 'none';
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

