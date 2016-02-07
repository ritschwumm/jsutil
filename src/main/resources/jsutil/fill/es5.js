//------------------------------------------------------------------------------
//## Object

if (!Object.create)
		Object.create	= function(proto) {
			if (arguments.length != 1)	throw new Error("Object.create polyfill expected a single parameter");
			function F() {}
			F.prototype	= proto;
			return new F();
		};

//------------------------------------------------------------------------------
//## Function

if (!Function.prototype.bind)
		Function.prototype.bind = function(oThis) {
			if (typeof this !== "function")	throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			var aArgs	= Array.prototype.slice.call(arguments, 1); 
			var fToBind	= this;
			var	fNOP	= function() {};
			var fBound	= function() {
				return fToBind.apply(
					this instanceof fNOP && oThis ? this : oThis,
					aArgs.concat(Array.prototype.slice.call(arguments))
				);
			};
			fNOP.prototype		= this.prototype;
			fBound.prototype	= new fNOP();
			return fBound;
		};
		
//------------------------------------------------------------------------------
//## Array

if (!Array.isArray)
		Array.isArray = function(it) {
			return Object.prototype.toString.call(it) === "[object Array]";
		};

if (!Array.prototype.indexOf)
		Array.prototype.indexOf = function(item, startIndex) {
			var len	= this.length;
			if (startIndex === null) {
				startIndex = 0;
			}
			else if (startIndex < 0) {
				startIndex += len;
				if (startIndex < 0) {
					startIndex = 0;
				}
			}
			for (var i=startIndex; i<len; i++) {
				var val	= this[i] || this.charAt && this.charAt(i);
				if (val === item)	return i;
			}
			return -1;
		};

if (!Array.prototype.lastIndexOf)
		Array.prototype.lastIndexOf = function(item, startIndex) {
			var len	= this.length;
			if (startIndex === null || startIndex >= len) {
				startIndex	= len - 1;
			}
			else if (startIndex < 0) {
				startIndex	+= len;
			}
			for (var i=startIndex; i>=0; i--) {
				var val	= this[i] || this.charAt && this.charAt(i);
				if (val === item)	return i;
			}
			return -1;
		};

if (!Array.prototype.forEach)
		Array.prototype.forEach = function(func, thisVal) {
			var len	= this.length;
			for (var i=0; i<len; i++) {
				func.call(thisVal, this[i] || this.charAt && this.charAt(i), i, this);
			}
		};

if (!Array.prototype.map)
		Array.prototype.map = function(func, thisVal) {
			var len	= this.length;
			var ret	= new Array(len);
			for (var i=0; i<len; i++) {
				ret[i] = func.call(thisVal, this[i] || this.charAt && this.charAt(i), i, this);
			}
			return ret;
		};

if (!Array.prototype.filter)
		Array.prototype.filter = function(func, thisVal) {
			var len	= this.length;
			var ret	= new Array();
			for (var i=0; i<len; i++) {
				var val	= this[i] || this.charAt && this.charAt(i);
				if (func.call(thisVal, val, i, this)) {
					ret[ret.length]	= val;
				}
			}
			return ret;
		};

if (!Array.prototype.every)
		Array.prototype.every = function(func, thisVal) {
			var len	= this.length;
			for (var i=0; i<len; i++) {
				if (!func.call(thisVal, this[i] || this.charAt && this.charAt(i), i, this))
						return false;
			}
			return true;
		};

if (!Array.prototype.some)
		Array.prototype.some = function(func, thisVal) {
			var len	= this.length;
			for (var i=0; i<len; i++) {
				if (func.call(thisVal, this[i] || this.charAt && this.charAt(i), i, this))
						return true;
			}
			return false;
		};
		
if (!Array.prototype.reduce)
		Array.prototype.reduce	= function(fun /*, initial*/) {
			var len	= this.length;
			if (typeof fun != "function")			throw new TypeError();
			if (len == 0 && arguments.length == 1)	throw new TypeError();
			
			var i	= 0;
			var rv;
			if (arguments.length >= 2) {
				rv	= arguments[1];
			}
			else {
				while (true) {
					if (i in this) {
						rv	= this[i++];
						break;
					}
					if (++i >= len)	throw new TypeError();
				}
			}
			
			for (;i<len; i++) {
				if (i in this) {
					rv = fun.call(null, rv, this[i], i, this);
				}
			}
			
			return rv;
		};

if (!Array.prototype.reduceRight)
		Array.prototype.reduceRight = function(fun /*, initial*/) {
			var len	= this.length;
			if (typeof fun != "function")			throw new TypeError();
			if (len == 0 && arguments.length == 1)	throw new TypeError();
			
			var i	= len - 1;
			var rv;
			if (arguments.length >= 2) {
				rv = arguments[1];
			}
			else {
				while (true) {
					if (i in this) {
						rv	= this[i--];
						break;
					}
					if (--i < 0)	throw new TypeError();
				}
			}
			
			for (; i>=0; i--) {
				if (i in this) {
					rv = fun.call(null, rv, this[i], i, this);
				}
			}
			
			return rv;
		};
		
//------------------------------------------------------------------------------
//## String

/** remove whitespace from both ends */
if (!String.prototype.trim)
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/gm, "");
		};
		
//------------------------------------------------------------------------------
//## Date

if (!Date.now)
		Date.now	= function() {
			return new Date().getTime();
		};

if (!Date.prototype.toISOString)
		Date.prototype.toISOString	= function() {
			return this.getUTCFullYear()			+ '-'	+
				(	'0'	+ (this.getUTCMonth()+1)	+ '-'	+
					'0'	+ this.getUTCDate()			+ 'T'	+
					'0'	+ this.getUTCHours()		+ ':'	+
					'0'	+ this.getUTCMinutes()		+ ':'	+
					'0'	+ this.getUTCSeconds()
				).replace(/\d(\d\d)/g, "$1")		+ '.'	+ 
				(this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5)	+ 'Z';
		};

//------------------------------------------------------------------------------
//## JSON

if (!window.JSON)
		window.JSON	=  {
			/** parse a JSON String */
			parse: function(str) {
				if (arguments.length != 1)	throw new Error("JSON polyfill does not support a reviver");
				var	text	= str.replace(/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, function(a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); });
				if (!/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
						throw new Error("invalid JSON string");
				return eval("(" + text + ")");
			},
			
			/** convert an object into JSON form. replacer and spaces are nor currently implemented */
			stringify: function(obj) {
				if (arguments.length != 1)	throw new Error("JSON polyfill does not support a replacer or custom space");
				function append(out, obj) {
					if (typeof obj === "string") {
						out.push("\"");
						var	re	= /[\\"\x00-\x1F\u0080-\uFFFF]/g;
						out.push(obj.replace(re, function($0) {
							switch ($0) {
								case "\b":	return "\\b";
								case "\t":	return "\\t";
								case "\n":	return "\\n";
								case "\f":	return "\\f";
								case "\r":	return "\\r";
								case '"': 	return '\\"';
								case "\\":	return "\\\\";
							}
							return "\\u" + ("0000" + $0.charCodeAt(0).toString(16)).slice(-4);
						}));
						out.push("\"");
					}
					else if (typeof obj == "boolean") {
						out.push(obj ? "true" : "false");
					}
					else if (typeof obj == "number") {
						if (!isFinite(obj))	throw new Error("cannot encode non-finite number: " + obj);
						out.push(obj.toString());
					}
					else if (obj === null) {
						out.push("null");
					}
					else if (obj instanceof Array) {
						out.push("[");
						for (var i=0; i<obj.length; i++) {
							if (i !== 0)	out.push(",");
							append(out, obj[i]);
						}
						out.push("]");
					}
					else if (typeof obj === "object") {
						out.push("{");
						var	first	= true;
						for (i in obj) {
							if (first)	out.push(",");
							else		first	= false;
							append(out, i);
							out.push(":");
							append(out, obj[i]);
						}
						out.push("}");
					}
					else {
						throw new Error("cannot represent object as JSON: " + obj);
					}
				}
				var	out	= [];
				append(out, obj);
				return out.join("");
			}//,
		};
