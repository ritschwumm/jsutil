var jsutil	= jsutil || {};

jsutil.Cell	= function(initial) {
	this.value		= initial;
	this.emitter	= new jsutil.Emitter();
};
jsutil.Cell.prototype	= {
	/** get the current value */
	get: function() {
		return this.value;
	},
	
	/** set a new value and notify listeners when it changed */
	set: function(it) {
		if (it != this.value) {
			this.value	= it;
			this.emitter.fire(it);
		}
	},
	
	/** modify the current value with a function and notify listeners when it changed */
	modify: function(func) {
		this.set(func(this.get));
	},
	
	//------------------------------------------------------------------------------
	
	/** add a listener to be called whenever the value changes, returns a disposable */
	onChange: function(func) {
		return this.emitter.on(func);
	},
	
	/** add a listener to be called immediately and whenever the value changes, returns a disposable */
	onValue: function(func) {
		func(this.get());
		return this.emitter.on(func);
	},
	
	/** remove a listener added with onChange or onValue */
	off: function(func) {
		this.emitter.off(func);
	},
	
	//------------------------------------------------------------------------------
	
	/** remove all listeners */
	dispose: function() {
		this.emitter.dispose();
	}//,
};
