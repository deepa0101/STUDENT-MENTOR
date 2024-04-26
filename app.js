const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config")
const studentRoute = require("./routes/student");
const mentorRoute = require("./routes/mentor");
const commonRoute = require("./routes/common");


const dbConnect = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    console.log("DB Connected");
  } catch (e) {
    console.log(e.message, "error in connecting db");
  }
};
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send('<h1> Student Mentor API</h1>');
});
app.use("/", studentRoute);
app.use("/", mentorRoute);
app.use("/",commonRoute );

app.listen(process.env.PORT || 3000, async (err) => {
  await dbConnect();
  console.log("Started server  ");
  if (err) {
    console.log(err, "error in starting server");
  }
});