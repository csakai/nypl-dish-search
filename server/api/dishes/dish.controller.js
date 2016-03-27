var _ = require('lodash'),
    Bluebird = require('bluebird'),
    requestBuilder = require('../../util/request_builder');

function DishCtrl() {
    this.request = requestBuilder('dishes');
}
function parseBody(response) {
    if (response.statusCode === 401) {
        throw new Error("Please add a proper API_KEY to the server config!");
    } else if (response.statusCode === 403) {
        throw new Error("Ratelimit reached. Please try again");
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
                list: body.dishes.map(_dishMapper)
            };
            return Bluebird.join(
                getExtremes.call(self, query, 'date'),
                getExtremes.call(self, query, 'date', true),
                getExtremes.call(self, query, 'popularity'),
                function(oldest, newest, popular) {
                    self.body.oldest = _dishMapper(oldest.dishes[0]);
                    console.log(newest.dishes[0]);
                    self.body.newest = _dishMapper(newest.dishes[0]);
                    self.body.mostPopular = _dishMapper(popular.dishes[0]);
                    console.log("done");
                    return self.body;
                });
        });
};

DishCtrl.prototype.menus = function menusByDishId(id) {
    var self = this;
    var path = id + '/menus';
    return self.request(path)
        .then(parseBody)
        .then(function(body) {
            self.body = {
                menus: body.menus.map(_menuMapper)
            };
            return self.body;
        });
};

function _isRangeValue(val) {
    return _.isNumber(val) || !_.isEmpty(val);
}

function _constructRangeString(obj, key, range) {
    var str = '',
        loKey = range[0] + '_' + key,
        hiKey = range[1] + '_' + key;
    if (_isRangeValue(obj[loKey])) {
        str += obj[loKey];
    }
    if (_isRangeValue(obj[hiKey])) {
        if (!_.isEmpty(str)) {
            str += ' ~ ';
        }
        str += obj[hiKey];
    }
    if (_.isEmpty(str)) {
        str = 'No listed ';
        str += (key === 'price'
            ? key
            : 'year');
    }
    return str;
}

function _dishMapper(dishObj) {
    var cleanedObj = {
        name: dishObj.name,
        id: dishObj.id
    };
    cleanedObj.priceRange = _constructRangeString(dishObj, 'price', ['lowest', 'highest']);
    cleanedObj.dateRange = _constructRangeString(dishObj, 'appeared', ['first', 'last']);
    cleanedObj.timesAppeared = dishObj.times_appeared;

    return cleanedObj;
}

function _menuMapper(menuObj) {
    return {
        name: menuObj.name,
        sponsor: menuObj.sponsor,
        thumbnail: menuObj.thumbnail_src
    };
}

function getExtremes(query, sort_by, last) {
    var query = _.clone(query);
    query.sort_by = sort_by;
    query.per_page = 1;
    query.page = last ? this.body.count : 1;
    return this.request('search', query)
        .then(parseBody);
}

module.exports = DishCtrl;
