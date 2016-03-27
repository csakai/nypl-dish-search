(function() {
    var app = angular.module('nyplDishSearch', [
        'ngResource',
        'ui.bootstrap'
    ]);
    app.run(function() {
        console.log("app init");
    });

})();
