if (!window.JSON) {
	window.JSON	=  {
		/** parse a JSON String */
		parse: function(str) {
			var	text	= str.replace(/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, function(a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); });
			if (!/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
					throw "invalid JSON string";
			return eval("(" + text + ")");
		},
		
		/** convert an object into JSON form. replacer and spaces are nor currently implemented */
		stringify: function(obj) {
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
					if (!isFinite(obj))	throw "cannot encode non-finite number: " + obj;
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
					throw "cannot represent object as JSON: " + obj;
				}
			}
			var	out	= [];
			append(out, obj);
			return out.join("");
		}//,
	};
}
