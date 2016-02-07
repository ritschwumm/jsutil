/** remove whitespace from both ends */
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
};

/** return text without prefix or null */
String.prototype.scan = function(s) {
	return this.substring(0, s.length) === s
			? this.substring(s.length)
			: null;
};

/** return text without prefix or null */
String.prototype.scanNoCase = function(s) {
	return this.substring(0, s.length).toLowerCase() === s.toLowerCase()
			? this.substring(s.length)
			: null;
};

/** true when the string starts with the pattern */
String.prototype.startsWith = function(s) {
	return this.indexOf(s) === 0;
};

/** true when the string ends in the pattern */
String.prototype.endsWith = function(s) {
	return this.lastIndexOf(s) === this.length - s.length;
};

/** escapes characters to make them usable as a literal in a RegExp */
String.prototype.escapeRE = function() {
	return this.replace(/([{}()|.?*+^$\[\]\\])/g, "\\$1");
};

/** replace ${name} with the name property of the args object */
String.prototype.template = function(args) {
	return this.template2("${", "}", args);
};

/** replace prefix XXX suffix with the name property of the args object */
String.prototype.template2 = function(prefix, suffix, args) {
	// /\$\{([^}]+?)\}/g
	var	re	= new RegExp(prefix.escapeRE() + "([a-zA-Z]+?)" + suffix.escapeRE(), "g");
	return this.replace(re, function($0, $1) { 
		var arg = args[$1]; 
		return arg !== undefined ? arg : $0;
	});
};
