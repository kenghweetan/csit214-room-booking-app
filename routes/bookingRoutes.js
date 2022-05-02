module.exports = app => {
    const dbController = require('../controllers/bookingController.js');
    var router = require("express").Router();


    router.put('/:bookingId', dbController.updateBookingDetails);
    router.get('/', dbController.findAll);
    router.delete('/:name', dbController.deleteBookings);
    router.post('/', dbController.createBookings);


    app.use('/api/bookings/', router);

};