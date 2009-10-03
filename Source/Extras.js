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

/* 
 * Provides the initialization function for <NodeStyles> and <Tips> implemented 
 * by all main visualizations.
 *
 */
var Extras = {
  initializeExtras: function() {
    this.tips = new Tips(this);
    this.nodeStyles = new NodeStyles(this);
    
    var tips = this.config.Tips, ns = this.config.NodeStyles;
    if(tips.allow && tips.attachToCanvas || ns.attachToCanvas) {
      this.mouseEventsManager = new MouseEventsManager(this);
      tips.allow && tips.attachToCanvas && this.mouseEventsManager.register(this.tips);
      ns.attachToCanvas && this.mouseEventsManager.register(this.nodeStyles);
    }
  }   
};

/*
 * Manager for mouse events (clicking and mouse moving).
 * 
 * This class is used for registering objects implementing onClick
 * and onMousemove methods. These methods are called when clicking or
 * moving the mouse around  the Canvas.
 * For now, <Tips> and <NodeStyles> are classes implementing these methods.
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
    
    this.mintime = 5;    
    this.attachEvents();
  },
  
  attachEvents: function() {
    var htmlCanvas = this.canvas.getElement(), that = this;
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
    var fx = this.viz.fx;
    var g = this.viz.graph;
    var pos = Event.getPos(e, win);
    var p = this.canvas.getPos();
    var s = this.canvas.getSize();
    var newpos = {
        x: pos.x - p.x - s.width /2,
        y: pos.y - p.y - s.height /2
    };
    var positions = this.nodeTypes;
    var opt = {
        'position': pos  
    };

    if(obj.node) {
      var n = g.getNode(obj.node);
      if(n && positions[n.getData('type')]
                        .contains.call(fx, n, newpos)) {
        for(var i=0, l=this.registeredObjects.length; i<l; i++) {
          this.registeredObjects[i][method](n, opt);
        }
        return;
      }
    }
    for(var id in g.nodes) {
      var n = g.nodes[id];
      if(positions[n.getData('type')]
                   .contains.call(fx, n, newpos)) {
        obj.node = id;
        for(var i=0, l=this.registeredObjects.length; i<l; i++) {
          this.registeredObjects[i][method](n, opt);
        }
        return;
      }
    }
    for(var i=0, l=this.registeredObjects.length; i<l; i++) {
      this.registeredObjects[i][method](false, opt);
    }
  }
});

/*
   Class: Tips
    
   A class containing tip related functions. This class is used internally.
   
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
  
  attach: function(node, elem) {
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
    style.top = ((pos.y + y + obj.height > win.height)?  
        (pos.y - obj.height - y) : pos.y + y) + 'px';
    style.left = ((pos.x + obj.width + x > win.width)? 
        (pos.x - obj.width - x) : pos.x + x) + 'px';
  }  
});

/*
  Class: NodeStyles
   
  Change node styles when clicking or hovering a node. This class is used internally.
  
  Used by:
  
  <ST>, <Sunburst>, <Hypertree>, <RGraph>, <TM>, <ForceDirected>, <Icicle>
  
  See also:
  
  <Options.NodeStyles>
*/
var NodeStyles = new Class({
  initialize: function(viz) {
    this.viz = viz;
    this.fx = viz.fx;
    this.nStyles = viz.config.NodeStyles;
    this.nodeStylesOnHover = this.nStyles.stylesHover;
    this.nodeStylesOnClick = this.nStyles.stylesClick;    
  },
  
  getRestoredStylesOnHover: function(node) {
    var restoredStyles = {}, nStyles = this.nodeStylesOnHover;
    for(var prop in nStyles) {
      restoredStyles[prop] = node.styles['$' + prop];
    }
    return restoredStyles;
  },
  
  getRestoredStylesOnClick: function(node) {
    var restoredStyles = {}, nStyles = this.nodeStylesOnClick;
    for(var prop in nStyles) {
      restoredStyles[prop] = node.styles['$' + prop];
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
    var viz = this.viz;
    if(set) {
      var that = this;
      if(!node.styles) {
        node.styles = $merge(node.data, {});
      }
      viz.fx.nodeFx({
        'elements': {
          'id': node.id,
          'properties': that['nodeStylesOn' + type]
         },
         transition: Trans.Quart.easeOut,
         duration:300,
         fps:30
      });
    } else {
      var restoredStyles = this['getRestoredStylesOn' + type](node);
      viz.fx.nodeFx({
        'elements': {
          'id': node.id,
          'properties': restoredStyles
         },
         transition: Trans.Quart.easeOut,
         duration:300,
         fps:30
      });
    }
  },

  attachOnHover: function(node, elem) {
    var that = this, viz = this.viz;
    var nStyles = viz.config.NodeStyles.stylesHover;
    if(nStyles) {
      $addEvent(elem, 'mouseover', function() {
        if(!node.selected) {
          that.nStyles.onHover(node);
          that.toggleStylesOnHover(node, true);
        }
      });
      
      $addEvent(elem, 'mouseout', function() {
        !node.selected && that.toggleStylesOnHover(node, false);
      });
    }
  },

  attachOnClick: function(node, elem) {
    var viz = this.viz, that = this;
    var nStyles = viz.config.NodeStyles.stylesClick;
    if(nStyles) {
      $addEvent(elem, 'click', function() {
        that.onClick(node);
      });
    }
  },
  
  onClick: function(node, opt) {
    if(!node) return;
    var nStyles = this.nodeStylesOnClick;
    if(!nStyles) return;
    //if the node is selected then unselect it
    if(node.selected) {
      this.toggleStylesOnClick(node, false);
      delete node.selected;
    } else {
      //unselect all selected nodes...
      Graph.Util.eachNode(this.viz.graph, function(n) {
        if(n.selected) {
          for(var s in nStyles) {
            n.setData(s, n.styles['$' + s], 'end');
          }
          delete n.selected;
        }
      });
      //select clicked node
      this.nStyles.onClick(node);
      this.toggleStylesOnClick(node, true);
      node.selected = true;
    }
  },
  
  onMousemove: function(node, opt) {
    var GUtil = Graph.Util, that = this;
    var nStyles = this.nodeStylesOnHover;
    if(!nStyles) return;
    
    if(!node || node.selected) {
      GUtil.eachNode(this.viz.graph, function(n) {
        if(n.hovered && !n.selected) {
          that.toggleStylesOnHover(n, false);
          delete n.hovered;
        }
      });
      return;
    }
    //if the node is hovered then exit
    if(node.hovered) return;

    //check if an animation is running and exit
    //if it's a nodefx one.
    var anim = this.fx.animation;
    if(anim.timer) {
      if(anim.opt.type 
          && anim.opt.type == 'nodefx') {
        anim.stopTimer();
      } else {
        return;
      }
    }

    //unselect all hovered nodes...
    GUtil.eachNode(this.viz.graph, function(n) {
      if(n.hovered && !n.selected) {
        for(var s in nStyles) {
          n.setData(s, n.styles['$' + s], 'end');
        }
        delete n.hovered;
      }
    });
    //select hovered node
    this.nStyles.onHover(node);
    this.toggleStylesOnHover(node, true);
    node.hovered = true;
  }
});