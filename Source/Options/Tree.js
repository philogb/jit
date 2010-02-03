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
    $extend: true,
    
    orientation: "left",
    subtreeOffset: 8,
    siblingOffset: 5,
    indent:10,
    multitree: false,
    align:"center"
};
