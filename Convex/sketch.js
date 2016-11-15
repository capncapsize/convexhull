var pSet;
var lines;
var txt;
var P = [];
var padding = 23;
var scl = 10;
var originX; 
var originY;

var pointId = 0;

var updateCan = true;
var mouseActive = false;

var mouseInputButton;
var randomPointsButton;
var computeHullButton;
var loadPointsButton;
var input;

var xPix = 550 + padding*2;
var yPix = 550 + padding*2;

function setup() {
	createCanvas(xPix,yPix);
	originX = round((xPix - padding*2 - 200)/2);
	originY = originX;

	pSet = new PointSet();

	var fileSelect = createFileInput(gotFile);
	fileSelect.position(220, xPix+padding)
	print(lines);

	randomPointsButton = createButton('Random');
	randomPointsButton.position(0, xPix+padding);
	randomPointsButton.mousePressed(randomGenPointSet);

	computeHullButton = createButton('Compute');
	computeHullButton.position(80, xPix+padding);
	computeHullButton.mousePressed(computeHull);

	loadPointsButton = createButton('Load');
	loadPointsButton.position(160, xPix+padding)
	loadPointsButton.mousePressed(loadPoints);

	mouseInputButton = createButton('ToggleMouseInput');
	mouseInputButton.position(0, xPix+padding + 50);
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
		print(round((mouseX - padding)/scl));
  		pSet.add(new Point((mouseX - padding - originX)/scl, (mouseY - padding - originY)/scl, 255, pointId));
		pointId = pointId + 1;
		updateCan = true;
	}
  }


function expressPoint(P){
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
		pSet.add(new Point(round(random(20)), round(random(20)), 255, pointId));
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
    		pSet.add(new Point(float(txt[i][0]), float(txt[i][1]), 255, pointId));
    		pointId = pointId + 1;
		}
		updateCan = true;
	}
}

function toggleMouseInput(){
	mouseActive = !mouseActive;
}
