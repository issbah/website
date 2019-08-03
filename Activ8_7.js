var ourLoc;
var view;
var map;

function init() {
	ourLoc = ol.proj.fromLonLat([-118.389962, 33.930642]);

	view = new ol.View({
		center: ourLoc,
		zoom: 4
	});

	map = new ol.Map({
		target: 'map',
		layers: [
		new ol.layer.Tile({
			source: new ol.source.OSM()
		})
	],
	loadTilesWhileAnimating: true,
	view: view
  });
}

function panHome() {
	view.animate({
		center: ourLoc,
		duration: 1500
	});
}

function panCountry() {
		var usrCountry = document.getElementById("countryname").value;

		var query = "https://restcountries.eu/rest/v2/name/" + usrCountry;
		query = query.replace(/ /g, "%20");

		var countryRequest = new XMLHttpRequest();
		countryRequest.open('GET', query, false);

		countryRequest.send();

		var countryInfo = JSON.parse(countryRequest.responseText);

		var lon = countryInfo[0].latlng[1];
		var lat = countryInfo[0].latlng[0];

		var newLoc = ol.proj.fromLonLat([lon, lat]);

		view.animate({
			center: newLoc,
			duration: 1500
		});
}

function redirect() {
		var searchitem = document.getElementById("search");
		var url = "https://www.active.com/search?keywords=fitness&location=Everywhere&category=Activities&daterange=All+future+dates" + searchitem.value;
		window.open(url, "https://www.active.com/");
}

window.onload = init;
