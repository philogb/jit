/*
 * File: Options.AreaChart.js
 *
*/

/*
  Object: Options.AreaChart
  
  <AreaChart> options. 
  Other options included in the AreaChart are <Options.Canvas>, <Options.Label>, <Options.Margin>, <Options.Tips> and <Options.Events>.
  
  Syntax:
  
  (start code js)

  Options.AreaChart = {
    animate: true,
    labelOffset: 3,
    type: 'stacked',
    selectOnHover: true,
    showAggregates: true,
    showLabels: true,
    filterOnClick: false,
    restoreOnRightClick: false
  };
  
  (end code)
  
  Example:
  
  (start code js)

  var areaChart = new $jit.AreaChart({
    animate: true,
    type: 'stacked:gradient',
    selectOnHover: true,
    filterOnClick: true,
    restoreOnRightClick: true
  });
  
  (end code)

  Parameters:
  
  animate - (boolean) Default's *true*. Whether to add animated transitions when filtering/restoring stacks.
  labelOffset - (number) Default's *3*. Adds margin between the label and the default place where it should be drawn.
  type - (string) Default's *'stacked'*. Stack style. Posible values are 'stacked', 'stacked:gradient' to add gradients.
  selectOnHover - (boolean) Default's *true*. If true, it will add a mark to the hovered stack.
  showAggregates - (boolean, function) Default's *true*. Display the values of the stacks. Can also be a function that returns *true* or *false* to display or filter some values. That same function can also return a string with the formatted value.
  showLabels - (boolean, function) Default's *true*. Display the name of the slots. Can also be a function that returns *true* or *false* to display or not each label.
  filterOnClick - (boolean) Default's *true*. Select the clicked stack by hiding all other stacks.
  restoreOnRightClick - (boolean) Default's *true*. Show all stacks by right clicking.
  
*/
  
Options.AreaChart = {
  $extend: true,

  animate: true,
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