//Just a random tree generator.
var Feeder = {
	counter:0,
	
	p: {
		idPrefix: "node",
		levelStart: 0,
		levelEnd: 3,
		maxChildrenPerNode: 5,
    minChildrenPerNode: 1,
		counter: 0,
		color: true,
		dim: true
	},
	
	makeTree: function (p) {
		p = p || this.p;
		var le = this.p.levelEnd;
		if(le == 0) return {children: []};
		this.counter = 1;
		return this.makeTreeWithParameters(p.idPrefix,
										   p.levelStart,
										   p.levelEnd, 
										   p.maxChildrenPerNode,
                       p.minChildrenPerNode,
                       p.color,
                       p.dim);
	},
	
	makeTreeWithParameters: function(idPrefix, levelStart, levelEnd, maxChildrenPerNode, minChildrenPerNode, color, dim) {
		if(levelStart == levelEnd) return null;
		this.counter++;
		var numb = Math.floor(Math.random() * 10) + 1;
		var numb2 = Math.floor(Math.random() * 200 - 100);
		var data = {};
		data.$area = numb;
		if(dim) data.$dim = numb;
		if(color) data.$color = numb2;
		var ans= {
			id:   idPrefix + levelStart + this.counter,
			name: levelStart + "." + this.counter,
			data: data, 
			children: []
		};
		var childCount= Math.floor(Math.random() * maxChildrenPerNode) + minChildrenPerNode;
		levelStart++;
		for(var i=0; i<childCount; i++) {
			var ch= this.makeTreeWithParameters(idPrefix, levelStart, levelEnd, maxChildrenPerNode, minChildrenPerNode, color, dim);
			if(ch != null) ans.children[i]=ch;
		}
		return ans;
   },
 
    setWeights: function(tree, notRec) {
   		if(tree.children.length == 0) {
   			if(!notRec) 	return tree.data.$area;
   			tree.data.$area = 1;
        tree.data.$dim = 1;
   			return 1;
   		}
   		var accum= 0;
   		if(notRec) {
	   		for(var i=0; i<tree.children.length; i++) {
	   			this.setWeights(tree.children[i], notRec);
	   			accum += 1;//tree.children[i].data[0].value;
	   		}
   		} else {
	   		for(var i=0; i<tree.children.length; i++) {
	   			accum += this.setWeights(tree.children[i]);
	   		}
   		}
   		tree.data.$area = accum;
      tree.data.$dim = accum;
   		return accum;
   },
 
   request: function (nodeId, level, onComplete) {
   		this.p.idPrefix = nodeId;
   		this.p.levelEnd = level + 1;
   		var json = this.makeTree();
   		onComplete.onComplete(nodeId, json);
   }
}; 

var GraphGenerator = {
	counter:0,
	
	p: {
		idPrefix: "node",
		nodes: 6,
		connectionProbability: .5
	},
	
	makeGraph: function (weighted) {
		var ans = new Array();
		for(var i=0; i<this.p.nodes; i++) {
			var node = this.newNode(i);
			ans.push(this.newNode(i, weighted));
		}
		for(var j=0; j<this.p.nodes -1; j++) {
//			ans[j].adjacencies.push(ans[j +1].id);
//			ans[j +1].adjacencies.push(ans[j].id);
			
			for(var k=j +1; k<this.p.nodes; k++) {
				var w;
				if(Math.random() <= this.p.connectionProbability)
					w = 1;
				else
					w = 3;
					if(weighted) {
						ans[j].adjacencies.push({
							nodeTo: ans[k].id,
							data: {
								"$lineWidth": w
							}
						});
						ans[k].adjacencies.push({
							nodeTo: ans[j].id,
							data: {
								"$lineWidth": w
							}
						});
					} else {
						ans[j].adjacencies.push(ans[k].id);
						ans[k].adjacencies.push(ans[j].id);
					}
					passed = true;
//				}
			}
		}
		return ans;
	},
	
	newNode: function(i) {
		var id = this.p.idPrefix + i;
		return {
			"id":id,
			"name":id + " name",
			"data": {
                "$dim": Math.random() * 34 + 1,
                "some other key": "some other value"
            },
			"adjacencies": []
		};
	}
};