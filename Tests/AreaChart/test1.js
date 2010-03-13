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
          'label': 'date D',
          'values': [55, 60, 34]
        }, 
        {
          'label': 'date C',
          'values': [26, 40, 25]
        }],
        
    };
    //end
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
    
    //init ForceDirected
    var ac = new $jit.AreaChart({
        'injectInto': 'infovis',
        'width': w,
        'height': h
    });
    
    //load JSON data.
    ac.loadJSON(json);
}
