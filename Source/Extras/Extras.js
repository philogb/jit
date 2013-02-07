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
    this.labelContainer = this.dom && viz.labels.getLabelContainer();
    this.isEnabled() && this.initializePost();
  },
  initializePost: $.empty,
  setAsProperty: $.lambda(false),
  isEnabled: function() {
    return this.config.enable;
  },
  isLabel: function(e, win, group) {
    e = $.event.get(e, win);
    var labelContainer = this.labelContainer,
        target = e.target || e.srcElement,
        related = e.relatedTarget;
    if(group) {
      return related && related == this.viz.canvas.getCtx().canvas 
          && !!target && this.isDescendantOf(target, labelContainer);
    } else {
      return this.isDescendantOf(target, labelContainer);
    }
  },
  isDescendantOf: function(elem, par) {
    while(elem && elem.parentNode) {
      if(elem.parentNode == par)
        return elem;
      elem = elem.parentNode;
    }
    return false;
  }
};

var EventsInterface = {
  onMouseUp: $.empty,
  onMouseDown: $.empty,
  onMouseMove: $.empty,
  onMouseOver: $.empty,
  onMouseOut: $.empty,
  onMouseWheel: $.empty,
  onTouchStart: $.empty,
  onTouchMove: $.empty,
  onTouchEnd: $.empty,
  onTouchCancel: $.empty
};

var MouseEventsManager = new Class({
  initialize: function(viz) {
    this.viz = viz;
    this.canvas = viz.canvas;
    this.node = false;
    this.edge = false;
    this.registeredObjects = [];
    this.attachEvents();
  },
  
  attachEvents: function() {
    var htmlCanvas = this.canvas.getElement(), 
        that = this;
    htmlCanvas.oncontextmenu = $.lambda(false);
    $.addEvents(htmlCanvas, {
      'mouseup': function(e, win) {
        var event = $.event.get(e, win);
        that.handleEvent('MouseUp', e, win, 
            that.makeEventObject(e, win), 
            $.event.isRightClick(event));
      },
      'mousedown': function(e, win) {
        var event = $.event.get(e, win);
        that.handleEvent('MouseDown', e, win, that.makeEventObject(e, win), 
            $.event.isRightClick(event));
      },
      'mousemove': function(e, win) {
        that.handleEvent('MouseMove', e, win, that.makeEventObject(e, win));
      },
      'mouseover': function(e, win) {
        that.handleEvent('MouseOver', e, win, that.makeEventObject(e, win));
      },
      'mouseout': function(e, win) {
        that.handleEvent('MouseOut', e, win, that.makeEventObject(e, win));
      },
      'touchstart': function(e, win) {
        that.handleEvent('TouchStart', e, win, that.makeEventObject(e, win));
      },
      'touchmove': function(e, win) {
        that.handleEvent('TouchMove', e, win, that.makeEventObject(e, win));
      },
      'touchend': function(e, win) {
        that.handleEvent('TouchEnd', e, win, that.makeEventObject(e, win));
      }
    });
    //attach mousewheel event
    var handleMouseWheel = function(e, win) {
      var event = $.event.get(e, win);
      var wheel = $.event.getWheel(event);
      that.handleEvent('MouseWheel', e, win, wheel);
    };
    //TODO(nico): this is a horrible check for non-gecko browsers!
    if(!document.getBoxObjectFor && window.mozInnerScreenX == null) {
      $.addEvent(htmlCanvas, 'mousewheel', handleMouseWheel);
    } else {
      htmlCanvas.addEventListener('DOMMouseScroll', handleMouseWheel, false);
    }
  },
  
  register: function(obj) {
    this.registeredObjects.push(obj);
  },
  
  handleEvent: function() {
    var args = Array.prototype.slice.call(arguments),
        type = args.shift();
    for(var i=0, regs=this.registeredObjects, l=regs.length; i<l; i++) {
      regs[i]['on' + type].apply(regs[i], args);
    }
  },
  
  makeEventObject: function(e, win) {
    var that = this,
        graph = this.viz.graph,
        fx = this.viz.fx,
        ntypes = fx.nodeTypes,
        etypes = fx.edgeTypes;
    return {
      pos: false,
      node: false,
      edge: false,
      contains: false,
      getNodeCalled: false,
      getEdgeCalled: false,
      getPos: function() {
        //TODO(nico): check why this can't be cache anymore when using edge detection
        //if(this.pos) return this.pos;
        var canvas = that.viz.canvas,
            s = canvas.getSize(),
            p = canvas.getPos(),
            ox = canvas.translateOffsetX,
            oy = canvas.translateOffsetY,
            sx = canvas.scaleOffsetX,
            sy = canvas.scaleOffsetY,
            pos = $.event.getPos(e, win);
        this.pos = {
          x: (pos.x - p.x - s.width/2 - ox) * 1/sx,
          y: (pos.y - p.y - s.height/2 - oy) * 1/sy
        };
        return this.pos;
      },
      getNode: function() {
        if(this.getNodeCalled) return this.node;
        this.getNodeCalled = true;
        for(var id in graph.nodes) {
          var n = graph.nodes[id],
              geom = n && ntypes[n.getData('type')],
              contains = geom && geom.contains && geom.contains.call(fx, n, this.getPos());
          if(contains) {
            this.contains = contains;
            return that.node = this.node = n;
          }
        }
        return that.node = this.node = false;
      },
      getEdge: function() {
        if(this.getEdgeCalled) return this.edge;
        this.getEdgeCalled = true;
        var hashset = {};
        for(var id in graph.edges) {
          var edgeFrom = graph.edges[id];
          hashset[id] = true;
          for(var edgeId in edgeFrom) {
            if(edgeId in hashset) continue;
            var e = edgeFrom[edgeId],
                geom = e && etypes[e.getData('type')],
                contains = geom && geom.contains && geom.contains.call(fx, e, this.getPos());
            if(contains) {
              this.contains = contains;
              return that.edge = this.edge = e;
            }
          }
        }
        return that.edge = this.edge = false;
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
    var mem = new MouseEventsManager(this), that = this;
    $.each(['NodeStyles', 'Tips', 'Navigation', 'Events'], function(k) {
      var obj = new Extras.Classes[k](k, that);
      if(obj.isEnabled()) {
        mem.register(obj);
      }
      if(obj.setAsProperty()) {
        that[k.toLowerCase()] = obj;
      }
    });
  }   
};

Extras.Classes = {};
/*
  Class: Events
   
  This class defines an Event API to be accessed by the user.
  The methods implemented are the ones defined in the <Options.Events> object.
*/

Extras.Classes.Events = new Class({
  Implements: [ExtrasInitializer, EventsInterface],
  
  initializePost: function() {
    this.fx = this.viz.fx;
    this.ntypes = this.viz.fx.nodeTypes;
    this.etypes = this.viz.fx.edgeTypes;
    
    this.hovered = false;
    this.pressed = false;
    this.touched = false;

    this.touchMoved = false;
    this.moved = false;
    
  },
  
  setAsProperty: $.lambda(true),
  
  onMouseUp: function(e, win, event, isRightClick) {
    var evt = $.event.get(e, win);
    if(!this.moved) {
      if(isRightClick) {
        this.config.onRightClick(this.hovered, event, evt);
      } else {
        this.config.onClick(this.pressed, event, evt);
      }
    }
    if(this.pressed) {
      if(this.moved) {
        this.config.onDragEnd(this.pressed, event, evt);
      } else {
        this.config.onDragCancel(this.pressed, event, evt);
      }
      this.pressed = this.moved = false;
    }
  },

  onMouseOut: function(e, win, event) {
   //mouseout a label
   var evt = $.event.get(e, win), label;
   if(this.dom && (label = this.isLabel(e, win, true))) {
     this.config.onMouseLeave(this.viz.graph.getNode(label.id),
                              event, evt);
     this.hovered = false;
     return;
   }
   //mouseout canvas
   var rt = evt.relatedTarget,
       canvasWidget = this.canvas.getElement();
   while(rt && rt.parentNode) {
     if(canvasWidget == rt.parentNode) return;
     rt = rt.parentNode;
   }
   if(this.hovered) {
     this.config.onMouseLeave(this.hovered,
         event, evt);
     this.hovered = false;
   }
  },
  
  onMouseOver: function(e, win, event) {
    //mouseover a label
    var evt = $.event.get(e, win), label;
    if(this.dom && (label = this.isLabel(e, win, true))) {
      this.hovered = this.viz.graph.getNode(label.id);
      this.config.onMouseEnter(this.hovered,
                               event, evt);
    }
  },
  
  onMouseMove: function(e, win, event) {
   var label, evt = $.event.get(e, win);
   if(this.pressed) {
     this.moved = true;
     this.config.onDragMove(this.pressed, event, evt);
     return;
   }
   if(this.dom) {
     this.config.onMouseMove(this.hovered,
         event, evt);
   } else {
     if(this.hovered) {
       var hn = this.hovered;
       var geom = hn.nodeFrom? this.etypes[hn.getData('type')] : this.ntypes[hn.getData('type')];
       var contains = geom && geom.contains 
         && geom.contains.call(this.fx, hn, event.getPos());
       if(contains) {
         this.config.onMouseMove(hn, event, evt);
         return;
       } else {
         this.config.onMouseLeave(hn, event, evt);
         this.hovered = false;
       }
     }
     if(this.hovered = (event.getNode() || (this.config.enableForEdges && event.getEdge()))) {
       this.config.onMouseEnter(this.hovered, event, evt);
     } else {
       this.config.onMouseMove(false, event, evt);
     }
   }
  },
  
  onMouseWheel: function(e, win, delta) {
    this.config.onMouseWheel(delta, $.event.get(e, win));
  },
  
  onMouseDown: function(e, win, event) {
    var evt = $.event.get(e, win), label;
    if(this.dom) {
      if(label = this.isLabel(e, win)) {
        this.pressed = this.viz.graph.getNode(label.id);
      }
    } else {
      this.pressed = event.getNode() || (this.config.enableForEdges && event.getEdge());
    }
    this.pressed && this.config.onDragStart(this.pressed, event, evt);
  },
  
  onTouchStart: function(e, win, event) {
    var evt = $.event.get(e, win), label;
    if(this.dom && (label = this.isLabel(e, win))) {
      this.touched = this.viz.graph.getNode(label.id);
    } else {
      this.touched = event.getNode() || (this.config.enableForEdges && event.getEdge());
    }
    this.touched && this.config.onTouchStart(this.touched, event, evt);
  },
  
  onTouchMove: function(e, win, event) {
    var evt = $.event.get(e, win);
    if(this.touched) {
      this.touchMoved = true;
      this.config.onTouchMove(this.touched, event, evt);
    }
  },
  
  onTouchEnd: function(e, win, event) {
    var evt = $.event.get(e, win);
    if(this.touched) {
      if(this.touchMoved) {
        this.config.onTouchEnd(this.touched, event, evt);
      } else {
        this.config.onTouchCancel(this.touched, event, evt);
      }
      this.touched = this.touchMoved = false;
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

Extras.Classes.Tips = new Class({
  Implements: [ExtrasInitializer, EventsInterface],
  
  initializePost: function() {
    //add DOM tooltip
    if(document.body) {
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
    }
  },
  
  setAsProperty: $.lambda(true),
  
  onMouseOut: function(e, win) {
    //mouseout a label
    var evt = $.event.get(e, win);
    if(this.dom && this.isLabel(e, win, true)) {
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
    if(this.dom && (label = this.isLabel(e, win, false))) {
      this.node = this.viz.graph.getNode(label.id);
      this.config.onShow(this.tip, this.node, label);
    }
  },
  
  onMouseMove: function(e, win, opt) {
    if(this.dom && this.isLabel(e, win)) {
      this.setTooltipPosition($.event.getPos(e, win));
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
      this.setTooltipPosition($.event.getPos(e, win));
    }
  },
  
  setTooltipPosition: function(pos) {
    var tip = this.tip, 
        style = tip.style, 
        cont = this.config;
    style.display = '';
    //get viewport dimensions
    var elem = document.compatMode === "CSS1Compat" && document.documentElement ||
               document.body ||
               document.documentElement;
    var view = {
      'width': elem.clientWidth,
      'height': elem.clientHeight,
      'x': window.pageXOffset ||
           document.documentElement && document.documentElement.scrollLeft ||
           document.body && document.body.scrollLeft ||
           0,
      'y': window.pageYOffset ||
           document.documentElement && document.documentElement.scrollTop ||
           document.body && document.body.scrollTop ||
           0
    };
    //get tooltip dimensions
    var obj = {
      'width': tip.offsetWidth,
      'height': tip.offsetHeight  
    };
    //set tooltip position
    var x = cont.offsetX, y = cont.offsetY;
    style.top = ((pos.y + obj.height + y > view.height + view.y)?
        (pos.y - obj.height - y) : pos.y + y) + 'px';
    style.left = ((pos.x + obj.width + x > view.width + view.x)?
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
Extras.Classes.NodeStyles = new Class({
  Implements: [ExtrasInitializer, EventsInterface],
  
  initializePost: function() {
    this.fx = this.viz.fx;
    this.types = this.viz.fx.nodeTypes;
    this.nStyles = this.config;
    this.nodeStylesOnHover = this.nStyles.stylesHover;
    this.nodeStylesOnClick = this.nStyles.stylesClick;
    this.hoveredNode = false;
    this.fx.nodeFxAnimation = new Animation();
    
    this.down = false;
    this.move = false;
  },
  
  onMouseOut: function(e, win) {
    this.down = this.move = false;
    if(!this.hoveredNode) return;
    //mouseout a label
    if(this.dom && this.isLabel(e, win, true)) {
      this.toggleStylesOnHover(this.hoveredNode, false);
    }
    //mouseout canvas
    var rt = e.relatedTarget,
        canvasWidget = this.canvas.getElement();
    while(rt && rt.parentNode) {
      if(canvasWidget == rt.parentNode) return;
      rt = rt.parentNode;
    }
    this.toggleStylesOnHover(this.hoveredNode, false);
    this.hoveredNode = false;
  },
  
  onMouseOver: function(e, win) {
    //mouseover a label
    var label;
    if(this.dom && (label = this.isLabel(e, win, true))) {
      var node = this.viz.graph.getNode(label.id);
      if(node.selected) return;
      this.hoveredNode = node;
      this.toggleStylesOnHover(this.hoveredNode, true);
    }
  },
  
  onMouseDown: function(e, win, event, isRightClick) {
    if(isRightClick) return;
    var label;
    if(this.dom && (label = this.isLabel(e, win))) {
      this.down = this.viz.graph.getNode(label.id);
    } else if(!this.dom) {
      this.down = event.getNode();
    }
    this.move = false;
  },
  
  onMouseUp: function(e, win, event, isRightClick) {
    if(isRightClick) return;
    if(!this.move) {
      this.onClick(event.getNode());
    }
    this.down = this.move = false;
  },
  
  getRestoredStyles: function(node, type) {
    var restoredStyles = {}, 
        nStyles = this['nodeStylesOn' + type];
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
      viz.fx.nodeFx($.extend({
        'elements': {
          'id': node.id,
          'properties': that['nodeStylesOn' + type]
         },
         transition: Trans.Quart.easeOut,
         duration:300,
         fps:40
      }, this.config));
    } else {
      var restoredStyles = this.getRestoredStyles(node, type);
      viz.fx.nodeFx($.extend({
        'elements': {
          'id': node.id,
          'properties': restoredStyles
         },
         transition: Trans.Quart.easeOut,
         duration:300,
         fps:40
      }, this.config));
    }
  },

  onClick: function(node) {
    if(!node) return;
    var nStyles = this.nodeStylesOnClick;
    if(!nStyles) return;
    //if the node is selected then unselect it
    if(node.selected) {
      this.toggleStylesOnClick(node, false);
      delete node.selected;
    } else {
      //unselect all selected nodes...
      this.viz.graph.eachNode(function(n) {
        if(n.selected) {
          for(var s in nStyles) {
            n.setData(s, n.styles['$' + s], 'end');
          }
          delete n.selected;
        }
      });
      //select clicked node
      this.toggleStylesOnClick(node, true);
      node.selected = true;
      delete node.hovered;
      this.hoveredNode = false;
    }
  },
  
  onMouseMove: function(e, win, event) {
    //if mouse button is down and moving set move=true
    if(this.down) this.move = true;
    //already handled by mouseover/out
    if(this.dom && this.isLabel(e, win)) return;
    var nStyles = this.nodeStylesOnHover;
    if(!nStyles) return;
    
    if(!this.dom) {
      if(this.hoveredNode) {
        var geom = this.types[this.hoveredNode.getData('type')];
        var contains = geom && geom.contains && geom.contains.call(this.fx, 
            this.hoveredNode, event.getPos());
        if(contains) return;
      }
      var node = event.getNode();
      //if no node is being hovered then just exit
      if(!this.hoveredNode && !node) return;
      //if the node is hovered then exit
      if(node.hovered) return;
      //select hovered node
      if(node && !node.selected) {
        //check if an animation is running and exit it
        this.fx.nodeFxAnimation.stopTimer();
        //unselect all hovered nodes...
        this.viz.graph.eachNode(function(n) {
          if(n.hovered && !n.selected) {
            for(var s in nStyles) {
              n.setData(s, n.styles['$' + s], 'end');
            }
            delete n.hovered;
          }
        });
        //select hovered node
        node.hovered = true;
        this.hoveredNode = node;
        this.toggleStylesOnHover(node, true);
      } else if(this.hoveredNode && !this.hoveredNode.selected) {
        //check if an animation is running and exit it
        this.fx.nodeFxAnimation.stopTimer();
        //unselect hovered node
        this.toggleStylesOnHover(this.hoveredNode, false);
        delete this.hoveredNode.hovered;
        this.hoveredNode = false;
      }
    }
  }
});

Extras.Classes.Navigation = new Class({
  Implements: [ExtrasInitializer, EventsInterface],
  
  initializePost: function() {
    this.pos = false;
    this.pressed = false;
  },
  
  onMouseWheel: function(e, win, scroll) {
    if(!this.config.zooming) return;
    $.event.stop($.event.get(e, win));
    var val = this.config.zooming / 1000,
        ans = 1 + scroll * val;
    this.canvas.scale(ans, ans);
  },
  
  onMouseDown: function(e, win, eventInfo) {
    if(!this.config.panning) return;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    $.addClass(this.canvas.getElement(), 'grabbing');
    if(this.config.panning == 'avoid nodes' && (this.dom? this.isLabel(e, win) : (eventInfo.getNode() || eventInfo.getEdge()))) return;
    this.pressed = true;
    this.pos = eventInfo.getPos();
    var canvas = this.canvas,
        ox = canvas.translateOffsetX,
        oy = canvas.translateOffsetY,
        sx = canvas.scaleOffsetX,
        sy = canvas.scaleOffsetY;
    this.pos.x *= sx;
    this.pos.x += ox;
    this.pos.y *= sy;
    this.pos.y += oy;
  },
  
  onMouseMove: function(e, win, eventInfo) {
    if(!this.config.panning) return;
    if(!this.pressed) return;
    if(this.config.panning == 'avoid nodes' && (this.dom? this.isLabel(e, win) : eventInfo.getNode())) return;
    var thispos = this.pos, 
        currentPos = eventInfo.getPos(),
        canvas = this.canvas,
        ox = canvas.translateOffsetX,
        oy = canvas.translateOffsetY,
        sx = canvas.scaleOffsetX,
        sy = canvas.scaleOffsetY;
    currentPos.x *= sx;
    currentPos.y *= sy;
    currentPos.x += ox;
    currentPos.y += oy;
    var x = currentPos.x - thispos.x,
        y = currentPos.y - thispos.y;
    this.pos = currentPos;
    this.canvas.translate(x * 1/sx, y * 1/sy);
  },
  
  onMouseUp: function(e, win, eventInfo, isRightClick) {
    if(!this.config.panning) return;
    $.removeClass(this.canvas.getElement(), 'grabbing');
    this.pressed = false;
  }
});
