function TileSelector(canvas, tileSize) {
	this.wrapper = document.createElement("div");
	this.wrapper.setAttribute("style", `position:absolute; top: 0, left: 0; width:${tileSize}px; height:${tileSize}px; background-color:rgba(100,100,100,0.5)`);
	document.body.appendChild(this.wrapper);
}

TileSelector.prototype = {
	constructor: TileSelector,
	show: function() {
		this.wrapper.style.display = "block";
	},
	hide: function() {
		this.wrapper.style.display = "none";
	},
	dispose: function() {
		document.body.removeChild(this.wrapper);
		this.wrapper = undefined;
	}
}