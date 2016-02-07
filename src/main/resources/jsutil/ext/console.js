var jsutil	= jsutil || {};

jsutil.Console	= {
	debug:			function() {},
	info:			function() {},
	warn:			function() {},
	error:			function() {},
	assert:			function() {},
	dir:			function() {},
	dirxml:			function() {},
	trace:			function() {},
	group:			function() {},
	groupCollapsed:	function() {},
	groupEnd:		function() {},
	time:			function() {},
	timeEnd:		function() {},
	profile:		function() {},
	profileEnd:		function() {},
	count:			function() {}
};

if (window.console) {
	// opera
	if (window.console.log && !window.console.debug) {
		window.console.debug	= window.console.log;
	}

	// inject missing functions
	for (var key in jsutil.Console) {
		if (!window.console[key] && jsutil.Console.hasOwnProperty(key)) {
			window.console[key]	= jsutil.Console[key];
		}
	}
}
else {
	window.console	= jsutil.Console;
}
