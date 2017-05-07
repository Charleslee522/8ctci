
const mongoose = require('mongoose');
  // DEFINE MODEL
const Book = require('./models/book');

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


function successCallback() {
  console.log('success!!');
}
  
function failureCallback(err) {
  console.error('fail..', err);
}
  
function saveObject(obj) {
  new Book(obj)
    .save()
    .then(successCallback)
    .catch(failureCallback);
}

function findOneAndUpdate(preObj,updateObj){
  new Book.findOneAndUpdate(preObj,updateObj,function(err,user){
  if(err) throw err;

  //console.log(user);
});}
function findOneAndRemove(obj){
  new Book.findOneAndRemove(obj, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});
}
  
MONGODB.prototype.save = function(){
  saveObject(this.preObject)
}

MONGODB.prototype.allFind = function(user){

Book.find({},function(err,users){
  if(err) throw err;
  user(users);
});}

MONGODB.prototype.findOneAndUpdate = function(){
  findOneAndUpdate(this.preObject,this.newObject)
}
MONGODB.prototype.remove = function(){
  findOneAndRemove(this.preObject)
}
MONGODB.prototype.close = function()
{
  mongoose.connection.close();
}


module.exports = MONGODB;
