function init(){
    var Log = {
        elem: false,
        write: function(text){
            if (!this.elem) 
                this.elem = document.getElementById('log');
            this.elem.innerHTML = text;
        }
    };
    
    var p = {
        idPrefix: "node",
        levelStart: 0,
        levelEnd: 4,
        maxChildrenPerNode: 15,
        minChildrenPerNode: 1,
        counter: 0
    };
    var json = Feeder.makeTree(p);
    Feeder.setWeights(json, true);
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    //Create a new canvas instance.
    var canvas = new Canvas('mycanvas', {
        'injectInto': 'infovis',
        'width': w,
        'height': h,
        'styles': {
            'fillStyle': '#ddd',
            'strokeStyle': '#ddd'
        }
    });
    ht = new Hypertree(canvas, {
    
        Node: {
            transform: false,
            overridable: true
        },
        
        onBeforeCompute: function(node){
            Log.write("centering");
        },
        
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function () {
                ht.onClick(node.id);
            };
        },
        
        //Take the left style property and substract half of the label actual width.
        onPlaceLabel: function(tag, node){
            tag.style.display = "none";
            var width = tag.offsetWidth;
            var intX = parseInt(tag.style.left);
            intX -= width / 2;
            tag.style.left = intX + 'px';
        },
        
        onAfterCompute: function(){
            Log.write("done");
        }
        
    });
    
    ht.loadJSON(json);
    ht.compute();
    ht.plot();
    ht.controller.onAfterCompute();
    
}
