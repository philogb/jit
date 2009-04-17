function init() {
    
            var infovis = document.getElementById('infovis');
            var w = infovis.offsetWidth, h = infovis.offsetHeight;
            var fStyle, sStyle, lineWidth;
             var json = [{"id":"node0","name":"node0 name","data": {"$dim": 16.759175934208628, "some other key": "some other value"},"adjacencies":[{"nodeTo":"node1","data":{"weight":3}},{"nodeTo":"node2","data":{"weight":3}},{"nodeTo":"node3","data":{"weight":3}},{"nodeTo":"node4","data":{"weight":1}},{"nodeTo":"node5","data":{"weight":1}}]},{"id":"node1","name":"node1 name","data": {"$dim": 13.077119090372014, "some other key": "some other value"},"adjacencies":[{"nodeTo":"node0","data":{"weight":3}},{"nodeTo":"node2","data":{"weight":1}},{"nodeTo":"node3","data":{"weight":3}},{"nodeTo":"node4","data":{"weight":1}},{"nodeTo":"node5","data":{"weight":1}}]},{"id":"node2","name":"node2 name","data": {"$dim": 24.937383149648717, "some other key": "some other value"},"adjacencies":[{"nodeTo":"node0","data":{"weight":3}},{"nodeTo":"node1","data":{"weight":1}},{"nodeTo":"node3","data":{"weight":3}},{"nodeTo":"node4","data":{"weight":3}},{"nodeTo":"node5","data":{"weight":1}}]},{"id":"node3","name":"node3 name","data": {"$dim": 10.53272740718869, "some other key": "some other value"},"adjacencies":[{"nodeTo":"node0","data":{"weight":3}},{"nodeTo":"node1","data":{"weight":3}},{"nodeTo":"node2","data":{"weight":3}},{"nodeTo":"node4","data":{"weight":1}},{"nodeTo":"node5","data":{"weight":3}}]},{"id":"node4","name":"node4 name","data": {"$dim": 1.3754347037767345, "some other key": "some other value"},"adjacencies":[{"nodeTo":"node0","data":{"weight":1}},{"nodeTo":"node1","data":{"weight":1}},{"nodeTo":"node2","data":{"weight":3}},{"nodeTo":"node3","data":{"weight":1}},{"nodeTo":"node5","data":{"weight":3}}]},{"id":"node5","name":"node5 name","data": {"$dim": 32.26403873194912, "some other key": "some other value"},"adjacencies":[{"nodeTo":"node0","data":{"weight":1}},{"nodeTo":"node1","data":{"weight":1}},{"nodeTo":"node2","data":{"weight":1}},{"nodeTo":"node3","data":{"weight":3}},{"nodeTo":"node4","data":{"weight":3}}]}];
              //Create a new canvas instance.
              var canvas = new Canvas('mycanvas', {
                  'injectInto':'infovis',
                'width': w,
                'height':h,
                'styles': {
                    'fillStyle': '#ccddee',
                    'strokeStyle': '#772277'
                },
                
                'backgroundCanvas': {
                    'styles': {
                        'fillStyle': '#444',
                        'strokeStyle': '#444'
                    },
                    
                    'impl': {
                        'init': function() {}    ,
                        'plot': function(canvas, ctx) {
                            var times = 6, d = 200;
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
                 interpolation : 'polar',
                 Node: {
                   'overridable': true 
                 },
                 Edge: {
                   'overridable': true  
                 },
                 
                 
                 transition:Trans.Elastic.easeOut,
                 fps : 40,
                 levelDistance: 200,
                 
                  onBeforePlotLine: function(adj) {
                    if(!adj.data.$lineWidth)
                    adj.data.$lineWidth = Math.random() * 5 + 1;
                },
                  
                  onBeforeCompute: function(node) {
                      Log.write("centering " + node.name + "...");
                      var _self = this;
                      var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
                      html += "<ul>";
                     Graph.Util.eachAdjacency(node, function(adj) {
                         var child = adj.nodeTo;
                         if(child.data) {
                             html += "<li>" + child.name+ "</li>";
                         }
                     });
                     html+= "</ul>";
                      document.getElementById('inner-details').innerHTML = html;
                  },
                  
              //Add a controller to assign the node's name to the created label.    
                  onCreateLabel: function(domElement, node) {
                      var d = $(domElement);
                      effectHash[node.id] = new Fx.Tween(d, {property:'opacity', duration:300, transition:Fx.Transitions.linear, wait:false});
                      d.setOpacity(0.6);
                      d.set('html', node.name).addEvents({
                          'mouseenter': function() {
                              effectHash[node.id].start(0.6, 1);
                          },
                          
                          'mouseleave': function() {
                              effectHash[node.id].start(1, 0.6);
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
            //         if(node._depth <= 1) {
                        domElement.innerHTML = node.name;
                        var left = parseInt(domElement.style.left);
                        domElement.style.width = '';
                        domElement.style.height = '';
                        var w = domElement.offsetWidth;
                        domElement.style.left = (left - w /2) + 'px';
            
            //        } 
                },
                
                onAfterCompute: function() {
                    Log.write("done");
                }
                  
              });
              var effectHash = {};
              
                
              //load weighted graph.
             rgraph.loadJSON(json, 1);
            
              //compute positions
              rgraph.compute();
              
              //make first plot
              rgraph.plot();
            
              rgraph.controller.onBeforeCompute(rgraph.graph.getNode(rgraph.root));
              rgraph.controller.onAfterCompute();
                
}