function init(){
  var get = function(id){
    return document.getElementById(id);
  };

  var json = Feeder.makeTree({
    idPrefix: "node",
    levelStart: 0,
    levelEnd: 3,
    maxChildrenPerNode: 40,
    minChildrenPerNode: 1,
    counter: 0,
    color: false,
    dim: true
  });

  tm = new $jit.TM.Squarified( {
    'injectInto': 'infovis',
    // orientation: "v",
    titleHeight: 10,
    offset: 1,
    Navigation: {
      enable:true,
      panning:true,
      zooming:0.05
    },
    Label: {
      type: 'Native'
    },
    //Allow tips
    Tips: {
      enable: true,
      //add positioning offsets
      offsetX: 20,
      offsetY: 20,
      //implement the onShow method to
      //add content to the tooltip when a node
      //is hovered
      onShow: function(tip, node, isLeaf, domElement) {
          tip.innerHTML = "<div class=\"tip-title\">" + node.name + "</div>"; 
      }  
    },

    //Add the name of the node in the correponding label
    //and a click handler to move the graph.
    //This method is called once, on label creation.
    onCreateLabel: function(domElement, node){
        domElement.innerHTML = node.name;
        var style = domElement.style;
        style.display = '';
        style.cursor = 'pointer';
        style.color = '#ddd';
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
}
