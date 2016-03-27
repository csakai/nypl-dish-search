(function() {
    var app = angular.module('nyplDishSearch');
    app.controller('searchCtrl', ['dishesService', searchCtrl]);

    function searchCtrl(dishesService) {
        var vm = this;
        vm.submit = function submit() {
            if (!vm.findDish.$valid) {
                console.log('not valid');
                return;
            }
            dishesService.search(vm.dish)
                .then(function(data) {
                    console.log('done');
                    console.log(data);
                });
        }
    }
})();
