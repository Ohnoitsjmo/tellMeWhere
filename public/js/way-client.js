var $h = $("html");
var radiusSelect = document.getElementById('myRadiusDropdown');
var categorySelect = document.getElementById('myCategoryDropdown');
var priceSelect = document.getElementById('myPriceDropdown');
var ratingSelect = document.getElementById('myRatingDropdown');

navigator.geolocation.getCurrentPosition(function(location) {
	$.ajax({
		url: '/api/coordinates', //This is the current doc
		type: "GET",
		data: {latitude: location.coords.latitude, longitude: location.coords.longitude},
		dataType: 'application/json',
		success: function(data){
			console.log(latitude);
			console.log(longitude);
		}
	}) 
});

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
		client.radius();
	},
	categoryReplace: function() {
		input = document.getElementsByClassName('catdropbtn');
		$(input).text(categorySelect.value);
		client.category();
	},
	priceReplace: function() {
		input = document.getElementsByClassName('pricedropbtn');
		$(input).text(priceSelect.value);
		client.price();
	},
	ratingReplace: function() {
		input = document.getElementsByClassName('ratingdropbtn');
		$(input).text(ratingSelect.value);
		client.rating();
	},
	radius: function() {
		var radius = radiusSelect.data-value;
		console.log(radius);
        $.ajax({
            url: '/api/radius', //This is the current doc
            type: "GET",
			data: {radius: radius},
			dataType: 'application/json',
            success: function(data){
                console.log(data);
            }
		}) 
	},
	category: function() {
		var category = categorySelect.value;
		console.log(category);
        $.ajax({
            url: '/api/category', //This is the current doc
            type: "GET",
			data: {category: category},
			dataType: 'application/json',
            success: function(data){
                console.log(data);
            }
		}) 
	},
	price: function() {
		var price = priceSelect.data-value;
		console.log(price);
        $.ajax({
            url: '/api/price', //This is the current doc
            type: "GET",
			data: {price: price},
			dataType: 'application/json',
            success: function(data){
                console.log(data);
            }
		}) 
	},
	rating: function() {
		var rating = ratingSelect.value;
		console.log(rating);
        $.ajax({
            url: '/api/rating', //This is the current doc
            type: "GET",
			data: {rating: rating},
			dataType: 'application/json',
            success: function(data){
                console.log(data);
            }
		}) 
	},
	submit: function() {
		$.ajax({
			type: "POST",
			url: "/api/polypicks",
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