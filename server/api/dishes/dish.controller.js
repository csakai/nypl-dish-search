var config = require('config'),
    Bluebird = require('bluebird'),
    requestBuilder = require('../../util/request_builder');

function DishCtrl() {
    this.API_KEY = config.get('API_KEY');
    this.request = requestBuilder('dishes');
}

DishCtrl.prototype.search = function dishSearch(query) {
    return this.request('search', query);
};

module.exports = DishCtrl;
