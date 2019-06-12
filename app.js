const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
module.exports =app;

app.get("/", (req,res)=>{
    res.send("hello world!!!!");
    res.end();
}); 

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


// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername",
//   password: "yourpassword"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("Select * from Customers", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });
