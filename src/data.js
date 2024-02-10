import express from 'express';
import { createConnection } from 'mysql';


const app = express();
const port = 3000;

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '1313',
  database: 'document_management'
});

connection.connect('localhost:127.0.0.1:3307/document_management', {
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM mytable', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});