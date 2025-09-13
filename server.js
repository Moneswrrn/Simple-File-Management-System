const express = require("express");
const cors = require("cors");
const app = express();

app.use('/routes', require('./routes/notes'));
app.use(cors());
app.use(express.json());
app.use('/routes/notes', notesRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
