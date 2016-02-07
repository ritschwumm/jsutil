/** create an array of number from inclusive to exclusive */
Number.range = function(from, to) {
	var	out	= [];
	for (var i=from; i<to; i++)	out.push(i);
	return out;
};
