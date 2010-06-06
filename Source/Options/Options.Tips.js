/*
 * File: Options.Tips.js
 *
 */

/*
  Object: Options.Tips
  
  Options for Tips
  
  Description:
  
  Options for Tool Tips.
  
  Implemented by:
  
  <TM>

  These configuration parameters are currently used by <TM>.


  - _enable_ If *true*, a tooltip will be shown when a node is hovered. The tooltip is a div DOM element having "tip" as CSS class. Default's *false*. 
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
  $extend: false,
  
  enable: false,
  type: 'auto',
  offsetX: 20,
  offsetY: 20,
  force: false,
  onShow: $.empty,
  onHide: $.empty
};
