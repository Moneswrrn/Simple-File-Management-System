const express = require("express");
const cors = require("cors");
const notesRouter = require("./backend/routes/notes"); // correct relative path

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", notesRouter); // now defined correctly

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
