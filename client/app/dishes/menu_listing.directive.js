(function() {
    var app = angular.module('nyplDishSearch');
    app.directive('menuListing', function() {
        return {
            restrict: 'E',
            scope: {
                menus: '='
            },
            templateUrl: './src/dishes/menu_listing.html'
        };
    });
})();
