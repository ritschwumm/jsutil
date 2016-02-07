var jsutil	= jsutil || {};

/** DOM helper functions attached to a Node */
jsutil.NodeW = function(peer) {
	this.peer	= peer;
};
jsutil.NodeW.of = function(peer) {
	return new jsutil.NodeW(peer);
};
jsutil.NodeW.prototype	= {
	fetch: function(tagName, className, index) {
		return jsutil.DOM.fetch(this.peer, tagName, className, index);
	},
	
	//------------------------------------------------------------------------------
	
	attach: function(event, handler, useCapture) {
		return jsutil.DOM.attach(this.peer, event, handler, useCapture);
	},
	
	attachOnce: function(event, handler, useCapture) {
		return jsutil.DOM.attachOnce(this.peer, event, handler, useCapture);
	},
	
	//------------------------------------------------------------------------------
	
	nextElement: function(nodeName) {
		return jsutil.DOM.nextElement(this.peer, nodeName);
	},

	previousElement: function(nodeName) {
		return jsutil.DOM.previousElement(this.peer, nodeName);
	},

	contains: function(element) {
		return jsutil.DOM.contains(this.peer, element);
	},
	
	insertBegin: function(node) {
		return jsutil.DOM.insertBegin(this.peer, node);
	},
	
	insertEnd: function(node) {
		return jsutil.DOM.insertEnd(this.peer, node);
	},
	
	insertBefore: function(node) {
		return jsutil.DOM.insertBefore(this.peer, node);
	},
	
	insertAfter: function(node) {
		return jsutil.DOM.insertAfter(this.peer, node);
	},
	
	insertBeginMany: function(nodes) {
		return jsutil.DOM.insertBeginMany(this.peer, nodes);
	},
	
	insertEndMany: function(nodes) {
		return jsutil.DOM.insertEndMany(this.peer, nodes);
	},
	
	insertBeforeMany: function(nodes) {
		return jsutil.DOM.insertBeforeMany(this.peer, nodes);
	},
	
	insertAfterMany: function(nodes) {
		return jsutil.DOM.insertAfterMany(this.peer, nodes);
	},
	
	remove: function() {
		return jsutil.DOM.removeNode(this.peer);
	},

	removeChildren: function() {
		return jsutil.DOM.removeChildren(this.peer);
	},
	
	replace: function(replacement) {
		return jsutil.DOM.replaceNode(this.peer, replacement);
	},
	
	replaceMany: function(replacements) {
		return jsutil.DOM.replaceNodeMany(this.peer, replacements);
	},
	
	replaceChildren: function(replacements) {
		return jsutil.DOM.replaceChildren(this.peer, replacements);
	},

	//------------------------------------------------------------------------------
	
	display: function(on) {
		return jsutil.DOM.display(this.peer, on);
	},
	
	//------------------------------------------------------------------------------
	
	getClasses: function() {
		return jsutil.DOM.getClasses(this.peer);
	},
	
	setClasses: function(classNames) {
		return jsutil.DOM.setClasses(this.peer, classNames);
	},
	
	modifyClasses: function(func) {
		return jsutil.DOM.modifyClasses(this.peer, func);
	},

	hasClass: function(className) {
		return jsutil.DOM.hasClass(this.peer, className);
	},

	addClass: function(className) {
		return jsutil.DOM.addClass(this.peer, className);
	},

	removeClass: function(className) {
		return jsutil.DOM.removeClass(this.peer, className);
	},

	replaceClass: function(oldClassName, newClassName) {
		return jsutil.DOM.replaceClass(this.peer, oldClassName, newClassName);
	},
	
	updateClass: function(className, active) {
		return jsutil.DOM.updateClass(this.peer, className, active);
	},
	
	switchClass: function(condition, trueClassName, falseClassName) {
		return jsutil.DOM.switchClass(this.peer, condition, trueClassName, falseClassName);
	},
	
	enumClass: function(allClassNames, choosenClassName) {
		return jsutil.DOM.enumClass(this.peer, allClassNames, choosenClassName);
	},
	
	prefixClass: function(prefix, choosenSuffix) {
		return jsutil.DOM.prefixClass(this.peer, prefix, choosenSuffix);
	},
	
	replaceClassGroup: function(relevantPred, choosenClassName) {
		return jsutil.DOM.replaceClassGroup(this.peer, relevantPred, choosenClassName);
	},

	//------------------------------------------------------------------------------
	
	getScrollBottom: function() {
		return jsutil.DOM.getScrollBottom(this.peer);
	},

	setScrollBottom: function(scrollBottom) {
		return jsutil.DOM.setScrollBottom(this.peer, scrollBottom);
	},

	pos: function() {
		return jsutil.DOM.pos(this.peer);
	},

	size: function() {
		return jsutil.DOM.size(this.peer);
	},

	parentPos: function() {
		return jsutil.DOM.parentPos(this.peer);
	},
	
	move: function(pos) {
		return jsutil.DOM.move(this.peer, pos);
	}//,
};
