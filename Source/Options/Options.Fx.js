/*
 * File: Options.Fx.js
 *
*/

/*
  Object: Options.Fx

  Provides animation configuration options.

  Description:

  This object provides animation specific configuration options.
  
  These configuration parameters are currently used by <ST>, <RGraph> and <Hypertree>.
  
  These options are
  
     - _duration_ Duration of the animation in milliseconds. Default's 2500.
     - _fps_ Frames per second. Default's 40.
     - _transition_ One of the transitions defined in the <Animation> class. Default's Quart.easeInOut.
     - _clearCanvas_ Whether to clear canvas on each animation frame or not. Default's true.

*/
Options.Fx = {
  $extend: true, //TODO(nico): switch to false.
  
  fps:40,
  duration: 2500,
  transition: $jit.Trans.Quart.easeInOut,
  clearCanvas: true
};