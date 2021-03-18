'use strict';

require('dotenv')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2019-10-10',
  authenticator: new IamAuthenticator({
    apikey: process.env.APIKEY || "2LmQMaFivFV_bjG4AEk1AN_-TeD9of3SxBL50_W6sdx",
  }),
  url: process.env.URL || "https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/6f7620c2-79fb-4ed6-a28f-92a648240d8f",
});

app.get('/', function(req, res) {
  res.send('Tone Analyzer de Ricardo :v');
});

app.post('/get-tone', async function(req, res, next) {
  try {
    const { result } = await toneAnalyzer.tone(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = app;