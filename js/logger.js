const EventEmitter = require('events');
//const emitter = new EventEmitter;

var url = 'http:/mylogger.io/log';

class MyLog extends EventEmitter {

    log(message){
        //console.log ('my mesage: ' + message);
        console.log(`my message: ${message}`);
        this.emit('writeToLog', {id:1, message:message});
    }
}

module.exports  = MyLog;