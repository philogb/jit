function init() {
  var get = function(id) {
    return document.getElementById(id);
  };

  var json = Feeder.makeTree({
    idPrefix : "node",
    levelStart : 0,
    levelEnd : 3,
    maxChildrenPerNode : 40,
    minChildrenPerNode : 1,
    counter : 0,
    color : false,
    dim : true
  });

  
  tm = new TM.Strip({
    Canvas: {
      'injectInto': 'infovis'
    },
    //orientation: "v",
    titleHeight: 0,
    offset: 1
  });
  
  tm.loadJSON(json);
  tm.refresh();
}
