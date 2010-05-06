function init(){
    //init data
  var json = {
      'id': 'root',
      'name': 'Pie Chart',
      'data': {
          '$type': 'none'
      },
      'children':[
        {
            'id':'pie1',
            'name': 'pie1',
            'data': {
                '$angularWidth': 20,
                '$dim': 20,
                '$color': '#f55'
            },
            'children': []
        },
        {
            'id':'pie2',
            'name': 'pie2',
            'data': {
                '$angularWidth': 40,
                '$dim': 40,
                '$color': '#f77'
            },
            'children': []
        },
        {
            'id':'pie3',
            'name': 'pie3',
            'data': {
                '$angularWidth': 10,
                '$dim': 10,
                '$color': '#f99'
            },
            'children': []
        },
        {
            'id':'pie4',
            'name': 'pie4',
            'data': {
                '$angularWidth': 30,
                '$dim': 30,
                '$color': '#fbb'
            },
            'children': []
        }
      ]
    };
    //end
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
    var labels = 'HTML';
    //init Sunburst
    var sb = new $jit.Sunburst({
        'injectInto': 'infovis',
        'width': w,
        'height': h,
        //Change node and edge styles such as
        //color, width and dimensions.
        Node: {
            dim: 9,
            type:'gradient-pie',
            color: "#f00",
            overridable: true
        },
        
        Label: {
          type: 'HTML'
        },

        Tips: {
          enable: true,
          type: 'Native',
          onShow: function(tip, node, elem) {
            tip.innerHTML = node.name + " - " + Math.round(node.getData('angularWidth')) + "%";
          }
        },
        
        NodeStyles: {
          enable: true,
          type: 'Native',
          stylesHover: {
            'color': '#dddd33'
           }
        },
        
        levelDistance: 140,
        
        //Attach event handlers and add text to the
        //labels. This method is only triggered on label
        //creation
        onCreateLabel: function(domElement, node){
          if(labels === 'HTML') {
            domElement.innerHTML = node.name;
          } else if (labels === 'SVG') {
            domElement.firstChild
            .appendChild(document
              .createTextNode(node.name));
          } 
        },
        //Change node styles when labels are placed
        //or moved.
        onPlaceLabel: function(domElement, node){
          if(labels === 'SVG') {
            var fch = domElement.firstChild;
            var style = fch.style;
            style.display = '';
            style.cursor = 'pointer';
            style.fontSize = "0.8em";
            fch.setAttribute('fill', "#fff");
          } else if(labels === 'HTML') {
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';
            if (node._depth <= 1) {
                style.fontSize = "0.8em";
                style.color = "#ddd";

            } else if(node._depth == 2){
                style.fontSize = "0.7em";
                style.color = "#555";

            } else {
                style.display = 'none';
            }

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
          }
        }
    });
    
    //load JSON data.
    sb.loadJSON(json);
    //compute positions and plot.
    sb.refresh();
    //end
}
