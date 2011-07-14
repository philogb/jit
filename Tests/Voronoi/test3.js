function init(){
  //init data
	var json = { id : 'root', name : 'all', children : []};
  for (var i = 0 ; i < 9; i++) {
  	var c = { id : 'c' + i, name : i, data : { $color : "#fe5d3f" }, children : [] };
  	json.children.push( c );
  	var cs = Math.random() * 3 + 3;
  	var sumc = 0;
  	for (var j = 0 ; j < cs; j++) {
  		var d = { id : 'c' + i + '_' + j, name : i + '_' + j, data : { $color : "#9e939f" }, children : [] };
  		c.children.push( d );
  		var ds = Math.random() * 3 + 3;
  		var sumd = 0;
  		for (var k = 0 ; k < ds; k++) {
        var e = { id : 'c' + i + '_' + j + '_' + k, name : i + '_' + j + '_' + k, data : { $color : "#f88" } };
        sumd += (e.data.$area = Math.random() * 30 + 5);
        d.children.push( e );
      }
      d.data.$area = sumd;
      sumc += sumd;
  	}
    c.data.$area = sumc;
  }
  //end
  //init TreeMap
  var tm = new $jit.TM.Voronoi({
    //where to inject the visualization
    injectInto: 'infovis',
    //parent box title heights
    titleHeight: 15,
    //enable animations
    animate: animate,
    //box offsets
    offset: 2,
    labelsToShow : [1, 2],
    border: "white",
    centroidType: "presure",
    Node: {
      CanvasStyles: {
        shadowBlur: 0,
        shadowColor: '#000'
      }
    },
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
      type: 'Native',
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
        if (data.$area) {
        	html += "<b>weight/area: "+ (data.$area/$jit.util.area(data.$vertices) * 100).toFixed(2) +"</b><br/>" 
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
          
        };
        domElement.onmouseout = function() {
          style.border = '1px solid transparent';
        };
    }
  });
  tm.loadJSON(json);
  tm.refresh();
  //end
  //add event to the back button
  var back = $jit.id('back');
  $jit.util.addEvent(back, 'click', function() {
    tm.out();
  });
}
