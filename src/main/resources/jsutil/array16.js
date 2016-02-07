//------------------------------------------------------------------------------
// @see http://developer.mozilla.org/en/docs/Talk:Core_JavaScript_1.5_Reference:Global_Objects:Array

if (!Array.prototype.indexOf)
	Array.prototype.indexOf = function(item, startIndex) {
		var len = this.length;
		if (startIndex === null)
			startIndex = 0;
		else if (startIndex < 0) {
			startIndex += len;
			if (startIndex < 0)
				startIndex = 0;
		}
		for (var i = startIndex; i < len; i++) {
			var val = this[i] || this.charAt && this.charAt(i);
			if (val === item)
				return i;
		}
		return -1;
	};

if (!Array.prototype.lastIndexOf)
	Array.prototype.lastIndexOf = function(item, startIndex) {
		var len = this.length;
		if (startIndex === null || startIndex >= len)
			startIndex = len - 1;
		else if (startIndex < 0)
			startIndex += len;
		for (var i = startIndex; i >= 0; i--) {
			var val = this[i] || this.charAt && this.charAt(i);
			if (val === item)
				return i;
		}
		return -1;
	};

if (!Array.prototype.forEach)
	Array.prototype.forEach = function(func, thisVal) {
		var len = this.length;
		for (var i = 0; i < len; i++)
			func.call(thisVal, this[i] || this.charAt && this.charAt(i), i, this);
	};

if (!Array.prototype.map)
	Array.prototype.map = function(func, thisVal) {
		var len = this.length;
		var ret = new Array(len);
		for (var i = 0; i < len; i++)
			ret[i] = func.call(thisVal, this[i] || this.charAt && this.charAt(i), i, this);
		return ret;
	};

if (!Array.prototype.filter)
	Array.prototype.filter = function(func, thisVal) {
		var len = this.length;
		var ret = new Array();
		for (var i = 0; i < len; i++) {
			var val = this[i] || this.charAt && this.charAt(i);
			if(func.call(thisVal, val, i, this))
				ret[ret.length] = val;
		}
		return ret;
	};

if (!Array.prototype.every)
	Array.prototype.every = function(func, thisVal) {
		var len = this.length;
		for (var i = 0; i < len; i++)
			if (!func.call(thisVal, this[i] || this.charAt && this.charAt(i), i, this))
				return false;
		return true;
	};

if (!Array.prototype.some)
	Array.prototype.some = function(func, thisVal) {
		var len = this.length;
		for (var i = 0; i < len; i++)
			if (func.call(thisVal, this[i] || this.charAt && this.charAt(i), i, this))
				return true;
		return false;
	};