var yakkerInputEl = document.getElementById("yakker-input") // get the input box: textarea
var yakkerCountEl = document.getElementById("yakker-message-count") // get message count
var yakkerButtonEl = document.getElementById("yakker-submit") // get post button: button
var listContainerEl = document.getElementById("yakker-list-container") // get the yakker: ul container
var maxMessageLength = 140;

function cb(data){
  for (var i = 0; i < data.length; i++){
    console.log(data[i]);
    var textEl =  document.createElement("div");
    textEl.className = "yakker-message";
    textEl.innerText = data[i].post;
    var timeEl = document.createElement("time");
    timeEl.innerText = data[i].date.substring(0,10);
    var listItem = document.createElement("li");
    listItem.appendChild(textEl);
    listItem.appendChild(timeEl);

    // append el to the container
    listContainerEl.appendChild(listItem);
  }
}

function getPosts(cb){
  var request = new XMLHttpRequest();
  request.open('GET', '/posts', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        cb(data);
      } else {
        console.log("We reached our target server, but it returned an error")
      }
    };

    request.onerror = function() {
      console.log("There was a connection error of some sort");
    };

    request.send();
}

getPosts(cb);

// disables the yakker-button based on the message length
function updateButton(messageLength) {
  var isDisabled = messageLength === 0 || messageLength > maxMessageLength;
  yakkerButtonEl.disabled = isDisabled;
}

// updates the message counter to `140 - length of message`
function updateCharacterCount(messageLength) {
  var newColor = Math.round(255 * Math.min(1, messageLength / maxMessageLength));

  yakkerCountEl.innerText = maxMessageLength - messageLength;
  yakkerCountEl.style.color = 'rgb(' + newColor + ',0,0)';
}

function sendMessage() {
  var yakkerText = yakkerInputEl.value;

  if (yakkerText.length <= maxMessageLength) {
    var time = new Date();
    var timeText = time.getFullYear() + "-" + (time.getMonth() + 1) + '-' + time.getDate();

    var textEl =  document.createElement("div");
    textEl.className = "yakker-message";
    textEl.innerText = yakkerText;
    var timeEl = document.createElement("time");
    timeEl.innerText = timeText;
    var listItem = document.createElement("li");

    var data = {
      "message": yakkerText,
      "time": timeText
    };

    var request = new XMLHttpRequest();
    request.open("POST", "/yak");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    listItem.appendChild(textEl);
    listItem.appendChild(timeEl);

    // append el to the container
    listContainerEl.appendChild(listItem);

    // clear out the textare and reset the button and counter
    yakkerInputEl.innerText = "";
    updateButton(0);
    updateCharacterCount(0);
  }
}

yakkerInputEl.addEventListener('input', function(event) {
  var messageLength = event.target.value.length;
  updateButton(messageLength);
  updateCharacterCount(messageLength);
});

// if shift-enter is pressed, send the message
yakkerInputEl.addEventListener('keydown', function(event) {
  if (event.which === 13 && event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

yakkerButtonEl.addEventListener('click', sendMessage, false);


// function initAutoComplete(){

//   //Map options
//   var options ={
//     zoom: 8, 
//     center: {lat:-0.4395, lng: 130.7412 }
//   }
//   // new map
//   var map = new google.maps.Map(document.getElementById('map'),options);

//   //add marker 
//   var marker = new google.maps.Marker({
//     position: {lat:-0.4395, lng: 130.7412},
//     map: map
//   })  
// }
function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
