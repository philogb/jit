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
  //rotation: new Vector3,
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
    //matrix.$multiply( Matrix4.rotationXMatrix( rot.x ) );
    //matrix.$multiply( Matrix4.rotationYMatrix( rot.y ) );
    //matrix.$multiply( Matrix4.rotationZMatrix( rot.z ) );
    matrix.$multiply( Matrix4.scaleMatrix( scale.x, scale.y, scale.z ) );
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
  },
  
  update: function(obj) {
    var dim = obj.getData('dim'),
        pos = obj.pos;
    
    this.position.setc(pos.x, pos.y, pos.z);
    this.scale.setc(dim, dim, dim);
    this.updateMatrix();
  }
});
