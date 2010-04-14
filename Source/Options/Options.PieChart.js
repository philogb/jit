Options.PieChart = {
  $extend: true,

  animate: true,
  offset: 25, // page offset
  labelOffset: 3, // label offset
  type: 'default', // gradient
  Tips: {
    enable: false,
    onShow: $.empty,
    onHide: $.empty
  },
  showLabels: true,
  
  //only valid for mono-valued datasets
  updateHeight: false
};