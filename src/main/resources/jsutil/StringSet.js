var jsutil	= jsutil || {};

jsutil.StringSet	= function() {
	this.value	= {};
};

jsutil.StringSet.fromArray	= function(array) {
	if (array.length === 0)	return jsutil.StringSet.empty;
	
	var out	= new jsutil.StringSet();
	for (var i=0; i<array.length; i++) {
		out.addMutate(array[i]);
	}
	return out;
};

jsutil.StringSet.prototype	= {
	contains: function(it) {
		return this.value.hasOwnProperty(it);
	},
	
	lacks: function(it) {
		return !this.contains(it);
	},
	
	add: function(it) {
		var out	= this.clone();
		out.addMutate(it);
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
			if (this.contains(key)) {
				out.addMutate(key);
			}
		}
		for (var key in that.value) {
			if (that.contains(key)) {
				out.addMutate(key);
			}
		}
		return out;
	},
	
	intersection: function(that) {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.contains(key) && that.contains(key)) {
				out.addMutate(key);
			}
		}
		return out;
	},
	
	difference: function(that) {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.contains(key) && !that.contains(key)) {
				out.addMutate(key);
			}
		}
		return out;
	},
	
	filter: function(pred, thisObject) {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.contains(key) && pred.call(thisObject, key)) {
				out.addMutate(key);
			}
		}
		return out;
	},
	
	filterNot: function(pred, thisObject) {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.contains(key) && !pred.call(thisObject, key)) {
				out.addMutate(key);
			}
		}
		return out;
	},
	
	partition: function(pred, thisObject) {
		var trues	= new jsutil.StringSet();
		var falses	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.contains(key)) {
				var target	= pred.call(thisObject, key) ? trues : falses;
				target.addMutate(key);
			}
		}
		return [ trues, falses ];
	},
	
	equalsTo: function(that) {
		for (var key in this.value) {
			if (this.contains(key) && !that.contains(key))	return false;
		}
		for (var key in that.value) {
			if (that.contains(key) && !this.contains(key))	return false;
		}
		return true;
	},
	
	toArray: function() {
		return Object.keys(this.value);
	},
	
	//------------------------------------------------------------------------------
	//## private
	
	clone: function() {
		var out	= new jsutil.StringSet();
		for (var key in this.value) {
			if (this.contains(key)) {
				out.addMutate(key);
			}
		}
		return out;
	},
	
	/** mutating operation */
	addMutate: function(it) {
		this.value[it]	= 1;
	},
	
	/** mutating operation */
	removeMutate: function(it) {
		delete this.value[it];
	}//,
};

jsutil.StringSet.empty				= new jsutil.StringSet();
jsutil.StringSet.empty.addMutate	= function() { throw new Error("don't mutate StringSet.empty"); };
jsutil.StringSet.empty.removeMutate	= function() { throw new Error("don't mutate StringSet.empty"); };
