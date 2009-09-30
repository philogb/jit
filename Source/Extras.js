/*
 * File: Extras.js
 * 
 * Provides Extras such as Tips and Style Effects.
 * 
 * Description:
 * 
 * Provides the <Tips> and <NodeStyles> classes and functions.
 *
 */

var MouseEventsManager = new Class({
  initialize: function(viz) {
    this.viz = viz;
    this.canvas = viz.canvas;
    this.nodeTypes = viz.fx.nodeTypes;
    this.registeredObjects = [];

    this.click = {
      node: null,
      time: $time()
    };
    
    this.mousemove = {
      node: null,
      time: $time()
    };
    
    this.mintime = 350;    
    this.attachEvents();
  },
  
  attachEvents: function() {
    var htmlCanvas = this.canvas.canvas, that = this;
    $addEvent(htmlCanvas, 'click', function(e, win) {
      that.handleEvent(that.click, 'onClick', e, win);
    });
    $addEvent(htmlCanvas, 'mousemove', function(e, win) {
      that.handleEvent(that.mousemove, 'onMousemove', e, win);
    });
  },
  
  register: function(obj) {
    this.registeredObjects.push(obj);
  },
  
  handleEvent: function(obj, method, e, win) {
    if($time() - obj.time <= this.mintime) return;
    obj.time = $time();
    var pos = Event.getPos(e, win);
    var p = this.canvas.getPos();
    var s = this.canvas.getSize();
    var newpos = {
        x: pos.x - p.x + s.width /2,
        y: - (pos.y - p.y + s.height /2)
    };
    var positions = this.nodeTypes;
    var opt = {
        'position': pos  
    };

    if(obj.node && positions[obj.node.getData('type')]
                             .contains(obj.node, newpos)) {
      for(var i=0, l=this.registeredObjects.length; i<l; i++) {
        this.registeredObjects[i][method](obj.node, opt);
      }
      return;
    }

    var g = this.viz.graph;
    for(var id in g.nodes) {
      var n = g.nodes[id];
      if(positions[n.getData('type')].contains(n, newpos)) {
        obj.node = n;
        for(var i=0, l=this.registeredObjects.length; i<l; i++) {
          this.registeredObjects[i][method](n, opt);
        }
        return;
      }
    }
  }
});

/*
   Class: Tips
    
   A class containing tip related functions. This class is not accessible by the user.
   
   Used by:
   
   <ST>, <Sunburst>, <Hypertree>, <RGraph>, <TM>, <ForceDirected>, <Icicle>
   
   See also:
   
   <Options.Tips>
*/

var Tips = new Class({
  initialize: function(viz) {
    this.viz = viz;
    this.controller = this.config = viz.config;
    //add tooltip
    if(this.config.Tips.allow && document.body) {
        var tip = document.getElementById('_tooltip') || document.createElement('div');
        tip.id = '_tooltip';
        tip.className = 'tip';
        var style = tip.style;
        style.position = 'absolute';
        style.display = 'none';
        style.zIndex = 13000;
        document.body.appendChild(tip);
        this.tip = tip;
        this.node = false;
    }
  },
  
  attachTip: function(node, elem) {
    if(this.config.Tips.allow) {
      var that = this, cont = this.controller;
      $addEvent(elem, 'mouseover', function(e){
        cont.Tips.onShow(that.tip, node, elem);
      });
      $addEvent(elem, 'mouseout', function(e){
          that.tip.style.display = 'none';
      });
      //Add mousemove event handler
      $addEvent(elem, 'mousemove', function(e, win){
        var pos = Event.getPos(e, win);
        that.setTooltipPosition(pos);
      });
    }
  },

  onClick: $empty,
  
  onMousemove: function(node, opt) {
    if(!node) {
      this.tip.style.display = 'none';
      this.node = false;
      return;
    }
    if(!this.node || this.node.id != node.id) {
      this.node = node;
      this.config.Tips.onShow(this.tip, node);
    }
    this.setTooltipPosition(opt.position);
  },
  
  setTooltipPosition: function(pos) {
    var tip = this.tip, style = tip.style, cont = this.config;
    style.display = '';
    //get window dimensions
    win = {
      'height': document.body.clientHeight,
      'width': document.body.clientWidth
    };
    //get tooltip dimensions
    var obj = {
      'width': tip.offsetWidth,
      'height': tip.offsetHeight  
    };
    //set tooltip position
    var x = cont.Tips.offsetX, y = cont.Tips.offsetY;
    style.top = ((page.y + y + obj.height > win.height)?  
        (page.y - obj.height - y) : page.y + y) + 'px';
    style.left = ((page.x + obj.width + x > win.width)? 
        (page.x - obj.width - x) : page.x + x) + 'px';
  }  
});

/*
  Class: NodeStyles
   
  Change node styles when clicking or hovering a node. This class is not accessible by the user.
  
  Used by:
  
  <ST>, <Sunburst>, <Hypertree>, <RGraph>, <TM>, <ForceDirected>, <Icicle>
  
  See also:
  
  <Options.NodeStyles>
*/
var NodeStyles = new Class({
  initialize: function(viz) {
    this.viz = viz;
    this.nodeStylesOnHover = viz.config.nodeStylesOnHover;
    this.nodeStylesOnClick = viz.config.nodeStylesOnClick;
  },
  
  getRestoredStylesOnHover: function(node) {
    var restoredStyles = {}, nStyles = this.nodeStylesOnHover;
    for(var prop in nStyles) {
      restoredStyles[prop] = node.getData(prop, 'start');
    }
    return restoredStyles;
  },
  
  getRestoredStylesOnClick: function(node) {
    var restoredStyles = {}, nStyles = this.nodeStylesOnClick;
    for(var prop in nStyles) {
      restoredStyles[prop] = node.getData(prop, 'start');
    }
    return restoredStyles;
  },
  
  toggleStylesOnHover: function(node, set) {
    if(this.nodeStylesOnHover) {
      this.toggleStylesOn('Hover', node, set);
    }
  },

  toggleStylesOnClick: function(node, set) {
    if(this.nodeStylesOnClick) {
      this.toggleStylesOn('Click', node, set);
    }
  },
  
  toggleStylesOn: function(type, node, set) {
    if(set) {
      var that = this;
      viz.fx.nodeFx({
        'elements': {
          'id': node.id,
          'properties': that['nodeStylesOn' + type]
         },
         transition: Trans.Quart.easeOut,
         duration:700
      });
    } else {
      var restoredStyles = this['getRestoredStylesOn' + type](node);
      viz.fx.nodeFx({
        'elements': {
          'id': node.id,
          'properties': restoredStyles
         },
         transition: Trans.Quart.easeOut,
         duration:700
      });
    }
  },

  attachNodeStylesOnHover: function(node, elem) {
    var that = this, viz = this.viz;
    var nStyles = viz.config.nodeStylesOnHover;
    if(nStyles) {
      $addEvent(elem, 'mouseover', function() {
        !node.selected && that.toggleStylesOnHover(node, true);
      });
      
      $addEvent(elem, 'mouseout', function() {
        !node.selected && that.toggleStylesOnHover(node, false);
      });
    }
  },

  attachNodeStylesOnClick: function(node, elem) {
    var viz = this.viz, that = this;
    var nStyles = viz.config.nodeStylesOnClick;
    if(nStyles) {
      $addEvent(elem, 'click', function() {
        that.toggleStylesOnClick(node, !node.selected);
        if(node.selected) 
          delete node.selected 
        else node.selected = true;
      });
    }
  },
  
  onClick: function(node, opt) {
    if(!node) return;
    var nStyles = this.nodeStylesOnClick;
    //if the node is selected then unselect it
    if(node.selected) {
      this.toggleStylesOnClick(node, false);
      delete node.selected;
    } else {
      //unselect all selected nodes...
      Graph.Util.eachNode(this.viz.graph, function(n) {
        if(n.selected) {
          for(var s in nStyles) {
            n.setData(s, n.getData(s, 'start'), 'end');
          }
          delete n.selected;
        }
      });
      //select clicked node
      this.toggleStylesOnClick(node, true);
      node.selected = true;
    }
  },
  
  onMousemove: function(node, opt) {
    var GUtil = Graph.Util, that = this;
    if(!node) {
      GUtil.eachNode(this.viz.graph, function(n) {
        if(n.hovered) {
          that.toggleStylesOnHover(n, false);
          delete n.hovered;
        }
      });
      return;
    }
    //if the node is hovered then exit
    if(node.hovered) return;
    //unselect all hovered nodes...
    var nStyles = this.nodeStylesOnHover;
    Graph.Util.eachNode(this.viz.graph, function(n) {
      if(n.hovered) {
        for(var s in nStyles) {
          n.setData(s, n.getData(s, 'start'), 'end');
        }
        delete n.hovered;
      }
    });
    //select hovered node
    this.toggleStylesOnHover(node, true);
    node.hovered = true;
  }
});