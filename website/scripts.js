var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var lot = getUrlParameter('lot');
var URL = "http://tmo.5tigerjelly.com/";
if (lot){
    URL = URL + lot;
}
console.log(URL);

setInterval(
    get, 
    1000
);

var infoListofLot = new Array();



function get(){
    fetch(URL)
    .then(function(response) {
        return response.json();
      })
      .then(function(result) {        
        for(var info in result){     
            if(info != "emptySpace"){
                var item = {
                    name: info,
                    emptySpace: result[info]["emptySpace"]
                }
                var found = infoListofLot.find(function(element) {
                    return element.name == info;
                });
                if(found){
                    found = item;
                }else{
                    console.log(result[info]["emptySpace"]);
                    $("tbody").append($("<tr></tr>")
                    .append($("<th></th>").text(item.name).attr("scope", "row")).attr('id', item.name));
                    
                    let tableData = $("td");
                    if (item.emptySpace >= 30) {
                        $("#"+item.name).append($("<td></td>").text(item.emptySpace)).attr('class', 'goodSpace');
                        // tableData.attr('class', 'goodSpace');
                    } else if (item.emptySpace < 30 && item.emptySpace > 10) {
                        $("#"+item.name).append($("<td></td>").text(item.emptySpace)).attr('class', 'medSpace');
                        // tableData.attr('class', 'medSpace');
                    } else {
                        $("#"+item.name).append($("<td></td>").text(item.emptySpace)).attr('class', 'lowSpace');
                        // tableData.attr('class', 'lowSpace');   
                    }
                    infoListofLot.push(item);
                }
            }
        };
    })
};   
