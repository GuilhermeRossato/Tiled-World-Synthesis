function ModelImageLoader(modelData) {
	console.assert(modelData.tiles && modelData.tiles[0], "Model Data has no tiles");
	console.assert(modelData.connections && modelData.connections[0], "Model Data has no connections");

	this.tileSize = modelData.tileSize;
	this.tiles = modelData.tiles;
	this.loadingCount = 0;
}

ModelImageLoader.prototype = {
	constructor: ModelImageLoader,
	load: function() {
		let callback, onLoadImage = (tile,index)=>{
			this.loadingCount++;
			if (this.loadingCount === this.tiles.length && callback) {
				callback();
			}
			return true;
		};
		this.tiles.forEach((tile,i)=>{
			let image = new Image();
			if (tile.rotation) {
				image.onload = ()=>{
					let size = this.tileSize, auxCanvas = document.createElement("canvas"), ctx = auxCanvas.getContext("2d");
					auxCanvas.width = auxCanvas.height = size;
					ctx.clearRect(-1, -1, size + 2, size + 2);
					ctx.save();
					ctx.translate(size/2, size/2);
					ctx.rotate(tile.rotation * Math.PI / 2);
					ctx.drawImage(image, -size/2, -size/2);
					ctx.restore();
					tile.image = auxCanvas;
					onLoadImage(tile, i);
				}
			} else {
				image.onload = ()=>(onLoadImage(tile, i));
			}
			image.src = `Assets/${tile.image}`;
			tile.image = image;
		}
		);
		return {
			then: function(newCallback) {
				callback = newCallback;
			}
		}
	}
}
