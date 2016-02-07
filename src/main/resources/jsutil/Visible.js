var jsutil	= jsutil || {};

/**
uses a CSS code like this 
.hidden {
	display: none;
}
to allow initially hidden elements
*/
jsutil.Visible	= {
	get: function(element) {
		return element.style.display !== "none"
			&& !jsutil.DOM.hasClass(element, "hidden");
	},
	
	set: function(element, visible) {
		if (visible) {
			jsutil.DOM.replaceClass(element, "hidden", "shown");
			element.style.display	= "";
		}
		else {
			jsutil.DOM.replaceClass(element, "shown", "hidden");
			element.style.display	= "none";
		}
	},
	
	preset: function(element) {
		return !jsutil.DOM.hasClass(element, "hidden") 
			&& !jsutil.DOM.hasClass(element, "shown");
	},
	
	reset: function(element) {
		jsutil.DOM.replaceClass(element, "shown", "hidden");
		element.style.display	= "";
	}//,
}; 
