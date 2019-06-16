const express = require('express');
const router = express.Router();

function RunSql(sqlcmd){

    const sql = require('mssql');

    const config = {        
        server: 'localhost\SQLEXPRESS2', 
        database: 'aspnetdb', 
        driver: "msnodesqlv8",
        options: {
            trustedConnection: true
        }
    };

    // var con = mysql.createConnection({
    //   host: "localhost",
    //   user: "yourusername",
    //   password: "yourpassword"
    // }); 
    
    const myCmd = sqlcmd;
    //validation  myCmd
    sql.connect(config, function(err) {
        if (err) return console.log(err);
        console.log("Connected!");
        var request = new sql.Request();      
        request.query(myCmd, function (err, result) {
            if (err) console.log(err);
            console.log(result);
        });
    })
}


router.get("/", (req,res)=>{
    //console.log("Read SQL")
    // var result = RunSql("SELECT ClientName FROM [aspnetdb].[dbo].[Clients] WHERE ClientId = 7")
    // res.send(result);
    // res.end();

    res.render('pug1', {myTitle:"my pug title", h1: "pug html test 1"});
}); 
module.exports = router;