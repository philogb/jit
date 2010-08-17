/*
 * File: Options.Navigation.js
 *
*/

/*
  Object: Options.Navigation
  
  Panning and zooming options for Graph/Tree based visualizations. These options are implemented 
  by all visualizations except charts (<AreaChart>, <BarChart> and <PieChart>).
  
  Syntax:
  
  (start code js)

  Options.Navigation = {
    enable: false,
    type: 'auto',
    panning: false, //true, 'avoid nodes'
    zooming: false
  };
  
  (end code)
  
  Example:
    
  (start code js)
  var viz = new $jit.Viz({
    Navigation: {
      enable: true,
      panning: 'avoid nodes',
      zooming: 20
    }
  });
  (end code)
  
  Parameters:
  
  enable - (boolean) Default's *false*. Whether to enable Navigation capabilities.
  type - (string) Default's 'auto'. Whether to attach the navigation events onto the HTML labels (via event delegation) or to use the custom 'Native' canvas Event System of the library. When 'auto' set when you let the <Options.Label> *type* parameter decide this.
  panning - (boolean|string) Default's *false*. Set this property to *true* if you want to add Drag and Drop panning support to the visualization. You can also set this parameter to 'avoid nodes' to enable DnD panning but disable it if the DnD is taking place over a node. This is useful when some other events like Drag & Drop for nodes are added to <Graph.Nodes>.
  zooming - (boolean|number) Default's *false*. Set this property to a numeric value to turn mouse-scroll zooming on. The number will be proportional to the mouse-scroll sensitivity.
  
*/

Options.Navigation = {
  $extend: false,
  
  enable: false,
  type: 'auto',
  panning: false, //true | 'avoid nodes'
  zooming: false
};