var NodeHelper = {
  'none': {
    'render': $.empty,
    'contains': $.lambda(false)
  },
  'circle': {
    'render': function(type, pos, radius, canvas){
      var ctx = canvas.getCtx();
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx[type]();
    },
    'contains': function(npos, pos, radius){
      var diffx = npos.x - pos.x, 
          diffy = npos.y - pos.y, 
          diff = diffx * diffx + diffy * diffy;
      return diff <= radius * radius;
    }
  },
  'ellipse': {
    'render': function(type, pos, width, height, canvas){
      var ctx = canvas.getCtx();
      height /= 2;
      width /= 2;
      ctx.save();
      ctx.scale(width / height, height / width);
      ctx.beginPath();
      ctx.arc(pos.x * (height / width), pos.y * (width / height), height, 0,
          Math.PI * 2, true);
      ctx.closePath();
      ctx[type]();
      ctx.restore();
    },
    // TODO(nico): be more precise...
    'contains': function(npos, pos, width, height){
      width /= 2; 
      height /= 2;
      var dist = (width + height) / 2, 
          diffx = npos.x - pos.x, 
          diffy = npos.y - pos.y, 
          diff = diffx * diffx + diffy * diffy;
      return diff <= dist * dist;
    }
  },
  'square': {
    'render': function(type, pos, dim, canvas){
      canvas.getCtx()[type + "Rect"](pos.x - dim, pos.y - dim, 2*dim, 2*dim);
    },
    'contains': function(npos, pos, dim){
      return Math.abs(pos.x - npos.x) <= dim && Math.abs(pos.y - npos.y) <= dim;
    }
  },
  'rectangle': {
    'render': function(type, pos, width, height, canvas){
      canvas.getCtx()[type + "Rect"](pos.x - width / 2, pos.y - height / 2, 
                                      width, height);
    },
    'contains': function(npos, pos, width, height){
      return Math.abs(pos.x - npos.x) <= width / 2
          && Math.abs(pos.y - npos.y) <= height / 2;
    }
  },
  'triangle': {
    'render': function(type, pos, dim, canvas){
      var ctx = canvas.getCtx(), 
          c1x = pos.x, 
          c1y = pos.y - dim, 
          c2x = c1x - dim, 
          c2y = pos.y + dim, 
          c3x = c1x + dim, 
          c3y = c2y;
      ctx.beginPath();
      ctx.moveTo(c1x, c1y);
      ctx.lineTo(c2x, c2y);
      ctx.lineTo(c3x, c3y);
      ctx.closePath();
      ctx[type]();
    },
    'contains': function(npos, pos, dim) {
      return NodeHelper.circle.contains(npos, pos, dim);
    }
  },
  'star': {
    'render': function(type, pos, dim, canvas){
      var ctx = canvas.getCtx(), 
          pi5 = Math.PI / 5;
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.beginPath();
      ctx.moveTo(dim, 0);
      for (var i = 0; i < 9; i++) {
        ctx.rotate(pi5);
        if (i % 2 == 0) {
          ctx.lineTo((dim / 0.525731) * 0.200811, 0);
        } else {
          ctx.lineTo(dim, 0);
        }
      }
      ctx.closePath();
      ctx[type]();
      ctx.restore();
    },
    'contains': function(npos, pos, dim) {
      return NodeHelper.circle.contains(npos, pos, dim);
    }
  }
};

var EdgeHelper = {
  'line': function(from, to, canvas){
    var ctx = canvas.getCtx();
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  },
  //'type' stroke or fill does not make much sense here.
  'arrow': function(from, to, dim, swap, canvas){
    var ctx = canvas.getCtx();
    // invert edge direction
    if (swap) {
      var tmp = from;
      from = to;
      to = tmp;
    }
    var vect = new Complex(to.x - from.x, to.y - from.y);
    vect.$scale(dim / vect.norm());
    var intermediatePoint = new Complex(to.x - vect.x, to.y - vect.y),
        normal = new Complex(-vect.y / 2, vect.x / 2),
        v1 = intermediatePoint.add(normal), 
        v2 = intermediatePoint.$add(normal.$scale(-1));
    
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.lineTo(to.x, to.y);
    ctx.closePath();
    ctx.fill();
  },
  /*
  Plots a hyperline between two nodes. A hyperline is an arc of a circle which is orthogonal to the main circle. 
  
  Parameters:
  
  adj - A <Graph.Adjacence> object.
  canvas - A <Canvas> instance.
  */
  'hyperline': function(from, to, r, canvas){
    var ctx = canvas.getCtx();  
    var centerOfCircle = computeArcThroughTwoPoints(from, to);
    if (centerOfCircle.a > 1000 || centerOfCircle.b > 1000
        || centerOfCircle.ratio < 0) {
      ctx.beginPath();
      ctx.moveTo(from.x * r, from.y * r);
      ctx.lineTo(to.x * r, to.y * r);
      ctx.stroke();
    } else {
      var angleBegin = Math.atan2(to.y - centerOfCircle.y, to.x
          - centerOfCircle.x);
      var angleEnd = Math.atan2(from.y - centerOfCircle.y, from.x
          - centerOfCircle.x);
      var sense = sense(angleBegin, angleEnd);
      ctx.beginPath();
      ctx.arc(centerOfCircle.x * r, centerOfCircle.y * r, centerOfCircle.ratio
          * r, angleBegin, angleEnd, sense);
      ctx.stroke();
    }
    /*      
      Calculates the arc parameters through two points.
      
      More information in <http://en.wikipedia.org/wiki/Poincar%C3%A9_disc_model#Analytic_geometry_constructions_in_the_hyperbolic_plane> 
    
      Parameters:
    
      p1 - A <Complex> instance.
      p2 - A <Complex> instance.
      scale - The Disk's diameter.
    
      Returns:
    
      An object containing some arc properties.
    */
    function computeArcThroughTwoPoints(p1, p2){
      var aDen = (p1.x * p2.y - p1.y * p2.x), bDen = aDen;
      var sq1 = p1.squaredNorm(), sq2 = p2.squaredNorm();
      // Fall back to a straight line
      if (aDen == 0)
        return {
          x: 0,
          y: 0,
          ratio: -1
        };
  
      var a = (p1.y * sq2 - p2.y * sq1 + p1.y - p2.y) / aDen;
      var b = (p2.x * sq1 - p1.x * sq2 + p2.x - p1.x) / bDen;
      var x = -a / 2;
      var y = -b / 2;
      var squaredRatio = (a * a + b * b) / 4 - 1;
      // Fall back to a straight line
      if (squaredRatio < 0)
        return {
          x: 0,
          y: 0,
          ratio: -1
        };
      var ratio = Math.sqrt(squaredRatio);
      var out = {
        x: x,
        y: y,
        ratio: ratio > 1000? -1 : ratio,
        a: a,
        b: b
      };
  
      return out;
    }
    /*      
      Sets angle direction to clockwise (true) or counterclockwise (false). 
       
      Parameters: 
    
         angleBegin - Starting angle for drawing the arc. 
         angleEnd - The HyperLine will be drawn from angleBegin to angleEnd. 
    
      Returns: 
    
         A Boolean instance describing the sense for drawing the HyperLine. 
    */
    function sense(angleBegin, angleEnd){
      return (angleBegin < angleEnd)? ((angleBegin + Math.PI > angleEnd)? false
          : true) : ((angleEnd + Math.PI > angleBegin)? true : false);
    }
  }
};
