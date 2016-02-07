var jsutil	= jsutil || {};

/**
 * tries to behave similar to a Location object
 * protocol	includes everything before the //
 * host		is the plain hostname
 * port		is a number or null
 * pathname	includes the first slash or is null
 * hash		includes the leading # or is null
 * search	includes the leading ? or is null
 */
jsutil.Loc	= function(urlStr) {
	var	m	= this.parser.exec(urlStr);
	if (!m)	throw "cannot parse URL: " + urlStr;
	this.local		= !m[1];
	this.protocol	= m[2] ? m[2] : null;							// http:
	this.host		= m[3] ? m[3] : null;							// de.wikipedia.org
	this.port		= m[4] ? parseInt(m[4].substring(1)) : null;	// 80
	this.pathname	= m[5] ? m[5] : "";								// /wiki/Test
	this.hash		= m[6] ? m[6] : "";								// #Industry
	this.search		= m[7] ? m[7] : "";								// ?action=edit
}
jsutil.Loc.prototype = {
	/** matches a global or local URL */
	parser: /((.+?)\/\/([^:\/]+)(:[0-9]+)?)?([^#?]+)?(#[^?]*)?(\?.*)?/,

	/** returns the href which is the only usable string representationn of an URL */
	toString: function() {
		return this.hostPart() + this.pathPart();
	},

	/** returns everything before the pathPart */
	hostPart: function() {
		if (this.local)	return "";
		return this.protocol + "//" + this.host
			+ (this.port ? ":" + this.port	: "");
	},

	/**  returns everything local to the server */
	pathPart: function() {
		return this.pathname + this.hash + this.search;
	},

	/** converts the searchstring into an Array of name/value-pairs */
	args: function() {
		if (!this.search)	return [];
		var	out		= [];
		var	split	= this.search.substring(1).split("&");
		for (var i=0; i<split.length; i++) {
			var	parts	= split[i].split("=");
			out.push([
				decodeURIComponent(parts[0]), 
				decodeURIComponent(parts[1])
			]);
		}
		return out;
	},
	
	/** converts the searchString into a hash. */
	argsMap: function() {
		return jsutil.Object.fromPairs(this.args());
		/*
		var	out		= {};
		var	pairs	= this.args();
		for (var i=0; i<pairs.length; i++) {
			var	pair	= pairs[i];
			var	key		= pair[0];
			var	value	= pair[1];
			// if (key in out)	throw "duplicate argument: " + key);
			out[key]	= value;
		}
		return out;
		*/
	}//,
};
