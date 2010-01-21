/*
  File: Core.js
  
  Description:
  
  Provides common utility functions and the Class object used internally by the library.
  
  Also provides the <TreeUtil> object for manipulating JSON tree structures
  
  Some of the Basic utility functions and the Class system are based in the MooTools Framework <http://mootools.net>. Copyright (c) 2006-2009 Valerio Proietti, <http://mad4milk.net/>. MIT license <http://mootools.net/license.txt>.
  
  Author: 
  
  Nicolas Garcia Belmonte
  
  Copyright: 
  
  Copyright 2008-2009 by Nicolas Garcia Belmonte.
  
  Homepage: 
  
  <http://thejit.org>
  
  Version: 
  
  1.1.3

  License: 
  
  BSD License
 
> Redistribution and use in source and binary forms, with or without
> modification, are permitted provided that the following conditions are met:
>      * Redistributions of source code must retain the above copyright
>        notice, this list of conditions and the following disclaimer.
>      * Redistributions in binary form must reproduce the above copyright
>        notice, this list of conditions and the following disclaimer in the
>        documentation and/or other materials provided with the distribution.
>      * Neither the name of the organization nor the
>        names of its contributors may be used to endorse or promote products
>        derived from this software without specific prior written permission.
>
>  THIS SOFTWARE IS PROVIDED BY Nicolas Garcia Belmonte ``AS IS'' AND ANY
>  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
>  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
>  DISCLAIMED. IN NO EVENT SHALL Nicolas Garcia Belmonte BE LIABLE FOR ANY
>  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
>  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
>  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
>  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
>  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
>  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


function $empty() {};

function $extend(original, extended){
    for (var key in (extended || {})) original[key] = extended[key];
    return original;
};

function $lambda(value){
    return (typeof value == 'function') ? value : function(){
        return value;
    };
};

var $time = Date.now || function(){
    return +new Date;
};

function $splat(obj){
    var type = $type(obj);
    return (type) ? ((type != 'array') ? [obj] : obj) : [];
};

var $type = function(elem) {
  return $type.s.call(elem).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
};
$type.s = Object.prototype.toString;

function $each(iterable, fn){
  var type = $type(iterable);
  if(type == 'object') {
    for (var key in iterable) fn(iterable[key], key);
  } else {
    for(var i=0; i < iterable.length; i++) fn(iterable[i], i);
  }
};

function $merge(){
    var mix = {};
    for (var i = 0, l = arguments.length; i < l; i++){
        var object = arguments[i];
        if ($type(object) != 'object') continue;
        for (var key in object){
            var op = object[key], mp = mix[key];
            mix[key] = (mp && $type(op) == 'object' && $type(mp) == 'object') ? $merge(mp, op) : $unlink(op);
        }
    }
    return mix;
};

function $unlink(object){
    var unlinked;
    switch ($type(object)){
        case 'object':
            unlinked = {};
            for (var p in object) unlinked[p] = $unlink(object[p]);
        break;
        case 'array':
            unlinked = [];
            for (var i = 0, l = object.length; i < l; i++) unlinked[i] = $unlink(object[i]);
        break;
        default: return object;
    }
    return unlinked;
};

function $rgbToHex(srcArray, array){
    if (srcArray.length < 3) return null;
    if (srcArray.length == 4 && srcArray[3] == 0 && !array) return 'transparent';
    var hex = [];
    for (var i = 0; i < 3; i++){
        var bit = (srcArray[i] - 0).toString(16);
        hex.push((bit.length == 1) ? '0' + bit : bit);
    }
    return (array) ? hex : '#' + hex.join('');
};

function $hexToRgb(hex) {
  if(hex.length != 7) {
    hex = hex.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
    hex.shift();
    if (hex.length != 3) return null;
    var rgb = [];
    for(var i=0; i<3; i++) {
      var value = hex[i];
      if (value.length == 1) value += value;
      rgb.push(parseInt(value, 16));
    }
    return rgb;
  } else {
    hex = parseInt(hex.slice(1), 16);
    return [
      hex >> 16,
      hex >> 8 & 0xff,
      hex & 0xff
    ];
  }
};

function $destroy(elem) {
   $clean(elem);
   if(elem.parentNode) elem.parentNode.removeChild(elem);
   if(elem.clearAttributes) elem.clearAttributes(); 
};

function $clean(elem) {
  for(var ch = elem.childNodes, i=0; i < ch.length; i++) {
      $destroy(ch[i]);
  }  
};

function $addEvent(obj, type, fn) {
    if (obj.addEventListener) 
        obj.addEventListener(type, fn, false);
    else 
        obj.attachEvent('on' + type, fn);
};

function $hasClass(obj, klass) {
    return (' ' + obj.className + ' ').indexOf(' ' + klass + ' ') > -1;
};

function $addClass(obj, klass) {
    if(!$hasClass(obj, klass)) obj.className = (obj.className + " " + klass);
};

function $removeClass(obj, klass) {
    obj.className = obj.className.replace(new RegExp('(^|\\s)' + klass + '(?:\\s|$)'), '$1');
};

function $get(id) {
  return document.getElementById(id);  
};

function $getPos(elem) {
  if(elem.getBoundingClientRect) {
    var bound = elem.getBoundingClientRect(), html = elem.ownerDocument.documentElement;
    return {
      x: bound.left + html.scrollLeft - html.clientLeft,
      y: bound.top +  html.scrollTop  - html.clientTop
    };
  }
  
  var offset = getOffsets(elem);
  var scroll = getScrolls(elem);
  
  return {x: offset.x - scroll.x, y: offset.y - scroll.y};
  
  function getOffsets(elem) {
    var position = { x: 0, y: 0 };
    while (elem && !isBody(elem)){
      position.x += elem.offsetLeft;
      position.y += elem.offsetTop;
      elem = elem.offsetParent;
    }
    return position;
  }
  
  function getScrolls(elem){
    var position = {x: 0, y: 0};
    while (elem && !isBody(elem)){
      position.x += elem.scrollLeft;
      position.y += elem.scrollTop;
      elem = elem.parentNode;
    }
    return position;
  }

  function isBody(element){
    return (/^(?:body|html)$/i).test(element.tagName);
  }
};

var Class = function(properties){
  properties = properties || {};
  var klass = function(){
      for (var key in this){
          if (typeof this[key] != 'function') this[key] = $unlink(this[key]);
      }
      this.constructor = klass;
      if (Class.prototyping) return this;
      var instance = (this.initialize) ? this.initialize.apply(this, arguments) : this;
      return instance;
  };
  
  for (var mutator in Class.Mutators){
      if (!properties[mutator]) continue;
      properties = Class.Mutators[mutator](properties, properties[mutator]);
      delete properties[mutator];
  }
  
  $extend(klass, this);
  klass.constructor = Class;
  klass.prototype = properties;
  return klass;
};

Class.Mutators = {

    Extends: function(self, klass){
        Class.prototyping = klass.prototype;
        var subclass = new klass;
        delete subclass.parent;
        subclass = Class.inherit(subclass, self);
        delete Class.prototyping;
        return subclass;
    },

    Implements: function(self, klasses){
        $each($splat(klasses), function(klass){
            Class.prototying = klass;
            //Hope it doesn't break anything:
            //if the properties defined already exist in the original object
            //do not override them with the implemented object.
            //$extend(self, ($type(klass) == 'function') ? new klass : klass);
            var instance = (typeof klass == 'function')? new klass : klass;
            for(var prop in instance) {
              if(!(prop in self)) {
                self[prop] = instance[prop];
              }
            }
            delete Class.prototyping;
        });
        return self;
    }

};

$extend(Class, {

    inherit: function(object, properties){
        var caller = arguments.callee.caller;
        for (var key in properties){
            var override = properties[key];
            var previous = object[key];
            var type = $type(override);
            if (previous && type == 'function'){
                if (override != previous){
                    if (caller){
                        override.__parent = previous;
                        object[key] = override;
                    } else {
                        Class.override(object, key, override);
                    }
                }
            } else if(type == 'object'){
                object[key] = $merge(previous, override);
            } else {
                object[key] = override;
            }
        }

        if (caller) object.parent = function(){
            return arguments.callee.caller.__parent.apply(this, arguments);
        };

        return object;
    },

    override: function(object, name, method){
        var parent = Class.prototyping;
        if (parent && object[name] != parent[name]) parent = null;
        var override = function(){
            var previous = this.parent;
            this.parent = parent ? parent[name] : object[name];
            var value = method.apply(this, arguments);
            this.parent = previous;
            return value;
        };
        object[name] = override;
    }

});


Class.prototype.implement = function(){
    var proto = this.prototype;
    $each(Array.prototype.slice.call(arguments || []), function(properties){
        Class.inherit(proto, properties);
    });
    return this;
};

var Event = {
  getPos: function(e, win) {
    //get mouse position
    win = win  || window;
    e = e || win.event;
    var doc = win.document;
    doc = doc.html || doc.body;
    var page = {
        x: e.pageX || e.clientX + doc.scrollLeft,
        y: e.pageY || e.clientY + doc.scrollTop
    };
    return page;
  }
};

/*
   Object: TreeUtil

   Some common JSON tree manipulation methods.
*/
this.TreeUtil = {

    /*
       Method: prune
    
       Clears all tree nodes having depth greater than maxLevel.
    
       Parameters:
    
          tree - A JSON tree object. For more information please see <Loader.loadJSON>.
          maxLevel - An integer specifying the maximum level allowed for this tree. All nodes having depth greater than max level will be deleted.

    */
    prune: function(tree, maxLevel) {
        this.each(tree, function(elem, i) {
            if(i == maxLevel && elem.children) {
                delete elem.children;
                elem.children = [];
            }
        });
    },
    
    /*
       Method: getParent
    
       Returns the parent node of the node having _id_ as id.
    
       Parameters:
    
          tree - A JSON tree object. See also <Loader.loadJSON>.
          id - The _id_ of the child node whose parent will be returned.

      Returns:

          A tree JSON node if any, or false otherwise.
    
    */
    getParent: function(tree, id) {
        if(tree.id == id) return false;
        var ch = tree.children;
        if(ch && ch.length > 0) {
            for(var i=0; i<ch.length; i++) {
                if(ch[i].id == id) 
                    return tree;
                else {
                    var ans = this.getParent(ch[i], id);
                    if(ans) return ans;
                }
            }
        }
        return false;       
    },

    /*
       Method: getSubtree
    
       Returns the subtree that matches the given id.
    
       Parameters:
    
          tree - A JSON tree object. See also <Loader.loadJSON>.
          id - A node *unique* identifier.
    
       Returns:
    
          A subtree having a root node matching the given id. Returns null if no subtree matching the id is found.

    */
    getSubtree: function(tree, id) {
        if(tree.id == id) return tree;
        for(var i=0, ch=tree.children; i<ch.length; i++) {
            var t = this.getSubtree(ch[i], id);
            if(t != null) return t;
        }
        return null;
    },

    /*
       Method: getLeaves
    
        Returns the leaves of the tree.
    
       Parameters:
    
          node - A JSON tree node. See also <Loader.loadJSON>.
          maxLevel - _optional_ A subtree's max level.
    
       Returns:
    
       An array having objects with two properties. 
       
        - The _node_ property contains the leaf node. 
        - The _level_ property specifies the depth of the node.

    */
    getLeaves: function (node, maxLevel) {
        var leaves = [], levelsToShow = maxLevel || Number.MAX_VALUE;
        this.each(node, function(elem, i) {
            if(i < levelsToShow && 
            (!elem.children || elem.children.length == 0 )) {
                leaves.push({
                    'node':elem,
                    'level':levelsToShow - i
                });
            }
        });
        return leaves;
    },


    /*
       Method: eachLevel
    
        Iterates on tree nodes with relative depth less or equal than a specified level.
    
       Parameters:
    
          tree - A JSON tree or subtree. See also <Loader.loadJSON>.
          initLevel - An integer specifying the initial relative level. Usually zero.
          toLevel - An integer specifying a top level. This method will iterate only through nodes with depth less than or equal this number.
          action - A function that receives a node and an integer specifying the actual level of the node.
            
      Example:
     (start code js)
       TreeUtil.eachLevel(tree, 0, 3, function(node, depth) {
          alert(node.name + ' ' + depth);
       });
     (end code)
    */
    eachLevel: function(tree, initLevel, toLevel, action) {
        if(initLevel <= toLevel) {
            action(tree, initLevel);
            for(var i=0, ch = tree.children; i<ch.length; i++) {
                this.eachLevel(ch[i], initLevel +1, toLevel, action);   
            }
        }
    },

    /*
       Method: each
    
        A tree iterator.
    
       Parameters:
    
          tree - A JSON tree or subtree. See also <Loader.loadJSON>.
          action - A function that receives a node.

      Example:
      (start code js)
        TreeUtil.each(tree, function(node) {
          alert(node.name);
        });
      (end code)
            
    */
    each: function(tree, action) {
        this.eachLevel(tree, 0, Number.MAX_VALUE, action);
    },
    
    /*
       Method: loadSubtrees
    
        Appends subtrees to leaves by requesting new subtrees
        with the _request_ method.
    
       Parameters:
    
          tree - A JSON tree node. <Loader.loadJSON>.
          controller - An object that implements a request method.
      
       Example:
        (start code js)
          TreeUtil.loadSubtrees(leafNode, {
            request: function(nodeId, level, onComplete) {
              //Pseudo-code to make an ajax request for a new subtree
              // that has as root id _nodeId_ and depth _level_ ...
              Ajax.request({
                'url': 'http://subtreerequesturl/',
                
                onSuccess: function(json) {
                  onComplete.onComplete(nodeId, json);
                }
              });
            }
          });
        (end code)
    */
    loadSubtrees: function(tree, controller) {
        var maxLevel = controller.request && controller.levelsToShow;
        var leaves = this.getLeaves(tree, maxLevel),
        len = leaves.length,
        selectedNode = {};
        if(len == 0) controller.onComplete();
        for(var i=0, counter=0; i<len; i++) {
            var leaf = leaves[i], id = leaf.node.id;
            selectedNode[id] = leaf.node;
            controller.request(id, leaf.level, {
                onComplete: function(nodeId, tree) {
                    var ch = tree.children;
                    selectedNode[nodeId].children = ch;
                    if(++counter == len) {
                        controller.onComplete();
                    }
                }
            });
        }
    }
};

