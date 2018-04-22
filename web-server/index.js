
// express
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.listen(3000);

// db
var db = require('./db');

// twilio api
var twilio = require('twilio');
var twilioCredential = require('./twilio-pw');
var twilioClient = new twilio(twilioCredential.accountSid, twilioCredential.authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// this will be used by the client devices to get status of all lots
// will return every lot and their number of free spots
app.get('/', function(req, res){
    // getCurrParkingStatus()
    var lotInfo = getLots(req.params);
    res.json(lotInfo);
    // res.json({'test':'hello'}); // this is how you return josn obejects
});

function getLots(info){
    return db.lot;
}

app.get('/:lotID/:floor/:spaceID', function(req, res){
    var lotID = req.params.lotID;
    var floor = req.params.floor;
    var spaceID = req.params.spaceID;
    var isOccupied = getOccupation(lotID, floor, spaceID);
    res.json({'isOccupied': isOccupied});
});

// a GET request will be made with the lotID
// only returns if the lotID is full or not (boolean)
app.get('/:lotID', function(req, res){
    var freeSpace = getParkingSpaceByLot(req.params.lotID);
    res.json(freeSpace);
});



function getOccupation(lotID, floor, spaceID){
    return db.lot[lotID][floor][spaceID][`isOccupied`];
}


// a POST request will be made with the lotID 
// and the corresponding information such as 
// lot isOccupied or lisencePlateNumber
app.post('/', function(req, res){
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

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
  
    twiml.message('The Robots are coming! Head for the hills!');
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

// return the current status of empty spots of each parking lot 
// and the spaces per floor in JSON format.
function getCurrParkingStatus(){
    
}

// return an int of how many parking spots are available in 
// that current lot.
function getParkingSpaceByLot(lotName){
    return db.lot[lotName]['emptySpace'];
}

// When a parking space changes from empty to occupy or occupy to empty
// the pi will make a HTTP POST request to this server, update the 
function updateParkingSpace(lotID, floor, spaceID, isOccupied){
    db.lot[lotID][floor][spaceID]['isOccupied'] = isOccupied;
    if(isOccupied == true){
        db.lot[lotID][floor][`emptySpace`] --;
        db.lot[lotID][`emptySpace`]--;
    }else{
        db.lot[lotID][floor][`emptySpace`] ++;
        db.lot[lotID][`emptySpace`] ++;
    }

    // check every lot and see if they're full    
    // retrun an array with the all the lots that are full
    if(db.lot[lotID][`emptySpace`] == 0){
        sendSMS(db.lot[lotID]);
    }
}

// intergrate twillio api to send msg too everyone who did not park yet
//telling them the parkinglot is full (there are multiple lots)
//ex) "Parking lot A is full, please use lot B and C"
function sendSMS(msg, to){
    client.messages.create({
        body: msg,
        to: to,
        from: twilioCredential.phoneNumber
    })
    .then((message) => console.log(message.sid));
}
