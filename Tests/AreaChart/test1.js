function init(){
    //init data
    var json = {
        'label': ['label A', 'label B', 'label C'],
        'values': [
        {
          'label': 'date A',
          'values': [20, 40, 15]
        }, 
        {
          'label': 'date B',
          'values': [30, 10, 45]
        }, 
        {
          'label': 'date E',
          'values': [38, 20, 35]
        }, 
        {
          'label': 'date F',
          'values': [58, 10, 35]
        }, 
        {
          'label': 'date D',
          'values': [55, 60, 34]
        }, 
        {
          'label': 'date C',
          'values': [26, 40, 25]
        }],
        
    };
    var json2 = {
        'values': [
        {
          'label': 'date A',
          'values': [10, 40, 15]
        }, 
        {
          'label': 'date B',
          'values': [30, 40, 45]
        }, 
        {
          'label': 'date D',
          'values': [55, 30, 34]
        }, 
        {
          'label': 'date C',
          'values': [26, 40, 85]
        }],
        
    };
    //end
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
    
    //init ForceDirected
    ac = new $jit.AreaChart({
        'injectInto': 'infovis',
        'animate': true,
        Tips: {
          'enable': true,
          'onShow': function(tip, elem) {
             tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
          }
        }
    });
    
    //load JSON data.
    ac.loadJSON(json);
    
    setTimeout(function() {
      ac.updateJSON(json2);
    }, 3000);
}
