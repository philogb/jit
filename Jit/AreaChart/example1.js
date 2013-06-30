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
    //end
    var infovis = document.getElementById('infovis');
    //init AreaChart
    var areaChart = new $jit.AreaChart({
      //id of the visualization container
      injectInto: 'infovis',
      //add animations
      animate: true,
      //separation offsets
      Margin: {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
      },
      labelOffset: 10,
      //whether to display sums
      showAggregates: true,
      //whether to display labels at all
      showLabels: true,
      //could also be 'stacked'
      type: useGradients? 'stacked:gradient' : 'stacked',
      //label styling
      Label: {
        type: labelType, //can be 'Native' or 'HTML'
        size: 13,
        family: 'Arial',
        color: 'white'
      },
      //enable tips
      Tips: {
        enable: true,
        onShow: function(tip, elem) {
          tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
        }
      },
      //add left and right click handlers
      filterOnClick: true,
      restoreOnRightClick:true
    });
    //load JSON data.
    areaChart.loadJSON(json);
    //end
    var list = $jit.id('id-list'),
        button = $jit.id('update'),
        restoreButton = $jit.id('restore');
    //update json on click
    $jit.util.addEvent(button, 'click', function() {
      var util = $jit.util;
      if(util.hasClass(button, 'gray')) return;
      util.removeClass(button, 'white');
      util.addClass(button, 'gray');
      areaChart.updateJSON(json2);
    });
    //restore graph on click
    $jit.util.addEvent(restoreButton, 'click', function() {
      areaChart.restore();
    });
    //dynamically add legend to list
    var legend = areaChart.getLegend(),
        listItems = [];
    for(var name in legend) {
      listItems.push('<div class=\'query-color\' style=\'background-color:'
          + legend[name] +'\'>&nbsp;</div>' + name);
    }
    list.innerHTML = '<li>' + listItems.join('</li><li>') + '</li>';
}
