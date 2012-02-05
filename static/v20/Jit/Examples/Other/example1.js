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


function init() {
    //init data
    var jsonpie = {
      'id': 'root',
      'name': 'RGraph based Pie Chart',
      'data': {
          '$type': 'none'
      },
      'children':[
        {
            'id':'pie1',
            'name': 'pie1',
            'data': {
                '$angularWidth': 20,
                '$color': '#f55'
            },
            'children': []
        },
        {
            'id':'pie2',
            'name': 'pie2',
            'data': {
                '$angularWidth': 40,
                '$color': '#f77'
            },
            'children': []
        },
        {
            'id':'pie3',
            'name': 'pie3',
            'data': {
                '$angularWidth': 10,
                '$color': '#f99'
            },
            'children': []
        },
        {
            'id':'pie4',
            'name': 'pie4',
            'data': {
                '$angularWidth': 30,
                '$color': '#fbb'
            },
            'children': []
        }
      ]
    };

    var jsonpie2 = {
      'id': 'root',
      'name': 'Making an Extended Pie Chart',
      'data': {
          '$type': 'none'
      },
      'children':[
        {
            'id':'pie10',
            'name': 'pie1',
            'data': {
                '$angularWidth': 20,
                '$color': '#f55'
            },
            'children': [
                {
                    'id':'pie100',
                    'name': 'pc1',
                    'data': {
                        '$angularWidth': 20,
                        '$color': '#55f'
                    },
                    'children': []
                    
                },
                {
                    'id':'pie101',
                    'name': 'pc2',
                    'data': {
                        '$angularWidth': 70,
                        '$color': '#66f'
                    },
                    'children': []
                    
                },
                {
                    'id':'pie102',
                    'name': 'pc3',
                    'data': {
                        '$angularWidth': 10,
                        '$color': '#77f'
                    },
                    'children': []
                    
                }
            ]
        },
        {
            'id':'pie20',
            'name': 'pie2',
            'data': {
                '$angularWidth': 40,
                '$color': '#f77'
            },
            'children': [
                {
                    'id':'pie200',
                    'name': 'pc1',
                    'data': {
                        '$angularWidth': 40,
                        '$color': '#88f'
                    },
                    'children': []
                    
                },
                {
                    'id':'pie201',
                    'name': 'pc2',
                    'data': {
                        '$angularWidth': 60,
                        '$color': '#99f'
                    },
                    'children': []
                    
                }
            ]
        },
        {
            'id':'pie30',
            'name': 'pie3',
            'data': {
                '$angularWidth': 10,
                '$color': '#f99'
            },
            'children': [
                {
                    'id':'pie300',
                    'name': 'pc1',
                    'data': {
                        '$angularWidth': 100,
                        '$color': '#aaf'
                    },
                    'children': []
                    
                }
            ]
        }
      ]
    };

    var jsonpie3 = {
      'id': 'root1',
      'name': 'ST Bar Chart',
      'data': {
          '$type': 'none',
          '$width': 80,
          '$height':20
      },
      'children':[
        {
            'id':'h1',
            'name': 'h1',
            'data': {
                '$color': '#55f',
                '$height':30
            },
            'children': []
        },
        {
            'id':'h2',
            'name': 'h2',
            'data': {
                '$color': '#66f',
                '$height':50
            },
            'children': []
        },
        {
            'id':'h3',
            'name': 'h3',
            'data': {
                '$color': '#77f',
                '$height':70
            },
            'children': []
        },
        {
            'id':'h4',
            'name': 'h4',
            'data': {
                '$height':90,
                '$color': '#88f'
            },
            'children': []
        },
        {
            'id':'h5',
            'name': 'h5',
            'data': {
                '$height':100,
                '$color': '#99f'
            },
            'children': []
        },
        {
            'id':'h6',
            'name': 'h6',
            'data': {
                '$height':110,
                '$color': '#aaf'
            },
            'children': []
        },
        {
            'id':'h7',
            'name': 'h7',
            'data': {
                '$height':150,
                '$color': '#bbf'
            },
            'children': []
        },
        {
            'id':'h8',
            'name': 'h8',
            'data': {
                '$height':110,
                '$color': '#aaf'
            },
            'children': []
        },
        {
            'id':'h9',
            'name': 'h9',
            'data': {
                '$height':100,
                '$color': '#99f'
            },
            'children': []
        },
        {
            'id':'h10',
            'name': 'h10',
            'data': {
                '$height':90,
                '$color': '#88f'
            },
            'children': []
        },
        {
            'id':'h11',
            'name': 'h11',
            'data': {
                '$height':110,
                '$color': '#aaf'
            },
            'children': []
        },
        {
            'id':'h12',
            'name': 'h12',
            'data': {
                '$height':150,
                '$color': '#bbf'
            },
            'children': []
        },
        {
            'id':'h13',
            'name': 'h13',
            'data': {
                '$height':110,
                '$color': '#aaf'
            },
            'children': []
        },
        {
            'id':'h14',
            'name': 'h14',
            'data': {
                '$height':100,
                '$color': '#99f'
            },
            'children': []
        },
        {
            'id':'h15',
            'name': 'h15',
            'data': {
                '$height':90,
                '$color': '#88f'
            },
            'children': []
        }
      ]
    };
    //end
    
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    
    //create some containers for the visualizations
    var container = document.createElement('div');
    container.id = "infovis1";
    var style = container.style;
    style.left = "0px";
    style.top = "0px";
    style.width = Math.floor(w / 2) + "px";
    style.height = Math.floor(h / 2) + "px";
    style.position = 'absolute';
    infovis.appendChild(container);
    
    container = document.createElement('div');
    container.id = "infovis2";
    var style = container.style;
    style.left = Math.floor(w / 2) + "px";
    style.top = "0px";
    style.width = style.left;
    style.height = Math.floor(h / 2) + "px";
    style.position = 'absolute';
    infovis.appendChild(container);

    container = document.createElement('div');
    container.id = "infovis3";
    var style = container.style;
    style.left = "0px";
    style.top = Math.floor(h / 2) + "px";
    style.width = w + "px";
    style.height = Math.floor(h / 2) + "px";
    style.position = 'absolute';
    infovis.appendChild(container);
    
    //init nodetypes
    //Here we implement custom node rendering types for the RGraph
    //Using this feature requires some javascript and canvas experience.
    $jit.RGraph.Plot.NodeTypes.implement({
        //This node type is used for plotting the upper-left pie chart
        'nodepie': {
          'render': function(node, canvas) {
            var span = node.angleSpan, begin = span.begin, end = span.end;
            var polarNode = node.pos.getp(true);
            var polar = new $jit.Polar(polarNode.rho, begin);
            var p1coord = polar.getc(true);
            polar.theta = end;
            var p2coord = polar.getc(true);

            var ctx = canvas.getCtx();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(p1coord.x, p1coord.y);
            ctx.moveTo(0, 0);
            ctx.lineTo(p2coord.x, p2coord.y);
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, polarNode.rho, begin, end, false);
            ctx.fill();
          }
        },
        //This node type is used for plotting the upper-right pie chart
        'shortnodepie': {
          'render': function(node, canvas) {
            var ldist = this.config.levelDistance;
            var span = node.angleSpan, begin = span.begin, end = span.end;
            var polarNode = node.pos.getp(true);
            
            var polar = new $jit.Polar(polarNode.rho, begin);
            var p1coord = polar.getc(true);
            
            polar.theta = end;
            var p2coord = polar.getc(true);
            
            polar.rho += ldist;
            var p3coord = polar.getc(true);
            
            polar.theta = begin;
            var p4coord = polar.getc(true);
            
            
            var ctx = canvas.getCtx();
            ctx.beginPath();
            ctx.moveTo(p1coord.x, p1coord.y);
            ctx.lineTo(p4coord.x, p4coord.y);
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, polarNode.rho, begin, end, false);

            ctx.moveTo(p2coord.x, p2coord.y);
            ctx.lineTo(p3coord.x, p3coord.y);
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, polarNode.rho + ldist, end, begin, true);
            
            ctx.fill();
          }
        }
    });
    //end
    
    //init rgraph
    //This RGraph is used to plot the upper-left pie chart.
    //It has custom *pie-chart-nodes*.
    var rgraph = new $jit.RGraph({
        injectInto: 'infovis1',
        width: w/2,
        height: h/2,
        //Add node/edge styles and set
        //overridable=true if you want your
        //styles to be individually overriden
        Node: {
            'overridable': true,
             'type': 'nodepie'
        },
        Edge: {
            'overridable': true
        },
        //Parent-children distance
        levelDistance: 135,
        
        //Add styles to node labels on label creation
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            if(node.data.$angularWidth) 
                domElement.innerHTML += " " + node.data.$angularWidth + "%";
            var style = domElement.style;
            style.fontSize = "0.8em";
            style.color = "#fff";
        },
        //Add some offset to the labels when placed.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    //load graph.
    rgraph.loadJSON(jsonpie);
    rgraph.refresh();
    //end
    //init rgraph2
    //This RGraph instance is used for plotting the upper-right
    //pie chart.
    var rgraph2 = new $jit.RGraph({
        'injectInto': 'infovis2',
        'width': w/2,
        'height': h/2,
        //Add node/edge styles and set
        //overridable=true if you want your
        //styles to be individually overriden
        Node: {
            'overridable': true,
             'type':'shortnodepie'
        },
        Edge: {
            'overridable': true
        },
        //Parent-children distance
        levelDistance: 45,
        
        //Add styles to node labels on label creation
        onCreateLabel: function(domElement, node){
            if(node.id == rgraph2.root) return;
            domElement.innerHTML = node.name;
            if(node.data.$angularWidth) {
                domElement.innerHTML += " " + node.data.$angularWidth + "%";
            }
            var style = domElement.style;
            style.fontSize = "0.8em";
            style.color = "#fff";
        },
        
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    //load graph.
    rgraph2.loadJSON(jsonpie2);
    rgraph2.refresh();
    //end
    //init st
    //This Spacetree nodes' heights are overriden individually
    //so that it serves as a bar chart.
    var st = new $jit.ST({
        'injectInto': 'infovis3',
        'width': w,
        'height': h/2,
        //set orientarion
        orientation:'bottom',
        //set duration for the animation
        duration: 800,
        //set parent-children distance
        levelDistance: 30,
        //set node and edge styles
        //set overridable=true for styling individual
        //nodes or edges
        Node: {
            overridable: true,
            width: 30,
            type: 'rectangle',
            color: '#aaa',
            align: 'right'
        },
        
        Edge: {
            type: 'bezier',
            color: '#444'
        },
        
        //This method is called on DOM label creation.
        //Use this method to add styles to
        //your node label.
        onCreateLabel: function(label, node){
            label.id = node.id;            
            label.innerHTML = node.name;
            //set label styles
            var style = label.style;
            style.fontSize = '0.7em';
            style.textAlign= 'center';
            style.paddingTop = '3px';
            style.height = node.data.$height + 'px';            

            if(node.id == st.root) {
                style.color = '#eee';
                style.width = node.data.$width + 'px';
            } else {
                style.color = '#fff';
                style.width = 30 + 'px';
            }
        }
    });
    //load json data
    st.loadJSON(jsonpie3);
    //compute node positions and layout
    st.compute();
    //emulate a click on the root node and
    //add an offset position to the tree
    st.onClick(st.root, {
        Move: {
            offsetY: -110
        }
    });
    //end
}
