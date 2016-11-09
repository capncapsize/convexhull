var pSet;
var lines;
var txt;
var P = [];
var padding = 20;

var pointId = 0;

var updateCan = true;
var mouseActive = false;

var mouseInputButton;
var randomPointsButton;
var computeHullButton;
var loadPointsButton;
var input;

function setup() {
	createCanvas(255 + padding*2,255 + padding*2);
	pSet = new PointSet();

	var fileSelect = createFileInput(gotFile);
	fileSelect.position(220, 280+padding)
	print(lines);

	randomPointsButton = createButton('Random');
	randomPointsButton.position(0, 280+padding);
	randomPointsButton.mousePressed(randomGenPointSet);

	computeHullButton = createButton('Compute');
	computeHullButton.position(80, 280+padding);
	computeHullButton.mousePressed(computeHull);

	loadPointsButton = createButton('Load');
	loadPointsButton.position(160, 280+padding)
	loadPointsButton.mousePressed(loadPoints);

	mouseInputButton = createButton('ToggleMouseInput');
	mouseInputButton.position(0, 340 + padding);
	mouseInputButton.mousePressed(toggleMouseInput);
  	
}

function draw() {
	if(updateCan){
		P=[];
		updateCan = false;
  		background(51);
  		pSet.show();
  		expressPoint(P);
	}
}

function mouseReleased(){
	if(mouseX < width-padding && mouseY < height-padding && mouseActive){
  		pSet.add(new Point(mouseX - padding, mouseY - padding, 255, pointId));
		pointId = pointId + 1;
		updateCan = true;
	}
  }


function expressPoint(P){

	for (var i = P.length - 1; i >= 0; i--) {
		P[i].c = 100;
		P[i].o = 100;
		P[i].show();
	}

	var s = "Hull: ";
	fill(255);
	stroke(0);

	for (var i = 0; i < P.length; i++) {
		s = s + "(P" + P[i].id + ") "
	}

	textSize(10);
	text(s, 10, 30);
	fill(0, 102, 153);
}

function randomGenPointSet(){
	pSet.P = [];
	pointId = 0;
	for (var i = round(random(5,15)); i >= 0; i--) {
		pSet.add(new Point(round(random(255-padding)), round(random(255-padding)), 255, pointId));
		pointId = pointId + 1;
	}
	updateCan = true;
}

function computeHull(){
	background(51);
	P = convexHull(pSet);
	expressPoint(P);
}

function gotFile(file){
	txt = file.data;
	txt = txt.split('\n');
	for (var i = txt.length - 1; i >= 0; i--) {
    	txt[i] = txt[i].split(' ');
	}
	print(txt);

}

function loadPoints(){
	if(txt.length > 0){
		pSet.P = [];
		pointId = 0;
		for (var i = txt.length - 1; i >= 0; i--) {
    		pSet.add(new Point(int(txt[i][0]) + padding, int(txt[i][1]) + padding, 255, pointId));
    		pointId = pointId + 1;
		}
		updateCan = true;
	}
}

function toggleMouseInput(){
	mouseActive = !mouseActive;
}
