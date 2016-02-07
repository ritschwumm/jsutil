var jsutil	= jsutil || {};

/** text utilities */
jsutil.Text = {
	/** 
	 * gets an Array of search/replace-pairs (two Strings) and returns 
	 * a function taking a String and replacing every search-String with
	 * the corresponding replace-string
	 */
	recoder: function(pairs) {
		var	search	= [];
		var	replace	= {};
		for (var i=0; i<pairs.length; i++) {
			var	pair	= pairs[i];
			search.push(pair[0].escapeRE());
			replace[pair[0]] = pair[1]; 
		}
		var	regexp	= new RegExp(search.join("|"), "gm");
		return function(s) { 
				return s.replace(regexp, function(dollar0) {  
						return replace[dollar0]; }); };
	},
	
	/** concatenate all non-empty values in an array with a separator */
	joinPrintable: function(separator, values) {
		var	filtered	= [];
		for (var i=0; i<values.length; i++) {
			var	value	= values[i];
			if (value === null || value === "")	continue; 
			filtered.push(value);
		}
		return filtered.join(separator ? separator : "");
	},
	
	/** make a function returning its argument */
	replaceFunc: function(search, replace) {
		return function(s) {
			return s.replace(search, replace);
		};
	},
	
	/** make a function adding a given prefix */
	prefixFunc: function(separator, prefix) {
		return function(suffix) { 
			return jsutil.Text.joinPrintable(separator, [ prefix, suffix ]); 
		};
	},
	
	/** make a function adding a given suffix */
	suffixFunc: function(separator, suffix) {
		return function(prefix) { 
			return jsutil.Text.joinPrintable(separator, [ prefix, suffix ]);
		};
	}//,
};
