const express = require('express');
const mysql = require('mysql2');


const app = express();
const PORT = 4000;

app.use(express.json());

const db = mysql.createPool({
  host: '193.203.184.109',
  user: 'u217412984_coderealm',
  password: 'Console.log(3);',
  database: 'u217412984_coderealm',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/contact', (req, res) => {
  const { name, company, project, budget, contact, additionalInfo, date } = req.body;

  // if (!name || !company || !project || !budget || !contact) {
  //   return res.status(400).json({ message: 'Missing required fields' });
  // }

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection error:', err.stack);
      return res.status(500).json({ message: 'Database connection error', error: err });
    }

    const query = `INSERT INTO contact_form (name, company, project, budget, contact, additionalInfo, date)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [name, company, project, budget, contact, additionalInfo, date], (err, result) => {
      connection.release();

      if (err) {
        console.error('Error inserting data:', err.stack);
        return res.status(500).json({ message: 'Database error', error: err });
      }

      res.status(200).json({ message: 'Data inserted successfully', data: result });
    });
  });
});

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports =  app;
