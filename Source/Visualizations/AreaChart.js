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
          ctx.fillStyle = '#ffffff';
          ctx.font = label.size + 'px ' + label.family;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          if(aggregates) {
            ctx.fillText(valAcum, x, y - acumLeft - config.labelOffset - label.size/2, width);
          }
          if(showLabels) {
            ctx.fillText(node.name, x, y + label.size/2 + config.labelOffset, width);
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

$jit.AreaChart = new Class({
  st: null,
  colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
  selected: {},
  busy: false,
  
  initialize: function(opt) {
    this.controller = this.config = 
      $.merge(Options("Canvas", "AreaChart", "Label"), opt);
    this.initializeViz();
  },
  
  initializeViz: function() {
    var config = this.config,
        that = this,
        nodeType = config.type.split(":")[0],
        nodeLabels = {};

    var st = new $jit.ST({
      injectInto: config.injectInto,
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
          if(!config.filterOnClick) return;
          var elem = eventInfo.getContains();
          if(elem) that.filter(elem.name);
        },
        onRightClick: function(node, eventInfo, evt) {
          if(!config.restoreOnRightClick) return;
          that.restore();
        }
      },
      onCreateLabel: function(domElement, node) {
        var labelConf = config.Label;
        if(config.showLabels && node.getData('prev')) {
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
            font = parseInt(wrapperStyle.fontSize, 10),
            domStyle = domElement.style;
        
        if(dimArray && valArray) {
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
          labels.aggregate.innerHTML = acum;
        }
      }
    });
    
    var size = st.canvas.getSize();
    st.config.offsetY = -size.height/2 + config.offset 
      + (config.showLabels && (config.labelOffset + config.Label.size));    
    this.st = st;
    this.canvas = this.st.canvas;
  },
  
  loadJSON: function(json) {
    var prefix = $.time(), 
        ch = [], 
        st = this.st,
        name = $.splat(json.label), 
        color = $.splat(json.color || this.colors),
        config = this.config,
        gradient = !!config.type.split(":")[1],
        animate = config.animate;
    
    for(var i=0, values=json.values, l=values.length; i<l-1; i++) {
      var val = values[i], prev = values[i-1], next = values[i+1];
      var valLeft = values[i].values, valRight = values[i+1].values;
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
          '$prev': prev? prev.label:null,
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
    st.loadJSON(root);
    
    this.normalizeDims();
    st.compute();
    st.select(st.root);
    if(animate) {
      st.fx.animate({
        modes: ['node-property:height:dimArray'],
        duration:1500
      });
    }
  },
  
  updateJSON: function(json, onComplete) {
    if(this.busy) return;
    this.busy = true;
    
    var st = this.st;
    var graph = st.graph;
    var values = json.values;
    var animate = this.config.animate;
    var that = this;
    $.each(values, function(v) {
      var n = graph.getByName(v.label);
      if(n) {
        var valArray = n.getData('valueArray');
        $.each(valArray, function(a, i) {
          a[0] = v.values[i];
        });
        n.setData('valueArray', valArray);
        var prev = n.getData('prev');
        if(prev) {
          var p = graph.getByName(prev);
          var valArray = p.getData('valueArray');
          $.each(valArray, function(a, i) {
            a[1] = v.values[i];
          });
          p.setData('valueArray', valArray);
        }
      }
    });
    this.normalizeDims();
    st.compute();
    st.select(st.root);
    if(animate) {
      st.fx.animate({
        modes: ['node-property:height:dimArray'],
        duration:1500,
        onComplete: function() {
          that.busy = false;
          onComplete && onComplete.onComplete();
        }
      });
    }
  },
  
  filter: function() {
    if(this.busy) return;
    this.busy = true;
    if(this.st.tips) this.st.tips.hide();
    this.select(false, false, false);
    var args = Array.prototype.slice.call(arguments);
    var rt = this.st.graph.getNode(this.st.root);
    var that = this;
    rt.eachAdjacency(function(adj) {
      var n = adj.nodeTo, 
          dimArray = n.getData('dimArray'),
          stringArray = n.getData('stringArray');
      n.setData('dimArray', $.map(dimArray, function(d, i) {
        return ($.indexOf(args, stringArray[i]) > -1)? d:[0, 0];
      }), 'end');
    });
    this.st.fx.animate({
      modes: ['node-property:dimArray'],
      duration:1500,
      onComplete: function() {
        that.busy = false;
      }
    });
  },
  
  restore: function() {
    if(this.busy) return;
    this.busy = true;
    if(this.st.tips) this.st.tips.hide();
    this.select(false, false, false);
    this.normalizeDims();
    var that = this;
    this.st.fx.animate({
      modes: ['node-property:height:dimArray'],
      duration:1500,
      onComplete: function() {
        that.busy = false;
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
      this.st.graph.eachNode(function(n) {
        n.setData('border', false);
      });
      if(id) {
        var n = this.st.graph.getNode(id);
        n.setData('border', s);
        var link = index === 0? 'prev':'next';
        link = n.getData(link);
        if(link) {
          n = this.st.graph.getByName(link);
          if(n) {
            n.setData('border', {
              name: name,
              index: 1-index
            });
          }
        }
      }
      this.st.plot();
    }
  },
  
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
  
  getMaxValue: function() {
    var maxValue = 0;
    this.st.graph.eachNode(function(n) {
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
    var root = this.st.graph.getNode(this.st.root), l=0;
    root.eachAdjacency(function() {
      l++;
    });
    var maxValue = this.getMaxValue(),
        size = this.st.canvas.getSize(),
        config = this.config,
        offset = config.offset,
        labelOffset = config.labelOffset + config.Label.size,
        fixedDim = (size.width - 2 * offset) / l,
        animate = config.animate,
        height = size.height - 2 * offset - (config.showAggregates && labelOffset) 
          - (config.showLabels && labelOffset);
    this.st.graph.eachNode(function(n) {
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