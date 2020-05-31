const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

// Express setup
const app = express();
app.use(express.json());

// Mongoose setup
const dbConnectionURI = config.get("mongoURI");

mongoose
  .connect(dbConnectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Assign routes to express
app.use("/api/users", require("./routes/api/users.route"));
app.use("/api/auth", require("./routes/api/auth.route"));
app.use("/api/patients", require("./routes/api/patient.route"));
app.use("/api/vehicle", require("./routes/api/vehicles.route"));
app.use("/api/personnel", require("./routes/api/personnel.route"));
app.use("/api/trips", require("./routes/api/trip.route"));
app.use("/api/schedule", require("./routes/api/schedule.route"));
app.use("/api/skill", require("./routes/api/skill.route"));
app.use("/api/station", require("./routes/api/station.route"));
app.use("/api/vehicle_type", require("./routes/api/vehicle_type.route"));

// Serve static assets if in production
if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// start server to listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
