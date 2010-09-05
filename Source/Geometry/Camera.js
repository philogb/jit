/**
 * @author mr.doob / http://mrdoob.com/
 */

var Camera = function ( fov, aspect, near, far ) {

	this.position = new Vector3;
	this.target = { position: new Vector3 };

	this.projectionMatrix = Matrix4.makePerspective(fov, aspect, near, far);
	this.up = new Vector3(0, 1, 0);
	this.matrix = new Matrix4;

};

Camera.prototype = {
  updateMatrix: function() {
    this.matrix.lookAt(this.position, this.target.position, this.up);
  }
};
