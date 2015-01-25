function RectBuilding(row, col, baseWidth, baseHeight, height) {
	this.baseWidth = baseWidth;
	this.baseHeight = baseHeight;
	this.height = height;
	this.points = [];
	this.segments = [];
	this.x = row * 100;
	this.z = col * 100;
	this.build();
}

RectBuilding.prototype.build = function() {
	var BW = this.baseWidth;
	var BH = this.baseHeight;
	var H = this.height;
	for(var i = 0; i < H; ++i) {
		var Y = -i * 100;
		for(var j = 0; j < BW; ++j) {
			this.points.push(new Point({x : this.x + j * 100, y : Y, z : this.z}));
			this.points.push(new Point({x : this.x + j * 100, y : Y, z : this.z + (BH-1) * 100}));
			if(j > 0) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2 * j], this.points[i * 2 * (BW+BH) + 2 * (j-1)]));
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2 * j + 1], this.points[i * 2 * (BW+BH) + 2 * (j-1) + 1]));
			}
			if(i > 0) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2 * j], this.points[(i-1) * 2 * (BW+BH) + 2 * j]));
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2 * j + 1], this.points[(i-1) * 2 * (BW+BH) + 2 * j + 1]));
			}
			if(i == H-1) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2 * j], this.points[i * 2 * (BW+BH) + 2 * j + 1]));
			}
		}
		for(var j = 0; j < BH; ++j) {
			this.points.push(new Point({x : this.x, y : Y, z : this.z + j * 100}));
			this.points.push(new Point({x : this.x + (BW-1) * 100 , y : Y, z : this.z + j * 100}));
			if(j > 0) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) +2*BW + 2 * j], this.points[i * 2 * (BW+BH) +2*BW + 2 * (j-1)]));
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) +2*BW + 2 * j + 1], this.points[i * 2 * (BW+BH) +2*BW + 2 * (j-1) + 1]));
			}
			if(i>0) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2*BW + 2 * j], this.points[(i-1) * 2 * (BW+BH) + 2*BW+ 2 * j]));
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2*BW+ 2 * j + 1], this.points[(i-1) * 2 * (BW+BH) + 2*BW+ 2 * j + 1]));
			}
			if(i == H-1) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2*BW + 2 * j], this.points[i * 2 * (BW+BH) + 2*BW + 2 * j + 1]));
			}
		}
	}
}

RectBuilding.prototype.render = function(g, camera) {
	WorldGrid.prototype.render.call(this, g, camera);
}

function PrismBuilding(row, col, baseWidth, baseHeight, height) {
	this.baseWidth = baseWidth;
	this.baseHeight = baseHeight;
	this.height = height;
	this.points = [];
	this.segments = [];
	this.x = row * 100;
	this.z = col * 100;
	this.build();
}

PrismBuilding.prototype.build = function() {
	var BW = this.baseWidth;
	var BH = this.baseHeight;
	var H = this.height;
	var length = 100;
	var dec = length / (H+5);
	for(var i = 0; i < H; ++i) {
		var Y = -i * 100;
		for(var j = 0; j < BW; ++j) {
			this.points.push(new Point({x : this.x + j * length, y : Y, z : this.z}));
			this.points.push(new Point({x : this.x + j * length, y : Y, z : this.z + (BH-1) * length}));
			if(j > 0) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2 * j], this.points[i * 2 * (BW+BH) + 2 * (j-1)]));
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2 * j + 1], this.points[i * 2 * (BW+BH) + 2 * (j-1) + 1]));
			}
			if(i > 0) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2 * j], this.points[(i-1) * 2 * (BW+BH) + 2 * j]));
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2 * j + 1], this.points[(i-1) * 2 * (BW+BH) + 2 * j + 1]));
			}
			if(i == H-1) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2 * j], this.points[i * 2 * (BW+BH) + 2 * j + 1]));
			}
		}
		for(var j = 0; j < BH; ++j) {
			this.points.push(new Point({x : this.x, y : Y, z : this.z + j * length}));
			this.points.push(new Point({x : this.x + (BW-1) * length , y : Y, z : this.z + j * length}));
			if(j > 0) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) +2*BW + 2 * j], this.points[i * 2 * (BW+BH) +2*BW + 2 * (j-1)]));
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) +2*BW + 2 * j + 1], this.points[i * 2 * (BW+BH) +2*BW + 2 * (j-1) + 1]));
			}
			if(i>0) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2*BW + 2 * j], this.points[(i-1) * 2 * (BW+BH) + 2*BW+ 2 * j]));
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2*BW+ 2 * j + 1], this.points[(i-1) * 2 * (BW+BH) + 2*BW+ 2 * j + 1]));
			}
			if(i == H-1) {
				this.segments.push(new Segment(this.points[i * 2 * (BW+BH) + 2*BW + 2 * j], this.points[i * 2 * (BW+BH) + 2*BW + 2 * j + 1]));
			}
		}
		length -= dec;
	}
}

PrismBuilding.prototype.render = function(g, camera) {
	WorldGrid.prototype.render.call(this, g, camera);
}


function WorldGrid(row, col) {
	this.row = row;
	this.col = col
	this.points = [];
	this.segments = [];
	this.build();
}

WorldGrid.prototype.build = function(){
	for( var i = 0; i < this.row; ++i) {
		for (var j = 0; j < this.col; ++j) {
			if(this.col/3 < j && j < this.col/3 * 2) this.points.push(new Point({x:i*100, y:180, z:j*100}));
			else this.points.push(new Point({x:i*100, y:0, z:j*100}));
		}
	}
	for (var i = 0; i < this.row; ++i) {
		for (var j=0;j < this.col; ++j) {
			if(i+1 < this.row)this.segments.push(new Segment(this.points[i * this.col + j], this.points[(i+1) * this.col + j]));
			if(j+1 < this.col)this.segments.push(new Segment(this.points[i * this.col + j], this.points[i * this.col + j+1]));
		}
	}
}

WorldGrid.prototype.render = function(g, camera) {
	for(var i=0;i<this.points.length;++i) {
		camera.computePointProjection(this.points[i]);
	}
	for(var i=0;i<this.segments.length;++i){
		this.segments[i].renderSegment(g);
	}
}



var command = {};

document.addEventListener("DOMContentLoaded",function(){
	var startButton = document.getElementById("announcer");
	var display = document.getElementById("display");
	var g = document.getElementById("display").getContext('2d');
	var camera = new Camera({x:0, y:-100, z:1500});
	var wgrid = new WorldGrid(50, 30);
	var buildings = [];
	for (var i = 0; i < 50; i += 8) {
		buildings.push(new PrismBuilding(i, 27, 2, 2, 15));
		buildings.push(new PrismBuilding(i, 0, 2, 2, 15));
	}

	document.addEventListener("mousemove", function(e) {
		var y = e.pageY - display.offsetTop - display.height/2;
		var x = e.pageX - display.offsetLeft - display.width/2;
		command = {};
		if(x > display.width/8 * 2.5) {
			command['RIGHT'] = true;
		} else if(x < -display.width/8 * 2.5) {
			command['LEFT'] = true;
		}
		 else if(y > display.height/8 * 2.5) {
			command['UP'] = true;
		} else if(y < -display.height/8 * 2.5){
			command['DOWN'] = true;
		}
	})
	var renderLoop;
	startButton.addEventListener("click", function() {
		startButton.style.setProperty("display", "none");
		renderLoop = setInterval(function(){
			camera.pos = Spardiac.add(camera.pos, Spardiac.scalarProduct(camera.n, 15));
			if(command['RIGHT']) {
				camera.rotateAlongOrientation(+1/180 * Math.PI);
			} else if(command['LEFT']) {
				camera.rotateAlongOrientation(-1/180 * Math.PI);
			}
			if(command['UP']) {
				camera.rotateAlongPerpendicularOrientation(+1/180 * Math.PI);
			} else if(command['DOWN']){
				camera.rotateAlongPerpendicularOrientation(-1/180 * Math.PI);
			}
			g.clearRect(0,0,1000,600);
			wgrid.render(g, camera);
			for(var i=0;i<buildings.length;++i){
				buildings[i].render(g,camera);
			}
		},1000/60);
	})
})


