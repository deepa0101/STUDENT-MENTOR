const { student, mentor } = require("../db/db");
const express = require('express')
const router = express.Router();


router.put("/assignStudent/:studentName/:mentorName", async (req, res, next) => {
  try {
    const { studentName, mentorName } = req.params;

    const studentdata = await student.findOne({name: studentName})
    if(studentdata.mentorAssigned!=[]){
        res.send("Student already has a mentor")
    }else{
      studentdata.mentorAssigned = mentorName, 
      studentdata.mentorOverTime.push(mentorName)
    }
    await studentdata.save();
    console.log(studentdata)

    const mentordata = await mentor.findOneAndUpdate(
      {name:mentorName},
      { $addToSet: { studentsAssigned: studentName }},
      { new: true }
    );

    res.json({ studentdata, mentordata });
  } catch (error) {
    next(error);
  }
});

router.put("/assignMentor/:studentName/:newMentorName", async (req, res, next) => {
  try {
    const { studentName, newMentorName } = req.params;
    const studentdata = await student.findOne({name:studentName}).exec();
    
    if (!studentdata) {
      return res.status(404).json({ error: "Student not found." });
    }
    
    if (studentdata.mentorAssigned) {
        const Mentor = await mentor.find({name: studentdata.mentorAssigned}).exec();
        console.log(Mentor)
        console.log(Mentor.studentsAssigned)
      const oldMentor = await mentor.updateOne(
        {name: studentdata.mentorAssigned},
        { $pull: { studentsAssigned: studentName } },
        { new: true },
      );
    console.log(oldMentor)
    }
    studentdata.mentorAssigned = newMentorName;
    await studentdata.save();
    

    const newMentor = await mentor.findOneAndUpdate(
     {name: newMentorName },
      { $addToSet: { studentsAssigned: 'Deepa' } },
      { new: true }
    );
    console.log(studentdata)
    console.log(newMentor)
    res.json({
      message: "Mentor assigned or changed successfully",
      studentdata,
      newMentor,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;