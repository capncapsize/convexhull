var p = [];
var padding = 0;

var waitForRelease = true;

function setup() {
	createCanvas(255 + padding*2,255 + padding*2);

	/*for (var i = 10; i >= 0; i--) {
		append(p,new Point(random(255), random(255)));
	}*/
	
	
}

function draw() {
  background(51);

  for (var i = p.length - 1; i >= 0; i--) {
    p[i].show();
  }
}


function Point(x, y, c) {
	this.x = x + padding;
	this.y = y + padding;
	this.c = c;

	this.show = function() {
		fill(this.c);
		rect(this.x, this.y, 10, 10);
	}
}


function mergeSort(P) {
	print(P);
}

function mouseReleased(){
  	append(p,new Point(mouseX, mouseY, 255));
  	mergeSort(p);
  }