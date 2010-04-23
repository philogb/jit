//General and Abstract NodeTypes, they're generally overridden by
//Visualization.Plot.NodeTypes and Visualization.Plot.EdgeTypes.

var NodeTypes = {
  'none': {
    'render': $.empty,
    'contains': $.lambda(false)
  },
  'circle': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true), nodeDim = node.getData('dim') / 2, ctx = canvas
          .getCtx();
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, nodeDim, 0, Math.PI * 2, true);
      ctx.fill();
    },
    'contains': function(node, pos){
      var npos = node.pos.getc(true), dist = node.getData('dim'), diffx = npos.x
          - pos.x, diffy = npos.y - pos.y, diff = diffx * diffx + diffy * diffy;
      return diff <= dist * dist;
    }
  },
  'ellipse': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true), width = node.getData('width') / 2, height = node
          .getData('height') / 2, ctx = canvas.getCtx();
      ctx.save();
      ctx.scale(width / height, height / width);
      ctx.beginPath();
      ctx.arc(pos.x * (height / width), pos.y * (width / height), height, 0,
          Math.PI * 2, true);
      ctx.fill();
      ctx.restore();
    },
    // TODO(nico): be more precise...
    'contains': function(node, pos){
      var npos = node.pos.getc(true), width = node.getData('width') / 2, height = node
          .getData('height') / 2, dist = (width + height) / 2, diffx = npos.x
          - pos.x, diffy = npos.y - pos.y, diff = diffx * diffx + diffy * diffy;
      return diff <= dist * dist;
    }
  },
  'square': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true), nodeDim = node.getData('dim'), nodeDim2 = 2 * nodeDim;
      canvas.getCtx().fillRect(pos.x - nodeDim, pos.y - nodeDim, nodeDim2,
          nodeDim2);
    },
    'contains': function(node, pos){
      var npos = node.pos.getc(true), dim = node.getData('dim');
      return Math.abs(pos.x - npos.x) <= dim && Math.abs(pos.y - npos.y) <= dim;
    }
  },
  'rectangle': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true), width = node.getData('width'), height = node
          .getData('height');
      canvas.getCtx().fillRect(pos.x - width / 2, pos.y - height / 2, width,
          height);
    },
    'contains': function(node, pos){
      var npos = node.pos.getc(true), width = node.getData('width'), height = node
          .getData('height');
      return Math.abs(pos.x - npos.x) <= width / 2
          && Math.abs(pos.y - npos.y) <= height / 2;
    }
  },
  'triangle': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true), nodeDim = node.getData('dim'), ctx = canvas
          .getCtx(), c1x = pos.x, c1y = pos.y - nodeDim, c2x = c1x - nodeDim, c2y = pos.y
          + nodeDim, c3x = c1x + nodeDim, c3y = c2y;
      ctx.beginPath();
      ctx.moveTo(c1x, c1y);
      ctx.lineTo(c2x, c2y);
      ctx.lineTo(c3x, c3y);
      ctx.fill();
    },
    'contains': function() {
      return NodeTypes.circle.contains(node, pos);
    }
  },
  'star': {
    'render': function(node, canvas){
      var pos = node.pos.getc(true);
      var nodeDim = node.getData('dim');
      var ctx = canvas.getCtx(), pi5 = Math.PI / 5;
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.beginPath();
      ctx.moveTo(nodeDim, 0);
      for ( var i = 0; i < 9; i++) {
        ctx.rotate(pi5);
        if (i % 2 == 0) {
          ctx.lineTo((nodeDim / 0.525731) * 0.200811, 0);
        } else {
          ctx.lineTo(nodeDim, 0);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },
    'contains': function() {
      return NodeTypes.circle.contains(node, pos);
    }
  }
};

var EdgeTypes = {
  'none': $.empty,

  'line': function(adj, canvas){
    var pos = adj.nodeFrom.pos.getc(true), posChild = adj.nodeTo.pos.getc(true), ctx = canvas
        .getCtx();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(posChild.x, posChild.y);
    ctx.stroke();
  },

  'arrow': function(adj, canvas){
    var node = adj.nodeFrom, child = adj.nodeTo, econfig = this.edge, ctx = canvas
        .getCtx();
    // get edge dim
    var edgeDim = adj.getData('dim'), direction = adj.getData('direction');
    // get edge direction
    if (direction && direction.length > 1) {
      var nodeHash = {};
      nodeHash[node.id] = node;
      nodeHash[child.id] = child;
      node = nodeHash[direction[0]];
      child = nodeHash[direction[1]];
    }
    var posFrom = node.pos.getc(true), posTo = child.pos.getc(true), vect = new Complex(
        posTo.x - posFrom.x, posTo.y - posFrom.y);

    vect.$scale(edgeDim / vect.norm());
    var intermediatePoint = new Complex(posTo.x - vect.x, posTo.y - vect.y);
    var normal = new Complex(-vect.y / 2, vect.x / 2);
    var v1 = intermediatePoint.add(normal), v2 = intermediatePoint.$add(normal
        .$scale(-1));
    ctx.beginPath();
    ctx.moveTo(posFrom.x, posFrom.y);
    ctx.lineTo(posTo.x, posTo.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.lineTo(posTo.x, posTo.y);
    ctx.closePath();
    ctx.fill();
  },
  /*
  Plots a hyperline between two nodes. A hyperline is an arc of a circle which is orthogonal to the main circle. 

  Parameters:

  adj - A <Graph.Adjacence> object.
  canvas - A <Canvas> instance.
  */
  'hyperline': function(adj, canvas){
    var node = adj.nodeFrom, 
        child = adj.nodeTo, 
        data = adj.data, 
        pos = node.pos.getc(), 
        posChild = child.pos.getc(), 
        ctx = canvas.getCtx();
    
    if(this.viz.getRadius) {
      var r = this.viz.getRadius(); 
    } else {
      var r = node._depth > child._depth ? pos.norm() : posChild.norm(), rinv = 1 / r;
      pos.$scale(rinv);
      posChild.$scale(rinv);
    }

    var centerOfCircle = computeArcThroughTwoPoints(pos, posChild);
    
    if (centerOfCircle.a > 1000 || centerOfCircle.b > 1000
        || centerOfCircle.ratio < 0) {
      ctx.beginPath();
      ctx.moveTo(pos.x * r, pos.y * r);
      ctx.lineTo(posChild.x * r, posChild.y * r);
      ctx.stroke();
    } else {
      var angleBegin = Math.atan2(posChild.y - centerOfCircle.y, posChild.x
          - centerOfCircle.x);
      var angleEnd = Math.atan2(pos.y - centerOfCircle.y, pos.x
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