function init(){
    var p = {
        idPrefix: "node",
        levelStart: 0,
        levelEnd: 4,
        maxChildrenPerNode: 15,
        minChildrenPerNode: 1,
        counter: 0
    };
    var json = Feeder.makeTree(p);
    $jit();
    ht = new Hypertree({
        'injectInto': 'infovis',
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
