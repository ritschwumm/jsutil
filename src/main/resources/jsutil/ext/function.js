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
