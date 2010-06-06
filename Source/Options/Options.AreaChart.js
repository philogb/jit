/*
 * File: Options.AreaChart.js
 *
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
  selectOnHover: true,
  showAggregates: true,
  showLabels: true,
  filterOnClick: false,
  restoreOnRightClick: false
};