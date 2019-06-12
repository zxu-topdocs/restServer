const fs = require('fs');
const EventEmitter = require('events');

//const myfiles = fs.readdirSync('./')
//console.log(myfiles)

const myfiles = fs.readdir('./', function(error,files){
          if (error) console.log('error', error);
          //else console.log(`result is ${files}`);
          else console.log('result:', files);
})|"ascii";

const Log1 = require('./logger');
const myLog = new Log1(); 

myLog.on('writeToLog', (arg1)=>{return console.log("writeToLog event is happen", arg1)});

myLog.log("something is happened");
// class fileTest{   

//     myFiles(){
//         return files
//     };
    
//     writetoMyFile(filename, myText) {
//         fs.writeFile(filename, myText, (err) => {  
//             throws an error, you could also catch it here
//             if (err) throw err;
        
//             success case, the file was saved
//             console.log('myText saved!');
//         });
//     };

   

// }


// module.exports =fileTest;

