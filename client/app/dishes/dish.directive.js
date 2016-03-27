(function() {
    var app = angular.module('nyplDishSearch');
    app.directive('dish', function() {
        return {
            restrict: 'E',
            scope: {
                dish: '=',
                getMenu: '&'
            },
            templateUrl: './src/dishes/dish.html'
        };
    });
})();
