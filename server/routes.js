var router = require('express').Router()

router.use('/dishes', require('./api/dishes'))

module.exports = router;
