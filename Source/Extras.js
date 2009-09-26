/*
 * File: Extras.js
 * 
 * Provides Extras such as Tips and Style Effects.
 * 
 * Description:
 * 
 * Provides the <Tips> and <NodeStyles> objects and functions.
 *
 */

/*
   Object: Tips
    
   An object containing Tip related functions. 
*/

var Tips = {
  initializeTips: function() {
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
          var tip = that.tip;
          //get mouse position
          win = win  || window;
          e = e || win.event;
          var doc = win.document;
          doc = doc.html || doc.body;
          var page = {
              x: e.pageX || e.clientX + doc.scrollLeft,
              y: e.pageY || e.clientY + doc.scrollTop
          };
          tip.style.display = '';
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
          var style = tip.style, x = cont.Tips.offsetX, y = cont.Tips.offsetY;
          style.top = ((page.y + y + obj.height > win.height)?  
              (page.y - obj.height - y) : page.y + y) + 'px';
          style.left = ((page.x + obj.width + x > win.width)? 
              (page.x - obj.width - x) : page.x + x) + 'px';
      });
    }
  }
};

/*
  Object: NodeStyles
   
  Change node styles when hovering or clicking a node with smooth animations. 
*/
var NodeStyles = {
  attachNodeStylesOnHover: function(node, elem) {
    var that = this, viz = this;
    var n = viz.config.Node;
    var nStyles = viz.config.nodeStylesOnHover;
    var restoredStyles = {};
    for(var prop in nStyles) {
      restoredStyles[prop] = n[prop];
    }
    if(nStyles) {
      $addEvent(elem, 'mouseover', function() {
        if(!node.selected) {
          viz.fx.nodeFx({
            'elements': {
              'id': node.id,
              'properties': nStyles
             },
             transition: Trans.Quart.easeOut,
             duration:700
          });
        }
      });
      
      $addEvent(elem, 'mouseout', function() {
        if(!node.selected) {
          viz.fx.nodeFx({
            'elements': {
              'id': node.id,
              'properties': restoredStyles
            },
            transition: Trans.Quart.easeOut,
            duration:700
          });
        }
      });
    }
  },

  attachNodeStylesSelected: function(node, elem) {
    var that = this, viz = this;
    var n = viz.config.Node;
    var nStyles = viz.config.nodeStylesSelected;
    var restoredStyles = {};
    for(var prop in nStyles) {
      restoredStyles[prop] = n[prop];
    }
    if(nStyles) {
      $addEvent(elem, 'click', function() {
        if(node.selected) {
          delete node.selected;
          viz.fx.nodeFx({
            'elements': {
              'id': node.id,
              'properties': restoredStyles
            },
            transition: Trans.Quart.easeOut,
            duration:700
          });
        } else {
          node.selected = true;
          viz.fx.nodeFx({
            'elements': {
              'id': node.id,
              'properties': nStyles
            },
            transition: Trans.Quart.easeOut,
            duration:700
          });
        }
      });
    }
  }    
};