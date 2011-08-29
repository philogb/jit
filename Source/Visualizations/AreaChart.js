/*
 * File: AreaChart.js
 *
*/

$jit.ST.Plot.NodeTypes.implement({
  'areachart-stacked' : {
    'render' : function(node, canvas) {
      var pos = node.pos.getc(true), 
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          x = algnPos.x, y = algnPos.y,
          stringArray = node.getData('stringArray'),
          dimArray = node.getData('dimArray'),
          valArray = node.getData('valueArray'),
          valLeft = $.reduce(valArray, function(x, y) { return x + y[0]; }, 0),
          valRight = $.reduce(valArray, function(x, y) { return x + y[1]; }, 0),
          colorArray = node.getData('colorArray'),
          colorLength = colorArray.length,
          config = node.getData('config'),
          gradient = node.getData('gradient'),
          showLabels = config.showLabels,
          aggregates = config.showAggregates,
          label = config.Label,
          prev = node.getData('prev');

      var ctx = canvas.getCtx(), border = node.getData('border');
      if (colorArray && dimArray && stringArray) {
        for (var i=0, l=dimArray.length, acumLeft=0, acumRight=0, valAcum=0; i<l; i++) {
          ctx.fillStyle = ctx.strokeStyle = colorArray[i % colorLength];
          ctx.save();
          if(gradient && (dimArray[i][0] > 0 || dimArray[i][1] > 0)) {
            var h1 = acumLeft + dimArray[i][0],
                h2 = acumRight + dimArray[i][1],
                alpha = Math.atan((h2 - h1) / width),
                delta = 55;
            var linear = ctx.createLinearGradient(x + width/2, 
                y - (h1 + h2)/2,
                x + width/2 + delta * Math.sin(alpha),
                y - (h1 + h2)/2 + delta * Math.cos(alpha));
            var color = $.rgbToHex($.map($.hexToRgb(colorArray[i % colorLength].slice(1)), 
                function(v) { return (v * 0.85) >> 0; }));
            linear.addColorStop(0, colorArray[i % colorLength]);
            linear.addColorStop(1, color);
            ctx.fillStyle = linear;
          }
          ctx.beginPath();
          ctx.moveTo(x, y - acumLeft);
          ctx.lineTo(x + width, y - acumRight);
          ctx.lineTo(x + width, y - acumRight - dimArray[i][1]);
          ctx.lineTo(x, y - acumLeft - dimArray[i][0]);
          ctx.lineTo(x, y - acumLeft);
          ctx.fill();
          ctx.restore();
          if(border) {
            var strong = border.name == stringArray[i];
            var perc = strong? 0.7 : 0.8;
            var color = $.rgbToHex($.map($.hexToRgb(colorArray[i % colorLength].slice(1)), 
                function(v) { return (v * perc) >> 0; }));
            ctx.strokeStyle = color;
            ctx.lineWidth = strong? 4 : 1;
            ctx.save();
            ctx.beginPath();
            if(border.index === 0) {
              ctx.moveTo(x, y - acumLeft);
              ctx.lineTo(x, y - acumLeft - dimArray[i][0]);
            } else {
              ctx.moveTo(x + width, y - acumRight);
              ctx.lineTo(x + width, y - acumRight - dimArray[i][1]);
            }
            ctx.stroke();
            ctx.restore();
          }
          acumLeft += (dimArray[i][0] || 0);
          acumRight += (dimArray[i][1] || 0);
          
          if(dimArray[i][0] > 0)
            valAcum += (valArray[i][0] || 0);
        }
        if(prev && label.type == 'Native') {
          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = ctx.strokeStyle = label.color;
          ctx.font = label.style + ' ' + label.size + 'px ' + label.family;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var aggValue = aggregates(node.name, valLeft, valRight, node, valAcum);
          if(aggValue !== false) {
            ctx.fillText(aggValue !== true? aggValue : valAcum, x, y - acumLeft - config.labelOffset - label.size/2, width);
          }
          var labValue = showLabels(node.name, valLeft, valRight, node)
          if(labValue !== false) {
            ctx.fillText(labValue !== true? labValue : node.name, x, y + label.size/2 + config.labelOffset);
          }
          ctx.restore();
        }
      }
    },
    'contains': function(node, mpos) {
      var pos = node.pos.getc(true), 
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          x = algnPos.x, y = algnPos.y,
          dimArray = node.getData('dimArray'),
          rx = mpos.x - x;
      //bounding box check
      if(mpos.x < x || mpos.x > x + width
        || mpos.y > y || mpos.y < y - height) {
        return false;
      }
      //deep check
      for(var i=0, l=dimArray.length, lAcum=y, rAcum=y; i<l; i++) {
        var dimi = dimArray[i];
        lAcum -= dimi[0];
        rAcum -= dimi[1];
        var intersec = lAcum + (rAcum - lAcum) * rx / width;
        if(mpos.y >= intersec) {
          var index = +(rx > width/2);
          return {
            'name': node.getData('stringArray')[i],
            'color': node.getData('colorArray')[i],
            'value': node.getData('valueArray')[i][index],
            'index': index
          };
        }
      }
      return false;
    }
  }
});

/*
  Class: AreaChart
  
  A visualization that displays stacked area charts.
  
  Constructor Options:
  
  See <Options.AreaChart>.

*/
$jit.AreaChart = new Class({
  st: null,
  colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
  selected: {},
  busy: false,
  
  initialize: function(opt) {
    this.controller = this.config = 
      $.merge(Options("Canvas", "Margin", "Label", "AreaChart"), {
        Label: { type: 'Native' }
      }, opt);
    //set functions for showLabels and showAggregates
    var showLabels = this.config.showLabels,
        typeLabels = $.type(showLabels),
        showAggregates = this.config.showAggregates,
        typeAggregates = $.type(showAggregates);
    this.config.showLabels = typeLabels == 'function'? showLabels : $.lambda(showLabels);
    this.config.showAggregates = typeAggregates == 'function'? showAggregates : $.lambda(showAggregates);
    
    this.initializeViz();
  },
  
  initializeViz: function() {
    var config = this.config,
        that = this,
        nodeType = config.type.split(":")[0],
        nodeLabels = {};

    var delegate = new $jit.ST({
      injectInto: config.injectInto,
      width: config.width,
      height: config.height,
      orientation: "bottom",
      levelDistance: 0,
      siblingOffset: 0,
      subtreeOffset: 0,
      withLabels: config.Label.type != 'Native',
      useCanvas: config.useCanvas,
      Label: {
        type: config.Label.type
      },
      Node: {
        overridable: true,
        type: 'areachart-' + nodeType,
        align: 'left',
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
          if(!config.filterOnClick && !config.Events.enable) return;
          var elem = eventInfo.getContains();
          if(elem) config.filterOnClick && that.filter(elem.name);
          config.Events.enable && config.Events.onClick(elem, eventInfo, evt);
        },
        onRightClick: function(node, eventInfo, evt) {
          if(!config.restoreOnRightClick) return;
          that.restore();
        },
        onMouseMove: function(node, eventInfo, evt) {
          if(!config.selectOnHover) return;
          if(node) {
            var elem = eventInfo.getContains();
            that.select(node.id, elem.name, elem.index);
          } else {
            that.select(false, false, false);
          }
        }
      },
      onCreateLabel: function(domElement, node) {
        var labelConf = config.Label,
            valueArray = node.getData('valueArray'),
            acumLeft = $.reduce(valueArray, function(x, y) { return x + y[0]; }, 0),
            acumRight = $.reduce(valueArray, function(x, y) { return x + y[1]; }, 0);
        if(node.getData('prev')) {
          var nlbs = {
            wrapper: document.createElement('div'),
            aggregate: document.createElement('div'),
            label: document.createElement('div')
          };
          var wrapper = nlbs.wrapper,
              label = nlbs.label,
              aggregate = nlbs.aggregate,
              wrapperStyle = wrapper.style,
              labelStyle = label.style,
              aggregateStyle = aggregate.style;
          //store node labels
          nodeLabels[node.id] = nlbs;
          //append labels
          wrapper.appendChild(label);
          wrapper.appendChild(aggregate);
          if(!config.showLabels(node.name, acumLeft, acumRight, node)) {
            label.style.display = 'none';
          }
          if(!config.showAggregates(node.name, acumLeft, acumRight, node)) {
            aggregate.style.display = 'none';
          }
          wrapperStyle.position = 'relative';
          wrapperStyle.overflow = 'visible';
          wrapperStyle.fontSize = labelConf.size + 'px';
          wrapperStyle.fontFamily = labelConf.family;
          wrapperStyle.color = labelConf.color;
          wrapperStyle.textAlign = 'center';
          aggregateStyle.position = labelStyle.position = 'absolute';
          
          domElement.style.width = node.getData('width') + 'px';
          domElement.style.height = node.getData('height') + 'px';
          label.innerHTML = node.name;
          
          domElement.appendChild(wrapper);
        }
      },
      onPlaceLabel: function(domElement, node) {
        if(!node.getData('prev')) return;
        var labels = nodeLabels[node.id],
            wrapperStyle = labels.wrapper.style,
            labelStyle = labels.label.style,
            aggregateStyle = labels.aggregate.style,
            width = node.getData('width'),
            height = node.getData('height'),
            dimArray = node.getData('dimArray'),
            valArray = node.getData('valueArray'),
            acumLeft = $.reduce(valArray, function(x, y) { return x + y[0]; }, 0),
            acumRight = $.reduce(valArray, function(x, y) { return x + y[1]; }, 0),
            font = parseInt(wrapperStyle.fontSize, 10),
            domStyle = domElement.style;
        
        if(dimArray && valArray) {
          if(config.showLabels(node.name, acumLeft, acumRight, node)) {
            labelStyle.display = '';
          } else {
            labelStyle.display = 'none';
          }
          var aggValue = config.showAggregates(node.name, acumLeft, acumRight, node);
          if(aggValue !== false) {
            aggregateStyle.display = '';
          } else {
            aggregateStyle.display = 'none';
          }
          wrapperStyle.width = aggregateStyle.width = labelStyle.width = domElement.style.width = width + 'px';
          aggregateStyle.left = labelStyle.left = -width/2 + 'px';
          for(var i=0, l=valArray.length, acum=0, leftAcum=0; i<l; i++) {
            if(dimArray[i][0] > 0) {
              acum+= valArray[i][0];
              leftAcum+= dimArray[i][0];
            }
          }
          aggregateStyle.top = (-font - config.labelOffset) + 'px';
          labelStyle.top = (config.labelOffset + leftAcum) + 'px';
          domElement.style.top = parseInt(domElement.style.top, 10) - leftAcum + 'px';
          domElement.style.height = wrapperStyle.height = leftAcum + 'px';
          labels.aggregate.innerHTML = aggValue !== true? aggValue : acum;
        }
      }
    });
    
    var size = delegate.canvas.getSize(),
        margin = config.Margin;
    delegate.config.offsetY = -size.height/2 + margin.bottom 
      + (config.showLabels && (config.labelOffset + config.Label.size));
    delegate.config.offsetX = (margin.right - margin.left)/2;
    this.delegate = delegate;
    this.canvas = this.delegate.canvas;
  },
  
 /*
  Method: loadJSON
 
  Loads JSON data into the visualization. 
  
  Parameters:
  
  json - The JSON data format. This format is described in <http://blog.thejit.org/2010/04/24/new-javascript-infovis-toolkit-visualizations/#json-data-format>.
  
  Example:
  (start code js)
  var areaChart = new $jit.AreaChart(options);
  areaChart.loadJSON(json);
  (end code)
 */  
  loadJSON: function(json) {
    var prefix = $.time(), 
        ch = [], 
        delegate = this.delegate,
        name = $.splat(json.label), 
        color = $.splat(json.color || this.colors),
        config = this.config,
        gradient = !!config.type.split(":")[1],
        animate = config.animate;
    
    for(var i=0, values=json.values, l=values.length; i<l-1; i++) {
      var val = values[i], prev = values[i-1], next = values[i+1];
      var valLeft = $.splat(values[i].values), valRight = $.splat(values[i+1].values);
      var valArray = $.zip(valLeft, valRight);
      var acumLeft = 0, acumRight = 0;
      ch.push({
        'id': prefix + val.label,
        'name': val.label,
        'data': {
          'value': valArray,
          '$valueArray': valArray,
          '$colorArray': color,
          '$stringArray': name,
          '$next': next.label,
          '$prev': prev? prev.label:false,
          '$config': config,
          '$gradient': gradient
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
    delegate.compute();
    delegate.select(delegate.root);
    if(animate) {
      delegate.fx.animate({
        modes: ['node-property:height:dimArray'],
        duration:1500
      });
    }
  },
  
 /*
  Method: updateJSON
 
  Use this method when updating values for the current JSON data. If the items specified by the JSON data already exist in the graph then their values will be updated.
  
  Parameters:
  
  json - (object) JSON data to be updated. The JSON format corresponds to the one described in <AreaChart.loadJSON>.
  onComplete - (object) A callback object to be called when the animation transition when updating the data end.
  
  Example:
  
  (start code js)
  areaChart.updateJSON(json, {
    onComplete: function() {
      alert('update complete!');
    }
  });
  (end code)
 */  
  updateJSON: function(json, onComplete) {
    if(this.busy) return;
    this.busy = true;
    
    var delegate = this.delegate,
        graph = delegate.graph,
        labels = json.label && $.splat(json.label),
        values = json.values,
        animate = this.config.animate,
        that = this,
        hashValues = {};

    //convert the whole thing into a hash
    for (var i = 0, l = values.length; i < l; i++) {
      hashValues[values[i].label] = values[i];
    }
  
    graph.eachNode(function(n) {
      var v = hashValues[n.name],
          stringArray = n.getData('stringArray'),
          valArray = n.getData('valueArray'),
          next = n.getData('next');
      
      if (v) {
        v.values = $.splat(v.values);
        $.each(valArray, function(a, i) {
          a[0] = v.values[i];
          if(labels) stringArray[i] = labels[i];
        });
        n.setData('valueArray', valArray);
      }
     
      if(next) {
        v = hashValues[next];
        if(v) {
          $.each(valArray, function(a, i) {
            a[1] = v.values[i];
          });
        }
      }
    });
    this.normalizeDims();
    delegate.compute();
    delegate.select(delegate.root);
    if(animate) {
      delegate.fx.animate({
        modes: ['node-property:height:dimArray'],
        duration:1500,
        onComplete: function() {
          that.busy = false;
          onComplete && onComplete.onComplete();
        }
      });
    }
  },
  
/*
  Method: filter
 
  Filter selected stacks, collapsing all other stacks. You can filter multiple stacks at the same time.
  
  Parameters:
  
  filters - (array) An array of strings with the name of the stacks to be filtered.
  callback - (object) An object with an *onComplete* callback method. 
  
  Example:
  
  (start code js)
  areaChart.filter(['label A', 'label C'], {
      onComplete: function() {
          console.log('done!');
      }
  });
  (end code)
  
  See also:
  
  <AreaChart.restore>.
 */  
  filter: function(filters, callback) {
    if(this.busy) return;
    this.busy = true;
    if(this.config.Tips.enable) this.delegate.tips.hide();
    this.select(false, false, false);
    var args = $.splat(filters);
    var rt = this.delegate.graph.getNode(this.delegate.root);
    var that = this;
    this.normalizeDims();
    rt.eachAdjacency(function(adj) {
      var n = adj.nodeTo, 
          dimArray = n.getData('dimArray', 'end'),
          stringArray = n.getData('stringArray');
      n.setData('dimArray', $.map(dimArray, function(d, i) {
        return ($.indexOf(args, stringArray[i]) > -1)? d:[0, 0];
      }), 'end');
    });
    this.delegate.fx.animate({
      modes: ['node-property:dimArray'],
      duration:1500,
      onComplete: function() {
        that.busy = false;
        callback && callback.onComplete();
      }
    });
  },
  
  /*
  Method: restore
 
  Sets all stacks that could have been filtered visible.
  
  Example:
  
  (start code js)
  areaChart.restore();
  (end code)
  
  See also:
  
  <AreaChart.filter>.
 */  
  restore: function(callback) {
    if(this.busy) return;
    this.busy = true;
    if(this.config.Tips.enable) this.delegate.tips.hide();
    this.select(false, false, false);
    this.normalizeDims();
    var that = this;
    this.delegate.fx.animate({
      modes: ['node-property:height:dimArray'],
      duration:1500,
      onComplete: function() {
        that.busy = false;
        callback && callback.onComplete();
      }
    });
  },
  //adds the little brown bar when hovering the node
  select: function(id, name, index) {
    if(!this.config.selectOnHover) return;
    var s = this.selected;
    if(s.id != id || s.name != name 
        || s.index != index) {
      s.id = id;
      s.name = name;
      s.index = index;
      this.delegate.graph.eachNode(function(n) {
        n.setData('border', false);
      });
      if(id) {
        var n = this.delegate.graph.getNode(id);
        n.setData('border', s);
        var link = index === 0? 'prev':'next';
        link = n.getData(link);
        if(link) {
          n = this.delegate.graph.getByName(link);
          if(n) {
            n.setData('border', {
              name: name,
              index: 1-index
            });
          }
        }
      }
      this.delegate.plot();
    }
  },
  
  /*
    Method: getLegend
   
    Returns an object containing as keys the legend names and as values hex strings with color values.
    
    Example:
    
    (start code js)
    var legend = areaChart.getLegend();
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
    var ans = areaChart.getMaxValue();
    (end code)
    
    In some cases it could be useful to override this method to normalize heights for a group of AreaCharts, like when doing small multiples.
    
    Example:
    
    (start code js)
    //will return 100 for all AreaChart instances,
    //displaying all of them with the same scale
    $jit.AreaChart.implement({
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
          acumLeft = 0, acumRight = 0;
      $.each(valArray, function(v) { 
        acumLeft += +v[0];
        acumRight += +v[1];
      });
      var acum = acumRight>acumLeft? acumRight:acumLeft;
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
        size = this.delegate.canvas.getSize(),
        config = this.config,
        margin = config.Margin,
        labelOffset = config.labelOffset + config.Label.size,
        fixedDim = (size.width - (margin.left + margin.right)) / l,
        animate = config.animate,
        height = size.height - (margin.top + margin.bottom) - (config.showAggregates && labelOffset) 
          - (config.showLabels && labelOffset);
    this.delegate.graph.eachNode(function(n) {
      var acumLeft = 0, acumRight = 0, animateValue = [];
      $.each(n.getData('valueArray'), function(v) {
        acumLeft += +v[0];
        acumRight += +v[1];
        animateValue.push([0, 0]);
      });
      var acum = acumRight>acumLeft? acumRight:acumLeft;
      n.setData('width', fixedDim);
      if(animate) {
        n.setData('height', acum * height / maxValue, 'end');
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return [n[0] * height / maxValue, n[1] * height / maxValue]; 
        }), 'end');
        var dimArray = n.getData('dimArray');
        if(!dimArray) {
          n.setData('dimArray', animateValue);
        }
      } else {
        n.setData('height', acum * height / maxValue);
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return [n[0] * height / maxValue, n[1] * height / maxValue]; 
        }));
      }
    });
  }
});
