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
        if(label.type == 'Native' && (aggregates || showLabels)) {
          ctx.save();
          ctx.fillStyle = ctx.strokeStyle = label.color;
          ctx.font = label.size + 'px ' + label.family;
          ctx.textBaseline = 'middle';
          if(aggregates) {
            if(horz) {
              ctx.textAlign = 'right';
              ctx.fillText(valAcum, x + acum - config.labelOffset, y + height/2);
            } else {
              ctx.textAlign = 'center';
              ctx.fillText(valAcum, x + width/2, y - height - label.size/2 - config.labelOffset, width);
            }
          }
          if(showLabels) {
            if(horz) {
              ctx.textAlign = 'center';
              ctx.translate(x - config.labelOffset - label.size/2, y + height/2);
              ctx.rotate(Math.PI / 2);
              ctx.fillText(node.name, 0, 0, width);
            } else {
              ctx.textAlign = 'center';
              ctx.fillText(node.name, x + width/2, y + label.size/2 + config.labelOffset, width);
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
              'value': node.getData('valueArray')[i]
            };
          }
        } else {
          acum -= dimi;
          var intersec = acum;
          if(mpos.y >= intersec) {
            return {
              'name': node.getData('stringArray')[i],
              'color': node.getData('colorArray')[i],
              'value': node.getData('valueArray')[i]
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
      $.merge(Options("Canvas", "BarChart", "Label"), opt);
    this.initializeViz();
  },
  
  initializeViz: function() {
    var config = this.config, that = this;
    var nodeType = config.type.split(":")[0],
        horz = config.orientation == 'horizontal',
        nodeLabels = {};
    
    var st = new $jit.ST({
      injectInto: config.injectInto,
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
          that.select(node.id, elem.name, elem.index);
        },
        onHide: function() {
          that.select(false, false, false);
        }
      },
      Events: {
        enable: true,
        type: 'Native',
        onClick: function(node, eventInfo, evt) {
          if(!config.Events.enable) return;
          var elem = eventInfo.getContains();
          config.Events.onClick(elem, eventInfo, evt);
        }
      },
      onCreateLabel: function(domElement, node) {
        var labelConf = config.Label;
        if(config.showLabels) {
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
          if(config.showAggregates) {
            wrapper.appendChild(aggregate);
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
        }
      },
      onPlaceLabel: function(domElement, node) {
        var labels = nodeLabels[node.id],
            wrapperStyle = labels.wrapper.style,
            labelStyle = labels.label.style,
            aggregateStyle = labels.aggregate.style,
            width = node.getData('width'),
            height = node.getData('height'),
            dimArray = node.getData('dimArray'),
            valArray = node.getData('valueArray'),
            font = parseInt(wrapperStyle.fontSize, 10),
            domStyle = domElement.style;
        
        if(dimArray && valArray) {
          wrapperStyle.width = aggregateStyle.width = labelStyle.width = domElement.style.width = width + 'px';
          for(var i=0, l=valArray.length, acum=0; i<l; i++) {
            if(dimArray[i] > 0) {
              acum+= valArray[i];
            }
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
          labels.aggregate.innerHTML = acum;
        }
      }
    });
    
    var size = st.canvas.getSize();
    if(horz) {
      st.config.offsetX = + size.width/2 - config.offset
        - (config.showLabels && (config.labelOffset + config.Label.size));    
    } else {
      st.config.offsetY = -size.height/2 + config.offset 
        + (config.showLabels && (config.labelOffset + config.Label.size));    
    }
    this.st = st;
    this.canvas = this.st.canvas;
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
        st = this.st,
        name = $.splat(json.label), 
        color = $.splat(json.color || this.colors),
        config = this.config,
        gradient = !!config.type.split(":")[1],
        animate = config.animate,
        horz = config.orientation == 'horizontal',
        that = this;
    
    for(var i=0, values=json.values, l=values.length; i<l; i++) {
      var val = values[i]
      var valArray = values[i].values;
      var acum = 0;
      ch.push({
        'id': prefix + val.label,
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
    st.loadJSON(root);
    
    this.normalizeDims();
    st.compute();
    st.select(st.root);
    if(animate) {
      if(horz) {
        st.fx.animate({
          modes: ['node-property:width:dimArray'],
          duration:1500,
          onComplete: function() {
            that.busy = false;
          }
        });
      } else {
        st.fx.animate({
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
    
    var st = this.st;
    var graph = st.graph;
    var values = json.values;
    var animate = this.config.animate;
    var that = this;
    var horz = this.config.orientation == 'horizontal';
    $.each(values, function(v) {
      var n = graph.getByName(v.label);
      if(n) {
        n.setData('valueArray', v.values);
      }
    });
    this.normalizeDims();
    st.compute();
    st.select(st.root);
    if(animate) {
      if(horz) {
        st.fx.animate({
          modes: ['node-property:width:dimArray'],
          duration:1500,
          onComplete: function() {
            that.busy = false;
            onComplete && onComplete.onComplete();
          }
        });
      } else {
        st.fx.animate({
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
      this.st.graph.eachNode(function(n) {
        if(id == n.id) {
          n.setData('border', s);
        } else {
          n.setData('border', false);
        }
      });
      this.st.plot();
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
    this.st.graph.getNode(this.st.root).eachAdjacency(function(adj) {
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
    var maxValue = 0;
    this.st.graph.eachNode(function(n) {
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
    var root = this.st.graph.getNode(this.st.root), l=0;
    root.eachAdjacency(function() {
      l++;
    });
    var maxValue = this.getMaxValue(),
        size = this.st.canvas.getSize(),
        config = this.config,
        offset = config.offset,
        horz = config.orientation == 'horizontal',
        fixedDim = (size[horz? 'height':'width'] - 2 * offset - (l -1) * config.barsOffset) / l,
        animate = config.animate,
        height = size[horz? 'width':'height'] - 2 * offset 
          - (!horz && config.showAggregates && (config.Label.size + config.labelOffset))
          - (config.showLabels && (config.Label.size + config.labelOffset)),
        dim1 = horz? 'height':'width',
        dim2 = horz? 'width':'height';
    this.st.graph.eachNode(function(n) {
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