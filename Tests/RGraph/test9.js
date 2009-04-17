function init() {
            
            var infovis = document.getElementById('infovis');
            var w = infovis.offsetWidth, h = infovis.offsetHeight;
            var fStyle, sStyle, lineWidth;
            var hoveredNode = false;
            
            var json= {"id":"190_0","name":"Pearl Jam","children":[{"id":"306208_1","name":"Pearl Jam &amp; Cypress Hill","data": { "band": "Pearl Jam", "relation": "collaboration" },"children":[{"id":"84_2","name":"Cypress Hill","data": { "band": "Pearl Jam &amp; Cypress Hill", "relation": "collaboration" },"children":[]}]},{"id":"107877_3","name":"Neil Young &amp; Pearl Jam","data": { "band": "Pearl Jam", "relation": "collaboration" },"children":[{"id":"964_4","name":"Neil Young","data": { "band": "Neil Young &amp; Pearl Jam", "relation": "collaboration" },"children":[]}]},{"id":"236797_5","name":"Jeff Ament","data": { "band": "Pearl Jam", "relation": "member of band" },"children":[{"id":"1756_6","name":"Temple of the Dog","data": { "band": "Jeff Ament", "relation": "member of band" },"children":[]},{"id":"14581_7","name":"Mother Love Bone","data": { "band": "Jeff Ament", "relation": "member of band" },"children":[]},{"id":"50188_8","name":"Green River","data": { "band": "Jeff Ament", "relation": "member of band" },"children":[]},{"id":"65452_9","name":"M.A.C.C.","data": { "band": "Jeff Ament", "relation": "collaboration" },"children":[]},{"id":"115632_10","name":"Three Fish","data": { "band": "Jeff Ament", "relation": "member of band" },"children":[]},{"id":"346850_11","name":"Gossman Project","data": { "band": "Jeff Ament", "relation": "member of band" },"children":[]}]},{"id":"41529_12","name":"Stone Gossard","data": { "band": "Pearl Jam", "relation": "member of band" },"children":[{"id":"1756_13","name":"Temple of the Dog","data": { "band": "Stone Gossard", "relation": "member of band" },"children":[]},{"id":"14581_14","name":"Mother Love Bone","data": { "band": "Stone Gossard", "relation": "member of band" },"children":[]},{"id":"24119_15","name":"Brad","data": { "band": "Stone Gossard", "relation": "member of band" },"children":[]},{"id":"50188_16","name":"Green River","data": { "band": "Stone Gossard", "relation": "member of band" },"children":[]},{"id":"346850_17","name":"Gossman Project","data": { "band": "Stone Gossard", "relation": "member of band" },"children":[]}]},{"id":"131161_18","name":"Eddie Vedder","data": { "band": "Pearl Jam", "relation": "member of band" },"children":[{"id":"1756_19","name":"Temple of the Dog","data": { "band": "Eddie Vedder", "relation": "member of band" },"children":[]},{"id":"72007_20","name":"Eddie Vedder &amp; Zeke","data": { "band": "Eddie Vedder", "relation": "collaboration" },"children":[]},{"id":"236657_21","name":"Bad Radio","data": { "band": "Eddie Vedder", "relation": "member of band" },"children":[]},{"id":"432176_22","name":"Beck &amp; Eddie Vedder","data": { "band": "Eddie Vedder", "relation": "collaboration" },"children":[]}]},{"id":"236583_23","name":"Mike McCready","data": { "band": "Pearl Jam", "relation": "member of band" },"children":[{"id":"1744_24","name":"Mad Season","data": { "band": "Mike McCready", "relation": "member of band" },"children":[]},{"id":"1756_25","name":"Temple of the Dog","data": { "band": "Mike McCready", "relation": "member of band" },"children":[]},{"id":"43661_26","name":"$10,000 Gold Chain","data": { "band": "Mike McCready", "relation": "collaboration" },"children":[]},{"id":"65452_27","name":"M.A.C.C.","data": { "band": "Mike McCready", "relation": "collaboration" },"children":[]},{"id":"153766_28","name":"The Rockfords","data": { "band": "Mike McCready", "relation": "member of band" },"children":[]},{"id":"346850_29","name":"Gossman Project","data": { "band": "Mike McCready", "relation": "member of band" },"children":[]}]},{"id":"236585_30","name":"Matt Cameron","data": { "band": "Pearl Jam", "relation": "member of band" },"children":[{"id":"1111_31","name":"Soundgarden","data": { "band": "Matt Cameron", "relation": "member of band" },"children":[]},{"id":"1756_32","name":"Temple of the Dog","data": { "band": "Matt Cameron", "relation": "member of band" },"children":[]},{"id":"9570_33","name":"Eleven","data": { "band": "Matt Cameron", "relation": "supporting musician" },"children":[]},{"id":"11783_34","name":"Queens of the Stone Age","data": { "band": "Matt Cameron", "relation": "member of band" },"children":[]},{"id":"61972_35","name":"Wellwater Conspiracy","data": { "band": "Matt Cameron", "relation": "member of band" },"children":[]},{"id":"65452_36","name":"M.A.C.C.","data": { "band": "Matt Cameron", "relation": "collaboration" },"children":[]},{"id":"353097_37","name":"Tone Dogs","data": { "band": "Matt Cameron", "relation": "member of band" },"children":[]}]},{"id":"236594_38","name":"Dave Krusen","data": { "band": "Pearl Jam", "relation": "member of band" },"children":[{"id":"2092_39","name":"Candlebox","data": { "band": "Dave Krusen", "relation": "member of band" },"children":[]}]},{"id":"236022_40","name":"Matt Chamberlain","data": { "band": "Pearl Jam", "relation": "member of band" },"children":[{"id":"54761_41","name":"Critters Buggin","data": { "band": "Matt Chamberlain", "relation": "member of band" },"children":[]},{"id":"92043_42","name":"Edie Brickell and New Bohemians","data": { "band": "Matt Chamberlain", "relation": "member of band" },"children":[]}]},{"id":"236611_43","name":"Dave Abbruzzese","data": { "band": "Pearl Jam", "relation": "member of band" },"children":[{"id":"276933_44","name":"Green Romance Orchestra","data": { "band": "Dave Abbruzzese", "relation": "member of band" },"children":[]}]},{"id":"236612_45","name":"Jack Irons","data": { "band": "Pearl Jam", "relation": "member of band" },"children":[{"id":"4619_46","name":"Redd Kross","data": { "band": "Jack Irons", "relation": "member of band" },"children":[]},{"id":"9570_47","name":"Eleven","data": { "band": "Jack Irons", "relation": "member of band" },"children":[]},{"id":"12389_48","name":"Red Hot Chili Peppers","data": { "band": "Jack Irons", "relation": "member of band" },"children":[]},{"id":"114288_49","name":"Anthym","data": { "band": "Jack Irons", "relation": "member of band" },"children":[]},{"id":"240013_50","name":"What Is This?","data": { "band": "Jack Irons", "relation": "member of band" },"children":[]}]}],"data":[]};//{"id":"node02","name":"0.2","data":[{"key":"key1","value":8},{"key":"key2","value":-88}],"children":[{"id":"node13","name":"1.3","data":[{"key":"key1","value":8},{"key":"key2","value":74}],"children":[{"id":"node24","name":"2.4","data":[{"key":"key1","value":10},{"key":"key2","value":55}],"children":[]},{"id":"node25","name":"2.5","data":[{"key":"key1","value":8},{"key":"key2","value":67}],"children":[]},{"id":"node26","name":"2.6","data":[{"key":"key1","value":5},{"key":"key2","value":-50}],"children":[]},{"id":"node27","name":"2.7","data":[{"key":"key1","value":8},{"key":"key2","value":10}],"children":[]},{"id":"node28","name":"2.8","data":[{"key":"key1","value":2},{"key":"key2","value":-69}],"children":[]},{"id":"node29","name":"2.9","data":[{"key":"key1","value":3},{"key":"key2","value":98}],"children":[]},{"id":"node210","name":"2.10","data":[{"key":"key1","value":6},{"key":"key2","value":12}],"children":[]},{"id":"node211","name":"2.11","data":[{"key":"key1","value":2},{"key":"key2","value":-95}],"children":[]}]},{"id":"node112","name":"1.12","data":[{"key":"key1","value":1},{"key":"key2","value":96}],"children":[{"id":"node213","name":"2.13","data":[{"key":"key1","value":6},{"key":"key2","value":-58}],"children":[]},{"id":"node214","name":"2.14","data":[{"key":"key1","value":9},{"key":"key2","value":-42}],"children":[]},{"id":"node215","name":"2.15","data":[{"key":"key1","value":10},{"key":"key2","value":92}],"children":[]},{"id":"node216","name":"2.16","data":[{"key":"key1","value":7},{"key":"key2","value":-15}],"children":[]},{"id":"node217","name":"2.17","data":[{"key":"key1","value":3},{"key":"key2","value":29}],"children":[]},{"id":"node218","name":"2.18","data":[{"key":"key1","value":8},{"key":"key2","value":-59}],"children":[]},{"id":"node219","name":"2.19","data":[{"key":"key1","value":3},{"key":"key2","value":21}],"children":[]},{"id":"node220","name":"2.20","data":[{"key":"key1","value":2},{"key":"key2","value":78}],"children":[]}]},{"id":"node121","name":"1.21","data":[{"key":"key1","value":3},{"key":"key2","value":53}],"children":[{"id":"node222","name":"2.22","data":[{"key":"key1","value":5},{"key":"key2","value":10}],"children":[]},{"id":"node223","name":"2.23","data":[{"key":"key1","value":10},{"key":"key2","value":21}],"children":[]},{"id":"node224","name":"2.24","data":[{"key":"key1","value":6},{"key":"key2","value":-32}],"children":[]},{"id":"node225","name":"2.25","data":[{"key":"key1","value":5},{"key":"key2","value":-42}],"children":[]},{"id":"node226","name":"2.26","data":[{"key":"key1","value":2},{"key":"key2","value":75}],"children":[]},{"id":"node227","name":"2.27","data":[{"key":"key1","value":1},{"key":"key2","value":-74}],"children":[]},{"id":"node228","name":"2.28","data":[{"key":"key1","value":2},{"key":"key2","value":52}],"children":[]},{"id":"node229","name":"2.29","data":[{"key":"key1","value":10},{"key":"key2","value":-49}],"children":[]}]},{"id":"node130","name":"1.30","data":[{"key":"key1","value":9},{"key":"key2","value":-29}],"children":[{"id":"node231","name":"2.31","data":[{"key":"key1","value":6},{"key":"key2","value":-23}],"children":[]},{"id":"node232","name":"2.32","data":[{"key":"key1","value":10},{"key":"key2","value":19}],"children":[]},{"id":"node233","name":"2.33","data":[{"key":"key1","value":1},{"key":"key2","value":92}],"children":[]}]},{"id":"node134","name":"1.34","data":[{"key":"key1","value":9},{"key":"key2","value":71}],"children":[{"id":"node235","name":"2.35","data":[{"key":"key1","value":5},{"key":"key2","value":-65}],"children":[]}]},{"id":"node136","name":"1.36","data":[{"key":"key1","value":3},{"key":"key2","value":-11}],"children":[{"id":"node237","name":"2.37","data":[{"key":"key1","value":6},{"key":"key2","value":-85}],"children":[]},{"id":"node238","name":"2.38","data":[{"key":"key1","value":3},{"key":"key2","value":-13}],"children":[]},{"id":"node239","name":"2.39","data":[{"key":"key1","value":1},{"key":"key2","value":80}],"children":[]},{"id":"node240","name":"2.40","data":[{"key":"key1","value":10},{"key":"key2","value":-69}],"children":[]}]},{"id":"node141","name":"1.41","data":[{"key":"key1","value":10},{"key":"key2","value":-4}],"children":[{"id":"node242","name":"2.42","data":[{"key":"key1","value":8},{"key":"key2","value":-27}],"children":[]},{"id":"node243","name":"2.43","data":[{"key":"key1","value":9},{"key":"key2","value":-44}],"children":[]},{"id":"node244","name":"2.44","data":[{"key":"key1","value":9},{"key":"key2","value":24}],"children":[]},{"id":"node245","name":"2.45","data":[{"key":"key1","value":8},{"key":"key2","value":-66}],"children":[]}]}]};
              //Create a new canvas instance.
              var canvas = new Canvas('mycanvas', {
                'injectInto':'infovis',
                'width': w,
                'height':h,
                'styles': {
                    'fillStyle': '#fefefe',
                    'strokeStyle': '#ccb'
                },
                
                'backgroundCanvas': {
                    'styles': {
                        'fillStyle': '#fafafa',
                        'strokeStyle': '#444'
                    },
                    
                    'impl': {
                        'init': function() {}    ,
                        'plot': function(canvas, ctx) {
                            var times = 6, d = 100;
                            var pi2 = Math.PI*2;
                            for(var i=1; i<=times; i++) {
                                ctx.beginPath();
                                ctx.arc(0, 0, i * d, 0, pi2, true);
                                ctx.stroke();
                                ctx.closePath();
                            }
                        }
                    }
                }   
              });
              rgraph= new RGraph(canvas,  {
                interpolation: "polar",
                normalizeDiameters: false,
                duration: 2000,
                transition: Trans.linear,
                fps: 30,
                
                Node: {
                    type: 'none',
                    dim: 7,
                    color:'#fefefe'
                    
                },
                
                Edge: {
                    type: 'none',
                    overridable: true,
                    dim: 4,
                    width:3,
                    color:'#772266'
                },
                
                onBeforeCompute: function(node) {
                    Log.write("centering " + node.name + "...");
                    var _self = this;
                    var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
                    html += "<ul>";
                    Graph.Util.eachAdjacency(node, function(adj) {
                        var child = adj.nodeTo;
                        if(child.data) {
                            var rel = (child.data.band == node.name)? child.data.relation : node.data.relation;
                            html += "<li>" + child.name + " " + "<div class=\"relation\">(relation: " + rel + ")</div></li>";
                        }
                    });
                    html+= "</ul>";
                    document.getElementById('inner-details').innerHTML = html;
                },
                
              //Add a controller to assign the node's name to the created label.    
                onCreateLabel: function(domElement, node) {
                    var d = $(domElement);
                    effectHash[node.id] = new Fx.Tween(d, {
                        property:'opacity', 
                        duration:300, 
                        transition:Fx.Transitions.linear, 
                        wait:false
                    });
                    
                    d.setOpacity(0.6);
                    d.set('html', node.name).addEvents({
                        'mouseenter': function() {
                            hoveredNode = node.id;
                            effectHash[node.id].start(0.6, 1);
                            rgraph.fx.plot();
                        },
                        
                        'mouseleave': function() {
                            hoveredNode = false;
                            effectHash[node.id].start(1, 0.6);
                            rgraph.fx.plot();
                        },
                        
                        'click': function() {
                            rgraph.onClick(d.id);
                        }
                    });
                },
                
                //Take off previous width and height styles and
                //add half of the *actual* label width to the left position
                // That will center your label (do the math man). 
                onPlaceLabel: function(domElement, node) {
                    domElement.innerHTML = '';
                     if(node._depth <= 1) {
                        domElement.innerHTML = node.name;
                        var left = parseInt(domElement.style.left);
                        domElement.style.width = '';
                        domElement.style.height = '';
                        var w = domElement.offsetWidth;
                        domElement.style.left = (left - w /2) + 'px';
                        domElement.style.backgroundColor = '';
            
                    } else {
                        domElement.style.width = '5px';
                        domElement.style.height = '5px';
                        var left = parseInt(domElement.style.left);
                        var top = parseInt(domElement.style.top);
                        domElement.style.left = (left - 5 /2) + 'px';
                        domElement.style.top = (top - 5 /2) + 'px';
                        domElement.style.backgroundColor = 'transparent';
                    }
                },
                
                onAfterCompute: function() {
                    Log.write("done");
                }
              });
              var effectHash = {};
              
                
              //load tree from tree data.
              rgraph.loadJSON(json);
              rgraph.refresh();
                          
              rgraph.controller.onBeforeCompute(Graph.Util.getNode(rgraph.graph, rgraph.root));
              rgraph.controller.onAfterCompute();
                              
    
              
              //define custom options.
              var nodeOptions = [
              {
                type: 'none',
                dim: 7,
                color:'#fefefe'
              },
              {
                type: 'circle',
                dim: 7,
                color:'#fefefe'
              },
              {
                type: 'square',
                dim: 7,
                color:'#fefefe'
              },
              {
                type: 'rectangle',
                width: 7,
                height: 5,
                color:'#fefefe'
              },
              {
                type: 'triangle',
                dim: 7,
                color:'#fefefe'
              },
              {
                type: 'star',
                dim: 15,
                color:'#fefefe'
              }];
              
              var edgeOptions = ['none', 'line', 'arrow'];
              
              var transitions = ['linear', 'Quart', 'Circ', 'Sine', 'Bounce', 'Elastic', 'Back'];
              
              var nodeTypes = document.getElementById('nodeTypes'), edgeTypes = document.getElementById('edgeTypes'), transitions = document.getElementById('transitions'), easing = document.getElementById('easing');
              
              nodeTypes.addEvent('change', function() {
                  var nodeOpt = nodeOptions[nodeTypes.selectedIndex];
                  for(var prop in nodeOpt) {
                      rgraph.config.Node[prop] = nodeOpt[prop];
                  }
                  rgraph.plot();
              });
              edgeTypes.addEvent('change', function() {
                  var edgeOpt = edgeOptions[edgeTypes.selectedIndex];
                  rgraph.config.Edge.type = edgeOpt;
                  rgraph.plot();
              });
              transitions.addEvent('change', function() {
                  var transition = transitions.options[transitions.selectedIndex].text;
                  if(transition != "linear") {
                      rgraph.config.transition = Trans[transition][easing.options[easing.selectedIndex].text];
                  } else {
                      rgraph.config.transition = Trans[transition];
                  }
              });
              easing.addEvent('change', function() {
                  transitions.fireEvent('change');
              })  ;            
              document.getElementById('options').style.display = '';
}