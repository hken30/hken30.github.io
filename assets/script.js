 jQuery(document).ready(function($) {
 
    $(".scroll a, .navbar-brand, .gototop,.explore").click(function(event){   
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 600,'swing');
    $(".scroll").removeClass('active');
    $(this).parents('li').toggleClass('active');
    });
    });


$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});



var wow = new WOW(
  {
    boxClass:     'wowload',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true        // act on asynchronously loaded content (default is true)
  }
);
wow.init();




$('.carousel').swipe( {
     swipeLeft: function() {
         $(this).carousel('next');
     },
     swipeRight: function() {
         $(this).carousel('prev');
     },
     allowPageScroll: 'vertical'
 });





// map

google.maps.event.addDomListener(window, 'load', init);
var map;
function init() {
	var mapOptions = {
		center: new google.maps.LatLng(3.082186, 101.786996),
		zoom: 17,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.DEFAULT,
		},
		disableDoubleClickZoom: true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
		},
		scaleControl: true,
		scrollwheel: false,
		panControl: true,
		streetViewControl: true,
		draggable : true,
		overviewMapControl: true,
		overviewMapControlOptions: {
			opened: false,
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [{"stylers": [{"visibility": "on"}]},
		{"featureType": "road", "stylers": [{"visibility": "on"}]}, 
		{"featureType": "road.arterial", "stylers": [{"visibility": "on"}]},
		{"featureType": "road.arterial", "elementType": "labels", "stylers": [{"visibility": "on"}]},
		{"featureType": "road.highway", "stylers": [{"visibility": "on"}]},
		{"featureType": "landscape", "stylers": [{"visibility": "on"}, {"color": "#f3f4f4"}]},
		{"featureType": "water", "stylers": [{"visibility": "on"}, {"color": "#7fc8ed"}]},
		{"featureType": "road", "elementType": "labels", "stylers": [{"visibility": "on"}]},
		{"featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"color": "#83cead"}]},
		{"elementType": "labels", "stylers": [{"visibility": "on"}]},
		{"featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{"weight": 0.9}, {"visibility": "on"}]}],
	}
	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);
	
	var currentlyVisible = false;
	var iw = new google.maps.InfoWindow();
	function infoWindowVisible(visible) {
		if (visible !== undefined) currentlyVisible = visible;
		return currentlyVisible;
	}
	
	var locations = [['Dazzle Chocoloate', 'No 5A, Jalan Langat Ceria 4, Taman Langat Ceria, 43100 Selangor, Malaysia', '', '', 'dazzlechocolate.com', 3.081256, 101.786996, 'images/solid-pin-blue.png']];
	for (i = 0; i < locations.length; i++) {
		if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
		if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
		if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
		if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
		if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
		marker = new google.maps.Marker({
			icon: markericon,
			position: new google.maps.LatLng(locations[i][5], locations[i][6]),
			map: map,
			title: locations[i][0],
			desc: description,
			tel: telephone,
			email: email,
			web: web
		});
		if (web.substring(0, 7) != "http://") {link = "http://" + web;} else {link = web;}
		bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
	}
	
	
	
		
	function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
		google.maps.event.addListener(marker, 'click', function() {
			if (infoWindowVisible()) {
				iw.close();
				infoWindowVisible(false);
			} else {
				var html= "<div style='color:#000;background-color:#fff;padding:5px;width:300px;'><h4>"+title+"</h4><p>"+desc+"</p><p>"+telephone+"</p><p><a href='mailto:"+email+"' >"+email+"<a></p><p><a href='"+link+"'' >"+web+"<a></p></div>";
				iw = new google.maps.InfoWindow({content:html});
				iw.open(map,marker);
				infoWindowVisible(true);
			}
		});
		
		google.maps.event.addListener(iw, 'closeclick', function () {
			infoWindowVisible(false);
		});
		if ($(window).width() >= 768) google.maps.event.trigger(marker, 'click');
	}
	
	google.maps.event.addDomListener(window, "resize", function() {
		var center = new google.maps.LatLng(3.082186, 101.786996)
		if ($(window).width() < 768) {
			iw.close();
			infoWindowVisible(false);
			center = new google.maps.LatLng(3.081256, 101.786996)
		}
		google.maps.event.trigger(map, "resize");
		map.setCenter(center); 
	});
}