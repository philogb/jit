/*
 File: Helpers.js

 Helpers are objects that contain rendering primitives (like rectangles, ellipses, etc), for plotting nodes and edges.
 Helpers also contain implementations of the *contains* method, a method returning a boolean indicating whether the mouse
 position is over the rendered shape.

 Helpers are very useful when implementing new NodeTypes, since you can access them through *this.nodeHelper* and
 *this.edgeHelper* <Graph.Plot> properties, providing you with simple primitives and mouse-position check functions.

 Example:
 (start code js)
 //implement a new node type
 $jit.Viz.Plot.NodeTypes.implement({
 'customNodeType': {
 'render': function(node, canvas) {
 this.nodeHelper.circle.render ...
 },
 'contains': function(node, pos) {
 this.nodeHelper.circle.contains ...
 }
 }
 });
 //implement an edge type
 $jit.Viz.Plot.EdgeTypes.implement({
 'customNodeType': {
 'render': function(node, canvas) {
 this.edgeHelper.circle.render ...
 },
 //optional
 'contains': function(node, pos) {
 this.edgeHelper.circle.contains ...
 }
 }
 });
 (end code)

 */

/*
 Object: NodeHelper

 Contains rendering and other type of primitives for simple shapes.
 */
var NodeHelper = {
    'none': {
        'render': $.empty,
        'contains': $.lambda(false)
    },
    /*
     Object: NodeHelper.circle
     */
    'circle': {
        /*
         Method: render

         Renders a circle into the canvas.

         Parameters:

         type - (string) Possible options are 'fill' or 'stroke'.
         pos - (object) An *x*, *y* object with the position of the center of the circle.
         radius - (number) The radius of the circle to be rendered.
         canvas - (object) A <Canvas> instance.

         Example:
         (start code js)
         NodeHelper.circle.render('fill', { x: 10, y: 30 }, 30, viz.canvas);
         (end code)
         */
        'render': function(type, pos, radius, canvas){
            var ctx = canvas.getCtx();
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx[type]();
        },
        /*
         Method: contains

         Returns *true* if *pos* is contained in the area of the shape. Returns *false* otherwise.

         Parameters:

         npos - (object) An *x*, *y* object with the <Graph.Node> position.
         pos - (object) An *x*, *y* object with the position to check.
         radius - (number) The radius of the rendered circle.

         Example:
         (start code js)
         NodeHelper.circle.contains({ x: 10, y: 30 }, { x: 15, y: 35 }, 30); //true
         (end code)
         */
        'contains': function(npos, pos, radius){
            var diffx = npos.x - pos.x,
                diffy = npos.y - pos.y,
                diff = diffx * diffx + diffy * diffy;
            return diff <= radius * radius;
        }
    },
    /*
     Object: NodeHelper.ellipse
     */
    'ellipse': {
        /*
         Method: render

         Renders an ellipse into the canvas.

         Parameters:

         type - (string) Possible options are 'fill' or 'stroke'.
         pos - (object) An *x*, *y* object with the position of the center of the ellipse.
         width - (number) The width of the ellipse.
         height - (number) The height of the ellipse.
         canvas - (object) A <Canvas> instance.

         Example:
         (start code js)
         NodeHelper.ellipse.render('fill', { x: 10, y: 30 }, 30, 40, viz.canvas);
         (end code)
         */
        'render': function(type, pos, width, height, canvas){
            var ctx = canvas.getCtx(),
                scalex = 1,
                scaley = 1,
                scaleposx = 1,
                scaleposy = 1,
                radius = 0;

            if (width > height) {
                radius = width / 2;
                scaley = height / width;
                scaleposy = width / height;
            } else {
                radius = height / 2;
                scalex = width / height;
                scaleposx = height / width;
            }

            ctx.save();
            ctx.scale(scalex, scaley);
            ctx.beginPath();
            ctx.arc(pos.x * scaleposx, pos.y * scaleposy, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx[type]();
            ctx.restore();
        },
        /*
         Method: contains

         Returns *true* if *pos* is contained in the area of the shape. Returns *false* otherwise.

         Parameters:

         npos - (object) An *x*, *y* object with the <Graph.Node> position.
         pos - (object) An *x*, *y* object with the position to check.
         width - (number) The width of the rendered ellipse.
         height - (number) The height of the rendered ellipse.

         Example:
         (start code js)
         NodeHelper.ellipse.contains({ x: 10, y: 30 }, { x: 15, y: 35 }, 30, 40);
         (end code)
         */
        'contains': function(npos, pos, width, height){
            var radius = 0,
                scalex = 1,
                scaley = 1,
                diffx = 0,
                diffy = 0,
                diff = 0;

            if (width > height) {
                radius = width / 2;
                scaley = height / width;
            } else {
                radius = height / 2;
                scalex = width / height;
            }

            diffx = (npos.x - pos.x) * (1 / scalex);
            diffy = (npos.y - pos.y) * (1 / scaley);
            diff = diffx * diffx + diffy * diffy;
            return diff <= radius * radius;
        }
    },
    /*
     Object: NodeHelper.square
     */
    'square': {
        /*
         Method: render

         Renders a square into the canvas.

         Parameters:

         type - (string) Possible options are 'fill' or 'stroke'.
         pos - (object) An *x*, *y* object with the position of the center of the square.
         dim - (number) The radius (or half-diameter) of the square.
         canvas - (object) A <Canvas> instance.

         Example:
         (start code js)
         NodeHelper.square.render('stroke', { x: 10, y: 30 }, 40, viz.canvas);
         (end code)
         */
        'render': function(type, pos, dim, canvas){
            canvas.getCtx()[type + "Rect"](pos.x - dim, pos.y - dim, 2*dim, 2*dim);
        },
        /*
         Method: contains

         Returns *true* if *pos* is contained in the area of the shape. Returns *false* otherwise.

         Parameters:

         npos - (object) An *x*, *y* object with the <Graph.Node> position.
         pos - (object) An *x*, *y* object with the position to check.
         dim - (number) The radius (or half-diameter) of the square.

         Example:
         (start code js)
         NodeHelper.square.contains({ x: 10, y: 30 }, { x: 15, y: 35 }, 30);
         (end code)
         */
        'contains': function(npos, pos, dim){
            return Math.abs(pos.x - npos.x) <= dim && Math.abs(pos.y - npos.y) <= dim;
        }
    },
    /*
     Object: NodeHelper.rectangle
     */
    'rectangle': {
        /*
         Method: render

         Renders a rectangle into the canvas.

         Parameters:

         type - (string) Possible options are 'fill' or 'stroke'.
         pos - (object) An *x*, *y* object with the position of the center of the rectangle.
         width - (number) The width of the rectangle.
         height - (number) The height of the rectangle.
         canvas - (object) A <Canvas> instance.

         Example:
         (start code js)
         NodeHelper.rectangle.render('fill', { x: 10, y: 30 }, 30, 40, viz.canvas);
         (end code)
         */
        'render': function(type, pos, width, height, canvas){
            canvas.getCtx()[type + "Rect"](pos.x - width / 2, pos.y - height / 2,
                width, height);
        },
        /*
         Method: contains

         Returns *true* if *pos* is contained in the area of the shape. Returns *false* otherwise.

         Parameters:

         npos - (object) An *x*, *y* object with the <Graph.Node> position.
         pos - (object) An *x*, *y* object with the position to check.
         width - (number) The width of the rendered rectangle.
         height - (number) The height of the rendered rectangle.

         Example:
         (start code js)
         NodeHelper.rectangle.contains({ x: 10, y: 30 }, { x: 15, y: 35 }, 30, 40);
         (end code)
         */
        'contains': function(npos, pos, width, height){
            return Math.abs(pos.x - npos.x) <= width / 2
                && Math.abs(pos.y - npos.y) <= height / 2;
        }
    },
    /*
     Object: NodeHelper.triangle
     */
    'triangle': {
        /*
         Method: render

         Renders a triangle into the canvas.

         Parameters:

         type - (string) Possible options are 'fill' or 'stroke'.
         pos - (object) An *x*, *y* object with the position of the center of the triangle.
         dim - (number) Half the base and half the height of the triangle.
         canvas - (object) A <Canvas> instance.

         Example:
         (start code js)
         NodeHelper.triangle.render('stroke', { x: 10, y: 30 }, 40, viz.canvas);
         (end code)
         */
        'render': function(type, pos, dim, canvas){
            var ctx = canvas.getCtx(),
                c1x = pos.x,
                c1y = pos.y - dim,
                c2x = c1x - dim,
                c2y = pos.y + dim,
                c3x = c1x + dim,
                c3y = c2y;
            ctx.beginPath();
            ctx.moveTo(c1x, c1y);
            ctx.lineTo(c2x, c2y);
            ctx.lineTo(c3x, c3y);
            ctx.closePath();
            ctx[type]();
        },
        /*
         Method: contains

         Returns *true* if *pos* is contained in the area of the shape. Returns *false* otherwise.

         Parameters:

         npos - (object) An *x*, *y* object with the <Graph.Node> position.
         pos - (object) An *x*, *y* object with the position to check.
         dim - (number) Half the base and half the height of the triangle.

         Example:
         (start code js)
         NodeHelper.triangle.contains({ x: 10, y: 30 }, { x: 15, y: 35 }, 30);
         (end code)
         */
        'contains': function(npos, pos, dim) {
            return NodeHelper.circle.contains(npos, pos, dim);
        }
    },
    /*
     Object: NodeHelper.star
     */
    'star': {
        /*
         Method: render

         Renders a star (concave decagon) into the canvas.

         Parameters:

         type - (string) Possible options are 'fill' or 'stroke'.
         pos - (object) An *x*, *y* object with the position of the center of the star.
         dim - (number) The length of a side of a concave decagon.
         canvas - (object) A <Canvas> instance.

         Example:
         (start code js)
         NodeHelper.star.render('stroke', { x: 10, y: 30 }, 40, viz.canvas);
         (end code)
         */
        'render': function(type, pos, dim, canvas){
            var ctx = canvas.getCtx(),
                pi5 = Math.PI / 5;
            ctx.save();
            ctx.translate(pos.x, pos.y);
            ctx.beginPath();
            ctx.moveTo(dim, 0);
            for (var i = 0; i < 9; i++) {
                ctx.rotate(pi5);
                if (i % 2 == 0) {
                    ctx.lineTo((dim / 0.525731) * 0.200811, 0);
                } else {
                    ctx.lineTo(dim, 0);
                }
            }
            ctx.closePath();
            ctx[type]();
            ctx.restore();
        },
        /*
         Method: contains

         Returns *true* if *pos* is contained in the area of the shape. Returns *false* otherwise.

         Parameters:

         npos - (object) An *x*, *y* object with the <Graph.Node> position.
         pos - (object) An *x*, *y* object with the position to check.
         dim - (number) The length of a side of a concave decagon.

         Example:
         (start code js)
         NodeHelper.star.contains({ x: 10, y: 30 }, { x: 15, y: 35 }, 30);
         (end code)
         */
        'contains': function(npos, pos, dim) {
            return NodeHelper.circle.contains(npos, pos, dim);
        }
    }
};

/*
 Object: EdgeHelper

 Contains rendering primitives for simple edge shapes.
 */
var EdgeHelper = {
    /*
     Object: EdgeHelper.line
     */
    'line': {
        /*
         Method: render

         Renders a line into the canvas.

         Parameters:

         from - (object) An *x*, *y* object with the starting position of the line.
         to - (object) An *x*, *y* object with the ending position of the line.
         canvas - (object) A <Canvas> instance.

         Example:
         (start code js)
         EdgeHelper.line.render({ x: 10, y: 30 }, { x: 10, y: 50 }, viz.canvas);
         (end code)
         */
        'render': function(from, to, canvas){
            var ctx = canvas.getCtx();
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
        },
        /*
         Method: contains

         Returns *true* if *pos* is contained in the area of the shape. Returns *false* otherwise.

         Parameters:

         posFrom - (object) An *x*, *y* object with a <Graph.Node> position.
         posTo - (object) An *x*, *y* object with a <Graph.Node> position.
         pos - (object) An *x*, *y* object with the position to check.
         epsilon - (number) The dimension of the shape.

         Example:
         (start code js)
         EdgeHelper.line.contains({ x: 10, y: 30 }, { x: 15, y: 35 }, { x: 15, y: 35 }, 30);
         (end code)
         */
        'contains': function(posFrom, posTo, pos, epsilon) {
            var min = Math.min,
                max = Math.max,
                minPosX = min(posFrom.x, posTo.x) - epsilon,
                maxPosX = max(posFrom.x, posTo.x) + epsilon,
                minPosY = min(posFrom.y, posTo.y) - epsilon,
                maxPosY = max(posFrom.y, posTo.y) + epsilon;

            if(pos.x >= minPosX && pos.x <= maxPosX
                && pos.y >= minPosY && pos.y <= maxPosY) {
                if(Math.abs(posTo.x - posFrom.x) <= epsilon) {
                    return true;
                }
                var dist = (posTo.y - posFrom.y) / (posTo.x - posFrom.x) * (pos.x - posFrom.x) + posFrom.y;
                return Math.abs(dist - pos.y) <= epsilon;
            }
            return false;
        }
    },
    /*
     Object: EdgeHelper.arrow
     */
    'arrow': {
        /*
         Method: render

         Renders an arrow into the canvas.

         Parameters:

         from - (object) An *x*, *y* object with the starting position of the arrow.
         to - (object) An *x*, *y* object with the ending position of the arrow.
         dim - (number) The dimension of the arrow.
         swap - (boolean) Whether to set the arrow pointing to the starting position or the ending position.
         canvas - (object) A <Canvas> instance.

         Example:
         (start code js)
         EdgeHelper.arrow.render({ x: 10, y: 30 }, { x: 10, y: 50 }, 13, false, viz.canvas);
         (end code)
         */
        'render': function(from, to, dim, swap, canvas, arrowPosition){
            var ctx = canvas.getCtx();
            // invert edge direction
            if (swap) {
                var tmp = from;
                from = to;
                to = tmp;
            }
            var vect = new Complex(to.x - from.x, to.y - from.y);
            vect.$scale(dim / vect.norm());
            var posVect;
            switch (arrowPosition) {
                case 'end':    posVect = vect; break;
                case 'center': posVect = new Complex((to.x - from.x)/2, (to.y - from.y)/2); break;
            }
            var intermediatePoint = new Complex(to.x - posVect.x, to.y - posVect.y),
                normal = new Complex(-vect.y / 2, vect.x / 2),
                endPoint = intermediatePoint.add(vect),
                v1 = intermediatePoint.add(normal),
                v2 = intermediatePoint.$add(normal.$scale(-1));

            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(v1.x, v1.y);
            ctx.moveTo(v1.x, v1.y);
            ctx.lineTo(v2.x, v2.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.closePath();
            ctx.fill();
        },
        /*
         Method: contains

         Returns *true* if *pos* is contained in the area of the shape. Returns *false* otherwise.

         Parameters:

         posFrom - (object) An *x*, *y* object with a <Graph.Node> position.
         posTo - (object) An *x*, *y* object with a <Graph.Node> position.
         pos - (object) An *x*, *y* object with the position to check.
         epsilon - (number) The dimension of the shape.

         Example:
         (start code js)
         EdgeHelper.arrow.contains({ x: 10, y: 30 }, { x: 15, y: 35 }, { x: 15, y: 35 }, 30);
         (end code)
         */
        'contains': function(posFrom, posTo, pos, epsilon) {
            return EdgeHelper.line.contains(posFrom, posTo, pos, epsilon);
        }
    },
    /*
     Object: EdgeHelper.hyperline
     */
    'hyperline': {
        /*
         Method: render

         Renders a hyperline into the canvas. A hyperline are the lines drawn for the <Hypertree> visualization.

         Parameters:

         from - (object) An *x*, *y* object with the starting position of the hyperline. *x* and *y* must belong to [0, 1).
         to - (object) An *x*, *y* object with the ending position of the hyperline. *x* and *y* must belong to [0, 1).
         r - (number) The scaling factor.
         canvas - (object) A <Canvas> instance.

         Example:
         (start code js)
         EdgeHelper.hyperline.render({ x: 10, y: 30 }, { x: 10, y: 50 }, 100, viz.canvas);
         (end code)
         */
        'render': function(from, to, r, canvas){
            var ctx = canvas.getCtx();
            var centerOfCircle = computeArcThroughTwoPoints(from, to);
            if (centerOfCircle.a > 1000 || centerOfCircle.b > 1000
                || centerOfCircle.ratio < 0) {
                ctx.beginPath();
                ctx.moveTo(from.x * r, from.y * r);
                ctx.lineTo(to.x * r, to.y * r);
                ctx.stroke();
            } else {
                var angleBegin = Math.atan2(to.y - centerOfCircle.y, to.x
                    - centerOfCircle.x);
                var angleEnd = Math.atan2(from.y - centerOfCircle.y, from.x
                    - centerOfCircle.x);
                var sense = sense(angleBegin, angleEnd);
                ctx.beginPath();
                ctx.arc(centerOfCircle.x * r, centerOfCircle.y * r, centerOfCircle.ratio
                    * r, angleBegin, angleEnd, sense);
                ctx.stroke();
            }
            /*
             Calculates the arc parameters through two points.

             More information in <http://en.wikipedia.org/wiki/Poincar%C3%A9_disc_model#Analytic_geometry_constructions_in_the_hyperbolic_plane>

             Parameters:

             p1 - A <Complex> instance.
             p2 - A <Complex> instance.
             scale - The Disk's diameter.

             Returns:

             An object containing some arc properties.
             */
            function computeArcThroughTwoPoints(p1, p2){
                var aDen = (p1.x * p2.y - p1.y * p2.x), bDen = aDen;
                var sq1 = p1.squaredNorm(), sq2 = p2.squaredNorm();
                // Fall back to a straight line
                if (aDen == 0)
                    return {
                        x: 0,
                        y: 0,
                        ratio: -1
                    };

                var a = (p1.y * sq2 - p2.y * sq1 + p1.y - p2.y) / aDen;
                var b = (p2.x * sq1 - p1.x * sq2 + p2.x - p1.x) / bDen;
                var x = -a / 2;
                var y = -b / 2;
                var squaredRatio = (a * a + b * b) / 4 - 1;
                // Fall back to a straight line
                if (squaredRatio < 0)
                    return {
                        x: 0,
                        y: 0,
                        ratio: -1
                    };
                var ratio = Math.sqrt(squaredRatio);
                var out = {
                    x: x,
                    y: y,
                    ratio: ratio > 1000? -1 : ratio,
                    a: a,
                    b: b
                };

                return out;
            }
            /*
             Sets angle direction to clockwise (true) or counterclockwise (false).

             Parameters:

             angleBegin - Starting angle for drawing the arc.
             angleEnd - The HyperLine will be drawn from angleBegin to angleEnd.

             Returns:

             A Boolean instance describing the sense for drawing the HyperLine.
             */
            function sense(angleBegin, angleEnd){
                return (angleBegin < angleEnd)? ((angleBegin + Math.PI > angleEnd)? false
                    : true) : ((angleEnd + Math.PI > angleBegin)? true : false);
            }
        },
        /*
         Method: contains

         Not Implemented

         Returns *true* if *pos* is contained in the area of the shape. Returns *false* otherwise.

         Parameters:

         posFrom - (object) An *x*, *y* object with a <Graph.Node> position.
         posTo - (object) An *x*, *y* object with a <Graph.Node> position.
         pos - (object) An *x*, *y* object with the position to check.
         epsilon - (number) The dimension of the shape.

         Example:
         (start code js)
         EdgeHelper.hyperline.contains({ x: 10, y: 30 }, { x: 15, y: 35 }, { x: 15, y: 35 }, 30);
         (end code)
         */
        'contains': $.lambda(false)
    }
};
