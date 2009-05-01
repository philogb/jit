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
        
        onCreateLabel: function(label, node){
            var d = $(label);
            label.id = node.id;
            d.setStyle('cursor', 'pointer').set('html', node.name).addEvent('click', function(){
                st.onClick(d.id);
            });
        },
        
        onBeforePlotNode: function(node){
            var ctx = canvas.getCtx();
            fStyle = ctx.fillStyle;
            sStyle = ctx.strokeStyle;
            if (node.selected) {
                ctx.fillStyle = "#ff7";
                ctx.strokeStyle = "#eed";
            }
        },
        
        onAfterPlotNode: function(node){
            var ctx = canvas.getCtx();
            ctx.fillStyle = fStyle;
            ctx.stroleStyle = sStyle;
        },
        
        onBeforePlotLine: function(adj){
            var ctx = canvas.getCtx();
            lineWidth = ctx.lineWidth;
            sStyle = ctx.strokeStyle;
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                ctx.strokeStyle = "#eed";
                ctx.lineWidth = 3;
            }
        },
        
        onAfterPlotLine: function(adj){
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
    st.onClick(st.root);
    
    //define custom options.
    var nodeOptions = [{
        type: 'none',
        dim: 7,
        color: '#fefefe'
    }, {
        type: 'circle',
        dim: 25,
        width: 50,
        height: 50,
        color: '#fefefe'
    }, {
        type: 'square',
        dim: 50,
        width: 50,
        height: 50,
        color: '#fefefe'
    }, {
        type: 'rectangle',
        width: 57,
        height: 30,
        color: '#fefefe'
    }, {
        type: 'ellipse',
        dim: 7,
        width: 70,
        height: 50,
        color: '#fefefe'
    }];
    
    var edgeOptions = ['none', 'line', 'quadratic:begin', 'quadratic:end', 'bezier', 'arrow'];
    var transitions = ['linear', 'Quart', 'Circ', 'Sine', 'Bounce', 'Elastic', 'Back'];
    var nodeTypes = document.getElementById('nodeTypes'), edgeTypes = document.getElementById('edgeTypes'), transitions = document.getElementById('transitions'), easing = document.getElementById('easing');
    
    nodeTypes.addEvent('change', function(){
        var nodeOpt = nodeOptions[nodeTypes.selectedIndex];
        for (var prop in nodeOpt) {
            st.config.Node[prop] = nodeOpt[prop];
        }
        st.plot();
        st.select(st.clickedNode.id);
    });
    edgeTypes.addEvent('change', function(){
        var edgeOpt = edgeOptions[edgeTypes.selectedIndex];
        st.config.Edge.type = edgeOpt;
        st.plot();
        st.select(st.clickedNode.id);
    });
    transitions.addEvent('change', function(){
        var transition = transitions.options[transitions.selectedIndex].text;
        if (transition != "linear") {
            st.config.transition = Trans[transition][easing.options[easing.selectedIndex].text];
        }
        else {
            st.config.transition = Trans[transition];
        }
    });
    easing.addEvent('change', function(){
        transitions.fireEvent('change');
    });
    document.getElementById('options').style.display = '';
    
    //Add input handler to switch spacetree orientation.
    var select = document.getElementById('switch').addEvent('change', function(){
        var index = select.selectedIndex;
        var or = select.options[index].text;
        select.disabled = true;
        st.switchPosition(or, {
            onComplete: function(){
                select.disabled = false;
            }
        });
    });
}
