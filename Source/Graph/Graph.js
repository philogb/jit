/*
 * File: Graph.js
 *
 * Generic <Graph>, <Graph.Node> and <Graph.Adjacence> classes.
 *
 * Used by:
 *
 * <Hypertree>, <RGraph> and <ST>.
 *
*/

/*
 Class: Graph

 A generic Graph class.

 Description:

 When a json graph/tree structure is loaded by <Loader.loadJSON>, an internal <Graph> representation is created. 

 In most cases you'll be dealing with an already created <Graph> structure, so methods like <Graph.addNode> or <Graph.addAdjacence> won't 
 be of many use. However methods like <Graph.getNode> and <Graph.hasNode> are pretty useful.

 <Graph.Util> provides also iterators for <Graphs> and advanced and useful graph operations and methods.

 Used by:

 <Loader.loadJSON>, <Hypertree>, <RGraph> and <ST>.

 Access:

 An instance of this class can be accessed by using the _graph_ parameter of a <Hypertree>, <RGraph> or <ST> instance

 Example:

 (start code js)
   var st = new ST(canvas, config);
   st.graph.getNode //or any other <Graph> method.
   
   var ht = new Hypertree(canvas, config);
   ht.graph.getNode //or any other <Graph> method.
   
   var rg = new RGraph(canvas, config);
   rg.graph.getNode //or any other <Graph> method.
 (end code)
 
*/  

$jit.Graph = new Class({

 initialize: function(opt, Node, Edge, Label) {
    var innerOptions = {
    'complex': false,
    'Node': {}
    };
    this.Node = Node;
    this.Edge = Edge;
    this.Label = Label;
    this.opt = $.merge(innerOptions, opt || {});
    this.nodes= {};
 },

/*
     Method: getNode
    
     Returns a <Graph.Node> by _id_.

     Parameters:

     id - A <Graph.Node> id.

     Returns:

     A <Graph.Node> having _id_ as id. Returns *false* otherwise.

     Example:

     (start code js)
       var node = graph.getNode('someid');
     (end code)
*/  
 getNode: function(id) {
    if(this.hasNode(id)) return this.nodes[id];
    return false;
 },

 /*
   Method: getByName
  
   Returns a <Graph.Node> by _name_.
  
   Parameters:
  
   name - A <Graph.Node> name.
  
   Returns:
  
   A <Graph.Node> having _name_ as name. Returns *false* otherwise.
  
   Example:
  
   (start code js)
     var node = graph.getByName('someName');
   (end code)
  */  
  getByName: function(name) {
    for(var id in this.nodes) {
      var n = this.nodes[id];
      if(n.name == name) return n;
    }
    return false;
  },

/*
     Method: getAdjacence
    
     Returns an array of <Graph.Adjacence> objects connecting nodes with ids _id_ and _id2_.

     Parameters:

     id - A <Graph.Node> id.
     id2 - A <Graph.Node> id.

     Returns:

     An Array of <Graph.Adjacence> objects. Returns *false* if there's not a <Graph.Adjacence> connecting those two nodes.
*/  
  getAdjacence: function (id, id2) {
    var adjs = [];
    if(this.hasNode(id) && this.hasNode(id2) 
    && this.nodes[id].adjacentTo({ 'id':id2 }) 
    && this.nodes[id2].adjacentTo({ 'id':id })) {
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
    
        obj - An object containing as properties

        - _id_ node's id
        - _name_ node's name
        - _data_ node's data hash

    See also:
    <Graph.Node>

  */  
  addNode: function(obj) {
    if(!this.nodes[obj.id]) {  
      this.nodes[obj.id] = new Graph.Node($.extend({
        'id': obj.id,
        'name': obj.name,
        'data': obj.data
      }, this.opt.Node), 
      this.opt.complex, 
      this.Node, 
      this.Edge,
      this.Label);
    }
    return this.nodes[obj.id];
  },
  
    /*
     Method: addAdjacence
    
     Connects nodes specified by _obj_ and _obj2_. If not found, nodes are created.
     
     Parameters:
    
        obj - a <Graph.Node> object.
        obj2 - Another <Graph.Node> object.
        data - A DataSet object. Used to store some extra information in the <Graph.Adjacence> object created.

    See also:

    <Graph.Node>, <Graph.Adjacence>
    */  
  addAdjacence: function (obj, obj2, data) {
    var adjs = [];
    if(!this.hasNode(obj.id)) { this.addNode(obj); }
    if(!this.hasNode(obj2.id)) { this.addNode(obj2); }
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
    
     Removes a <Graph.Node> matching the specified _id_.

     Parameters:

     id - A node's id.

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
    
     Removes a <Graph.Adjacence> matching _id1_ and _id2_.

     Parameters:

     id1 - A <Graph.Node> id.
     id2 - A <Graph.Node> id.
*/  
  removeAdjacence: function(id1, id2) {
    if(this.hasNode(id1)) this.nodes[id1].removeAdjacency(id2);
    if(this.hasNode(id2)) this.nodes[id2].removeAdjacency(id1);
  },

   /*
     Method: hasNode
    
     Returns a Boolean instance indicating if the node belongs to the <Graph> or not.
     
     Parameters:
    
        id - Node id.

     Returns:
      
     A Boolean instance indicating if the node belongs to the graph or not.
   */  
  hasNode: function(id) {
    return id in this.nodes;
  },
  
  /*
    Method: empty

    Empties the Graph

  */
  empty: function() { this.nodes = {}; }

});

var Graph = $jit.Graph;

var Accessors = {
    /*
    Method: getData
 
    Returns the specified data value property. This is useful for querying special/reserved 
    <Graph.Node> data properties (i.e dollar prefixed properties).

    Parameters:
 
       prop - The name of the property. The dollar sign is not necessary. For example _getData('width')_ will query 
       _data.$width_
       type - The type of the data property queried. Default's "current".
       force - Whether to obtain the true value of the property (equivalent to _data.$prop_) or to check for _node.overridable=true_ first. 
       For more information about _node.overridable_ please check the <Options.Node> and <Options.Edge> sections.
 
    Returns:
 
      The value of the dollar prefixed property or the global Node property value if _overridable=false_

    Example:
    (start code js)
     node.getData('width'); //will return node.data.$width if Node.overridable=true;
    (end code)
     */
   getData: function(prop, type, force) {
      type = type || 'current';
      var data;
      if(type == 'current') {
        data = this.data;
      } else if(type == 'start') {
        data = this.startData;
      } else if(type == 'end') {
        data = this.endData;
      }
      if(force) {
        return data['$' + prop];
      }
      var n = this.Config, dollar = '$' + prop;
      if(!n.overridable) return n[prop] || 0;
      return (dollar in data)? data[dollar] : ((dollar in this.data)? this.data[dollar] : (n[prop] || 0));
   },
    
    /*
    Method: setData
 
    Sets the current data property with some specific value. 
    This method is only useful for (dollar prefixed) reserved properties.
    
    Parameters:
 
       prop - The name of the property. The dollar sign is not necessary. For example _setData('width')_ will set 
       _data.$width_.
       value - The value to store.
       type - The type of the data property to store. Default's "current" but can also be "begin" or "end".
 
    Example:
    (start code js)
     node.setData('width', 30);
    (end code)
     */
   setData: function(prop, value, type) {
      type = type || 'current';
      var data;
      if(type == 'current') {
        data = this.data;
      } else if(type == 'start') {
        data = this.startData;
      } else if(type == 'end') {
        data = this.endData;
      }
      data['$' + prop] = value;
   },
   
   /*
   Method: setDataset

   Example:
   (start code js)
     node.setDataset(['current', 'end'], {
       'width': [100, 5],
       'color': ['#fff', '#ccc']
     });
     //...or also
     node.setDataset('end', {
       'width': 5,
       'color': '#ccc'
     });
   (end code)
    */
  setDataset: function(types, obj) {
     types = $.splat(types);
     for(var attr in obj) {
       for(var i=0, val = $.splat(obj[attr]), l=types.length; i<l; i++) {
         this.setData(attr, val[i], types[i]);
       }
     }
  },
    
    /*
    Method: removeData

    Will remove that property from data.
    
    Parameters:

       prop - The name of the property. The dollar sign is not necessary. 

    Example:
    (start code js)
     node.removeData('width'); //now the default width value is returned
    (end code)
     */
   removeData: function() {
      var that = this;
      $.each(arguments, function(prop){
        var pref = '$' + prop;
        delete that.data[pref];
        delete that.endData[pref];
        delete that.startData[pref];
      });
   },
    /*
    Method: getCanvasStyle

    Returns the specified canvas style data value property. This is useful for querying special/reserved 
    <Graph.Node> canvas style data properties (i.e dollar prefixed properties that match with $canvas-<name of canvas style>).

    Parameters:

       prop - The name of the property. The dollar signed prefix is not required. For example _getCanvasStyle('fillStyle')_ will query 
       _data.$canvas-fillStyle_
       type - The type of the data property queried. Default's "current".
       force - Whether to obtain the true value of the property (equivalent to _data.$canvas-prop_) or to check for _node.overridable=true_ first. 
       For more information about _node.overridable_ please check the <Options.Node> and <Options.Edge> sections.

    Returns:

      The value of the dollar prefixed property or the global Node property value if _overridable=false_

    Example:
    (start code js)
     node.getCanvasStyle('fillStyle'); //will return node.data.$canvas-fillStyle if Node.overridable=true;
    (end code)
     */
   getCanvasStyle: function(prop, type, force) {
      type = type || 'current';
      var data;
      if(type == 'current') {
        data = this.data;
      } else if(type == 'start') {
        data = this.startData;
      } else if(type == 'end') {
        data = this.endData;
      }
      if(force) {
        return data['$canvas-' + prop];
      }
      var c = this.Config, 
          n = c.CanvasStyles, 
          dollar = '$canvas-' + prop;
      if(!c.overridable) 
        return n[prop] || 0;
      return (dollar in data)? data[dollar] : ((dollar in this.data)? this.data[dollar] : (n[prop] || 0));
   },
    
    /*
    Method: setCanvasStyle

    Sets the current canvas style prefixed data property with some specific value. 
    This method is only useful for (dollar prefixed) reserved properties.
    
    Parameters:

       prop - The name of the property. The dollar sign is not necessary. For example _setCanvasStyle('fillStyle')_ will set 
       _data.$canvas-fillStyle_.
       value - The value to store.
       type - The type of the data property to store. Default's "current" but can also be "begin" or "end".

    Example:
    (start code js)
     node.setCanvasStyle('fillStyle', '#ccc');
    (end code)
     */
   setCanvasStyle: function(prop, value, type) {
      type = type || 'current';
      var data;
      if(type == 'current') {
        data = this.data;
      } else if(type == 'start') {
        data = this.startData;
      } else if(type == 'end') {
        data = this.endData;
      }
      data['$canvas-' + prop] = value;
   },

   /*
   Method: setCanvasStyles

   Parameters:

      obj - The name of the property. The dollar sign is not necessary. For example _setCanvasStyle('fillStyle')_ will set 
      _data.$canvas-fillStyle_.
      value - The value to store.
      type - The type of the data property to store. Default's "current" but can also be "begin" or "end".

   Example:
   (start code js)
     node.setCanvasStyles(['current', 'end'], {
       'shadowBlur': [100, 5],
       'shadowOffsetX': [100, 5],
       'shadowOffsetY': [100, 5]
     });
     //...or also
     node.setCanvasStyles('end', {
       'shadowBlur': 5,
       'shadowOffsetX': 5,
       'shadowOffsetY': 5
     });
   (end code)
    */
  setCanvasStyles: function(types, obj) {
     types = $.splat(types);
     for(var attr in obj) {
       for(var i=0, val = $.splat(obj[attr]), l=types.length; i<l; i++) {
         this.setCanvasStyle(attr, val[i], types[i]);
       }
     }
  },

  /*
   Method: removeCanvasStyle

   Will remove that canvas style property from data.
   
   Parameters:

      prop - The name of the property. 

   Example:
   (start code js)
    node.removeCanvasStyle('fillStyle'); //now the default fillStyle value is returned
   (end code)
    */
  removeCanvasStyle: function() {
     var that = this;
     $.each(arguments, function(prop){
       var pref = '$canvas-' + prop;
       delete that.data[pref];
       delete that.endData[pref];
       delete that.startData[pref];
     });
  }
};

/*
     Class: Graph.Node

     A <Graph> node.

     Parameters:

     obj - An object containing an 'id', 'name' and 'data' properties as described in <Graph.addNode>.
     complex - Whether node position properties should contain <Complex> or <Polar> instances.

     See also:

     <Graph>

     Description:

     An instance of <Graph.Node> is usually passed as parameter for most configuration/controller methods in the 
     <Hypertree>, <RGraph> and <ST> classes.

     A <Graph.Node> object has as properties

      id - Node id.
      name - Node name.
      data - Node data property containing a hash (i.e {}) with custom options. For more information see <Loader.loadJSON>.
      selected - Whether the node is selected or not. Used by <ST> for selecting nodes that are between the root node and the selected node.
      angleSpan - For radial layouts such as the ones performed by the <Hypertree> and the <RGraph>. Contains _begin_ and _end_ properties containing angle values describing the angle span for this subtree.
      pos - Current position. Can be a <Complex> or <Polar> instance.
      startPos - Starting position. Used for interpolation.
      endPos - Ending position. Used for interpolation.
*/
Graph.Node = new Class({
    
  initialize: function(opt, complex, Node, Edge, Label) {
    var innerOptions = {
      'id': '',
      'name': '',
      'data': {},
      'startData': {},
      'endData': {},
      'adjacencies': {},

      'selected': false,
      'drawn': false,
      'exist': false,

      'angleSpan': {
        'begin': 0,
        'end' : 0
      },

      'pos': (complex && $C(0, 0)) || $P(0, 0),
      'startPos': (complex && $C(0, 0)) || $P(0, 0),
      'endPos': (complex && $C(0, 0)) || $P(0, 0)
    };
    
    $.extend(this, $.extend(innerOptions, opt));
    this.Config = this.Node = Node;
    this.Edge = Edge;
    this.Label = Label;
  },

    /*
       Method: adjacentTo
    
       Indicates if the node is adjacent to the node specified by id

       Parameters:
    
          id - A node id.
    
       Returns:
    
         A Boolean instance indicating whether this node is adjacent to the specified by id or not.

       Example:
       (start code js)
        node.adjacentTo('mynodeid');
       (end code)
    */
    adjacentTo: function(node) {
        return node.id in this.adjacencies;
    },

    /*
       Method: getAdjacency
    
       Returns a <Graph.Adjacence> object connecting the current <Graph.Node> and the node having _id_ as id.

       Parameters:
    
          id - A node id.

       Returns:

          A <Graph.Adjacence> object or undefined.
    */  
    getAdjacency: function(id) {
        return this.adjacencies[id];
    },
    /*
       Method: addAdjacency
    
       Connects the current node and the given node.

       Parameters:
    
          node - A <Graph.Node>.
          data - Some custom hash information.
    */  
    addAdjacency: function(node, data) {
        var adj = new Graph.Adjacence(this, node, data, this.Edge, this.Label);
        return this.adjacencies[node.id] = adj;
    },
    
    /*
       Method: removeAdjacency
    
       Removes a <Graph.Adjacence> by _id_.

       Parameters:
    
          id - A node id.
    */  
    removeAdjacency: function(id) {
        delete this.adjacencies[id];
    },

    /*
      Method: getPos
   
      Returns the position of the node. Possible values are <Complex> or <Polar> instances.
  
      Parameters:
   
         type - Possible values are "start", "end" or "current". Default's "current".
   
      Returns:
   
        A <Complex> or <Polar> instance.
  
      Example:
      (start code js)
       node.getPos('end');
      (end code)
   */
   getPos: function(type) {
       type = type || "current";
       if(type == "current") {
         return this.pos;
       } else if(type == "end") {
         return this.endPos;
       } else if(type == "start") {
         return this.startPos;
       }
   },
   /*
     Method: setPos
  
     Sets the node's position.
  
     Parameters:
  
        value - A <Complex> or <Polar> instance.
        type - Possible values are "start", "end" or "current". Default's "current".
  
     Example:
     (start code js)
      node.setPos(new Complex(0, 0), 'end');
     (end code)
  */
  setPos: function(value, type) {
      type = type || "current";
      var pos;
      if(type == "current") {
        pos = this.pos;
      } else if(type == "end") {
        pos = this.endPos;
      } else if(type == "start") {
        pos = this.startPos;
      }
      pos.set(value);
  }
});

Graph.Node.implement(Accessors);

/*
     Class: Graph.Adjacence

     A <Graph> adjacence (or edge). Connects two <Graph.Nodes>.

     Parameters:

     nodeFrom - A <Graph.Node>.
     nodeTo - A <Graph.Node>.
     data - Some custom hash data.

     See also:

     <Graph>

     Description:

     An instance of <Graph.Adjacence> is usually passed as parameter for some configuration/controller methods in the 
     <Hypertree>, <RGraph> and <ST> classes.

     A <Graph.Adjacence> object has as properties

      nodeFrom - A <Graph.Node> connected by this edge.
      nodeTo - Another  <Graph.Node> connected by this edge.
      data - Node data property containing a hash (i.e {}) with custom options. For more information see <Loader.loadJSON>.
*/
Graph.Adjacence = new Class({
  
  initialize: function(nodeFrom, nodeTo, data, Edge, Label) {
    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;
    this.data = data || {};
    this.startData = {};
    this.endData = {};
    this.Config = this.Edge = Edge;
    this.Label = Label;
  }
});

Graph.Adjacence.implement(Accessors);

/*
   Object: Graph.Util

   <Graph> traversal and processing utility object.
*/
Graph.Util = {
    /*
       filter
    
       For internal use only. Provides a filtering function based on flags.
    */
    filter: function(param) {
        if(!param || !($.type(param) == 'string')) return function() { return true; };
        var props = param.split(" ");
        return function(elem) {
            for(var i=0; i<props.length; i++) { 
              if(elem[props[i]]) { 
                return false; 
              }
            }
            return true;
        };
    },
    /*
       Method: getNode
    
       Returns a <Graph.Node> by _id_.

       Parameters:

       graph - A <Graph> instance.
       id - A <Graph.Node> id.

       Returns:

       A <Graph> node.

       Example:

       (start code js)
         Graph.Util.getNode(graph, 'nodeid');
       (end code)
    */
    getNode: function(graph, id) {
        return graph.getNode(id);
    },
    
    /*
       Method: eachNode
    
       Iterates over <Graph> nodes performing an _action_.

       Parameters:

       graph - A <Graph> instance.
       action - A callback function having a <Graph.Node> as first formal parameter.

       Example:
       (start code js)
         Graph.Util.each(graph, function(node) {
          alert(node.name);
         });
       (end code)
    */
    eachNode: function(graph, action, flags) {
        var filter = this.filter(flags);
        for(var i in graph.nodes) {
          if(filter(graph.nodes[i])) action(graph.nodes[i]);
        } 
    },
    
    /*
       Method: eachAdjacency
    
       Iterates over <Graph.Node> adjacencies applying the _action_ function.

       Parameters:

       node - A <Graph.Node>.
       action - A callback function having <Graph.Adjacence> as first formal parameter.

       Example:
       (start code js)
         Graph.Util.eachAdjacency(node, function(adj) {
          alert(adj.nodeTo.name);
         });
       (end code)
    */
    eachAdjacency: function(node, action, flags) {
        var adj = node.adjacencies, filter = this.filter(flags);
        for(var id in adj) {
          if(filter(adj[id])) {
            action(adj[id], id);
          }
        }
    },

     /*
       Method: computeLevels
    
       Performs a BFS traversal setting the correct depth for each node.

       The depth of each node can then be accessed by 
       >node._depth

       Parameters:

       graph - A <Graph>.
       id - A starting node id for the BFS traversal.
       startDepth - _optional_ A minimum depth value. Default's 0.

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
    
       Performs a BFS traversal applying _action_ to each <Graph.Node>.

       Parameters:

       graph - A <Graph>.
       id - A starting node id for the BFS traversal.
       action - A callback function having a <Graph.Node> as first formal parameter.

       Example:
       (start code js)
         Graph.Util.eachBFS(graph, 'mynodeid', function(node) {
          alert(node.name);
         });
       (end code)
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
    
       Iterates over a node's subgraph applying _action_ to the nodes of relative depth between _levelBegin_ and _levelEnd_.

       Parameters:
       
       node - A <Graph.Node>.
       levelBegin - A relative level value.
       levelEnd - A relative level value.
       action - A callback function having a <Graph.Node> as first formal parameter.

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

       Parameters:
       node - A <Graph.Node>.
       action - A callback function having a <Graph.Node> as first formal parameter.

       Example:
       (start code js)
         Graph.Util.eachSubgraph(node, function(node) {
          alert(node.name);
         });
       (end code)
    */
    eachSubgraph: function(node, action, flags) {
      this.eachLevel(node, 0, false, action, flags);
    },

    /*
       Method: eachSubnode
    
       Iterates over a node's children (without deeper recursion).
       
       Parameters:
       node - A <Graph.Node>.
       action - A callback function having a <Graph.Node> as first formal parameter.

       Example:
       (start code js)
         Graph.Util.eachSubnode(node, function(node) {
          alert(node.name);
         });
       (end code)
    */
    eachSubnode: function(node, action, flags) {
        this.eachLevel(node, 1, 1, action, flags);
    },

    /*
       Method: anySubnode
    
       Returns *true* if any subnode matches the given condition.

       Parameters:
       node - A <Graph.Node>.
       cond - A callback function returning a Boolean instance. This function has as first formal parameter a <Graph.Node>.

       Returns:
       A boolean value.

       Example:
       (start code js)
         Graph.Util.anySubnode(node, function(node) { return node.name == "mynodename"; });
       (end code)
    */
    anySubnode: function(node, cond, flags) {
      var flag = false;
      cond = cond || $.lambda(true);
      var c = $.type(cond) == 'string'? function(n) { return n[cond]; } : cond;
      this.eachSubnode(node, function(elem) {
        if(c(elem)) flag = true;
      }, flags);
      return flag;
    },
  
    /*
       Method: getSubnodes
    
       Collects all subnodes for a specified node. The _level_ parameter filters nodes having relative depth of _level_ from the root node.

       Parameters:
       node - A <Graph.Node>.
       level - _optional_ A starting relative depth for collecting nodes. Default's 0.

       Returns:
       An array of nodes.

    */
    getSubnodes: function(node, level, flags) {
        var ans = [], that = this;
        level = level || 0;
        var levelStart, levelEnd;
        if($.type(level) == 'array') {
            levelStart = level[0];
            levelEnd = level[1];
        } else {
            levelStart = level;
            levelEnd = Number.MAX_VALUE - node._depth;
        }
        this.eachLevel(node, levelStart, levelEnd, function(n) {
            ans.push(n);
        }, flags);
        return ans;
    },
  
  
    /*
       Method: getParents
    
       Returns an Array of <Graph.Nodes> wich are parents of the given node. 

       Parameters:
       node - A <Graph.Node>.

       Returns:
       An Array of <Graph.Nodes>.

       Example:
       (start code js)
         var pars = Graph.Util.getParents(node);
         if(pars.length > 0) {
           //do stuff with parents
         }
       (end code)
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
    Method: isDescendantOf
 
    Returns a Boolean instance indicating if some node is descendant of the node with the given id. 

    Parameters:
    node - A <Graph.Node>.
    id - A <Graph.Node> id.

    Returns:
    Ture if _node_ is descendant of the node with the given _id_. False otherwise.

    Example:
    (start code js)
      var pars = Graph.Util.isDescendantOf(node, "nodeid");
    (end code)
 */
 isDescendantOf: function(node, id) {
    if(node.id == id) return true;
    var pars = this.getParents(node), ans = false;
    for ( var i = 0; !ans && i < pars.length; i++) {
    ans = ans || this.isDescendantOf(pars[i], id);
  }
    return ans;
 },

 /*
     Method: clean
  
     Cleans flags from nodes (by setting the _flag_ property to false).

     Parameters:
     graph - A <Graph> instance.
  */
  clean: function(graph) { this.eachNode(graph, function(elem) { elem._flag = false; }); }
};

