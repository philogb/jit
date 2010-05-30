function init(){
    //init data    
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
    
    var graph = '[{id:"190_0", adjacencies:["node0"]}, {id:"node0", name:"node0 name", data:{$dim:8.660354683365695, "some other key":"some other value"}, adjacencies:["node1", "node2", "node3", "node4", "node5"]}, {id:"node1", name:"node1 name", data:{$dim:21.118129724156983, "some other key":"some other value"}, adjacencies:["node0", "node2", "node3", "node4", "node5"]}, {id:"node2", name:"node2 name", data:{$dim:6.688951018413683, "some other key":"some other value"}, adjacencies:["node0", "node1", "node3", "node4", "node5"]}, {id:"node3", name:"node3 name", data:{$dim:19.78771599710248, "some other key":"some other value"}, adjacencies:["node0", "node1", "node2", "node4", "node5"]}, {id:"node4", name:"node4 name", data:{$dim:3.025781742947326, "some other key":"some other value"}, adjacencies:["node0", "node1", "node2", "node3", "node5"]}, {id:"node5", name:"node5 name", data:{$dim:9.654383829711456, "some other key":"some other value"}, adjacencies:["node0", "node1", "node2", "node3", "node4"]}, {id:"4619_46", adjacencies:["190_0"]}, {id:"236585_30", adjacencies:["190_0"]}, {id:"131161_18", adjacencies:["190_0"]}, {id:"41529_12", adjacencies:["190_0"]}]';
    //end
    
    //init ForceDirected
    var fd = new $jit.ForceDirected({
        'injectInto': 'infovis',
        //Set Edge and Node colors.
        Node: {
            color: '#ccddee',
            overridable:true
        },

        Edge: {
            lineWidth: 2,
            color:'#23A4FF',
            overridable:true
        },
        iterations: 100,
        levelDistance: 70,
        transition: $jit.Trans.Quart.easeOut,
        NodeStyles: {
          enable: true,
          stylesHover: {
            'color': '#faa',
            'dim': 7
          }
        },
        //Add the node's name into the label
        //This method is called only once, on label creation.
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
        },

        //Change the node's style based on its position.
        //This method is called each time a label is rendered/positioned
        //during an animation.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';
            style.fontSize = "0.8em";
            style.color = "#ccc";
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    //load JSON data.
    fd.loadJSON(json);
    
    //add some extra edges to the tree
    //to make it a graph (just for fun)
    fd.graph.addAdjacence({
        'id': '236585_30'
    }, {
        'id': '236583_23'
    }, null);
    fd.graph.addAdjacence({
        'id': '236585_30'
    }, {
        'id': '4619_46'
    }, null);
    
    //Compute positions and plot
    //compute positions incrementally and animate.
    fd.computeIncremental({
      iter: 20,
      property: 'end',
      onStep: function(perc) {
        Log.write(perc + '% loaded...');
      },
      onComplete: function() {
        Log.write('done');
       fd.animate();
       fd.config.iterations = 20;
      }
    });
    //end
    
    //Global Options
    //Define a function that returns the selected duration
    function getDuration() {
        var sduration = document.getElementById('select-duration');
        var sdindex = sduration.selectedIndex;
        return parseInt(sduration.options[sdindex].text);
    };
    //Define a function that returns the selected fps
    function getFPS() {
        var fpstype = document.getElementById('select-fps');
        var fpsindex = fpstype.selectedIndex;
        return parseInt(fpstype.options[fpsindex].text);
    };
    //Define a function that returns whether you have to
    //hide labels during the animation or not.
    function hideLabels() {
        return document.getElementById('hide-labels').checked;
    };
    
    //init handlers
    //Add event handlers to the right column controls.
 
    //Remove Nodes
    var button = document.getElementById('remove-nodes');
    button.onclick = function() {
        //get animation type.
        var stype = document.getElementById('select-type-remove-nodes');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //get node ids to be removed.
        var subnodes = fd.graph.getNode('236797_5').getSubnodes(0);
        var map = [];
        for (var i = 0; i < subnodes.length; i++) {
            map.push(subnodes[i].id);
        }
        //perform node-removing animation.
        fd.op.removeNode(map.reverse(), {
            type: type,
            duration: getDuration(),
            fps: getFPS(),
            hideLabels:hideLabels()
        });
    };

    //Remove edges
    button = document.getElementById('remove-edges');
    button.onclick = function() {
        //get animation type.
        var stype = document.getElementById('select-type-remove-edges');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //perform edge removing animation.
        fd.op.removeEdge([['236585_30', "190_0"], ['236585_30', '4619_46']], {
            type: type,
            duration: getDuration(),
            fps: getFPS(),
            hideLabels: hideLabels()
        });
    };

    //Add a Graph (Sum)
    button = document.getElementById('sum');
    button.onclick = function(){
        //get graph to add.
        var trueGraph = eval('(' + graph + ')');        
        //get animation type.
        var stype = document.getElementById('select-type-sum');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //perform sum animation.
        fd.op.sum(trueGraph, {
            type: type,
            fps: getFPS(),
            duration: getDuration(),
            hideLabels: hideLabels(),
            onComplete: function(){
                Log.write("sum complete!");
            }
        });
    };

    //Morph
    button = document.getElementById('morph');
    button.onclick = function(){
        //get graph to morph to.
        var trueGraph = eval('(' + graph + ')');        
        //get animation type.
        var stype = document.getElementById('select-type-morph');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //perform morphing animation.
        fd.op.morph(trueGraph, {
            type: type,
            fps: getFPS(),
            duration: getDuration(),
            hideLabels: hideLabels(),
            onComplete: function(){
                Log.write("morph complete!");
            }
        });
    };
    //end
}
