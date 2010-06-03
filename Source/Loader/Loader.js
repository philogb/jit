/*
 * File: Loader.js
 * 
 * Provides methods for loading JSON data.
 *
 * Description:
 *
 * Provides the <Loader.loadJSON> method implemented by the main visualization classes to load JSON Trees and Graphs.
 * 
 * Implemented By: 
 * 
 * <ST>, <TM>, <Hypertree> and <RGraph> classes
 * 
 */

/*
   Object: Loader

   Provides static methods for loading JSON data.

   Description:
   
   This object is extended by the main Visualization classes (<ST>, <Hypertree>, <TM> and <RGraph>)
   in order to implement the <Loader.loadJSON> method. 
   
   The <Loader.loadJSON> method accepts JSON Trees and Graph objects. This will be explained in detail in the <Loader.loadJSON> method definition.
*/
var Loader = {
     construct: function(json) {
        var isGraph = ($.type(json) == 'array');
        var ans = new Graph(this.graphOptions, this.config.Node, this.config.Edge, this.config.Label);
        if(!isGraph) 
            //make tree
            (function (ans, json) {
                ans.addNode(json);
                if(json.children) {
                  for(var i=0, ch = json.children; i<ch.length; i++) {
                    ans.addAdjacence(json, ch[i]);
                    arguments.callee(ans, ch[i]);
                  }
                }
            })(ans, json);
        else
            //make graph
            (function (ans, json) {
                var getNode = function(id) {
                  for(var i=0, l=json.length; i<l; i++) {
                    if(json[i].id == id) {
                      return json[i];
                    }
                  }
                  // The node was not defined in the JSON
                  // Let's create it
                  var newNode = {
                		"id" : id,
                		"name" : id
                	};
                  return ans.addNode(newNode);
                };

                for(var i=0, l=json.length; i<l; i++) {
                  ans.addNode(json[i]);
                  var adj = json[i].adjacencies;
                  if (adj) {
                    for(var j=0, lj=adj.length; j<lj; j++) {
                      var node = adj[j], data = {};
                      if(typeof adj[j] != 'string') {
                        data = node.data;
                        node = node.nodeTo;
                      }
                      ans.addAdjacence(json[i], getNode(node), data);
                    }
                  }
                }
            })(ans, json);

        return ans;
    },

    /*
     Method: loadJSON
    
     Loads a JSON structure to the visualization. The JSON structure can be a JSON tree or graph structure.
     
        A JSON tree or graph structure consists of nodes, each having as properties
       - _id_ A unique identifier for the node
       - _name_ A node's name
       - _data_ The data optional property contains a hash (i.e {}) where you can store all 
       the information you want about this node.
        
        Hash keys prefixed with a dollar sign (i.e $) have special meaning. I will detail those properties below.
      
        For JSON tree structures, there's an extra optional property _children_ of type Array which contains the node's children.
      
      Example:

      (start code js)
        var json = {  
            "id": "aUniqueIdentifier",  
            "name": "usually a nodes name",  
            "data": {
                "some key": "some value",
                "some other key": "some other value"
             },  
            "children": [ 'other nodes or empty' ]  
        };  
      (end code)
        
        JSON Graph structures consist of an array of nodes, each specifying the nodes to which the current node is connected.
        
        For JSON Graph structures, the _children_ property is replaced by the _adjacencies_ property.
        
        There are two types of Graph structures, _simple_ and _extended_ graph structures.
        
        For _simple_ Graph structures, the adjacencies property contains an array of strings, each specifying the 
        id of the node connected to the main node.
        
        Example:
        
        (start code js)
        var json = [  
            {  
                "id": "aUniqueIdentifier",  
                "name": "usually a nodes name",  
                "data": {
                    "some key": "some value",
                    "some other key": "some other value"
                 },  
                "adjacencies": ["anotherUniqueIdentifier", "yetAnotherUniqueIdentifier", 'etc']  
            },

            'other nodes go here...' 
        ];          
        (end code)
        
        For _extended_ Graph structures, the adjacencies property contains an array of Adjacency objects that have as properties
        - nodeTo The other node connected by this adjacency.
        - data A data property, where we can store custom key/value information.
        
        Example:
        
        (start code js)
        var json = [  
            {  
                "id": "aUniqueIdentifier",  
                "name": "usually a nodes name",  
                "data": {
                    "some key": "some value",
                    "some other key": "some other value"
                 },  
                "adjacencies": [  
                {  
                    nodeTo:"aNodeId",  
                    data: {} //put whatever you want here  
                },
                'other adjacencies go here...'  
            },

            'other nodes go here...' 
        ];          
        (end code)
        
        Since all visualizations implement this method, this will be the entry point for JSON data for all visualizations. This method could be called like this
        
        Example:
        
        (start code js)
        var ht = new Hypertree(canvas, config);
        ht.loadJSON(json);
        
        var tm = new TM.Squarified(config);
        tm.loadJSON(json);
        
        var st = new ST(canvas, config);
        st.loadJSON(json);
        
        var rg = new RGraph(canvas, config);
        rg.loadJSON(json);
        
        (end code)
        
       Parameters:
    
          json - A JSON Tree or Graph structure.
          i - For Graph structures only. Sets the indexed node as root for the visualization.

    */
    loadJSON: function(json, i) {
      this.json = json;
      //if they're canvas labels erase them.
      if(this.labels && this.labels.clearLabels) {
        this.labels.clearLabels(true);
      }
      this.graph = this.construct(json);
      if($.type(json) != 'array'){
        this.root = json.id;
      } else {
        this.root = json[i? i : 0].id;
      }
    },
    
    /*
      Method: toJSON
   
      Returns a JSON tree/graph structure from the current graph state for this visualization. 
      See <Loader.loadJSON> for the graph formats available.
      
      See also:
      
      <Loader.loadJSON>
      
      Parameters:
      
      type - _(string)_ The type of the JSON structure to be returned. Possible options are "tree" or "graph". Default's "tree".
    */    
    toJSON: function(type) {
      type = type || "tree";
      if(type == 'tree') {
        var ans = {};
        var rootNode = this.graph.getNode(this.root);
        var ans = (function recTree(node) {
          var ans = {};
          ans.id = node.id;
          ans.name = node.name;
          ans.data = node.data;
          var ch =[];
          node.eachSubnode(function(n) {
            ch.push(recTree(n));
          });
          ans.children = ch;
          return ans;
        })(rootNode);
        return ans;
      } else {
        var ans = [];
        var T = !!this.graph.getNode(this.root).visited;
        this.graph.eachNode(function(node) {
          var ansNode = {};
          ansNode.id = node.id;
          ansNode.name = node.name;
          ansNode.data = node.data;
          var adjs = [];
          node.eachAdjacency(function(adj) {
            var nodeTo = adj.nodeTo;
            if(!!nodeTo.visited === T) {
              var ansAdj = {};
              ansAdj.nodeTo = nodeTo.id;
              ansAdj.data = adj.data;
              adjs.push(ansAdj);
            }
          });
          ansNode.adjacencies = adjs;
          ans.push(ansNode);
          node.visited = !T;
        });
        return ans;
      }
    }
};

