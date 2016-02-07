var jsutil	= jsutil || {};

/** ajax helper */
jsutil.Ajax = {
	/** 
	 * create and use an XMLHttpRequest with named parameters 
	 *
	 * data
	 *		method		optional string, defaults to GET
	 *		url			mandatory string, may contains parameters
	 *		urlParams	optional map or Array of pairs, can be used together with params in url
	 *		body		optional string
	 *		bodyParams	optional map or Array of pairs, overwrites body
	 *		charset		optional string for bodyParams
	 *		headers		optional map
	 *		timeout		optional number of milliseconds
	 *
	 * callbacks, all get the client as first parameter
	 *		exceptionFunc		called when the client throws an exception
	 *		completeFunc		called before the more specific functions
	 *		noSuccessFunc		called in all non-successful cases
	 *
	 *		successFunc			called for 200..300, gets the responseText
	 *		intermediateFunc	called for 300..400
	 *		failureFunc			called for 400..500
	 *		errorFunc			called for 500..600
	 */
	call: function(args) {
		if (!args.url)	throw "url argument missing";
		
		// create client
		var	client	= new XMLHttpRequest();
		client.args	= args;
		client.debug = function() {
			return client.status + " " + client.statusText + "\n"
					+ client.getAllResponseHeaders() + "\n\n"
					+ client.responseText;
		};
		
		// init client
		var	method	= args.method || "GET";
		var	url		= args.url;
		if (args.urlParams) {
			url	+= url.indexOf("?") === -1 ? "?" : "&";
			url	+= this.encodeUrlArgs(args.urlParams);
		}
		client.open(method, url, true);
		
		// state callback
		client.onreadystatechange = function() {
			if (client.readyState !== 4)	return;
			if (client.timer)	clearTimeout(client.timer);
			
			var	status	= -1;
			try { status	= client.status; }
			catch (e) {
				if (args.exceptionFunc)		args.exceptionFunc(client, e);
				if (args.noSuccessFunc)		args.noSuccessFunc(client, e);
				return;
			}
			
			if (args.completeFunc)	args.completeFunc(client);
			
			if (status >= 200 && status < 300) {
				if (args.successFunc)		args.successFunc(client, client.responseText);
			}
			else if (status >= 300 && status < 400) {
				// TODO location-header?
				if (args.intermediateFunc)	args.intermediateFunc(client);
			}
			else if (status >= 400 && status < 500) {
				if (args.failureFunc)		args.failureFunc(client);
			}
			else if (status >= 500 && status < 600) {
				if (args.errorFunc)			args.errorFunc(client);
			}
			
			if (status < 200 || status >= 300) {
				if (args.noSuccessFunc)		args.noSuccessFunc(client);
			}
		};
		
		/*
		// override mime type if wanted
		if (args.mimeType && client.overrideMimeType) {
			client.overrideMimeType(args.mimeType); 
		}
		*/
		
		// init headers
		if (args.bodyParams) {
			var	contentType	= "application/x-www-form-urlencoded";
			if (args.charset)	contentType	+= "; charset=" + args.charset;
			client.setRequestHeader("Content-Type", contentType);
		}
		if (args.headers) {
			for (var key in args.headers) {
				client.setRequestHeader(key, args.headers[key]);
			}
		}
		
		// init body
		var	body;
		if (args.bodyParams) {
			body	= this.encodeFormArgs(args.bodyParams);
		}
		else {
			body	= args.body || null;
		}
		
		// send
		if (args.timeout) {
			client.timer	= setTimeout(client.abort.bind(client), args.timeout);
		}
		client.send(body);
		
		return {
			client:	client,
			aborted: false,
			abort:	function() {
				if (client.timer)	clearTimeout(client.timer);
				this.aborted	= true;
				try { client.abort(); }
				catch (e) {}	// TODO log this somewhere
			}//,
		};
	},
	
	//------------------------------------------------------------------------------
	//## private
	
	/** 
	 * url-encode arguments
	 * args may be an Array of Pair of String or a Map from String to String 
	 */
	encodeUrlArgs: function(args) {
		if (args.constructor !== Array)	args	= this.hashToPairs(args);
		return this.encodeArgPairs(args, encodeURIComponent);
	},
	
	/**
	 * encode arguments into application/x-www-form-urlencoded 
	 * args may be an Array of Pair of String or a Map from String to String 
	 */
	encodeFormArgs: function(args) {
		if (args.constructor !== Array)	args	= this.hashToPairs(args);
		return this.encodeArgPairs(args, this.encodeFormValue);
	},
	
	/** compile an Array of Pairs of Strings into the &name=value format */
	encodeArgPairs: function(args, encodeFunc) {
		var	out	= "";
		for (var i=0; i<args.length; i++) {                       
			var	pair	= args[i];
			if (pair.constructor !== Array)	throw "expected a Pair: " + pair;
			if (pair.length !== 2)			throw "expected a Pair: " + pair;
			if (pair[1] === null)	continue;
			out	+= "&"	+ encodeFunc(pair[0])
				+  "="	+ encodeFunc(pair[1]);
		}
		return out && out.substring(1);
	},
	
	/** encode a single form-value. this is a variation on url-encoding */
	encodeFormValue: function(value) {
		// use windows-linefeeds
		value	= value.replace(/\r\n|\n|\r/g, "\r\n");
		// escape funny characters
		value	= encodeURIComponent(value);
		// space is encoded as a plus sign instead of "%20"
		value	= value.replace(/(^|[^%])(%%)*%20/g, "$1$2+");
		return value;
	},
	
	/** 
	 * converts a hash into an Array of Pairs (2-element Arrays). 
	 * null values generate no Pair, 
	 * array values generate multiple Pairs, 
	 * other values are toString()ed 
	 */
	hashToPairs: function(map) {
		var	out	= [];
		for (var key in map) {
			var	value	= map[key];
			if (value === null)	continue;
			if (value.constructor === Array) {
				for (var i=0; i<value.length;i++) {
					var	subValue	= value[i];
					if (subValue === null)	continue;
					out.push([ key, subValue ]);
				}
				continue;
			}
			out.push([ key, value.toString() ]);
		}
		return out;
	}//,
};
