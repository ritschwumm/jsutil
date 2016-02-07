var jsutil	= jsutil || {};

/** XML utility functions */
jsutil.XML = {
	//------------------------------------------------------------------------------
	//## DOM
	
	/** parses a String into an XMLDocument */
	parseXML: function(text) {
		// TODO text/html does work on firefox, but not on webkit
		var	doc		= new DOMParser().parseFromString(text, "text/html");
		var	root	= doc.documentElement;
		// root.namespaceURI === "http://www.mozilla.org/newlayout/xml/parsererror.xml"
		if (root.tagName === "parserError"	// ff 2
		|| root.tagName === "parsererror")	// ff 3
				throw new Error("XML parser error: " + root.textContent);
		return doc;
	},
	/*
	if (document.implementation.createDocument) {
		var xmlparser = new DOMParser();
		return xmlparser.parseFromString(string, "text/xml");
	}
	if (window.ActiveXObject) {
		var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
		xmldoc.async = "false";
		var ret = xmldoc.loadXML(string);      
		if (ret)	return xmldoc.documentElement;
	}
	return null;
	*/

	/** serialize an XML (e4x) or XMLDocument to a String */
	unparseXML: function(xml) {
		return new XMLSerializer().serializeToString(xml);
	},
	
	//------------------------------------------------------------------------------
	//## escaping
	
	/** escapes XML metacharacters */
	encode: function(str) { 
		return str.replace(/&/g,	'&amp;')
					.replace(/</g,	'&lt;')
					.replace(/>/g,	'&gt;');
	},
	
	/** escapes XML metacharacters including double quotes */
	encodeDQ: function(str) {
		return str.replace(/&/g,	'&amp;')
					.replace(/</g,	'&lt;')
					.replace(/>/g,	'&gt;')
					.replace(/\"/g,	'&quot;');
	},
	
	/** escapes XML metacharacters including single quotes */
	encodeSQ: function(str) {
		return str.replace(/&/g,	'&amp;')
					.replace(/</g,	'&lt;')
					.replace(/>/g,	'&gt;')
					.replace(/\'/g,	'&apos;');
	},
	
	/** decodes results of encode, encodeDQ and encodeSQ */
	decode: function(code) {
		return code.replace(/&quot/g,	'"')
					.replace(/&apos/g,	"'")
					.replace(/&gt;/g,	">")
					.replace(/&lt;/g,	"<")
					.replace(/&amp;/g,	"&");
	}//,
};
