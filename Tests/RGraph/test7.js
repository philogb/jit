function init() {
    
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    var fStyle, sStyle, lineWidth;
  var effectHash = {};
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
      clickedNode: "",

      onBeforeCompute: function(node) {
          Log.write("centering " + node.name + "...");
          this.clickedNode = node.name;
      },
      
      requestGraph: function() {
          var module = this.clickedNode;
          Log.write("requesting info...")
          var jsonRequest = new Request.JSON({
              'url': '/service/apt-dependencies/graph/' + encodeURIComponent(module) + '/',
              onSuccess: function(json) {
                  Log.write("morphing...");
                  rgraph.op.morph(json, {
                      'id': module,
                      'type': 'fade',
                      'duration':2000,
                      onComplete: function() {
                          Log.write("morph complete!");
                      },
                      
                      onAfterCompute: function() {}    ,
                      onBeforeCompute: function() {}    
                  });
              },
              onFailure: function() {
                  Log.write("sorry, the request failed");
              }
          }).get();
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
          
          d.setOpacity(0.6).set('html', node.name).addEvents({
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
//        domElement.innerHTML = '';
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
        this.requestGraph();
    }
  });
  
  new Request.JSON({
      'url':'/service/apt-dependencies/graph/erlang/',
      onSuccess: function(json) {
          //load weighted graph.
         rgraph.loadJSON(json);
          //compute positions
          rgraph.compute();
          //make first plot
          rgraph.plot();
      },
      
      onFailure: function() {
          Log.write("failed!");
      }
  }).get();


}