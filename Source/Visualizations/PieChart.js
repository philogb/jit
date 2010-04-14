$jit.Sunburst.Plot.NodeTypes.implement({
  'piechart-default' : {
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
          config = node.getData('config'),
          showLabels = config.showLabels,
          label = config.Label;
      if (colorArray && dimArray && stringArray) {
        for (var i=0, l=dimArray.length, acum=config.offset, valAcum=0; i<l; i++) {
          var dimi = dimArray[i], colori = colorArray[i % colorLength];
          ctx.fillStyle = ctx.strokeStyle = colori;
          if(gradient && dimi) {
            var radialGradient = ctx.createRadialGradient(0, 0, acum,
                0, 0, acum + dimi);
            var colorRgb = $.hexToRgb(colori), 
                ans = $.map(colorRgb, function(i) { return (i * 0.7) >> 0; }),
                endColor = $.rgbToHex(ans);

            radialGradient.addColorStop(0, endColor);
            radialGradient.addColorStop(0.5, colori);
            radialGradient.addColorStop(0, endColor);
            ctx.fillStyle = radialGradient;
          }
          
          polar.rho = acum;
          polar.theta = begin;
          var p1coord = polar.getc(true);
          polar.theta = end;
          var p2coord = polar.getc(true);
          polar.rho += dimi;
          var p3coord = polar.getc(true);
          polar.theta = begin;
          var p4coord = polar.getc(true);

          ctx.moveTo(0, 0);
          ctx.beginPath();
          ctx.arc(0, 0, acum, begin, end, false);
          ctx.arc(0, 0, acum + dimi, end, begin, true);
          ctx.moveTo(p1coord.x, p1coord.y);
          ctx.lineTo(p4coord.x, p4coord.y);
          ctx.moveTo(p2coord.x, p2coord.y);
          ctx.lineTo(p3coord.x, p3coord.y);
          ctx.fill();
          
          acum += (dimi || 0);
          valAcum += (valueArray[i] || 0);
        }
        if(showLabels) {
          ctx.save();
          ctx.fillStyle = ctx.strokeStyle = label.color;
          ctx.font = label.size + 'px ' + label.family;
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          
          polar.rho = node.pos.rho + config.offset + config.labelOffset;
          polar.theta = node.pos.theta;
          var cart = polar.getc(true);
          
          ctx.fillText(valAcum, cart.x, cart.y);
          ctx.restore();
        }
      }
    },
    'contains': function(node, pos) {
      if (this.nodeTypes['none'].anglecontains.call(this, node, pos)) {
        var rho = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        var ld = this.config.levelDistance, d = node._depth;
        if(rho <=ld * d) {
          var config = node.getData('config'),
              dimArray = node.getData('dimArray');
          for(var i=0,l=dimArray.length,acum=config.offset; i<l; i++) {
            var dimi = dimArray[i];
            if(rho >= acum && rho <= acum + dimi) {
              return {
                name: node.getData('stringArray')[i],
                color: node.getData('colorArray')[i],
                value: node.getData('valueArray')[i]
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

$jit.PieChart = new Class({
  st: null,
  colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
  selected: {},
  busy: false,
  
  initialize: function(opt) {
    this.controller = this.config = 
      $.merge(Options("Canvas", "PieChart", "Label"), opt);
    this.initializeViz();
  },
  
  initializeViz: function() {
    var config = this.config, that = this;
    var nodeType = config.type.split(":")[0];
    var sb = new $jit.Sunburst({
      injectInto: config.injectInto,
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
    
    var size = sb.canvas.getSize(),
        min = Math.min;
    sb.config.levelDistance = min(size.width, size.height)/2 - config.offset;
    this.sb = sb;
  },
  
  loadJSON: function(json) {
    var prefix = $.time(), 
        ch = [], 
        sb = this.sb,
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
    sb.loadJSON(root);
    
    this.normalizeDims();
    sb.refresh();
    if(animate) {
      sb.fx.animate({
        modes: ['node-property:dimArray'],
        duration:1500
      });
    }
  },
  
  updateJSON: function(json, onComplete) {
    if(this.busy) return;
    this.busy = true;
    
    var sb = this.sb;
    var graph = sb.graph;
    var values = json.values;
    var animate = this.config.animate;
    var that = this;
    $.each(values, function(v) {
      var n = graph.getByName(v.label);
      if(n) {
        n.setData('valueArray', v.values);
        n.setData('angularWidth', $.reduce(v.values, function(x,y){return x+y;}));
      }
    });
    this.normalizeDims();
    sb.refresh();
    if(animate) {
      sb.fx.animate({
        modes: ['node-property:dimArray'],
        duration:1500,
        onComplete: function() {
          that.busy = false;
          onComplete && onComplete.onComplete();
        }
      });
    }
  },
    
  select: function(id, name, index) {
  },
  
  getLegend: function() {
    var legend = {};
    var n;
    $jit.Graph.Util.eachAdjacency(this.sb.graph.getNode(this.sb.root), function(adj) {
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
    $jit.Graph.Util.eachNode(this.sb.graph, function(n) {
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
    var root = this.sb.graph.getNode(this.sb.root), l=0;
    $jit.Graph.Util.eachAdjacency(root, function() {
      l++;
    });
    var maxValue = this.getMaxValue(),
        config = this.config,
        offset = config.offset,
        animate = config.animate,
        rho = this.sb.config.levelDistance;
    $jit.Graph.Util.eachNode(this.sb.graph, function(n) {
      var acum = 0, animateValue = [];
      $.each(n.getData('valueArray'), function(v) {
        acum += +v;
        animateValue.push(0);
      });
      if(animate) {
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return n * rho / maxValue; 
        }), 'end');
        var dimArray = n.getData('dimArray');
        if(!dimArray) {
          n.setData('dimArray', animateValue);
        }
      } else {
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return n * rho / maxValue; 
        }));
      }
    });
  }
});