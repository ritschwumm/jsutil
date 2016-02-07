var jsutil	= jsutil || {};

jsutil.StringSet	= function() {
	this.value	= {};
};

jsutil.StringSet.fromArray	= function(array) {
	var out	= new jsutil.StringSet();
	for (var i=0; i<array.length; i++) {
		out.putMutate(array[i]);
	}
	return out;
};

jsutil.StringSet.prototype	= {
	contains: function(it) {
		return this.value[it] === 1;
	},
	
	put: function(it) {
		var out	= this.clone();
		out.putMutate(it);
		return out;
	},
	
	remove: function(it) {
		var out	= this.clone();
		out.removeMutate(it);
		return out;
	},
	
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
	
	intersection: function(that) {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.hasOwnProperty(key) && that.hasOwnProperty(key)) {
				out.putMutate(key);
			}
		}
		return out;
	},
	
	difference: function(that) {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.hasOwnProperty(key) && !that.hasOwnProperty(key)) {
				out.putMutate(key);
			}
		}
		return out;
	},
	
	filter: function(pred, thisObject) {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.hasOwnProperty(key) && pred.call(thisObject, key)) {
				out.putMutate(key);
			}
		}
		return out;
	},
	
	filterNot: function(pred, thisObject) {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.hasOwnProperty(key) && !pred.call(thisObject, key)) {
				out.putMutate(key);
			}
		}
		return out;
	},
	
	toArray: function() {
		return Object.keys(this.value);
	},
	
	//------------------------------------------------------------------------------
	//## private
	
	clone: function() {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.value.hasOwnProperty(key)) {
				out.putMutate(key);
			}
		}
		return out;
	},
	
	/** mutating operation */
	putMutate: function(it) {
		this.value[it]	= 1;
	},
	
	/** mutating operation */
	removeMutate: function(it) {
		delete this.value[it];
	}//,
};

jsutil.StringSet.empty				= new jsutil.StringSet();
jsutil.StringSet.empty.putMutate	= function() { throw new Error("don't mutate StringSet.empty"); };
jsutil.StringSet.empty.removeMutate	= function() { throw new Error("don't mutate StringSet.empty"); };
