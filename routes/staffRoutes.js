module.exports = app => {
    const staffRoutes = require('../controllers/staffController.js');
    var router = require("express").Router();


    router.put('/:email', staffRoutes.updateStaffDetails);
    router.get('/', staffRoutes.findAll);
    router.delete('/:email', staffRoutes.deleteStaff);
    router.post('/', staffRoutes.createStaff);


    app.use('/api/staff/', router);

};