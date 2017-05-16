
 var mongoose = require('mongoose');
  // DEFINE MODEL
var Book = require('./models/book');

var db_server  = process.env.DB_ENV || 'primary';

  // Use native promises
mongoose.Promise = global.Promise;
  
  // CONNECT TO MONGODB SERVER
mongoose
  .connect('mongodb://localhost/db')
  .then((res) => {
      // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
  })
  .catch(console.error);
     

function MONGODB(preObject, newObject) {

  if (!(this instanceof MONGODB)) {
    return new MONGODB(preObject, newObject);
  }
  this.preObject = preObject;
  this.newObject = newObject;
};

var gracefulExit = function() { 
  mongoose.connection.close(function () {
    console.log('Mongoose default connection with DB :' + db_server + ' is disconnected through app termination');
    process.exit(0);
  });
}

function successCallback(str) {
  console.log(str+'success!!');
}
  
function failureCallback(err) {
  console.error('fail..', err);
}
  
function saveObject(obj) {
  new Book(obj)
    .save()
    .then(successCallback("Save "))
    .catch(failureCallback);
}

function findOneAndUpdate(preObj,updateObj){
  Book.findOneAndUpdate(preObj,updateObj)
    .then(successCallback("Update "))
    .catch(failureCallback);
} 

function findOneAndRemove(obj){
  Book.findOneAndRemove(obj)
    .then(successCallback("Remove "))
    .catch(failureCallback);
}

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

  
MONGODB.prototype.save = function(){
  saveObject(this.preObject)
}

MONGODB.prototype.allFind = function(user){

Book.find({},function(err,users){
  if(err) throw failureCallback(err);
  else 
    user(users);
}).then(successCallback("AllFind "));}

MONGODB.prototype.findOneAndUpdate = function(){
  findOneAndUpdate(this.preObject,this.newObject)
}
MONGODB.prototype.remove = function(){
  findOneAndRemove(this.preObject)
}
MONGODB.prototype.close = function()
{
  mongoose.disconnect();
}


module.exports = MONGODB;
