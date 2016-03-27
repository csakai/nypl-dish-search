var _ = require('lodash'),
    Bluebird = require('bluebird'),
    requestBuilder = require('../../util/request_builder');

function DishCtrl() {
    this.request = requestBuilder('dishes');
}
function parseBody(response) {
    var now = new Date();
    console.log(response.statusCode,
        now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds());
    if (response.statusCode === 401) {
        throw new Error("Please add a proper API_KEY to the server config!");
    } else {
        return JSON.parse(response.body);
    }
}

DishCtrl.prototype.search = function dishSearch(query) {
    var self = this;
    return self.request('search', query)
        .then(parseBody)
        .then(function(body) {
            self.body = {
                count: body.stats.count,
                list: body.dishes
            };
            return Bluebird.join(
                getExtremes.call(self, query, 'date'),
                getExtremes.call(self, query, 'date', true),
                getExtremes.call(self, query, 'popularity'),
                function(oldest, newest, popular) {
                    self.body.oldest = oldest.dishes[0];
                    self.body.newest = newest.dishes[0];
                    self.body.mostPopular = popular.dishes[0];
                    return self.body;
                });
        });
};

function getExtremes(query, sort_by, last) {
    var query = _.clone(query);
    query.sort_by = sort_by;
    query.per_page = 1;
    query.page = last ? this.body.count : 1;
    return this.request('search', query)
        .then(parseBody);
}

module.exports = DishCtrl;
