var _ = require('lodash'),
    RateLimiter = require('request-rate-limiter'),
    limiter = new RateLimiter({
        rate: 10,
        interval: 1,
        backoffCode: 403,
        backoffTime: 1,
        maxWaitingTime: 5
    }),
    url = require('url'),
    urlObj = {
        host: 'api.menus.nypl.org',
        protocol: 'http:',
        query: {
            token: require('config').get('API_KEY')
        }
    };

function makeRequestFunction(path) {
    var requestObj = _.clone(urlObj);
    return function(endpoint, query) {
        requestObj.pathname = [path, endpoint].join('/');
        _.merge(requestObj.query, query);
        return limiter.request({
            url: url.format(requestObj),
            method: 'get'
        });
    };
}

module.exports = makeRequestFunction;
