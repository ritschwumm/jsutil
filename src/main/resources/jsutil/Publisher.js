var jsutil	= jsutil || {};

jsutil.Publisher	= function() {
	this.subscribers	= [];
};
jsutil.Publisher.prototype	= {
	subscribe: function(subscriber) {
		this.subscribers.push(subscriber);
		return this.unsubscribe.bind(this, subscriber);
	},
	
	unsubscribe: function(subscriber) {
		var	index	= this.subscribers.indexOf(subscriber);
		var found	= index !== -1;
		if (found)	this.subscribers.splice(index, 1);
		return found;
	},
	
	publish: function(value) {
		this.subscribers.slice().forEach(function(it) { it(value); });
	},
	
	dispose: function() {
		this.subscribers	= [];
	}//,
};
