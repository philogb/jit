/*
 * File: Options.AreaChart.js
 *
*/

/*
  Object: Options.AreaChart
  
  These are the options that you can use in the <AreaChart> class. 
  Other options included in the AreaChart are <Options.Canvas>, <Options.Label>, <Options.Tips> and <Options.Events>.
  
  Syntax:
  
  (start code js)

  Options.AreaChart = {
    animate: true,
    offset: 25,
    labelOffset: 3,
    type: 'stacked',
    selectOnHover: true,
    showAggregates: true,
    showLabels: true,
    filterOnClick: false,
    restoreOnRightClick: false
  };
  
  (end code)
  
  Parameters:
  
  animate - (boolean) Default's *true*. Whether to add animated transitions when filtering/restoring stacks.
  offset - (number) Default's *25*. Adds margin between the visualization and the canvas.
  labelOffset - (number) Default's *3*. Adds margin between the label and the default place where it should be drawn.
  type - (string) Default's *'stacked'*. Stack style. Posible values are 'stacked', 'stacked:gradient' to add gradients.
  selectOnHover - (boolean) Default's *true*. If true, it will add a mark to the hovered stack.
  showAggregates - (boolean) Default's *true*. Display the sum of the values of the different stacks.
  showLabels - (boolean) Default's *true*. Display the name of the slots.
  filterOnClick - (boolean) Default's *true*. Select the clicked stack by hiding all other stacks.
  restoreOnRightClick - (boolean) Default's *true*. Show all stacks by right clicking.
  
*/
  
Options.AreaChart = {
  $extend: true,

  animate: true,
  offset: 25, // page offset
  labelOffset: 3, // label offset
  type: 'stacked', // gradient
  Tips: {
    enable: false,
    onShow: $.empty,
    onHide: $.empty
  },
  Events: {
    enable: false,
    onClick: $.empty
  },
  selectOnHover: true,
  showAggregates: true,
  showLabels: true,
  filterOnClick: false,
  restoreOnRightClick: false
};