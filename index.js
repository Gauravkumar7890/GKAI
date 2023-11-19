// app.js
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3007;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Replace this with your actual ChatGPT API key
const apiKey = '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';

app.post('/get-response', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        prompt: userMessage,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const aiResponse = response.data.choices[0].text.trim();
    res.json({ aiResponse });
  } catch (error) {
    console.error('Error from ChatGPT API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve the main HTML file when accessing the root path
app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
