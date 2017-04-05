var express = require('express');
var app = express();

app.get('/',function(req, res){
  res.send('<h1>Hello World !!</h1><br> <h1>My name is "Master of Time"</h1>');
});

app.listen(3000, function(){
  console.log('Connected 3000 port!');
});
