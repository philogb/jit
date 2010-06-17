/*
 * File: Options.PieChart.js
 *
*/
/*
  Object: Options.PieChart
  
  <PieChart> options. 
  Other options included in the PieChart are <Options.Canvas>, <Options.Label>, <Options.Tips> and <Options.Events>.
  
  Syntax:
  
  (start code js)

  Options.PieChart = {
    animate: true,
    offset: 25,
    sliceOffset:0,
    labelOffset: 3,
    type: 'stacked',
    hoveredColor: '#9fd4ff',
    showLabels: true,
    resizeLabels: false,
    updateHeights: false
  };  

  (end code)
  
  Example:
  
  (start code js)

  var pie = new $jit.PieChart({
    animate: true,
    sliceOffset: 5,
    type: 'stacked:gradient'
  });  

  (end code)
  
  Parameters:
  
  animate - (boolean) Default's *true*. Whether to add animated transitions when plotting/updating the visualization.
  offset - (number) Default's *25*. Adds margin between the visualization and the canvas.
  sliceOffset - (number) Default's *0*. Separation between the center of the canvas and each pie slice.
  labelOffset - (number) Default's *3*. Adds margin between the label and the default place where it should be drawn.
  type - (string) Default's *'stacked'*. Stack style. Posible values are 'stacked', 'stacked:gradient' to add gradients.
  hoveredColor - (boolean|string) Default's *'#9fd4ff'*. Sets the selected color for a hovered pie stack.
  showLabels - (boolean) Default's *true*. Display the name of the slots.
  resizeLabels - (boolean|number) Default's *false*. Resize the pie labels according to their stacked values. Set a number for *resizeLabels* to set a font size minimum.
  updateHeights - (boolean) Default's *false*. Only for mono-valued (most common) pie charts. Resize the height of the pie slices according to their current values.

*/
Options.PieChart = {
  $extend: true,

  animate: true,
  offset: 25, // page offset
  sliceOffset:0,
  labelOffset: 3, // label offset
  type: 'stacked', // gradient
  hoveredColor: '#9fd4ff',
  Events: {
    enable: false,
    onClick: $.empty
  },
  Tips: {
    enable: false,
    onShow: $.empty,
    onHide: $.empty
  },
  showLabels: true,
  resizeLabels: false,
  
  //only valid for mono-valued datasets
  updateHeights: false
};