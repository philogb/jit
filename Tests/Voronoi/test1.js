var c = $jit.Complex;
var G = $jit.geometry;
var idlist;
var ctx;
var can;
var log = function(text) {
    var element = document.createElement('div');
    element.innerHTML = text;
    can.getElement().appendChild(element);
  }
var V = $jit.util;
var color = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
var ps;
var polygon = [];
var N = 50;
var scount = 0;
function rect() {
  polygon = [
    new $jit.Complex(-400, -300), new $jit.Complex(400, -300),
    new $jit.Complex(400, 300), new $jit.Complex(-400, 300)
  ];
  stroke();
}

function circle() {
  polygon = [];
  for(var i = 0; i < N; i++) {
    polygon.push(new $jit.Complex(200*Math.cos(2 / N*Math.PI*i), 200*Math.sin(2 / N*Math.PI*i)));
  }
  stroke();
}

function dp(cent) {
  ctx.beginPath();
  ctx.moveTo(cent.x - 3, cent.y + 3);
  ctx.lineTo(cent.x + 3, cent.y - 3);
  ctx.moveTo(cent.x + 3, cent.y + 3);
  ctx.lineTo(cent.x - 3, cent.y - 3);
  ctx.closePath();
  ctx.stroke();
}

function draw() {
  ctx.fillStyle = "#CCC";
  ctx.fillRect(-400, -300, 800, 600);
  
  ctx.beginPath();
  ctx.moveTo(polygon[polygon.length - 1].x, polygon[polygon.length - 1].y);
  for(var i = 0; i < polygon.length; i++) {
    ctx.lineTo(polygon[i].x, polygon[i].y);
  }
  ctx.closePath();
  ctx.strokeStyle = "#ffff00";
  ctx.lineWidth = 3;
  ctx.stroke();
  
  var pos = G.voronoi(ps, polygon);
  var cents = pos.map(function(po, ind) { if (!po.length) return ps[ind]; return G.centroid(po); });
  var cpos = G.voronoi(cents, polygon);
  $jit.util.each(pos, function(p, ind) {
    if(p.length == 0) return;
    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y);
    if(!ps[ind].color) {
      ps[ind].color = ("#" + color[(Math.random() * 5 + 11) >> 0] + color[(Math.random() * 5 + 11) >> 0] + color[(Math.random() * 5 + 11) >> 0]);
    }
    for (var i = 1; i < p.length; i++) {
      ctx.lineTo(p[i].x, p[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = ps[ind].color;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#000";
    dp(ps[ind]);
    
    var cent = G.centroid(p);
    ctx.strokeStyle = "rgba(255,0,0,0.3)";
    dp(cent);
    
  });
  
  $jit.util.each(pos, function(p, ind) {
    if(ps[ind].parts)
      $jit.util.each(ps[ind].parts, function(part) {
        ctx.strokeStyle = "#00F";
        dp(part);
        ctx.beginPath();
        var cent = G.centroid(pos[part.ind]);
        ctx.moveTo(cent.x, cent.y);
        ctx.lineTo(part.x, part.y);
        ctx.closePath();
        ctx.stroke();
      });
    if(cpos[ind][0]){
      ctx.beginPath();
      ctx.moveTo(cpos[ind][0].x, cpos[ind][0].y);
      for(var i = 1; i < cpos[ind].length; i++){
        ctx.lineTo(cpos[ind][i].x, cpos[ind][i].y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.fillStyle = "#000";
    ctx.fillText(ind + ":" +(ps[ind].area / G.area(p)).toFixed(2), ps[ind].x, ps[ind].y);
  });
  
  ctx.fillStyle = "#000";
  ctx.fillText("Steps: " + scount, -400, -280);
}

function stroke() {
  idlist.style.textAlign = "left";
  idlist.style.padding = "5px";
  
  ps = [];
  for (var i = 0; i < 10; i++) {
    var c = G.randPointInPolygon(polygon);
    if (!G.pointInPolygon([c], polygon)[0]) {
      console.log(c + " not in " + polygon);
      debugger;
    }
    c.area = 3 + Math.random() * 5;
    ps.push(c);
    
  }
  // log('<span style="color:yellow"><tt>randPointInPolygon</tt></span> Passed!');
  for (var i = 0; i < 100; i++){
    var polygons = G.voronoi(ps, polygon);
    ps = $jit.util.map(polygons, function(p, ind) {
      var po = G.centroid(p); //$C(ps[ind].x, ps[ind].y);
      po.color = ps[ind].color;
      po.area = ps[ind].area;
      return po;
    });
  }
  scount = 0;
  draw();
}

$C = function(x,y) { return new $jit.Complex(x,y); }

function myCentroid(p, ind, presure) {
  
}

function presure (sites, bound) {  
  var tw = 0;
  $jit.util.each(sites, function(s) {
    tw += s.area;
  });
  tw = G.area(bound) / tw;
  $jit.util.each(sites, function(s) {
    s.area *= tw;
  });
  
  var polygons = G.voronoi(sites, bound);
  var presure = polygons.map(function(p) {
    return p.area / (G.area(p) + 1e-10);
  });

  polygons = G.voronoi(sites, bound);
  sites = $jit.util.map(polygons, function(p, ind) {
    var po = $C(sites[ind].x, sites[ind].y);
    po.color = sites[ind].color;
    po.area = sites[ind].area;
    var totalPressure = $C(0, 0);
    for (var i = 0; i < p.length; i++) {
      var targetPressure = (p[i].attached) ? presure[p[i].attached[0]] : 1,
          start = p[i],
          stop = p[i + 1] || p[0],
          pr = (presure[ind] - targetPressure),
          dx = stop.x - start.x,
          dy = stop.y - start.y;
      totalPressure.x += dy * pr;
      totalPressure.y -= dx * pr;
    }
    po.x += totalPressure.x / 10;
    po.y += totalPressure.y / 10;
    po.tp = totalPressure;
    return po;
  });
  
  return sites;
};

function step(){
  ps = presure(ps, polygon);
  scount ++;
  draw();
}
function force() {
  if(window.fc) {
    window.clearInterval(window.fc), window.fc = null;
    $jit.id('force-button').innerText = "Animate!";
  } else {
    window.fc = window.setInterval(step, 10);  
    $jit.id('force-button').innerText = "Stop!";
  }
}

function init() {
  idlist = $jit.id('infovis');
  can = new $jit.Canvas(can, {injectInto: idlist, type : '2D', Label: { type: 'HTML'} });
  ctx = can.getCtx();
  
  var bs1 = G.bisector({x:0,y:0},{x:1,y:1});
  var bs2 = G.bisector({x:1,y:0},{x:0,y:1});
  var int = G.intersection(bs1,bs2);
  log('Intersection: (' + int.x + ', ' + int.y + ')');
  
  var bs1 = G.bisector({x:0,y:0},{x:1,y:0});
  var bs2 = G.bisector({x:0,y:0},{x:0,y:1});
  var int = G.intersection(bs1,bs2);
  log('Intersection: (' + int.x + ', ' + int.y + ')');
  
  var bs1 = G.bisector({x:0,y:0},{x:1,y:0});
  var bs2 = G.bisector({x:0,y:0},{x:2,y:0});
  var int = G.intersection(bs1,bs2);
  log('Intersection: (' + int + ')');

  var bs1 = G.bisector({x:0,y:0},{x:1,y:0});
  var bs2 = G.bisector({x:0,y:0},{x:1,y:0});
  var int = G.intersection(bs1,bs2);
  log('Intersection: (' + int + ')');
  
  
  console.log(G.convexCut([new c(0,0), new c(1,2), new c(2,0)], [new c(0,1), new c(2,1)]));
  
  console.log(G.voronoi(
    [[0,0],[1,1]], [new c(0, 0), new c(0, 1), new c(1, 1), new c(1, 0)]));
  console.log(G.convexCut([new c(0, 0), new c(1, 2), new c(2, 0)],[new c(0, 1), new c(2, 1)]));
  console.log(G.convexCut([new c(0, 0), new c(1, 2), new c(2, 0)],[new c(2, 1), new c(0, 1)]));
  console.log(G.convexCut([new c(0, 0), new c(1, 2), new c(2, 0)],[new c(2, 1), new c(0, 0)]));
  console.log(G.convexCut([new c(1, 0), new c(2, 0), new c(1, 2),[0.5,1]],[new c(1, 0), new c(2, 0)]));
  
  console.log(G.convexIntersect(
    [[0,0],[2,0],[1,2]],
    [[0,2],[1,0],[2,0]]));
    
  // randPointInPolygon Tests
  
  
  // $jit.Voronoi.ps
  $jit.id('left-container').innerHTML += '<a style="margin: 10px 40px;" href="javascript:stroke()" class="theme white button">Random</a>';
  $jit.id('left-container').innerHTML += '<a style="margin: 10px 40px;" href="javascript:rect()" class="theme white button">Use rect</a>';
  $jit.id('left-container').innerHTML += '<a style="margin: 10px 40px;" href="javascript:circle()" class="theme white button">Use circle</a>';
  $jit.id('left-container').innerHTML += '<a style="margin: 10px 40px;" href="javascript:step()" class="theme white button">Step</a>';
  $jit.id('left-container').innerHTML += '<a id="force-button" style="margin: 10px 40px;" href="javascript:force()" class="theme white button">Animate!</a>';
  circle();
}