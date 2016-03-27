var _ = require('lodash'),
    Bluebird = require('bluebird'),
    requestBuilder = require('../../util/request_builder');

function DishCtrl() {
    this.request = requestBuilder('dishes');
}
function parseBody(response) {
    return JSON.parse(response.body);
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
                    // console.log('oldest', _.keys(oldest.dishes));
                    // self.body.oldest = oldest.dishes[0];
                    // self.body.newest = newest.dishes[0];
                    console.log(oldest);
                    console.log(newest);
                    console.log(popular);
                    // self.body.mostPopular = popular.dishes[0];
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
