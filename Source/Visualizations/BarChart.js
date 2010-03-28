$jit.ST.Plot.NodeTypes.implement({
  'barchart-stacked' : {
    'render' : function(node, canvas) {
      var pos = node.pos.getc(true), 
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          x = algnPos.x, y = algnPos.y,
          dimArray = node.getData('dimArray'),
          colorArray = node.getData('colorArray'),
          colorLength = colorArray.length,
          stringArray = node.getData('stringArray');

      var ctx = canvas.getCtx(), 
          border = node.getData('border'),
          opt = {},
          gradient = node.getData('gradient');
      if (colorArray && dimArray && stringArray) {
        for (var i=0, l=dimArray.length, acum=0; i<l; i++) {
          ctx.fillStyle = ctx.strokeStyle = colorArray[i % colorLength];
          if(gradient) {
            var linear = ctx.createLinearGradient(x, y - acum - dimArray[i]/2, x + width, y - acum- dimArray[i]/2);
            var color = $.rgbToHex($.map($.hexToRgb(colorArray[i % colorLength].slice(1)), 
                function(v) { return (v * 0.5) >> 0; }));
            linear.addColorStop(0, color);
            linear.addColorStop(0.5, colorArray[i % colorLength]);
            linear.addColorStop(1, color);
            ctx.fillStyle = linear;
          }
          ctx.fillRect(x, y - acum - dimArray[i], width, dimArray[i]);
          if(border && border.name == stringArray[i]) {
            opt.acum = acum;
            opt.dimValue = dimArray[i];
          }
          acum += (dimArray[i] || 0);
        }
        if(border) {
          ctx.save();
          ctx.lineWidth = 2;
          ctx.strokeStyle = border.color;
          ctx.strokeRect(x + 1, y - opt.acum - opt.dimValue + 1, width -2, opt.dimValue -2);
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
      for(var i=0, l=dimArray.length, acum=y; i<l; i++) {
        var dimi = dimArray[i];
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
      return false;
    }
  }
});

$jit.BarChart = new Class({
  st: null,
  colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
  selected: {},
  busy: false,
  
  initialize: function(opt) {
    this.controller = this.config = 
      $.merge(Options("Canvas", "BarChart"), opt);
    this.initializeViz();
  },
  
  initializeViz: function() {
    var config = this.config, that = this;
    var nodeType = config.type.split(":")[0];
    var st = new $jit.ST({
      injectInto: config.injectInto,
      orientation: "bottom",
      levelDistance: 0,
      siblingOffset: config.barsOffset,
      subtreeOffset: 0,
      Node: {
        overridable: true,
        type: 'barchart-' + nodeType,
        align: 'left'
      },
      Edge: {
        type: 'none'
      },
      Tips: {
        allow: config.Tips.enable,
        attachToDOM: false,
        attachToCanvas: true,
        force: true,
        onShow: function(tip, node, opt) {
          var elem = opt.contains;
          config.Tips.onShow(tip, elem, node);
          that.select(node.id, elem.name, elem.index);
        },
        onHide: function() {
          that.select(false, false, false);
        }
      }
    });
    
    var size = st.canvas.getSize();
    st.config.offsetY = -size.height/2 + config.offset;    
    this.st = st;
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
        n.setData('valueArray', v.values);
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
  
  //adds the little brown bar when hovering the node
  select: function(id, name) {
    var s = this.selected;
    if(s.id != id || s.name != name) {
      s.id = id;
      s.name = name;
      s.color = this.config.hoveredColor;
      $jit.Graph.Util.eachNode(this.st.graph, function(n) {
        if(id == n.id) {
          n.setData('border', s);
        } else {
          n.setData('border', false);
        }
      });
      this.st.plot();
    }
  },
  
  getLegend: function() {
    var legend = {};
    var n;
    $jit.Graph.Util.eachAdjacency(this.st.graph.getNode(this.st.root), function(adj) {
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
    $jit.Graph.Util.eachNode(this.st.graph, function(n) {
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
    $jit.Graph.Util.eachAdjacency(root, function() {
      l++;
    });
    var maxValue = this.getMaxValue(),
        size = this.st.canvas.getSize(),
        config = this.config,
        offset = config.offset,
        fixedDim = (size.width - 2 * offset) / l,
        animate = config.animate,
        height = size.height - 2 * offset;
    $jit.Graph.Util.eachNode(this.st.graph, function(n) {
      var acum = 0, animateValue = [];
      $.each(n.getData('valueArray'), function(v) {
        acum += +v;
        animateValue.push(0);
      });
      n.setData('width', fixedDim);
      if(animate) {
        n.setData('height', 0);
        n.setData('height', acum * height / maxValue, 'end');
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return n * height / maxValue; 
        }), 'end');
        var dimArray = n.getData('dimArray');
        if(!dimArray) {
          n.setData('dimArray', animateValue);
        }
      } else {
        n.setData('height', acum * height / maxValue);
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return n * height / maxValue; 
        }));
      }
    });
  }
});