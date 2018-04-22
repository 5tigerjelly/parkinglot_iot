//https://westcentralus.api.cognitive.microsoft.com/face/v1.0
var API_KEY = "be41d96c50f84348afc0ef91858de5cc";
var URI_BASE = "https://westus.api.cognitive.microsoft.com/face/v1.0/facelists/";

// Gets new employee information to make a new employee
function createNewEmployee() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var licenseNum = document.getElementById("licenseNum").value;
    var employeeArray = [firstName, lastName, licenseNum];
    console.log(employeeArray);
    
    jquery.ajax({
        
    });
}

