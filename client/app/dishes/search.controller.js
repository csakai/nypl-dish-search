(function() {
    var app = angular.module('nyplDishSearch');
    app.controller('searchCtrl', ['dishesService', searchCtrl]);

    function searchCtrl(dishesService) {
        var vm = this;
        vm.page = 1;

        function _errorHandler(err) {
            vm.loadingDishes = false;
            vm.loadingMenus = false;
            vm.error = true;
            vm.errMsg = err.data.split("<")[0];
        }

        vm.dismissError = function dismissError() {
            vm.error = false;
        };

        vm.toggleFeatured = function toggleFeatured() {
            vm.hideFeatured = !vm.hideFeatured;
        };

        function _setPaginationAllowed() {
            vm.prevAllowed = !(vm.page <= 1);
            vm.nextAllowed = !(vm.page >= (vm.count/10)-1);
        }
        vm.submit = function submit() {
            if (!vm.findDish.$valid) {
                console.log('not valid');
                return;
            }
            vm.error = false;
            vm.loadingDishes = true;
            vm.searchStr = vm.dish;
            dishesService.search(vm.searchStr)
                .then(function(data) {
                    console.log('done');
                    vm.count = data.count;
                    _setPaginationAllowed();
                    vm.mostPopular = data.mostPopular;
                    vm.oldest = data.oldest;
                    vm.newest = data.newest;
                    vm.dishes = data.list;
                    vm.loadingDishes = false;

            }).catch(_errorHandler);
        };

        vm.getPage = function getPage(next) {
            var params = {
                query: vm.searchStr
            };
            params.page = next
             ? ++vm.page
             : --vm.page;
            vm.loadingDishes = true;
            dishesService.search(params)
                .then(function(data) {
                    _setPaginationAllowed();
                    vm.dishes = data.list;
                    vm.loadingDishes = false;
            }).catch(_errorHandler);
        };

        vm.getMenu = function getMenuByDishId(id) {
            console.log('called');
            vm.loadingMenus = true;
            dishesService.menus(id)
                .then(function(data) {
                    vm.menus = data.menus;
                    vm.loadingMenus = false;
            }).catch(_errorHandler);
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
