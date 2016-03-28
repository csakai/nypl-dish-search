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
            vm.loadingDishes = true;
            dishesService.search(vm.dish)
                .then(function(data) {
                    console.log('done');
                    vm.count = data.count;
                    vm.mostPopular = data.mostPopular;
                    vm.oldest = data.oldest;
                    vm.newest = data.newest;
                    vm.dishes = data.list;
                    vm.loadingDishes = false;

                });
        };

        vm.getMenu = function getMenuByDishId(id) {
            console.log('called');
            vm.loadingMenus = true;
            dishesService.menus(id)
                .then(function(data) {
                    vm.menus = data.menus;
                    vm.loadingMenus = false;
                });
        }

        vm.reset = function resetPage() {
            if (vm.loadingMenus || vm.loadingDishes) {
                event.preventDefault();
                return false;
            }
            event.preventDefault();
            vm.count = 0;
            vm.dishes = false;
            vm.menus = false;
            vm.mostPopular = false;
            vm.newest = false;
            vm.oldest = false;
            vm.dish = '';
            vm.findDish.$setPristine();
            return false;
        };
    }
})();
