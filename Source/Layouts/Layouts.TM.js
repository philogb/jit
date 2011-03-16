/*
 * Class: Layouts.TM
 * 
 * Implements TreeMaps layouts (SliceAndDice, Squarified, Strip).
 * 
 * Implemented By:
 * 
 * <TM>
 * 
 */
Layouts.TM = {};

Layouts.TM.SliceAndDice = new Class({
  compute: function(prop) {
    var root = this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root);
    this.controller.onBeforeCompute(root);
    var size = this.canvas.getSize(),
        config = this.config,
        width = size.width,
        height = size.height;
    this.graph.computeLevels(this.root, 0, "ignore");
    //set root position and dimensions
    root.getPos(prop).setc(-width/2, -height/2);
    root.setData('width', width, prop);
    root.setData('height', height + config.titleHeight, prop);
    this.computePositions(root, root, this.layout.orientation, prop);
    this.controller.onAfterCompute(root);
  },
  
  computePositions: function(par, ch, orn, prop) {
    //compute children areas
    var totalArea = 0;
    par.eachSubnode(function(n) {
      totalArea += n.getData('area', prop);
    });
    
    var config = this.config,
        offst = config.offset,
        width  = par.getData('width', prop),
        height = Math.max(par.getData('height', prop) - config.titleHeight, 0),
        fact = par == ch? 1 : (ch.getData('area', prop) / totalArea);

    var otherSize, size, dim, pos, pos2, posth, pos2th;
    var horizontal = (orn == "h");
    if(horizontal) {
      orn = 'v';
      otherSize = height;
      size = width * fact;
      dim = 'height';
      pos = 'y';
      pos2 = 'x';
      posth = config.titleHeight;
      pos2th = 0;
    } else {
      orn = 'h';    
      otherSize = height * fact;
      size = width;
      dim = 'width';
      pos = 'x';
      pos2 = 'y';
      posth = 0;
      pos2th = config.titleHeight;
    }
    var cpos = ch.getPos(prop);
    ch.setData('width', size, prop);
    ch.setData('height', otherSize, prop);
    var offsetSize = 0, tm = this;
    ch.eachSubnode(function(n) {
      var p = n.getPos(prop);
      p[pos] = offsetSize + cpos[pos] + posth;
      p[pos2] = cpos[pos2] + pos2th;
      tm.computePositions(ch, n, orn, prop);
      offsetSize += n.getData(dim, prop);
    });
  }

});

Layouts.TM.Area = {
 /*
    Method: compute
 
   Called by loadJSON to calculate recursively all node positions and lay out the tree.
 
    Parameters:

       json - A JSON tree. See also <Loader.loadJSON>.
       coord - A coordinates object specifying width, height, left and top style properties.
 */
 compute: function(prop) {
    prop = prop || "current";
    var root = this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root);
    this.controller.onBeforeCompute(root);
    var config = this.config,
        size = this.canvas.getSize(),
        width = size.width,
        height = size.height,
        offst = config.offset,
        offwdth = width - offst,
        offhght = height - offst;
    this.graph.computeLevels(this.root, 0, "ignore");
    //set root position and dimensions
    root.getPos(prop).setc(-width/2, -height/2);
    root.setData('width', width, prop);
    root.setData('height', height, prop);
    //create a coordinates object
    var coord = {
        'top': -height/2 + config.titleHeight,
        'left': -width/2,
        'width': offwdth,
        'height': offhght - config.titleHeight
    };
    this.computePositions(root, coord, prop);
    this.controller.onAfterCompute(root);
 }, 
 
 /*
    Method: computeDim
 
   Computes dimensions and positions of a group of nodes
   according to a custom layout row condition. 
 
    Parameters:

       tail - An array of nodes.  
       initElem - An array of nodes (containing the initial node to be laid).
       w - A fixed dimension where nodes will be layed out.
       coord - A coordinates object specifying width, height, left and top style properties.
       comp - A custom comparison function
 */
 computeDim: function(tail, initElem, w, coord, comp, prop) {
   if(tail.length + initElem.length == 1) {
     var l = (tail.length == 1)? tail : initElem;
     this.layoutLast(l, w, coord, prop);
     return;
   }
   if(tail.length >= 2 && initElem.length == 0) {
     initElem = [tail.shift()];
   }
   if(tail.length == 0) {
     if(initElem.length > 0) this.layoutRow(initElem, w, coord, prop);
     return;
   }
   var c = tail[0];
   if(comp(initElem, w) >= comp([c].concat(initElem), w)) {
     this.computeDim(tail.slice(1), initElem.concat([c]), w, coord, comp, prop);
   } else {
     var newCoords = this.layoutRow(initElem, w, coord, prop);
     this.computeDim(tail, [], newCoords.dim, newCoords, comp, prop);
   }
 },

 
 /*
    Method: worstAspectRatio
 
   Calculates the worst aspect ratio of a group of rectangles. 
       
    See also:
       
       <http://en.wikipedia.org/wiki/Aspect_ratio>
   
    Parameters:

     ch - An array of nodes.  
     w  - The fixed dimension where rectangles are being laid out.

    Returns:
 
        The worst aspect ratio.


 */
 worstAspectRatio: function(ch, w) {
   if(!ch || ch.length == 0) return Number.MAX_VALUE;
   var areaSum = 0, maxArea = 0, minArea = Number.MAX_VALUE;
   for(var i=0, l=ch.length; i<l; i++) {
     var area = ch[i]._area;
     areaSum += area; 
     minArea = minArea < area? minArea : area;
     maxArea = maxArea > area? maxArea : area; 
   }
   var sqw = w * w, sqAreaSum = areaSum * areaSum;
   return Math.max(sqw * maxArea / sqAreaSum,
           sqAreaSum / (sqw * minArea));
 },
 
 /*
    Method: avgAspectRatio
 
   Calculates the average aspect ratio of a group of rectangles. 
       
       See also:
       
       <http://en.wikipedia.org/wiki/Aspect_ratio>
   
    Parameters:

     ch - An array of nodes.  
       w - The fixed dimension where rectangles are being laid out.

    Returns:
 
        The average aspect ratio.


 */
 avgAspectRatio: function(ch, w) {
   if(!ch || ch.length == 0) return Number.MAX_VALUE;
   var arSum = 0;
   for(var i=0, l=ch.length; i<l; i++) {
     var area = ch[i]._area;
     var h = area / w;
     arSum += w > h? w / h : h / w;
   }
   return arSum / l;
 },

 /*
    layoutLast
 
   Performs the layout of the last computed sibling.
 
    Parameters:

       ch - An array of nodes.  
       w - A fixed dimension where nodes will be layed out.
     coord - A coordinates object specifying width, height, left and top style properties.
 */
 layoutLast: function(ch, w, coord, prop) {
   var child = ch[0];
   child.getPos(prop).setc(coord.left, coord.top);
   child.setData('width', coord.width, prop);
   child.setData('height', coord.height, prop);
 }
};


Layouts.TM.Squarified = new Class({
 Implements: Layouts.TM.Area,
 
 computePositions: function(node, coord, prop) {
   var config = this.config, 
       max = Math.max;
   
   if (coord.width >= coord.height) 
     this.layout.orientation = 'h';
   else
     this.layout.orientation = 'v';
   
   var ch = node.getSubnodes([1, 1], "ignore");
   if(ch.length > 0) {
     this.processChildrenLayout(node, ch, coord, prop);
     for(var i=0, l=ch.length; i<l; i++) {
       var chi = ch[i], 
           offst = config.offset,
           height = max(chi.getData('height', prop) - offst - config.titleHeight, 0),
           width = max(chi.getData('width', prop) - offst, 0),
           chipos = chi.getPos(prop);

       coord = {
         'width': width,
         'height': height,
         'top': chipos.y + config.titleHeight,
         'left': chipos.x
       };
       this.computePositions(chi, coord, prop);
     }
   }
 },

 /*
    Method: processChildrenLayout
 
   Computes children real areas and other useful parameters for performing the Squarified algorithm.
 
    Parameters:

       par - The parent node of the json subtree.  
       ch - An Array of nodes
     coord - A coordinates object specifying width, height, left and top style properties.
 */
 processChildrenLayout: function(par, ch, coord, prop) {
   //compute children real areas
   var parentArea = coord.width * coord.height;
   var i, l=ch.length, totalChArea=0, chArea = [];
   for(i=0; i<l; i++) {
     chArea[i] = parseFloat(ch[i].getData('area', prop));
     totalChArea += chArea[i];
   }
   for(i=0; i<l; i++) {
     ch[i]._area = parentArea * chArea[i] / totalChArea;
   }
   var minimumSideValue = this.layout.horizontal()? coord.height : coord.width;
   ch.sort(function(a, b) { 
     var diff = b._area - a._area; 
     return diff? diff : (b.id == a.id? 0 : (b.id < a.id? 1 : -1)); 
   });
   var initElem = [ch[0]];
   var tail = ch.slice(1);
   this.squarify(tail, initElem, minimumSideValue, coord, prop);
 },

 /*
   Method: squarify
 
   Performs an heuristic method to calculate div elements sizes in order to have a good aspect ratio.
 
    Parameters:

       tail - An array of nodes.  
       initElem - An array of nodes, containing the initial node to be laid out.
       w - A fixed dimension where nodes will be laid out.
       coord - A coordinates object specifying width, height, left and top style properties.
 */
 squarify: function(tail, initElem, w, coord, prop) {
   this.computeDim(tail, initElem, w, coord, this.worstAspectRatio, prop);
 },
 
 /*
    Method: layoutRow
 
   Performs the layout of an array of nodes.
 
    Parameters:

       ch - An array of nodes.  
       w - A fixed dimension where nodes will be laid out.
       coord - A coordinates object specifying width, height, left and top style properties.
 */
 layoutRow: function(ch, w, coord, prop) {
   if(this.layout.horizontal()) {
     return this.layoutV(ch, w, coord, prop);
   } else {
     return this.layoutH(ch, w, coord, prop);
   }
 },
 
 layoutV: function(ch, w, coord, prop) {
   var totalArea = 0, rnd = function(x) { return x; }; 
   $.each(ch, function(elem) { totalArea += elem._area; });
   var width = rnd(totalArea / w), top =  0; 
   for(var i=0, l=ch.length; i<l; i++) {
     var h = rnd(ch[i]._area / width);
     var chi = ch[i];
     chi.getPos(prop).setc(coord.left, coord.top + top);
     chi.setData('width', width, prop);
     chi.setData('height', h, prop);
     top += h;
   }
   var ans = {
     'height': coord.height,
     'width': coord.width - width,
     'top': coord.top,
     'left': coord.left + width
   };
   //take minimum side value.
   ans.dim = Math.min(ans.width, ans.height);
   if(ans.dim != ans.height) this.layout.change();
   return ans;
 },
 
 layoutH: function(ch, w, coord, prop) {
   var totalArea = 0; 
   $.each(ch, function(elem) { totalArea += elem._area; });
   var height = totalArea / w,
       top = coord.top, 
       left = 0;
   
   for(var i=0, l=ch.length; i<l; i++) {
     var chi = ch[i];
     var w = chi._area / height;
     chi.getPos(prop).setc(coord.left + left, top);
     chi.setData('width', w, prop);
     chi.setData('height', height, prop);
     left += w;
   }
   var ans = {
     'height': coord.height - height,
     'width': coord.width,
     'top': coord.top + height,
     'left': coord.left
   };
   ans.dim = Math.min(ans.width, ans.height);
   if(ans.dim != ans.width) this.layout.change();
   return ans;
 }
});

Layouts.TM.Strip = new Class({
  Implements: Layouts.TM.Area,

    /*
      Method: compute
    
     Called by loadJSON to calculate recursively all node positions and lay out the tree.
    
      Parameters:
    
         json - A JSON subtree. See also <Loader.loadJSON>. 
       coord - A coordinates object specifying width, height, left and top style properties.
    */
    computePositions: function(node, coord, prop) {
     var  ch = node.getSubnodes([1, 1], "ignore"), 
          config = this.config,
          max = Math.max;
     if(ch.length > 0) {
       this.processChildrenLayout(node, ch, coord, prop);
       for(var i=0, l=ch.length; i<l; i++) {
         var chi = ch[i];
         var offst = config.offset,
             height = max(chi.getData('height', prop) - offst - config.titleHeight, 0),
             width  = max(chi.getData('width', prop)  - offst, 0);
         var chipos = chi.getPos(prop);
         coord = {
           'width': width,
           'height': height,
           'top': chipos.y + config.titleHeight,
           'left': chipos.x
         };
         this.computePositions(chi, coord, prop);
       }
     }
    },
    
    /*
      Method: processChildrenLayout
    
     Computes children real areas and other useful parameters for performing the Strip algorithm.
    
      Parameters:
    
         par - The parent node of the json subtree.  
         ch - An Array of nodes
         coord - A coordinates object specifying width, height, left and top style properties.
    */
    processChildrenLayout: function(par, ch, coord, prop) {
     //compute children real areas
      var parentArea = coord.width * coord.height;
      var i, l=ch.length, totalChArea=0, chArea = [];
      for(i=0; i<l; i++) {
        chArea[i] = +ch[i].getData('area', prop);
        totalChArea += chArea[i];
      }
      for(i=0; i<l; i++) {
        ch[i]._area = parentArea * chArea[i] / totalChArea;
      }
     var side = this.layout.horizontal()? coord.width : coord.height;
     var initElem = [ch[0]];
     var tail = ch.slice(1);
     this.stripify(tail, initElem, side, coord, prop);
    },
    
    /*
      Method: stripify
    
     Performs an heuristic method to calculate div elements sizes in order to have 
     a good compromise between aspect ratio and order.
    
      Parameters:
    
         tail - An array of nodes.  
         initElem - An array of nodes.
         w - A fixed dimension where nodes will be layed out.
       coord - A coordinates object specifying width, height, left and top style properties.
    */
    stripify: function(tail, initElem, w, coord, prop) {
     this.computeDim(tail, initElem, w, coord, this.avgAspectRatio, prop);
    },
    
    /*
      Method: layoutRow
    
     Performs the layout of an array of nodes.
    
      Parameters:
    
         ch - An array of nodes.  
         w - A fixed dimension where nodes will be laid out.
         coord - A coordinates object specifying width, height, left and top style properties.
    */
    layoutRow: function(ch, w, coord, prop) {
     if(this.layout.horizontal()) {
       return this.layoutH(ch, w, coord, prop);
     } else {
       return this.layoutV(ch, w, coord, prop);
     }
    },
    
    layoutV: function(ch, w, coord, prop) {
     var totalArea = 0; 
     $.each(ch, function(elem) { totalArea += elem._area; });
     var width = totalArea / w, top =  0; 
     for(var i=0, l=ch.length; i<l; i++) {
       var chi = ch[i];
       var h = chi._area / width;
       chi.getPos(prop).setc(coord.left, 
           coord.top + (w - h - top));
       chi.setData('width', width, prop);
       chi.setData('height', h, prop);
       top += h;
     }
    
     return {
       'height': coord.height,
       'width': coord.width - width,
       'top': coord.top,
       'left': coord.left + width,
       'dim': w
     };
    },
    
    layoutH: function(ch, w, coord, prop) {
     var totalArea = 0; 
     $.each(ch, function(elem) { totalArea += elem._area; });
     var height = totalArea / w,
         top = coord.height - height, 
         left = 0;
     
     for(var i=0, l=ch.length; i<l; i++) {
       var chi = ch[i];
       var s = chi._area / height;
       chi.getPos(prop).setc(coord.left + left, coord.top + top);
       chi.setData('width', s, prop);
       chi.setData('height', height, prop);
       left += s;
     }
     return {
       'height': coord.height - height,
       'width': coord.width,
       'top': coord.top,
       'left': coord.left,
       'dim': w
     };
    }
 });
