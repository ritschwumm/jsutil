var jsutil	= jsutil || {};

jsutil.Hash = {
	/** to be used to get an url for some state */
	ref: function(value) {
		return window.location.href.replace(/#.*/, "") + "#" + value;
	},
	
	/** current hash value with at least 1 character or null */
	get: function() {
		// NOTE both "#" and "" in the url resolve as "" in window.location.hash
		return (window.location.hash || "#").substring(1) || null;
	},
	
	/** set the current hash, my be null to clear */
	set: function(value) {
		// NOTE both setting window.location.hash to "#" or "" set the url to "#"
		window.location.hash	= "#" + (value !== null ? value : "");
	},
	
	/** takes a binary callback taking new and old value and an unary error callback, returns a nullary disconnect function */
	watch: function(changedFunc, errorFunc) {
		// NOTE could be optimized
		/*
		window.location.watch('hash', function (e) { ... });
		window.addEventListener("hashchange", funcRef, false);
		*/
		
		var	self	= this;
		var	value	= self.get();
		function check() {
			try {
				var	oldValue	= value;
				value	= self.get();
				if (value !== oldValue)	{
					changedFunc(value, oldValue);
				}
			}
			catch (e) {
				if (errorFunc)	errorFunc(e);
			}
		}
		var timer	= window.setInterval(check, 100);
		function kill() {
			window.clearInterval(timer);
		}
		return kill;
	}//,
};
