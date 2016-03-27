var _ = require('lodash'),
    DishCtrl = require('./dish.controller.js'),
    router = require('express').Router();

router.get('/search', function(req, res, next) {
    var dish = new DishCtrl();
    var query = _.clone(req.query);
    query.sort_by = 'name';
    query.per_page = 10;
    dish.search(query)
        .then(function(payload) {
            res.status(200).json(payload);
        }).catch(next);
});

module.exports = router;
