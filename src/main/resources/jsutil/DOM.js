var jsutil	= jsutil || {};

/** DOM helper functions */
jsutil.DOM = {
	//------------------------------------------------------------------------------
	//## events

	/** executes a function when the DOM is loaded */
	onLoad: function(func) {
		window.addEventListener("DOMContentLoaded", func, false);
	},

	//------------------------------------------------------------------------------
	//## find
	
	/** find an element in document by its id */
	get: function(id) {
		return document.getElementById(id);
	},

	/**
      * find descendants of an ancestor by tagName, className and index 
	  * tagName, className and index are optional
	  * returns a single element when index exists or an Array of elements if not
	  */
	fetch: function(ancestor, tagName, className, index) {
		if (ancestor && ancestor.constructor === String) {
			ancestor	= document.getElementById(ancestor);
		}
		if (ancestor === null)	return null;
		var	elements	= ancestor.getElementsByTagName(tagName ? tagName : "*");
		if (className) {
			var tmp	= [];
			for (var i=0; i<elements.length; i++) {
				if (this.hasClass(elements[i], className)) {
					tmp.push(elements[i]);
				}
			}
			elements	= tmp;
		}
		if (typeof index === "undefined")	return elements;
		if (index >= elements.length)		return null;
		return elements[index];
	},

	/** find the next element from el which has a given nodeName or is non-text */
	nextElement: function(el, nodeName) {
		if (nodeName)	nodeName	= nodeName.toUpperCase();
		for (;;) {
			el	= el.nextSibling;	if (!el)	return null;
			if (nodeName)	{ if (el.nodeName.toUpperCase() === nodeName)	return el; }
			else			{ if (el.nodeName.toUpperCase() !== "#TEXT")	return el; }
		}
	},

	/** find the previous element from el which has a given nodeName or is non-text */
	previousElement: function(el, nodeName) {
		if (nodeName)	nodeName	= nodeName.toUpperCase();
		for (;;) {
			el	= el.previousSibling;	if (!el)	return null;
			if (nodeName)	{ if (el.nodeName.toUpperCase() === nodeName)	return el; }
			else			{ if (el.nodeName.toUpperCase() !== "#TEXT")	return el; }
		}
	},

	/** whether an ancestor contains an element */
	contains: function(ancestor, element) {
		for (;;) {
			if (element === ancestor)	return true;	
			if (element === null)		return false;
			element	= element.parentNode;
		}
	},
	
	//------------------------------------------------------------------------------
	//## add

	/** inserts text, a node or an Array of these before a target node */
	pasteBefore: function(target, additum) {
		if (additum.constructor !== Array)	additum	= [ additum ];
		var	parent	= target.parentNode;
		for (var i=0; i<additum.length; i++) {
			var	node	= additum[i];
			if (node.constructor === String)	node	= document.createTextNode(node);
			parent.insertBefore(node, target);
		}
	},

	/** inserts text, a node or an Array of these after a target node */
	pasteAfter: function(target, additum) {
		if (target.nextSibling) this.pasteBefore(target.nextSibling, additum);
		else					this.pasteEnd(target.parentNode, additum);
	},

	/** insert text, a node or an Array of these at the start of a target node */
	pasteBegin: function(parent, additum) {
		if (parent.firstChild)	this.pasteBefore(parent.firstChild, additum);
		else					this.pasteEnd(parent, additum);
	},

	/** insert text, a node or an Array of these at the end of a target node */
	pasteEnd: function(parent, additum) {
		if (additum.constructor !== Array)	additum	= [ additum ];
		for (var i=0; i<additum.length; i++) {
			var	node	= additum[i];
			if (node.constructor === String)	node	= document.createTextNode(node);
			parent.appendChild(node);
		}
	},
	
	//------------------------------------------------------------------------------
	//## remove

	/** remove a node from its parent node */
	removeNode: function(node) {
		node.parentNode.removeChild(node);
	},

	/** removes all children of a node */
	removeChildren: function(node) {
		//while (node.lastChild)	node.removeChild(node.lastChild);
		node.innerHTML	= "";
	},
	
	//------------------------------------------------------------------------------
	//## replace
	
	/** replace a node with another one */
	replaceNode: function(node, replacement) {
		node.parentNode.replaceChild(replacement, node); 
	},
	
	/** replace all children of a node */
	replaceChildren: function(node, newChildren) {
		node.innerHTML	= "";
		for (var i=0; i<newChildren.length; i++) {
			var newChild	= newChildren[i];
			node.appendChild(newChild);
		}
	},

	//------------------------------------------------------------------------------
	//## css classes

	classNameREPrefix: "(^|\\s+)",
	classNameRESuffix: "(\\s+|$)",
	
	/** creates a RegExp matching a className */
	classNameRE: function(className) {
		return new RegExp(this.classNameREPrefix + className.escapeRE() + this.classNameRESuffix);
	},
	
	/** returns an Array of the classes of an element */
	getClasses: function(element) {
		return element.className.split(/\s+/);
	},
	
	/** sets all classes of an element from an Array of names */
	setClasses: function(element, classNames) {
		element.className	= classNames.join(" ");
	},

	/** returns whether an element has a class */
	hasClass: function(element, className) {
		if (!element.className)	return false;
		var	re	= this.classNameRE(className);
		return re.test(element.className);
	},

	/** adds a class to an element */
	addClass: function(element, className) {
		if (this.hasClass(element, className))	return;
		var	old	= element.className ? element.className : "";
		element.className = (old + " " + className).trim();
	},

	/** removes a class to an element */
	removeClass: function(element, className) {
		var	re	= this.classNameRE(className);
		var	old	= element.className ? element.className : "";
		element.className = old.replace(re, "");
	},

	/** replaces a class in an element with another */
	replaceClass: function(element, oldClassName, newClassName) {
		/*
		this.removeClass(element, oldClassName);
		this.addClass(element, newClassName);
		*/
		element.className	= element.className.replace(
				this.classNameRE(oldClassName),
				"$1" + newClassName + "$2");
	},
	
	/** sets or unsets a class on an element */
	updateClass: function(element, className, active) {
		var	has	= this.hasClass(element, className);
		if (has === active)	return;
		if (active)	this.addClass(element, className);
		else 		this.removeClass(element, className);
	},

	//------------------------------------------------------------------------------
	//## position

	/** mouse position in document base coordinates */
	mousePos: function(event) {
		return {
			x: window.pageXOffset + event.clientX,
			y: window.pageYOffset + event.clientY
		};
	},
	
	/** minimum visible position in document base coordinates */
	minPos: function() {
		return {
			x: window.scrollX,
			y: window.scrollY
		};
	},
	
	/** maximum visible position in document base coordinates */
	maxPos: function() {
		return {
			x: window.scrollX + window.innerWidth,
			y: window.scrollY + window.innerHeight
		};
	},
	
	/** position of an element in document base coordinates */
	elementPos: function(element) {
		var	parent	= this.elementParentPos(element);
		return {
			x: element.offsetLeft	+ parent.x,
			y: element.offsetTop	+ parent.y
		};
	},

	/** size of an element */
	elementSize: function(element) {
		return {
			x: element.offsetWidth,
			y: element.offsetHeight
		};
	},

	/** document base coordinates for an elements parent */
	elementParentPos: function(element) {
		// TODO inline in elementPos?
		var	pos	= { x: 0, y: 0 };
		for (;;) {
			var	mode = window.getComputedStyle(element, null).position;
			if (mode === "fixed") {
				pos.x	+= window.pageXOffset;
				pos.y	+= window.pageYOffset;
				return pos;
			}
			var	parent	= element.offsetParent;
			if (!parent)	return pos;
			pos.x	+= parent.offsetLeft;
			pos.y	+= parent.offsetTop;
			// TODO add scrollTop and scrollLeft here?
			element	= parent;
		}
	},
	
	/** moves an element to document base coordinates */
	moveElement: function(element, pos) {
		var	container	= this.elementParentPos(element);
		element.style.left	= (pos.x - container.x) + "px";
		element.style.top	= (pos.y - container.y) + "px";	
	}//,
};
