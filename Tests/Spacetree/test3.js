function init() {
              
              var infovis = document.getElementById('infovis');
              var w = infovis.offsetWidth, h = infovis.offsetHeight;
              var json= Feeder.makeTree();
              var fStyle, sStyle, lineWidth;
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
            
                    onBeforeCompute: function(node) {
                        Log.write("loading " + node.name);
                    },
                    
                    onCreateLabel: function(label, node) {
                        var d = $(label);
                        label.id = node.id;
                        d.setStyle('cursor', 'pointer').set('html', node.name).addEvent('click', function() {
                            st.onClick(d.id);
                        });
                    },
                    
                    onBeforePlotNode: function(node) {
                        var ctx = canvas.getCtx();
                        fStyle = ctx.fillStyle;
                        sStyle = ctx.strokeStyle;
                        if(node.selected) {
                            ctx.fillStyle = "#ff7";
                            ctx.strokeStyle = "#eed";
                        }
                    },
                    
                    onAfterPlotNode: function(node) {
                        var ctx = canvas.getCtx();
                        ctx.fillStyle = fStyle;
                        ctx.stroleStyle = sStyle;
                    },
                    
                    onBeforePlotLine: function(adj) {
                        var ctx = canvas.getCtx();
                        lineWidth = ctx.lineWidth;
                        sStyle = ctx.strokeStyle;
                        if(adj.nodeFrom.selected && adj.nodeTo.selected) {
                            ctx.strokeStyle = "#eed";
                            ctx.lineWidth = 3;
                        }
                    },
                    
                    onAfterPlotLine: function(adj) {
                        var ctx = canvas.getCtx();
                        ctx.lineWidth = lineWidth;
                        ctx.stroleStyle = sStyle;
                    }
              });
              //load json data
              st.loadJSON(json);
            
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
                    minChildrenPerNode: 1,
                    counter: 0
                });
                
                 (function() {
                    minitree.id = "node13"; //02 works too
                    st.removeSubtree('node13', true, 'animate', {
                        onComplete: function() {
                            //nothing
                        }
                    });
                }).delay(4000);


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
              
            
}