function init(){
    var json = Feeder.makeTree();
    
    //Create a new ST instance
    st = new $jit.ST({
        'injectInto': 'infovis',
        duration: 800,
        orientation: 'left',
        fps: 35,
        transition: $jit.Trans.Quad.easeInOut,
        subtreeOffset: 8,
        siblingOffset: 5,
        levelDistance: 50,
        Node: {
            overridable: true,
            height: 20,
            width: 80,
            type: 'rectangle',
            align: "center"
        },
        
        Edge: {
            overridable: true,
            type: 'arrow',
            dim: 7
        },
        
        onBeforeCompute: function(node){
            Log.write("loading " + node.name);
        },
        
        onAfterCompute: function(){
            Log.write("done");
        },
        
        request: function(nodeId, level, onComplete){
            Feeder.request(nodeId, level, onComplete);
        },
        
        onCreateLabel: function(label, node){
            label.id = node.id;
            label.style.cursor = 'pointer';
            label.innerHTML = node.name;
            label.onclick = function() {
                st.onClick(node.id);
            };
        },
        
        onBeforePlotNode: function(node){
            if (node.selected) {
                node.data.$color = "#ff7";
            }
            else {
                delete node.data.$color;
            }
        },
        
        onBeforePlotLine: function(adj){
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                adj.data.$color = "#eed";
                adj.data.$lineWidth = 3;
            }
            else {
                delete adj.data.$color;
                delete adj.data.$lineWidth;
            }
        }
    });
    //load json data
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    //Emulate a click on the root node.
    st.onClick(st.root);
    
    //Add input handler to switch spacetree orientation.
    var select = document.getElementById('switch');
    select.onchange = function(){
        var index = select.selectedIndex;
        var or = select.options[index].text;
        select.disabled = true;
        st.switchPosition(or, "animate", {
            onComplete: function(){
                select.disabled = false;
            }
        });
    };
    
}
