'use strict';

(function() {
  var yelp = require('yelp-fusion');
  var express = require("express");
  var router = express.Router();
  var app = express();

  var apiKey = '5GpQZD_KE-6Rssp-Be--g_ro1f4LWRtCvNuk5fXOjfZBaH7AzciKYNq8sMWBKTmCqk5KFncWFobmAf7wbhOwwo9TS7yaO9a_X_opagg1xU_XH3vNwEbhdybyuvhiWnYx';
  var client = yelp.client(apiKey);

  let searchRequest = {};

  router.get('/api/coordinates', function(req, res) {
    searchRequest["latitude"] = req.query.latitude;
    searchRequest["longitude"] = req.query.longitude;
  });

  router.get('/api/radius', function(req, res) {
    searchRequest["radius"] = req.query.radius;
  });

  router.get('/api/category', function(req, res) {
    searchRequest["category"] = req.query.category;
  });

  router.get('/api/price', function(req, res) {
    searchRequest["price"] = req.query.price;
  });

  router.get('/api/rating', function(req, res) {
    searchRequest["rating"] = req.query.rating;
  });
  
  //==================================================
  
	router.post('/api/polypicks', function(req,res){
    console.log('------------ POST /api/polypicks ----------->');
    client.search(searchRequest).then(response => {
      var conc = response.jsonBody.businesses;
      var prettyJson = JSON.stringify(conc, null, 4);
  
      var results = [];
      for (var i=0; i<conc.length; i++) {
        results.push([conc[i].name, conc[i].image_url, conc[i].location.display_address[0], conc[i].categories[0].title, conc[i].rating, conc[i].price]);
      }
      var rand = Math.floor(Math.random() * conc.length);
      res.json({name: results[rand][0], image: results[rand][1], address: results[rand][2], category: results[rand][3], rating: results[rand][4], price: results[rand][5]})
    }).catch(e => {
      console.log(e);
    });
	})


//==================================================
	module.exports = router;
})();