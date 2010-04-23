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
    var tips = this.config.Tips;
    var ns = this.config.NodeStyles;
    if(tips && tips.allow && tips.attachToCanvas 
        || ns && ns.attachToCanvas) {
      this.mouseEventsManager = new MouseEventsManager(this);
    }
    if(tips) {
      this.tips = new Tips(this);
      if(tips.allow && tips.attachToCanvas) {
        this.mouseEventsManager.register(this.tips);
      }
    }
    if(ns) {
      this.nodeStyles = new NodeStyles(this);
      if(ns.attachToCanvas) {
        this.mouseEventsManager.register(this.nodeStyles);
      }
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
      time: $.time()
    };
    
    this.rightClick = {
        node: null,
        time: $.time()
    };

    this.mousemove = {
      node: null,
      time: $.time()
    };
    
    this.mintime = 10;    
    this.attachEvents();
  },
  
  attachEvents: function() {
    var htmlCanvas = this.canvas.getElement(), that = this;
    htmlCanvas.oncontextmenu = $.lambda(false);
    $.addEvent(htmlCanvas, 'mouseup', function(e, win) {
      var rightClick = (e.which == 3 || e.button == 2);
      if (rightClick) {
        that.handleEvent(that.rightClick, 'onRightClick', e, win);
      } else {
        that.handleEvent(that.click, 'onClick', e, win);
      } 
          
      //prevent default 
      if (e.preventDefault) 
          e.preventDefault();
      else 
          e.returnValue = false;
    });
    $.addEvent(htmlCanvas, 'mousemove', function(e, win) {
      that.handleEvent(that.mousemove, 'onMousemove', e, win);
    });
  },
  
  register: function(obj) {
    this.registeredObjects.push(obj);
  },
  
  handleEvent: function(obj, method, e, win) {
    if($.time() - obj.time <= this.mintime) return;
    obj.time = $.time();
    var fx = this.viz.fx,
        g = this.viz.graph,
        pos = Event.getPos(e, win),
        p = this.canvas.getPos(),
        s = this.canvas.getSize(),
        newpos = {
            x: pos.x - p.x - s.width /2,
            y: pos.y - p.y - s.height /2
        },
        positions = this.nodeTypes,
        opt = {
            'position': pos,
            'contains': false
        };

    if(obj.node) {
      var n = g.getNode(obj.node);
      var elem = n && positions[n.getData('type')];
      var contains = elem && elem.contains && elem.contains.call(fx, n, newpos);
      if(contains) {
        opt.contains = contains;
        for(var i=0, l=this.registeredObjects.length; i<l; i++) {
          this.registeredObjects[i][method](n, opt);
        }
        return;
      }
    }
    for(var id in g.nodes) {
      var n = g.nodes[id];
      var elem = n && positions[n.getData('type')];
      var contains = elem && elem.contains && elem.contains.call(fx, n, newpos);
      if(contains) {
        obj.node = id;
        opt.contains = contains;
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
        //hide the tip when we mouse out the canvas
        var elem = viz.canvas.getElement();
        $.addEvent(elem, 'mouseout', function(e) {
          var rt = e.relatedTarget;
          while(rt && rt.parentNode) {
            if(elem == rt.parentNode) return;
            rt = rt.parentNode;
          }
          tip.style.display = 'none';
        });
    }
  },
  
  attach: function(node, elem) {
    if(this.config.Tips.allow) {
      var that = this, cont = this.controller;
      $.addEvent(elem, 'mouseover', function(e){
        cont.Tips.onShow(that.tip, node, elem);
      });
      $.addEvent(elem, 'mouseout', function(e){
          that.tip.style.display = 'none';
          cont.Tips.onHide();
      });
      //Add mousemove event handler
      $.addEvent(elem, 'mousemove', function(e, win){
        var pos = Event.getPos(e, win);
        that.setTooltipPosition(pos);
      });
    }
  },

  onClick: $.empty,
  onRightClick: $.empty,
  
  onMousemove: function(node, opt) {
    if(!node) {
      this.tip.style.display = 'none';
      this.node = false;
      this.config.Tips.onHide();
      return;
    }
    if(this.config.Tips.force || !this.node || this.node.id != node.id) {
      this.node = node;
      this.config.Tips.onShow(this.tip, node, opt);
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
  },
  
  hide: function() {
    this.tip.style.display = 'none';
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
    this.nodeStylesOnRightClick = this.nStyles.stylesRightClick;
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