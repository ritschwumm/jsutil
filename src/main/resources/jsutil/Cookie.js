var jsutil	= jsutil || {};

/** helper functions for cookies */
jsutil.Cookie = {
	TTL_DEFAULT:	1*31*24*60*60*1000,	// in a month
	TTL_DELETE:		-3*24*60*60*1000,	// 3 days before
	
	/** get a named cookie or returns null */
	get: function(name) {
		var	point	= new RegExp("\\b" + jsutil.String.escapeRE(encodeURIComponent(name)) + "=");
		var	s1		= document.cookie.split(point)[1];
		if (!s1)	return null;
		var s	= s1.split(";")[0].replace(/ *$/, "");
		return decodeURIComponent(s);
	},

	/** set a named cookie */
	set: function(name, value, expires) {
		var expires2	= expires || this.timeout(this.TTL_DEFAULT);
		document.cookie	= encodeURIComponent(name) + "=" + encodeURIComponent(value) +
						"; expires=" + expires2.toUTCString() +
						"; path=/";
	},

	/** delete a named cookie */
	remove: function(name) {
		this.set(name, "", this.timeout(this.TTL_DELETE));
	},

	/** calculate a date a given number of millis in the future */
	timeout: function(offset) {
		var	expires		= new Date();
		expires.setTime(expires.getTime() + offset);
		return expires;
	}//,
};
