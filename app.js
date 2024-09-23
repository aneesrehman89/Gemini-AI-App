const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/getResponse', async (req, res) => {
  console.log(req.body);

  const genAI = new GoogleGenerativeAI(
    'AIzaSyBhE6-5R6kKW_nIacroHMsukwmqgQ0NYoU'
  );
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  model
    .generateContent(req.body.question)
    .then((result) => {
      console.log(result.response.text());
      const response = result.response.text();
      return res.status(200).json({ response: response });
    })
    .catch((error) => {
      return res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = app;
