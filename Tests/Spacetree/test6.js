function init(){
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    var json = Feeder.makeTree();
    $jit.json.each(json, function(n) {
      var num = Math.random() * 10 + 1;
      for(var i=0, text="text "; i<num; i++) {
        text+= "text ";
      }
      delete n.data.$color;
      delete n.data.$width;
      delete n.data.$height;
      delete n.data.$dim;
      
      n.name += " " + text;
    });
    //Create a new ST instance
    st = new $jit.ST({
        'injectInto': 'infovis',
        'width': w,
        'height': h,
        
        Node: {
            'type': 'none',
            align: 'center',
            overridable:true,
            width:80,
            autoHeight:true,
            color:'#555'
        },
        
        Edge: {
            'type': 'none'
        },
        
        transition: $jit.Trans.linear,
        
        onBeforeCompute: function(node){
            Log.write("loading " + node.name);
        },
        
        onAfterCompute: function(node){
            Log.write("done");
        },
        
        onCreateLabel: function(label, node){
            label.id = node.id;
            label.style.cursor = 'pointer';
            label.style.width = '80px';
            label.style.padding = '15px';
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
    st.onClick(st.root);
    
    //define custom options.
    var nodeOptions = [{
        type: 'none',
        dim: 7,
        color: '#555'
    }, {
        type: 'circle',
        dim: 25,
        width: 80,
        height: 50,
        color: '#555'
    }, {
        type: 'square',
        dim: 50,
        width: 80,
        height: 50,
        color: '#555'
    }, {
        type: 'rectangle',
        width: 80,
        height: 30,
        color: '#555'
    }, {
        type: 'ellipse',
        dim: 7,
        width: 80,
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
        st.switchPosition(or, "animate", {
            onComplete: function(){
                select.disabled = false;
            }
        });
    };
}
