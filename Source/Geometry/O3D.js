/**
 * @author mr.doob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 */

var O3D = {};

$jit.O3D = O3D;

O3D.base = new Class({
  //array of { x, y, z } of float
  vertices: [],
  //array of { a, b, c, d? } of int
  faces: [],
  //updated on plotNode/plotEdge
  position: new Vector3,
  rotation: new Vector3,
  scale: new Vector3(1, 1, 1),
  //intrinsic coordinates
  matrix: new Matrix4,

  updateMatrix: function() {
    var pos = this.position,
        rot = this.rotation,
        scale = this.scale,
        matrix = this.matrix;
    
    matrix.identity();
  
    matrix.$multiply( Matrix4.translationMatrix( pos.x, pos.y, pos.z ) );
    matrix.$multiply( Matrix4.rotationXMatrix( rot.x ) );
    matrix.$multiply( Matrix4.rotationYMatrix( rot.y ) );
    matrix.$multiply( Matrix4.rotationZMatrix( rot.z ) );
    matrix.$multiply( Matrix4.scaleMatrix( scale.x, scale.y, scale.z ) );
  },
  //compute faces normals
  computeNormals: function () {
    for (var f=0, vs=this.vertices, fs=this.faces, len=fs.length; f < len; f++) {
      var va = vs[fs[f].a],
          vb = vs[fs[f].b],
          vc = vs[fs[f].c],
          cb = new Vector3,
          ab = new Vector3;
      
      cb.sub(vc, vb);
      ab.sub(va, vb);
      cb.$cross(ab);

      if (!cb.isZero()) cb.normalize();
      
      fs[f].normal = cb;
    }
  }
});

//IsoCube
function IsoCube() {
  var vs = this.vertices,
      f4 = this.faces,
      vsp = function(x, y, z) { vs.push({ x: x, y: y, z: z }); },
      f4p = function(a, b, c, d) { f4.push({ a: a, b: b, c: c, d: d }); };
  
  vsp( 1,  1, -1);
  vsp( 1, -1, -1);
  vsp(-1, -1, -1);
  vsp(-1,  1, -1);
  vsp( 1,  1,  1);
  vsp( 1, -1,  1);
  vsp(-1, -1,  1);
  vsp(-1,  1,  1);
  
  f4p(0, 1, 2, 3);
  f4p(4, 7, 6, 5);
  f4p(0, 4, 5, 1);
  f4p(1, 5, 6, 2);
  f4p(2, 6, 7, 3);
  f4p(4, 0, 3, 7);
}

//Cube
O3D.cube = new Class({
  Implements: O3D.base,
  
  initialize: function() {
    IsoCube.call(this);
    this.computeNormals();
  },
  
  update: function(obj) {
    var dim = obj.getData('dim'),
        pos = obj.pos;
    
    this.position.setc(pos.x, pos.y, pos.z);
    this.scale.setc(dim, dim, dim);
    this.updateMatrix();
  }
});

O3D.tube = new Class({
  Implements: O3D.base,
  
  numSegs: 20,
  dim: 1,
  
  initialize: function() {
    var vs = this.vertices,
        f4 = this.faces,
        vsp = function(x, y, z) { vs.push({ x: x, y: y, z: z }); },
        f4p = function(a, b, c, d) { f4.push({ a: a, b: b, c: c, d: d }); };

    var scope = this,
        sin = Math.sin,
        cos = Math.cos,
        pi = Math.PI,
        pi2 = pi * 2,
        numSegs = this.numSegs,
        topRad = this.dim,
        botRad = this.dim;
  
    // Top circle vertices
    for (var i = 0; i < numSegs; i++) {
      vsp(sin(pi2 * i / numSegs) * topRad, cos(pi2 * i / numSegs) * topRad, -0.5);
    }
    // Bottom circle vertices
    for (var i = 0; i < numSegs; i++) {
      vsp(sin(pi2 * i / numSegs) * botRad, cos(pi2 * i / numSegs) * botRad, 0.5);
    }
    // Faces
    // Body 
    for (var i = 0; i < numSegs; i++) {
      f4p(i, i + numSegs, numSegs + (i + 1) % numSegs, (i + 1) % numSegs);
    }
    // Bottom circle
    if (botRad != 0) {
      vsp(0, 0, -0.5);
      for (var i = numSegs; i < numSegs + (numSegs / 2); i++) {
        f4p(2 * numSegs,
        (2 * i - 2 * numSegs) % numSegs,
        (2 * i - 2 * numSegs + 1) % numSegs,
        (2 * i - 2 * numSegs + 2) % numSegs);
      }
    }
    // Top circle
    if (topRad != 0) {
      vsp(0, 0, 0.5);
      for (var i = numSegs + (numSegs / 2); i < 2 * numSegs; i++) {
        f4p((2 * i - 2 * numSegs + 2) % numSegs + numSegs,
          (2 * i - 2 * numSegs + 1) % numSegs + numSegs,
          (2 * i - 2 * numSegs) % numSegs+numSegs, 
          2 * numSegs + 1);
      }
    }
    this.computeNormals();
  },
  
  update: function(obj) {
    var lineWidth = obj.getData('lineWidth'),
        nodeFrom = obj.nodeFrom,
        nodeTo = obj.nodeTo,
        nodeFromPos = nodeFrom.pos,
        nodeToPos = nodeTo.pos,
        dist = nodeFromPos.distanceTo(nodeToPos),
        middle = new Vector3,
        currentDir = new Vector3(0, 0, 1),
        dvec = new Vector3;
    
    middle.add(nodeFromPos, nodeToPos).$scale(0.5);
    dvec.sub(nodeToPos, nodeFromPos).normalize();
    
    var c = dvec.dot(currentDir),
        t = 1 - c,
        rotAngle = Math.acos(c),
        s = Math.sin(rotAngle),
        rotAxis = currentDir.$cross(dvec).normalize(),
        x = rotAxis.x,
        y = rotAxis.y,
        z = rotAxis.z;
    
    var rot = new Matrix4();
    rot.n11 = t * x * x;
    rot.n12 = t * x * y - s * z;
    rot.n13 = t * x * z + s * y;
    rot.n21 = t * x * y + s * z;
    rot.n22 = t * y * y + c;
    rot.n23 = t * y * z - s * x;
    rot.n31 = t * x * z - s * y;
    rot.n32 = t * y * z + s * x;
    rot.n33 = t * z * z + c;
    
    this.rotationMatrix = rot;
    this.scale.setc(lineWidth, lineWidth, dist);
    this.position.setc(middle.x, middle.y, middle.z);
    this.updateMatrix();
  },
  
  updateMatrix: function() {
    var pos = this.position,
        scale = this.scale,
        matrix = this.matrix;
    
    matrix.identity();
  
    matrix.$multiply( Matrix4.translationMatrix( pos.x, pos.y, pos.z ) );
    matrix.$multiply( this.rotationMatrix );
    matrix.$multiply( Matrix4.scaleMatrix( scale.x, scale.y, scale.z ) );
  }

}); 
