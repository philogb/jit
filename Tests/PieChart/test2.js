function init(){
    //init data
    var json = {
        //'color': "#416D9C",
        'label': 'label A',
        'values': [
        {
          'label': 'date A',
          'values': 20
        }, 
        {
          'label': 'date B',
          'values': 30
        }, 
        {
          'label': 'date E',
          'values': 38
        }, 
        {
          'label': 'date F',
          'values': 58
        }, 
        {
          'label': 'date D',
          'values': 55
        }, 
        {
          'label': 'date C',
          'values': 26
        }]
    };
    var json2 = {
        'values': [
        {
          'label': 'date A',
          'values': 70
        }, 
        {
          'label': 'date B',
          'values': 30
        }, 
        {
          'label': 'date D',
          'values': 25
        }, 
        {
          'label': 'date C',
          'values': 46
        }]
    };
    //end
    var infovis = document.getElementById('infovis');
    //init PieChart
    pie = new $jit.PieChart({
        injectInto: 'infovis',
        animate: true,
        offset: 60,
        sliceOffset: 5,
        labelOffset: 20,
        type:'stacked:gradient',
        updateHeights:false,
        showLabels:true,
        Label: {
          size: 13,
          family: 'Arial',
          color: 'white'
        },
        Tips: {
          'enable': true,
          'onShow': function(tip, elem) {
             tip.innerHTML = "<b>" + elem.label + "</b>: " + elem.value;
          }
        }
    });
    
    //load JSON data.
    pie.loadJSON(json);
    
    setTimeout(function() {
      pie.updateJSON(json2);
    }, 3000);
}