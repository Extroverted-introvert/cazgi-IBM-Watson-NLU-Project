const dotenv = require('dotenv');
const express = require('express');
const app = new express();

dotenv.config();

function getNLUInstance() {
   let api_key = process.env.API_KEY;
   let api_url = process.env.API_URL;

   const NaturalLanguageUnderstangingV1 = require('ibm-watson/natural-language-understanding/v1');
   const {IamAuthenticator} = require('ibm-watson/auth');

   const naturalLanguageUnderstanding = new NaturalLanguageUnderstangingV1({
       version: '2021-06-13',
       authenticator: new IamAuthenticator({
           apikey:api_key,
       }),
       serviceUrl: api_url,
   });
   return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

   const analyzeParams = {
        'url':req.query.url,
         'features': {
             'emotion': {
                 'document': true
             }
        }
    }
    
    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    api_result = analysisResults
    console.log(api_result.result.emotion.document.emotion)
    return res.send(analysisResults.result.emotion.document.emotion);})
    .catch(err => {
    console.log('error:', err);
    });
});

app.get("/url/sentiment", (req,res) => {
    
    const analyzeParams = {
        'url':req.query.url,
         'features': {
             'sentiment': {
                 'document': true
             }
        }
    }
    
    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    api_result = analysisResults
    console.log(api_result.result.sentiment.document)
    return res.send(analysisResults.result.sentiment.document);})
    .catch(err => {
    console.log('error:', err);
    });
});

app.get("/text/emotion", (req,res) => {
    
    const analyzeParams = {
        'text':req.query.text,
         'features': {
             'emotion': {
                 'document': true
             }
        }
    }
    
    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    api_result = analysisResults
    console.log(api_result.result.emotion.document.emotion)
    return res.send(analysisResults.result.emotion.document.emotion);})
    .catch(err => {
    console.log('error:', err);
    });
});

app.get("/text/sentiment", (req,res) => {
    
    const analyzeParams = {
        'text':req.query.text,
         'features': {
             'sentiment': {
                 'document': true
             }
        }
    }
    
    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    api_result = analysisResults
    console.log(api_result.result.sentiment.document)
    return res.send(analysisResults.result.sentiment.document);})
    .catch(err => {
    console.log('error:', err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

