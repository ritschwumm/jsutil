var jsutil	= jsutil || {};

// NOTE: these do _not_ break for (foo in bar)

/** Object helper functions */
jsutil.Object = {
	/** return a type-indicating string */
	type: function(obj) {
		return	obj === null	? "null"		:
				obj == null		? "undefined"	:
				Object.prototype.toString.call(obj).match(/(\w+)\]/)[1];
	},
	
	/*
	NOTE Object.keys(obj)
	@see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
	NOTE Object.getOwnPropertyNames(obj)
	@see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
	*/
	
	/** returns all keys as an Array */
	keys: function(obj) {
		var	out	= [];
		for (var key in obj)
				if (obj.hasOwnProperty(key))
						out.push(key);
		return out;
	},
	
	/** returns the value behind every key */
	values: function(obj) {
		var	out	= [];
		for (var key in obj)
				if (obj.hasOwnProperty(key))
						out.push(obj[key]);
		return out;
	},
	
	/** copies an Object's properties into an new Object */
	clone: function(obj) {
		var	out	= {};
		for (var key in obj)
				if (obj.hasOwnProperty(key))	
						out[key] = obj[key];
		return out;
	},
	
	/** returns an object's slots as an Array of Pairs */
	toPairs: function(obj) {
		var	out	= [];
		for (var key in obj)
				if (obj.hasOwnProperty(key))
						out.push([key, obj[key]]);
		return out;
	},
	
	/** creates an Object from an Array of key/value pairs, the last Pair for a key wins */
	fromPairs: function(pairs) {
		var	out	= {};
		for (var i=0; i<pairs.length; i++) {
			var	pair		= pairs[i];
			out[pair[0]]	= pair[1];
		}
		return out;
	}//,
};
