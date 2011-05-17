/*
 * File: Options.BarChart.js
 *
*/

/*
  Object: Options.BarChart
  
  <BarChart> options. 
  Other options included in the BarChart are <Options.Canvas>, <Options.Label>, <Options.Margin>, <Options.Tips> and <Options.Events>.
  
  Syntax:
  
  (start code js)

  Options.BarChart = {
    animate: true,
    labelOffset: 3,
    barsOffset: 0,
    type: 'stacked',
    hoveredColor: '#9fd4ff',
    orientation: 'horizontal',
    showAggregates: true,
    showLabels: true
  };
  
  (end code)
  
  Example:
  
  (start code js)

  var barChart = new $jit.BarChart({
    animate: true,
    barsOffset: 10,
    type: 'stacked:gradient'
  });
  
  (end code)

  Parameters:
  
  animate - (boolean) Default's *true*. Whether to add animated transitions when filtering/restoring stacks.
  offset - (number) Default's *25*. Adds margin between the visualization and the canvas.
  labelOffset - (number) Default's *3*. Adds margin between the label and the default place where it should be drawn.
  barsOffset - (number) Default's *0*. Separation between bars.
  type - (string) Default's *'stacked'*. Stack or grouped styles. Posible values are 'stacked', 'grouped', 'stacked:gradient', 'grouped:gradient' to add gradients.
  hoveredColor - (boolean|string) Default's *'#9fd4ff'*. Sets the selected color for a hovered bar stack.
  orientation - (string) Default's 'horizontal'. Sets the direction of the bars. Possible options are 'vertical' or 'horizontal'.
  showAggregates - (boolean, function) Default's *true*. Display the sum the values of each bar. Can also be a function that returns *true* or *false* to display the value of the bar or not. That same function can also return a string with the formatted data to be added.
  showLabels - (boolean, function) Default's *true*. Display the name of the slots. Can also be a function that returns *true* or *false* for each bar to decide whether to show the label or not.
  
*/

Options.BarChart = {
  $extend: true,
  
  animate: true,
  type: 'stacked', //stacked, grouped, : gradient
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
  },
  Events: {
    enable: false,
    onClick: $.empty
  }
};