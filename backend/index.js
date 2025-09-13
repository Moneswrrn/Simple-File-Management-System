const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRouter = require('./routes/notes');
require('./db'); // initialize DB

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/notes', notesRouter);

app.get('/', (req, res) => res.send({ status: 'Notes API running' }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));