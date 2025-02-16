const express = require('express')
const employeeController = require('../controllers/employeeController')

const router = express.Router()

router.route('/employees')
    .post(employeeController.createEmployee)
   

router.route('/employees').get(employeeController.getAllEmployees)    

router.route('/employee/:id')
    .get(employeeController.getEmployee)
    .patch(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)
  

   

    router.get('/employees/total-salary', employeeController.getTotalAnnualSalary);
    router.get('/employees/salary', employeeController.getEmployeeSalary );
    

module.exports = router