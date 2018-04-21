const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//app.use(express.static('public'));
//app.use(bodyParser.urlencoded());
app.listen(
    3000,
    console.log("Listening on port 3000")
);
var db = require('./db');

// this will be used by the client devices to get status of all lots
// will return every lot and their number of free spots
app.get('/', function(req, res){
    getCurrParkingStatus()
    res.json(/* some json object*/); // this is how you return josn obejects
});

// a GET request will be made with the lotID
// only returns if the lotID is full or not (boolean)
app.get('/:lotID', function(req, res){

});

// a POST request will be made with the lotID 
// and the corresponding information such as 
// lot isOccupied or lisencePlateNumber
app.post('/', function(req, res){
    console.log(req.body.lotID);
    console.log(req.body.floor);
    console.log(req.body.spaceID); // 
    console.log(req.body.isOccupy);
    updateParkingSpace();
});

// return the current status of empty spots of each parking lot 
// and the spaces per floor in JSON format.
function getCurrParkingStatus(){
    
}

// return an int of how many parking spots are available in 
// that current lot.
function getParkingSpaceByLot(lotName){
    for (var lot in db.lot) {
        console.log(lot);
    }
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
