function init(){
    var Log = {
        elem: false,
        write: function(text){
            if (!this.elem) 
                this.elem = document.getElementById('log');
            this.elem.innerHTML = text;
        }
    };
    
    var json = {
        "id": "347_0",
        "name": "Nine Inch Nails",
        "children": [{
            "id": "126510_1",
            "name": "Jerome Dillon",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "52163_2",
                "name": "Howlin' Maggie",
                "data": {
                    "band": "Jerome Dillon",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "324134_3",
                "name": "nearLY",
                "data": {
                    "band": "Jerome Dillon",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "173871_4",
            "name": "Charlie Clouser",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": []
        }, {
            "id": "235952_5",
            "name": "James Woolley",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": []
        }, {
            "id": "235951_6",
            "name": "Jeff Ward",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "2382_7",
                "name": "Ministry",
                "data": {
                    "band": "Jeff Ward",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "2415_8",
                "name": "Revolting Cocks",
                "data": {
                    "band": "Jeff Ward",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "3963_9",
                "name": "Pigface",
                "data": {
                    "band": "Jeff Ward",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "7848_10",
                "name": "Lard",
                "data": {
                    "band": "Jeff Ward",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "235950_11",
            "name": "Richard Patrick",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "1007_12",
                "name": "Filter",
                "data": {
                    "band": "Richard Patrick",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "327924_13",
                "name": "Army of Anyone",
                "data": {
                    "band": "Richard Patrick",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "2396_14",
            "name": "Trent Reznor",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "3963_15",
                "name": "Pigface",
                "data": {
                    "band": "Trent Reznor",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "32247_16",
                "name": "1000 Homo DJs",
                "data": {
                    "band": "Trent Reznor",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "83761_17",
                "name": "Option 30",
                "data": {
                    "band": "Trent Reznor",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "133257_18",
                "name": "Exotic Birds",
                "data": {
                    "band": "Trent Reznor",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "36352_19",
            "name": "Chris Vrenna",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "1013_20",
                "name": "Stabbing Westward",
                "data": {
                    "band": "Chris Vrenna",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "3963_21",
                "name": "Pigface",
                "data": {
                    "band": "Chris Vrenna",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "5752_22",
                "name": "Jack Off Jill",
                "data": {
                    "band": "Chris Vrenna",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "33602_23",
                "name": "Die Warzau",
                "data": {
                    "band": "Chris Vrenna",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "40485_24",
                "name": "tweaker",
                "data": {
                    "band": "Chris Vrenna",
                    "relation": "is person"
                },
                "children": []
            }, {
                "id": "133257_25",
                "name": "Exotic Birds",
                "data": {
                    "band": "Chris Vrenna",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "236021_26",
            "name": "Aaron North",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": []
        }, {
            "id": "236024_27",
            "name": "Jeordie White",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "909_28",
                "name": "A Perfect Circle",
                "data": {
                    "band": "Jeordie White",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "237377_29",
                "name": "Twiggy Ramirez",
                "data": {
                    "band": "Jeordie White",
                    "relation": "is person"
                },
                "children": []
            }]
        }, {
            "id": "235953_30",
            "name": "Robin Finck",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "1440_31",
                "name": "Guns N' Roses",
                "data": {
                    "band": "Robin Finck",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "235955_32",
            "name": "Danny Lohner",
            "data": {
                "band": "Nine Inch Nails",
                "relation": "member of band"
            },
            "children": [{
                "id": "909_33",
                "name": "A Perfect Circle",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "1695_34",
                "name": "Killing Joke",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "1938_35",
                "name": "Methods of Mayhem",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "5138_36",
                "name": "Skrew",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "53549_37",
                "name": "Angkor Wat",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "113510_38",
                "name": "Puscifer",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "113512_39",
                "name": "Renhold\u00ebr",
                "data": {
                    "band": "Danny Lohner",
                    "relation": "is person"
                },
                "children": []
            }]
        }],
        "data": []
    };
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    //Create a new canvas instance.
    var canvas = new Canvas('mycanvas', {
        'injectInto': 'infovis',
        'width': w,
        'height': h,
        'styles': {
            'fillStyle': '#ddd',
            'strokeStyle': '#ddd'
        }
    });
    var nodesCache = {};
    var ht = new Hypertree(canvas, {
    
        transition: Trans.linear,
        
        Node: {
            type: 'none',
            width: 30,
            height: 15,
            dim: 15,
            transform: true,
            color: '#f00'
        },
        
        Edge: {
            type: 'none',
            color: '#ff7',
            lineWidth: 3
        },
        
        onBeforeCompute: function(node){
            Log.write("centering");
        },
        
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function(){
                ht.onClick(node.id);
            };
        },
        
        //Take the left style property and substract half of the label actual width.
        onPlaceLabel: function(tag, node){
            var width = tag.offsetWidth;
            var intX = parseInt(tag.style.left);
            intX -= width / 2;
            tag.style.left = intX + 'px';
        },
        
        onAfterCompute: function(){
            Log.write("done");
            var node = Graph.Util.getClosestNodeToOrigin(ht.graph, "pos");
            Graph.Util.eachNode(ht.graph, function(n){
                var domNode = (n.id in nodesCache) ? nodesCache[n.id] : nodesCache[n.id] = document.getElementById(n.id);
                if (node.adjacentTo(n) || node.id == n.id) {
                    domNode.style.display = "";
                }
                else {
                    domNode.style.display = "none";
                }
            });
            
            var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
            html += "<ul>";
            Graph.Util.eachAdjacency(node, function(adj){
                var child = adj.nodeTo;
                if (child.data) {
                    var rel = (child.data.band == node.name) ? child.data.relation : node.data.relation;
                    html += "<li>" + child.name + " " + "<div class=\"relation\">(relation: " + rel + ")</div></li>";
                }
            });
            html += "</ul>";
            document.getElementById('inner-details').innerHTML = html;
        }
        
    });
    
    //load tree from tree data.
    ht.loadJSON(json);
    ht.refresh();
    
    ht.controller.onAfterCompute();
    
    //define custom options.
    var nodeOptions = [{
        type: 'none',
        dim: 7,
        color: '#bbd'
    }, {
        type: 'circle',
        dim: 7,
        color: '#bbd'
    }, {
        type: 'square',
        dim: 7,
        color: '#bbd'
    }, {
        type: 'rectangle',
        width: 7,
        height: 5,
        color: '#bbd'
    }, {
        type: 'triangle',
        dim: 7,
        color: '#bbd'
    }, {
        type: 'star',
        dim: 15,
        color: '#bbd'
    }];
    
    var edgeOptions = ['none', 'line', 'hyperline'];
    
    var transitions = ['linear', 'Quart', 'Circ', 'Sine', 'Bounce', 'Elastic', 'Back'];
    
    var nodeTypes = document.getElementById('nodeTypes'), 
        edgeTypes = document.getElementById('edgeTypes'), 
        transitions = document.getElementById('transitions'), 
        easing = document.getElementById('easing');
    
    nodeTypes.onchange = function(){
        var nodeOpt = nodeOptions[nodeTypes.selectedIndex];
        for (var prop in nodeOpt) {
            ht.config.Node[prop] = nodeOpt[prop];
        }
        ht.plot();
        ht.controller.onAfterCompute();
    };
    
    edgeTypes.onchange = function(){
        var edgeOpt = edgeOptions[edgeTypes.selectedIndex];
        ht.config.Edge.type = edgeOpt;
        ht.plot();
        ht.controller.onAfterCompute();
    };
    
    transitions.onchange = function(){
        var transition = transitions.options[transitions.selectedIndex].text;
        if (transition != "linear") {
            ht.config.transition = Trans[transition][easing.options[easing.selectedIndex].text];
        }
        else {
            ht.config.transition = Trans[transition];
        }
        
    };
    
    easing.onchange = function(){
        transitions.onchange();
    };
}
