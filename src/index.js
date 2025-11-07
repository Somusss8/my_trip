const express = require('express');
const app = express();

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Country cost data
const countryCosts = {
  "India": 25,
  "Japan": 35,
  "France": 42,
  "Australia": 50,
  "USA": 62
};

// Serve the main page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Trip Planner</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f2f2f2;
            text-align: center;
            padding: 40px;
          }
          h1 {
            color: #333;
          }
          form {
            display: inline-block;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          label {
            display: block;
            text-align: left;
            margin: 8px 0;
          }
          button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            margin-top: 10px;
            cursor: pointer;
            border-radius: 5px;
          }
          button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <h1>🌍 My Trip Planner</h1>
        <form method="POST" action="/plan">
          ${Object.keys(countryCosts).map(c => 
            `<label><input type="checkbox" name="countries" value="${c}"> ${c}</label>`
          ).join('')}
          <button type="submit">Plan Trip</button>
        </form>
      </body>
    </html>
  `);
});

// Handle the form submission
app.post('/plan', (req, res) => {
  const selected = req.body.countries;
  let html = '<h1>🌍 Trip Plan Result</h1>';

  if (!selected) {
    html += '<p>No countries selected.</p>';
  } else {
    // Make selected always an array
    const selectedArray = Array.isArray(selected) ? selected : [selected];

    html += '<ul style="list-style:none; padding:0;">';
    let total = 0;
    selectedArray.forEach(c => {
      const cost = countryCosts[c] || 0;
      total += cost;
      html += `<li>${c} &nbsp;&nbsp; $${cost}</li>`;
    });
    html += '</ul>';
    html += `<p><strong>Total Cost: $${total}</strong></p>`;
  }

  html += '<a href="/">Go Back</a>';

  res.send(`
    <html>
      <body style="text-align:center; font-family:Arial; padding:40px;">
        ${html}
      </body>
    </html>
  `);
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

