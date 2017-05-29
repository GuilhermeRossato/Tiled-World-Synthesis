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
			let model = Models.Knots;
			let imageLoader = new ModelImageLoader(model);
			imageLoader.load().then(processModel);

			function processModel() {
				let processor = new ModelProcessor(model);
				processor.process().then(createWorld);
			}

			function createWorld() {
				let generator = new WorldGenerator(model, 44, 44);
				// If you pass a world renderer to the world generator, it will become async and draw as it generates the world.
				let context = canvas[1].getContext("2d");
				let renderer = new ModelRenderer(model, 44, 44, context);
				generator.generate().then(drawData, renderer);
			}

			function drawData(data) {
				let renderer = new ModelRenderer(model, 44, 44, context);
				let context = canvas[1].getContext("2d");
				renderer.render(data);
			}
		}
	}
})();
