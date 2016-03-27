(function() {
    var app = angular.module('nyplDishSearch');
    var apiUrl = '/api/dishes/:path';
    app.factory('dishesService', ["$resource", dishesService]);
    function dishesService($resource) {
        var resource = $resource(apiUrl);
        this.search = function(dish) {
            return resource.get({
                path: 'search',
                query: dish
            }).$promise;
        }

        return this;
    }
})();
