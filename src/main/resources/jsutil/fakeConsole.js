var fakeConsole	= {
	debug:			Function.identity,
	info:			Function.identity,
	warn:			Function.identity,
	error:			Function.identity,
	assert:			Function.identity,
	dir:			Function.identity,
	dirxml:			Function.identity,
	trace:			Function.identity,
	group:			Function.identity,
	groupCollapsed:	Function.identity,
	groupEnd:		Function.identity,
	time:			Function.identity,
	timeEnd:		Function.identity,
	profile:		Function.identity,
	profileEnd:		Function.identity,
	count:			Function.identity
};

// all
if (window.console) {
	// opera
	if (window.console.log && !window.console.debug) {
		window.console.debug	= window.console.log;
	}

	// inject
	for (key in fakeConsole) {
		if (!fakeConsole.hasOwnProperty(key))	continue;
		if (window.console[key])				continue;
		window.console[key]	= fakeConsole[key];
	}
} 
else {
	window.console	= fakeConsole;
}

// TODO get rid of this
// necessary on chrome
window.debug	= function() {
	window.console.debug.apply(window.console, arguments);
};
