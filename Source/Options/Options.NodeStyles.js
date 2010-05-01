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
  $extend: false,
  
  enable: false,
  type: 'auto',
  stylesHover: false,
  stylesClick: false,
  stylesRightClick: false,
  stylesDrag: false
};