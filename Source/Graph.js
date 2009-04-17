/*
 * File: Graph.js
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
*/

/*
 Class: Graph

 A generic Graph class.
 
*/  

this.Graph = new Class({

/*
 Constructor: Graph

 Creates a new Graph instance.
 
*/  
 initialize: function(opt) {
    var innerOptions = {
		'complex': false,
		'Node': {}
	};
    //Property: opt
	//Graph class options
	this.opt = $merge(innerOptions, opt || {});
	//Property: nodes
    //Graph nodes
    this.nodes= {};
 },

/*
     Method: getNode
    
     Returns a <Graph.Node> from a specified _id_.
*/  
 getNode: function(id) {
    if(this.hasNode(id)) return this.nodes[id];
    return false;
 },

/*
     Method: getAdjacence
    
     Returns an array of <Graph.Adjacence> that connects nodes with id _id_ and _id2_.
*/  
  getAdjacence: function (id, id2) {
    var adjs = [];
    if(this.hasNode(id)     && this.hasNode(id2) 
    && this.nodes[id].adjacentTo({ 'id':id2 }) && this.nodes[id2].adjacentTo({ 'id':id })) {
        adjs.push(this.nodes[id].getAdjacency(id2));
        adjs.push(this.nodes[id2].getAdjacency(id));
        return adjs;
    }
    return false;   
 },

    /*
     Method: addNode
    
     Adds a node.
     
     Parameters:
    
        obj - A <> object.
    */  
  addNode: function(obj) {
    if(!this.nodes[obj.id]) {
        this.nodes[obj.id] = new Graph.Node($extend({
			'id': obj.id,
			'name': obj.name,
			'data': obj.data
		}, this.opt.Node), this.opt.complex);
    }
    return this.nodes[obj.id];
  },
  
    /*
     Method: addAdjacence
    
     Connects nodes specified by *obj* and *obj2*. If not found, nodes are created.
     
     Parameters:
    
        obj - a <Graph.Node> object.
        obj2 - Another <Graph.Node> object.
        data - A DataSet object.
    */  
  addAdjacence: function (obj, obj2, data) {
    var adjs = []
    if(!this.hasNode(obj.id)) this.addNode(obj);
    if(!this.hasNode(obj2.id)) this.addNode(obj2);
    obj = this.nodes[obj.id]; obj2 = this.nodes[obj2.id];
    
    for(var i in this.nodes) {
        if(this.nodes[i].id == obj.id) {
            if(!this.nodes[i].adjacentTo(obj2)) {
                adjs.push(this.nodes[i].addAdjacency(obj2, data));
            }
        }
        
        if(this.nodes[i].id == obj2.id) {   
            if(!this.nodes[i].adjacentTo(obj)) {
                adjs.push(this.nodes[i].addAdjacency(obj, data));
            }
        }
    }
    return adjs;
 },

    /*
     Method: removeNode
    
     Removes a <Graph.Node> from <Graph> that matches the specified _id_.
    */  
  removeNode: function(id) {
    if(this.hasNode(id)) {
        var node = this.nodes[id];
        for(var i=0 in node.adjacencies) {
            var adj = node.adjacencies[i];
            this.removeAdjacence(id, adj.nodeTo.id);
        }
        delete this.nodes[id];
    }
  },
  
/*
     Method: removeAdjacence
    
     Removes a <Graph.Adjacence> from <Graph> that matches the specified _id1_ and _id2_.
*/  
  removeAdjacence: function(id1, id2) {
    if(this.hasNode(id1)) this.nodes[id1].removeAdjacency(id2);
    if(this.hasNode(id2)) this.nodes[id2].removeAdjacency(id1);
  },

    /*
     Method: hasNode
    
     Returns a Boolean instance indicating if node belongs to graph or not.
     
     Parameters:
    
        id - Node id.

     Returns:
      
            A Boolean instance indicating if node belongs to graph or not.
    */  
  hasNode: function(id) {
    return id in this.nodes;
  }
});

/*
     Class: Graph.Node
    
     Behaviour of the <Graph> node.

*/
Graph.Node = new Class({
    
/*
   Constructor: Graph.Node

   Node constructor.

   Parameters:

      id - The node *unique identifier* id.
      name - A node's name.
      data - Place to store some extra information (can be left to null).
      opt - initialization options

   Returns:

      A new <Graph.Node> instance.
*/
    initialize: function(opt, complex) {
	    //Property: innerOptions
		//Default configuration options
		var innerOptions = {
			'id': '',
			'name': '',
			'data': {},
			'adjacencies': {},

			'selected': false,
			'drawn': false,
			'exist': false,

			'angleSpan': {
				'begin': 0,
				'end' : 0
			},

			'alpha': 1,
			'startAlpha': 1,
			'endAlpha': 1,
			
			'pos': (complex && $C(0, 0)) || $P(0, 0),
			'startPos': (complex && $C(0, 0)) || $P(0, 0),
			'endPos': (complex && $C(0, 0)) || $P(0, 0)
		};
		
		$extend(this, $extend(innerOptions, opt));
	},

    /*
       Method: adjacentTo
    
       Indicates if the node is adjacent to the node indicated by the specified id

       Parameters:
    
          id - A node id.
    
       Returns:
    
         A Boolean instance indicating whether this node is adjacent to the specified by id or not.
    */
    adjacentTo: function(node) {
        return node.id in this.adjacencies;
    },

    /*
       Method: getAdjacency
    
       Returns a <Graph.Adjacence> that connects the current <Graph.Node> with the node having _id_ as id.

       Parameters:
    
          id - A node id.
    */  
    getAdjacency: function(id) {
        return this.adjacencies[id];
    },
    /*
       Method: addAdjacency
    
       Connects the node to the specified by id.

       Parameters:
    
          id - A node id.
    */  
    addAdjacency: function(node, data) {
        var adj = new Graph.Adjacence(this, node, data);
        return this.adjacencies[node.id] = adj;
    },
    
    /*
       Method: removeAdjacency
    
       Deletes the <Graph.Adjacence> by _id_.

       Parameters:
    
          id - A node id.
    */  
    removeAdjacency: function(id) {
        delete this.adjacencies[id];
    }
});

/*
   Class: Graph.Adjacence
    
     Creates a new <Graph> adjacence.

*/
Graph.Adjacence = function(nodeFrom, nodeTo, data) {
    //Property: nodeFrom
    //One of the two <Graph.Node>s connected by this edge.
    this.nodeFrom = nodeFrom;
    //Property: nodeTo
    //One of the two <Graph.Node>s connected by this edge.
    this.nodeTo = nodeTo;
    //Property: data
    //A dataset object
    this.data = data || {};
    //Property: alpha
    //node alpha
    this.alpha = 1;
    //Property: startAlpha
    //node start alpha
    this.startAlpha = 1;
    //Property: endAlpha
    //node end alpha
    this.endAlpha = 1;
};

/*
   Object: Graph.Util

   A multi purpose object to do graph traversal and processing.
*/
Graph.Util = {
    /*
       Method: filter
    
       For internal use only. Provides a filtering function based on flags.
    */
    filter: function(param) {
        if(!param || !($type(param) == 'string')) return function() { return true; };
        var props = param.split(" ");
        return function(elem) {
            for(var i=0; i<props.length; i++) if(elem[props[i]]) return false;
            return true;
        };
    },
    /*
       Method: getNode
    
       Returns a graph's node with a specified _id_.
    */
    getNode: function(graph, id) {
        return graph.getNode(id);
    },
    
    /*
       Method: eachNode
    
       Iterates over graph nodes performing an action.
    */
    eachNode: function(graph, action, flags) {
        var filter = this.filter(flags);
        for(var i in graph.nodes) if(filter(graph.nodes[i])) action(graph.nodes[i]);
    },
    
    /*
       Method: eachAdjacency
    
       Iterates over a _node_ adjacencies applying the _action_ function.
    */
    eachAdjacency: function(node, action, flags) {
        var adj = node.adjacencies, filter = this.filter(flags);
        for(var id in adj) if(filter(adj[id])) action(adj[id], id);
    },

     /*
       Method: computeLevels
    
       Performs a BFS traversal setting correct level for nodes.
    */
    computeLevels: function(graph, id, startDepth, flags) {
        startDepth = startDepth || 0;
        var filter = this.filter(flags);
        this.eachNode(graph, function(elem) {
            elem._flag = false;
            elem._depth = -1;
        }, flags);
		var root = graph.getNode(id);
        root._depth = startDepth;
        var queue = [root];
        while(queue.length != 0) {
            var node = queue.pop();
            node._flag = true;
            this.eachAdjacency(node, function(adj) {
                var n = adj.nodeTo;
                if(n._flag == false && filter(n)) {
                    if(n._depth < 0) n._depth = node._depth + 1 + startDepth;
                    queue.unshift(n);
                }
            }, flags);
        }
    },

    /*
       Method: eachBFS
    
       Performs a BFS traversal of a graph beginning by the node of id _id_ and performing _action_ on each node.
       This traversal ignores nodes or edges having the property _ignore_ setted to _true_.
    */
    eachBFS: function(graph, id, action, flags) {
        var filter = this.filter(flags);
        this.clean(graph);
        var queue = [graph.getNode(id)];
        while(queue.length != 0) {
            var node = queue.pop();
            node._flag = true;
            action(node, node._depth);
            this.eachAdjacency(node, function(adj) {
                var n = adj.nodeTo;
                if(n._flag == false && filter(n)) {
                    n._flag = true;
                    queue.unshift(n);
                }
            }, flags);
        }
    },
    
    /*
       Method: eachLevel
    
       Iterates over a node's subgraph applying _action_ to the nodes of relative _depth_ between _levelBegin_ and _levelEnd_.
    */
    eachLevel: function(node, levelBegin, levelEnd, action, flags) {
        var d = node._depth, filter = this.filter(flags), that = this;
		levelEnd = levelEnd === false? Number.MAX_VALUE -d : levelEnd;
        (function loopLevel(node, levelBegin, levelEnd) {
            var d = node._depth;
            if(d >= levelBegin && d <= levelEnd && filter(node)) action(node, d);
            if(d < levelEnd) {
                that.eachAdjacency(node, function(adj) {
                    var n = adj.nodeTo;
                    if(n._depth > d) loopLevel(n, levelBegin, levelEnd);
                });
            }
        })(node, levelBegin + d, levelEnd + d);      
    },

    /*
       Method: eachSubgraph
    
       Iterates over a node's children recursively.
    */
    eachSubgraph: function(node, action, flags) {
		this.eachLevel(node, 0, false, action, flags);
    },

    /*
       Method: eachSubnode
    
       Iterates over a node's children (without deeper recursion).
    */
    eachSubnode: function(node, action, flags) {
        this.eachLevel(node, 1, 1, action, flags);
    },

    /*
       Method: anySubnode
    
       Returns true if any subnode matches the given condition.
    */
    anySubnode: function(node, cond, flags) {
        var flag = false;
		cond = cond || $lambda(true);
		var c = $type(cond) == 'string'? function(n) { return n[cond]; } : cond;
		this.eachSubnode(node, function(elem) {
			if(c(elem)) flag = true;
		}, flags);
		return flag;
    },
	
    /*
       Method: getSubnodes
    
       Collects all subnodes for a specified node. The _level_ parameter filters nodes having relative depth of _level_ from the root node.
    */
    getSubnodes: function(node, level, flags) {
        var ans = [], that = this;
        level = level || 0;
        if($type(level) == 'array') {
            var levelStart = level[0];
            var levelEnd = level[1];
        } else {
            var levelStart = level;
            var levelEnd = Number.MAX_VALUE - node._depth;
        }
        this.eachLevel(node, levelStart, levelEnd, function(n) {
			ans.push(n);
		}, flags);
        return ans;
    },
	
	
    /*
       Method: getParents
    
       Returns all nodes having a depth that is less than the node's depth property.
    */
    getParents: function(node) {
        var ans = [];
        this.eachAdjacency(node, function(adj) {
            var n = adj.nodeTo;
            if(n._depth < node._depth) ans.push(n);
        });
        return ans;
    },
    
    /*
       Method: clean
    
       Cleans flags from nodes (by setting the _flag_ property to false).
    */
    clean: function(graph) { this.eachNode(graph, function(elem) { elem._flag = false; }); }
};

