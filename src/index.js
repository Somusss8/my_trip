const express = require('express');
const path = require('path');
const app = express();

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

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
        <h1>My Trip Planner</h1>
        <form method="POST" action="/plan">
          <label><input type="checkbox" name="countries" value="India"> India</label>
          <label><input type="checkbox" name="countries" value="Japan"> Japan</label>
          <label><input type="checkbox" name="countries" value="France"> France</label>
          <label><input type="checkbox" name="countries" value="Australia"> Australia</label>
          <label><input type="checkbox" name="countries" value="USA"> USA</label>
          <button type="submit">Plan Trip</button>
        </form>
      </body>
    </html>
  `);
});

// Handle the form submission
app.post('/plan', (req, res) => {
  const selected = req.body.countries;
  let message = '';

  if (!selected) {
    message = '<p>No countries selected.</p>';
  } else if (Array.isArray(selected)) {
    message = `<p>You selected: <strong>${selected.join(', ')}</strong></p>`;
  } else {
    message = `<p>You selected: <strong>${selected}</strong></p>`;
  }

  res.send(`
    <html>
      <body style="text-align:center; font-family:Arial;">
        <h1>Trip Plan Result</h1>
        ${message}
        <a href="/">Go Back</a>
      </body>
    </html>
  `);
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:\${PORT}`);
});
