var _ = require('lodash'),
    Bluebird = require('bluebird'),
    request = require('request')
    requestPromise = Bluebird.promisify(request);
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
        return requestPromise(url.format(requestObj));
    };
}

module.exports = makeRequestFunction;
