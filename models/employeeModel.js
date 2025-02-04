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

// employeeSchema.pre('save', function(next) {
//     if (!this.salary || this.salary <= 0) {
//       return next(new Error('Salary must be a positive number'));
//     }
//     this.annualSalary = this.salary * 12;
//     next();
//   });

employeeSchema.virtual('annualSalary').get(function () {
    return this.salary * 12;
  });
  
  

const Employee = mongoose.model("Employee", employeeSchema)

module.exports = Employee