function TiledChances(types, width, height) {
	let data = new Float32Array(types*width*height);
	function normalize(type, x, y) {
		return type + width * (x + y * height);
	}
	this.set = function(type, x, y, v) {
		data[normalize(type, x, y)] = v;
	}
	this.get = function(type, x, y) {
		return data[noramlize(type, x, y)];
	}
	this.setAll = function(value) {
		let len = types*width*height;
		for (let i = 0; i < len; i++)
			data[i] = value;
	}
}