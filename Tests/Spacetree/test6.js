function init(){
    var Log = {
        elem: false,
        write: function(text){
            if (!this.elem) 
                this.elem = document.getElementById('log');
            this.elem.innerHTML = text;
        }
    };
    
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
    
        Node: {
            'type': 'none',
            align: 'center'
        },
        
        Edge: {
            'type': 'none'
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
    st.geom.translate(new Complex(-200, 0), "startPos");
    //Emulate a click on the root node.
    st.onClick(st.root);
    
    //define custom options.
    var nodeOptions = [{
        type: 'none',
        dim: 7,
        color: '#555'
    }, {
        type: 'circle',
        dim: 25,
        width: 50,
        height: 50,
        color: '#555'
    }, {
        type: 'square',
        dim: 50,
        width: 50,
        height: 50,
        color: '#555'
    }, {
        type: 'rectangle',
        width: 57,
        height: 30,
        color: '#555'
    }, {
        type: 'ellipse',
        dim: 7,
        width: 70,
        height: 50,
        color: '#555'
    }];
    
    var edgeOptions = ['none', 'line', 'quadratic:begin', 'quadratic:end', 'bezier', 'arrow'];
    var transitions = ['linear', 'Quart', 'Circ', 'Sine', 'Bounce', 'Elastic', 'Back'];
    var nodeTypes = document.getElementById('nodeTypes'), edgeTypes = document.getElementById('edgeTypes'), transitions = document.getElementById('transitions'), easing = document.getElementById('easing');
    
    nodeTypes.onchange = function(){
        var nodeOpt = nodeOptions[nodeTypes.selectedIndex];
        for (var prop in nodeOpt) {
            st.config.Node[prop] = nodeOpt[prop];
        }
        st.select(st.clickedNode.id);
    };
    
    edgeTypes.onchange = function(){
        var edgeOpt = edgeOptions[edgeTypes.selectedIndex];
        st.config.Edge.type = edgeOpt;
        st.plot();
        st.select(st.clickedNode.id);
    };
    
    transitions.onchange = function(){
        var transition = transitions.options[transitions.selectedIndex].text;
        if (transition != "linear") {
            st.config.transition = Trans[transition][easing.options[easing.selectedIndex].text];
        }
        else {
            st.config.transition = Trans[transition];
        }
    };
    easing.onchange = function(){
        transitions.onchange();
    };
    
    //Add input handler to switch spacetree orientation.
    var select = document.getElementById('switch');
    select.onchange = function(){
        var index = select.selectedIndex;
        var or = select.options[index].text;
        select.disabled = true;
        st.switchPosition(or, {
            onComplete: function(){
                select.disabled = false;
            }
        });
    };
}
