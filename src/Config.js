(function(exports){

exports.Config = {
	
	friction: 1, // Ground friction
	
	power: 2,  // How much power Scoots has when you press the button
	
	// The Hilly Terrain
	hill: {
		widthVariation: 150,
		widthBase: 400
	},

	// Timer
	timer: {
		constant: 1/(60*15), // Would run out in fifteen seconds (at 60FPS) if you stood still
		speedMultiplier: 0.00005 // Completely arbitrary
	}

};

})(window);