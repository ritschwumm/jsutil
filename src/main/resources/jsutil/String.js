var jsutil	= jsutil || {};

/** String utilities */
jsutil.String = {
	/** return text without prefix or null */
	scan: function(self, s) {
		return self.substring(0, s.length) === s
				? self.substring(s.length)
				: null;
	},
	
	/** escapes characters to make them usable as a literal in a RegExp */
	escapeRE: function(self) {
		return self.replace(/([{}()|.?*+^$\[\]\\])/g, "\\$1");
	},
	
	trimLeft: function(s) {
		return s.replace(/^\s+/gm, "");
	},
	
	trimRight: function(s) {
		return this.replace(/\s+$/gm, "");
	}//,
};
