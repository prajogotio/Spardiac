var Spardiac = {
	SCREEN : {
		WIDTH : 1000,
		HEIGHT : 600,
		DISTANCE : 300,
	}
};

Spardiac.setScreenDistance = function(distance) {
	Spardiac.SCREEN.DISTANCE = distance;
}

Spardiac.setScreenDimension = function(width, height) {
	Spardiac.SCREEN.WIDTH = width;
	Spardiac.SCREEN.HEIGHT = height;
}

Spardiac.transform = function(vec, T) {
	var temp = [vec.x, vec.y, vec.z];
	var res = [0, 0, 0];
	for (var i = 0; i < 3; ++i) {
		for (var j = 0; j < 3; ++j){
			res[i] += T[i * 3 + j] * temp[j];
		}
	}
	return {
		x : res[0],
		y : res[1], 
		z : res[2],
	};
}

Spardiac.normalize = function(vec) {
	var r = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
	if(r == 0) return vec;
	return {
		x: vec.x / r,
		y: vec.y / r,
		z: vec.z / r,
	};
}

Spardiac.dotProduct = function(vec1, vec2) {
	return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
}

Spardiac.scalarProduct = function(vec, k) {
	return {
		x : vec.x * k,
		y : vec.y * k,
		z : vec.z * k,
	};
}

Spardiac.add = function(vec1, vec2) {
	return {
		x : vec1.x + vec2.x,
		y : vec1.y + vec2.y,
		z : vec1.z + vec2.z,
	};
}

Spardiac.crossProduct = function(vec1, vec2) {
	return {
		x : vec1.y * vec2.z - vec1.z * vec2.y,
		y : - (vec1.x * vec2.z - vec1.z * vec2.x),
		z : vec1.x * vec2.y - vec1.y * vec2.x,
	};
}

Spardiac.rotateX = function(vec, alpha) {
	if(alpha == null || alpha == NaN) return vec;
	var T = [
		1, 0, 0,
		0, Math.cos(alpha), -Math.sin(alpha),
		0, Math.sin(alpha), Math.cos(alpha),
	];
	return Spardiac.transform(vec, T);
}

Spardiac.rotateY = function(vec, alpha) {
	if(alpha == null || isNaN(alpha)) return vec;
	var T = [
		Math.cos(alpha), 0, Math.sin(alpha),
		0, 1, 0,
		-Math.sin(alpha), 0, Math.cos(alpha),
	];
	return Spardiac.transform(vec, T);
}

Spardiac.rotateZ = function(vec, alpha) {
	if(alpha == null || isNaN(alpha)) return vec;
	var T = [
		Math.cos(alpha), -Math.sin(alpha), 0,
		Math.sin(alpha), Math.cos(alpha), 0,
		0, 0, 1,
	];
	return Spardiac.transform(vec, T);
}

Spardiac.radius = function(vec1) {
	return Math.sqrt(Spardiac.dotProduct(vec1, vec1));
}

Spardiac.findAngleBetween = function(vec1, vec2) {
	return Math.acos(Spardiac.dotProduct(vec1, vec2)/(Spardiac.radius(vec1) * Spardiac.radius(vec2)));
}

Spardiac.rotateAlongAxis = function(vec, axis, alpha) {
	var beta = Spardiac.findAngleBetween(axis, {x:0, y:0, z:1});
	if(beta == 0) {
		var res = Spardiac.rotateZ(vec, alpha);
		return res;
	}
	// rotate axis and vec along z, incident to plane zx
	var theta1 = Math.atan(-axis.y/axis.x);
	//if(beta == 0) theta1 = 0;
	var axis1 = Spardiac.rotateZ(axis, theta1);
	var vec1 = Spardiac.rotateZ(vec, theta1);
	// rotate axis1 and vec1 along y, incident to plane xy
	beta = Spardiac.findAngleBetween(axis1, {x:0, y:0, z:1});
	if(beta == 0) {
		var res = Spardiac.rotateZ(vec1, alpha);
		res = Spardiac.rotateZ(vec1, -theta1);
		return res;
	}
	var theta2 = Math.atan(-axis1.x/axis1.z);
	//if(beta == 0) theta2 = 0;
	var axis2 = Spardiac.rotateY(axis1, theta2);
	var vec2 = Spardiac.rotateY(vec1, theta2);
	// rotate vec2 along Z by alpha
	var vec3 = Spardiac.rotateZ(vec2, alpha);
	// inverse rotate vec3 by theta2
	var res = Spardiac.rotateY(vec3, -theta2);
	// inverse rotate res by theta1
	res = Spardiac.rotateZ(res, -theta1);
	return res;
}

Spardiac.rotateAlongAxisClosedForm = function(vec, axis, theta) {
	var ctheta = Math.cos(theta);
	var stheta = Math.sin(theta);
	var T = [
		ctheta + axis.x * axis.x * (1 - ctheta), axis.x * axis.y * (1-ctheta) - axis.z * stheta, axis.x * axis.z * (1-ctheta) + axis.y * stheta,
		axis.y * axis.x * (1 - ctheta) + axis.z * stheta, ctheta + axis.y * axis.y * (1-ctheta), axis.y * axis.z * (1-ctheta) - axis.x * stheta, 
		axis.z * axis.x * (1 - ctheta) - axis.y * stheta, axis.z * axis.y * (1-ctheta) + axis.x * stheta, ctheta + axis.z * axis.z * (1 - ctheta)
	];
	return Spardiac.transform(vec, T);
}

Spardiac.distanceBetween = function(vec1, vec2) {
	var dx = vec1.x - vec2.x;
	var dy = vec1.y - vec2.y;
	var dz = vec1.z - vec2.z;
	return Math.sqrt(dx*dx + dy*dy + dz*dz);
}

Spardiac.computeProjection = function(vec, n, pos) {
	var k = -(Spardiac.dotProduct(n, pos) - Spardiac.dotProduct(vec, n));
	return proj = Spardiac.add(Spardiac.scalarProduct(n, k), vec);
}

Spardiac.computePerspectiveProjection = function(vec, n, pos) {
	var k = -(Spardiac.dotProduct(n, pos) - Spardiac.dotProduct(vec, n));
	if(k < 0) return null;
	res = Spardiac.add(Spardiac.scalarProduct(n, k), vec);
	res = Spardiac.subtract(res, pos);
	k = Math.abs(Spardiac.dotProduct(n, Spardiac.subtract(vec,pos)));
	if(k != 0){
		res.x = res.x / k * Spardiac.SCREEN.DISTANCE ;
		res.y = res.y / k * Spardiac.SCREEN.DISTANCE ;
		res.z = res.z / k * Spardiac.SCREEN.DISTANCE;
	} else {
		return null;
	}
	res = Spardiac.add(res, pos);
	return res;
}

Spardiac.subtract = function(vec1, vec2) {
	return {
		x : vec1.x - vec2.x,
		y : vec1.y - vec2.y,
		z : vec1.z - vec2.z
	};
}



function Camera(pos) {
	this.pos = pos;
	this.n = {x:1,y:0,z:0};
	this.orient = {x:0,y:1,z:0};
	this.orientShift = 0;
	this.theta = 0;
	this.axis = null;
	this.computeCommonAxis();
}


Camera.prototype.rotateX = function(alpha) {
	this.n = Spardiac.rotateX(this.n, alpha);
	this.orient = Spardiac.rotateX(this.orient, alpha);
	this.computeCommonAxis();
	this.computeOrientShift();
}

Camera.prototype.rotateY = function(alpha) {
	this.n = Spardiac.rotateY(this.n, alpha);
	this.orient = Spardiac.rotateY(this.orient, alpha);
	this.computeCommonAxis();
	this.computeOrientShift();
}

Camera.prototype.rotateZ = function(alpha) {
	this.n = Spardiac.rotateZ(this.n, alpha);
	this.orient = Spardiac.rotateZ(this.orient, alpha);
	this.computeCommonAxis();
	this.computeOrientShift();
}

Camera.prototype.rotateAlongOrientation = function(alpha) {
	this.n = Spardiac.rotateAlongAxisClosedForm(this.n, this.orient, alpha);
	this.computeCommonAxis();
	this.computeOrientShift();
}

Camera.prototype.rotateAlongPerpendicularOrientation = function(alpha) {
	var axis = Spardiac.crossProduct(this.n, this.orient);
	this.n = Spardiac.rotateAlongAxisClosedForm(this.n, axis, alpha);
	this.orient = Spardiac.crossProduct(axis, this.n);
	this.computeCommonAxis();
	this.computeOrientShift();
}

Camera.prototype.computeOrientShift = function() {
	var orientProj = Spardiac.rotateAlongAxis(this.orient, this.axis, this.theta);
	var orientShift = Spardiac.findAngleBetween({x:0,y:1,z:0}, orientProj);
	var orientProj90 = Spardiac.rotateZ(orientProj, 90/180 * Math.PI);
	if(Spardiac.dotProduct(orientProj90, {x:0,y:1,z:0}) > 0) {
		this.orientShift = orientShift;
	} else {
		this.orientShift = -orientShift;
	}
}

Camera.prototype.computeCommonAxis = function() {
	var Z = {x:0, y:0, z:1};
	var theta = Spardiac.findAngleBetween(this.n, Z);
	var axis = Spardiac.crossProduct(this.n, Z);
	this.axis = axis;
	this.theta = theta;
}

Camera.prototype.computePointProjection = function(point) {
	this.computeProjectionToScreen(point);
	if(point.getProjection() == null) return;
}

Camera.prototype.computeProjectionToScreen = function(point) {
	//var proj = Spardiac.computeProjection(point.pos, this.n, this.pos);
	var proj = Spardiac.computePerspectiveProjection(point.pos, this.n, this.pos);
	//rotate projection on camera-plane to screen-plane (0,0,1)
	//find angle between camera-plane and screen-plane
	if(proj == null) {point.setProjection(null); return;}
	var _proj = Spardiac.subtract(proj,this.pos);
	var res = _proj;
	if(this.theta != 0) {
		res = Spardiac.rotateAlongAxis(_proj, this.axis, this.theta);
		res = Spardiac.rotateZ(res, this.orientShift);
	}
	//res = Spardiac.add(res, this.pos);
	res.x += Spardiac.SCREEN.WIDTH/2;
	res.y += Spardiac.SCREEN.HEIGHT/2;
	point.setProjection(res);
}


function Point(pos) {
	this.pos = pos;
	this.proj = pos;
}

Point.prototype.setProjection = function(proj) {
	this.proj = proj;
}

Point.prototype.getProjection = function() {
	return this.proj;
}

Point.prototype.renderPoint = function(g) {
	if(this.proj == null) return;
	g.fillRect(this.proj.x, this.proj.y, 5, 5);
}




function Segment(point1, point2) {
	this.point1 = point1;
	this.point2 = point2;
}

Segment.prototype.renderSegment = function(g){
	if(this.point1.getProjection() == null || this.point2.getProjection() == null) return;
	g.beginPath();
	g.moveTo(this.point1.getProjection().x, this.point1.getProjection().y);
	g.lineTo(this.point2.getProjection().x, this.point2.getProjection().y);
	g.stroke();
	//this.point1.renderPoint(g);
	//this.point2.renderPoint(g);
}


//TESTING CODE
// var command = {};
// document.addEventListener("DOMContentLoaded", function(){
// 	var g = document.getElementById('display').getContext('2d');
// 	var points = [];
// 	var segments = [];
// 	for(var i=0;i<90;++i){
// 		for(var j=0;j<4;++j){
// 			for(var k=0;k<1;++k){
// 				var X = i*100;
// 				var Y = -k*100;
// 				var Z = j*100;
// 				var len = points.length;
// 				points = points.concat([
// 					new Point({x:X-50,y:Y-50,z:Z-50}),
// 					new Point({x:X+50,y:Y-50,z:Z-50}),
// 					new Point({x:X-50,y:Y+50,z:Z-50}),
// 					new Point({x:X-50,y:Y-50,z:Z+50}),
// 					new Point({x:X+50,y:Y+50,z:Z-50}),
// 					new Point({x:X-50,y:Y+50,z:Z+50}),
// 					new Point({x:X+50,y:Y-50,z:Z+50}),
// 					new Point({x:X+50,y:Y+50,z:Z+50}),
// 				]);
// 				segments = segments.concat([
// 					new Segment(points[len+0],points[len+1]),
// 					new Segment(points[len+0],points[len+2]),
// 					new Segment(points[len+0],points[len+3]),
// 					new Segment(points[len+1],points[len+4]),
// 					new Segment(points[len+1],points[len+6]),
// 					new Segment(points[len+2],points[len+5]),
// 					new Segment(points[len+2],points[len+4]),
// 					new Segment(points[len+3],points[len+5]),
// 					new Segment(points[len+3],points[len+6]),
// 					new Segment(points[len+4],points[len+7]),
// 					new Segment(points[len+5],points[len+7]),
// 					new Segment(points[len+6],points[len+7]),
// 				]);
// 			}
// 		}
// 	}
// 	//var len = points.length;
// 	//points.push(new Point({x:0,y:0,z:0}));
// 	//points.push(new Point({x:0,y:0,z:500}));
// 	//points.push(new Point({x:500,y:0,z:0}));
// 	//points.push(new Point({x:0,y:500,z:0}));
// 	//segments.push(new Segment(points[len],points[len+1]));
// 	//segments.push(new Segment(points[len],points[len+2]));
// 	//segments.push(new Segment(points[len],points[len+3]));
// 	var camera = new Camera({x:0, y: -120, z:100});
// 	for (var i = 0; i<points.length;++i)camera.computePointProjection(points[i]);
// 	for (var i = 0; i<segments.length;++i)segments[i].renderSegment(g);
// 	var alpha = Math.atan(300/500);
// 	var r = Math.sqrt(300*300 + 500*500);
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
// 			camera.rotateZ(-4/180*Math.PI);

// 		}
// 		if(command['ZZ']){
// 			//camera.setNormal(Spardiac.rotateZ(camera.n,-4/180*Math.PI));
// 			camera.rotateX(-4/180*Math.PI);

// 		}
// 		g.clearRect(0,0,1000,600);
// 		for (var i = 0; i<points.length;++i)camera.computePointProjection(points[i]);
// 		for (var i = 0; i<segments.length;++i)segments[i].renderSegment(g);
// 	},1000/60);
// });
