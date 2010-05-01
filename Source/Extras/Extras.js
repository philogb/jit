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
 * Manager for mouse events (clicking and mouse moving).
 * 
 * This class is used for registering objects implementing onClick
 * and onMousemove methods. These methods are called when clicking or
 * moving the mouse around  the Canvas.
 * For now, <Tips> and <NodeStyles> are classes implementing these methods.
 * 
 */
var ExtrasInitializer = {
  initialize: function(className, viz) {
    this.viz = viz;
    this.canvas = viz.canvas;
    this.config = viz.config[className];
    this.nodeTypes = viz.fx.nodeTypes;
    var type = this.config.type;
    this.dom = type == 'auto'? (viz.config.Label.type != 'Native') : (type != 'Native');
    this.postInitialize();
  },
  postInitialize: $.empty,
  setAsProperty: $.lambda(false),
  isEnabled: function() {
    return this.config.enabled;
  }
};

var EventsInterface = {
  onMouseUp: $.empty,
  onMouseDown: $.empty,
  onMouseMove: $.empty,
  onMouseOver: $.empty,
  onMouseOut: $.empty
};

var MouseEventsManager = new Class({
  initialize: function(viz) {
    this.viz = viz;
    this.node = false;
    this.registeredObjects = [];
    this.attachEvents();
  },
  
  attachEvents: function() {
    var htmlCanvas = this.canvas.getElement(), 
        that = this;
    $.addEvents(htmlCanvas, {
      'contextmenu': $.lambda(false),
      'mouseup': function(e, win) {
        that.handleEvent('MouseUp', e, win);
      },
      'mousedown': function(e, win) {
        that.handleEvent('MouseDown', e, win);
      },
      'mousemove': function(e, win) {
        that.handleEvent('MouseMove', e, win, that.makeEventObject(e, win));
      },
      'mouseover': function(e, win) {
        that.handleEvent('MouseOver', e, win);
      },
      'mouseout': function(e, win) {
        that.handleEvent('MouseOut', e, win);
      }
    });
  },
  
  register: function(obj) {
    this.registeredObjects.push(obj);
  },
  
  handleEvent: function(type, e, win, event) {
    for(var i=0, regs=this.registeredObjects, l=regs.length; i<l; i++) {
      regs[i]['on' + type](e, win, event);
    }
  },
  
  makeEventObject: function(e, win) {
    var that = this,
        graph = this.viz.graph,
        fx = this.viz.fx,
        types = fx.nodeTypes;
    return {
      pos: false,
      node: false,
      contains: false,
      getNodeCalled: false,
      getPos: function() {
        if(this.pos) return this.pos;
        var canvas = that.viz.canvas,
            s = canvas.getSize(),
            p = canvas.getPos(),
            pos = $.Event.getPos(e, win);
        this.pos = {
          x: pos.x - p.x - s.width/2,
          y: pos.y - p.y - s.height/2
        };
        return this.pos;
      },
      getNode: function() {
        if(this.node) return this.node;
        this.getNodeCalled = true;
        if(that.node) {
          var n = graph.getNode(that.node),
              geom = n && types[n.getData('type')],
              contains = geom && geom.contains && geom.contains.call(fx, n, this.getPos());
          if(contains) {
            this.contains = contains;
            return this.node = n;
          }
        }
        for(var id in graph.nodes) {
          var n = graph.nodes[id],
              geom = n && types[n.getData('type')],
              contains = geom && geom.contains && geom.contains.call(fx, n, this.getPos());
          if(contains) {
            this.contains = contains;
            return that.node = this.node = n;
          }
        }
        return that.node = this.node = false;
      },
      getContains: function() {
        if(this.getNodeCalled) return this.contains;
        this.getNode();
        return this.contains;
      }
    };
  }
});

/* 
 * Provides the initialization function for <NodeStyles> and <Tips> implemented 
 * by all main visualizations.
 *
 */
var Extras = {
  initializeExtras: function() {
    var mem = new MouseEventsManager(this);
    for(var className in Extras.Classes) {
      var obj = new Extras.Classes[className](className, this);
      if(obj.isEnabled()) {
        mem.register(obj);
      }
      if(obj.setAsProperty()) {
        this[className.toLowerCase()] = obj;
      }
    }
  }   
};

Extras.Classes = {};
/*
   Class: Tips
    
   A class containing tip related functions. This class is used internally.
   
   Used by:
   
   <ST>, <Sunburst>, <Hypertree>, <RGraph>, <TM>, <ForceDirected>, <Icicle>
   
   See also:
   
   <Options.Tips>
*/

Extras.Classes['Tips'] = new Class({
  Implements: [ExtrasInitializer, EventsInterface],
  
  initializePost: function() {
    //add DOM tooltip
    if(this.isEnabled() && document.body) {
      var tip = $('_tooltip') || document.createElement('div');
      tip.id = '_tooltip';
      tip.className = 'tip';
      $.extend(tip.style, {
        position: 'absolute',
        display: 'none',
        zIndex: 13000
      });
      document.body.appendChild(tip);
      this.tip = tip;
      this.node = false;
      this.labelContainer = this.dom && this.viz.labels.getLabelContainer();
    }
  },
  
  setAsProperty: $.lambda(true),
  
  isLabel: function(e) {
    var labelContainer = this.labelContainer,
        target = e.target;
    if(target && target.parentNode == labelContainer)
      return target;
    return false;
  },
  
  onMouseOut: function(e, win) {
    //mouseout a label
    if(this.dom && this.isLabel(e)) {
      this.hide(true);
      return;
    }
    //mouseout canvas
    var rt = e.relatedTarget,
        canvasWidget = this.canvas.getElement();
    while(rt && rt.parentNode) {
      if(canvasWidget == rt.parentNode) return;
      rt = rt.parentNode;
    }
    this.hide(false);
  },
  
  onMouseOver: function(e, win) {
    //mouseover a label
    var label;
    if(this.dom && (label = this.isLabel(e))) {
      this.node = this.viz.graph.getNode(label.id);
      this.config.onShow(this.tip, node, label);
    }
  },
  
  onMouseMove: function(e, win, opt) {
    if(this.dom && this.isLabel(e)) {
      this.setTooltipPosition(opt.getPos());
    }
    if(!this.dom) {
      var node = opt.getNode();
      if(!node) {
        this.hide(true);
        return;
      }
      if(this.config.force || !this.node || this.node.id != node.id) {
        this.node = node;
        this.config.onShow(this.tip, node, opt.getContains());
      }
      this.setTooltipPosition(opt.getPos());
    }
  },
  
  setTooltipPosition: function(pos) {
    var tip = this.tip, 
        style = tip.style, 
        cont = this.config;
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
    var x = cont.offsetX, y = cont.offsetY;
    style.top = ((pos.y + y + obj.height > win.height)?  
        (pos.y - obj.height - y) : pos.y + y) + 'px';
    style.left = ((pos.x + obj.width + x > win.width)? 
        (pos.x - obj.width - x) : pos.x + x) + 'px';
  },
  
  hide: function(triggerCallback) {
    this.tip.style.display = 'none';
    triggerCallback && this.config.onHide();
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
var NodeStyles = Extras.Classes['NodeStyles'] = new Class({
  initialize: function(viz) {
    this.viz = viz;
    this.fx = viz.fx;
    this.nStyles = viz.config.NodeStyles;
    this.nodeStylesOnHover = this.nStyles.stylesHover;
    this.nodeStylesOnClick = this.nStyles.stylesClick;
    this.nodeStylesOnRightClick = this.nStyles.stylesRightClick;
    //hide the tip when we mouse out the canvas
    var elem = viz.canvas.getElement(), that = this;
    $.addEvent(elem, 'mouseout', function(e) {
      var rt = e.relatedTarget;
      while(rt && rt.parentNode) {
        if(elem == rt.parentNode) return;
        rt = rt.parentNode;
      }
      that.onMousemove(false);
    });

  },
  
  getRestoredStyles: function(node, type) {
    var restoredStyles = {}, nStyles = this['nodeStylesOn' + type];
    for(var prop in nStyles) {
      restoredStyles[prop] = node.styles['$' + prop];
    }
    return restoredStyles;
  },
  
  toggleStylesOnHover: function(node, set, opt) {
    if(this.nodeStylesOnHover) {
      this.toggleStylesOn('Hover', node, set, opt);
    } else {
      this.nStyles.onHover(node, opt, set);
    }
  },

  toggleStylesOnClick: function(node, set, opt) {
    if(this.nodeStylesOnClick) {
      this.toggleStylesOn('Click', node, set, opt);
    } else {
      this.nStyles.onClick(node, opt, set);
    }
  },
  
  toggleStylesOnRightClick: function(node, set, opt) {
    if(this.nodeStylesOnRightClick) {
      this.toggleStylesOn('RightClick', node, set, opt);
    } else {
      this.nStyles.onRightClick(node, opt, set);
    }
  },

  toggleStylesOn: function(type, node, set, opt) {
    var viz = this.viz;
    var nStyles = this.nStyles;
    if(set) {
      var that = this;
      if(!node.styles) {
        node.styles = $.merge(node.data, {});
      }
      for(var s in this['nodeStylesOn' + type]) {
        var $s = '$' + s;
        if(!($s in node.styles)) {
            node.styles[$s] = node.getData(s); 
        }
      }
      viz.fx.nodeFx({
        'elements': {
          'id': node.id,
          'properties': that['nodeStylesOn' + type]
         },
         transition: Trans.Quart.easeOut,
         duration:300,
         fps:30,
         onComplete: function() {
           nStyles['on' + type](node, opt, set);
         }
      });
    } else {
      var restoredStyles = this.getRestoredStyles(node, type);
      viz.fx.nodeFx({
        'elements': {
          'id': node.id,
          'properties': restoredStyles
         },
         transition: Trans.Quart.easeOut,
         duration:300,
         fps:30,
         onComplete: function() {
           nStyles['on' + type](node, opt, set);
         }
      });
    }
  },

  attachOnHover: function(node, elem) {
    var that = this, viz = this.viz;
    var nStyles = viz.config.NodeStyles.stylesHover;
    $.addEvent(elem, 'mouseover', function() {
      if(!node.selected) {
        that.toggleStylesOnHover(node, true);
      }
    });
    
    $.addEvent(elem, 'mouseout', function() {
      !node.selected && that.toggleStylesOnHover(node, false);
    });
  },

  attachOnClick: function(node, elem) {
    var viz = this.viz, that = this;
    var nStyles = viz.config.NodeStyles.stylesClick;
    $.addEvent(elem, 'click', function() {
      that.onClick(node);
    });
  },
  
  onClick: function(node, opt) {
    if(!node) return;
    var nStyles = this.nodeStylesOnClick;
    if(!nStyles) {
      this.nStyles.onClick(node, opt);
      return;
    }
    //if the node is selected then unselect it
    if(node.selected) {
      this.toggleStylesOnClick(node, false, opt);
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
      this.toggleStylesOnClick(node, true, opt);
      node.selected = true;
    }
  },
  
  onRightClick: function(node, opt) {
    var nStyles = this.nodeStylesOnRightClick;
    if(!node || !nStyles) {
      this.nStyles.onRightClick(node, opt);
      return;
    }
    //if the node is selected then unselect it
    if(node.rightClickSelected) {
      this.toggleStylesOnRightClick(node, false, opt);
      delete node.rightClickSelected;
    } else {
      //unselect all selected nodes...
      Graph.Util.eachNode(this.viz.graph, function(n) {
        if(n.rightClickSelected) {
          for(var s in nStyles) {
            n.setData(s, n.styles['$' + s], 'end');
          }
          delete n.rightClickSelected;
        }
      });
      //select clicked node
      this.toggleStylesOnRightClick(node, true, opt);
      node.rightClickSelected = true;
    }
  },
  
  onMousemove: function(node, opt) {
    var GUtil = Graph.Util, that = this;
    var nStyles = this.nodeStylesOnHover;
    if(!nStyles) {
//      this.nStyles.onHover(node);
      return;
    }
    
    if(!node || node.selected) {
      GUtil.eachNode(this.viz.graph, function(n) {
        if(n.hovered && !n.selected) {
          that.toggleStylesOnHover(n, false, opt);
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
    this.toggleStylesOnHover(node, true, opt);
    node.hovered = true;
  }
});