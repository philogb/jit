Options.PieChart = {
  $extend: true,

  animate: true,
  offset: 25, // page offset
  sliceOffset:0,
  labelOffset: 3, // label offset
  type: 'stacked', // gradient
  hoveredColor: '#9fd4ff',
  Tips: {
    enable: false,
    onShow: $.empty,
    onHide: $.empty
  },
  showLabels: true,
  
  //only valid for mono-valued datasets
  updateHeights: false
};