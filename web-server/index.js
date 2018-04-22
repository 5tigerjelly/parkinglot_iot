
// express
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var log = require('fs');
const uuidv4 = require('uuid/v4');
const app = express();
var cors = require('cors');
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(3000);

// db
var db = require('./db');

// twilio api
var twilio = require('twilio');
var twilioCredential = require('./twilio-pw');
var twilioClient = new twilio(twilioCredential.accountSid, twilioCredential.authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

//aws rekognition
// const Rekognition = require('node-rekognition');
// const awsCredential = {
//     "accessKeyId": "AKIAJRPT5XQDY7SNTO7A",
//     "secretAccessKey": "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",
//     "region": "us-west-2",
//     "bucket": "tmohack"
// };
// const rekognition = new Rekognition(awsCredential);

// this will be used by the client devices to get status of all lots
// will return every lot and their number of free spots
app.get('/', function (req, res) {
    // getCurrParkingStatus()
    res.json(db.lot);
    // res.json({'test':'hello'}); // this is how you return josn obejects
});

app.get('/:lotID/:floor/:spaceID', function (req, res) {
    var lotID = req.params.lotID;
    var floor = req.params.floor;
    var spaceID = req.params.spaceID;
    var isOccupied = getOccupation(lotID, floor, spaceID);
    res.json({ 'isOccupied': isOccupied });
});

// a GET request will be made with the lotID
// only returns if the lotID is full or not (boolean)
app.get('/:lotID', function (req, res) {
    res.json(db['lot'][req.params.lotID]);
});

app.get('/images/:imagePath', function (req, res) {
    var imageFilePath = req.params.imagePath;
    var img = fs.readFileSync('./images/' + imageFilePath);
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
});

app.post('/upload', function (req, res) {
    console.log(req.files);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    var filePath = './images/' + uuidv4() + '.jpg';
    sampleFile.mv(filePath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        var imagePaths = "http://localhost:3000" + filePath.substring(1);
        // const s3Images = await rekognition.uploadToS3(imagePaths, 'images');
        res.send(filePath);
    });
});
// const collection = await rekognition.createCollection('tmo');
// console.log(collection);

function getOccupation(lotID, floor, spaceID) {
    return db.lot[lotID][floor][spaceID][`isOccupied`];
}


// a POST request will be made with the lotID 
// and the corresponding information such as 
// lot isOccupied or lisencePlateNumber
app.post('/', function (req, res) {
    var lotID = req.body.lotID;
    var floor = req.body.floor;
    var spaceID = req.body.spaceID;
    var isOccupied = req.body.isOccupied;
    updateParkingSpace(lotID, floor, spaceID, isOccupied);
    res.json();
});

// for twilio when user sends text to the api
app.post('/sms', (req, res) => {
    var fromNumber = req.body.From;
    var SMSBody = req.body.Body;
    if (SMSBody.toLowerCase().includes("where")) {
        // use phone number to find location
        SMSBody = getLicenseByPhoneNumber(fromNumber);
    }
    if (!SMSBody.includes("sorry but we could")) {
        SMSBody = getLocationByLicense(SMSBody);
    }
    const response = new MessagingResponse();
    const message = response.message();
    message.body(SMSBody);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(response.toString());
});

app.post('/testsms', (req, res) => {
    sendSMS("Hello this twilio API is working", "+14155099245");
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end();
});

// return the current status of empty spots of each parking lot 
// and the spaces per floor in JSON format.
function getCurrParkingStatus() {
    var currParkingStatus = {};
    for (var lot in db.lot) {
        currParkingStatus[lot] = getParkingSpaceByLot(lot);
    }
    return currParkingStatus;
}

// Takes in the lot name (NP2) and floor name (P1) and 
// returns an int of the current spaces on that floor
function getParkingSpaceByFloor(lotName, floorName) {
    return db.lot[lotName][floorName]['space'];
}

// return an int of how many parking spots are available in 
// that current lot.
function getParkingSpaceByLot(lotName) {
    return db.lot[lotName]['emptySpace'];
}

function getLicenseByPhoneNumber(phoneNumber) {
    for (var user in db['user']) {
        if ('phone' in db['user'][user] && db['user'][user]['phone'] == phoneNumber) {
            return db['user'][user]['license'];
        }
    }
    return "sorry, your number is not registered in our system";
}

function getLocationByLicense(license) {
    license = license.toLowerCase();
    for (var lot in db['lot']) {
        for (var floor in db['lot'][lot]) {
            if (floor != "emptySpace") {
                for (var space in db['lot'][lot][floor]) {
                    if (space != "emptySpace") {
                        if ('license' in db['lot'][lot][floor][space]) {
                            if (db['lot'][lot][floor][space]['license'].toLowerCase() == license) {
                                return "Your car is parked at lot: " + lot + " floor: " + floor + " spcae: " + space;
                            }
                        }
                    }
                }
            }
        }
    }
    return "sorry but we could not found your car";
}

// When a parking space changes from empty to occupy or occupy to empty
// the pi will make a HTTP POST request to this server, update the 
function updateParkingSpace(lotID, floor, spaceID, isOccupied) {
    db.lot[lotID][floor][spaceID]['isOccupied'] = isOccupied;
    if (isOccupied == 'true') {
        db.lot[lotID][floor][`emptySpace`]--;
        db.lot[lotID][`emptySpace`]--;
    } else {
        db.lot[lotID][floor][`emptySpace`]++;
        db.lot[lotID][`emptySpace`]++;
    }

    // check every lot and see if they're full    
    // retrun an array with the all the lots that are full
    if (db.lot[lotID][`emptySpace`] == 0) {
        sendEveryoneMsg(lotID);
    }
}

function sendEveryoneMsg(lot){
    var msg = "Sorry lot " + lot + " is full, please redirect to NP2(27) or NP4(50)"
    for (var user in db['user']){
        if ("phone" in db['user'][user]){
            sendSMS(msg,db['user'][user]['phone'])
        }
    }
}

// intergrate twillio api to send msg too everyone who did not park yet
//telling them the parkinglot is full (there are multiple lots)
//ex) "Parking lot A is full, please use lot B and C"
function sendSMS(msg, to) {
    // console.log(msg + to);
    twilioClient.messages.create({
        body: msg,
        to: to,
        from: twilioCredential.phoneNumber
    })
        .then((message) => console.log(message.sid));
}
