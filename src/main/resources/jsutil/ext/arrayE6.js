// NOTE keys and entries is not supported yet

if (!Array.prototype.find)
	Array.prototype.find	= function(predicate, thisVal) {
		var len	= this.length;
		for (var i=0; i<len; i++) {
			var it	= this[i];
			if (predicate.call(thisVal, it, i, this))	return it;
		}
		return undefined;
	};

if (!Array.prototype.findIndex)
	Array.prototype.findIndex	= function(predicate, thisVal) {
		var len	= this.length;
		for (var i=0; i<len; i++) {
			var it	= this[i];
			if (predicate.call(thisVal, it, i, this))	return i;
		}
		return undefined;
	};
