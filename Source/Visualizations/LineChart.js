$jit.LineChart = new Class({
  Implements: [Layouts.Scatter, Loader, Extras],
  
  initialize: function(config) {
    var opt = {
      legendX: '',
      legendY: '',
      animate: false,
      nodeOffsetWidth: 0,
      nodeOffsetHeight: 0,
      showNodeNames: false,
      
      colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
      Node: {
        overridable: true,
        color: 'rgba(0, 0, 0, 0)',
        type: 'square'
      },
      Edge: {
        overridable:true,
        type:'line',
      },
      Label: {
        textAlign: 'center',
        textBaseline: 'middle'
      }
    };
    var opts = Options("Canvas", "Margin", "Node", "Edge", "Fx", "Tips", "NodeStyles",
        "Events", "Navigation", "Controller", "Label");
    this.controller = this.config = $.merge(opts, opt, config);
    this.graphOptions = {
      'klass': Complex,
      'Node': {
        'selected': false,
        'exist': true,
        'drawn': true
      }
    };


    // this.initializeExtras();
    this.delegate = new $jit.Scatter({
      //id of the visualization container
      injectInto: 'infovis',
      //Native canvas text styling
      Label: {
        type: 'HTML',
        size: 10,
        style: 'bold',
        color: '#ccc'
      },
      // with animation
      animate: true,
      Events: {
        enable: true,
        type: 'Native',
        onMouseEnter: function(node) {
          console.log(node);
        },
        onMouseLeave: function(node) {
          console.log(node);
        },
        onClick: function(node) {
          console.log(node);
        }
      },
      background: {
        type: 'Grid',
        CanvasStyles: {
          fillStyle: 'white',
          font: 'bold 12px Arial'
        },
        legendX: 'legend X',
      },
      Node: {
        overridable:true
      },
      Margin: {
        top: 10,
        left: 0,
        bottom: 0,
        right: 0
      }
    });
    this.canvas = this.delegate.canvas;
  },
  
  refresh: function() {
    this.delegate.refresh();
  },
   /*
     Method: loadJSON

     Loads JSON data into the visualization. 

     Parameters:

     json - The JSON data format. This format is described in <http://blog.thejit.org/2010/04/24/new-javascript-infovis-toolkit-visualizations/#json-data-format>.

     Example:
     (start code js)
     var lineChart = new $jit.LineChart(options);
     lineChart.loadJSON(json);
     (end code)
  */  
   loadJSON: function(json) {
     var newJSON = [],
         config = this.config,
         color = $.splat(json.color || this.colors),
         delegate = this.delegate,
         that = this;
     for(var i=0, values=json.values, l=json.values.length; i<l; i++) {
       var label = values[i].label,
           valArray = $.splat(values[i].values);
       for(var j in valArray) {
         var adjacencies_ = ((j%2!=0) ? [label+(parseInt(j)-1), label+(parseInt(j)+1)] : []),
             // used to eliminate the last bug adjacency
             adjacencies = ((j!=valArray.length-1) ? adjacencies_ : [label+(parseInt(j)-1)]);
         newJSON.push({
           "id": label+j,
           "name": 'event'+i+j,
           "adjacencies": adjacencies,
           "data": {
             "$color":"#674fde",
             "$dim":5,
             "$x":i*j,
             "$y":valArray[j]
           }
         });
       }
     }
     console.log(newJSON);
     delegate.loadJSON(newJSON);
     delegate.refresh();
  }
});

var LineChart = $jit.LineChart;
