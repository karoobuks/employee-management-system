const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true,
        enum:["software developer", "hr manager", "marketing specialist"]
    },
    department:{
        type:String,
        required:true,
        enum:["engineer", "hr", "marketing"]
    },
    salary:{
        type:Number,
        required:true
    },
    // annualSalary:{
    //     type:Number,
    //     required:true
    // }
})



employeeSchema.virtual('annualSalary').get(function () {
    return this.salary * 12;
  });
  
  

const Employee = mongoose.model("Employee", employeeSchema)

module.exports = Employee