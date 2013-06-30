var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data
    var json = {
        id: "node02",
        name: "0.2",
        children: [{
            id: "node13",
            name: "1.3",
            children: [{
                id: "node24",
                name: "2.4"
              }, {
                id: "node222",
                name: "2.22"
              }]
        }, {
            id: "node125",
            name: "1.25",
            children: [{
                id: "node226",
                name: "2.26"
            }, {
                id: "node237",
                name: "2.37"
            }, {
                id: "node258",
                name: "2.58"
            }]
        }, {
            id: "node165",
            name: "1.65",
            children: [{
                id: "node266",
                name: "2.66"
            }, {
                id: "node283",
                name: "2.83"
            }, {
                id: "node2104",
                name: "2.104"
            }, {
                id: "node2109",
                name: "2.109"
            }, {
                id: "node2125",
                name: "2.125"
            }]
        }, {
            id: "node1130",
            name: "1.130",
            children: [{
                id: "node2131",
                name: "2.131"
            }, {
                id: "node2138",
                name: "2.138"
            }]
        }]
    };
    //end
    //init Node Types
    //Create a node rendering function that plots a fill
    //rectangle and a stroke rectangle for borders
    $jit.ST.Plot.NodeTypes.implement({
      'stroke-rect': {
        'render': function(node, canvas) {
          var width = node.getData('width'),
              height = node.getData('height'),
              pos = this.getAlignedPos(node.pos.getc(true), width, height),
              posX = pos.x + width/2,
              posY = pos.y + height/2;
          this.nodeHelper.rectangle.render('fill', {x: posX, y: posY}, width, height, canvas);
          this.nodeHelper.rectangle.render('stroke', {x: posX, y: posY}, width, height, canvas);
        }
      }
    });
    //end
    //init Spacetree
    //Create a new ST instance
    var st = new $jit.ST({
        //id of viz container element
        injectInto: 'infovis',
        //set distance between node and its children
        levelDistance: 50,
        //set an X offset
        offsetX: 130,
        //set node, edge and label styles
        //set overridable=true for styling individual
        //nodes or edges
        Node: {
            overridable: true,
            type: 'stroke-rect',
            height: 20,
            width: 60,
            //canvas specific styles
            CanvasStyles: {
              fillStyle: '#daa',
              strokeStyle: '#ffc',
              lineWidth: 2
            }
        },
        Edge: {
            overridable: true,
            type: 'line',
            color: '#ffc',
            lineWidth: 1
        },
        Label: {
            type: labelType,
            style: 'bold',
            size: 10,
            color: '#333'
        },
        //This method is called on DOM label creation.
        //Use this method to add event handlers and styles to
        //your node.
        onCreateLabel: function(label, node){
            label.innerHTML = node.name;
            //set label styles
            var style = label.style;
            style.width = 60 + 'px';
            style.height = 17 + 'px';            
            style.color = '#333';
            style.fontSize = '0.8em';
            style.textAlign= 'center';
            style.paddingTop = '3px';
        },
        onPlaceLabel: function(label, node) {
          var style = label.style;
          style.width = node.getData('width') + 'px';
          style.height = node.getData('height') + 'px';            
          style.color = node.getLabelData('color');
          style.fontSize = node.getLabelData('size') + 'px';
          style.textAlign= 'center';
          style.paddingTop = '3px';
        }
    });
    //load json data
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    //emulate a click on the root node.
    st.onClick(st.root);
    //end
    
    //Add Select All/None actions
    var nodeAll = $jit.id('select-all-nodes'),
        nodeNone = $jit.id('select-none-nodes'),
        edgeAll = $jit.id('select-all-edges'),
        edgeNone = $jit.id('select-none-edges'),
        labelAll = $jit.id('select-all-labels'),
        labelNone = $jit.id('select-none-labels');
    $jit.util.each([nodeAll, edgeAll, labelAll], function(elem) {
      elem.onclick = function() {
        var pn = elem.parentNode.parentNode.parentNode; //table
        var inputs = pn.getElementsByTagName('input');
        for(var i=0, l=inputs.length; i<l; i++) {
          if(inputs[i].type == 'checkbox') {
            inputs[i].checked = true;
          }
        }
      };
    });
    $jit.util.each([nodeNone, edgeNone, labelNone], function(elem) {
      elem.onclick = function() {
        var pn = elem.parentNode.parentNode.parentNode; //table
        var inputs = pn.getElementsByTagName('input');
        for(var i=0, l=inputs.length; i<l; i++) {
          if(inputs[i].type == 'checkbox') {
            inputs[i].checked = false;
          }
        }
      };
    });
    //get checkboxes
    var nWidth = $jit.id('n-width'),
        nHeight = $jit.id('n-height'),
        nColor = $jit.id('n-color'),
        nBorderColor = $jit.id('n-border-color'),
        nBorderWidth = $jit.id('n-border-width'),
        eLineWidth = $jit.id('e-line-width'),
        eLineColor = $jit.id('e-line-color'),
        lFontSize = $jit.id('l-font-size'),
        lFontColor = $jit.id('l-font-color');
    
    //init Morphing Animations
    var button = $jit.id('update'),
        restore = $jit.id('restore'),
        rand = Math.random,
        floor = Math.floor,
        colors = ['#33a', '#55b', '#77c', '#99d', '#aae', '#bf0', '#cf5', 
                  '#dfa', '#faccff', '#ffccff', '#CCC', '#C37'],
        colorLength = colors.length;
    //add click event for restore
    $jit.util.addEvent(restore, 'click', function() {
      if(init.busy) return;
      init.busy = true;
      
      st.graph.eachNode(function(n) {
        //restore width and height node styles
        n.setDataset('end', {
          width: 60,
          height: 20
        });
        //restore canvas specific styles
        n.setCanvasStyles('end', {
          fillStyle: '#daa',
          strokeStyle: '#ffc',
          lineWidth: 2
        });
        //restore font styles
        n.setLabelDataset('end', {
          size: 10,
          color: '#333'
        });
        //set adjacencies styles
        n.eachAdjacency(function(adj) {
          adj.setDataset('end', {
            lineWidth: 1,
            color: '#ffc'
          });
        });
      });
      st.compute('end');
      st.geom.translate({x:-130, y:0}, 'end');
      st.fx.animate({
        modes: ['linear', 
                'node-property:width:height',
                'edge-property:lineWidth:color',
                'label-property:size:color',
                'node-style:fillStyle:strokeStyle:lineWidth'],
        duration: 1500,
        onComplete: function() {
          init.busy = false;
        }
      });
    });
    //add click event for updating styles
    $jit.util.addEvent(button, 'click', function() {
      if(init.busy) return;
      init.busy = true;
      
      st.graph.eachNode(function(n) {
        //set random width and height node styles
        nWidth.checked && n.setData('width', floor(rand() * 40 + 20), 'end');
        nHeight.checked && n.setData('height', floor(rand() * 40 + 20), 'end');
        //set random canvas specific styles
        nColor.checked && n.setCanvasStyle('fillStyle', colors[floor(colorLength * rand())], 'end');
        nBorderColor.checked && n.setCanvasStyle('strokeStyle', colors[floor(colorLength * rand())], 'end');
        nBorderWidth.checked && n.setCanvasStyle('lineWidth', 10 * rand() + 1, 'end');
        //set label styles
        lFontSize.checked && n.setLabelData('size', 20 * rand() + 1, 'end');
        lFontColor.checked && n.setLabelData('color', colors[floor(colorLength * rand())], 'end');
        //set adjacency styles
        n.eachAdjacency(function(adj) {
          eLineWidth.checked && adj.setData('lineWidth', 10 * rand() + 1, 'end');
          eLineColor.checked && adj.setData('color', colors[floor(colorLength * rand())], 'end');
        });
      });
      st.compute('end');
      st.geom.translate({x:-130, y:0}, 'end');
      st.fx.animate({
        modes: ['linear', 
                'node-property:width:height',
                'edge-property:lineWidth:color',
                'label-property:size:color',
                'node-style:fillStyle:strokeStyle:lineWidth'],
        duration: 1500,
        onComplete: function() {
          init.busy = false;
        }
      });
    });
    //end
}
