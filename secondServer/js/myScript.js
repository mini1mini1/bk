
var map = L.map('map').setView([37.504, 127.093], 14);

//var map = L.map('map',{center:[37.518, 127.053],zoom:16,closePopupOnClick:false});

//var map = L.map('map').fitWorld();

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var defaultIcon = L.Icon.extend({
    options: {
        shadowUrl: null,
        iconSize:     [20, 20],
        shadowSize:   null,
        iconAnchor:   [10, 10],
        shadowAnchor: null,
        popupAnchor:  [0, 0]
    }
});


var marker_msg;

function onMapRightClick(e) {

}

function onMapClick(e) {
	
}

map.on('contextmenu', onMapRightClick);

map.on('click', onMapClick);

var geoMarker,geoCircle;

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    geoMarker = L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    geoCircle = L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
	alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

function geoLocation() {
	
	if($("#geo").hasClass("active")){
		$("#geo").removeClass("active");
		map.removeLayer(geoMarker);
		map.removeLayer(geoCircle);
	}else{
		$("#geo").addClass("active");
		map.locate({setView: true, maxZoom: 16});
	}
}

function chat() {
	if($("#chat").hasClass("active")){
		$("#chat").removeClass("active");
		$("#msg").hide();
		if(marker_msg !== undefined){
			map.removeLayer(marker_msg);
			marker_msg = undefined;
		}
	}else{
		$("#chat").addClass("active");
		$("#msg").show();
		console.log('getcenter: '+map.getCenter());
		console.log('getbounds: '+map.getBounds());
		if(marker_msg !== undefined){
			marker_msg.setLatLng(map.getCenter());
		}else{
			var talkIcon = new defaultIcon({iconUrl: '/icon/chat-46.svg'});

		    marker_msg = L.marker(map.getCenter(), {icon: talkIcon, draggable: true}).addTo(map);
		}
		
	}
}
