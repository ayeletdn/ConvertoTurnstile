function Counter() {
	var x = 0; // store x in closure
	return function() { // return a function
		return x = x+1; // which returns an aggregated value over x
	}
}