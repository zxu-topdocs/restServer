const Joi = require('joi');
const express = require('express');
const app = express();
const checkToken = require('./checkToken');
const helmet = require ('helmet');

app.use(express.json());
app.use(express.urlencoded({entended:true}));  //key=value&key=value
app.use(express.static('publicFiles'));
app.use(helmet);

app.use(checkToken);

module.exports =app;

const courses = [
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"},
];

app.get("/api/course", (req,res)=>{
    const sortBy = req.query.sortBy;
    if (sortBy =="name") {courses.sort.name };

    res.send(courses);
}); 

/*app.get("/api/course/:year/:month", (req,res)=>{    
    //http://localhost:3000/api/course/2019/11?sortBy=name
    //res.send(req.params);
    res.send(req.query);

})*/

app.get("/api/course/:id", (req,res)=>{
    const courseId = req.params.id;
    const course = courses.find(c=> c.id === parseInt(courseId));
    (!course)? res.status(404).send('course not found') : res.send(course);   
});

app.post("/api/course", (req,res)=>{

    const schema ={
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate (req.body, schema);
    if (result.error){res.status(400).send(result.error.details[0].message); return;}

    // next validation won't be run
    if (!req.body.name){ res.status(400).send('Name is required'); return;}
    if (req.body.name.length <3){ res.status(400).send('Name more than 3 char'); return;}    
    
   const course ={
      id: courses.length +1,
      name: req.body.name
   };

   courses.push (course);
   res.send('new id is ' + course.id);

});

app.put("/api/course/:id", (req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id ) );
    if (!course) return res.status(404).send('course not found');       
     
    //method 1 old
    //const result = validateCourse(req.body);
    //if (result.error) { 
    //    res.status(400).send(result.error.details[0].message); 
    //    return;
    //}    
    //method 2 new
    const {error} = validateCourse(req.body);  //result has error and value, we only need error    
    if (error) return res.status(400).send(error.details[0].message); 

    /*if (error){
        res.status(400).send(error.details[0].message); 
        return;
    }
    */

    course.name=req.body.name;
    res.send(course);
});

app.delete("/api/course/:id", (req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id ) );
    if (!course)  {
         res.status(404).send('course not found');  
         return;
    };
    //if (!course) return res.status(404).send('course not found');

    const index= courses.indexOf(course);
    courses.splice(index,1);

    res.send(course.id + " is deleted");
})

function validateCourse(course){
    const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate (course, schema);   
}

/*app.use("/api",(req,res,next)=>{
    res.status(200).json({
        message : "it works"
    });
});*/

function RunSql(sqlcmd){

    const sql = require('mssql');

    const config = {        
        server: 'localhost\SQLEXPRESS', 
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

app.get("/", (req,res)=>{
    console.log("Read SQL")
    var result = RunSql("SELECT ClientName FROM [aspnetdb].[dbo].[Clients] WHERE ClientId = 7")
    res.send(result);
    res.end();
}); 

