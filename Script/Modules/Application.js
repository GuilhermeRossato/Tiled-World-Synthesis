const Application = (function() {
	function createCanvas(width, height, scale) {
		let canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = `${(width * scale | 0)}px`;
		canvas.style.height = `${(height * scale | 0)}px`;
		elements[0].appendChild(canvas);
		return canvas;
	}

	let elements = ["main"].map(name=>document.getElementById(name))
	  , canvas = [[480, 480, 0.25], [440, 440, 1], [10, 10, 2]].map(params=>createCanvas(...params));

	return {
		elements: elements,
		canvases: canvas,
		init: function() {
			canvas[1].addEventListener("click", ()=>this.onMouseDown.call(this));
			
			let worldSize = [10, 10];
			let model = Models.Knots;
			let imageLoader = new ModelImageLoader(model);
			let self = this;
			imageLoader.load().then(processModel);

			function processModel() {
				let processor = new ModelProcessor(model);
				processor.process().then(createWorld);
			}

			function createWorld() {
				let generator = new WorldGenerator(model, worldSize[0], worldSize[1]);
				self.lastGenerator = generator;
				// If you pass a world renderer to the world generator, it will become async and draw as it generates the world.
				let context = canvas[1].getContext("2d");
				let renderer = new WorldRenderer(model, worldSize[0], worldSize[1], context);
				generator.generate(renderer).then(drawData);
			}

			function drawData(data) {
				let context = canvas[1].getContext("2d");
				let renderer = new WorldRenderer(model, worldSize[0], worldSize[1], context);
				renderer.render(data);
			}

		},
		onMouseDown: function() {
			if (this.lastGenerator)
				this.lastGenerator.stop();
			let worldSize = [10, 10];
			let model = Models.Knots;
			let generator = new WorldGenerator(model, worldSize[0], worldSize[1]);
			let context = canvas[1].getContext("2d");
			let renderer = new WorldRenderer(model, worldSize[0], worldSize[1], context);
			this.lastGenerator = generator;
			generator.generate(renderer).then(()=>(this.creating = false));
		}
	}
})();
