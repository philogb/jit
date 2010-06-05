function init(){
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    var json = Feeder.makeTree({
        idPrefix: "node" + new Date().getTime(),
        levelStart: 0,
        levelEnd: 3,
        maxChildrenPerNode: 5,
        minChildrenPerNode: 0,
        counter: 0
    });
    json.children = [{
        'id': 'lala',
        'name': 'lala',
        'data': {},
        'children': []
    }].concat(json.children);
    //Create a new ST instance
    st = new $jit.ST({
        'injectInto': 'infovis',
        'width': w,
        'height': h,
        levelDistance: 50,
        Node: {
            overridable: false,
            height: 20,
            align: "right"
        },
        
        Edge: {
            overridable: false,
            'type': 'bezier',
            dim: 15
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
    //  Tree.Plot.plot(st.tree, st.canvas);
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
    
    //make node list
    var elemUl = document.createElement('ul');
    $jit.Graph.Util.eachNode(st.graph, function(elem){
        var elemLi = document.createElement('li');
        elemLi.onclick = function() {
            st.select(elem.id);
        };
        elemLi.innerHTML = elem.name;
        elemUl.appendChild(elemLi);
    });
    document.getElementById('id-list').appendChild(elemUl);
}
