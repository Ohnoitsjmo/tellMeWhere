'use strict';

(function() {
  var yelp = require('yelp-fusion');
  var express = require("express");
  var router = express.Router();
  var app = express();

  var apiKey = '5GpQZD_KE-6Rssp-Be--g_ro1f4LWRtCvNuk5fXOjfZBaH7AzciKYNq8sMWBKTmCqk5KFncWFobmAf7wbhOwwo9TS7yaO9a_X_opagg1xU_XH3vNwEbhdybyuvhiWnYx';
  var client = yelp.client(apiKey);

  var location = "sanfrancisco";

  var radius = router.get('/api/radius', function (req, res) {
    return res;
  });
  
  //var radius = radius.Value;
  //var category = "{{category}}";
  //var price = "{{price}}";
  //var rating = "{{rating}}";


  var searchRequest = {
    location: location,
    radius: radius,
    //category: category,
    //price: price,
    //rating: rating
  };
  
  //==================================================
  
	router.post('/api/poly2go', function(req,res){
		console.log('------------ POST /api/poly2go ----------->');
		
    client.search(searchRequest).then(response => {
      var conc = response.jsonBody.businesses;
      var prettyJson = JSON.stringify(conc, null, 4);
      console.log(prettyJson);
  
      var results = [];
      for (var i=0; i<conc.length; i++) {
        results.push([conc[i].name, conc[i].image_url, conc[i].location.display_address[0], conc[i].categories[0].title, conc[i].rating, conc[i].price]);
      }
      console.log(results);
      res.json({name: results[0][0], image: results[0][1], address: results[0][2], category: results[0][3], rating: results[0][4], price: results[0][5]})
    }).catch(e => {
      console.log(e);
    });
	})


//==================================================
	module.exports = router;
})();