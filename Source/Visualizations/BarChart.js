$jit.ST.Plot.NodeTypes.implement({
  'barchart-default' : {
    'render' : function(node, canvas) {
      var pos = node.pos.getc(true), 
          nconfig = this.node, 
          orn = this.viz.config.orientation,
          xcoord = (orn == "top" || orn == "bottom"),
          width = node.getData('width'),
          height = node.getData('height'),
          algnPos = this.getAlignedPos(pos, width, height),
          valueArray = node.getData('valueArray'),
          colorArray = node.getData('colorArray'),
          stringArray = node.getData('stringArray');

      var ctx = canvas.getCtx();
      if (colorArray && valueArray && stringArray) {
        for (var i=0, l=valueArray.length, acum=0; i<l; i++) {
          ctx.fillStyle = colorArray[i];
          if (xcoord) {
            ctx.fillRect(algnPos.x, algnPos.y + acum, width,
                valueArray[i] || 0);
          } else {
            ctx.fillRect(algnPos.x + acum, algnPos.y,
                valueArray[i] || 0, height);
          }
          acum += (valueArray[i] || 0);
        }
      }
    }
  },
  
  'barchart-gradient': {
    'render': function(node, canvas) {
      var pos = node.pos.getc(true), 
        nconfig = this.node, 
        orn = this.viz.config.orientation,
        xcoord = (orn == "top" || orn == "bottom"),
        width = node.getData('width'),
        height = node.getData('height'),
        algnPos = this.getAlignedPos(pos, width, height),
        valueArray = node.getData('valueArray'),
        colorArray = node.getData('colorArray'),
        stringArray = node.getData('stringArray');

      var ctx = canvas.getCtx();
      if (colorArray && valueArray && stringArray) {
        for (var i=0, l=valueArray.length, acum=0; i<l; i++) {
          var rgb = $.hexToRgb(colorArray[i]);
          var rgbdark = [];
          $.each(rgb, function(e) { rgbdark.push((e * 0.3) >> 0); });
          rgb = $.rgbToHex(rgb);
          rgbdark = $.rgbToHex(rgbdark);
          if (xcoord) {
            var lgradient = ctx.createLinearGradient(algnPos.x + width/2, algnPos.y + acum, 
                algnPos.x + width/2, algnPos.y + acum + (valueArray[i] || 0));
            lgradient.addColorStop(0, rgb);
            lgradient.addColorStop(0.5, rgb);
            lgradient.addColorStop(1, rgbdark);

            ctx.fillStyle = colorArray[i];
            ctx.fillRect(algnPos.x, algnPos.y + acum, width,
                valueArray[i] || 0);
          } else {
            var lgradient = ctx.createLinearGradient(algnPos.x + acum, algnPos.y + height/2, 
                algnPos.x  + acum + (valueArray[i] || 0), algnPos.y + height/2);
            
            lgradient.addColorStop(0, rgb);
            lgradient.addColorStop(0.5, rgb);
            lgradient.addColorStop(1, rgbdark);
            
            ctx.fillRect(algnPos.x + acum, algnPos.y,
                valueArray[i] || 0, height);
          }
          acum += (valueArray[i] || 0);
        }
      }
    }
  }
});

$jit.BarChart = new Class({
  st: null,
  colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
  
  initialize: function(opt) {
    this.controller = this.config = 
      $.merge(Options("Canvas", "BarChart"), opt);
    this.initializeViz();
  },
  
  initializeViz: function() {
    var config = this.config;
    var st = new $jit.ST({
      injectInto: config.injectInto,
      orientation: config.orientation,
      levelDistance: 100,
      siblingOffset: config.offset,
      Node: {
        overridable: true,
        type: 'barchart-' + config.type,
        align: 'left'
      },
      Edge: {
//        type: 'none'
      }
    });
    
    var size = st.canvas.getSize();
    switch(config.orientation) {
      case "top":
        st.config.offsetX;
        st.config.offsetY;
        break;
      case "bottom":
        st.config.offsetX;
        st.config.offsetY;
        break;
      case "left":
        st.config.offsetX;
        st.config.offsetY;
        break;
      case "right":
        st.config.offsetX;
        st.config.offsetY;
        break;
    }
    
    this.st = st;
  },
  
  loadJSON: function(json) {
    var prefix = $.time(), 
        ch = [], 
        that = this,
        size = this.st.canvas.getSize(),
        name = $.splat(json.label), 
        color = $.splat(json.color || that.colors),
        st = this.st,
        config = this.config;
    
    for(var i=0, values=json.values, maxValue=0, l=values.length; i<l-1; i++) {
      var val = values[i];
      var valArray = values[i].values;
      var acum = 0;
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
        acum += +v;
      });
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
        animate = config.animate;
    $jit.Graph.Util.eachNode(this.st.graph, function(n) {
      var acum = 0, animateValue = [];
      $.each(n.getData('valueArray'), function(v) {
        acum += +v;
        animateValue.push(0);
      });
      n.setData('width', fixedDim);
      if(animate) {
        n.setData('height', 0);
        n.setData('height', acum * size['height'] / maxValue, 'end');
        n.setData('valueArray', n.getData('valueArray'), 'end');
        n.setData('valueArray', animateValue);
      } else {
        n.setData('height', acum * size['height'] / maxValue);
      }
    });
    st.compute();
    st.select(st.root);
    if(animate) {
      st.fx.animate({
        modes: ['node-property:height:valueArray'],
        duration:1000
      });
    }
  }
});