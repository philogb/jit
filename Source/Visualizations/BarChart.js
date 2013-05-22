/*
 * File: BarChart.js
 *
*/

$jit.ST.Plot.NodeTypes.implement({
  'barchart-stacked' : {
    'render' : function(node, canvas) {
      var pos = node.pos.getc(true), 
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          x = algnPos.x, y = algnPos.y,
          dimArray = node.getData('dimArray'),
          valueArray = node.getData('valueArray'),
          colorArray = node.getData('colorArray'),
          colorLength = colorArray.length,
          stringArray = node.getData('stringArray');

      var ctx = canvas.getCtx(),
          opt = {},
          border = node.getData('border'),
          gradient = node.getData('gradient'),
          config = node.getData('config'),
          horz = config.orientation == 'horizontal',
          aggregates = config.showAggregates,
          showLabels = config.showLabels,
          label = config.Label;
      
      if (colorArray && dimArray && stringArray) {
        for (var i=0, l=dimArray.length, acum=0, valAcum=0; i<l; i++) {
          ctx.fillStyle = ctx.strokeStyle = colorArray[i % colorLength];
          if(gradient) {
            var linear;
            if(horz) {
              linear = ctx.createLinearGradient(x + acum + dimArray[i]/2, y, 
                  x + acum + dimArray[i]/2, y + height);
            } else {
              linear = ctx.createLinearGradient(x, y - acum - dimArray[i]/2, 
                  x + width, y - acum- dimArray[i]/2);
            }
            var color = $.rgbToHex($.map($.hexToRgb(colorArray[i % colorLength].slice(1)), 
                function(v) { return (v * 0.5) >> 0; }));
            linear.addColorStop(0, color);
            linear.addColorStop(0.5, colorArray[i % colorLength]);
            linear.addColorStop(1, color);
            ctx.fillStyle = linear;
          }
          if(horz) {
            ctx.fillRect(x + acum, y, dimArray[i], height);
          } else {
            ctx.fillRect(x, y - acum - dimArray[i], width, dimArray[i]);
          }
          if(border && border.name == stringArray[i]) {
            opt.acum = acum;
            opt.dimValue = dimArray[i];
          }
          acum += (dimArray[i] || 0);
          valAcum += (valueArray[i] || 0);
        }
        if(border) {
          ctx.save();
          ctx.lineWidth = 2;
          ctx.strokeStyle = border.color;
          if(horz) {
            ctx.strokeRect(x + opt.acum + 1, y + 1, opt.dimValue -2, height - 2);
          } else {
            ctx.strokeRect(x + 1, y - opt.acum - opt.dimValue + 1, width -2, opt.dimValue -2);
          }
          ctx.restore();
        }
        if(label.type == 'Native') {
          ctx.save();
          ctx.fillStyle = ctx.strokeStyle = label.color;
          ctx.font = label.style + ' ' + label.size + 'px ' + label.family;
          ctx.textBaseline = 'middle';
          var aggValue = aggregates(node.name, valAcum, node);
          if(aggValue !== false) {
            aggValue = aggValue !== true? aggValue : valAcum;
            if(horz) {
              ctx.textAlign = 'right';
              ctx.fillText(aggValue, x + acum - config.labelOffset, y + height/2);
            } else {
              ctx.textAlign = 'center';
              ctx.fillText(aggValue, x + width/2, y - height - label.size/2 - config.labelOffset);
            }
          }
          if(showLabels(node.name, valAcum, node)) {
            if(horz) {
              ctx.textAlign = 'center';
              ctx.translate(x - config.labelOffset - label.size/2, y + height/2);
              ctx.rotate(Math.PI / 2);
              ctx.fillText(node.name, 0, 0);
            } else {
              ctx.textAlign = 'center';
              ctx.fillText(node.name, x + width/2, y + label.size/2 + config.labelOffset);
            }
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
          config = node.getData('config'),
          rx = mpos.x - x,
          horz = config.orientation == 'horizontal';
      //bounding box check
      if(horz) {
        if(mpos.x < x || mpos.x > x + width
            || mpos.y > y + height || mpos.y < y) {
            return false;
          }
      } else {
        if(mpos.x < x || mpos.x > x + width
            || mpos.y > y || mpos.y < y - height) {
            return false;
          }
      }
      //deep check
      for(var i=0, l=dimArray.length, acum=(horz? x:y); i<l; i++) {
        var dimi = dimArray[i];
        if(horz) {
          acum += dimi;
          var intersec = acum;
          if(mpos.x <= intersec) {
            return {
              'name': node.getData('stringArray')[i],
              'color': node.getData('colorArray')[i],
              'value': node.getData('valueArray')[i],
              'label': node.name
            };
          }
        } else {
          acum -= dimi;
          var intersec = acum;
          if(mpos.y >= intersec) {
            return {
              'name': node.getData('stringArray')[i],
              'color': node.getData('colorArray')[i],
              'value': node.getData('valueArray')[i],
              'label': node.name
            };
          }
        }
      }
      return false;
    }
  },
  'barchart-grouped' : {
    'render' : function(node, canvas) {
      var pos = node.pos.getc(true), 
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          x = algnPos.x, y = algnPos.y,
          dimArray = node.getData('dimArray'),
          valueArray = node.getData('valueArray'),
          valueLength = valueArray.length,
          colorArray = node.getData('colorArray'),
          colorLength = colorArray.length,
          stringArray = node.getData('stringArray'); 

      var ctx = canvas.getCtx(),
          opt = {},
          border = node.getData('border'),
          gradient = node.getData('gradient'),
          config = node.getData('config'),
          horz = config.orientation == 'horizontal',
          aggregates = config.showAggregates,
          showLabels = config.showLabels,
          label = config.Label,
          fixedDim = (horz? height : width) / valueLength;
      
      if (colorArray && dimArray && stringArray) {
        for (var i=0, l=valueLength, acum=0, valAcum=0; i<l; i++) {
          ctx.fillStyle = ctx.strokeStyle = colorArray[i % colorLength];
          if(gradient) {
            var linear;
            if(horz) {
              linear = ctx.createLinearGradient(x + dimArray[i]/2, y + fixedDim * i, 
                  x + dimArray[i]/2, y + fixedDim * (i + 1));
            } else {
              linear = ctx.createLinearGradient(x + fixedDim * i, y - dimArray[i]/2, 
                  x + fixedDim * (i + 1), y - dimArray[i]/2);
            }
            var color = $.rgbToHex($.map($.hexToRgb(colorArray[i % colorLength].slice(1)), 
                function(v) { return (v * 0.5) >> 0; }));
            linear.addColorStop(0, color);
            linear.addColorStop(0.5, colorArray[i % colorLength]);
            linear.addColorStop(1, color);
            ctx.fillStyle = linear;
          }
          if(horz) {
            ctx.fillRect(x, y + fixedDim * i, dimArray[i], fixedDim);
          } else {
            ctx.fillRect(x + fixedDim * i, y - dimArray[i], fixedDim, dimArray[i]);
          }
          if(border && border.name == stringArray[i]) {
            opt.acum = fixedDim * i;
            opt.dimValue = dimArray[i];
          }
          acum += (dimArray[i] || 0);
          valAcum += (valueArray[i] || 0);
        }
        if(border) {
          ctx.save();
          ctx.lineWidth = 2;
          ctx.strokeStyle = border.color;
          if(horz) {
            ctx.strokeRect(x + 1, y + opt.acum + 1, opt.dimValue -2, fixedDim - 2);
          } else {
            ctx.strokeRect(x + opt.acum + 1, y - opt.dimValue + 1, fixedDim -2, opt.dimValue -2);
          }
          ctx.restore();
        }
        if(label.type == 'Native') {
          ctx.save();
          ctx.fillStyle = ctx.strokeStyle = label.color;
          ctx.font = label.style + ' ' + label.size + 'px ' + label.family;
          ctx.textBaseline = 'middle';
          var aggValue = aggregates(node.name, valAcum, node);
          if(aggValue !== false) {
            aggValue = aggValue !== true? aggValue : valAcum;
            if(horz) {
              ctx.textAlign = 'right';
              ctx.fillText(aggValue, x + Math.max.apply(null, dimArray) - config.labelOffset, y + height/2);
            } else {
              ctx.textAlign = 'center';
              ctx.fillText(aggValue, x + width/2, y - Math.max.apply(null, dimArray) - label.size/2 - config.labelOffset);
            }
          }
          var labValue = showLabels(node.name, valAcum, node);
          if(labValue !== false) {
            labValue = labValue !== true? labValue : node.name;
            if(horz) {
              ctx.textAlign = 'center';
              ctx.translate(x - config.labelOffset - label.size/2, y + height/2);
              ctx.rotate(Math.PI / 2);
              ctx.fillText(labValue, 0, 0);
            } else {
              ctx.textAlign = 'center';
              ctx.fillText(labValue, x + width/2, y + label.size/2 + config.labelOffset);
            }
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
          len = dimArray.length,
          config = node.getData('config'),
          rx = mpos.x - x,
          horz = config.orientation == 'horizontal',
          fixedDim = (horz? height : width) / len;
      //bounding box check
      if(horz) {
        if(mpos.x < x || mpos.x > x + width
            || mpos.y > y + height || mpos.y < y) {
            return false;
          }
      } else {
        if(mpos.x < x || mpos.x > x + width
            || mpos.y > y || mpos.y < y - height) {
            return false;
          }
      }
      //deep check
      for(var i=0, l=dimArray.length; i<l; i++) {
        var dimi = dimArray[i];
        if(horz) {
          var limit = y + fixedDim * i;
          if(mpos.x <= x+ dimi && mpos.y >= limit && mpos.y <= limit + fixedDim) {
            return {
              'name': node.getData('stringArray')[i],
              'color': node.getData('colorArray')[i],
              'value': node.getData('valueArray')[i],
              'label': node.name
            };
          }
        } else {
          var limit = x + fixedDim * i;
          if(mpos.x >= limit && mpos.x <= limit + fixedDim && mpos.y >= y - dimi) {
            return {
              'name': node.getData('stringArray')[i],
              'color': node.getData('colorArray')[i],
              'value': node.getData('valueArray')[i],
              'label': node.name
            };
          }
        }
      }
      return false;
    }
  }
});

/*
  Class: BarChart
  
  A visualization that displays stacked bar charts.
  
  Constructor Options:
  
  See <Options.BarChart>.

*/
$jit.BarChart = new Class({
  st: null,
  colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
  selected: {},
  busy: false,
  
  initialize: function(opt) {
    this.controller = this.config = 
      $.merge(Options("Canvas", "Margin", "Label", "BarChart"), {
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
    var config = this.config, that = this;
    var nodeType = config.type.split(":")[0],
        horz = config.orientation == 'horizontal',
        nodeLabels = {};
    
    var delegate = new $jit.ST({
      injectInto: config.injectInto,
      width: config.width,
      height: config.height,
      orientation: horz? 'left' : 'bottom',
      levelDistance: 0,
      siblingOffset: config.barsOffset,
      subtreeOffset: 0,
      withLabels: config.Label.type != 'Native',      
      useCanvas: config.useCanvas,
      Label: {
        type: config.Label.type
      },
      Node: {
        overridable: true,
        type: 'barchart-' + nodeType,
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
        var labelConf = config.Label,
            valueArray = node.getData('valueArray'),
            acum = $.reduce(valueArray, function(x, y) { return x + y; }, 0);
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
        if(!config.showLabels(node.name, acum, node)) {
          labelStyle.display = 'none';
        }
        if(!config.showAggregates(node.name, acum, node)) {
          aggregateStyle.display = 'none';
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
        aggregateStyle.left = labelStyle.left =  '0px';

        label.innerHTML = node.name;
        
        domElement.appendChild(wrapper);
      },
      onPlaceLabel: function(domElement, node) {
        if(!nodeLabels[node.id]) return;
        var labels = nodeLabels[node.id],
            wrapperStyle = labels.wrapper.style,
            labelStyle = labels.label.style,
            aggregateStyle = labels.aggregate.style,
            grouped = config.type.split(':')[0] == 'grouped',
            horz = config.orientation == 'horizontal',
            dimArray = node.getData('dimArray'),
            valArray = node.getData('valueArray'),
            width = (grouped && horz)? Math.max.apply(null, dimArray) : node.getData('width'),
            height = (grouped && !horz)? Math.max.apply(null, dimArray) : node.getData('height'),
            font = parseInt(wrapperStyle.fontSize, 10),
            domStyle = domElement.style;
            
        
        if(dimArray && valArray) {
          wrapperStyle.width = aggregateStyle.width = labelStyle.width = domElement.style.width = width + 'px';
          for(var i=0, l=valArray.length, acum=0; i<l; i++) {
            if(dimArray[i] > 0) {
              acum+= valArray[i];
            }
          }
          if(config.showLabels(node.name, acum, node)) {
            labelStyle.display = '';
          } else {
            labelStyle.display = 'none';
          }
          var aggValue = config.showAggregates(node.name, acum, node);
          if(aggValue !== false) {
            aggregateStyle.display = '';
          } else {
            aggregateStyle.display = 'none';
          }
          if(config.orientation == 'horizontal') {
            aggregateStyle.textAlign = 'right';
            labelStyle.textAlign = 'left';
            labelStyle.textIndex = aggregateStyle.textIndent = config.labelOffset + 'px';
            aggregateStyle.top = labelStyle.top = (height-font)/2 + 'px';
            domElement.style.height = wrapperStyle.height = height + 'px';
          } else {
            aggregateStyle.top = (-font - config.labelOffset) + 'px';
            labelStyle.top = (config.labelOffset + height) + 'px';
            domElement.style.top = parseInt(domElement.style.top, 10) - height + 'px';
            domElement.style.height = wrapperStyle.height = height + 'px';
          }
          labels.aggregate.innerHTML = aggValue !== true? aggValue : acum;
        }
      }
    });
    
    var size = delegate.canvas.getSize(),
        margin = config.Margin;
    if(horz) {
      delegate.config.offsetX = size.width/2 - margin.left
        - (config.showLabels && (config.labelOffset + config.Label.size));    
      delegate.config.offsetY = (margin.bottom - margin.top)/2;
    } else {
      delegate.config.offsetY = -size.height/2 + margin.bottom 
        + (config.showLabels && (config.labelOffset + config.Label.size));
      delegate.config.offsetX = (margin.right - margin.left)/2;
    }
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
    var barChart = new $jit.BarChart(options);
    barChart.loadJSON(json);
    (end code)
 */  
  loadJSON: function(json) {
    if(this.busy) return;
    this.busy = true;
    
    var prefix = $.time(), 
        ch = [], 
        delegate = this.delegate,
        name = $.splat(json.label), 
        color = $.splat(json.color || this.colors),
        config = this.config,
        gradient = !!config.type.split(":")[1],
        animate = config.animate,
        horz = config.orientation == 'horizontal',
        that = this;
    
    for(var i=0, values=json.values, l=values.length; i<l; i++) {
      var val = values[i]
      var valArray = $.splat(values[i].values);
      var acum = 0;
      if (typeof val.id == 'undefined') {
        val.id = val.label;
      } 
      ch.push({
        'id': prefix + val.id,
        'name': val.label,
        'data': {
          'value': valArray,
          '$valueArray': valArray,
          '$colorArray': color,
          '$stringArray': name,
          '$gradient': gradient,
          '$config': config
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
      if(horz) {
        delegate.fx.animate({
          modes: ['node-property:width:dimArray'],
          duration:1500,
          onComplete: function() {
            that.busy = false;
          }
        });
      } else {
        delegate.fx.animate({
          modes: ['node-property:height:dimArray'],
          duration:1500,
          onComplete: function() {
            that.busy = false;
          }
        });
      }
    } else {
      this.busy = false;
    }
  },
  
  /*
    Method: updateJSON
   
    Use this method when updating values for the current JSON data. If the items specified by the JSON data already exist in the graph then their values will be updated.
    
    Parameters:
    
    json - (object) JSON data to be updated. The JSON format corresponds to the one described in <BarChart.loadJSON>.
    onComplete - (object) A callback object to be called when the animation transition when updating the data end.
    
    Example:
    
    (start code js)
    barChart.updateJSON(json, {
      onComplete: function() {
        alert('update complete!');
      }
    });
    (end code)
 */  
  updateJSON: function(json, onComplete) {
    if(this.busy) return;
    this.busy = true;
    this.select(false, false, false);
    var delegate = this.delegate;
    var graph = delegate.graph;
    var values = json.values;
    var animate = this.config.animate;
    var that = this;
    var horz = this.config.orientation == 'horizontal';
    $.each(values, function(v) {
      var n = graph.getByName(v.label);
      if(n) {
        n.setData('valueArray', $.splat(v.values));
        if(json.label) {
          n.setData('stringArray', $.splat(json.label));
        }
      }
    });
    this.normalizeDims();
    delegate.compute();
    delegate.select(delegate.root);
    if(animate) {
      if(horz) {
        delegate.fx.animate({
          modes: ['node-property:width:dimArray'],
          duration:1500,
          onComplete: function() {
            that.busy = false;
            onComplete && onComplete.onComplete();
          }
        });
      } else {
        delegate.fx.animate({
          modes: ['node-property:height:dimArray'],
          duration:1500,
          onComplete: function() {
            that.busy = false;
            onComplete && onComplete.onComplete();
          }
        });
      }
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
    var legend = barChart.getLegend();
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
    var ans = barChart.getMaxValue();
    (end code)
    
    In some cases it could be useful to override this method to normalize heights for a group of BarCharts, like when doing small multiples.
    
    Example:
    
    (start code js)
    //will return 100 for all BarChart instances,
    //displaying all of them with the same scale
    $jit.BarChart.implement({
      'getMaxValue': function() {
        return 100;
      }
    });
    (end code)
    
  */  
  getMaxValue: function() {
    var maxValue = 0, stacked = this.config.type.split(':')[0] == 'stacked';
    this.delegate.graph.eachNode(function(n) {
      var valArray = n.getData('valueArray'),
          acum = 0;
      if(!valArray) return;
      if(stacked) {
        $.each(valArray, function(v) { 
          acum += +v;
        });
      } else {
        acum = Math.max.apply(null, valArray);
      }
      maxValue = maxValue>acum? maxValue:acum;
    });
    return maxValue;
  },
  
  setBarType: function(type) {
    this.config.type = type;
    this.delegate.config.Node.type = 'barchart-' + type.split(':')[0];
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
        marginWidth = margin.left + margin.right,
        marginHeight = margin.top + margin.bottom,
        horz = config.orientation == 'horizontal',
        fixedDim = (size[horz? 'height':'width'] - (horz? marginHeight:marginWidth) - (l -1) * config.barsOffset) / l,
        animate = config.animate,
        height = size[horz? 'width':'height'] - (horz? marginWidth:marginHeight) 
          - (!horz && config.showAggregates && (config.Label.size + config.labelOffset))
          - (config.showLabels && (config.Label.size + config.labelOffset)),
        dim1 = horz? 'height':'width',
        dim2 = horz? 'width':'height';
    this.delegate.graph.eachNode(function(n) {
      var acum = 0, animateValue = [];
      $.each(n.getData('valueArray'), function(v) {
        acum += +v;
        animateValue.push(0);
      });
      n.setData(dim1, fixedDim);
      if(animate) {
        n.setData(dim2, acum * height / maxValue, 'end');
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return n * height / maxValue; 
        }), 'end');
        var dimArray = n.getData('dimArray');
        if(!dimArray) {
          n.setData('dimArray', animateValue);
        }
      } else {
        n.setData(dim2, acum * height / maxValue);
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return n * height / maxValue; 
        }));
      }
    });
  }
});
