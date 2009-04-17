function init() {
    
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    var fStyle, sStyle, lineWidth;

    var elem = new Element('div', {
        'id':'description'
    }).inject($('inner-details'));

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
      Node: {
      color: '#ccddee',
      dim: 4  
    },
    
    Edge: {
        color: '#772277'
    },
    
    clickedNodeId: "",
      clickedNodeName: "",

      onBeforeCompute: function(node) {
          Log.write("centering " + node.name + "...");
          this.clickedNodeId = node.id;
          this.clickedNodeName = node.name;
      },
      
      preprocessTree: function(json) {
          var ch = json.children;
          var getNode = function(nodeName) {
              for(var i=0; i<ch.length; i++) {
                  if(ch[i].name == nodeName) return ch[i];
              }
              return false;
          };
          json.id = rgraph.root;
          Graph.Util.eachAdjacency(rgraph.graph.getNode(rgraph.root), function(elem) {
              var nodeTo = elem.nodeTo, jsonNode = getNode(nodeTo.name);
              if(jsonNode) jsonNode.id = nodeTo.id;
          });
      },
      
      getDescription: function() {
          var that = this;
          Log.write("getting description...");
          new Request({
              'method':'get',
              'url':'/service/description/' + encodeURIComponent(this.clickedNodeName) + '/',
              onFailure: function() {
                  Log.write("Error getting description!");
              },
              
              onSuccess: function(text) {
                  document.getElementById('description').set('html', "<b>"+that.clickedNodeName + "</b><br /><br />" + text);
                  Log.write("done");
              }
          }).send();
      },
      
      requestGraph: function() {
          var that = this, id = this.clickedNodeId;
          Log.write("requesting info...")
          var jsonRequest = new Request.JSON({
              'url': '/service/apt-dependencies/tree/' + encodeURIComponent(this.clickedNodeName) + '/',
              onSuccess: function(json) {
                  Log.write("morphing...");
                  that.preprocessTree(json);
                  rgraph.op.morph(json, {
                      'id': id,
                      'type': 'fade',
                      'duration':2000,
                      hideLabels:true,
                      onComplete: function() {
                          that.getDescription();                          
                      },
                      
                      onAfterCompute: $lambda(),
                      onBeforeCompute: $lambda()
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
          d.setOpacity(0.6).set('html', node.name).addEvents({
              'mouseenter': function() {
                  d.setOpacity(1);
              },
              
              'mouseleave': function() {
                  d.setOpacity(0.6);
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
        domElement.style.display = "none";
         if(node._depth <= 1) {
            domElement.innerHTML = node.name;
            domElement.style.display = "";
            var left = parseInt(domElement.style.left);
            domElement.style.width = '';
            domElement.style.height = '';
            var w = domElement.offsetWidth;
            domElement.style.left = (left - w /2) + 'px';
        } 
    },
    
    onAfterCompute: function() {
        Log.write("done");
        this.requestGraph();
    }
  });
  
  new Request.JSON({
      'url':'/service/apt-dependencies/tree/firefox/',
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