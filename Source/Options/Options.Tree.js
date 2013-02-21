/*
 * File: Options.Tree.js
 *
*/

/*
  Object: Options.Tree

  Options related to (strict) Tree layout algorithms. These options are used by the <ST> visualization.

  Syntax:

  (start code js)
  Options.Tree = {
    orientation: "left",
    subtreeOffset: 8,
    siblingOffset: 5,
    indent:10,
    multitree: false,
    align:"center"
  };
  (end code)

  Example:

  (start code js)
  var st = new $jit.ST({
    orientation: 'left',
    subtreeOffset: 1,
    siblingOFfset: 5,
    multitree: true
  });
  (end code)

  Parameters:

  subtreeOffset - (number) Default's 8. Separation offset between subtrees.
  siblingOffset - (number) Default's 5. Separation offset between siblings.
  orientation - (string) Default's 'left'. Tree orientation layout. Possible values are 'left', 'top', 'right', 'bottom'.
  align - (string) Default's *center*. Whether the tree alignment is 'left', 'center' or 'right'.
  indent - (number) Default's 10. Used when *align* is left or right and shows an indentation between parent and children.
  multitree - (boolean) Default's *false*. Used with the node $orn data property for creating multitrees.
  levelSpacing - (string) Whether each level is evenly spaced or level spacing is relative tothe size of the parent node. The former (which is the default) is 'even', the latter is 'parent'.

*/
Options.Tree = {
    $extend: true,

    orientation: "left",
    subtreeOffset: 8,
    siblingOffset: 5,
    indent:10,
    multitree: false,
    align:"center",
    levelSpacing: "even"
};
