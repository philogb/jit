function init() {
              
              var infovis = document.getElementById('infovis');
              var w = infovis.offsetWidth, h = infovis.offsetHeight;
              var json= Feeder.makeTree({
                    idPrefix: "node" + new Date().getTime(),
                    levelStart: 0,
                    levelEnd: 3,
                    maxChildrenPerNode: 5,
                    minChildrenPerNode:0,
                    counter: 0
              });
              json.children = [{ 'id':'lala', 'name': 'lala', 'data':{}, 'children': [] }].concat(json.children);
              //Create a new canvas instance.
              var canvas = new Canvas('mycanvas', {
                'injectInto':'infovis',
                'width':w,
                'height':h,
                'backgroundColor': '#222',
                'styles': {
                    'fillStyle': '#ccb',
                    'strokeStyle': '#ccb'
                }   
              });
              //Create a new ST instance
              st= new ST(canvas, {
                      levelDistance: 50,
                    Node: {
                        overridable: false,
                        height:20,
                        align:"right"
                    },
                    
                    Edge: {
                        overridable: false,
                        'type': 'bezier',
                        dim: 15
                    },
                    
                    onBeforeCompute: function(node) {
                        Log.write("loading " + node.name);
                    },
                    
                    onAfterCompute: function(node) {
                        Log.write("done");
                    },
                    
                    onCreateLabel: function(label, node) {
                        var d = $(label);
                        label.id = node.id;
                        d.setStyle('cursor', 'pointer').set('html', node.name).addEvent('click', function() {
                            st.onClick(d.id);
                        });
                    },
                    
                    onBeforePlotNode: function(node) {
                        if(node.selected) {
                            node.data.$color = "#ff7";
                        } else {
                            delete node.data.$color;
                        }
                    },
                    
                    onBeforePlotLine: function(adj) {
                        if(adj.nodeFrom.selected && adj.nodeTo.selected) {
                            adj.data.$color = "#eed";
                            adj.data.$lineWidth = 3;
                        } else {
                            delete adj.data.$color;
                            delete adj.data.$lineWidth;
                        }
                    }
              });
              //load json data
              st.loadJSON(json);
                Graph.Util.eachNode(st.graph, function(node) {
                       node.data.$width = 30 + Math.random() * 30;
                       node.data.$height = 30 + Math.random() * 30;
                });              
              //compute node positions and layout
              st.compute();
              //optional: make a translation of the tree
              st.geom.translate(new Complex(-200, 0), "startPos");
              //Emulate a click on the root node.
            //  Tree.Plot.plot(st.tree, st.canvas);
              st.onClick(st.root);
              
              var minitree = Feeder.makeTree({
                    idPrefix: "node" + new Date().getTime(),
                    levelStart: 0,
                    levelEnd: 3,
                    maxChildrenPerNode: 6,
                    counter: 0
                });
                
              //Add input handler to switch spacetree orientation.
              var select = document.getElementById('switch').addEvent('change', function() {
                var index = select.selectedIndex;
                var or = select.options[index].text;
                select.disabled = true;
                st.switchPosition(or, {
                    onComplete: function() {
                        select.disabled = false;
                    }
                });
              });
              
              //make node list
              var elemUl = new Element('ul');
              Graph.Util.eachNode(st.graph, function(elem) {
                  var elemLi = new Element('li', {
                    'html': "name: " + elem.name,
                    'events': {
                        'click': function() {
                            st.select(elem.id);
                        }
                    }
                });
                elemLi.inject(elemUl);
              });
              elemUl.inject('id-list');
              
              
            
}