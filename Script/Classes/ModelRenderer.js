function ModelRenderer(modelData, width, height, context) {
	this.tiles = modelData.tiles;
	this.tileSize = modelData.tileSize;
	this.width = width;
	this.height = height;
	this.context = context;
}

ModelRenderer.prototype = {
	constructor: ModelRenderer,
	render: function(data) {
		let cwidth = this.width * this.tileSize
		  , cheight = this.height * this.tileSize
		  , ctx = this.context;
		ctx.clearRect(-1, -1, cwidth + 2, cheight + 2);
		ctx.fillStyle = "#F00";
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				let tile = this.tiles[data.get(x, y)];
				if (tile && tile.image instanceof Image)
					ctx.drawImage(tile.image, x * this.tileSize, y * this.tileSize);
				else
					ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
			}
		}
	}
}
