const request = require('supertest');
const express = require('express');
const app = require('../app');

// describe('Server GET /hook', function() {
//   it('Server get test', function(done) {
//     request(app)
//       .get('/hook')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end(done);
//   });
// });

describe('Server POST /hook', function() {
  it('Server post test', function(done) {
    request(app)
      .post('/hook')
      .send(
        {
            "events": [
                {
                    "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                    "type": "message",
                    "timestamp": 1462629479859,
                    "source": {
                        "type": "user",
                        "userId": "U206d25c2ea6bd87c17655609a1c37cb8"
                    },
                    "message": {
                        "id": "325708",
                        "type": "text",
                        "text": '@alarm -c -t "* * * 5 * *" -n jw'
                    }
                }
            ]
        }
      )

      //.expect('timeout', 2000)
      //.set('Accept', 'application/json')
      //.expect('Content-Type', /json/)
      .expect(200, done)
  });
});

// describe('request(url)', function() {
//   it('should be supported', function(done) {
//     var s;

//     app.get('/', function(req, res) {
//       res.send('hello');
//     });

//     s = app.listen(function() {
//       var url = 'http://localhost:' + s.address().port;
//       request(url)
//       .get('/')
//       .expect('hello', done);
//     });
//   });
// });


// describe('request(app)', function() {
//   it('should fire up the app on an ephemeral port', function(done) {
//     var app = express();

//     app.get('/', function(req, res) {
//       res.send('hey');
//     });

//     request(app)
//     .get('/')
//     .end(function(err, res) {
//       res.status.should.equal(200);
//       res.text.should.equal('hey');
//       done();
//     });
//   });
// });