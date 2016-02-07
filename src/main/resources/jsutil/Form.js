var jsutil	= jsutil || {};

/** HTMLFormElement helper functions */
jsutil.Form = {
	//------------------------------------------------------------------------------
	///## finder
	
	/** finds a HTMLForm or returns null */
	find: function(ancestor, nameOrIdOrIndex) {
		var	forms	= ancestor.getElementsByTagName("form");
		if (typeof nameOrIdOrIndex === "number") {
			if (nameOrIdOrIndex >= 0
			&& nameOrIdOrIndex < forms.length)	return forms[nameOrIdOrIndex];
			else								return null;
		}
		for (var i=0; i<forms.length; i++) {
			var	form	= forms[i];
			if (this.elementNameOrId(form) === nameOrIdOrIndex)	return form;
		}
		return null;
	},
	
	/** returns the name or id of an element or null */
	elementNameOrId: function(element) {
		return	element.name	? element.name
			:	element.id		? element.id
			:	null;
	},
	
	//------------------------------------------------------------------------------
	//## serializer
	
	/**
	 * parses HTMLFormElement and its HTML*Element children 
	 * into an Array of name/value-pairs (2-element Arrays).
	 * these pairs can be used as bodyArgs parameter for jsutil.Ajax.call.
	 *
	 * returns an Array of Pairs, optionally with one of
	 * the button/image/submit-elements activated
	 */
	serialize: function(form, buttonName) {
		var	out	= [];
		for (var i=0; i<form.elements.length; i++) {
			var	element	= form.elements[i];
			
			if (!element.name)		continue;
			if (element.disabled)	continue;
		
			var	handlingButton = element.type === "submit" 
								|| element.type === "image" 
								|| element.type === "button";
			if (handlingButton 
			&& element.name !== buttonName)	continue;
			
			var	pairs	= this.elementPairs(element);
			out	= out.concat(pairs);
		}
		return out;
	},
	
	/** 
	 * returns an Array of Pairs for a single input element.
	 * in most cases, it contains zero or one Pair. 
	 * more than one are possible for select-multiple.
	 */
	elementPairs: function(element) {
		var	name	= element.name;
		var	type	= element.type;
		var	value	= element.value;
		
		if (type === "reset") {
			return [];
		}
		else if (type === "submit") {
			if (value)	return [ [ name, value			] ];
			else		return [ [ name, "Submit Query"	] ];
		}
		else if (type === "button" || type === "image") {
			if (value)	return [ [ name, value			] ];
			else		return [ [ name, ""				] ];
		}
		else if (type === "checkbox" || type === "radio") {
				 if (!element.checked)	return [];
			else if (value !== null)	return [ [ name, value	] ];
			else						return [ [ name, "on"	] ];	
		}
		else if (type === "select-one") {
			if (element.selectedIndex !== -1)	return [ [ name, value ] ];
			else								return [];
		}
		else if (type === "select-multiple") {
			var	pairs	= [];
			for (var i=0; i<element.options.length; i++) {
				var	opt	= element.options[i];
				if (!opt.selected)	continue;
				pairs.push([ name, opt.value ]);
			}
			return pairs;
		}
		else if (type === "text" || type === "password" || type === "hidden" || type === "textarea") {
			if (value)	return [ [ name, value	] ];
			else		return [ [ name, ""		] ];
		}
		else if (type === "file") {
			// NOTE: can't do anything here :(
			return [];
		}
		else {
			throw new Error("field: " + name + " has the unknown type: " + type);
		}
	}//,
};
