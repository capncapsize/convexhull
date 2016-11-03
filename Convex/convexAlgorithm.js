function Point(x, y, c) {
	this.x = x + padding;
	this.y = y + padding;
	this.c = c;

	this.show = function() {
		fill(this.c);
		rect(this.x, this.y, 10, 10);
	}
}

function PointSet(){
	this.P = []

	this.add =function(p){
		append(this.P, p);
		this.P.sort(this.compareTo)
	}

	this.show = function(){
		for (var i = this.P.length - 1; i >= 0; i--) {
    		this.P[i].show();
  		}
  		this.connect();
	}

	this.connect = function(){
	for(var i = this.P.length - 2; i>=0;i--){
		stroke(255);
		line(this.P[i].x, this.P[i].y, this.P[i+1].x, this.P[i+1].y);
	}

	this.compareTo = function(a, b){
		return a.x >= b.x;
	}
}
	
}

function convexHull(Set) {

	for(var i = Set.P.length - 3; i>=0;i--){
		if(0 > ccw(Set.P[i],Set.P[i+1],Set.P[i+2])){
			stroke('red');
			line(Set.P[i].x, Set.P[i].y, Set.P[i+2].x, Set.P[i+2].y)
		}
	}
}

function ccw(p1, p2, p3){
	return (p2.x - p1.x)*(p3.y - p1.y) - (p2.y - p1.y)*(p3.x - p1.x)
}