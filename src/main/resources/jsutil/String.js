var jsutil	= jsutil || {};

/** String utilities */
jsutil.String = {
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
	}//,
};
