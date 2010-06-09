/*
 * File: Options.BarChart.js
 *
*/

/*
  Object: Options.BarChart
  
  These are the options that you can use in the <BarChart> class. 
  Other options included in the BarChart are <Options.Canvas>, <Options.Label> and <Options.Tips>.
  
  Syntax:
  
  (start code js)

  Options.BarChart = {
    animate: true,
    offset: 25, 
    labelOffset: 3,
    barsOffset: 0,
    type: 'stacked',
    hoveredColor: '#9fd4ff',
    orientation: 'horizontal',
    showAggregates: true,
    showLabels: true
  };
  
  (end code)
  
  Parameters:
  
  animate - (boolean) Default's *true*. Whether to add animated transitions when filtering/restoring stacks.
  offset - (number) Default's *25*. Adds margin between the visualization and the canvas.
  labelOffset - (number) Default's *3*. Adds margin between the label and the default place where it should be drawn.
  barsOffset - (number) Default's *0*. Separation between bars.
  type - (string) Default's *'stacked'*. Stack style. Posible values are 'stacked', 'stacked:gradient' to add gradients.
  hoveredColor - (boolean|string) Default's *'#9fd4ff'*. Sets the selected color for a hovered bar stack.
  orientation - (string) Default's 'horizontal'. Sets the direction of the bars. Possible options are 'vertical' or 'horizontal'.
  showAggregates - (boolean) Default's *true*. Display the sum of the values of the different stacks.
  showLabels - (boolean) Default's *true*. Display the name of the slots.
  
*/

Options.BarChart = {
  $extend: true,
  
  animate: true,
  type: 'stacked', //stacked, grouped, : gradient
  offset: 25, //page offset
  labelOffset: 3, //label offset
  barsOffset: 0, //distance between bars
  hoveredColor: '#9fd4ff',
  orientation: 'horizontal',
  showAggregates: true,
  showLabels: true,
  Tips: {
    enable: false,
    onShow: $.empty,
    onHide: $.empty
  }
};