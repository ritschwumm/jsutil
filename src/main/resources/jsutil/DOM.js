var jsutil	= jsutil || {};

/** DOM helper functions */
jsutil.DOM = {
	//------------------------------------------------------------------------------
	//## events

	/** executes a function when the DOM is loaded */
	onLoad: function(func) {
		window.addEventListener("DOMContentLoaded", func, false);
	},
	
	/** attach an event listener, return a remove function. */
	attach: function(element, eventName, handler, useCapture) {
		element.addEventListener(eventName, handler, useCapture);
		return function() {
			element.removeEventListener(eventName, handler, useCapture);
		};
	},
	
	/** attach an event listener that is automatically removed after firing. return a remove function. */
	attachOnce: function(element, eventName, handler, useCapture) {
		function listener(ev) {
			removeFunc();
			handler(ev);
		}
		function removeFunc() {
			element.removeEventListener(eventName, listener, useCapture);
		}
		element.addEventListener(eventName, listener, useCapture);
		return removeFunc;
	},
	
	//------------------------------------------------------------------------------
	//## find
	
	/** checks if obj is a DOM node */
	isNode: function(obj) {
		return !!(obj && obj.nodeType);
	},
	
	/** find an element in document by its id */
	get: function(id) {
		return document.getElementById(id);
	},
	
	/** find an element in document by its id */
	getW: function(id) {
		var el	= this.get(id);
		return el && jsutil.NodeW.of(el);
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
	//## single insertions
	
	// BETTER implement something like an insertion point?
	
	/** insert a node as the first child of the parent */
	insertBegin: function(parent, node) {
		parent.insertBefore(node, parent.firstChild);
	},
	
	/** insert a node as the last child of the parent */
	insertEnd: function(parent, node) {
		parent.appendChild(node);
	},
	
	/** insert a node before target */
	insertBefore: function(target, node) {
		target.parentNode.insertBefore(node, target);
	},
	
	/** insert a node after target */
	insertAfter: function(target, node) {
		target.parentNode.insertBefore(node, target.nextSibling);
	},
	
	//------------------------------------------------------------------------------
	//## multi insertions
	
	/** insert many nodes at the front of the children of the parent */
	insertBeginMany: function(parent, nodes) {
		var reference	= parent.firstChild;
		for (var i=0; i<nodes.length; i++) {
			parent.insertBefore(nodes[i], reference);
		}
	},
	
	/** insert many nodes at the end of the children of the parent */
	insertEndMany: function(parent, nodes) {
		for (var i=0; i<nodes.length; i++) {
			parent.appendChild(nodes[i]);
		}
	},
	
	/** insert many nodes before the target */
	insertBeforeMany: function(target, nodes) {
		var parent	= target.parentNode;
		for (var i=0; i<nodes.length; i++) {
			parent.insertBefore(nodes[i], target);
		}
	},
	
	/** insert many nodes after the target */
	insertAfterMany: function(target, nodes) {
		var parent		= target.parentNode;
		var reference	= target.nextSibling;
		for (var i=0; i<nodes.length; i++) {
			parent.insertBefore(nodes[i], reference);
		}
	},
	
	//------------------------------------------------------------------------------
	//## insertion helpers
	
	/** turn String into text node, pass through everything else */
	textAsNode: function(it) {
		return it.constructor === String
				? document.createTextNode(it)
				: it;
	},
	
	/** textAsNode lifted to an Array */
	textAsNodeMany: function(its) {
		var out	= [];
		for (var i=0; i<its.length; i++) {
			out.push(this.textAsNode(its[i]));
		}
		return out;
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
	
	/** replace a target with a replacement node */
	replaceNode: function(target, replacement) {
		target.parentNode.replaceChild(replacement, target);
	},
	
	/** replace a target with many replacement nodes */
	replaceNodeMany: function(target, replacements) {
		var parent	= target.parentNode;
		for (var i=0; i<replacements.length; i++) {
			parent.insertBefore(replacements[i], target);
		}
		parent.removeChild(target);
	},
	
	/** replace all children of a target node */
	replaceChildren: function(target, replacements) {
		this.removeChildren(target);
		this.insertEndMany(target, replacements);
	},

	//------------------------------------------------------------------------------
	//## style
	
	display: function(element, on) {
		element.style.display	= on ? "" : "none";
	},
	
	//------------------------------------------------------------------------------
	//## css classes

	// BETTER use StringSet here
	
	/** returns an Array of the classes of an element */
	getClasses: function(element) {
		var raw	= (element.className || "").trim();
		return raw ? raw.split(/\s+/) : [];
	},
	
	/** sets all classes of an element from an Array of names */
	setClasses: function(element, classNames) {
		element.className	= classNames.join(" ");
	},
	
	/** pass the class names array to a function modifying it */
	modifyClasses: function(element, func) {
		this.setClasses(element, func(this.getClasses(element)));
	},

	/** returns whether an element has a class */
	hasClass: function(element, className) {
		return this.getClasses(element).contains(className);
	},

	/** adds a class to an element */
	addClass: function(element, className) {
		var set	= this.getClasses(element);
		var ok	= !set.contains(className);
		if (ok)	{
			set.push(className);
			this.setClasses(element, set);
		}
		return ok;
	},

	/** removes a class to an element */
	removeClass: function(element, className) {
		var set	= this.getClasses(element);
		var ok	= set.contains(className);
		if (ok)	{
			set.remove(className);
			this.setClasses(element, set);
		}
		return ok;
	},

	/** replaces a class in an element with another */
	replaceClass: function(element, oldClassName, newClassName) {
		var set	= this.getClasses(element);
		if (set.contains(oldClassName)) {
			set.remove(oldClassName);
			if (!set.contains(newClassName)) {
				set.push(newClassName);
			}
		}
		this.setClasses(element, set);
	},
	
	/** sets or unsets a class on an element */
	updateClass: function(element, className, active) {
		if (active)	this.addClass(element, className);
		else		this.removeClass(element, className);
	},
	
	/** switches between two different classes */
	switchClass: function(element, condition, trueClassName, falseClassName) {
		if (condition)	this.replaceClass(element, falseClassName,	trueClassName);
		else			this.replaceClass(element, trueClassName,	falseClassName);
	},
	
	/** choose one class from a set */
	enumClass: function(element, allClassNames, choosenClassName) {
		this.replaceClassGroup(
			element,
			function(it) { return allClassNames.indexOf(it) !== -1; },
			choosenClassName
		);
	},
	
	/** replace all classes with a certain prefix with one new of the same prefix */
	prefixClass: function(element, prefix, choosenSuffix) {
		this.replaceClassGroup(
			element,
			function(it) { return it.startsWith(prefix); },
			prefix + choosenSuffix
		);
	},
	
	/** replace all classes matching a predicate with a new one or none (if null) */
	replaceClassGroup: function(element, relevantPred, choosenClassName) {
		var oldSet	= this.getClasses(element);
		var newSet	= [];
		for (var i=0; i<oldSet.length; i++) {
			var old	= oldSet[i];
			if (!relevantPred(old))	newSet.push(old);
		}
		if (choosenClassName !== null) {
			newSet.push(choosenClassName);
		}
		this.setClasses(element, newSet);
	},

	//------------------------------------------------------------------------------
	//## position
	
	/** analog to element.scrollTop, but from the bottom */
	getScrollBottom: function(element) {
		return element.scrollHeight - element.clientHeight - element.scrollTop;
	},

	/** analog to element.scrollTop, but from the bottom */
	setScrollBottom: function(element, scrollBottom) {
		element.scrollTop	= element.scrollHeight - element.clientHeight - scrollBottom;
	},
	
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
