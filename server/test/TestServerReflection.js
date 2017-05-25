const request = require('supertest');
const express = require('express');
const echo = require('../echo');

describe('Echo', function() {
  it('Echo Test', function(done) {
    request(echo)
      .post('/webhook')
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
                        "text": '반사봇 테스트'
                    }
                }
            ]
        }
      )
      .expect(200, done)
  });
});