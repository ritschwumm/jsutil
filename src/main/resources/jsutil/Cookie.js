var jsutil	= jsutil || {};

/** helper functions for cookies */
jsutil.Cookie = {
	TTL_DEFAULT:	1*31*24*60*60*1000,	// in a month
	TTL_DELETE:		  -3*24*60*60*1000,	// 3 days before
	
	/** get a named cookie or returns null */
	get: function(key) {
		var	point	= new RegExp("\\b" + encodeURIComponent(key).escapeRE() + "=");
		var	s		= document.cookie.split(point)[1];
		if (!s)	return null;
		s	= s.split(";")[0].replace(/ *$/, "");
		return decodeURIComponent(s);
	},

	/** set a named cookie */
	set: function(key, value, expires) {
		if (!expires)	expires	= this.timeout(this.TTL_DEFAULT);
		document.cookie	= encodeURIComponent(key) + "=" + encodeURIComponent(value) +
						"; expires=" + expires.toUTCString() +
						"; path=/";
	},

	/** delete a named cookie */
	del: function(key) {
		this.set(key, "", 
				this.timeout(this.TTL_DELETE));
	},

	/** calculate a date a given number of millis in the future */
	timeout: function(offset) {
		var	expires		= new Date();
		expires.setTime(expires.getTime() + offset);
		return expires;
	}//,
};
