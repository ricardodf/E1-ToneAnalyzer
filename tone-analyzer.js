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
    apikey: process.env.APIKEY,
  }),
  url: process.env.URL,
});

app.get('/', function(req, res) {
  res.send('Tone Analyzer de Ricardo :v');
});