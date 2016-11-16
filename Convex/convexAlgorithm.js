function Point(x, y, c, id) {
	this.id = id
	this.x = round(x + padding/scl + originX/scl);
	this.y = round(y + padding/scl + originY/scl);
	this.c = c;
	this.o = 255;

	this.show = function() {
		stroke(0);
		fill(this.c, this.o);
		rect(this.x*scl, this.y*scl, 1, 1);
		fill(0);
		textSize(8);
		//text(this.id, this.x*scl + 2, this.y*scl + 9);
	}
}

function PointSet(){
	this.P = []
	this.repeatedSort = false;

	this.add = function(p){
		append(this.P, p);
	}

	this.qsort = function(sortAfter){
		var tmp = [];

		for (var i = 0; i < this.P.length; i++) {
			append(tmp, this.P[i]);
		}
		repeatedSort = false;
		if(sortAfter == 'x'){
			this.P.sort(this.compareToX);
			print("Compare X");
			if(repeatedSort == true){
				//this.P = tmp;
			}
		}else{
			this.P.sort(this.compareToY);
			print("Compare Y");
			if(repeatedSort == true){
				this.P = tmp;
			}
		}
		return repeatedSort;
	}

	this.show = function(){
		this.connect(255);
		for (var i = this.P.length - 1; i >= 0; i--) {
    		this.P[i].show();
  		}
	}

	this.connect = function(c){
		stroke(c);
		for(var i = this.P.length - 2; i>=0;i--){
			line(this.P[i].x*scl, this.P[i].y*scl, this.P[i+1].x*scl, this.P[i+1].y*scl);
		}
	}

	this.compareToY = function(a, b){
		if(a.y == b.y){
			repeatedSort = true;
			print("Y failed");
		}
		return a.y - b.y;
	}	

		this.compareToX = function(a, b){
		if(a.x == b.x){
			repeatedSort = true;
			print("X failed");
		}
		return a.x - b.x;
	}
}

function convexHull(Set) {

	if(Set.qsort('y')){
		Set.qsort('x');
	}

	var lower = new PointSet();
	var upper = new PointSet();

	for(var i = Set.P.length - 1; i>=0;i--){
		while(upper.P.length >= 2 && ccw(upper.P[upper.P.length - 2], upper.P[upper.P.length - 1], Set.P[i]) <= 0){
			upper.P.pop();
		}
		upper.add(Set.P[i]);
	}

	for (var i = 0; i < Set.P.length; i++) {
		while(lower.P.length >= 2 && ccw(lower.P[lower.P.length - 2], lower.P[lower.P.length - 1], Set.P[i]) <= 0){
			lower.P.pop();
		}
		lower.add(Set.P[i])
	}

	Set.show();

	upper.connect('red');
	lower.connect('red');

	upper.P.pop();
	lower.P.pop();

	return concat(upper.P, lower.P);

}

function ccw(p1, p2, p3) {
   return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x)
}