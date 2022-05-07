module.exports = app => {
    const studentRoutes = require('../controllers/studentController.js');
    var router = require("express").Router();


    router.put('/:email', studentRoutes.updateStudentDetails);
    router.get('/', studentRoutes.findAll);
    router.delete('/:email', studentRoutes.deleteStudent);
    router.post('/', studentRoutes.createStudent);


    app.use('/api/students/', router);

};