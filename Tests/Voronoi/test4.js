var idlist;
var ctx;
var can;

var log = function(text) {
  var element = document.createElement('div');
  element.innerHTML = text;
  can.getElement().appendChild(element);
}
Math.PI = Math.atan(1) * 4;
Math.PIP180 = Math.PI / 180;
var init = function(text) {
	idlist = $jit.id('infovis');
  can = new $jit.Canvas(can, {injectInto: idlist, type : '2D', Label: { type: 'HTML'} });
  ctx = can.getCtx();
  
  var boundary = [];
	
	function drawBound() {
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#FF0";
		ctx.beginPath();
		ctx.fillStyle = "#222";
		ctx.moveTo(boundary[0].x, boundary[0].y);
		for (var i = 1; i < boundary.length; i++) {
      ctx.lineTo(boundary[i].x, boundary[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
	}
	
	var sites = [];
  
  function drawPoints() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#FFF";
    for (var i = 0; i < boundary.length; i++) {
      ctx.beginPath();
      ctx.arc(sites[i].x, sites[i].y, 3, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.stroke();
    }
  }
  
  function drawVoronoi() {
  	$jit.util.fortune(sites, boundary).map(function(polygon){
  		 ctx.beginPath();
  		 ctx.moveTo(polygon[0].x, polygon[0].y);
  		 for (var i = 1; i < polygon.length; i++) {
  		   ctx.lineTo(polygon[i].x, polygon[i].y);
  		 }
  		 ctx.closePath();
       ctx.stroke();
  	});
  }
  
  var nums = [];
  var Set = $jit.util.Set;
  debugger;
  var s = new Set();
  for (var i = 0; i < 30; i++) {
  	var r = Math.random();
  	nums.push(r);
  	s.insert(r);
  }
  
	
	window.reset = function () {
		ctx.fillStyle = "#000";
		ctx.fillRect(-400, -300, 800, 600);
		boundary = [];
		for (var i = 0; i < 20; i++) {
      boundary.push(new $jit.Complex(150 * Math.cos(Math.PIP180 * 18 * i), 150 * Math.sin(Math.PIP180 * 18 * i)));
    }
		sites = [];
		for (var i = 0; i < 20; i++) {
      sites.push($jit.util.randPointInPolygon(boundary));
    }
  	drawBound();
    drawPoints();
    drawVoronoi();
	}
	window.reset();
	$jit.id('left-container').innerHTML += '<a id="force-button" style="margin: 10px 40px;" href="javascript:reset()" class="theme white button">Reset!</a>';
}