"use strict";
(function() {
	const express = require("express");
	const router = express.Router();
	const bodyParser = require("body-parser");

//==================================================
	router.get("/", function(req, res) {
		// res.redirect('/under-construction');
		res.render('index', {
			title: 'polypicks'
		})
	});

	//==================================================
	module.exports = router; // Export routes for server.js to use.
	////////////////////////////////////////////////////
})();
