'use strict';

var URL = "http://localhost:3000/NP2/P1/3";

setInterval(
    get, 
    1000
);

function get(){
    fetch(URL)
    .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        if (result['isOccupied']){
            document.body.style.backgroundColor = "red";
            //set red
        }else{
            //set green
            document.body.style.backgroundColor = "green";
        }
      })
}
