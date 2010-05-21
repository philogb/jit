function init(){
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    var json = {
        "id": "190_0",
        "name": "Pearl Jam",
        "children": [{
            "id": "306208_1",
            "name": "Pearl Jam &amp; Cypress Hill",
            "data": {
                "band": "Pearl Jam",
                "relation": "collaboration"
            },
            "children": [{
                "id": "84_2",
                "name": "Cypress Hill",
                "data": {
                    "band": "Pearl Jam &amp; Cypress Hill",
                    "relation": "collaboration"
                },
                "children": []
            }]
        }, {
            "id": "107877_3",
            "name": "Neil Young &amp; Pearl Jam",
            "data": {
                "band": "Pearl Jam",
                "relation": "collaboration"
            },
            "children": [{
                "id": "964_4",
                "name": "Neil Young",
                "data": {
                    "band": "Neil Young &amp; Pearl Jam",
                    "relation": "collaboration"
                },
                "children": []
            }]
        }, {
            "id": "236797_5",
            "name": "Jeff Ament",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "1756_6",
                "name": "Temple of the Dog",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "14581_7",
                "name": "Mother Love Bone",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "50188_8",
                "name": "Green River",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "65452_9",
                "name": "M.A.C.C.",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "collaboration"
                },
                "children": []
            }, {
                "id": "115632_10",
                "name": "Three Fish",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "346850_11",
                "name": "Gossman Project",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "41529_12",
            "name": "Stone Gossard",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "1756_13",
                "name": "Temple of the Dog",
                "data": {
                    "band": "Stone Gossard",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "14581_14",
                "name": "Mother Love Bone",
                "data": {
                    "band": "Stone Gossard",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "24119_15",
                "name": "Brad",
                "data": {
                    "band": "Stone Gossard",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "50188_16",
                "name": "Green River",
                "data": {
                    "band": "Stone Gossard",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "346850_17",
                "name": "Gossman Project",
                "data": {
                    "band": "Stone Gossard",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "131161_18",
            "name": "Eddie Vedder",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "1756_19",
                "name": "Temple of the Dog",
                "data": {
                    "band": "Eddie Vedder",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "72007_20",
                "name": "Eddie Vedder &amp; Zeke",
                "data": {
                    "band": "Eddie Vedder",
                    "relation": "collaboration"
                },
                "children": []
            }, {
                "id": "236657_21",
                "name": "Bad Radio",
                "data": {
                    "band": "Eddie Vedder",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "432176_22",
                "name": "Beck &amp; Eddie Vedder",
                "data": {
                    "band": "Eddie Vedder",
                    "relation": "collaboration"
                },
                "children": []
            }]
        }, {
            "id": "236583_23",
            "name": "Mike McCready",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "1744_24",
                "name": "Mad Season",
                "data": {
                    "band": "Mike McCready",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "1756_25",
                "name": "Temple of the Dog",
                "data": {
                    "band": "Mike McCready",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "43661_26",
                "name": "$10,000 Gold Chain",
                "data": {
                    "band": "Mike McCready",
                    "relation": "collaboration"
                },
                "children": []
            }, {
                "id": "65452_27",
                "name": "M.A.C.C.",
                "data": {
                    "band": "Mike McCready",
                    "relation": "collaboration"
                },
                "children": []
            }, {
                "id": "153766_28",
                "name": "The Rockfords",
                "data": {
                    "band": "Mike McCready",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "346850_29",
                "name": "Gossman Project",
                "data": {
                    "band": "Mike McCready",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "236585_30",
            "name": "Matt Cameron",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "1111_31",
                "name": "Soundgarden",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "1756_32",
                "name": "Temple of the Dog",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "9570_33",
                "name": "Eleven",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "supporting musician"
                },
                "children": []
            }, {
                "id": "11783_34",
                "name": "Queens of the Stone Age",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "61972_35",
                "name": "Wellwater Conspiracy",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "65452_36",
                "name": "M.A.C.C.",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "collaboration"
                },
                "children": []
            }, {
                "id": "353097_37",
                "name": "Tone Dogs",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "236594_38",
            "name": "Dave Krusen",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "2092_39",
                "name": "Candlebox",
                "data": {
                    "band": "Dave Krusen",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "236022_40",
            "name": "Matt Chamberlain",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "54761_41",
                "name": "Critters Buggin",
                "data": {
                    "band": "Matt Chamberlain",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "92043_42",
                "name": "Edie Brickell and New Bohemians",
                "data": {
                    "band": "Matt Chamberlain",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "236611_43",
            "name": "Dave Abbruzzese",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "276933_44",
                "name": "Green Romance Orchestra",
                "data": {
                    "band": "Dave Abbruzzese",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "236612_45",
            "name": "Jack Irons",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "4619_46",
                "name": "Redd Kross",
                "data": {
                    "band": "Jack Irons",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "9570_47",
                "name": "Eleven",
                "data": {
                    "band": "Jack Irons",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "12389_48",
                "name": "Red Hot Chili Peppers",
                "data": {
                    "band": "Jack Irons",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "114288_49",
                "name": "Anthym",
                "data": {
                    "band": "Jack Irons",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "240013_50",
                "name": "What Is This?",
                "data": {
                    "band": "Jack Irons",
                    "relation": "member of band"
                },
                "children": []
            }]
        }],
        "data": []
    };
    $jit();
    rgraph = new RGraph({
        interpolation: "linear",
        levelDistance: 100,
        'injectInto': 'infovis',
        'width': w,
        'height': h,
        'background': {
          'CanvasStyles': {
            'strokeStyle': '#555',
            'shadowBlur': 50,
            'shadowColor': '#ccc'
          }
        },
        Node: {
          overridable: true
        },
        Edge: {
          overridable: true
        },
        
        onBeforeCompute: function(node){
            Log.write("centering " + node.name + "...");
            var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
            html += "<ul>";
            $jit.Graph.Util.eachAdjacency(node, function(adj){
                var child = adj.nodeTo;
                if (child.data && child.data.length > 0) {
                    var rel = (child.data.band == node.name) ? child.data.relation : node.data.relation;
                    html += "<li>" + child.name + " " + "<div class=\"relation\">(relation: " + rel + ")</div></li>";
                }
            });
            html += "</ul>";
            document.getElementById('inner-details').innerHTML = html;
        },
        
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function () {
                rgraph.onClick(node.id);
            };
        },
        
        //Take off previous width and height styles and
        //add half of the *actual* label width to the left position
        // That will center your label (do the math man). 
        onPlaceLabel: function(domElement, node){
            domElement.innerHTML = '';
            if (node._depth <= 1) {
                domElement.innerHTML = node.name;
                var left = parseInt(domElement.style.left);
                domElement.style.width = '';
                domElement.style.height = '';
                var w = domElement.offsetWidth;
                domElement.style.left = (left - w / 2) + 'px';
                
            }
        },
        
        onAfterCompute: function(){
            Log.write("done");
        }
        
    });
    var effectHash = {};
    //load tree from tree data.
    rgraph.loadJSON(json);
    rgraph.graph.addAdjacence({
        'id': '236585_30'
    }, {
        'id': '236583_23'
    }, null);
    rgraph.graph.addAdjacence({
        'id': '236585_30'
    }, {
        'id': '4619_46'
    }, null);
    
    //compute positions
    rgraph.compute();
    
    //make first plot
    rgraph.plot();
    
    rgraph.controller.onBeforeCompute(rgraph.graph.getNode(rgraph.root));
    rgraph.controller.onAfterCompute();
    
    var button = document.getElementById('morph');
    button.onclick = function(){
        g = GraphGenerator.makeGraph();        
        var stype = document.getElementById('select-type');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        
        var fpstype = document.getElementById('select-fps');
        var fpsindex = fpstype.selectedIndex;
        var fps = parseInt(fpstype.options[fpsindex].text);
        
        var hideLabels = !!document.getElementById('hide-labels').checked;

        var sduration = document.getElementById('select-duration');
        var sdindex = sduration.selectedIndex;
        var duration = parseInt(sduration.options[sdindex].text);
        var pearlJamNode = {
            'id': '190_0',
            'adjacencies': [g[0].id]
        };
        g.unshift(pearlJamNode);
        var pearlJamNode2 = {
            'id': '4619_46',
            'adjacencies': [g[0].id]
        };
        var pearlJamNode3 = {
            'id': '236585_30',
            'adjacencies': [g[0].id]
        };
        var pearlJamNode4 = {
            'id': '131161_18',
            'adjacencies': [g[0].id]
        };
        var pearlJamNode5 = {
            'id': "41529_12", //"346850_11",
            'adjacencies': [g[0].id]
        };
        g.push(pearlJamNode2);
        g.push(pearlJamNode3);
        g.push(pearlJamNode4);
        g.push(pearlJamNode5);
        rgraph.op.morph(g, {
            'id': '41529_12',
            type: type,
            fps: fps,
            duration: duration,
            hideLabels: hideLabels,
            onComplete: function(){
                Log.write("morph complete!");
            }
        });
    };
}
