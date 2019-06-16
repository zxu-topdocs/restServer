const Joi = require('joi');
const express = require('express');
const checkToken = require('./checkToken');
const helmet = require ('helmet');
const config =require('config');
const startupDebug = require('debug')('app:starup');
const dbDebug = require('debug')('app:db');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

//process.env.NODE_ENV;
console.log("App Name:" + config.get('name'));
console.log ("Mail server:"+ config.get('mail.host'));

app.set('view engine', 'pug');
app.set('views', './pugsample');

app.use(express.json());
app.use(express.urlencoded({entended:true}));  //key=value&key=value
app.use(express.static('publicFiles'));
app.use('/api/courses', courses);
app.use('/', home);

if (app.get('env') ==='develpemnt'){
    app.use(helmet());
    startupDebug("use helmet");
}
if (app.get('env') ==='production'){
    app.use(checkToken);
}
module.exports =app;

/*app.use("/api",(req,res,next)=>{
    res.status(200).json({
        message : "it works"
    });
});*/




