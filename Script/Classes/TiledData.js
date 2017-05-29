function TiledData(types, width, height) {
	console.assert(types < 128, "Too many tiles! Int8 won't be enough!")
	let data = new Int8Array(width*height), outside;
	function normalize(x, y) {
		return x + y * width;
	}
	this.set = function(x, y, v) {
		console.assert(!(x < 0 || x >= width || y < 0 || y >= height), "Setting outside is not permitted");
		return data[normalize(x, y)] = v;
	}
	this.get = function(x, y) {
		if (x < 0 || x >= width || y < 0 || y >= height)
			return outside;
		else
			return data[normalize(x, y)];
	}
	this.setAll = function(value) {
		outside = value;
		let len = width*height;
		for (let i = 0; i < len; i++)
			data[i] = value;
	}
}