function init(){
    Feeder.p.color = false;
    var json = Feeder.makeTree();
    //Create a new ST instance
    st = new $jit.ST({
        'injectInto': 'infovis',
        
        Node: {
          overridable: true
        },
        Edge: {
          overridable: true
        },
        
        onBeforeCompute: function(node){
            Log.write("loading " + node.name);
        },
        
        onAfterCompute: function(node){
            Log.write("done");
        },

        onCreateLabel: function(label, node){
            label.id = node.id;
            label.style.cursor = 'pointer';
            label.innerHTML = node.name;
            label.onclick = function() {
                st.onClick(node.id);
            };
        }
    });
    //load json data
    st.loadJSON(json);
    
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    //Emulate a click on the root node.
    //    Tree.Plot.plot(st.tree, st.canvas);
    st.onClick(st.root);
    
    var animate = document.getElementById('animate');
    var button = document.getElementById('addSubtree');
    button.onclick = function() {
        var type = animate.checked? "animate" : "replot";
        var minitree = Feeder.makeTree({
            idPrefix: "node" + new Date().getTime(),
            levelStart: 0,
            levelEnd: 3,
            maxChildrenPerNode: 6,
            minChildrenPerNode: 1,
            counter: 0
        });
        minitree.id = "node13"; //02 works too
        st.addSubtree(minitree, type, {
            onComplete: function(){
                //nothing
            }
        });
    };
}
