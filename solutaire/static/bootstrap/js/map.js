
function accra_map() {
	var accra = new google.maps.LatLng(5.603046, -0.253819);
	var mapOptions = {
		center: accra,
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};
	
	google.maps.visualRefresh = true;
	
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	
	var layer = new google.maps.FusionTablesLayer({
		query: {
			select: 'Latitude',
			from: '1STX2Azq-AgcimvVQ2vFmfuNXDDU4H_9So7L_cRg',
			where: "'Flag1' = 'ACCRA'"
			},
		styles: [{
            markerOptions: {
            	iconName: "ranger_tower"
            }						
		}]
	});
	layer.setMap(map);
}

google.maps.event.addDomListener(window, 'load', accra_map);
		