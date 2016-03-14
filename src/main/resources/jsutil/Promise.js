var jsutil	= jsutil || {};

jsutil.Promises	= {
	later: function(delay) {
		return new Promise(function(resolve, reject) {
			window.setTimeout(resolve, delay);
		});
	}//,
};
