function init(){
    var json = [{
        "id": "a_0",
        "name": "someNode",
        "data": [],
        "adjacencies": []
    }];
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    var nodesCache = {};
    $jit();
    ht = new Hypertree({
        'injectInto': 'infovis',
        'width': w,
        'height': h,
        'backgroundCanvas': {
            'styles': {
                'fillStyle': '#ccc',
                'strokeStyle': '#ccc'
            },
            'impl': {
                'init': function(){
                },
                'plot': function(canvas, ctx){
                    ctx.beginPath();
                    ctx.arc(0, 0, ((w < h) ? w : h) / 2, 0, Math.PI * 2, true);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
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
            var width = tag.offsetWidth;
            var intX = parseInt(tag.style.left);
            intX -= width / 2;
            tag.style.left = intX + 'px';
        },
       
        onAfterCompute: function(){
            Log.write("done");
            var node = ht.graph.getClosestNodeToOrigin("current");
            var _self = this;
            ht.graph.eachNode(function(n){
                var domNode = (n.id in nodesCache) ? nodesCache[n.id] : nodesCache[n.id] = document.getElementById(n.id);
                if (node.adjacentTo(n) || node.id == n.id) {
                    domNode.style.display = "";
                }
                else {
                    domNode.style.display = "none";
                }
            });
        }
    });
    
    //load tree from tree data.
    ht.loadJSON(json);
    ht.compute();
    ht.plot();
    ht.controller.onAfterCompute();
}
