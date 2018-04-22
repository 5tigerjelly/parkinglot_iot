var URL = "http://localhost:3000/";

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
          var lotsInfo = result.result;
          for(var info : lotsInfo){

          }
          var lot1 = lotsInfo["NP2"]["emptySpace"];
          var lot2 = lotsInfo["NP3"]["emptySpace"]
        

 
      })
}

// $("#table").bootstrapTable({
//     columns: [{
//         field: '',
//         title: 'Item ID'
//     }, {
//         field: 'name',
//         title: 'Item Name'
//     }, {
//         field: 'price',
//         title: 'Item Price'
//     }],
//     data: [{
//         id: 1,
//         name: 'Item 1',
//         price: '$1'
//     }, {
//         id: 2,
//         name: 'Item 2',
//         price: '$2'
//     }]
// });
