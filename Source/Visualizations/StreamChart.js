/*
 * File: StreamChart.js
 *
*/

$jit.StreamChart = new Class({
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
        type: 'streamchart-' + nodeType,
        align: 'center',
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
            that.select(node.id, elem.name, elem.index, node);
          } else {
            that.select(false, false, false);
          }
          that.setupLabels();
        },
        onMouseEnter: function() {
          delegate.canvas.getElement().style.cursor = 'pointer';
        },
        onMouseLeave: function() {
          delegate.canvas.getElement().style.cursor = 'default';
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
          '$prev': prev? prev.label : false,
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
        duration: 1500
      });
    }
  },

  setupLabels: function() {
    var filters = this.filterArray,
        g = this.delegate.graph,
        root = g.getNode(this.delegate.root),
        that = this,
        dims = {},
        map = {},
        ctx = this.canvas.getCtx(),
        size = this.canvas.getSize();

    root.eachAdjacency(function(a) {
      var n = a.nodeTo,
          pos = n.pos.getc(true),
          dimArray = n.getData('dimArray'),
          stringArray = n.getData('stringArray');

      if (!n.getData('prev') || !g.getByName(n.getData('next'))) {
        return;
      }

      for (var i = 0, l = stringArray.length; i < l; ++i) {
        var key = stringArray[i].trim(),
            dimLeft = dimArray[i][0],
            dimRight = dimArray[i][1],
            lpos = n.getData('left-pos'),
            rpos = n.getData('right-pos');

        if (!(key in dims) || dims[key] < dimLeft || dims[key] < dimRight) {
          if (dimLeft > dimRight) {
            dims[key] = dimLeft;
            var pos = n.getData('left-pos'),
                index = i * 2,
                mid = [(pos[index][0] + pos[index + 1][0]) / 2, (pos[index][1] + pos[index + 1][1]) / 2];
            map[key] = mid;
          } else {
            var pos = n.getData('right-pos'),
                index = i * 2,
                mid = [(pos[index][0] + pos[index + 1][0]) / 2, (pos[index][1] + pos[index + 1][1]) / 2];
            dims[key] = dimRight;
            map[key] = mid;
          }
        }
      }
    });

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '80px Helvetica';
    for (var i = 0, l = filters.length; i < l; ++i) {
      var pos = map[filters[i]],
          name = $(filters[i] + '_name').innerHTML.split(' ')[0];

      ctx.fillStyle = ctx.strokeStyle = 'white';
      ctx.fillText(name, pos[0], pos[1]);
      //ctx.fillStyle = ctx.strokeStyle = (filters[i] == 'DE' || filters[i] == 'NL' || filters[i] == 'UA') ? 'black' : 'white';
      /*
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 5;
      ctx.fillText(name, pos[0], pos[1], 60);
     */
    }
  },

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

  filter: function(filters, callback) {
    if(this.busy) return;
    this.busy = true;
    this.filterArray = filters.slice();
    if(this.config.Tips.enable) this.delegate.tips.hide();
    this.select(false, false, false);
    var args = $.splat(filters),
        rt = this.delegate.graph.getNode(this.delegate.root),
        that = this,
        maxHeight = -1,
        config = this.config,
        margin = config.Margin,
        size = this.canvas.getSize().height,
        totalHeight = size - margin.top - margin.bottom;

    this.normalizeDims();
    rt.eachAdjacency(function(adj) {
      var n = adj.nodeTo,
          dimArray = n.getData('dimArray', 'end'),
          stringArray = n.getData('stringArray'),
          acumLeft = 0,
          acumRight = 0,
          acum;

      n.setData('dimArray', $.map(dimArray, function(d, i) {
        if ($.indexOf(args, stringArray[i].trim()) > -1) {
          acumLeft += d[0];
          acumRight += d[1];
          return d;
        } else {
          return [0, 0];
        }
      }), 'end');

      acum = Math.max(acumLeft, acumRight);
      maxHeight = maxHeight < acum ? acum : maxHeight;
      n.setData('height', acum, 'end');
    });

    rt.eachAdjacency(function(adj) {
      var n = adj.nodeTo,
          dimArray = n.getData('dimArray', 'end'),
          height = n.getData('height', 'end');

      n.setData('height', height * totalHeight / maxHeight, 'end');
      $.each(dimArray, function(d, i) {
        dimArray[i][0] = totalHeight / maxHeight * d[0];
        dimArray[i][1] = totalHeight / maxHeight * d[1];
      });
    });

    this.delegate.fx.animate({
      modes: ['node-property:height:dimArray'],
      duration: 300,
      onComplete: function() {
        that.busy = false;
        callback && callback.onComplete();
      }
    });
  },

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

    this.delegate.config.levelDistance = height / 2;
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

(function() {

function setPositions(node) {
  var pos = node.pos.getc(true),
  width = node.getData('width'),
  height = node.getData('height'),
  algnPos = this.getAlignedPos(pos, width, height),
  x = algnPos.x,
  y = algnPos.y + height,
  dimArray = node.getData('dimArray'),
  heightLeft = $.reduce(dimArray, function(x, y) { return x + y[0]; }, 0),
  heightRight = $.reduce(dimArray, function(x, y) { return x + y[1]; }, 0),
  offsetHeight = (heightLeft - heightRight) / 2,
  left = [],
  right = [];

  for (var i=0, l=dimArray.length, acumLeft=0, acumRight=0; i<l; i++) {
    if (heightLeft >= heightRight) {
      left.push([x, y - acumLeft]);
      right.push([x + width, y - acumRight - offsetHeight]);
      right.push([x + width, y - acumRight - dimArray[i][1] - offsetHeight]);
      left.push([x, y - acumLeft - dimArray[i][0]]);
    } else {
      left.push([x, y - acumLeft + offsetHeight]);
      right.push([x + width, y - acumRight]);
      right.push([x + width, y - acumRight - dimArray[i][1]]);
      left.push([x, y - acumLeft - dimArray[i][0] + offsetHeight]);
    }
    acumLeft += ((dimArray[i][0]) || 0);
    acumRight += ((dimArray[i][1]) || 0);
  }

  node.setData('left-pos', left);
  node.setData('right-pos', right);
}

$jit.ST.Plot.NodeTypes.implement({
  'streamchart-smooth' : {
    'render' : function(node, canvas) {
      var pos = node.pos.getc(true),
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          x = algnPos.x, y = algnPos.y,
          stringArray = node.getData('stringArray'),
          dimArray = node.getData('dimArray'),
          heightLeft = $.reduce(dimArray, function(x, y) { return x + y[0]; }, 0),
          heightRight = $.reduce(dimArray, function(x, y) { return x + y[1]; }, 0),
          colorArray = node.getData('colorArray'),
          colorLength = colorArray.length,
          config = node.getData('config'),
          gradient = node.getData('gradient'),
          graph = this.viz.graph,
          prevLabel = node.getData('prev'),
          nextLabel = node.getData('next'),
          prev = prevLabel ? graph.getByName(prevLabel) : false,
          next = nextLabel ? graph.getByName(nextLabel) : false,
          prevPos = prev ? prev.pos.getc(true) : null,
          nextPos = next ? next.pos.getc(true) : null;
          offsetHeight = (heightLeft - heightRight) / 2;

      setPositions.call(this, node);

      var ctx = canvas.getCtx(),
          border = node.getData('border'),
          leftc = node.getData('left-pos'),
          rightc = node.getData('right-pos');

      if (prev && next) {
        setPositions.call(this, prev);
        setPositions.call(this, next);

        var left = prev.getData('left-pos'),
            right = next.getData('right-pos');
      } else {
        var left = leftc.map(function(l) {
              l = l.slice();
              l[0] -= width;
              return l;
            }),
            right = rightc.map(function(l) {
              l = l.slice();
              l[0] += width;
              return l;
            });
      }

      var bezierPoints = left.map(function(_, i) {
          var x1 = leftc[i][0],
              y1 = leftc[i][1],
              x2 = rightc[i][0],
              y2 = rightc[i][1],
              x0 = left[i][0],
              y0 = left[i][1],
              x3 = right[i][0],
              y3 = right[i][1],
              xc1 = (x0 + x1) / 2,
              yc1 = (y0 + y1) / 2,
              xc2 = (x1 + x2) / 2,
              yc2 = (y1 + y2) / 2,
              xc3 = (x2 + x3) / 2,
              yc3 = (y2 + y3) / 2,
              len1 = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)),
              len2 = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)),
              len3 = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2)),
              k1 = len1 / (len1 + len2),
              k2 = len2 / (len2 + len3),
              xm1 = xc1 + (xc2 - xc1) * k1,
              ym1 = yc1 + (yc2 - yc1) * k1,
              xm2 = xc2 + (xc3 - xc2) * k2,
              ym2 = yc2 + (yc3 - yc2) * k2,
              smoothness = 0.8,
              cpx1 = xm1 + (xc2 - xm1) * smoothness + x1 - xm1,
              cpy1 = ym1 + (yc2 - ym1) * smoothness + y1 - ym1,
              cpx2 = xm2 + (xc2 - xm2) * smoothness + x2 - xm2,
              cpy2 = ym2 + (yc2 - ym2) * smoothness + y2 - ym2;

         return [ cpx1, cpy1, cpx2, cpy2 ];
        });

        for (var i = 0, l = leftc.length; i < l; i += 2) {
          var lc = leftc[i],
              rc = rightc[i],
              bp = bezierPoints[i],
              lc1;

          ctx.fillStyle = ctx.strokeStyle = colorArray[(i >> 1) % colorLength];
          ctx.lineWidth = 0;
          //ctx.lineCap = 'round';

          var name = stringArray[i >> 1];

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(lc[0], lc[1]);
          ctx.bezierCurveTo(bp[0] , bp[1] , bp[2] , bp[3] , rc[0] , (rc[1] ));

          lc1 = leftc[i + 1];
          rc = rightc[i + 1];
          bp = bezierPoints[i + 1];

          ctx.lineTo(rc[0] , rc[1]);
          ctx.bezierCurveTo(bp[2] , bp[3] , bp[0] , bp[1] , lc1[0] , lc1[1] );
          //ctx.lineTo(lc[0], lc[1]);

          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          ctx.restore();
        }
    },

    'contains': function(node, mpos) {
      var canvas = this.viz.canvas,
          size = canvas.getSize(),
          ctx = canvas.getCtx(),
          pos = node.pos.getc(true),
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          x = algnPos.x, y = algnPos.y,
          dimArray = node.getData('dimArray'),
          rx = mpos.x - x;
      //bounding box check
      if(mpos.x < x || mpos.x > x + width) {
        return false;
      }

      mpos.x += size.width / 2;
      mpos.y += size.height / 2;

      var colorArray = node.getData('colorArray'),
          pointColor = ctx.getImageData(0, 0, size.width, size.height).data,
          index = (mpos.x + mpos.y * size.width) * 4,
          index2 = (mpos.x + (mpos.y - 5) * size.width) * 4,
          color = $.rgbToHex([pointColor[index], pointColor[index + 1], pointColor[index + 2]]).toUpperCase(),
          side = +(rx > width / 2);


      for (var i = 0, l = colorArray.length; i < l; ++i) {
        if (colorArray[i] == color) {
          return {
            name: node.getData('stringArray')[i],
            color: color,
            value: node.getData('valueArray')[i][side],
            index: side
          };
        }
      }

      //second try if we're on top of a label --totally thumb measured
      color = $.rgbToHex([pointColor[index2], pointColor[index2 + 1], pointColor[index2 + 2]]).toUpperCase();

      for (var i = 0, l = colorArray.length; i < l; ++i) {
        if (colorArray[i] == color) {
          return {
            name: node.getData('stringArray')[i],
            color: color,
            value: node.getData('valueArray')[i][side],
            index: side
          };
        }
      }

      return false;
    }
  },

  'streamchart-stacked' : {
    'render' : function(node, canvas) {
      var pos = node.pos.getc(true),
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          x = algnPos.x, y = algnPos.y,
          stringArray = node.getData('stringArray'),
          dimArray = node.getData('dimArray'),
          heightLeft = $.reduce(dimArray, function(x, y) { return x + y[0]; }, 0),
          heightRight = $.reduce(dimArray, function(x, y) { return x + y[1]; }, 0),
          colorArray = node.getData('colorArray'),
          colorLength = colorArray.length,
          config = node.getData('config'),
          gradient = node.getData('gradient'),
          graph = this.viz.graph,
          prevLabel = node.getData('prev'),
          nextLabel = node.getData('next'),
          prev = prevLabel ? graph.getByName(prevLabel) : false,
          next = nextLabel ? graph.getByName(nextLabel) : false,
          prevPos = prev ? prev.pos.getc(true) : null,
          nextPos = next ? next.pos.getc(true) : null;
          offsetHeight = (heightLeft - heightRight) / 2;

      setPositions.call(this, node);

      var ctx = canvas.getCtx(),
          border = node.getData('border'),
          leftc = node.getData('left-pos'),
          rightc = node.getData('right-pos');

      if (prev && next) {
        setPositions.call(this, prev);
        setPositions.call(this, next);

        var left = prev.getData('left-pos'),
            right = next.getData('right-pos');
      } else {
        var left = leftc.map(function(l) {
              l = l.slice();
              l[0] -= width;
              return l;
            }),
            right = rightc.map(function(l) {
              l = l.slice();
              l[0] += width;
              return l;
            });
      }

      for (var i = 0, l = leftc.length; i < l; i += 2) {
        var lc = leftc[i],
            rc = rightc[i],
            lc1;

        ctx.fillStyle = ctx.strokeStyle = colorArray[(i >> 1) % colorLength];

        var name = stringArray[i >> 1];

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(lc[0] -0.8, lc[1]);
        ctx.lineTo(rc[0], rc[1]);

        lc1 = leftc[i + 1];
        rc = rightc[i + 1];

        ctx.lineTo(rc[0], rc[1]);
        ctx.lineTo(lc1[0] -0.8, lc1[1]);
        ctx.lineTo(lc[0] -0.8, lc[1]);

        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    },

    'contains': function(node, mpos) {
      var canvas = this.viz.canvas,
          size = canvas.getSize(),
          ctx = canvas.getCtx(),
          pos = node.pos.getc(true),
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          x = algnPos.x, y = algnPos.y,
          dimArray = node.getData('dimArray'),
          rx = mpos.x - x;

      //bounding box check
      if(mpos.x < x || mpos.x > x + width ||
        mpos.y < y || mpos.y > y + height) {
        return false;
      }

      var left = node.getData('left-pos'),
          right = node.getData('right-pos');

      for (var i = 0, l = left.length; i < l; i += 2) {
        var leftPoint = left[i],
            rightPoint = right[i],
            intersec1 = leftPoint[1] + (rightPoint[1] - leftPoint[1]) * rx / width,
            nextLeftPoint = left[i + 1],
            nextRightPoint = right[i + 1],
            intersec2 = nextLeftPoint[1] + (nextRightPoint[1] - nextLeftPoint[1]) * rx / width;

        if (mpos.y <= intersec1 && mpos.y >= intersec2) {
          var side = +(rx > width/2);
          if (i == 0) {
            return false;
          }
          return {
            name: node.getData('stringArray')[i >> 1],
            color: node.getData('colorArray')[i >> 1],
            value: node.getData('valueArray')[i >> 1][side],
            index: side
          };
        }
      }
      return false;
    }
  }
});

})();
