var pSet;
var padding = 0;

function setup() {
	createCanvas(255 + padding*2,255 + padding*2);
	pSet = new PointSet();
}

function draw() {
  background(51);
  pSet.show();

  convexHull(pSet);
}

function mouseReleased(){
  	pSet.add(new Point(mouseX, mouseY, 255));
  }

