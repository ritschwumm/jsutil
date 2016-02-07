var jsutil	= jsutil || {};

/** RegExp utilities */
jsutil.RegExp = {
	/** escapes characters to make them usable as a literal in a RegExp */
	escape: function(str) {
		return str.replace(/([{}()|.?*+^$\[\]\\])/g, "\\$1");
	},
	
	literal: function(str, flags) {
		return new RegExp(jsutil.RegExp.escape(str), flags);
	},
	
	reflag: function(regexp, flags) {
		return new RegExp(regexp.source, flags);
	},
	
	concat: function(regexpArray, flags) {
		return new RegExp(
			regexpArray
			.map(function(it) { return it.source; })
			.join(""),
			flags || ""
		);
	}//,
};
