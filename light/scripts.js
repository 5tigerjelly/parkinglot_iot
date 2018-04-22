'use strict';

var URL = "http://tmo.5tigerjelly.com/NP2/P3/2";

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
        if (result['isOccupied'] == "True"){
            document.body.style.backgroundColor = "red";
            //set red
        }else{
            //set green
            document.body.style.backgroundColor = "green";
        }
      })
}
