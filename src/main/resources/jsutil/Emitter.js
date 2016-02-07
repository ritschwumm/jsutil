var jsutil	= jsutil || {};

jsutil.Emitter	= function() {
	this.listeners	= [];
}
jsutil.Emitter.prototype	= {
	/** call all listeners with the given value */
	fire: function(value) {
		this.listeners.forEach(function(it) { it(value); });
	},
	
	/** add a listener to be called on fire */
	on: function(func) {
		this.listeners.push(func);
	},
	
	/** remove a listener added with on */
	off: function(func) {
		var	index	= this.listeners.indexOf(func);
		if (index === -1)	return false;
		this.listeners.splice(index, 1);
		return true;
	}//,
};
