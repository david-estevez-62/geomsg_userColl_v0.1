var readyStatus = false;
var firstRound = true;
var exploreMode = false;



document.getElementById("send-status").onclick = function(){
  
  if(!readyStatus){
    this.style.background = "white";

    this.value = "message on";
    readyStatus = true;
  }else{
    this.style.background = "darkgrey";

    this.value = "message off";
    readyStatus = false;
  }
}



document.getElementById("explore").onclick = function(){
  if(!exploreMode){
    this.style.background = "white";

    $.get('/explore', function (data) {
            console.log(data);
          });

    this.value = "discover on"
    exploreMode = true;
  }else{
    this.style.background = "darkgrey";
    
    // get rid of messages here, because when true the if statement above is met it will
    // fetch brand new data because prev location can be much different than current location
    this.value = "discover off"
    exploreMode = false;
  }
}



function initialize() {


      function getLocation() {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
          }
      }
  

      function showPosition(position) {
          // Map options here
          var mapOptions = {
            center: { lat:position.coords.latitude, lng:position.coords.longitude},
            zoom: 16,
            disableDefaultUI:true
          };


          $.post('/locate', {latitude:position.coords.latitude, longitude:position.coords.longitude});


          // Create a new map that gets injected into #map in our HTML
          if(firstRound){
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            map.set("styles",[{featureType:"all",elementType:"labels.text.fill",stylers:[{color:"#ffffff"}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{color:"#000000"},{lightness:13}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#144b53"},{lightness:14},{weight:1.4}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#08304b"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#0c4152"},{lightness:5}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#0b434f"},{lightness:25}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#000000"}]},{featureType:"road.arterial",elementType:"geometry.stroke",stylers:[{color:"#0b3d51"},{lightness:16}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"}]},{featureType:"transit",elementType:"all",stylers:[{color:"#146474"}]},{featureType:"water",elementType:"all",stylers:[{color:"#021019"}]}]);
            google.maps.event.addListener(map, 'click', function(event) {var clickPos = event.latLng;console.log(clickPos);});

            firstRound = false;
          } else {
            map.setOptions(mapOptions);
          }

      }


    getLocation();
    
}

google.maps.event.addDomListener(window, 'load', initialize);
window.setInterval(initialize, 40000);
// window.setInterval(initialize, 1000000);


