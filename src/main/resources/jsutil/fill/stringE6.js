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
				 if (count < 0)		throw "count must be greater or equal than zero";
			else if (count === 0)	return "";
			else {
				var out	= "";
				for (var i=0; i<count; i++) {
					out	+= this;
				}
				return out;
			}
		};
