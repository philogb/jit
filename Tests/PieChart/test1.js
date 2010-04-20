function init(){
    //init data
    var json = {
        'label': ['label A', 'label B', 'label C', 'label D'],
        'values': [
        {
          'label': 'date A',
          'values': [20, 40, 15, 5]
        }, 
        {
          'label': 'date B',
          'values': [30, 10, 45, 10]
        }, 
        {
          'label': 'date E',
          'values': [38, 20, 35, 17]
        }, 
        {
          'label': 'date F',
          'values': [58, 10, 35, 32]
        }, 
        {
          'label': 'date D',
          'values': [55, 60, 34, 38]
        }, 
        {
          'label': 'date C',
          'values': [26, 40, 25, 40]
        }],
        
    };
    var json2 = {
        'values': [
        {
          'label': 'date A',
          'values': [10, 40, 15, 7]
        }, 
        {
          'label': 'date B',
          'values': [30, 40, 45, 9]
        }, 
        {
          'label': 'date D',
          'values': [55, 30, 34, 26]
        }, 
        {
          'label': 'date C',
          'values': [26, 40, 85, 28]
        }],
        
    };
    //end
    var infovis = document.getElementById('infovis');
    //init ForceDirected
    pie = new $jit.PieChart({
        'injectInto': 'infovis',
        'animate': true,
        'offset': 30,
        'sliceOffset': 0,
        'labelOffset': 20,
        'type':'stacked:gradient',
        showLabels:true,
        Label: {
          size: 13,
          family: 'Arial',
          color: 'white'
        },
        Tips: {
          'enable': true,
          'onShow': function(tip, elem) {
             tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
          }
        }
    });
    
    //load JSON data.
    pie.loadJSON(json);
    
    setTimeout(function() {
      pie.updateJSON(json2);
    }, 3000);
}
