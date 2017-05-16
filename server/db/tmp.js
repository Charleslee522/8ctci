const json = {
  alarmName: "json",
  creator: "kyeongin",
  time: "8 * * * *",
  active: true,
  id: "kyeongin",
  room : "124",
  desc : "test"
}

const serchjson = {
  alarmName: "json",
  creator: "kyeongin",
  time: "8 * * * *",
  active: true,
  id: "kyeongin",
  room : "124",
  desc : "test"
}

const updateJson = {
  alarmName: "updateJson",
  creator: "kyeongin",
  time: "8 * * * *",
  active: false,
  id: "kyeongin",
  room : "125",
  desc : "test_update"
}
const tmp = require('./mongodb-helper');

var tmpInstance = tmp(json);

//tmpInstance.save();
tmpInstance.allFind(function(user){
  console.log(user);
});

var tmpInstance2= tmp(json, updateJson);

//tmpInstance.remove();
tmpInstance2.findOneAndUpdate();

//tmpInstance.close();
// //console.log(user);