Options.BarChart = {
  $extend: true,
  
  animate: true,
  type: 'stacked', //stack, group, : gradient
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