/*
 * File: Layouts.ForceDirected.js
 *
*/

/** Prefuse have been ported and adapted to Javascript from the Prefuse Java
 * distribution (https://github.com/prefuse/Prefuse).
 *
 * Many original comments from the Prefuse code have been retained in the Javascript as
 * well as original author credit.
 *
 * Prefuse javascript written by Scott Yeadon at the Australian National University.
 */
 
/**
 * Class: QuadTreeNode
 *
 * Represents a node in the quadtree.
 *
 * Java source: <https://github.com/prefuse/Prefuse/blob/master/src/prefuse/util/force/NBodyForce.java>
 *
 * jeffrey heer <http://jheer.org">
 */
QuadTreeNode = new Class({
	com: [0.0, 0.0],
	children: [null, null, null, null],
	hasChildren: false,
	mass: null,
	fItem: null
});

/**
 * Class: QuadTreeNodeFactory
 *
 * Helper object to minimize number of object creations across multiple
 * uses of the quadtree.
 *
 * Java source: <https://github.com/prefuse/Prefuse/blob/master/src/prefuse/util/force/NBodyForce.java>
 *
 * jeffrey heer <http://jheer.org">
 */
QuadTreeNodeFactory = new Class({
	maxNodes: 50000,
	nodes: null,
	
	setup: function() {
		this.nodes = new Array();
	},
	
	getQuadTreeNode: function() {
		if (this.nodes.length > 0)
		{
			return this.nodes.pop();
		}
		else
		{
			return new QuadTreeNode();
		}
	},
	
	// n is a QuadTreeNode
	reclaim: function(n){
		n.mass = 0;
		n.com[0] = 0.0;
		n.com[1] = 0.0;
		n.fItem = null;
		n.hasChildren = false;
		n.children = [null, null, null, null];
		if (this.nodes.length < this.maxNodes)
		{
			this.nodes.push(n);
		}
	}
});

/**
 * Class: NBodyForce
 *
 * Force function which computes an n-body force such as gravity,
 * anti-gravity, or the results of electric charges. This function implements
 * the the Barnes-Hut algorithm for efficient n-body force simulations,
 * using a quad-tree with aggregated mass values to compute the n-body
 * force in O(N log N) time, where N is the number of ForceItems.
 * 
 * The algorithm used is that of J. Barnes and P. Hut, in their research
 * paper A Hierarchical O(n log n) force calculation algorithm, Nature, 
 * v.324, December 1986. For more details on the algorithm, see one of
 *  the following links --
 * 
 *   James Demmel's UC Berkeley lecture notes:
 * <http://www.cs.berkeley.edu/~demmel/cs267/lecture26/lecture26.html>
 *   Description of the Barnes-Hut algorithm:
 * <http://www.physics.gmu.edu/~large/lr_forces/desc/bh/bhdesc.html>
 *   Joshua Barnes' recent implementation
 * <href="http://www.ifa.hawaii.edu/~barnes/treecode/treeguide.html">
 * 
 * Java source: <https://github.com/prefuse/Prefuse/blob/master/src/prefuse/util/force/NBodyForce.java>
 *
 * jeffrey heer <http://jheer.org">
 */
NBodyForce = new Class({
	pnames: ["GravitationalConstant", "Distance", "BarnesHutTheta" ],

	DEFAULT_GRAV_CONSTANT: -1.0,
	DEFAULT_MIN_GRAV_CONSTANT: -10.0,
	DEFAULT_MAX_GRAV_CONSTANT: 10.0,

	DEFAULT_DISTANCE: -1.0,
	DEFAULT_MIN_DISTANCE: -1.0,
	DEFAULT_MAX_DISTANCE: 500.0,

	DEFAULT_THETA: 0.9,
	DEFAULT_MIN_THETA: 0.0,
	DEFAULT_MAX_THETA: 1.0,

	GRAVITATIONAL_CONST: 0,
	MIN_DISTANCE: 1,
	BARNES_HUT_THETA: 2,

	xMin: null, 
	xMax: null, 
	yMin: null, 
	yMax: null,
	
	params: null,
	minValues: null,
	maxValues: null,
	
	factory: null,
	root: null,
	
	setup: function(){
		this.params = [this.DEFAULT_GRAV_CONSTANT, this.DEFAULT_DISTANCE, this.DEFAULT_THETA]
		this.minValues = [this.DEFAULT_MIN_GRAV_CONSTANT, this.DEFAULT_MIN_DISTANCE, this.DEFAULT_MIN_THETA];
		this.maxValues = [this.DEFAULT_MAX_GRAV_CONSTANT, this.DEFAULT_MAX_DISTANCE, this.DEFAULT_MAX_THETA];

		this.factory = new QuadTreeNodeFactory();
		this.factory.setup();
		this.root = this.factory.getQuadTreeNode();
	},


	/**
	* Set the bounds of the region for which to compute the n-body simulation
	* xMin - the minimum x-coordinate
	* yMin - the minimum y-coordinate
	* xMax - the maximum x-coordinate
	* yMax - the maximum y-coordinate
	*/
	setBounds: function(xMin, yMin, xMax, yMax){
		this.xMin = xMin;
		this.yMin = yMin;
		this.xMax = xMax;
		this.yMax = yMax;
	},
	
	insertHelper: function(p, n, x1, y1, x2, y2){
		var x = p.location[0];
		var y = p.location[1];
		var splitx = (x1+x2)/2;
		var splity = (y1+y2)/2;
		var	i = (x>=splitx ? 1 : 0) + (y>=splity ? 2 : 0);
		// create new child node, if necessary
		if (n.children[i] == null)
		{
			n.children[i] = this.factory.getQuadTreeNode();
			n.hasChildren = true;
		}
		// update bounds
		if (i == 1 || i == 3)
		{
			x1 = splitx;
		}
		else
		{
			x2 = splitx;
		}
		
		if (i > 1)
		{
			y1 = splity;
		}
		else
		{
			y2 = splity;
		}
		
		// recurse
		this.insert(p, n.children[i], x1, y1, x2, y2);
	},
	
	isSameLocation: function(fItem1, fItem2){
		var dx = Math.abs(fItem1.location[0]-fItem2.location[0]);
		var dy = Math.abs(fItem1.location[1]-fItem2.location[1]);
		return (dx < 0.01 && dy < 0.01);
	},

	insert: function(p, n, x1, y1, x2, y2){
		// try to insert particle p at node n in the quadtree
		// by construction, each leaf will contain either 1 or 0 particles
		if (n.hasChildren)
		{
			// n contains more than 1 particle
			this.insertHelper(p, n, x1, y1, x2, y2);
		}
		else if (n.fItem != null)
		{
			// n contains 1 particle
			if (this.isSameLocation(n.fItem, p))
			{
				this.insertHelper(p, n, x1, y1, x2, y2);
			}
			else
			{
				var v = n.fItem;
				n.fItem = null;
				this.insertHelper(v, n, x1, y1, x2, y2);
				this.insertHelper(p, n, x1, y1, x2, y2);			
			}
		}
		else // n is empty, so is a leaf
		{
			n.fItem = p;
		}
	},

	calcMass: function(n){
		var xcom = 0;
		var ycom = 0;
		n.mass = 0;
		if (n.hasChildren)
		{
			for (var i=0; i < n.children.length; i++)
			{
				if (n.children[i] != null)
				{
					this.calcMass(n.children[i]);
					n.mass += n.children[i].mass;
					xcom += n.children[i].mass * n.children[i].com[0];
					ycom += n.children[i].mass * n.children[i].com[1];
				}
			}
		}
		
		if (n.fItem != null)
		{
			n.mass += n.fItem.mass;
			xcom += n.fItem.mass * n.fItem.location[0];
			ycom += n.fItem.mass * n.fItem.location[1];
		}
		
		n.com[0] = xcom / n.mass;
		n.com[1] = ycom / n.mass;
	},


	insertRoot: function(fItem){
		this.insert(fItem, this.root, this.xMin, this.yMin, this.xMax, this.yMax);
	},

	clearHelper: function(n){
		for (var i = 0; i < n.children.length; i++)
		{
			if (n.children[i] != null)
			{
				this.clearHelper(n.children[i]);
			}
		}
		this.factory.reclaim(n);
	},
		
	clear: function(){
		this.clearHelper(this.root);
		this.root = this.factory.getQuadTreeNode();
	},

	init: function(fSim){
		this.clear();
		
		var x1 = Number.MAX_VALUE;
		var y1 = Number.MAX_VALUE;
		var x2 = Number.MIN_VALUE;
		var y2 = Number.MIN_VALUE;
		
		for (var i = 0; i < fSim.items.length; i++)
		{
			var x = fSim.items[i].location[0];
			var y = fSim.items[i].location[1];

			if (x < x1) x1 = x;
			if (y < y1) y1 = y;
			if (x > x2) x2 = x;
			if (y > y2) y2 = y;
		}
		var dx = x2-x1;
		var dy = y2-y1;
		if (dx > dy)
		{
			y2 = y1 + dx;
		}
		else
		{
			x2 = x1 + dy;
		}
		this.setBounds(x1, y1, x2, y2);

		for (var i = 0; i < fSim.items.length; i++)
		{
			this.insertRoot(fSim.items[i]);
		}

		// calculate magnitudes and centers of mass
		this.calcMass(this.root);
	},

 	/**
	* Updates the force calculation on the given ForceItem.
 	*/	
	getForce: function(fItem){
		this.forceHelper(fItem, this.root, this.xMin, this.yMin, this.xMax, this.yMax);
	},
	
	forceHelper: function(item, n, x1, y1, x2, y2){
		var dx = n.com[0] - item.location[0];
		var dy = n.com[1] - item.location[1];
		var r = Math.sqrt(dx*dx+dy*dy);
		var same = false;
		
		if (r == 0.0)
		{
			dx = (Math.random()-0.5) / 50.0;
			dy = (Math.random()-0.5) / 50.0;
			r = Math.sqrt(dx*dx+dy*dy);
			same = true;
		}
		
		var minDist = this.params[this.MIN_DISTANCE] > 0 && r > this.params[this.MIN_DISTANCE];
		
		// the Barnes-Hut approximation criteria is if the ratio of the
		// size of the quadtree box to the distance between the point and
		// the box's center of mass is beneath some threshold theta.
		if ((!n.hasChildren && n.fItem != item) || (!same && (x2 - x1)/r < this.params[this.BARNES_HUT_THETA]))
		{
			if (minDist)
			{
				return;
			}
			var v = this.params[this.GRAVITATIONAL_CONST]*item.mass*n.mass / (r*r*r);
			item.force[0] += v*dx;
			item.force[1] += v*dy;
		}
 		else if (n.hasChildren)
 		{
 			// recurse for more accurate calculation
 			var splitx = (x1+x2)/2;
 			var splity = (y1+y2)/2;
 			for (var i = 0; i < n.children.length; i++)
 			{
 				if (n.children[i] != null)
 				{
 					this.forceHelper(item, n.children[i], (i==1||i==3?splitx:x1), (i>1?splity:y1), (i==1||i==3?x2:splitx), (i>1?y2:splity));
 				}
 			}
 			
 			if (minDist)
 			{
 				return;
 			}
 			
 			if (n.fItem != null && n.fItem != item)
 			{
 				var v = this.params[this.GRAVITATIONAL_CONST]*item.mass*n.fItem.mass / (r*r*r);
 				item.force[0] += v*dx;
 				item.force[1] += v*dy;
 			}
 		}
 	}
});

/**
 * Class: SpringForce
 *
 * Force function that computes the force acting on ForceItems due to a
 * given Spring.
 * 
 * Java source: 
<https://github.com/prefuse/Prefuse/blob/master/src/prefuse/util/force/SpringForce.java>
 *
 * jeffrey heer <http://jheer.org">
 */
SpringForce = new Class({
	pnames: ["SpringCoefficient", "DefaultSpringLength"],
	
	DEFAULT_SPRING_COEFF: 1e-4,
	DEFAULT_MAX_SPRING_COEFF: 1e-3,
	DEFAULT_MIN_SPRING_COEFF: 1e-5,
	DEFAULT_SPRING_LENGTH: 50,
	DEFAULT_MIN_SPRING_LENGTH: 0,
	DEFAULT_MAX_SPRING_LENGTH: 200,
	SPRING_COEFF: 0,
	SPRING_LENGTH: 1,
	
	params: null,
	minValues: null,
	maxValues: null,
	
	setup: function(){
		this.params = [this.DEFAULT_SPRING_COEFF, this.DEFAULT_SPRING_LENGTH];
		this.minValues = [this.DEFAULT_MIN_SPRING_COEFF, this.DEFAULT_MIN_SPRING_LENGTH];
		this.maxValues = [this.DEFAULT_MAX_SPRING_COEFF, this.DEFAULT_MAX_SPRING_LENGTH];
	},
	
	/**
	* Calculates the force vector acting on the items due to the given spring.
	* Updates the force calculation on the given Spring. The ForceItems attached to
	* Spring will have their force values updated appropriately.
	* s - the Spring on which to compute updated forces
	*/
	getForce: function(s){
		var fItem1 = s.item1;
		var fItem2 = s.item2;
		var length = (s.length < 0 ? this.params[this.SPRING_LENGTH] : s.length);
		var x1 = fItem1.location[0];
		var y1 = fItem1.location[1];
		var x2 = fItem2.location[0];
		var y2 = fItem2.location[1];
		var dx = x2-x1;
		var dy = y2-y1;
		var r = Math.sqrt(dx*dx+dy*dy);
		if (r == 0.0)
		{
			dx = (Math.random()-0.5) / 50.0;
			dy = (Math.random()-0.5) / 50.0;
			r = Math.sqrt(dx*dx+dy*dy);
		}
		var d = r - length;
		var coeff = (s.coeff < 0 ? this.params[this.SPRING_COEFF] : s.coeff)*d/r;
		fItem1.force[0] += coeff*dx;
		fItem1.force[1] += coeff*dy;
		fItem2.force[0] += -coeff*dx;
		fItem2.force[1] += -coeff*dy;
	},
	
	init: function(){
	}
});

/**
 * Class: DragForce
 *
 * Implements a viscosity/drag force to help stabilize items.
 *
 * Java source: 
<https://github.com/prefuse/Prefuse/blob/master/src/prefuse/util/force/DragForce.java>
 * 
 * jeffrey heer <http://jheer.org">
 */
DragForce = new Class({
	pnames: ["DragCoefficient"],
	
	DEFAULT_DRAG_COEFF: 0.01,
	DEFAULT_MIN_DRAG_COEFF: 0.0,
	DEFAULT_MAX_DRAG_COEFF: 0.1,
	DRAG_COEFF: 0,
	
	params: null,
	minValues: null,
	maxValues: null,
	
	setup: function(){
		this.params = [this.DEFAULT_DRAG_COEFF];
		this.minValues = [this.DEFAULT_MIN_DRAG_COEFF];
		this.maxValues = [this.DEFAULT_MAX_DRAG_COEFF];
	},
	
	getForce: function(fItem){
		fItem.force[0] -= this.params[this.DRAG_COEFF]*fItem.velocity[0];
		fItem.force[1] -= this.params[this.DRAG_COEFF]*fItem.velocity[1];
	},
	
	init: function(){
	}
});

/**
 * Class: RungeKuttaIntegrator
 *
 * Updates velocity and position data using the 4th-Order Runge-Kutta method.
 * It is slower but more accurate than other techniques such as Euler's Method.
 * The technique requires re-evaluating forces 4 times for a given timestep.
 *
 * Java source: 
<https://github.com/prefuse/Prefuse/blob/master/src/prefuse/util/force/RungeKuttaIntegrator.java>
 *
 * jeffrey heer <http://jheer.org">
 */
RungeKuttaIntegrator = new Class({
	integrate: function(sim, timestep){
		var speedLimit = sim.speedLimit;
		var vx, vy, v, coeff;
		var k, l

		for (var i = 0; i < sim.items.length; i++)
		{
			var item = sim.items[i];
			coeff = timestep / item.mass;
			k = item.k;
			l = item.l;
			item.plocation[0] = item.location[0];
			item.plocation[1] = item.location[1];
			k[0][0] = timestep*item.velocity[0];
			k[0][1] = timestep*item.velocity[1];
			l[0][0] = coeff*item.force[0];
			l[0][1] = coeff*item.force[1];
		
			// Set the position to the new predicted position
			item.location[0] += 0.5*k[0][0];
			item.location[1] += 0.5*k[0][1];
		}
		
		// recalculate forces
		sim.accumulate();

		for (var i = 0; i < sim.items.length; i++)
		{
			var item = sim.items[i];
			coeff = timestep / item.mass;
			k = item.k;
			l = item.l;
			vx = item.velocity[0] + 0.5*l[0][0];
			vy = item.velocity[1] + 0.5*l[0][1];
			v = Math.sqrt(vx*vx+vy*vy);
			if (v > speedLimit)
			{
				vx = speedLimit * vx / v;
				vy = speedLimit * vy / v;
			}

			k[1][0] = timestep*vx;
			k[1][1] = timestep*vy;
			l[1][0] = coeff*item.force[0];
			l[1][1] = coeff*item.force[1];
		
			// Set the position to the new predicted position
			item.location[0] = item.plocation[0] + 0.5*k[1][0];
			item.location[1] = item.plocation[1] + 0.5*k[1][1];
		}

		// recalculate forces
		sim.accumulate();

		for (var i = 0; i < sim.items.length; i++)
		{
			var item = sim.items[i];
			coeff = timestep / item.mass;
			k = item.k;
			l = item.l;
			vx = item.velocity[0] + 0.5*l[1][0];
			vy = item.velocity[1] + 0.5*l[1][1];
			v = Math.sqrt(vx*vx+vy*vy);
			if (v > speedLimit)
			{
				vx = speedLimit * vx / v;
				vy = speedLimit * vy / v;
			}
			k[2][0] = timestep*vx;
			k[2][1] = timestep*vy;
			l[2][0] = coeff*item.force[0];
			l[2][1] = coeff*item.force[1];
	
			// Set the position to the new predicted position
			item.location[0] = item.plocation[0] + 0.5*k[2][0];
			item.location[1] = item.plocation[1] + 0.5*k[2][1];
		}
		
		// recalculate forces
		sim.accumulate();

		for (var i = 0; i < sim.items.length; i++)
		{
			var item = sim.items[i];
			coeff = timestep / item.mass;
			k = item.k;
			l = item.l;
			var p = item.plocation;
			vx = item.velocity[0] + l[2][0];
			vy = item.velocity[1] + l[2][1];
			v = Math.sqrt(vx*vx+vy*vy);
			if (v > speedLimit)
			{
				vx = speedLimit * vx / v;
				vy = speedLimit * vy / v;
			}
			k[3][0] = timestep*vx;
			k[3][1] = timestep*vy;
			l[3][0] = coeff*item.force[0];
			l[3][1] = coeff*item.force[1];
			item.location[0] = p[0] + (k[0][0]+k[3][0])/6.0 + (k[1][0]+k[2][0])/3.0;
			item.location[1] = p[1] + (k[0][1]+k[3][1])/6.0 + (k[1][1]+k[2][1])/3.0;
			
			vx = (l[0][0]+l[3][0])/6.0 + (l[1][0]+l[2][0])/3.0;
			vy = (l[0][1]+l[3][1])/6.0 + (l[1][1]+l[2][1])/3.0;
			v = Math.sqrt(vx*vx+vy*vy);
			if (v > speedLimit)
			{
				vx = speedLimit * vx / v;
				vy = speedLimit * vy / v;
			}
			item.velocity[0] += vx;
			item.velocity[1] += vy;
		}
	}
});

/**
 * Class: ForceSimulator
 *
 * Manages a simulation of physical forces acting on bodies using N-body, Drag and 
 * Spring forces with a Runge-Kutta integrator.
 *
 * Java source: <https://github.com/prefuse/Prefuse/blob/master/src/prefuse/util/force/ForceSimulator.java>
 *
 * jeffrey heer <http://jheer.org">
 */
ForceSimulator = new Class({
	speedLimit: 1.0,
	iflen: 0,
	sflen: 0,
	integrator: null,
	items: null,
	springs: null,
	iforces: null,
	sforces: null,
	
	setup: function(){
		this.items = new Array();
		this.springs = new Array();
		this.iforces = new Array();
		this.sforces = new Array();
		this.integrator = new RungeKuttaIntegrator();
	},
	
	accumulate: function(){
		for (var i = 0; i < this.iforces.length; i++)
		{
			this.iforces[i].init(this);
		}
		
		for (var i = 0; i < this.sforces.length; i++)
		{
			this.sforces[i].init(this);
		}
		
		for (var i = 0; i < this.items.length; i++)
		{
			this.items[i].force[0] = 0.0;
			this.items[i].force[1] = 0.0;
			for (var j = 0; j < this.iforces.length; j++)
			{
				this.iforces[j].getForce(this.items[i]);
			}
		}
		
		for (var i = 0; i < this.springs.length; i++)
		{
			for (var j = 0; j < this.sforces.length; j++)
			{
				this.sforces[j].getForce(this.springs[i]);
			}
		}
	},
	
	runSimulator: function(timestep){
		this.accumulate();
		this.integrator.integrate(this, timestep);
	},
	
	addForce: function(f, itemForce){
		if (itemForce)
		{
			this.iforces.push(f);
			this.iflen++;
		}
		else
		{
			this.sforces.push(f);
			this.sflen++;
		}
	},
	
	addItem: function(fItem){
		this.items.push(fItem);
	},
	
	addSpring: function(spring){
		this.springs.push(spring);
	},
});

/**
 * Class: Spring
 *
 * Represents a spring in a force simulation.
 *
 * Java source: <https://github.com/prefuse/Prefuse/blob/master/src/prefuse/util/force/Spring.java>
 *
 * jeffrey heer <http://jheer.org">
 */
Spring = new Class({
	item1: null,
	item2: null,
	coeff: null,
	length: null,
	
	setup: function(fItem1, fItem2, coeff, len){
		this.item1 = fItem1;
		this.item2 = fItem2;
		this.coeff = coeff;
		this.length = len;
	}
});

/**
 * Class: ForceItem
 *
 * Represents a point particle in a force simulation, maintaining values for
 * mass, forces, velocity, and position.
 *
 * Java source: <https://github.com/prefuse/Prefuse/blob/master/src/prefuse/util/force/ForceItem.java>
 *
 * jeffrey heer <http://jheer.org">
 */
ForceItem = new Class({
	mass: 1.0,
	force: null,
	velocity: null,
	location: null,
	plocation: null,
	k: [[0,0], [0,0], [0,0], [0,0]],
	l: [[0,0], [0,0], [0,0], [0,0]],
	
	setup: function(){
		this.force = new Array();
		this.velocity = new Array();
		this.location = new Array();
		this.plocation = new Array();
	},

	init: function(xLoc, yLoc){
		this.force[0] = 0;
		this.force[1] = 0;
		this.velocity[0] = 0;
		this.velocity[1] = 0;
		this.location[0] = xLoc;
		this.location[1] = yLoc;
		this.plocation[0] = 0;
		this.plocation[1] = 0;
	}
});

/*
 * Class: Layouts.ForceDirected
 * 
 * Implements a Force Directed Layout.
 * 
 * Implemented By:
 * 
 * <ForceDirected>
 * 
 * Credits:
 * 
 * Marcus Cobden <http://marcuscobden.co.uk>
 * 
 */
Layouts.ForceDirected = new Class({

  getOptions: function(random) {
    var s = this.canvas.getSize();
    var w = s.width, h = s.height;
    //count nodes
    var count = 0;
    this.graph.eachNode(function(n) { 
      count++;
    });
    var k2 = w * h / count, k = Math.sqrt(k2);
    var l = this.config.levelDistance;
    
    return {
      width: w - l,
      height: h - l,
      tstart: w * 0.1,
      nodef: function(x) { return k2 / (x || 1); },
      edgef: function(x) { return /* x * x / k; */ k * (x - l); }
    };
  },
  
  compute: function(property, incremental) {
    var prop = $.splat(property || ['current', 'start', 'end']);
    var opt = this.getOptions();
    NodeDim.compute(this.graph, prop, this.config);
    this.graph.computeLevels(this.root, 0, "ignore");
    this.graph.eachNode(function(n) {
      $.each(prop, function(p) {
        var pos = n.getPos(p);
        if(pos.equals(Complex.KER)) {
          pos.x = opt.width/5 * (Math.random() - 0.5);
          pos.y = opt.height/5 * (Math.random() - 0.5);
        }
        //initialize disp vector
        n.disp = {};
        $.each(prop, function(p) {
          n.disp[p] = $C(0, 0);
        });
      });
    });
    this.computePositions(prop, opt, incremental);
  },
  
  computePositions: function(property, opt, incremental) {
    var times = this.config.iterations, i = 0, that = this;
    if(incremental) {
      (function iter() {
        for(var total=incremental.iter, j=0; j<total; j++) {
          opt.t = opt.tstart;
          if(times) opt.t *= (1 - i++/(times -1));
          that.computePositionStep(property, opt);
          if(times && i >= times) {
            incremental.onComplete();
            return;
          }
        }
        incremental.onStep(Math.round(i / (times -1) * 100));
        setTimeout(iter, 1);
      })();
    } else {
      for(; i < times; i++) {
        opt.t = opt.tstart * (1 - i/(times -1));
        this.computePositionStep(property, opt);
      }
    }
  },
  
  computePositionStep: function(property, opt) {
    var graph = this.graph;
    var min = Math.min, max = Math.max;
    var dpos = $C(0, 0);
    //calculate repulsive forces
    graph.eachNode(function(v) {
      //initialize disp
      $.each(property, function(p) {
        v.disp[p].x = 0; v.disp[p].y = 0;
      });
      graph.eachNode(function(u) {
        if(u.id != v.id) {
          $.each(property, function(p) {
            var vp = v.getPos(p), up = u.getPos(p);
            dpos.x = vp.x - up.x;
            dpos.y = vp.y - up.y;
            var norm = dpos.norm() || 1;
            v.disp[p].$add(dpos
                .$scale(opt.nodef(norm) / norm));
          });
        }
      });
    });
    //calculate attractive forces
    var T = !!graph.getNode(this.root).visited;
    graph.eachNode(function(node) {
      node.eachAdjacency(function(adj) {
        var nodeTo = adj.nodeTo;
        if(!!nodeTo.visited === T) {
          $.each(property, function(p) {
            var vp = node.getPos(p), up = nodeTo.getPos(p);
            dpos.x = vp.x - up.x;
            dpos.y = vp.y - up.y;
            var norm = dpos.norm() || 1;
            node.disp[p].$add(dpos.$scale(-opt.edgef(norm) / norm));
            nodeTo.disp[p].$add(dpos.$scale(-1));
          });
        }
      });
      node.visited = !T;
    });
    //arrange positions to fit the canvas
    var t = opt.t, w2 = opt.width / 2, h2 = opt.height / 2;
    graph.eachNode(function(u) {
      $.each(property, function(p) {
        var disp = u.disp[p];
        var norm = disp.norm() || 1;
        var p = u.getPos(p);
        p.$add($C(disp.x * min(Math.abs(disp.x), t) / norm, 
            disp.y * min(Math.abs(disp.y), t) / norm));
        p.x = min(w2, max(-w2, p.x));
        p.y = min(h2, max(-h2, p.y));
      });
    });
  },
  
  // Prefuse layout computation
  computeFast: function(property, incremental){
  	var sim = new ForceSimulator();
  	sim.setup();
  	var nbody = new NBodyForce();
  	nbody.setup();
  	var spring =  new SpringForce();
  	spring.setup();
  	var drag = new DragForce();
  	drag.setup();
  	sim.addForce(nbody, true);
  	sim.addForce(spring, false);
  	sim.addForce(drag, true);
    var timestep = 1000;
    var prop = $.splat(property || ['current', 'start', 'end']);
    var opt = this.getOptions();
    var adjDone = [];
    NodeDim.compute(this.graph, prop, this.config);
    this.graph.computeLevels(this.root, 0, "ignore");
    this.graph.eachNode(function(n) {
      $.each(prop, function(p) {
        var pos = n.getPos(p);
        pos.x = opt.width/2;
        pos.y = opt.height/2;
		n.forceItem = new ForceItem();
		n.forceItem.setup();
		n.forceItem.init(pos.x, pos.y);
		sim.addItem(n.forceItem);
		
        //initialize disp vector
        n.disp = {};
        $.each(prop, function(p) {
          n.disp[p] = $C(0, 0);
        });
	  });
	});

    this.graph.eachNode(function(n) {
      	n.eachAdjacency(function(adj){
			if (adjDone[adj.nodeTo.id] === undefined)
			{
				var s = new Spring();
				s.setup(adj.nodeFrom.forceItem, adj.nodeTo.forceItem, -1, -1);
				sim.addSpring(s);
				adjDone[adj.nodeFrom.id] = [];
				adjDone[adj.nodeFrom.id][adj.nodeTo.id] = true;
			}
		});
	});

	var numTimes = Math.ceil(this.config.iterations/incremental.iter);
	var iterCount = 0;
	var timesCount = 0;
	var times = this.config.iterations;
	var i = 0;
	var graph = this.graph;
	
   (function iter(){
        for(var total=incremental.iter, j=0; j<total; j++)
		{
			opt.t = opt.tstart;
			if (times) opt.t *= (1 - i++/(times -1));
			timestep *= (1.0 - i/times);
			var step = timestep+50;
			sim.runSimulator(step);
			if(times && i >= times)
			{
				var x1 = 0;
				var y1 = 0;
				var x2 = opt.width/2;
				var y2 = opt.height/2;
 
				graph.eachNode(function(n){
				  $.each(prop, function(p) {
					var x = n.forceItem.location[0];
					var y = n.forceItem.location[1];
					var hw = n.getData("dim") * 2;
					var hh = n.getData("dim") * 2;
					var disp = n.disp[p];
					var norm = disp.norm() || 1;
					var pos = n.getPos(p);
					pos.x = x;
					pos.y = y;
				   	 });
    			});

				incremental.onComplete();
				var maxX = -Number.MAX_VALUE;
				var minX = Number.MAX_VALUE;
				var maxY = -Number.MAX_VALUE;
				var minY = Number.MAX_VALUE;

			   	graph.eachNode(function(n){
			   		$.each(prop, function(p) {
						var l = n.getPos(p);
						if (l.x > maxX) maxX = l.x;
						if (l.x < minX) minX = l.x;
						if (l.y > maxY) maxY = l.y;
						if (l.y < minY) minY = l.y;
					});
				});
			   // determine height and width of fd layout
			   var lh;
			   var lw;
			   if (maxX < 0)
			   {
			   		lw = Math.ceil(Math.floor(Math.abs(minX)) - Math.floor(Math.abs(maxX)));
			   }
			   else
			   {
			   		if (minX >=0)
			   		{
			   			lw = Math.ceil(maxX - minX);
			   		}
			   		else
			   		{
			   			lw = Math.ceil(maxX + Math.abs(minX));
			   		}
			   }

			   if (maxY < 0)
			   {
			   		lh = Math.ceil(Math.floor(Math.abs(minY)) - Math.floor(Math.abs(maxY)));
			   }
			   else
			   {
			   		if (minY >=0)
			   		{
			   			lh = Math.ceil(maxY - minY);
			   		}
			   		else
			   		{
			   			lh = Math.ceil(maxY + Math.abs(minY));
			   		}
			   }

				var x2 = opt.width/2;
				var y2 = opt.height/2;

				// adjust each Node's position based on canvas dims
				graph.eachNode(function(n){
					$.each(prop, function(p) {
					var l = n.getPos(p);
					var pad = n.getData("dim");
					if (minX < 0)
					{
						l.x = ((l.x + Math.abs(minX))*(opt.width/lw))-(opt.width/2);
					}
					else
					{
						l.x = ((l.x - minX)*(opt.width/lw))-(opt.width/2);
					}
					if (l.x <= -x2 + pad) l.x = -x2 + (pad*2);
					if (l.x >= x2 - pad) l.x = x2 - (pad*2);
					
					if (minY < 0)
					{
						l.y = ((l.y + Math.abs(minY))*(opt.height/lh))-(opt.height/2);
					}
					else
					{
						l.y = ((l.y - minY)*(opt.height/lh))-(opt.height/2);
					}
					if (l.y <= -y2 + pad) l.y = -y2 + (pad*2);
					if (l.y >= y2 - pad) l.y = y2 - (pad*2);
					});
				});

				return;
        	}
		}
        incremental.onStep(Math.round(i / (times -1) * 100));
        setTimeout(iter, 1);
    })();
  }
});