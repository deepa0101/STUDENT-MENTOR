const express = require("express");
const router = express.Router();

const { student, mentor } = require("../db/db");

router.get("/student", async (req, res) => {
  console.log("get all Students");
  try {
    const data = await student.find();
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

router.post("/student", async (req, res) => {
  console.log("Student create route");
  try {
    const data = await student.create({
      name: req.body.name,
      email: req.body.email,
      course: req.body.course,
      mentorAssigned: req.body.mentorAssigned,
    });
    res.send(data);
  } catch (e) {
    console.log(e.message, "error");
    res.status(500).send("Error in student POST");
  }
});
router.get("/mentorStudents/:studentName", async (req, res, next) => {
    try {
      const { studentName} = req.params;
      const studentdata = await student.findOne({name:studentName})
      res.json(studentdata.mentorOverTime)
    } catch (error) {
        console.log(error)
      next(error);
    }
  })

module.exports = router;