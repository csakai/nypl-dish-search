var _ = require('lodash'),
    Bluebird = require('bluebird'),
    request = require('request'),
    requestPromise = Bluebird.promisify(request),
    url = require('url'),
    urlObj = {
        host: 'api.menus.nypl.org',
        protocol: 'http:',
        query: {
            token: require('config').get('API_KEY')
        }
    };

function handleLimiter() {
    var limit = parseInt(process.env.request_limit);
    process.env.request_limit = --limit;
    setTimeout(function() {
        var limit1 = parseInt(process.env.request_limit);
        process.env.request_limit = ++limit1;
    }, 1009);
}

function _checkLimit(reqString) {
    return new Bluebird(function (resolve) {
        process.nextTick(function() {
            var limit = parseInt(process.env.request_limit);
            if (limit) {
                handleLimiter();
                resolve(reqString);
            } else {
                setTimeout(function() {
                    _checkLimit(reqString)
                        .then(resolve);
                }, 1013);
            }
        });
    });
}

function _prepRequest(path, endpoint, query) {
    var req = _.clone(urlObj);
    req.pathname = [path, endpoint].join('/');
    _.merge(req.query, query);
    return Bluebird.resolve(url.format(req));
}

function constructRequestFunction(path) {
    return function doRequestFlow(endpoint, query) {
        return _prepRequest(path, endpoint, query)
            .then(_checkLimit)
            .then(requestPromise);
    };
}

module.exports = constructRequestFunction;
