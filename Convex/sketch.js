var pSet;
var padding = 20;

var pointId = 0;

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
	var P = convexHull(pSet);

	expressPoint(P);
}

function mouseReleased(){
  	pSet.add(new Point(mouseX - padding, mouseY - padding, 255, pointId));
  	pSet.qsort();

  	pointId = pointId + 1;
  }


function expressPoint(P){
	var s = "Hull: ";
	fill(255);

	for (var i = 0; i < P.length; i++) {
		s = s + "(P" + P[i].id + ") "
	}

	textSize(10);
	text(s, 10, 30);
	fill(0, 102, 153);
}

