"use strict";
var canvas, container, game;

if (typeof(this.Models)!=="object")
	this.Models = {};

window.addEventListener("load", function() {
	(Application.init) && (Application.init());
});
