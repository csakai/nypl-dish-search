(function() {
    var app = angular.module('nyplDishSearch', [
        'ui.bootstrap',
        'ui.router'
    ]);
    app.run(function() {
        console.log("app init");
    });
    // app.config()
})();
