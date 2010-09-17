/*
 * Some of the geometries where inspired by three.js http://github.com/mrdoob/three.js, Copyright (c) Mr.doob http://mrdoob.com/, MIT License http://github.com/mrdoob/three.js/blob/master/LICENSE 
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
  
  update: function(elem) {
    if(elem.nodeFrom && elem.nodeTo) {
      this.updateEdge(elem);
    } else {
      this.updateNode(elem);
    }
  },
  
  updateNode: $.empty,
  
  updateEdge: function(elem) {
    this.updateNode(elem);
  },

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
  
  updateNode: function(obj) {
    var dim = obj.getData('dim'),
        pos = obj.pos;
    
    this.position.setc(pos.x, pos.y, pos.z);
    this.scale.setc(dim, dim, dim);
    this.updateMatrix();
  }
});

O3D.sphere = new Class({
  Implements: O3D.base,
  
  radius: 1,
  segments_width: 10,
  segments_height: 10,
  
  initialize: function() {
    var radius = this.radius,
        segments_width = this.segments_width,
        segments_height = this.segments_height,
        gridX = segments_width || 8,
        gridY = segments_height || 6,
        cos = Math.cos,
        sin = Math.sin,
        max = Math.max,
        pi = Math.PI;
  
    var iHor = max(3, gridX),
        iVer = max(2, gridY),
        aVtc = [];
  
    for(var j=0; j < (iVer + 1) ; j++) {
      var fRad1 = j / iVer,
          fZ = radius * cos(fRad1 * pi),
          fRds = radius * sin(fRad1 * pi),
          aRow = [],
          oVtx = 0;

      for(var i=0; i<iHor; i++) {
        var fRad2 = 2 * i / iHor,
            fX = fRds * Math.sin(fRad2 * pi),
            fY = fRds * Math.cos(fRad2 * pi);
        if (!(( j == 0 || j == iVer) && i > 0)) {
          oVtx = this.vertices.push({ x: fY, y: fZ, z: fX}) - 1;
        }
        aRow.push(oVtx);
      }
      aVtc.push(aRow);
    }
  
    var iVerNum = aVtc.length;
    for (var j=0; j<iVerNum; j++) {
      var iHorNum = aVtc[j].length;
      if (j > 0) {
        for (var i = 0; i<iHorNum; i++ ) {
          var bEnd = i == ( iHorNum - 1 );
          var aP1 = aVtc[j][ bEnd ? 0 : i + 1 ];
          var aP2 = aVtc[j][ ( bEnd ? iHorNum - 1 : i ) ];
          var aP3 = aVtc[j -1][ ( bEnd ? iHorNum - 1 : i ) ];
          var aP4 = aVtc[j -1][ bEnd ? 0 : i + 1 ];
  
          if(j < ( aVtc.length - 1)) {
            this.faces.push({ a: aP1, b: aP2, c: aP3 });
          }
          if(j > 1) {
            this.faces.push({ a: aP1, b: aP3, c: aP4 });
          }
        }
      }
    }
    this.computeNormals();
  },
  
  updateNode: function(obj) {
    var dim = obj.getData('dim'),
        pos = obj.pos;
    
    this.position.setc(pos.x, pos.y, pos.z);
    this.scale.setc(dim, dim, dim);
    this.updateMatrix();
  }

});


O3D.tube = new Class({
  Implements: O3D.base,
  
  numSegs: 10,
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
    // Body 
    for (var i = 0; i < numSegs; i++) {
      f4p(i, (i + 1) % numSegs, numSegs + (i + 1) % numSegs, i + numSegs);
    }
    this.computeNormals();
  },
  
  updateEdge: function(obj) {
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
        xc = dvec.dot(new Vector3(1, 0, 0)),
        yc = dvec.dot(new Vector3(0, 1, 0)),
        t = 1 - c,
        rotAngle = Math.acos(c),
        s = Math.sin(rotAngle),
        rotAxis = currentDir.$cross(dvec).normalize(),
        x = rotAxis.x,
        y = rotAxis.y,
        z = rotAxis.z;
    
    var rot = new Matrix4();
    rot.n11 = t * x * x + c;
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
