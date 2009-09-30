/*
 * File: Options.js
 * 
 * Visualization common options.
 *
 * Description:
 *
 * Provides an Object with common visualization options
 * 
 * Implemented by:
 * 
 * <RGraph>, <Hypertree>, <TM>, <ST>.
 * 
 */

/*
 * Object: Options
 * 
 * Parent object for common Options.
 *
 */
var Options = {};

/*
  Object: Options.Controller
  
  Provides controller methods.
  
  Description:
  
  You can implement controller functions inside the configuration object of all visualizations.
  
  *Common to all visualizations*
    
   - _onBeforeCompute(node)_ This method is called right before performing all computation and animations to the JIT visualization.
   - _onAfterCompute()_ This method is triggered right after all animations or computations for the JIT visualizations ended.

  *Used in <Canvas> based visualizations <ST>, <Hypertree>, <RGraph>*

   - _onCreateLabel(domElement, node)_ This method receives the label dom element as first parameter, and the corresponding <Graph.Node> as second parameter. This method will only be called on label creation. Note that a <Graph.Node> is a node from the input tree/graph you provided to the visualization. If you want to know more about what kind of JSON tree/graph format is used to feed the visualizations, you can take a look at <Loader.loadJSON>. This method proves useful when adding events to the labels used by the JIT.
   - _onPlaceLabel(domElement, node)_ This method receives the label dom element as first parameter and the corresponding <Graph.Node> as second parameter. This method is called each time a label has been placed on the visualization, and thus it allows you to update the labels properties, such as size or position. Note that onPlaceLabel will be triggered after updating the labels positions. That means that, for example, the left and top css properties are already updated to match the nodes positions.
   - _onBeforePlotNode(node)_ This method is triggered right before plotting a given node. The _node_ parameter is the <Graph.Node> to be plotted. 
    This method is useful for changing a node style right before plotting it.
   - _onAfterPlotNode(node)_ This method is triggered right after plotting a given node. The _node_ parameter is the <Graph.Node> plotted.
   - _onBeforePlotLine(adj)_ This method is triggered right before plotting an edge. The _adj_ parameter is a <Graph.Adjacence> object. 
    This method is useful for adding some styles to a particular edge before being plotted.
   - _onAfterPlotLine(adj)_ This method is triggered right after plotting an edge. The _adj_ parameter is the <Graph.Adjacence> plotted.

   *Used in <TM> (Treemap) and DOM based visualizations*
    
   - _onCreateElement(content, node, isLeaf, elem1, elem2)_ This method is called on each newly created node. 
    
    Parameters:
     content - The div wrapper element with _content_ className.
     node - The corresponding JSON tree node (See also <Loader.loadJSON>).
     isLeaf - Whether is a leaf or inner node. If the node's an inner tree node, elem1 and elem2 will become the _head_ and _body_ div elements respectively. 
     If the node's a _leaf_, then elem1 will become the div leaf element.
    
    - _onDestroyElement(content, node, isLeaf, elem1, elem2)_ This method is called before collecting each node. Takes the same parameters as onCreateElement.
    
    *Used in <ST> and <TM>*
    
    - _request(nodeId, level, onComplete)_ This method is used for buffering information into the visualization. When clicking on an empty node,
    the visualization will make a request for this node's subtrees, specifying a given level for this subtree (defined by _levelsToShow_). Once the request is completed, the _onComplete_ 
    object should be called with the given result.
 
 */
Options.Controller = {  
  onBeforeCompute: $empty,
  onAfterCompute:  $empty,
  onCreateLabel:   $empty,
  onPlaceLabel:    $empty,
  onComplete:      $empty,
  onBeforePlotLine:$empty,
  onAfterPlotLine: $empty,
  onBeforePlotNode:$empty,
  onAfterPlotNode: $empty,
  onCreateElement: $empty,
  onDestroyElement:$empty,
  request:         false
};

/*
  Object: Options.Animation

  Provides animation configuration options.

  Description:

  This object provides animation specific configuration options.
  
  These configuration parameters are currently used by <ST>, <RGraph> and <Hypertree>.
  
  These options are
  
     - _duration_ Duration of the animation in milliseconds. Default's 2500.
     - _fps_ Frames per second. Default's 40.
     - _transition_ One of the transitions defined in the <Animation> class. Default's Quart.easeInOut.
     - _clearCanvas_ Whether to clear canvas on each animation frame or not. Default's true.

*/
Options.Animation = {
  fps:40,
  duration: 2500,
  transition: Trans.Quart.easeInOut,
  clearCanvas: true
};


/*
  Object: Options.Graph

  Provides Graph Options for <Canvas> based visualizations.
*/
Options.Graph = {};

/*
  Object: Options.Graph.Node

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
     - _aw_ Used for calculating node and subtrees angular widths. It's used only in <Layouts.Radial>.

*/
Options.Graph.Node = {
  overridable: false,
  type: 'circle',
  dim: 3,
  color: '#ccb',
  height: 20,
  width: 90,
  lineWidth: 1,
  transform: true,
  align: "center",
  alpha: 1,
  aw:1
};

/*
  Object: Options.Graph.Edge

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
Options.Graph.Edge = {
  overridable: false,
  type: 'line',
  color: '#ccb',
  lineWidth: 1,
  dim:15,
  alpha: 1
};


/*
  Object: Options.Tips
  
  Options for Tips
  
  Description:
  
  Options for Tool Tips.
  
  Implemented by:
  
  <TM>

  These configuration parameters are currently used by <TM>.


  - _allow_ If *true*, a tooltip will be shown when a node is hovered. The tooltip is a div DOM element having "tip" as CSS class. Default's *false*. 
  - _offsetX_ An offset added to the current tooltip x-position (which is the same as the current mouse position). Default's 20.
  - _offsetY_ An offset added to the current tooltip y-position (which is the same as the current mouse position). Default's 20.
  - _onShow(tooltip, node, isLeaf, domElement)_ Implement this method to change the HTML content of the tooltip when hovering a node.
  
  Parameters:
    tooltip - The tooltip div element.
    node - The corresponding JSON tree node (See also <Loader.loadJSON>).
    isLeaf - Whether is a leaf or inner node.
    domElement - The current hovered DOM element.

*/
Options.Tips = {
  allow: false,
  offsetX: 20,
  offsetY: 20,
  onShow: $empty
};

/*
  Object: Options.Tree
  
  Options related to (classic) Tree layout algorithms.
  
  Description:
  
  Options related to classic Tree layouts.
  
  Implemented by:
  
  <ST>
  
  
     - _subtreeOffset_ Separation offset between subtrees. Default's 8.
     - _siblingOffset_ Separation offset between siblings. Default's 5.
     - _orientation_ Sets the orientation layout. Implemented orientations are _left_ (the root node will be placed on the left side of the screen), _top_ (the root node will be placed on top of the screen), _bottom_ and _right_. Default's "left".
     - _align_ Whether the tree alignment is left, center or right.
     - _indent_ Used when _align_ is left or right and shows an indentation between parent and children. Default's 10.
     - _multitree_ Used with the a node $orn data property for creating multitrees.

*/
Options.Tree = {
    orientation: "left",
    subtreeOffset: 8,
    siblingOffset: 5,
    indent:10,
    multitree: false,
    align:"center"
};


/*
  Object: Options.NodeStyles
  
  Apply different styles when a node is hovered or selected.
  
  Description:
  
  Sets different node styles for nodes hovered or selected.
  
  Implemented by:
  
  <ForceDirected>
  
  Parameters:
  
  nodeStylesOnHover - An object with node styles or *false* otherwise. See <Options.Graph> for node styles.
  nodeStylesSelected - An object with node styles or *false* otherwise. See <Options.Graph> for node styles.
*/

Options.NodeStyles = {
  
  nodeStylesOnHover: false,
  nodeStylesSelected: false
};