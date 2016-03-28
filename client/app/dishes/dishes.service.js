(function() {
    var app = angular.module('nyplDishSearch');
    var apiUrl = './api/dishes/';
    app.factory('dishesService', ["$resource", dishesService]);
    function dishesService($resource) {
        var searchResource = $resource(apiUrl + 'search');
        var byIdResource = $resource(apiUrl + ':id/:path');
        this.search = function(dish) {
            var params = {};
            if (_.isString(dish)) {
                params.query = dish;
            } else {
                params = dish;
            }
            console.log('running search with', dish);
            return searchResource.get(params).$promise;
        };

        this.menus = function(dishId) {
            return byIdResource.get({
                id: dishId,
                path: 'menus'
            }).$promise;
        };
        return this;
    }
})();
