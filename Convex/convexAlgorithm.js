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

	this.add = function(p){
		append(this.P, p);
	}

	this.qsort = function(){
		this.P.sort(this.compareTo);
	}

	this.show = function(){
		for (var i = this.P.length - 1; i >= 0; i--) {
    		this.P[i].show();
  		}
  		this.connect(255);
	}

	this.connect = function(c){
		stroke(c);
		for(var i = this.P.length - 2; i>=0;i--){
			line(this.P[i].x, this.P[i].y, this.P[i+1].x, this.P[i+1].y);
		}
	}

	this.compareTo = function(a, b){
		return a.x - b.x;
	}	
}

function convexHull(Set) {

	var lower = new PointSet();
	var upper = new PointSet();

	for(var i = Set.P.length - 1; i>=0;i--){
		while(upper.P.length >= 2 && ccw(upper.P[upper.P.length - 2], upper.P[upper.P.length - 1], Set.P[i]) <= 0){
			upper.P.pop();
			//stroke('red');
			//line(Set.P[i].x, Set.P[i].y, Set.P[i+2].x, Set.P[i+2].y)
		}
		upper.add(Set.P[i]);
	}

	for (var i = 0; i < Set.P.length; i++) {
		while(lower.P.length >= 2 && ccw(lower.P[lower.P.length - 2], lower.P[lower.P.length - 1], Set.P[i]) <= 0){
			lower.P.pop();
		}
		lower.add(Set.P[i])
	}
	//reverse(lower.P)
	//reverse(upper.P)

	upper.connect('red');
	lower.connect('red');

	fill(255);

}

function ccw(p1, p2, p3) {
   return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x)
}