// NOTE keys and entries is not supported yet

/** can be used to copy a function's arguments into a real Array */
if (!Array.from)
		Array.from	= function(args) {
			return Array.prototype.slice.apply(args);
		};
		
if (!Array.of)
		Array.of	= function(args) {
			return Array.prototype.slice.call(args);
		};

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
