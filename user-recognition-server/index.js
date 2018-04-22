//https://westcentralus.api.cognitive.microsoft.com/face/v1.0
var API_KEY = "be41d96c50f84348afc0ef91858de5cc";
var URI_BASE = "https://westus.api.cognitive.microsoft.com/face/v1.0/facelists/";

// Gets new employee information to make a new employee
function createNewEmployee() {
    var userName = document.getElementById("userId").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var licenseNum = document.getElementById("licenseNum").value;

    $.ajax({
        url: URI_BASE + userName,
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", API_KEY);
        },
        type: "PUT",
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
        url: URI_BASE + getUserName,
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
        url: URI_BASE + deleteUserName,
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
    var getUserName = document.getElementById("updateImageUserId").value;
    var imageUrl = document.getElementById("imageLink").value;

    $.ajax({
        url: URI_BASE + getUserName + "/persistedFaces",
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