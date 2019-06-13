var edge = require('edge');
var params = {
  connectionString: "Server=TOPDOCS32-PC\SQLEXPRESS;Database=aspnetdb;Integrated Security=True",
  source: "SELECT ClientName FROM [aspnetdb].[dbo].[Clients] WHERE ClientId = 7"
};  
var getData = edge.func('sql', params);

getData(null, function (error, result) {
   if (error) { console.log(error); return; }
   if (result) {
    console.log(result);
   }
   else {
    console.log("No results");
   }
 });

 module.export =getdata