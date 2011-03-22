/*
 * File: PieChart.js
 *
*/

$jit.Sunburst.Plot.NodeTypes.implement({
  'piechart-stacked' : {
    'render' : function(node, canvas) {
      var pos = node.pos.getp(true),
          dimArray = node.getData('dimArray'),
          valueArray = node.getData('valueArray'),
          colorArray = node.getData('colorArray'),
          colorLength = colorArray.length,
          stringArray = node.getData('stringArray'),
          span = node.getData('span') / 2,
          theta = node.pos.theta,
          begin = theta - span,
          end = theta + span,
          polar = new Polar;
    
      var ctx = canvas.getCtx(), 
          opt = {},
          gradient = node.getData('gradient'),
          border = node.getData('border'),
          config = node.getData('config'),
          showLabels = config.showLabels,
          resizeLabels = config.resizeLabels,
          label = config.Label;

      var xpos = config.sliceOffset * Math.cos((begin + end) /2);
      var ypos = config.sliceOffset * Math.sin((begin + end) /2);

      if (colorArray && dimArray && stringArray) {
        for (var i=0, l=dimArray.length, acum=0, valAcum=0; i<l; i++) {
          var dimi = dimArray[i], colori = colorArray[i % colorLength];
          if(dimi <= 0) continue;
          ctx.fillStyle = ctx.strokeStyle = colori;
          if(gradient && dimi) {
            var radialGradient = ctx.createRadialGradient(xpos, ypos, acum + config.sliceOffset,
                xpos, ypos, acum + dimi + config.sliceOffset);
            var colorRgb = $.hexToRgb(colori), 
                ans = $.map(colorRgb, function(i) { return (i * 0.8) >> 0; }),
                endColor = $.rgbToHex(ans);

            radialGradient.addColorStop(0, colori);
            radialGradient.addColorStop(0.5, colori);
            radialGradient.addColorStop(1, endColor);
            ctx.fillStyle = radialGradient;
          }
          
          polar.rho = acum + config.sliceOffset;
          polar.theta = begin;
          var p1coord = polar.getc(true);
          polar.theta = end;
          var p2coord = polar.getc(true);
          polar.rho += dimi;
          var p3coord = polar.getc(true);
          polar.theta = begin;
          var p4coord = polar.getc(true);

          ctx.beginPath();
          //fixing FF arc method + fill
          ctx.arc(xpos, ypos, acum + .01, begin, end, false);
          ctx.arc(xpos, ypos, acum + dimi + .01, end, begin, true);
          ctx.fill();
          if(border && border.name == stringArray[i]) {
            opt.acum = acum;
            opt.dimValue = dimArray[i];
            opt.begin = begin;
            opt.end = end;
          }
          acum += (dimi || 0);
          valAcum += (valueArray[i] || 0);
        }
        if(border) {
          ctx.save();
          ctx.globalCompositeOperation = "source-over";
          ctx.lineWidth = 2;
          ctx.strokeStyle = border.color;
          var s = begin < end? 1 : -1;
          ctx.beginPath();
          //fixing FF arc method + fill
          ctx.arc(xpos, ypos, opt.acum + .01 + 1, opt.begin, opt.end, false);
          ctx.arc(xpos, ypos, opt.acum + opt.dimValue + .01 - 1, opt.end, opt.begin, true);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
        if(showLabels && label.type == 'Native') {
          ctx.save();
          ctx.fillStyle = ctx.strokeStyle = label.color;
          var scale = resizeLabels? node.getData('normalizedDim') : 1,
              fontSize = (label.size * scale) >> 0;
          fontSize = fontSize < +resizeLabels? +resizeLabels : fontSize;
          
          ctx.font = label.style + ' ' + fontSize + 'px ' + label.family;
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          
          polar.rho = acum + config.labelOffset + config.sliceOffset;
          polar.theta = node.pos.theta;
          var cart = polar.getc(true);
          
          ctx.fillText(node.name, cart.x, cart.y);
          ctx.restore();
        }
      }
    },
    'contains': function(node, pos) {
      if (this.nodeTypes['none'].anglecontains.call(this, node, pos)) {
        var rho = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        var ld = this.config.levelDistance, d = node._depth;
        var config = node.getData('config');
        if(rho <=ld * d + config.sliceOffset) {
          var dimArray = node.getData('dimArray');
          for(var i=0,l=dimArray.length,acum=config.sliceOffset; i<l; i++) {
            var dimi = dimArray[i];
            if(rho >= acum && rho <= acum + dimi) {
              return {
                name: node.getData('stringArray')[i],
                color: node.getData('colorArray')[i],
                value: node.getData('valueArray')[i],
                label: node.name
              };
            }
            acum += dimi;
          }
        }
        return false;
        
      }
      return false;
    }
  }
});

/*
  Class: PieChart
  
  A visualization that displays stacked bar charts.
  
  Constructor Options:
  
  See <Options.PieChart>.

*/
$jit.PieChart = new Class({
  sb: null,
  colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
  selected: {},
  busy: false,
  
  initialize: function(opt) {
    this.controller = this.config = 
      $.merge(Options("Canvas", "PieChart", "Label"), {
        Label: { type: 'Native' }
      }, opt);
    this.initializeViz();
  },
  
  initializeViz: function() {
    var config = this.config, that = this;
    var nodeType = config.type.split(":")[0];
    var delegate = new $jit.Sunburst({
      injectInto: config.injectInto,
      width: config.width,
      height: config.height,
      useCanvas: config.useCanvas,
      withLabels: config.Label.type != 'Native',
      Label: {
        type: config.Label.type
      },
      Node: {
        overridable: true,
        type: 'piechart-' + nodeType,
        width: 1,
        height: 1
      },
      Edge: {
        type: 'none'
      },
      Tips: {
        enable: config.Tips.enable,
        type: 'Native',
        force: true,
        onShow: function(tip, node, contains) {
          var elem = contains;
          config.Tips.onShow(tip, elem, node);
        }
      },
      Events: {
        enable: true,
        type: 'Native',
        onClick: function(node, eventInfo, evt) {
          if(!config.Events.enable) return;
          var elem = eventInfo.getContains();
          config.Events.onClick(elem, eventInfo, evt);
        },
        onMouseMove: function(node, eventInfo, evt) {
          if(!config.hoveredColor) return;
          if(node) {
            var elem = eventInfo.getContains();
            that.select(node.id, elem.name, elem.index);
          } else {
            that.select(false, false, false);
          }
        }
      },
      onCreateLabel: function(domElement, node) {
        var labelConf = config.Label;
        if(config.showLabels) {
          var style = domElement.style;
          style.fontSize = labelConf.size + 'px';
          style.fontFamily = labelConf.family;
          style.color = labelConf.color;
          style.textAlign = 'center';
          domElement.innerHTML = node.name;
        }
      },
      onPlaceLabel: function(domElement, node) {
        if(!config.showLabels) return;
        var pos = node.pos.getp(true),
            dimArray = node.getData('dimArray'),
            span = node.getData('span') / 2,
            theta = node.pos.theta,
            begin = theta - span,
            end = theta + span,
            polar = new Polar;
      
        var showLabels = config.showLabels,
            resizeLabels = config.resizeLabels,
            label = config.Label;
        
        if (dimArray) {
          for (var i=0, l=dimArray.length, acum=0; i<l; i++) {
            acum += dimArray[i];
          }
          var scale = resizeLabels? node.getData('normalizedDim') : 1,
              fontSize = (label.size * scale) >> 0;
          fontSize = fontSize < +resizeLabels? +resizeLabels : fontSize;
          domElement.style.fontSize = fontSize + 'px';
          polar.rho = acum + config.labelOffset + config.sliceOffset;
          polar.theta = (begin + end) / 2;
          var pos = polar.getc(true);
          var radius = that.canvas.getSize();
          var labelPos = {
            x: Math.round(pos.x + radius.width / 2),
            y: Math.round(pos.y + radius.height / 2)
          };
          domElement.style.left = labelPos.x + 'px';
          domElement.style.top = labelPos.y + 'px';
        }
      }
    });
    
    var size = delegate.canvas.getSize(),
        min = Math.min;
    delegate.config.levelDistance = min(size.width, size.height)/2 
      - config.offset - config.sliceOffset;
    this.delegate = delegate;
    this.canvas = this.delegate.canvas;
    this.canvas.getCtx().globalCompositeOperation = 'lighter';
  },
  
  /*
    Method: loadJSON
   
    Loads JSON data into the visualization. 
    
    Parameters:
    
    json - The JSON data format. This format is described in <http://blog.thejit.org/2010/04/24/new-javascript-infovis-toolkit-visualizations/#json-data-format>.
    
    Example:
    (start code js)
    var pieChart = new $jit.PieChart(options);
    pieChart.loadJSON(json);
    (end code)
  */  
  loadJSON: function(json) {
    var prefix = $.time(), 
        ch = [], 
        delegate = this.delegate,
        name = $.splat(json.label),
        nameLength = name.length,
        color = $.splat(json.color || this.colors),
        colorLength = color.length,
        config = this.config,
        gradient = !!config.type.split(":")[1],
        animate = config.animate,
        mono = nameLength == 1;
    
    for(var i=0, values=json.values, l=values.length; i<l; i++) {
      var val = values[i];
      var valArray = $.splat(val.values);
      ch.push({
        'id': prefix + val.label,
        'name': val.label,
        'data': {
          'value': valArray,
          '$valueArray': valArray,
          '$colorArray': mono? $.splat(color[i % colorLength]) : color,
          '$stringArray': name,
          '$gradient': gradient,
          '$config': config,
          '$angularWidth': $.reduce(valArray, function(x,y){return x+y;})
        },
        'children': []
      });
    }
    var root = {
      'id': prefix + '$root',
      'name': '',
      'data': {
        '$type': 'none',
        '$width': 1,
        '$height': 1
      },
      'children': ch
    };
    delegate.loadJSON(root);
    
    this.normalizeDims();
    delegate.refresh();
    if(animate) {
      delegate.fx.animate({
        modes: ['node-property:dimArray'],
        duration:1500
      });
    }
  },
  
  /*
    Method: updateJSON
   
    Use this method when updating values for the current JSON data. If the items specified by the JSON data already exist in the graph then their values will be updated.
    
    Parameters:
    
    json - (object) JSON data to be updated. The JSON format corresponds to the one described in <PieChart.loadJSON>.
    onComplete - (object) A callback object to be called when the animation transition when updating the data end.
    
    Example:
    
    (start code js)
    pieChart.updateJSON(json, {
      onComplete: function() {
        alert('update complete!');
      }
    });
    (end code)
  */  
  updateJSON: function(json, onComplete) {
    if(this.busy) return;
    this.busy = true;
    
    var delegate = this.delegate;
    var graph = delegate.graph;
    var values = json.values;
    var animate = this.config.animate;
    var that = this;
    $.each(values, function(v) {
      var n = graph.getByName(v.label),
          vals = $.splat(v.values);
      if(n) {
        n.setData('valueArray', vals);
        n.setData('angularWidth', $.reduce(vals, function(x,y){return x+y;}));
        if(json.label) {
          n.setData('stringArray', $.splat(json.label));
        }
      }
    });
    this.normalizeDims();
    if(animate) {
      delegate.compute('end');
      delegate.fx.animate({
        modes: ['node-property:dimArray:span', 'linear'],
        duration:1500,
        onComplete: function() {
          that.busy = false;
          onComplete && onComplete.onComplete();
        }
      });
    } else {
      delegate.refresh();
    }
  },
    
  //adds the little brown bar when hovering the node
  select: function(id, name) {
    if(!this.config.hoveredColor) return;
    var s = this.selected;
    if(s.id != id || s.name != name) {
      s.id = id;
      s.name = name;
      s.color = this.config.hoveredColor;
      this.delegate.graph.eachNode(function(n) {
        if(id == n.id) {
          n.setData('border', s);
        } else {
          n.setData('border', false);
        }
      });
      this.delegate.plot();
    }
  },
  
  /*
    Method: getLegend
   
    Returns an object containing as keys the legend names and as values hex strings with color values.
    
    Example:
    
    (start code js)
    var legend = pieChart.getLegend();
    (end code)
  */  
  getLegend: function() {
    var legend = {};
    var n;
    this.delegate.graph.getNode(this.delegate.root).eachAdjacency(function(adj) {
      n = adj.nodeTo;
    });
    var colors = n.getData('colorArray'),
        len = colors.length;
    $.each(n.getData('stringArray'), function(s, i) {
      legend[s] = colors[i % len];
    });
    return legend;
  },
  
  /*
    Method: getMaxValue
   
    Returns the maximum accumulated value for the stacks. This method is used for normalizing the graph heights according to the canvas height.
    
    Example:
    
    (start code js)
    var ans = pieChart.getMaxValue();
    (end code)
    
    In some cases it could be useful to override this method to normalize heights for a group of PieCharts, like when doing small multiples.
    
    Example:
    
    (start code js)
    //will return 100 for all PieChart instances,
    //displaying all of them with the same scale
    $jit.PieChart.implement({
      'getMaxValue': function() {
        return 100;
      }
    });
    (end code)
    
  */  
  getMaxValue: function() {
    var maxValue = 0;
    this.delegate.graph.eachNode(function(n) {
      var valArray = n.getData('valueArray'),
          acum = 0;
      $.each(valArray, function(v) { 
        acum += +v;
      });
      maxValue = maxValue>acum? maxValue:acum;
    });
    return maxValue;
  },
  
  normalizeDims: function() {
    //number of elements
    var root = this.delegate.graph.getNode(this.delegate.root), l=0;
    root.eachAdjacency(function() {
      l++;
    });
    var maxValue = this.getMaxValue() || 1,
        config = this.config,
        animate = config.animate,
        rho = this.delegate.config.levelDistance;
    this.delegate.graph.eachNode(function(n) {
      var acum = 0, animateValue = [];
      $.each(n.getData('valueArray'), function(v) {
        acum += +v;
        animateValue.push(1);
      });
      var stat = (animateValue.length == 1) && !config.updateHeights;
      if(animate) {
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return stat? rho: (n * rho / maxValue); 
        }), 'end');
        var dimArray = n.getData('dimArray');
        if(!dimArray) {
          n.setData('dimArray', animateValue);
        }
      } else {
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return stat? rho : (n * rho / maxValue); 
        }));
      }
      n.setData('normalizedDim', acum / maxValue);
    });
  }
});
