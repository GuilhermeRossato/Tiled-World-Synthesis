function WorldGenerator(modelData, width, height) {
	console.assert(modelData.tiles && modelData.tiles[0], "Model Data has no tiles");
	console.assert(modelData.tiles[0].connections, "Model Data has no connection list (should be done by ModelProcessor)");
	this.tiles = modelData.tiles;
	this.data = new TiledData(this.tiles.length,width,height);
	this.chances = new TiledChances(this.tiles.length,width,height);
	this.width = width;
}

WorldGenerator.prototype = {
	constructor: WorldGenerator,
	sides: [{
		name: "top",
		offset: [0, -1]
	}, {
		name: "left",
		offset: [-1, 0]
	}, {
		name: "right",
		offset: [1, 0]
	}, {
		name: "bottom",
		offset: [0, 1]
	}],
	generate: function(renderer) {
		let callback, updateChance = (x,y,type,deepness=0)=>{
			/* Unimplemented
			if (deepness > 2)
				return
			if (type !== undefined) {
				for (let i = 0; i < this.tiles.length; i++) {
					this.chances.set(i, x, y, (i === type) ? 1 : 0);
				}
			}
			this.sides.filter(side=>this.data.get(x + side.offset[0], y + side.offset[1]) !== -1).forEach(side=>{
				updateChance(x + side.offset[0], y + side.offset[1], undefined, deepness + 1);
			});
			Unimplemented */
		}, guessType = (x,y) => {
			let types = [];
			this.sides.forEach(side => {
				let ox = x + side.offset[0],
					oy = y + side.offset[1];
				types.push(getPoint(ox, oy));
			});
		}, justExecute = (f) => {
			f();
		}, addDelay = (f) => {
			setTimeout(f, 10);
		}, recUpdatePoint = (x,y,type) => {
			if (x < 0 || y < 0 || x >= this.width || y >= this.height) // || getPoint(x, y) !== -1)
				return
			setPoint(x, y, type);
			let callMethod = justExecute;
			if (renderer) {
				renderer.render(this.data);
				callMethod = addDelay;
			}
			callMethod(() => {
				this.sides.forEach(side => {
					let ox = x + side.offset[0],
						oy = y + side.offset[1];
					if (getPoint(ox, oy) === -1) {
						let newType = guessType(ox, oy);
						recUpdatePoint(ox, oy, newType);
					}
				});
			});
		}, setPoint = (x,y,type) => {
			this.data.set(x, y, type);
		}, getPoint = (x, y) => {
			return this.data.get(x, y);
		}
		this.data.setAll(-1);
		this.chances.setAll(1);
		let startPoint = {
			x: (Math.random() * this.width) | 0,
			y: (Math.random() * this.height) | 0
		}
		let startValue = (Math.random() * this.tiles.length) | 0;
		recUpdatePoint(startPoint.x, startPoint.y, startValue);
		//repeat(6, id => updatePoint(1+id,1,id));
		return {
			then: (func)=>{
				if (!renderer) {
					// Since it's syncronous, just call the function
					return func(this.data);
				} else {
					callback = func;
				}
			}
		}
	}
}
