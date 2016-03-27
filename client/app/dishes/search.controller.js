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
                    vm.count = data.count;
                    vm.mostPopular = data.mostPopular;
                    vm.oldest = data.oldest;
                    vm.newest = data.newest;
                    vm.dishes = data.list;
                });
        };

        vm.getMenu = function getMenuByDishId(id) {
            console.log('called');
            dishesService.menus(id)
                .then(function(data) {
                    console.log('menus fetched');
                    vm.menus = data;
                    console.log(vm.menus);
                });
        }
    }
})();
