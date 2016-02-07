var jsutil	= jsutil || {};

/** path is dot-separated, base is optional and defaults to window */
jsutil.ns	= function(path, base) {
	var root	= base || window;
	var parts	= path.split(".");
	for (var i=0; i<parts.length; i++) {
		var part	= parts[i];
		root	= root[part]	= root[part] || {};
	}
	return root;
};
