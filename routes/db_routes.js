module.exports = app => {
    const dbController = require('../controllers/db_controller.js');
    var router = require("express").Router();


    router.put('/:bookingId', dbController.updateBookingDetails);
    router.get('/', dbController.findAll);
    router.delete('/:name', dbController.deleteBookings);

    app.use('/api/bookings/', router);

};