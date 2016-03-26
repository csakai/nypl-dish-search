var DishCtrl = require('./dish.controller.js'),
    router = require('express').Router();

router.get('/search', function(req, res, next) {
    var dish = new DishCtrl();
    dish.search(req.query)
        .then(function(payload) {
            console.log(payload);
            res.status(200).json(payload);
        }).catch(next);
});

module.exports = router;
