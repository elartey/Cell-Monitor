google.load('visualization', '1');

    var FTid = "1ZY4nVWrwi876ZBLecr3G0oB-hRTgtsY9Xw08iGs";
    var locColumn = "Latitude";
    var clientID = "299618784127.apps.googleusercontent.com";
    var scopes = "https://www.googleapis.com/auth/fusiontables";
    var APIkey = "AIzaSyB2d8V3EKkTXFkx0dM7jWWjp88FHpt7do0";
    
gapi.client.setApiKey(APIkey);

function auth(immediate){
	gapi.auth.authorize({
		client_id: clientID,
		scope: scopes,
		immediate: immediate
	}, handleAuthResult);
}

      // Handle the results of the OAuth 2.0 flow.
      function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult) {
          authorizeButton.disabled = true;
        } else {
          authorizeButton.disabled = false;
          authorizeButton.onclick = function() { auth(false); return false; };
        }
      }

//initiate map

function initialize(){
    //console.log("initialized called");
    initAutoComplete(FTid); 
  }

 
window.setInterval("accra_map()",60000);

function accra_map() {
    var accra = new google.maps.LatLng(5.603046, -0.253819);
    
    var mapOptions = {
        center: accra,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    
    //infoWindow = new google.maps.InfoWindow(); 
    google.maps.visualRefresh = true;
    
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
    var layer = new google.maps.FusionTablesLayer({
        query: {
            select: locColumn,
            from: FTid
            },
        styles: [{
            markerOptions: {
                iconName: "target"
            }, },{
            	where: 'Tilt > 5',
            	markerOptions: {
                iconName: "earthquake"
            }                       
        }],
        map: map
    });
    
initAutoComplete(FTid);   
    //layer.setMap(map);
    
    google.maps.event.addDomListener(document.getElementById('go'), 'click',
    
    function() {
        var Site = document.getElementById('Site').value;
        
        if (Site) {
            Site = Site.replace(/'/g, '\\\'');
            var where = "'Site' CONTAINS IGNORING CASE '" + 
              Site + "'";
            
            layer.setOptions({
                query: {
                    select: locColumn,
                    from: FTid,
                    where: where
                }
            });
        }
    });
}



function initAutoComplete(FTid) {
	//console.log("Search autocomplete working");
	//Retrieve using the unique cell site name using GROUP by 
	var qryText = encodeURIComponent(
		"SELECT 'Site', COUNT() " + 
		'FROM ' + FTid + " GROUP BY 'Site'");
	var qryTail = "&key=AIzaSyB2d8V3EKkTXFkx0dM7jWWjp88FHpt7do0";
	var qry = new google.visualization.Query(
		'http://www.google.com/fusiontables/gvizdata?tq=' + qryText  );

	qry.send(function(response) {
		//console.log("response::"+response.getDataTable());
		var numRows = response.getDataTable().getNumberOfRows();
		//console.log("trying to get table rows");
		
		//Create the list of results to display
		var results = [];
		
		for (var i = 0; i < numRows; i++) {
			results.push(response.getDataTable().getValue(i, 0));
		}
		
		//Use results returned to complete the autocomplete options.
		$('#Site').autocomplete({
			source: results,
			minLength: 2,
			 open: function() {
			 	$("#results-box").show();
        $(this).autocomplete("widget")
               .appendTo("#results")
               .addClass("nav")
               .css({
               	"position": "absolute"
               });
    }
		});
	});
}

google.maps.event.addDomListener(window, 'load', accra_map);  