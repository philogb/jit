function init(){
  var json = Feeder.makeTree({
    idPrefix: "node",
    levelStart: 0,
    levelEnd: 3,
    maxChildrenPerNode: 10,
    minChildrenPerNode: 1,
    counter: 0,
    color: false,
    dim: true
  });

  tm = new $jit.TM.Squarified( {
    'injectInto': 'infovis',
    // orientation: "v",
    titleHeight: 13,
    animate: true,
    duration: 1500,
    offset: 1,
    Label: {
      type: 'Native'
    },
    Events: {
      enable: false,
      onMouseEnter: function(node, eventInfo, e) {
        node.setData('border', '#9FD4FF');
        tm.plot();
      },
      onMouseLeave: function(node, eventInfo, e) {
        node.removeData('border');
        tm.plot();
      },
      onClick: function(node, eventInfo, e) {
        if(node) {
          tm.enter(node);
        }
      },
      onRightClick: function(node, eventInfo, e) {
        tm.out();
      }
    },
    Navigation: {
      enable:true,
      panning:true,
      zooming:10
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
