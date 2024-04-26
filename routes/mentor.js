const express = require("express");
const router = express.Router();

const {  mentor } = require("../db/db");

router.get("/mentor", async (req, res) => {
  try {
    const data = await mentor.find();
    res.send(data);
  } catch (e) {
    console.log(e, "error");
    res.status(400).send(e);
  }
});

router.post("/mentor", async (req, res) => {
  try {
    const data = await mentor.create({
      name: req.body.name,
      email: req.body.email,
      expertise: req.body.expertise,
      studentsAssigned: req.body.studentsAssigned,
    });
    res.send(data);
  } catch (e) {
    console.log(e, "error");
    res.status(400).send("Error");
  }
});



router.get("/:mentorName", async (req, res) => {
  try {
    const mentorName = req.params.mentorName;
    const studentsAssigned = await mentor.findOne({name:mentorName}).exec()
    const students = studentsAssigned.studentsAssigned;
    if(!students){
        res.send(`No students Assigned for ${mentorName}`)
    }else{
    res.send(students);
    }
  } catch (e) {
    console.log(e, "error");
    res.status(500).send("error in for 1 mentor get all students");
  }
});
module.exports = router;