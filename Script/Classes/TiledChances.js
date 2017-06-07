function TiledChances(types, width, height) {
	function normalize(type, x, y) {
		return type + width * (x + y * height);
	}
	let data = new Float32Array(normalize(types-1,width-1,height-1)-1);
	this.set = function(type, x, y, v) {
		data[normalize(type, x, y)] = v;
	}
	this.get = function(type, x, y) {
		return data[normalize(type, x, y)];
	}
	this.setAll = function(value) {
		let len = types*width*height;
		for (let i = 0; i < len; i++)
			data[i] = value;
	}
	/*
	this.getWidth = function() {
		return width;
	}
	this.getHeight = function() {
		return height;
	}
	this.getTypes = function() {
		return types;
	}*/
}