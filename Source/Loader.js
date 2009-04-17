/*
 * File: Loader.js
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
   Object: Loader

   Provides the contruct method to create graph of tree objects from JSON data.
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
                    for(var w=0; w<json.length; w++) if(json[w].id == id) return json[w];
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
    
     Loads the JSON structure to the visualization. <http://blog.thejit.org/?p=7>
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

