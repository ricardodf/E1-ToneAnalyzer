var express = require("express");
var app = express();
var bodyParser = require('body-parser')
require('dotenv').config()

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: process.env.TONE_ANALYZER_IAM_APIKEY || 'b2LmQMaFivFV_bjG4AEk1AN_-TeD9of3SxBL50_W6sdx',
  }),
  serviceUrl: process.env.TONE_ANALYZER_URL,
});

app.post('/tone', async function(req, res, next) {
  const toneParams = {
    toneInput: { 'text': req.body.text },
    contentType: 'application/json',
  };
    toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
      const { result } = toneAnalysis;
      res.send(result);
    })
    .catch(err => {
      console.log('error:', err);
    });
})

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("Aplicacion de CloudFoundry (is714522)");
});
