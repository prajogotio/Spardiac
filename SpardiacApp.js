SpardiacApp = {

	Map : {
		0 : { 
			template : [
				"...B...",
				"...B...",
				"..BBB..",
				"BBBBBBB",
				"..BBB..",
				"...B...",
				"BBBBBBB",
			],
			row : 7,
			col : 7,
			origin : {row: 0, col: 3},
		},
	},

	World : {
		Block : {
			width : 200,
			height: 200,
			depth: 100,
		},
		Vision : {
			row : 10,
			col : 10,
		},
	}

}

function WorldMapGenerator(map) {
	this.map = [];
	this.row = map.row;
	this.col = map.col;
	this.origin = map.origin;
	for (var i = 0; i < map.row; ++i) {
		for (var j = 0; j < map.col; ++j) {
			if(map.template[i][j] == 'B') {
				this.map.push(new Block({
						x : i * SpardiacApp.World.Block.width,
						y : 0,
						z : j * SpardiacApp.World.Block.height,
					}))
			} else {
				this.map.push(null);
			}
		}
	}
}

WorldMapGenerator.prototype.renderMap = function(g, camera) {
	for (var i = 0; i < this.row; ++i) {
		for (var j = 0; j < this.col; ++j) {
			if(this.map[i * this.col + j] != null) {
				this.map[i * this.col + j].renderBlock(g, camera);
			}
		}
	}
}

function Block(pos) {
	this.pos = pos;
	var X = this.pos.x;
	var Y = this.pos.y;
	var Z = this.pos.z;
	this.width = SpardiacApp.World.Block.width;
	this.height = SpardiacApp.World.Block.height;
	this.depth = SpardiacApp.World.Block.depth;
	this.points = [
		new Point({x:X-this.width/2,y:Y-this.depth/2,z:Z-this.height/2}),
		new Point({x:X+this.width/2,y:Y-this.depth/2,z:Z-this.height/2}),
		new Point({x:X-this.width/2,y:Y+this.depth/2,z:Z-this.height/2}),
		new Point({x:X-this.width/2,y:Y-this.depth/2,z:Z+this.height/2}),
		new Point({x:X+this.width/2,y:Y+this.depth/2,z:Z-this.height/2}),
		new Point({x:X-this.width/2,y:Y+this.depth/2,z:Z+this.height/2}),
		new Point({x:X+this.width/2,y:Y-this.depth/2,z:Z+this.height/2}),
		new Point({x:X+this.width/2,y:Y+this.depth/2,z:Z+this.height/2}),
	];
	this.segments = [
		new Segment(this.points[0],this.points[1]),
		new Segment(this.points[0],this.points[2]),
		new Segment(this.points[0],this.points[3]),
		new Segment(this.points[1],this.points[4]),
		new Segment(this.points[1],this.points[6]),
		new Segment(this.points[2],this.points[5]),
		new Segment(this.points[2],this.points[4]),
		new Segment(this.points[3],this.points[5]),
		new Segment(this.points[3],this.points[6]),
		new Segment(this.points[4],this.points[7]),
		new Segment(this.points[5],this.points[7]),
		new Segment(this.points[6],this.points[7]),
	];
}

Block.prototype.renderBlock = function(g, camera) {
	for (var i = 0; i < this.points.length; ++i) {
		camera.computePointProjection(this.points[i]);
		this.points[i].renderPoint(g);
	}
	for (var i = 0; i < this.segments.length; ++i) {
		this.segments[i].renderSegment(g);
	}
}

// var command = {};
// document.addEventListener("DOMContentLoaded", function(){
// 	SpardiacApp.display = document.getElementById("display");
// 	SpardiacApp.g = SpardiacApp.display.getContext('2d');
// 	var camera = new Camera({x: 500, y : -300, z: 500}, {x: 1, y:0, z:0});
// 	var map = new WorldMapGenerator(SpardiacApp.Map[0]);
// 	map.renderMap(SpardiacApp.g, camera);
// 	document.addEventListener("keydown", function(e) {
// 		if(e.which == 37) {
// 			command['Y'] = true;
// 		}
// 		if(e.which == 38) {
// 			command['MOVE'] = true;
// 		}
// 		if(e.which == 40) {
// 			command['Z'] = true;
// 		}
// 	})
// 	document.addEventListener("keyup", function(e) {
// 		if(e.which == 37) {
// 			command['Y'] = false;
// 		}
// 		if(e.which == 38) {
// 			command['MOVE'] = false;
// 		}
// 		if(e.which == 40) {
// 			command['Z'] = false;
// 		}
// 	})

// 	setInterval(function(){
// 		if(command['Y']) {
// 			camera.setNormal(Spardiac.rotateY(camera.n, 1/180 * Math.PI));
// 		}
// 		if(command['MOVE']) {
// 			camera.pos = Spardiac.add(camera.pos, Spardiac.scalarProduct(camera.n, 10));
// 		}
// 		if(command['Z']) {
// 			camera.setNormal(Spardiac.rotateZ(camera.n, 1/180 * Math.PI));
// 		}
// 		SpardiacApp.g.clearRect(0,0,1000,600);
// 		map.renderMap(SpardiacApp.g, camera);
// 	},1000/60)
// });
