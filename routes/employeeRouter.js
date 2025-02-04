const express = require('express')
const employeeController = require('../controllers/employeeController')

const router = express.Router()

router.route('/employee')
    .post(employeeController.createEmployee)

router.route('/employees').get(employeeController.getAllEmployees)    

router.route('/employee/:id')
    .get(employeeController.getEmployee)
    .patch(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)
    // .get(employeeController.getEmployeeSalary)

    router.get('/employee/total-salary', employeeController.getTotalAnnualSalary);
    router.get('/employee/salary', employeeController.getEmployeeSalary );
    

module.exports = router