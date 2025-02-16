const Employee = require('../models/employeeModel')

exports.createEmployee = async (req, res, next)=>{
 try{
    const newEmployee = await Employee.create(req.body)
    await newEmployee.save();
    return res.status(201).json({message:'welcome to our company', data:newEmployee})
 }catch(error){
    return res.status(400).json({message:'something went wrong', error})
 }
}

exports.getEmployee = async (req, res)=>{
    try{
        const {id} = req.params;
        const employee = await Employee.findById(id)
        
        // console.log('Annual Salary:', employee.annualSalary);
        
        if(!employee){
            return res.status(404).json({message:'Employee not found'})
        }
        return res.status(200).json({data:employee})
    }catch(error){
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.getAllEmployees = async (req, res)=>{
    try{
        const allEmployees = await Employee.find()
        return res.status(200).json({message:'request successful', data:allEmployees})
    }catch(error){
        res.status(401).json({message:'request failed', error})
    }
}

exports.updateEmployee = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {new:true, runValidators:true})
        if(!updatedEmployee){
            return res.status(404).json({message:'Employee not found'})
        }
        return res.status(200).json({message: ' employee successfully updated', data: updatedEmployee}), next()
    }catch(error){
        return res.status(400).json({ message: 'Failed to update employee profile', error: error.message });
    }
}

exports.deleteEmployee = async(req, res, next)=>{
    try{
        const {id} = req.params
        const deletedEmployee = await Employee.findByIdAndDelete(id)
        if(!deletedEmployee){
            return res.status(404).json({message:'Employee not found'})
        }
        return res.status(200).json({message:'employee profile successfully deleted'})
    }catch(error){
        return res.status(400).json({message: 'failed to delete employee profile'})
    }
}

exports.getEmployeeSalary = async (req, res, next)=>{
    try{
    const employeeSalary = await Employee.find({}, "salary")
    return res.status(200).json({employeeSalary})
    }catch(error){
        return res.status(401).json({message:'request failed'})
    }
}



exports.getTotalAnnualSalary = async (req, res) => {
    try {
      const employees = await Employee.find();
  
      if (!employees.length) {
        return res.json({ message: "No employees found", totalAnnualSalary: 0 });
      }
  
      let totalSalary = employees.reduce((sum, emp) => sum + (emp.annualSalary || 0), 0);
  
      res.json({ totalAnnualSalary: totalSalary });
    } catch (error) {
      console.error("Error fetching employee salaries:", error);
      res.status(500).json({ error: "Failed to retrieve employees" });
    }
  };


  

  
  
