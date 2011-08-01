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
    this.controller = config = this.config = $.merge(opts, opt, config);
    this.graphOptions = {
      'klass': Complex,
      'Node': {
        'selected': false,
        'exist': true,
        'drawn': true
      }
    };
    this.delegate = new $jit.Scatter({
      //id of the visualization container
      injectInto: config.injectInto,
      //Native canvas text styling
      Label: {
        type: config.Label.type,
        size: config.Label.size,
        style: config.Label.style,
        color: config.Label.color
      },
      // with animation
      animate: config.animate,
      Events: {
        enable: config.Events.true,
        type: config.Events.type,
      },
      background: {
        type: config.background.type,
        CanvasStyles: {
          fillStyle: config.background.CanvasStyles.fillStyle,
          font: config.background.CanvasStyles.font
        },
      },
      Node: {
        overridable:true
      },
      Margin: {
        top: config.Margin.top,
        left: config.Margin.left,
        bottom: config.Margin.bottom,
        right: config.Margin.right
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
     delegate.loadJSON(newJSON);
     delegate.refresh();
  }
});

var LineChart = $jit.LineChart;
