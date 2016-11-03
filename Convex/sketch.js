var pSet;
var padding = 20;

var pointId = 0;

function setup() {
	createCanvas(255 + padding*2,255 + padding*2);
	pSet = new PointSet();


	//for (var i = 5; i >= 0; i--) {
	//	pSet.add(new Point(random(255), random(255), 255, pointId));
	//	pointId++;
	//}
	//pSet.qsort();
}

function draw() {
  	background(51);
  	pSet.show();
	var P = convexHull(pSet);

	expressPoint(P);
}

function mouseReleased(){
	if(mouseX < width && mouseY < height){
  		pSet.add(new Point(mouseX - padding, mouseY - padding, 255, pointId));
  		pSet.qsort();
		pointId++;
	}
  }


function expressPoint(P){
	var s = "Hull: ";

	for (var i = 0; i < P.length; i++) {
		s = s + "(P" + P[i].id + ") "
	}

	fill(255);
	textSize(10);
	text(s, 10, 30);
	fill(0, 102, 153);
}

