//------------------------------------------------------------------------------
//## Object

/** copies an object's properties into another object */
if (!Object.assign)
		// TODO original allows multiple sources
		Object.assign	= function(target, source) {
			for (var key in source) {
				if (source.hasOwnProperty(key)) {
					target[key] = source[key];
				}
			}
		};

//------------------------------------------------------------------------------
//## Array

/** can be used to copy a function's arguments into a real Array */
if (!Array.from)
		// TODO original can map
		Array.from	= function(args) {
			return Array.prototype.slice.apply(args);
		};
		
if (!Array.of)
		Array.of	= function() {
			return Array.prototype.slice.call(arguments);
		};
		
/** whether this array contains an element */
if (!Array.prototype.contains)
		Array.prototype.contains = function(element) {
			return this.indexOf(element) !== -1;
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
		
//------------------------------------------------------------------------------
//## String

/** whether this string starts with another */
if (!String.prototype.startsWith)
		String.prototype.startsWith	= function(s, position) {
			var pos	= position || 0;
			return this.indexOf(s, pos) === pos;
		};

/** whether this string ends with another */
if (!String.prototype.endsWith)
		String.prototype.endsWith	= function(s, position) {
			var pos	= (position || this.length) - s.length;
			var idx	= this.lastIndexOf(s);
			return idx !== -1 && idx === pos;
		};
		
/** whether this string contains another */
if (!String.prototype.contains)
		String.prototype.contains	= function(s, start) {
			return this.indexOf(s, start) !== -1;
		};

/** repeat this string count times */
if (!String.prototype.repeat)
		String.prototype.repeat	= function(count) {
				 if (count < 0)		throw new Error("count must be greater or equal than zero");
			else if (count === 0)	return "";
			else {
				var out	= "";
				for (var i=0; i<count; i++) {
					out	+= this;
				}
				return out;
			}
		};
