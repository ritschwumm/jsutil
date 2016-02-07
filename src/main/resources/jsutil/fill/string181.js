/** remove whitespace from both ends */
if (!String.prototype.trim)
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/gm, "");
		};
		
/** remove whitespace from the left */
if (!String.prototype.trimLeft)
		String.prototype.trimLeft = function() {
			return this.replace(/^\s+/gm, "");
		};

/** remove whitespace from the right */
if (!String.prototype.trimRight)
		String.prototype.trimRight = function() {
			return this.replace(/\s+$/gm, "");
		};
