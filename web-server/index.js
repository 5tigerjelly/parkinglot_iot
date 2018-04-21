const express = require('express');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.listen(3000);
// app.configure(function(){
//     app.use(express.bodyParser());
//     app.use(app.router);
//   });
var db = require('./db');


// this will be used by the client devices to get status of all lots
// will return every lot and their number of free spots
app.get('/', function(req, res){
    // getCurrParkingStatus()
    res.json({'test':'hello'}); // this is how you return josn obejects
});

// a GET request will be made with the lotID
// only returns if the lotID is full or not (boolean)
app.get('/:lotID/', function(req, res){
    res.json(db.lot[req.params.lotID]);
});

// a POST request will be made with the lotID 
// and the corresponding information such as 
// lot isOccupied or lisencePlateNumber
app.post('/', function(req, res){
    console.log(req.body.lotID)
    var lotID = req.body.lotID;
    var floor = req.body.floor;
    var spaceID = req.body.spaceID;
    var isOccupied = req.body.isOccupied;
    updateParkingSpace(lotID, floor, spaceID, isOccupied);
    // console.log(req);
    // console.log(req.body);
    // console.log(req.body.lotID);
    // console.log(req.body.floor);
    // console.log(req.body.spaceID); // 
    // console.log(req.body.isOccupy);
    // updateParkingSpace();
    res.json();
});

// return the current status of empty spots of each parking lot 
// and the spaces per floor in JSON format.
function getCurrParkingStatus(){

}

// When a parking space changes from empty to occupy or occupy to empty
// the pi will make a HTTP POST request to this server, update the 
function updateParkingSpace(lotID, floor, spaceID, isOccupied){
    // res.json(req.body);
    db.lot[lotID][floor][spaceID]['isOccupied'] = isOccupied;

    // lot_is_full = false;
    // if (lot_is_full) {
    //     sendSMS();
    // }
}

// intergrate twillio api to send msg too everyone who did not park yet
//telling them the parkinglot is full (there are multiple lots)
//ex) "Parking lot A is full, please use lot B and C"
function sendSMS(){

}
