function ModelProcessor(modelData) {
	console.assert(modelData.tiles && modelData.tiles[0], "Model Data has no tiles");
	console.assert(modelData.tiles[0].image instanceof Image, "Model Data has unloaded images (should be done by ModelImageLoader)");
	this.tiles = modelData.tiles;
	this.connections = modelData.connections;
}

ModelProcessor.prototype = {
	constructor: ModelProcessor,
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
	process: function(ctx) {
		this.tiles.forEach(tile=>{
			//console.log(`Configuring tile id ${tile.index}`);
			tile.connections = {};
			this.sides.forEach(side=>{
				//console.log(`  Configuring side ${side.name}`);
				let sideConnectionList = [];
				this.connections.forEach((connection, k)=>{
					if (connection[side.inverse] === tile.index) {
						if (sideConnectionList.every(entry => entry.index !== connection[side.name])) {
							//console.log(`    Match on connection ${k}, adding ${connection[side.name]} (w: ${connection.weight}) to tiles[${tile.index}].${side.name} list`);
							sideConnectionList.push({
								index: connection[side.name],
								weight: connection.weight
							});
						} else
							console.warn(`    Can't add ${connection[side.name]} to tiles[${tile.index}].${side.name} list, already defined. Check connection id ${k} (${JSON.stringify(connection)})`);
					}
				});
				tile.connections[side.name] = sideConnectionList;
			});
		});
		return {
			then: (func)=>{
				// Since it's syncronous, just call the function
				return func(this.data);
			}
		}
	}
}
