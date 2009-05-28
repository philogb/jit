function init(){
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    var json = Feeder.makeTree();
    //Create a new canvas instance.
    var canvas = new Canvas('mycanvas', {
        'injectInto': 'infovis',
        'width': w,
        'height': h,
        'backgroundColor': '#222',
        'styles': {
            'fillStyle': '#ccb',
            'strokeStyle': '#ccb'
        }
    });
    //Create a new ST instance
    st = new ST(canvas, {
    
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
    st.geom.translate(new Complex(-200, 0), "startPos");
    //Emulate a click on the root node.
    st.onClick(st.root);
    
    var animate = document.getElementById('animate');
    var removeRoot = document.getElementById('removeroot');
    var button = document.getElementById('removeSubtree');
    button.onclick = function() {
        var type = animate.checked? "animate" : "replot";
        st.removeSubtree('node13', removeRoot.checked, type, {
            onComplete: function(){
                //nothing
            }
        });
    };
}