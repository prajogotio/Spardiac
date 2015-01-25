function SparSegment(point1, point2) {
	Segment.call(this, point1, point2);
}

SparSegment.prototype = Object.create(Segment.prototype);

SparSegment.prototype.renderSegment = function(g) {
	g.strokeStyle = "white";
	g.lineWidth = 3;
	Segment.prototype.renderSegment.call(this, g);
}
function SparTree(pos) {
	this.radius = 7;
	this.pos = pos;
	this.points = [];
	this.segments = [];
	this.length = 100;
	this.decay = 0.99;
	this.points.push(new Point(pos));
	this.build(this.points[0], {x:1,y:0,z:0}, this.length, 0);
}

SparTree.prototype.build = function(point, direction, length, radius) {
	if(radius > this.radius) return;
	var axis = {x: 1+Math.random(), y : 1+Math.random(), z: 1+Math.random()};
	axis = Spardiac.normalize(axis);
	var dir1 = Spardiac.rotateAlongAxis(direction, axis, 60/180 * Math.PI);
	var dir2 = Spardiac.rotateAlongAxis(direction, axis, -60/180 * Math.PI);
	var pt1 = new Point(Spardiac.add(point.pos, Spardiac.scalarProduct(dir1, length)));
	var pt2 = new Point(Spardiac.add(point.pos, Spardiac.scalarProduct(dir2, length)));
	var sg1 = new SparSegment(point, pt1);
	var sg2 = new SparSegment(point, pt2);
	this.points = this.points.concat([pt1,pt2]);
	this.segments = this.segments.concat([sg1,sg2]);
	this.build(pt1, dir1, length * this.decay, radius+1);
	this.build(pt2, dir2, length * this.decay, radius+1);
}

SparTree.prototype.render = function(g, camera) {
	for (var i = 0; i < this.points.length; ++i) {
		camera.computePointProjection(this.points[i]);
	}
	for (var i = 0; i < this.segments.length; ++i) {
		this.segments[i].renderSegment(g);
	}
}


// TESTING CODE
// var command = {};
// document.addEventListener("DOMContentLoaded", function() {
// 	document.body.style.setProperty("background-color", "black");
// 	var g = document.getElementById('display').getContext('2d');
// 	var camera = new Camera({x:0, y:0, z: 0});
// 	var sparTree = new SparTree({x:0, y:0, z:0});
// 	sparTree.render(g, camera);
// 	document.addEventListener("keydown", function(e) {
// 		if(e.which==38){command['MOVE'] = true;}
// 		if(e.which==65){command['X'] = true;}
// 		if(e.which==87){command['Y'] = true;}
// 		if(e.which==68){command['Z'] = true;}
// 		if(e.which==40){command['ZZ'] = true;}
// 	});
// 	document.addEventListener("keyup", function(e) {
// 		if(e.which==38){command['MOVE'] = false;}
// 		if(e.which==65){command['X'] = false;}
// 		if(e.which==87){command['Y'] = false;}
// 		if(e.which==68){command['Z'] = false;}
// 		if(e.which==40){command['ZZ'] = false;}

// 	});
// 	setInterval(function(){
// 		if(command['MOVE']){camera.pos = Spardiac.add(camera.pos, Spardiac.scalarProduct(camera.n, 10));}
// 		if(command['X']){
// 			//camera.setNormal(Spardiac.rotateX(camera.n,4/180*Math.PI));
// 			camera.rotateX(4/180*Math.PI);
// 		}
// 		if(command['Y']){
// 			//camera.setNormal(Spardiac.rotateY(camera.n,4/180*Math.PI));
// 			camera.rotateY(4/180*Math.PI);
// 		}
// 		if(command['Z']){
// 			//camera.setNormal(Spardiac.rotateZ(camera.n,4/180*Math.PI));
// 			camera.rotateZ(4/180*Math.PI);

// 		}
// 		if(command['ZZ']){
// 			//camera.setNormal(Spardiac.rotateZ(camera.n,-4/180*Math.PI));
// 			camera.rotateX(-4/180*Math.PI);

// 		}
// 		g.clearRect(0,0,1000,600);
// 		sparTree.render(g, camera);
// 	},1000/60);
// })