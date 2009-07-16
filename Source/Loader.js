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
        var isGraph = ($type(json) == 'array');
        var ans = new Graph(this.graphOptions);
        if(!isGraph) 
            //make tree
            (function (ans, json) {
                ans.addNode(json);
                for(var i=0, ch = json.children; i<ch.length; i++) {
                    ans.addAdjacence(json, ch[i]);
                    arguments.callee(ans, ch[i]);
                }
            })(ans, json);
        else
            //make graph
            (function (ans, json) {
                var getNode = function(id) {
                    for(var w=0; w<json.length; w++) { 
                      if(json[w].id == id) {
                        return json[w];
                      }
                    }
                    return undefined;
                };

                for(var i=0; i<json.length; i++) {
                    ans.addNode(json[i]);
                    for(var j=0, adj = json[i].adjacencies; j<adj.length; j++) {
                        var node = adj[j], data;
                        if(typeof adj[j] != 'string') {
                            data = node.data;
                            node = node.nodeTo;
                        }
                        ans.addAdjacence(json[i], getNode(node), data);
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
       - _data_ The data property contains a hash (i.e {}) where you can store all 
       the information you want about this node.
        
        Hash keys prefixed with a dollar sign (i.e $) have special meaning. I will detail those properties below.
      
        For JSON tree structures, there's an extra property _children_ of type Array which contains the node's children.
      
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
    this.graph = this.construct(json);
    if($type(json) != 'array'){
      this.root = json.id;
    } else {
      this.root = json[i? i : 0].id;
    }
  }
};

