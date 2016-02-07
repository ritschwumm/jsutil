/**
uses a CSS code like this 
.hidden {
	display: none;
}
to allow initially hidden elements
*/
Visible	= {
	get: function(element) {
		return element.style.display !== "none"
			&& !DOM.hasClass(element, "hidden");
	},
	
	set: function(element, visible) {
		if (visible) {
			DOM.replaceClass(element, "hidden", "shown");
			element.style.display	= "";
		}
		else {
			DOM.replaceClass(element, "shown", "hidden");
			element.style.display	= "none";
		}
	},
	
	preset: function(element) {
		return !DOM.hasClass(element, "hidden") 
			&& !DOM.hasClass(element, "shown");
	},
	
	reset: function(element) {
		DOM.replaceClass(element, "shown", "hidden");
		element.style.display	= "";
	}//,
}; 
