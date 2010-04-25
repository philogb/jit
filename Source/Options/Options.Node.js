/*
  Object: Options.Node

  Provides Node options for <Canvas> based visualizations.

  Description:

  Node options for <Canvas> based visualizations.
  
  Implemented by:
  
  <ST>, <Hypertree>, <RGraph>

  These configuration parameters are currently used by <ST>, <RGraph> and <Hypertree>.

  These options are

     - _overridable_ Determine whether or not nodes properties can be overriden by a particular node. Default's false.

     If given a JSON tree or graph, a node _data_ property contains properties which are the same as defined here but prefixed with 
     a dollar sign (i.e $), the node properties will override the global node properties.

     - _type_ Node type (shape). Possible options are "none", "square", "rectangle", "circle", "triangle", "star". Default's "circle".
     - _color_ Node color. Default's '#ccb'.
     - _lineWidth_ Line width. If nodes aren't drawn with strokes then this property won't be of any use. Default's 1.
     - _alpha_ The Node's alpha value. Default's 1 (for full opacity).
     - _height_ Node height. Used for plotting rectangular nodes. Default's 20.
     - _width_ Node width. Used for plotting rectangular nodes. Default's 90.
     - _dim_ An extra parameter used by other complex shapes such as square and circle to determine the shape's diameter. Default's 3.
     - _transform_ *<Hypertree> only*. Whether to apply the moebius transformation to the nodes or not. Default's true.
     - _align_ *<ST> only*. Defines a node's alignment. Possible values are "center", "left", "right". Default's "center".
     - _angularWidth_ Used for calculating node and subtrees angular widths. It's used only in <Layouts.Radial>.

*/
Options.Node = {
  $extend: false,
  
  overridable: false,
  type: 'circle',
  color: '#ccb',
  alpha: 1,
  dim: 3,
  height: 20,
  width: 90,
  autoHeight: false,
  autoWidth: false,
  labelPadding: 0,
  lineWidth: 1,
  transform: true,
  align: "center",
  angularWidth:1,
  span:1,
  //Raw canvas styles to be
  //applied to the context instance
  //before plotting a node
  CanvasStyles: {}
};
