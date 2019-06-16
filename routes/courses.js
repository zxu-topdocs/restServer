const express = require('express');
const router = express.Router();

const courses = [
    {id:1,name:"courseB"},
    {id:2,name:"courseA"},
    {id:3,name:"courseC"},
];

router.get('/', (req,res)=>{
    
    const sortBy = req.query.sortBy;
    if (sortBy =="name") {
        courses.sort(dynamicSort("name"));
        console.log (`read api/courses sortBy=${sortBy}`);
    }
    else {
        courses.sort(dynamicSort("id"));
        console.log (`read api/courses sortBy=id`);
    };
    
    res.send(courses);
}); 

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

/*router.get("/api/course/:year/:month", (req,res)=>{    
    //http://localhost:3000/api/course/2019/11?sortBy=name
    //res.send(req.params);
    res.send(req.query);

})*/

router.get('/:id', (req,res)=>{
    const courseId = req.params.id;
    const course = courses.find(c=> c.id === parseInt(courseId));
    (!course)? res.status(404).send('course not found') : res.send(course);   
});

router.post('/', (req,res)=>{

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

router.put('/:id', (req,res)=>{
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

router.delete('/:id', (req,res)=>{
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

module.exports = router;
