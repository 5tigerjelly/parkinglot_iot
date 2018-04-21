const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded());

var db = require('./db');

// this will be used by the client devices to get status of all lots
// will return every lot and their number of free spots
app.get('/', function(req, res){
    getCurrParkingStatus()
});

// a GET request will be made with the lotID
// only returns if the lotID is full or not (boolean)
app.get('/:lotID', function(req, res){

});

// a POST request will be made with the lotID 
// and the corresponding information such as 
// lot isOccupied or lisencePlateNumber
app.post('/:lotID', function(req, res){
    updateParkingSpace();
});

// return the current status of empty spots of each parking lot 
// and the spaces per floor in JSON format.
function getCurrParkingStatus(){

}

// When a parking space changes from empty to occupy or occupy to empty
// the pi will make a HTTP POST request to this server, update the 
function updateParkingSpace(){
    lot_is_full = false;
    if (lot_is_full) {
        sendSMS();
    }
}

// intergrate twillio api to send msg too everyone who did not park yet
//telling them the parkinglot is full (there are multiple lots)
//ex) "Parking lot A is full, please use lot B and C"
function sendSMS(){

}