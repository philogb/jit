/*
 * Class: Layouts.Icicle
 *
 * Implements the icicle tree layout.
 *
 * Implemented By:
 *
 * <Icicle>
 *
 */

Layouts.Icicle = new Class({
 /*
  * Method: compute
  *
  * Called by loadJSON to calculate all node positions.
  *
  * Parameters:
  *
  * posType - The nodes' position to compute. Either "start", "end" or
  *            "current". Defaults to "current".
  */
  compute: function(posType) {
    posType = posType || "current";

    var root = this.graph.getNode(this.root),
        config = this.config,
        size = this.canvas.getSize(),
        width = size.width,
        height = size.height,
        offset = config.offset,
        levelsToShow = config.constrained ? config.levelsToShow : Number.MAX_VALUE;

    this.controller.onBeforeCompute(root);

    Graph.Util.computeLevels(this.graph, root.id, 0, "ignore");

    var treeDepth = 0;

    Graph.Util.eachLevel(root, 0, false, function (n, d) { if(d > treeDepth) treeDepth = d; });

    var startNode = this.graph.getNode(this.clickedNode && this.clickedNode.id || root.id);
    var maxDepth = Math.min(treeDepth, levelsToShow-1);
    var initialDepth = startNode._depth;
    if(this.layout.horizontal()) {
      this.computeSubtree(startNode, -width/2, -height/2, width/(maxDepth+1), height, initialDepth, maxDepth, posType);
    } else {
      this.computeSubtree(startNode, -width/2, -height/2, width, height/(maxDepth+1), initialDepth, maxDepth, posType);
    }
  },

  computeSubtree: function (root, x, y, width, height, initialDepth, maxDepth, posType) {
    root.getPos(posType).setc(x, y);
    root.setData('width', width, posType);
    root.setData('height', height, posType);

    var nodeLength, prevNodeLength = 0, totalDim = 0;
    var children = Graph.Util.getSubnodes(root, [1, 1], 'ignore'); // next level from this node

    if(!children.length)
      return;

    $.each(children, function(e) { totalDim += e.getData('dim'); });

    for(var i=0, l=children.length; i < l; i++) {
      if(this.layout.horizontal()) {
        nodeLength = height * children[i].getData('dim') / totalDim;
        this.computeSubtree(children[i], x+width, y, width, nodeLength, initialDepth, maxDepth, posType);
        y += nodeLength;
      } else {
        nodeLength = width * children[i].getData('dim') / totalDim;
        this.computeSubtree(children[i], x, y+height, nodeLength, height, initialDepth, maxDepth, posType);
        x += nodeLength;
      }
    }
  }
});

