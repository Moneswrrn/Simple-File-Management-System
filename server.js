const express = require("express");
const cors = require("cors");
const app = express();
const notesRouter = require("./routes/notes"); // import the notes routes

app.use(cors());
app.use(express.json());

// Mount the notes routes at /api/notes
app.use("/routes", notesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
