const mongoose =  require("mongoose");
const schema = mongoose.Schema;

  const studentSchema = schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: String,
      required: true,
    },
    mentorAssigned: {
      type: String,
      default: null,
      ref: "mentor",
    },
    mentorOverTime: {
      type: Array,
      default: [],
      ref: "mentor",
    },
  });
  
  const student = mongoose.model("student", studentSchema, "student");
  
  const mentorSchema = schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    studentsAssigned: [
      {
        type: Array,
        ref: "student",
        default: []
      },
    ],
  });
  
  const mentor = mongoose.model("mentor", mentorSchema, "mentor");
  
  module.exports = {  student, mentor };
