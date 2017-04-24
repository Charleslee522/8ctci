const json = {
  alarmName: "test1",
  creator: "kyeongin",
  time: "8 * * * *",
  active: true,
  id: "kyeongin",
  room : "124",
  desc : "test"
}
const serchjson = {
  alarmName: "test1",
  creator: "kyeongin",
  time: "8 * * * *",
  active: true,
  id: "kyeongin",
  room : "123",
  desc : "test"
}

const updateJson = {
  alarmName: "test1",
  creator: "kyeongin",
  time: "8 * * * *",
  active: false,
  id: "kyeongin",
  room : "125",
  desc : "test_update"
}
const tmp = require('./mongodb-helper');
tmp.save(json);
tmp.allFind(function(user){
  console.log(user);
});
tmp.remove(serchjson);
tmp.findOneAndUpdate(serchjson,updateJson);

tmp.close();
//console.log(user);
//
