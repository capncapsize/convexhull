var pSet;
var padding = 20;

function setup() {
	createCanvas(255 + padding*2,255 + padding*2);
	pSet = new PointSet();


//	for (var i = 5; i >= 0; i--) {
//		pSet.add(new Point(round(random(255)), round(random(255)), 255));
//	}
//	pSet.qsort();
}

function draw() {
  	background(51);
  	pSet.show();
	convexHull(pSet);
}

function mouseReleased(){
  	pSet.add(new Point(mouseX - padding, mouseY - padding, 255));
  	pSet.qsort();
  }

