function WorldRenderer(WorldData, width, height, context) {
	this.tiles = WorldData.tiles;
	this.tileSize = WorldData.tileSize;
	this.width = width;
	this.height = height;
	this.context = context;
}

WorldRenderer.prototype = {
	constructor: WorldRenderer,
	render: function(data) {
		let cwidth = this.width * this.tileSize
		  , cheight = this.height * this.tileSize
		  , ctx = this.context;
		ctx.clearRect(-1, -1, cwidth + 2, cheight + 2);
		ctx.fillStyle = "#F00";
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				let tile = this.tiles[data.get(x, y)];
				if (tile && (tile.image instanceof Image || tile.image instanceof HTMLCanvasElement))
					ctx.drawImage(tile.image, x * this.tileSize, y * this.tileSize);
				else
					ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
			}
		}
	}
}
