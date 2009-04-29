/*
 * File: Core.js
 * 
 * Author: Nicolas Garcia Belmonte
 * 
 * Copyright: Copyright 2008-2009 by Nicolas Garcia Belmonte.
 * 
 * License: BSD License
 * 
 * Homepage: <http://thejit.org>
 * 
 * Version: 1.0.8a
 *
 * Provides common utility functions and the Class object.
 * This code is used as middleware for standalone builds of the library.
 * If you are using Mootools then you don't need this module.
 * 
 * 
 * This Script is based on Mootools core: <http://mootools.net>
 * 
 * All functions and objects defined here are not visible nor accessible by the user.
 */

function $get(id) {
  return document.getElementById(id);  
};

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

var Class = function(properties){
	properties = properties || {};
	var klass = function(){
//      not defining any attributes in Class properties.
//		for (var key in this){
//	        if (typeof this[key] != 'function') this[key] = $unlink(this[key]);
//	    }
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
            $extend(self, ($type(klass) == 'function') ? new klass : klass);
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

