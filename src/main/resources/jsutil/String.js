var jsutil	= jsutil || {};

/** String utilities */
jsutil.String = {
	/** return text without prefix or null */
	scan: function(self, s) {
		return self.substring(0, s.length) === s
				? self.substring(s.length)
				: null;
	},
	
	trimLeft: function(s) {
		return s.replace(/^\s+/gm, "");
	},
	
	trimRight: function(s) {
		return this.replace(/\s+$/gm, "");
	}//,
};
