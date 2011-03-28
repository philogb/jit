function init(){
  var idlist = $jit.id('infovis');
  idlist.style.textAlign = "left";
  idlist.style.padding = "5px";
  var log = function(text) {
    var element = document.createElement('div');
    element.innerHTML = text;
    idlist.appendChild(element);
  }
  var V = $jit.Voronoi;
  // perftest(100000);
  
  var bs1 = V.bisector({x:0,y:0},{x:1,y:1});
  var bs2 = V.bisector({x:1,y:0},{x:0,y:1});
  var int = V.intersection(bs1,bs2);
  log('Intersection: (' + int.x + ', ' + int.y + ')');
  
  var bs1 = V.bisector({x:0,y:0},{x:1,y:0});
  var bs2 = V.bisector({x:0,y:0},{x:0,y:1});
  var int = V.intersection(bs1,bs2);
  log('Intersection: (' + int.x + ', ' + int.y + ')');
  
  var bs1 = V.bisector({x:0,y:0},{x:1,y:0});
  var bs2 = V.bisector({x:0,y:0},{x:2,y:0});
  var int = V.intersection(bs1,bs2);
  log('Intersection: (' + int + ')');

  var bs1 = V.bisector({x:0,y:0},{x:1,y:0});
  var bs2 = V.bisector({x:0,y:0},{x:1,y:0});
  var int = V.intersection(bs1,bs2);
  log('Intersection: (' + int + ')');
  
  var c = $jit.Complex;
  console.log($jit.Voronoi.convexCut(
    [new c(0,0), new c(1,2), new c(2,0)],
    [new c(0,1), new c(2,1)]
  ));
  
  console.log($jit.Voronoi.voronoiFortune(
    [[0,0],[1,1]], [new c(0, 0), new c(0, 1), new c(1, 1), new c(1, 0)]));
  console.log($jit.Voronoi.convexCut([new c(0, 0), new c(1, 2), new c(2, 0)],[new c(0, 1), new c(2, 1)]));
  console.log($jit.Voronoi.convexCut([new c(0, 0), new c(1, 2), new c(2, 0)],[new c(2, 1), new c(0, 1)]));
  console.log($jit.Voronoi.convexCut([new c(0, 0), new c(1, 2), new c(2, 0)],[new c(2, 1), new c(0, 0)]));
  console.log($jit.Voronoi.convexCut([new c(1, 0), new c(2, 0), new c(1, 2),[0.5,1]],[new c(1, 0), new c(2, 0)]));
  
  console.log($jit.Voronoi.convexIntersect(
    [[0,0],[2,0],[1,2]],
    [[0,2],[1,0],[2,0]]));
}