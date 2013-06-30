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
    var json = {
      'id': 'root',
      'name': 'RGraph( RGraph )',
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
    //end
    
    //init nodetypes
    //Here we implement custom node rendering types for the RGraph
    //Using this feature requires some javascript and canvas experience.
    $jit.RGraph.Plot.NodeTypes.implement({
        //This node type is used for plotting pie-chart slices as nodes
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
        //Create a new node type that renders an entire RGraph visualization
        //as node
        'piechart': {
          'render': function(node, canvas, animating) {
            var ctx = canvas.getCtx(), pos = node.pos.getc(true);
            ctx.save();
            ctx.translate(pos.x, pos.y);
            pie.plot();
            ctx.restore();
          }
         }
    });
    //end
    
    //init pie
    //This RGraph instance will be used as the node for 
    //another RGraph instance.
    var pie = new $jit.RGraph({
        'injectInto': 'infovis',
        //Optional: create a background canvas and plot
        //concentric circles in it.
        'background': {
          CanvasStyles: {
            strokeStyle: '#555'
          }
        },
        //Add node/edge styles and set
        //overridable=true if you want your
        //styles to be individually overriden
        Node: {
            'overridable': true,
             'type':'nodepie'
        },
        Edge: {
            'type':'none'
        },
        //Parent-children distance
        levelDistance: 30,
        //Don't create labels in this visualization
        withLabels: false,
        //Don't clear the entire canvas when plotting
        //this visualization
        clearCanvas: false
    });
    //load graph.
    pie.loadJSON(jsonpie);
    pie.compute();
    //end

    //init rgraph
    var rgraph = new $jit.RGraph({
        useCanvas: pie.canvas,
        //Add node/edge styles and set
        //overridable=true if you want your
        //styles to be individually overriden
        Node: {
            //set the RGraph rendering function
            //as node type
           'type': 'piechart'
        },
        Edge: {
            color: '#772277'
        },
        //Parent-children distance
        levelDistance: 100,
        //Duration
        duration: 1500,
        //Add styles to node labels on label creation
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            var style = domElement.style;
            style.fontSize = "0.8em";
            style.color = "#fff";
            style.cursor = "pointer";
            domElement.onclick = function() {
              rgraph.onClick(node.id, {
                  hideLabels: false
              });  
            };
        },
        
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
            style.display = '';
        }
    });
    //load graph.
    rgraph.loadJSON(json);
    rgraph.refresh();
    //end
}
