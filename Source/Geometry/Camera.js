/*
 * Camera class based on three.js http://github.com/mrdoob/three.js, Copyright (c) Mr.doob http://mrdoob.com/, MIT License http://github.com/mrdoob/three.js/blob/master/LICENSE 
 */

var Camera = function (fov, aspect, near, far) {
	this.projectionMatrix = Matrix4.makePerspective(fov, aspect, near, far);
};

Camera.prototype = {
  position: new Vector3,
  target: {
    position: new Vector3
  },
  up: new Vector3(0, 1, 0),
  matrix: new Matrix4,
  
  updateMatrix: function() {
    this.matrix.lookAt(this.position, this.target.position, this.up);
  }
};
