var map;

function initialize() {
  var locations = [
    // #Resistencia
    ['Polirubro Aye y Tati', 'Av Chaco 485', -27.4675118, -58.9763704, 1],
    ['Maxikiosco Juan Lucas', 'Av Mac Lean 817', -27.4448822, -59.0082411, 2],
    ['Mercadito Riki', 'Av Lavalle 1396', -27.4336536, -58.9918965, 3],
    //['El Garage', 'Fray Bertaca 999. B. España', 0, 0, 4]
    //['Terminal de Ómnibus', 'Av. Mac Lean y Soberanía Nac. Loc 4, Sector A.', 0, 0, 5],
    ['Quiniela Buena Suerte', 'Av San Martín 2099', -27.4719418, -59.0011489, 6],
    ['Quiniela Dellacasa', 'Hipólito Yrigoyen 153', -27.4516258, -58.984265, 7],
    ['Maxikiosco Napoleón', 'Frondizi 299', -27.4543356, -58.9882299, 8],
    ['Maxikiosco Luki', 'Av 9 de Julio 1050', -27.459342, -58.977215, 9],
    ['Heladería del Pilar', 'Av Castelli 2507', -27.4774018, -58.971287, 10],
    //['Multirubro Coco', 'Mz 120, Dpto 3 y 4. B° Golf 1000 Viv.', 0, 0, 11],
    //['Telecabina "B"', 'Mz 76 Pc 1 Casa 707. B° Santa Inés', 0, 0, 12],
    ['Teleciber Enter', 'Av Israel 2600', -27.4367905, -59.0135498, 13],
    //['La Manzanita', 'Padre Cerqueira 1440', 0, 0, 14]
    ['Caja Municipal', 'Av Italia 102', -27.4540748, -58.981437, 15],
    ['Caja Municipal', 'Av San Martín 1040', -27.4633534, -58.9912765, 16],
    ['Kiosco El Profesional', 'Salta 294', -27.4512601, -58.9916807, 17],
    ['Mi Genio Amor', 'Av Hernandarias 535', -27.449141, -58.9984832, 18],
    ['Librería Seño Norma', 'Av Hernandarias 2045', -27.4609324, -59.0116237, 19],
    //['Viviana E. Toros', 'Mz 2 Pc 1 Calle A. del Carril. B° Guiraldes', 0, 0, 20],
    ['Miriam E. Romero', 'Av Sabín 655', -27.4253902, -58.9777985, 21],
    ['Maxi Martín', 'Av Alberdi 1402', -27.4624885, -58.9989774, 22],
    // #Fontana
    ['Maxikiosco 24hs', 'Av Alvear 4885', -27.4312348, -59.0233787, 23],
    ['Maxikiosco 24hs', 'Av Alvear 3978', -27.4312581, -59.0234047, 24],
    // #Barranqueras
    //['Drugstore Greychu', 'Mz 76 Pc 10 B° 200 Viviendas', 0, 0, 25],
    //['Municipio Barranqueras', 'Caja Municipal', 0, 0, 26],
    ['Kiosco 24hs', 'Diagonal Eva Perón 17', -27.4829197, -58.9436913, 27],
    ['Telecentro', 'Av Laprida 5310', -27.4868953, -58.9318122, 28],
    ['Antonio J. Bojanich', 'Av 9 de Julio 4499', -27.4870036, -58.9461618, 29]         
  ];

  var mapOptions = {
    center: new google.maps.LatLng(-27.4704241, -58.9754468),
    zoom: 13,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  var infowindow = new google.maps.InfoWindow();
  
  var marker, i;
  var markers = new Array();
  var icon = new google.maps.MarkerImage(
    "findajob.png",
    new google.maps.Size(32, 37),
    new google.maps.Point(0, 0),
    new google.maps.Point(15, 35)
    );
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][2], locations[i][3]),
      map: map,
      'icon': icon
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        content = "<h3>" + locations[i][0] + "</h3><h4>" + locations[i][1] + "</h4>";
        infowindow.setContent(content);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
   
  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude);

      var icon = new google.maps.MarkerImage(
        "street_view.png",
        new google.maps.Size(11, 24),
        new google.maps.Point(0, 0),
        new google.maps.Point(8, 20)
        );
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        'icon': icon
      });

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Usted está aquí!'
      });

      map.setCenter(pos);
    }, function() {
      //handleNoGeolocation(true);
    });
  } else {
    // Browser no soporta Geolocalización
    //handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: El servicio de Geolocalización falló.';
  } else {
    var content = 'Error: Su navegador no soporta geolocalización.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, "resize", function() {
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  map.setCenter(center); 
});