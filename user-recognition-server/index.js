//https://westcentralus.api.cognitive.microsoft.com/face/v1.0
var API_KEY = "be41d96c50f84348afc0ef91858de5cc";
var URI_BASE = "https://westus.api.cognitive.microsoft.com/face/v1.0/";
var URI_FACE_LIST = "faceLists/";
var URI_ADD_PERSON = "largepersongroups/tmobile/persons" //tmobile is the large group name created
var URI_ADD_FACE_GROUP = "largepersongroups/tmobile/persons/51cbbcd6-3e96-46ee-ac78-a3117d72187f/persistedfaces"
var URI_DETECT = "detect?returnFaceId=true&returnFaceLandmarks=false";
var URI_VERIFY = "verify";

// Gets new employee information to make a new employee
function createNewEmployee() {
    //var userName = document.getElementById("userId").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var licenseNum = document.getElementById("licenseNum").value;

    $.ajax({
        url: URI_BASE + URI_ADD_PERSON,
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", API_KEY);
        },
        type: "POST",
        // Request body
        data: JSON.stringify({ 
            "name": firstName + " " + lastName,
            "userData": licenseNum
        }),
    })
    .done(function(data) {
        alert("success");
    })
    .fail(function() {
        alert("error");
    });
}

// Gets new employee information to make a new employee
function getEmployeeData() {
    var getUserName = document.getElementById("getUserId").value;

    $.ajax({
        url: URI_BASE + URI_FACE_LIST + getUserName,
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", API_KEY);
        },
        type: "GET",
        // Request body
        data: {},
    })
    .done(function(data) {
        alert("success");
        let userDataContainer = document.getElementById("userDataContainer");
        console.log(data);
        userDataContainer.innerText = JSON.stringify(data);
    })
    .fail(function() {
        alert("Username not found");
    });
}

// Deletes new employee information to make a new employee
function deleteEmployee() {
    var deleteUserName = document.getElementById("deleteUserId").value;

    $.ajax({
        url: URI_BASE + URI_FACE_LIST + deleteUserName,
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", API_KEY);
        },
        type: "DELETE",
        // Request body
        data: {},
    })
    .done(function(data) {
        alert("success");
    })
    .fail(function() {
        alert("error");
    });
}

function addEmployeeFace() {
    var imageUrl = document.getElementById("imageLink").value;

    $.ajax({
        url: URI_BASE + URI_ADD_FACE_GROUP,
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", API_KEY);
        },
        type: "POST",
        // Request body
        data: JSON.stringify({
            "url": imageUrl
        }),
    })
    .done(function(data) {
        alert("success");
    })
    .fail(function() {
        alert("error");
    });        
}

// Upload an image of yourself to get a temporary face ID and passes the ID to "faceMatch"
function getTempFaceId() {
    var imageUrl = document.getElementById("tempImage").value;

    $.ajax({
        url: URI_BASE + URI_DETECT,
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", API_KEY);
        },
        type: "POST",
        // Request body
        data: JSON.stringify({
            "url": imageUrl
        }),
    })
    .done(function(data) {
        console.log(data[0].faceId);
        faceMatch(data[0].faceId);
    })
    .fail(function() {
        alert("error");
    });        
}

// Helper method to traverse all faces and get highest confidence match
function faceMatch() {

}