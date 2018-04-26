// Google map
var lat, lng;

setInterval(() => {
    init();
}, 5000);

function init() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.open-notify.org/iss-now.json');
    xhr.send();

    xhr.addEventListener('load', function(){
        var res = JSON.parse(xhr.responseText);
        document.getElementById('lat').innerHTML = res.iss_position.latitude;
        document.getElementById('lng').innerHTML = res.iss_position.longitude;
        lat = +res.iss_position.latitude;
        lng = +res.iss_position.longitude;
        
        var myMap = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat, lng: lng},
            zoom: 8
        });

        var marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: myMap
        });

        let date = new Date(res.timestamp * 1000);
        document.getElementById('hours').innerHTML = date.getUTCHours();
        document.getElementById('minutes').innerHTML = date.getUTCMinutes();
        document.getElementById('day').innerHTML = date.toLocaleString('en', {weekday: 'long', timeZone: 'UTC'});
        document.getElementById('date').innerHTML = date.getUTCDate();
        document.getElementById('month').innerHTML = date.toLocaleString('en', {month: 'short', timeZone: 'UTC'});
        document.getElementById('year').innerHTML = date.getUTCFullYear();
    });
    

    peopleInISS();
} 

function peopleInISS() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.open-notify.org/astros.json');
    xhr.send();

    xhr.addEventListener('load', function(){
        var res = JSON.parse(xhr.responseText);

        var total = 0;

        var myNode = document.getElementById("people-list");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        res.people.forEach( (name) => {
            
            if (name.craft == 'ISS'){
                let li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `<i class="fa fa-user-circle mr-2 align-middle"></i><span class="align-middle">${name.name}</span>`;
                document.getElementById('people-list').appendChild(li);
            };
            total += 1;
        });

        document.getElementById('total-amount').innerHTML = total;
    });
}

