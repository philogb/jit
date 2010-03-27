$jit.ST.Plot.NodeTypes.implement({
  'areachart-default' : {
    'render' : function(node, canvas) {
      var pos = node.pos.getc(true), 
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          x = algnPos.x, y = algnPos.y,
          dimArray = node.getData('dimArray'),
          colorArray = node.getData('colorArray'),
          stringArray = node.getData('stringArray');

      var ctx = canvas.getCtx();
      if (colorArray && dimArray && stringArray) {
        for (var i=0, l=dimArray.length, acumLeft=0, acumRight=0; i<l; i++) {
          ctx.fillStyle = ctx.strokeStyle = colorArray[i];
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, y - acumLeft);
          ctx.lineTo(x + width, y - acumRight);
          ctx.lineTo(x + width, y - acumRight - dimArray[i][1]);
          ctx.lineTo(x, y - acumLeft - dimArray[i][0]);
          ctx.lineTo(x, y - acumLeft);
          ctx.fill();
          ctx.restore();
          acumLeft += (dimArray[i][0] || 0);
          acumRight += (dimArray[i][1] || 0);
        }
      }
    },
    'contains': function(node, mpos) {
      var pos = node.pos.getc(true), 
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          x = algnPos.x, y = algnPos.y,
          dimArray = node.getData('dimArray');
      //if()
    }
  }
});

$jit.AreaChart = new Class({
  st: null,
  colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
  
  initialize: function(opt) {
    this.controller = this.config = 
      $.merge(Options("Canvas", "AreaChart"), opt);
    this.initializeViz();
  },
  
  initializeViz: function() {
    var config = this.config;
    var st = new $jit.ST({
      injectInto: config.injectInto,
      orientation: "bottom",
      levelDistance: 0,
      siblingOffset: 0,
      Node: {
        overridable: true,
        type: 'areachart-' + config.type,
        align: 'left'
      },
      Edge: {
        type: 'none'
      }
    });
    
    var size = st.canvas.getSize();
    st.config.offsetY = -size.height/2 + config.offset;    
    this.st = st;
  },
  
  loadJSON: function(json) {
    var prefix = $.time(), 
        ch = [], 
        that = this,
        st = this.st,
        size = st.canvas.getSize(),
        name = $.splat(json.label), 
        color = $.splat(json.color || that.colors),
        config = this.config;
    
    for(var i=0, values=json.values, maxValue=0, l=values.length; i<l-1; i++) {
      var val = values[i];
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
          '$stringArray': name
        },
        'children': []
      });
      $.each(valArray, function(v) { 
        acumLeft += +v[0];
        acumRight += +v[1];
      });
      var acum = acumRight>acumLeft? acumRight:acumLeft;
      maxValue = maxValue>acum? maxValue:acum;
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
    
    var fixedDim = size.width / l,
        animate = config.animate,
        offset = config.offset,
        height = size.height - 2 * offset;
    $jit.Graph.Util.eachNode(this.st.graph, function(n) {
      var acumLeft = 0, acumRight = 0, animateValue = [];
      $.each(n.getData('valueArray'), function(v) {
        acumLeft += +v[0];
        acumRight += +v[1];
        animateValue.push([0, 0]);
      });
      var acum = acumRight>acumLeft? acumRight:acumLeft;
      n.setData('width', fixedDim);
      if(animate) {
        n.setData('height', 0);
        n.setData('height', acum * height / maxValue, 'end');
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return [n[0] * height / maxValue, n[1] * height / maxValue]; 
        }), 'end');
        n.setData('dimArray', animateValue);
      } else {
        n.setData('height', acum * height / maxValue);
        n.setData('dimArray', $.map(n.getData('valueArray'), function(n) { 
          return [n[0] * height / maxValue, n[1] * height / maxValue]; 
        }));
      }
    });
    st.compute();
    st.select(st.root);
    if(animate) {
      st.fx.animate({
        modes: ['node-property:height:dimArray'],
        duration:1000
      });
    }
  }
});