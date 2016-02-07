/** the unary identiy function */
Function.identity = function(x) { return x; }

/** create a constant Function */
Function.constant = function(c) { return function(v) { return c; } }

/** create a Function calling this Function with a fixed this */
Function.prototype.bind = function(thisObject) {
	var self	= this;	// == arguments.callee
	return function() {
		return self.apply(thisObject, arguments);
	};
};
/*
NOTE fun.bind(thisValue [, arg1 [, arg2 [...] ] ])
@see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
*/

/** create a Function calling this Function with fixed first arguments */
Function.prototype.fix = function() {
	var	self	= this;	// == arguments.callee
	var args	= Array.prototype.slice.apply(arguments);
	return function() {
		return self.apply(this, args.concat(Array.prototype.slice.apply(arguments)));
	};
};


/** 
 * call this thunk after some millis.
 * optionally call the given continuation with the result afterwards.
 * returns an object with an cancel method to prevent this thunk from being called.
 * the cancel method returns whether cancellation was successful
 */
Function.prototype.callAfter = function(millis, continuation) {
	var	self	= this;
	var running	= false;
	function execute() { 
		running = true; 
		var	out	= self.call(); 
		if (continuation)	continuation(out);
	}
	var	timer	= window.setTimeout(execute, millis);
	function cancel() {
		 window.clearTimeout(timer) 
		 return !running;
	}
	return {
		cancel: cancel
	}; 
};
