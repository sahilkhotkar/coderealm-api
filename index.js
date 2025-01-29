const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 4000;
// const cors = require('cors');

app.use(express.json());
// app.use(cors());
// app.use(cors({
//   origin: 'https://coderealm.vercel.app', // Replace with your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// }));
const db = mysql.createConnection({
  host: '193.203.184.109',         
  user: 'u217412984_coderealm',           
  password: 'Console.log(3);',          
  database: 'u217412984_coderealm', 
});


db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});


app.post('/contact', (req, res) => {
  const { name, company, project, budget, contact, additionalInfo, date } = req.body;

  if (!name || !company || !project || !budget || !contact) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log('Inserting data with date:', date);  // Log the date value for debugging

  const query = `INSERT INTO contact_form (name, company, project, budget, contact, additionalInfo, date)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [name, company, project, budget, contact, additionalInfo, date], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    return res.status(200).json({ message: 'Data inserted successfully', data: result });
  });
});



app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
