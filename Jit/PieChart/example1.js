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
        }]
        
    };
    //end
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
        }]
        
    };
    //init PieChart
    var pieChart = new $jit.PieChart({
      //id of the visualization container
      injectInto: 'infovis',
      //whether to add animations
      animate: true,
      //offsets
      offset: 30,
      sliceOffset: 0,
      labelOffset: 20,
      //slice style
      type: useGradients? 'stacked:gradient' : 'stacked',
      //whether to show the labels for the slices
      showLabels:true,
      //resize labels according to
      //pie slices values set 7px as
      //min label size
      resizeLabels: 7,
      //label styling
      Label: {
        type: labelType, //Native or HTML
        size: 20,
        family: 'Arial',
        color: 'white'
      },
      //enable tips
      Tips: {
        enable: true,
        onShow: function(tip, elem) {
           tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
        }
      }
    });
    //load JSON data.
    pieChart.loadJSON(json);
    //end
    var list = $jit.id('id-list'),
        button = $jit.id('update');
    //update json on click
    $jit.util.addEvent(button, 'click', function() {
      var util = $jit.util;
      if(util.hasClass(button, 'gray')) return;
      util.removeClass(button, 'white');
      util.addClass(button, 'gray');
      pieChart.updateJSON(json2);
    });
    //dynamically add legend to list
    var legend = pieChart.getLegend(),
        listItems = [];
    for(var name in legend) {
      listItems.push('<div class=\'query-color\' style=\'background-color:'
          + legend[name] +'\'>&nbsp;</div>' + name);
    }
    list.innerHTML = '<li>' + listItems.join('</li><li>') + '</li>';
}
