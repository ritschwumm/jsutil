var jsutil	= jsutil || {};

// TODO implement filter, find, map, flatMap, flatten aso. 

jsutil.StringSet	= function() {
	this.value	= {};
}
jsutil.StringSet.prototype	= {
	/** mutating operation */
	putMutate: function(it) {
		this.value[it]	= 1;
	},
	
	/** mutating operation */
	removeMutate: function(it) {
		delete this.value[it];
	},
	
	//------------------------------------------------------------------------------
	
	contains: function(it) {
		return this.value[it] === 1;
	},
	
	/** returns a new StringSet */
	put: function(it) {
		var out	= this.clone();
		out.putMutate(it);
		return out;
	},
	
	/** returns a new StringSet */
	remove: function(it) {
		var out	= this.clone();
		out.remove(it);
		return out;
	},
	
	/** returns a new StringSet */
	union: function(that) {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.hasOwnProperty(key)) {
				out.putMutate(key);
			}
		}
		for (var key in that.value) {
			if (that.hasOwnProperty(key)) {
				out.putMutate(key);
			}
		}
		return out;
	},
	
	/** returns a new StringSet */
	intersection: function(that) {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.hasOwnProperty(key) && that.hasOwnProperty(key)) {
				out.putMutate(key);
			}
		}
		return out;
	},
	
	/** returns a new StringSet */
	difference: function(that) {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.hasOwnProperty(key) && !that.hasOwnProperty(key)) {
				out.putMutate(key);
			}
		}
		return out;
	},
	
	/** returns a new StringSet */
	clone: function() {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.value.hasOwnProperty(key)) {
				out.putMutate(key);
			}
		}
		return out;
	},
	
	toArray: function() {
		return jsutil.Object.keys(this.value);
	}//,
};

jsutil.StringSet.empty	= new jsutil.StringSet();
jsutil.StringSet.empty.putMutate	= function() { throw "don't mutate StringSet.empty" };
jsutil.StringSet.empty.removeMutate	= function() { throw "don't mutate StringSet.empty" };

jsutil.StringSet.fromArray	= function(array) {
	var out	= new jsutil.StringSet();
	for (var i=0; i<array.length; i++) {
		out.putMutate(array[i]);
	}
	return out;
};
