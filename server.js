const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger
const swaggerDocument = require(path.join(__dirname, "swagger.json"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root endpoint
app.get("/", (req, res) => {
  res.send("✅ Bookstore API is running. See /api-docs for documentation.");
});

// Routes
app.use("/api/authors", require("./routes/authorRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });