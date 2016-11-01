var p = [];
var padding = 20;

function setup() {
	createCanvas(255 + padding*2,255 + padding*2);

	for (var i = 10; i >= 0; i--) {
		append(p,new Point(random(255), random(255)));
	}
	
	
}

function draw() {
  background(51);

  for (var i = p.length - 1; i >= 0; i--) {
    p[i].show();
  }
}


function Point(x, y) {
	this.x = x + padding;
	this.y = y + padding;

	this.show = function() {
		fill(255);
		rect(this.x, this.y, 10, 10);
	}
}

function Snake() {
	this.x = 0;
	this.y = 0;
	this.xv = 1;
	this.yv = 0;

	this.update = function() {
		this.x = this.x + this.xv;
		this.y = this.y + this.yv;
	}

	this.show = function() {
		fill(255);
		rect(this.x, this.y, 10, 10)
	}
}
