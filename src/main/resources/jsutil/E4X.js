// @see https://bugzilla.mozilla.org/show_bug.cgi?id=336551
XML.parse = function(text)	new XML(text.replace(/^<\?xml[^>]*>/, ""));

// unused
XMLList.prototype.function::toArray = function() {
	var	out	= [];
	var	len	= this.length();
	for (var i=0; i<len; i++)	out.push(this[i]);
	return out;	
};

// aka domNode() which is not implemented in FF
XML.prototype.function::toDOM = function() this.template("").$;

XML.prototype.function::template = function(hash) {
	var	nextId	= 0;
	function freshName() { nextId++; return "x" + nextId; }
	var out = {};
	
	function domifyImpl(xml) {
		var	nodeKind	= xml.nodeKind();
		if (nodeKind == "text") {
			return document.createTextNode(xml.toString());
		}
		else if (nodeKind == "element") {
			var	tag		= document.createElement(xml.name());
			for each (xid in xml.attribute(hash)) {
				out[xid.toString()]	= tag;
			}
			for each (attr in xml.attributes()) {
				tag.setAttribute(attr.name(), attr.toString());
			}
			for each (child in xml.children()) {
				var	sub	= domifyImpl(child);
				tag.appendChild(sub);
			}
			return tag;
		}
		else {
			throw "unexpected node kind: " + nodeKind;
		}
	}
	
	var	top	= domifyImpl(this);
	out["$"]	= top;
	return out;
}


/*
XML.prototype.function::toDOM		= function()	this.toDIV().firstChild;
XMLList.prototype.function::toDOMs	= function()	this.toDIV().childNodes; 

XML.prototype.function::toDIV = function() {
	var	div	= document.createElement("div");
	// replaces short tags with long ones because FF's parser is stupid
	// (it seems XHTML requires this stupidness)
	div.innerHTML	= this.toXMLString().replace(/<([^>\s]+)([^>]*)\/>/g, "<$1$2></$1>");
	return div;
};


XML.prototype.function::template = function(keyAttr) {
	// HACK: FF does not parse TR tags without a surrounding TABLE
	if (this.name().localName === "tr") {
		var	index	= <table>{this}</table>.template(keyAttr);
		var	table	= index.$;
		var	tr;
		if (table.children)	tr	= table.children[0];
		else				for (tr=table.firstChild; tr.nodeType!==Node.ELEMENT_NODE; tr=tr.nextSibling);
		index.$	= tr;
		tr.parentNode.removeChild(tr);
		return index;
	}
	var	dom	= this.toDOM();
	
	var	index	= { "$": dom };
	
	// FF 3.0 doesn't support the children property, FF 3.5 does
	var walk	= !!dom.children 
			?	function(element) {
					for (var i=0; i<element.children.length; i++) {
						walk(element.children[i]);
					}
					var	key	= element.getAttribute(keyAttr);
					if (key)	index[key]	= element;
				}
			:	function(element) {
					for (var i=0; i<element.childNodes.length; i++) {
						var	node	= element.childNodes[i];
						if (node.nodeType !== Node.ELEMENT_NODE)	continue;
						walk(node);
					}
					var	key	= element.getAttribute(keyAttr);
					if (key)	index[key]	= element;
				}
	walk(dom);
	
	return index;
};
*/