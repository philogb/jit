/*
 * File: Treemap.js
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
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the organization nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Nicolas Garcia Belmonte ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL Nicolas Garcia Belmonte BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */

/*
   Object: TreeUtil

   An object containing some common tree manipulation methods.
*/
this.TreeUtil = {

	/*
	   Method: prune
	
	   Clears all tree nodes having depth greater than maxLevel.
	
	   Parameters:
	
	      tree - A JSON tree object. <http://blog.thejit.org>
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
	
	   Returns the parent node of the node having _id_.
	
	   Parameters:
	
	      tree - A JSON tree object. <http://blog.thejit.org>
	      id - The _id_ of the child node whose parent will be returned.
	
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
	
		  tree - A JSON tree object. <http://blog.thejit.org>
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
    
          node - A tree node (which is also a JSON tree object of course). <http://blog.thejit.org>
    
       Returns:
    
       An array having objects with two properties. The _node_ property contains the leaf node. The _level_ property specifies the depth of the node.
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
	
		Iterates on tree nodes which relative depth is less or equal than a specified level.
	
	   Parameters:
	
	      tree - A JSON tree or subtree. <http://blog.thejit.org>
	      initLevel - An integer specifying the initial relative level. Usually zero.
	      toLevel - An integer specifying a top level. This method will iterate only through nodes with depth less than or equal this number.
	      action - A function that receives a node and an integer specifying the actual level of the node.
	      	
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
	
	      tree - A JSON tree or subtree. <http://blog.thejit.org>
	      action - A function that receives a node.
	      	
	*/
	each: function(tree, action) {
		this.eachLevel(tree, 0, Number.MAX_VALUE, action);
	},
	
    /*
       Method: loadSubtrees
    
        Appends subtrees to leaves by requesting new subtrees.
        with the controller.request method.
    
       Parameters:
    
          tree - A JSON tree or subtree. <http://blog.thejit.org>
          controller - A controller.
            
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

/*
   Object: TM

	Abstract Treemap class. Squarified and Slice and Dice Treemaps will extend this class.
*/
this.TM = {

	layout: {
		orientation: "h",
		vertical: function() { 
			return this.orientation == "v"; 
		},
		horizontal: function() { 
			return this.orientation == "h"; 
		},
		change: function() { 
			this.orientation = this.vertical()? "h" : "v"; 
		}
	},
	
	innerController: {
			onBeforeCompute:  $empty,
			onAfterCompute:   $empty,
			onCreateLabel:    $empty,
			onPlaceLabel:     $empty,
			onComplete:       $empty,
			onBeforePlotLine: $empty,
			onAfterPlotLine:  $empty,
            onCreateElement:  $empty,
			request:          false
		},

		/*
		   Object: Config
		
		   Treemap configuration. 
		   Contains properties to enable customization and proper 
		   behavior of treemaps.
		*/
		config: {
			//Property: tips
			//initial layout orientation "v" or "h"
			//for vertical/horizontal.
			orientation: "h",
			//Property: tips
			//Enables tips for the Treemap
			tips: false,
			//Property: titleHeight
			//The height of the title. Set this to zero and remove 
			//all styles for node classes if you just want to show leaf nodes.
			titleHeight: 13,
			//Property: rootId
			//The id of the main container box. That is, the div that 
			//will contain this visualization. This div has to be 
			//explicitly added on your page.
			rootId: 'infovis',
			//Property: offset
			//Offset distance between nodes. Works better with 
			//even numbers. Set this to zero if you only want to show leaf nodes.
			offset:4,
			//Property: levelsToShow
			//Depth of the plotted tree. The plotted tree will be pruned 
			//in order to fit with the specified depth. Useful when 
			//using the "request" method on the controller.
			levelsToShow: 3,
			//Property: Color
			//Configuration object to add some color to the leaves.
			Color: {
				//Property: allow
				//Set this to true if you want to add color to 
				//the nodes. Color will be based upon the second 
				//"data" JSON object passed to the node. If your node 
				//has a "data" property which has at least two key-value 
				//objects, color will be based on your second key-value object value.
				allow: false,
				//Property: minValue
				//We need to know the minimum value of the property which 
				//will be taken in account to color the leaves.
				minValue: -100,
				//Property: maxValue
				//We need to know the maximum value of the property which 
				//will be taken in account to color the leaves.
				maxValue: 100,
				//Property: minColorValue
				//The color to be applied when displaying a min value (RGB format).
				minColorValue: [255, 0, 50],
				//Property: maxColorValue
				//The color to be applied when displaying a max value (RGB format).
				maxColorValue: [0, 255, 50]
			}
		},
	

	/*
	   Method: initialize
	
		<TM.Squarified> and <TM.SliceAndDice> constructor.
	
	   Parameters:
	
	      controller - A treemap controller. <http://blog.thejit.org/?p=8>
	   
	   Returns:
	
	   	  A new <TM.Squarified> or <TM.SliceAndDice> instance.
 
	*/
	initialize: function(controller) {
		//Property: tree
		//The JSON tree. <http://blog.thejit.org>
		this.tree = null;
		//Property: showSubtree
		//The displayed JSON subtree. <http://blog.thejit.org>
		this.shownTree = null;
		//Property: tips
		//This property will hold the a Mootools Tips instance if specified.
		this.tips = null;
		//Property: controller
		//A treemap controller <http://blog.thejit.org/?p=8>
		this.controller = this.config = $merge(this.config, 
										this.innerController, 
										controller);
		//Property: rootId
		//Id of the Treemap container
		this.rootId = this.config.rootId;
		this.layout.orientation = this.config.orientation;
	},


	/*
	   Method: toStyle
	
		Transforms a JSON into a CSS style string.
	*/
	toStyle: function(obj) {
		var ans = "";
		for(var s in obj) ans += s + ":" + obj[s] + ";";
		return ans;
	},

	/*
	   Method: leaf
	
		Returns a boolean value specifying if the node is a tree leaf or not.
	
	   Parameters:
	
	      tree - A tree node (which is also a JSON tree object of course). <http://blog.thejit.org>

	   Returns:
	
	   	  A boolean value specifying if the node is a tree leaf or not.
 
	*/
	leaf: function(tree) {
		return tree.children == 0;
	},

	/*
	   Method: createBox
	
		Constructs the proper DOM layout from a json node.
		
		If this node is a leaf, then it creates a _leaf_ div dom element by calling <TM.newLeaf>. Otherwise it creates a content div dom element that contains <TM.newHead> and <TM.newBody> elements.
	
	   Parameters:

		  injectTo - A DOM element where this new DOM element will be injected.	
	      json - A JSON subtree. <http://blog.thejit.org>
		  coord - A coordinates object specifying width, height, left and top style properties.

	*/
	createBox: function(json, coord, html) {
		if(!this.leaf(json))
			var box = this.headBox(json, coord) + this.bodyBox(html, coord);
		 else 
			var box = this.leafBox(json, coord);
		return this.contentBox(json, coord, box);
	},
	
	/*
	   Method: plot
	
		Plots a Treemap
	*/
	plot: function(json) {
		var coord = json.coord, html = "";
		
		if(this.leaf(json)) 
			return this.createBox(json, coord, null);
		
		for(var i=0, ch=json.children; i<ch.length; i++) 
			html+= this.plot(ch[i]);
		
		return this.createBox(json, coord, html);
	},


	/*
	   Method: headBox
	
		Creates the _head_ div dom element that usually contains the name of a parent JSON tree node.
	
	   Parameters:
	
	      json - A JSON subtree. <http://blog.thejit.org>
	      coord - width and height base coordinates

	   Returns:
	
	   	  A new _head_ div dom element that has _head_ as class name.
 
	*/
	headBox: function(json, coord) {
		var config = this.config, offst = config.offset;
		var c = {
			'height': config.titleHeight + "px",
			'width': (coord.width - offst) + "px",
			'left':  offst / 2 + "px"
		};
		return "<div class=\"head\" style=\"" + this.toStyle(c) + "\">"
				 + json.name + "</div>";
	},

	/*
	   Method: bodyBox
	
		Creates the _body_ div dom element that usually contains a subtree dom element layout.
	
	   Parameters:
	
	      html - html that should be contained in the body html.

	   Returns:
	
	   	  A new _body_ div dom element that has _body_ as class name.
 
	*/
	bodyBox: function(html, coord) {
		var config = this.config,
		th = config.titleHeight,
		offst = config.offset;
		var c = {
			'width': (coord.width - offst) + "px",
			'height':(coord.height - offst - th) + "px",
			'top':   (th + offst / 2) +  "px",
			'left':  (offst / 2) + "px"
		};
		return "<div class=\"body\" style=\""
		  + this.toStyle(c) +"\">" + html + "</div>";
	},



	/*
	   Method: contentBox
	
		Creates the _content_ div dom element that usually contains a _leaf_ div dom element or _head_ and _body_ div dom elements.
	
	   Parameters:
	
	      json - A JSON node. <http://blog.thejit.org>
	      coord - An object containing width, height, left and top coordinates.
	      html - input html wrapped by this tag.
	      
	   Returns:
	
	   	  A new _content_ div dom element that has _content_ as class name.
 
	*/
	contentBox: function(json, coord, html) {
		var c = {};
		for(var i in coord) c[i] = coord[i] + "px";
		return "<div class=\"content\" style=\"" + this.toStyle(c) 
		   + "\" id=\"" + json.id + "\">" + html + "</div>";
	},


	/*
	   Method: leafBox
	
		Creates the _leaf_ div dom element that usually contains nothing else.
	
	   Parameters:
	
	      json - A JSON subtree. <http://blog.thejit.org>
	      coord - base with and height coordinates
	      
	   Returns:
	
	   	  A new _leaf_ div dom element having _leaf_ as class name.
 
	*/
	leafBox: function(json, coord) {
		var config = this.config;
		var backgroundColor = config.Color.allow && this.setColor(json), 
		offst = config.offset,
		width = coord.width - offst,
		height = coord.height - offst;
		var c = {
			'top':   (offst / 2)  + "px",
			'height':height + "px",
			'width': width + "px",
			'left': (offst / 2) + "px"
		};
		if(backgroundColor) c['background-color'] = backgroundColor;
		return "<div class=\"leaf\" style=\"" + this.toStyle(c) + "\">" 
				+ json.name + "</div>";
	},


	/*
	   Method: setColor
	
		A JSON tree node has usually a data property containing an Array of key-value objects. This method takes the second key-value object from that array, returning a string specifying a color relative to the value property of that object.
	
	   Parameters:
	
	      json - A JSON subtree. <http://blog.thejit.org>

	   Returns:
	
	   	  A String that represents a color in hex value.
 
	*/
	setColor: function(json) {
		var c = this.config.Color,
		maxcv = c.maxColorValue,
		mincv = c.minColorValue,
		maxv = c.maxValue,
		minv = c.minValue,
		diff = maxv - minv,
		x = json.data.$color.toFloat();
		//linear interpolation		
		var comp = function(i, x) { 
			return (((maxcv[i] - mincv[i]) / diff) * (x - minv) + mincv[i]).toInt(); 
		};
		
		return [ comp(0, x), comp(1, x), comp(2, x) ].rgbToHex();
	},

	/*
	   Method: enter
	
		Sets the _elem_ parameter as root and performs the layout.
	
	   Parameters:
	
	      elem - A JSON subtree. <http://blog.thejit.org>
	*/
	enter: function(elem) {
		this.view(elem.getParent().id);
	},
	
	/*
	   Method: out
	
		Takes the _parent_ node of the currently shown subtree and performs the layout.
	
	*/
	out: function() {
		var parent = TreeUtil.getParent(this.tree, this.shownTree.id);
		if(parent) {
			if(this.controller.request)
				TreeUtil.prune(parent, this.config.levelsToShow);
			this.view(parent.id);
		}
	},
	
	/*
	   Method: view
	
		Sets the root of the treemap to the specified Id
	
	   Parameters:
	
		  id - A node identifier
	*/
	view: function(id) {
		var config = this.config, that = this;
		if(config.tips) this.tips.hide();
		var post = {
			onComplete: function() {
				that.loadTree(id);
				$(config.rootId).focus();
			}
		};

		if (this.controller.request) {
			var TUtil = TreeUtil;
			TUtil.loadSubtrees(TUtil.getSubtree(this.tree, id),
							 $merge(this.controller, post));
		} else {
			post.onComplete();
		}
	},
	
	/*
	   Method: resetPath
	
		Removes the _.in-path_ className for all tree dom elements and then adds this className to all ancestors of the given subtree.
	
	   Parameters:
	
	      tree - A tree node (which is also a JSON tree object of course). <http://blog.thejit.org>
	*/
	resetPath: function(tree) {
		var root = this.rootId;
		var selector = "#" + root + " .in-path";
		$$(selector).each(function (elem) {
			elem.removeClass("in-path");
		});
		var container = $(tree.id);
		var getParent = function(c) { 
			var p = c.getParent();
			return p && (p.id != root) && p;
		 };
		var parent = (tree)? getParent(container) : false;
		while(parent) {
			parent.getFirst().addClass("in-path")
			parent = getParent(parent);
		}
	},

	/*
	   Method: initializeBehavior
	
		Binds different methods to dom elements like tips, color changing, adding or removing class names on mouseenter and mouseleave, etc.
	*/
	initializeBehavior: function () {
		var root = '#' + this.rootId, that = this;
        var elems = $$(root + ' .leaf', root + ' .head');
		if(this.config.tips) 
			this.tips = new Tips(elems, {
							className: 'tool-tip',
							showDelay: 0,
							hideDelay: 0
						});
		
		elems.each(function(elem) {
			elem.oncontextmenu = $lambda(false);
			var id = elem.getParent().id;
            if(id) {
                var tree = TreeUtil.getSubtree(that.tree, id);
            }
            elem.addEvents({
				'mouseenter': function(e) {
					if(elem.hasClass("leaf")) {
						elem.addClass("over-leaf");
					} else if (elem.hasClass("head")) {
						elem.addClass("over-head");
						elem.getParent().addClass("over-content");
					}
					if(id) that.resetPath(tree);
					e.stopPropagation();
				},
				
				'mouseleave': function(e) {
					if (elem.hasClass("over-leaf")) {
						elem.removeClass("over-leaf");
					} else if (elem.getParent().hasClass("over-content")) {
						elem.removeClass("over-head");
						elem.getParent().removeClass("over-content");
					}
					that.resetPath(false);
					e.stopPropagation();
				},
				
				'mouseup': function(e) {
					if(e.rightClick) that.out(); else that.enter(elem);
					e.preventDefault();
					return false;
				}
			});
            that.controller.onCreateElement(elem, tree);                      
		});
	},
	
	/*
	   Method: loadTree
	
		Loads the subtree specified by _id_ and plots it on the layout container.
	
	   Parameters:
	
	      id - A subtree id.
	*/
	loadTree: function(id) {
		$(this.rootId).empty();
		this.loadJSON(TreeUtil.getSubtree(this.tree, id));
	}
	
};

/*
   Class: TM.SliceAndDice

	A JavaScript implementation of the Slice and Dice Treemap algorithm.

	Go to <http://blog.thejit.org> to know what kind of JSON structure feeds this object.
	
	Go to <http://blog.thejit.org/?p=8> to know what kind of controller this class accepts.
	
	Refer to the <Config> object to know what properties can be modified in order to customize this object. 

	The simplest way to create and layout a slice and dice treemap from a JSON object is:
	
	(start code)

	var tm = new TM.SliceAndDice();
	tm.loadJSON(json);

	(end code)

*/
TM.SliceAndDice = new Class({
	Implements: TM,
	/*
	   Method: loadJSON
	
		Loads the specified JSON tree and lays it on the main container.
	
	   Parameters:
	
	      json - A JSON subtree. <http://blog.thejit.org>
	*/
	loadJSON: function (json) {
		this.controller.onBeforeCompute(json);
		var container = $(this.rootId),
		config = this.config,
		width = container.offsetWidth,
		height = container.offsetHeight;
		
		var p = {
			'coord': {
				'top': 0,
				'left': 0,
				'width':  width,
				'height': height + config.titleHeight + config.offset
			}
		};
		
		if(this.tree == null) this.tree = json;
		this.shownTree = json;
		this.compute(p, json, this.layout.orientation);
		container.set('html', this.plot(json))
		this.initializeBehavior();
		this.controller.onAfterCompute(json);
	},
	
	/*
	   Method: compute
	
		Called by loadJSON to calculate recursively all node positions and lay out the tree.
	
	   Parameters:

	      par - The parent node of the json subtree.	
	      json - A JSON subtree. <http://blog.thejit.org>
	      orientation - The current <Layout> orientation. This value is switched recursively.
	*/
	compute: function(par, json, orientation) {
		var config = this.config, 
		coord = par.coord,
		offst = config.offset,
		width  = coord.width - offst,
		height = coord.height - offst - config.titleHeight,
		pdata = par.data,
		fact = (pdata && ("$area" in pdata))? json.data.$area / pdata.$area : 1;

		var horizontal = (orientation == "h");
		if(horizontal) {
			orientation = 'v';		
			var size = (width * fact).round(),
			otherSize = height,
			dim = 'height',
			pos = 'top',
			pos2 = 'left';
		} else {
			orientation = 'h';		
			var otherSize = (height * fact).round(),
			size = width,
			dim = 'width',
			pos = 'left',
			pos2 = 'top';
		}
		json.coord = {
			'width':size,
			'height':otherSize,
			'top':0,
			'left':0
		};
		var offsetSize = 0, tm = this;
		json.children.each(function(elem){
			tm.compute(json, elem, orientation);
			elem.coord[pos] = offsetSize;
			elem.coord[pos2] = 0;
			offsetSize += elem.coord[dim].toInt();
		});
	}
});


/*
   Class: TM.Area

	Abstract Treemap class containing methods that are common to
	 aspect ratio related algorithms.
*/
TM.Area = new Class({

	/*
	   Method: loadJSON
	
		Loads the specified JSON tree and lays it on the main container.
	
	   Parameters:
	
	      json - A JSON subtree. <http://blog.thejit.org>
	*/
	loadJSON: function (json) {
		this.controller.onBeforeCompute(json);
		var container = $(this.rootId),
		width = container.offsetWidth,
		height = container.offsetHeight,
		offst = this.config.offset,
		offwdth = width - offst,
		offhght = height - offst - this.config.titleHeight;

		json.coord =  {
			'height': height,
			'width': width,
			'top': 0,
			'left': 0
		};
		var coord = $merge(json.coord, {
			'width': offwdth,
			'height': offhght
		});

		this.compute(json, coord);
		container.set('html', this.plot(json));
		if(this.tree == null) this.tree = json;
		this.shownTree = json;
		this.initializeBehavior();
		this.controller.onAfterCompute(json);
	},
	
	/*
	   Method: computeDim
	
		Computes the dimensions and positions of a group of nodes
		according to a custom layout row condition. 
	
	   Parameters:

	      tail - An array of nodes.	
	      initElem - An array of nodes
	      w - A fixed dimension where nodes will be layed out.
		  coord - A coordinates object specifying width, height, left and top style properties.
		  comp - A custom comparison function
	*/
	computeDim: function(tail, initElem, w, coord, comp) {
		if(tail.length + initElem.length == 1) {
			var l = (tail.length == 1)? tail : initElem;
			this.layoutLast(l, w, coord);
			return;
		}
		if(tail.length >= 2 && initElem.length == 0) {
			initElem = [tail[0]];
			tail = tail.slice(1);
		}
		if(tail.length == 0) {
			if(initElem.length > 0) this.layoutRow(initElem, w, coord);
			return;
		}
		var c = tail[0];
		if(comp(initElem, w) >= comp([c].concat(initElem), w)) {
			this.computeDim(tail.slice(1), initElem.concat([c]), w, coord, comp);
		} else {
			var newCoords = this.layoutRow(initElem, w, coord);
			this.computeDim(tail, [], newCoords.dim, newCoords, comp);
		}
	},

	
	/*
	   Method: worstAspectRatio
	
		Calculates the worst aspect ratio of a group of rectangles. <http://en.wikipedia.org/wiki/Aspect_ratio>
		
	   Parameters:

		  children - An array of nodes.	
	      w - The fixed dimension where rectangles are being laid out.

	   Returns:
	
	   	  The worst aspect ratio.
 

	*/
	worstAspectRatio: function(ch, w) {
		if(!ch || ch.length == 0) return Number.MAX_VALUE;
		var areaSum = 0, maxArea = 0, minArea = Number.MAX_VALUE;
		for(var i=0; i<ch.length; i++) {
			var area = ch[i]._area;
			areaSum += area; 
			minArea = (minArea < area)? minArea : area;
			maxArea = (maxArea > area)? maxArea : area; 
		}
		var sqw = w * w, sqAreaSum = areaSum * areaSum;
		return Math.max(sqw * maxArea / sqAreaSum,
						sqAreaSum / (sqw * minArea));
	},
	
	/*
	   Method: avgAspectRatio
	
		Calculates the worst aspect ratio of a group of rectangles. <http://en.wikipedia.org/wiki/Aspect_ratio>
		
	   Parameters:

		  children - An array of nodes.	
	      w - The fixed dimension where rectangles are being laid out.

	   Returns:
	
	   	  The worst aspect ratio.
 

	*/
	avgAspectRatio: function(ch, w) {
		if(!ch || ch.length == 0) return Number.MAX_VALUE;
		var arSum = 0;
		for(var i=0; i<ch.length; i++) {
			var area = ch[i]._area;
			var h = area / w;
			arSum += (w > h)? w / h : h / w;
		}
		return arSum / ch.length;
	},

	/*
	   Method: layoutLast
	
		Performs the layout of the last computed sibling.
	
	   Parameters:

	      ch - An array of nodes.	
	      w - A fixed dimension where nodes will be layed out.
		  coord - A coordinates object specifying width, height, left and top style properties.
	*/
	layoutLast: function(ch, w, coord) {
		ch[0].coord = coord;
	}
	
});




/*
   Class: TM.Squarified

	A JavaScript implementation of the Squarified Treemap algorithm.
	
	Go to <http://blog.thejit.org> to know what kind of JSON structure feeds this object.
	
	Go to <http://blog.thejit.org/?p=8> to know what kind of controller this class accepts.
	
	Refer to the <Config> object to know what properties can be modified in order to customize this object. 

	The simplest way to create and layout a Squarified treemap from a JSON object is:
	
	(start code)

	var tm = new TM.Squarified();
	tm.loadJSON(json);

	(end code)
	
*/
	
TM.Squarified = new Class({
	Implements: [TM, TM.Area],

	/*
	   Method: compute
	
		Called by loadJSON to calculate recursively all node positions and lay out the tree.
	
	   Parameters:

	      parent - The parent node of the json subtree.	
	      json - A JSON subtree. <http://blog.thejit.org>
		  coord - A coordinates object specifying width, height, left and top style properties.
	*/
	compute: function(json, coord) {
		if (!(coord.width >= coord.height && this.layout.horizontal())) 
			this.layout.change();
		var ch = json.children, config = this.config;
		if(ch.length > 0) {
			this.processChildrenLayout(json, ch, coord);
			for(var i=0; i<ch.length; i++) {
				var chcoord = ch[i].coord,
				offst = config.offset,
				height = chcoord.height - (config.titleHeight + offst),
				width = chcoord.width - offst;
				var coord = {
					'width':width,
					'height':height,
					'top':0,
					'left':0
				};
				this.compute(ch[i], coord);
			}
		}
	},

	/*
	   Method: processChildrenLayout
	
		Computes children real areas and other useful parameters for performing the Squarified algorithm.
	
	   Parameters:

	      parent - The parent node of the json subtree.	
	      ch - An Array of nodes
		  coord - A coordinates object specifying width, height, left and top style properties.
	*/
	processChildrenLayout: function(par, ch, coord) {
		//compute children real areas
		var parentArea = coord.width * coord.height;
		var parentDataValue = par.data.$area.toFloat();
		for(var i=0; i<ch.length; i++) {
			ch[i]._area = parentArea * ch[i].data.$area.toFloat() / parentDataValue;
		}
		var minimumSideValue = (this.layout.horizontal())? coord.height : coord.width;
		ch.sort(function(a, b) { return (a._area <= b._area) - (a._area >= b._area); });
		var initElem = [ch[0]];
		var tail = ch.slice(1);
		this.squarify(tail, initElem, minimumSideValue, coord);
	},

	/*
	   Method: squarify
	
		Performs a heuristic method to calculate div elements sizes in order to have a good aspect ratio.
	
	   Parameters:

	      tail - An array of nodes.	
	      initElem - An array of nodes
	      w - A fixed dimension where nodes will be layed out.
		  coord - A coordinates object specifying width, height, left and top style properties.
	*/
	squarify: function(tail, initElem, w, coord) {
		this.computeDim(tail, initElem, w, coord, this.worstAspectRatio);
	},
	
	/*
	   Method: layoutRow
	
		Performs the layout of an array of nodes.
	
	   Parameters:

	      ch - An array of nodes.	
	      w - A fixed dimension where nodes will be layed out.
		  coord - A coordinates object specifying width, height, left and top style properties.
	*/
	layoutRow: function(ch, w, coord) {
		if(this.layout.horizontal()) {
			return this.layoutV(ch, w, coord);
		} else {
			return this.layoutH(ch, w, coord);
		}
	},
	
	layoutV: function(ch, w, coord) {
		var totalArea = 0; 
		ch.each(function(elem) { totalArea += elem._area; });
		var width = totalArea / w,
		top =  0; 
		for(var i=0; i<ch.length; i++) {
			var h = ch[i]._area / width;
			ch[i].coord = {
				'height': h,
				'width': width,
				'top': coord.top + (w - h - top),
				'left': coord.left
			};
			top += h;
		}
		var ans = {
			'height': coord.height,
			'width': coord.width - width,
			'top': coord.top,
			'left': coord.left + width
		};
		//take minimum side value.
		ans.dim = Math.min(ans.width, ans.height);
		if(ans.dim != ans.height) this.layout.change();
		return ans;
	},
	
	layoutH: function(ch, w, coord) {
		var totalArea = 0; 
		ch.each(function(elem) { totalArea += elem._area; });
		var height = totalArea / w,
		top = coord.height - height, 
		left = 0;
		
		for(var i=0; i<ch.length; i++) {
			ch[i].coord = {
				'height': height,
				'width': ch[i]._area / height,
				'top': top,
				'left': coord.left + left
			};
			left += ch[i].coord.width;
		}
		var ans = {
			'height': coord.height - height,
			'width': coord.width,
			'top': coord.top,
			'left': coord.left
		};
		ans.dim = Math.min(ans.width, ans.height);
		if(ans.dim != ans.width) this.layout.change();
		return ans;
	}
});


/*
   Class: TM.Strip

	A JavaScript implementation of the Strip Treemap algorithm.
	
	Go to <http://blog.thejit.org> to know what kind of JSON structure feeds this object.
	
	Go to <http://blog.thejit.org/?p=8> to know what kind of controller this class accepts.
	
	Refer to the <Config> object to know what properties can be modified in order to customize this object. 

	The simplest way to create and layout a Strip treemap from a JSON object is:
	
	(start code)

	var tm = new TM.Strip();
	tm.loadJSON(json);

	(end code)
	
*/
	
TM.Strip = new Class({
	Implements: [ TM, TM.Area ],

	/*
	   Method: compute
	
		Called by loadJSON to calculate recursively all node positions and lay out the tree.
	
	   Parameters:

	      parent - The parent node of the json subtree.	
	      json - A JSON subtree. <http://blog.thejit.org>
		  coord - A coordinates object specifying width, height, left and top style properties.
	*/
	compute: function(json, coord) {
		var ch = json.children, config = this.config;
		if(ch.length > 0) {
			this.processChildrenLayout(json, ch, coord);
			for(var i=0; i<ch.length; i++) {
				var chcoord = ch[i].coord,
				offst = config.offset,
				height = chcoord.height - (config.titleHeight + offst),
				width = chcoord.width - offst;
				var coord = {
					'width':width,
					'height':height,
					'top':0,
					'left':0
				};
				this.compute(ch[i], coord);
			}
		}
	},

	/*
	   Method: processChildrenLayout
	
		Computes children real areas and other useful parameters for performing the Squarified algorithm.
	
	   Parameters:

	      parent - The parent node of the json subtree.	
	      ch - An Array of nodes
		  coord - A coordinates object specifying width, height, left and top style properties.
	*/
	processChildrenLayout: function(par, ch, coord) {
		//compute children real areas
		var area = coord.width * coord.height;
		var dataValue = par.data.$area.toFloat();
		ch.each(function(elem) {
			elem._area = area * elem.data.$area.toFloat() / dataValue;
		});
		var side = (this.layout.horizontal())? coord.width : coord.height;
		var initElem = [ch[0]];
		var tail = ch.slice(1);
		this.stripify(tail, initElem, side, coord);
	},

	/*
	   Method: stripify
	
		Performs a heuristic method to calculate div elements sizes in order to have 
		a good compromise between aspect ratio and order.
	
	   Parameters:

	      tail - An array of nodes.	
	      initElem - An array of nodes
	      w - A fixed dimension where nodes will be layed out.
		  coord - A coordinates object specifying width, height, left and top style properties.
	*/
	stripify: function(tail, initElem, w, coord) {
		this.computeDim(tail, initElem, w, coord, this.avgAspectRatio);
	},
	
	/*
	   Method: layoutRow
	
		Performs the layout of an array of nodes.
	
	   Parameters:

	      ch - An array of nodes.	
	      w - A fixed dimension where nodes will be layed out.
		  coord - A coordinates object specifying width, height, left and top style properties.
	*/
	layoutRow: function(ch, w, coord) {
		if(this.layout.horizontal()) {
			return this.layoutH(ch, w, coord);
		} else {
			return this.layoutV(ch, w, coord);
		}
	},
	
	layoutV: function(ch, w, coord) {
		var totalArea = 0; 
		ch.each(function(elem) { totalArea += elem._area; });
		var width = (totalArea / w),
		top =  0; 
		for(var i=0; i<ch.length; i++) {
			var h = (ch[i]._area / width);
			ch[i].coord = {
				'height': h,
				'width': width,
				'top': coord.top + (w - h - top),
				'left': coord.left
			};
			top += h;
		}

		var ans = {
			'height': coord.height,
			'width': coord.width - width,
			'top': coord.top,
			'left': coord.left + width,
			'dim': w
		};
		return ans;
	},
	
	layoutH: function(ch, w, coord) {
		var totalArea = 0; 
		ch.each(function(elem) { totalArea += elem._area; });
		var height = totalArea / w,
		top = coord.height - height, 
		left = 0;
		
		for(var i=0; i<ch.length; i++) {
			ch[i].coord = {
				'height': height,
				'width': ch[i]._area / height,
				'top': top,
				'left': coord.left + left
			};
			left += ch[i].coord.width;
		}
		var ans = {
			'height': coord.height - height,
			'width': coord.width,
			'top': coord.top,
			'left': coord.left,
			'dim': w
		};
		return ans;
	}
});

