(function() {
    var app = angular.module('nyplDishSearch');
    app.directive('dish', function() {
        return {
            restrict: 'E',
            scope: {
                dish: '='
            },
            templateUrl: './src/dishes/dish.html'
        };
    });
})();
