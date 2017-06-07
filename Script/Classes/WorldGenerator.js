function WorldGenerator(modelData, width, height) {
	console.assert(modelData.tiles && modelData.tiles[0], "Model Data has no tiles");
	console.assert(modelData.tiles[0].connections, "Model Data has no connection list (ModelProcessor)");
	this.tiles = modelData.tiles;
	this.data = new TiledData(this.tiles.length,width,height);
	this.chances = new TiledChances(this.tiles.length,width,height);
	this.selector = new NeighborSelect(width,height);
	this.effectRadius = 3;
	this.width = width;
	this.height = height;
}

WorldGenerator.prototype = {
	constructor: WorldGenerator,
	sides: [{
		name: "top",
		inverse: "bottom",
		offset: [0, -1]
	}, {
		name: "left",
		inverse: "right",
		offset: [-1, 0]
	}, {
		name: "right",
		inverse: "left",
		offset: [1, 0]
	}, {
		name: "bottom",
		inverse: "top",
		offset: [0, 1]
	}],
	generate: function(renderer) {
		if (renderer)
			return this.generateAssync(renderer);
		return this.generateSync();
	},
	stop: function() {
		this.done = true;
	},
	generateAssync: function(renderer) {
		let lastTime = performance.now()
		  , leftOver = 0
		  , self = this;
		let affectedTiles = [];
		this.done = false;
		let callback, listHead;
		let counter = 0;
		function loop() {
			let difference = -(lastTime - (lastTime = performance.now())) + leftOver;
			if (difference < 300) {
				for (; difference >= 16; difference -= 16) {
					update();
					if (self.done)
						break;
				}
				leftOver = difference;
			} else {
				leftOver = 0;
				update();
			}
			if (!self.done)
				requestAnimationFrame(loop);
			renderer.render(self.data);
		}
		function getTileByIndex(index) {
			return self.tiles[index];
		}
		function doesAllow(connections, i) {
			return connections.some(con => con.index === i);
		}
		function updateProbabilities(x, y) {
			let possibilities = new Set();
			for (let i = 0; i < self.tiles.length; possibilities.add(i++));
			let thisTile = getTileByIndex(getPoint(x, y));
			let neighbors = self.selector.selectOthers(x, y, 1);
			neighbors.forEach((tileData, i) => {
				let td = tileData;
				td.v = getPoint(td.x, td.y);
				if (td.v !== -1) {
					let side = self.sides[i];
					let sideTile = getTileByIndex(td.v);
					let sideOptions = sideTile.connections[side.name];
					repeat(self.tiles.length, j => ((!doesAllow(sideOptions, j)) && (possibilities.delete(j))));
				}
			});
			repeat(self.tiles.length, j => self.chances.set(j, x, y, (possibilities.has(j)?1:0)));
		}
		function removeFromAffectedTiles(x,y) {
			let index = -1;
			affectedTiles.some((o, i) => (o.x === x && o.y === y && ((index = i) || true)));
			if (index != -1) {
				affectedTiles.splice(index, 1);
				return true;
			}
			return false;
		}
		function removeFromAffectedTilesByIndex(index) {
			affectedTiles.splice(index, 1);
			return true;
		}
		function setPoint(x,y,type, listEnd) {
			self.data.set(x, y, type);
			removeFromAffectedTiles(x, y);
			let lengthBefore = affectedTiles.length;
			self.selector.selectOthers(x, y, 1, affectedTiles);
			let len = affectedTiles.length;
			for (let i = 0; i < len; i++) {
				if (!affectedTiles[i])
					continue;
				if (getPoint(affectedTiles[i].x, affectedTiles[i].y) !== -1) {
					removeFromAffectedTilesByIndex(i);
					len--;
				} else if (i >= lengthBefore||true) {
				updateProbabilities(affectedTiles[i].x, affectedTiles[i].y);
				}
			}
			return listEnd;
		}
		function getPoint(x,y) {
			return self.data.get(x, y);
		}
		function update() {
			let whois;
			let highestChance;
			for (let i = 0; i < affectedTiles.length; i++) {
				repeat(self.tiles.length, tileId => (((!whois) || (self.chances.get(tileId, affectedTiles[i].x, affectedTiles[i].y) > highestChance)) && (whois = [affectedTiles[i], tileId]) && (highestChance = self.chances.get(tileId, affectedTiles[i].x, affectedTiles[i].y))));
			}
			if (whois) {
				if (whois[0].v)
					setPoint(whois[0].x, whois[0].y, whois[0].v);
				else
					setPoint(whois[0].x, whois[0].y, whois[1]);
			} else {
				self.done = true;
				(callback) && (callback(self.data));
			}
		}

		affectedTiles.push({
			x: (Math.random() * this.width) | 0,
			y: (Math.random() * this.height) | 0,
			v: (Math.random() * this.tiles.length) | 0
		});

		this.data.setAll(-1);
		this.chances.setAll(-1);

		console.log("Should start");
		console.log("Should continue");
		console.log("Should continue");
		console.log("Should continue");
		requestAnimationFrame(loop);

		//repeat(6, id => setPoint(1+id,1,id));
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
