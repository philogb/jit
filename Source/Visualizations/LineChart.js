/* 
  Class: LineChart  
  
   A Line Chart visualization.
  
  This chart is built on top of Scatter Chart. Nodes are delegated to a Scatter Chart that controls all lines and nodes.

  Implements:
  
  All <Loader> methods
  
  Constructor Options:
  
  Inherits options from
  
  - <Options.Canvas>
  - <Options.Controller>
  - <Options.Node>
  - <Options.Edge>
  - <Options.Label>
  - <Options.Events>
  - <Options.Tips>
  - <Options.NodeStyles>
  - <Options.Navigation>
  
  Instance Properties:
  
  canvas - Access a <Canvas> instance.
  delegate - Access a <Scatter> chart instance.

*/
$jit.LineChart = new Class({
  Implements: [Layouts.Scatter, Loader, Extras],

  initialize: function(config) {
    var opt = {
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
    this.delegate = new $jit.Scatter(this.config);
    this.canvas = this.delegate.canvas;
  },
  
  refresh: function() {
    this.delegate.refresh();
  },
   /*
     Method: loadJSON

     Loads JSON data into the visualization.

     Parameters:

     json - The JSON data format. This format can be seen in Tests/LineChart/1.js

     Example:
     (start code js)
     var lineChart = new $jit.LineChart(options);
     lineChart.loadJSON(json);
     (end code)
  */
   loadJSON: function(json) {
     var newJSON = this.convertJSON(json);
     this.delegate.loadJSON(newJSON);
     this.delegate.refresh();
  },

  /*
   Method: updateJSON

   Update JSON data into the visualization.

   Parameters:

   json - The JSON data format. This format can be seen in Tests/LineChart/1.js

   Example:
   (start code js)
   lineChart.updateJSON(newJSON);
   (end code)
  */
  updateJSON: function(json, onComplete) {
    var newJSON = this.convertJSON(json);
    this.delegate.updateJSON(newJSON);
    onComplete && onComplete();
  },

  /*
   Method: convertJSON

   Convert JSON line chart format to JSON node format.
   It's used in loadJSON and updateJSON.

   Parameters:

   json - The JSON data format. This format can be seen in Tests/LineChart/1.js

*/
  convertJSON: function(json) {
    var newJSON = [],
        config = this.config,
        color = $.splat(json.color || this.colors),
        delegate = this.delegate,
        that = this;
   for(var i=0, values=json.values, l=json.values.length; i<l; i++) {
     var label = values[i].label,
         valArrayX = $.splat(values[i].valuesX);
         valArrayY = $.splat(values[i].valuesY);
     console.log(values[i], valArrayX, valArrayY);
     console.log(json);
     for(var j in valArrayX) {
       var adjacencies_ = ((j%2!=0) ? [label+(parseInt(j)-1), label+(parseInt(j)+1)] : []),
           // used to eliminate the last bug adjacency
           adjacencies = ((j!=valArrayX.length-1) ? adjacencies_ : [label+(parseInt(j)-1)]);
       newJSON.push({
         "id": label+j,
         "name": 'event'+i+j,
         "adjacencies": adjacencies,
         "data": {
           "$color":values[i]['color'] || "#674fde",
           "$dim":5,
           "$x":valArrayX[j],
           "$y":valArrayY[j],
           "$type":values[i]['type'] || "square"
          }
        });
      }
    }
    return newJSON;
  }
});

var LineChart = $jit.LineChart;
