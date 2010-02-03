/*
 * File: Options.js
 * 
 * Visualization common options.
 *
 * Description:
 *
 * Provides an Object with common visualization options
 * 
 * Implemented by:
 * 
 * <RGraph>, <Hypertree>, <TM>, <ST>.
 * 
 */

/*
 * Object: Options
 * 
 * Parent object for common Options.
 *
 */
var Options = function() {
  var args = Array.prototype.slice.call(arguments);
  for(var i=0, l=args.length, ans={}; i<l; i++) {
    var opt = Options[args[i]];
    if(opt.$extend) {
      $.extend(ans, opt);
    } else {
      ans[args[i]] = opt;  
    }
  }
  return ans;
};