var $h = $("html");
var radiusSelect = document.getElementById('myRadiusDropdown');
var categorySelect = document.getElementById('myCategoryDropdown');
var priceSelect = document.getElementById('myPriceDropdown');
var ratingSelect = document.getElementById('myRatingDropdown');

var client = {
	displayResult: function(name, image, address, category, rating, price) {
		console.log("Display Results.");
		var html = $("#name").html();
		$("#name").text("Name: ").append(name);
		var html = $("#address").html();
		$("#address").text("Address: ").append(address);
		var html = $("#category").html();
		$("#category").text("Category: ").append(category);
		var html = $("#rating").html();
		$("#rating").text("Rating: ").append(rating);
		var html = $("#price").html();
		$("#price").text("Price: ").append(price);
		var html = $("img").html();
		$("#img").attr('src', image);
	},
	isError: function() {
		console.log("------ ERROR ------");
		$(".result h2").text("Oops. Error.");
		$(".modal-header").css("background-color", "#e74c3c");
	},
	clearResults: function() {
		$("#age").text("");
		$("#agecertainty").text("");
		$("#gender").text("");
		$("#gendercertainty").text("");
		$("#ethnicity").text("");
		$("#ethnicitycertainty").text("");
	},
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
	toggleradius: function() {
		document.getElementById("myRadiusDropdown").classList.toggle("show");
	},
	togglecat: function() {
		document.getElementById("myCategoryDropdown").classList.toggle("show");
	},
	toggleprice: function() {
		document.getElementById("myPriceDropdown").classList.toggle("show");
	},
	togglerating: function() {
		document.getElementById("myRatingDropdown").classList.toggle("show");
	},
	radiusReplace: function() {
		input = document.getElementsByClassName('radiusdropbtn');
		$(input).text(radiusSelect.value);
	},
	categoryReplace: function() {
		input = document.getElementsByClassName('catdropbtn');
		$(input).text(categorySelect.value);
	},
	priceReplace: function() {
		input = document.getElementsByClassName('pricedropbtn');
		$(input).text(priceSelect.value);
	},
	ratingReplace: function() {
		input = document.getElementsByClassName('ratingdropbtn');
		$(input).text(ratingSelect.value);
	},
	radius: function(e) {
		e.preventDefault();
		var radius = radiusSelect.data-value;
        $.ajax({
            url: '/api/radius', //This is the current doc
            type: "POST",
            data: ({radius: radius}),
            success: function(data){
                console.log(data);
            }
		}) 
	},
	location: function(e) {
		e.preventDefault();
		var latitude = $.getJSON("http://ip-api.io/api/json", function(data){
            return data.latitude;
        	}
		);
		var longitude = $.getJSON("http://ip-api.io/api/json", function(data){
            return data.longitude;
        	}
		);
        $.ajax({
            url: '/api/location', //This is the current doc
            type: "POST",
            data: ({latitude: latitude, longitude: longitude}),
            success: function(data){
                console.log(data);
            }
		}) 
	},
	submit: function(e) {
		e.preventDefault();
		
		$.ajax({
			type: "POST",
			url: "/api/poly2go",
			timeout: 7000
		}).done(function(result) {
			if (result.error) {
				console.log("result.error", result.error);
			} else {
                console.log(result.name, result.image, result.address, result.category, result.rating, result.price);
				client.displayResult(result.name, result.image, result.address, result.category, result.rating, result.price);
			}
		}).fail(function(jqXHR, textStatus){
			if(textStatus === 'timeout')
			{     
				console.log("Timed Out.");
			}
		})
	}
};

navigator.geolocation.getCurrentPosition(function(location) {
	console.log(location.coords.latitude);
	console.log(location.coords.longitude);
});

window.onclick = function(event) {
	if (!event.target.matches('.radiusdropbtn') && !event.target.matches('.catdropbtn') && !event.target.matches('.pricedropbtn') && !event.target.matches('.ratingdropbtn')) {

		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		}
		}
	}
}

$(radiusSelect).on("click", client.radiusReplace);
$(categorySelect).on("click", client.categoryReplace);
$(priceSelect).on("click", client.priceReplace);
$(ratingSelect).on("click", client.ratingReplace);
$(".radiusdropbtn").on("click", client.toggleradius);
$(".catdropbtn").on("click", client.togglecat);
$(".pricedropbtn").on("click", client.toggleprice);
$(".ratingdropbtn").on("click", client.togglerating);
$("#submit").on("click", client.submit);

window.client = client;