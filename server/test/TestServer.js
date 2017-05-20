const request = require('supertest');
const express = require('express');
const app = require('../app');

describe('Server POST /hook', function() {
  it('alarm create', function(done) {
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
      .expect(200, done)
  });

  it('alarm wrong', function(done) {
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
                        "text": '@alam -c -t "* * * 5 * *" -n jw'
                    }
                }
            ]
        }
      )
      .expect(200, done)
  });
  
  it('alarm wrong2', function(done) {
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
                        "text": '@알람 -cs'
                    }
                }
            ]
        }
      )
      .expect(200, done)
  });

  it('alarm wrong3', function(done) {
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
                        "text": '@alarm -h'
                    }
                }
            ]
        }
      )
      .expect(200, done)
  });

  it('alarm list', function(done) {
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
                        "text": '@alarm -list'
                    }
                }
            ]
        }
      )
      .expect(200, done)
  });
});


describe('Baseball Server Test', function() {
  it('야구 시작', function(done) {
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
                        "text": '@야구 시작'
                    }
                }
            ]
        }
      )
      .expect(200, done)
  });

  it('야구 플레이', function(done) {
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
                        "text": '@야구 1  41 9'
                    }
                }
            ]
        }
      )
      .expect(200, done)
  });
});