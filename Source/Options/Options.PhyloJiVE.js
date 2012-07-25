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
  branchMultiplier: number of times to multiply the branch length. Used to space out the tree in horizontal direction.
  initCharacter: a flag to check if the leaves are assigned their character values
  shapes - css class names to distinguish different characters
     
*/
Options.PhyloJiVE = {
    $extend: true,
    
    alignName:false,
    lateralise:false,
    collapsedXOffset: 25,
		branchLength: true,
		levelDistance: 40,
		branchMultiplier: 1,
    initCharacter: false,
    firstCharacter: false,
    presentClade: $.empty,
    onPresentClade:$.empty,
    rangeCount: 10,
    shapes: ['box','star','square'],
    color: ['BlueViolet', 'Brown', 'CadetBlue', 'Coral', 'CornflowerBlue', 'Crimson', 'DarkCyan', 'DarkGoldenrod', 'DarkGreen', 'DarkKhaki', 'DarkOlive Green', 'DarkOrange', 'DarkRed', 'DarkSalmon', 'DarkSlateBlue', 'DarkSlateGray', 'DarkViolet', 'DeepPink', 'DimGray', 'DodgerBlue'],
    typeEnum: {quant:0,quali:1},
    quantColor: ['#00FFFF','#00DDFF','#00BBFF','#0099FF','#0088FF','#0077FF','#0055FF','#0044FF','#0022FF','#0000FF'],
    quantShape: 'quant',
    selectedCharacters: []
};
