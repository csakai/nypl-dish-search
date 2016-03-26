var Promise = require('bluebird');

function DishCtrl() {
    this.API_KEY = 'abc123';
    // this.API_KEY = config.API_KEY;
}

DishCtrl.prototype.search = function dishSearch(query) {
    console.log('query', query);
    return new Promise(function(resolve, reject) {
        resolve("ok");
    });
};

module.exports = DishCtrl;
