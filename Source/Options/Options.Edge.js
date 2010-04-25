/*
  Object: Options.Edge

  Provides Edge options for <Canvas> based visualizations.

  Description:

  Edge options for <Canvas> based Graph visualizations.

  Implemented by:

  <ST>, <Hypertree>, <RGraph>

  These configuration parameters are currently used by <ST>, <RGraph> and <Hypertree>.

  This object has as properties

     - _overridable_ Determine whether or not edges properties can be overridden by a particular edge object. Default's false.

     If given a JSON _complex_ graph (defined in <Loader.loadJSON>), an adjacency _data_ property contains properties which are the same as defined here but prefixed with 
     a dollar sign (i.e $), the adjacency properties will override the global edge properties.

     - _type_ Edge type (shape). Default's "line" in the <RGraph> and <ST>, but "hyperline" in the <Hypertree> visualization.
     - _color_ Edge color. Default's '#ccb'.
     - _lineWidth_ Line width. If edges aren't drawn with strokes then this property won't be of any use. Default's 1.
     - _alpha_ The Edge's alpha value. Default's 1 (for full opacity).
     - _dim_ An extra parameter used by other complex shapes such as qudratic or bezier to determine the shape's diameter. Default's 15.

*/
Options.Edge = {
  $extend: false,
  
  overridable: false,
  type: 'line',
  color: '#ccb',
  lineWidth: 1,
  dim:15,
  alpha: 1,

  //Raw canvas styles to be
  //applied to the context instance
  //before plotting an edge
  Context: {}
};
