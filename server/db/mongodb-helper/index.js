
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
  Book.findOneAndUpdate(preObj,updateObj,function(err,user){
  if(err) throw err;

  //console.log(user);
});}
function findOneAndRemove(obj){
  Book.findOneAndRemove(obj, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});
}
  
module.exports.save = function(obj){
  saveObject(obj)
}

module.exports.allFind = function(user){

Book.find({},function(err,users){
  if(err) throw err;
  user(users);
});}

module.exports.findOneAndUpdate = function(preObj,updateObj){
  findOneAndUpdate(preObj,updateObj)
}
module.exports.remove = function(obj){
  findOneAndRemove(obj)
}
module.exports.close = function()
{
  mongoose.connection.close();
}

