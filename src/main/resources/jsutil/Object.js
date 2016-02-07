var jsutil	= jsutil || {};

/** Object helper functions */
jsutil.Object = {
	/** return a type-indicating string */
	type: function(obj) {
		return	obj === null	? "null"		:
				obj == null		? "undefined"	:
				Object.prototype.toString.call(obj).match(/(\w+)\]/)[1];
	},
	
	/** returns the value behind every key */
	values: function(obj) {
		var	out	= [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				out.push(obj[key]);
			}
		}
		return out;
	},
	
	/** copies an Object's properties into an new Object */
	clone: function(obj) {
		var	out	= {};
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				out[key] = obj[key];
			}
		}
		return out;
	},
	
	/** returns an object's slots as an Array of Pairs */
	toPairs: function(obj) {
		var	out	= [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				out.push([key, obj[key]]);
			}
		}
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
	},
	
	mapValues: function(obj, func) {
		var	out	= {};
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				out[key]	= func(obj[key]);
			}
		}
		return out;
	}//,
};
