function init(){
	var idlist = $jit.id('infovis');
	var can = {};
  can = new $jit.Canvas(can, {injectInto: idlist, type : '2D', Label: { type: 'HTML'} });
  ctx = can.getCtx();
  
  var log = function(text) {
    var element = document.createElement('div');
    element.innerHTML = text;
    can.getElement().appendChild(element);
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
    
  // randPointInPolygon Tests
  var polygon = [];
  for(var i = 0; i < 10; i++) {
  	polygon.push(new c(100*Math.cos(0.2*Math.PI*i), 100*Math.sin(0.2*Math.PI*i)));
  }
  idlist.style.textAlign = "left";
  idlist.style.padding = "5px";
  ctx.beginPath();
  ctx.moveTo(polygon[9].x, polygon[9].y);
  for(var i = 0; i < 10; i++)
    ctx.lineTo(polygon[i].x, polygon[i].y);
  ctx.closePath();
  ctx.strokeStyle = "#ffff00";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  for (var i = 0; i < 1000; i++) {
		var c = $jit.Voronoi.randPointInPolygon(polygon);
		if (!$jit.Voronoi.pointInPolygon([c], polygon)[0]) {
			console.log(c + " not in " + polygon);
			debugger;
		}
    ctx.moveTo(c.x - 1, c.y - 1);
    ctx.lineTo(c.x + 1, c.y - 1);
    ctx.lineTo(c.x + 1, c.y + 1);
    ctx.lineTo(c.x - 1, c.y + 1);
    ctx.lineTo(c.x - 1, c.y - 1);
	}
	ctx.closePath();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';
  ctx.font = '15pt sans-serif';
  ctx.fillText('randPointInPolygon Test', 0, 125);
	log('<span style="color:yellow"><tt>randPointInPolygon</tt></span> Passed!');
}