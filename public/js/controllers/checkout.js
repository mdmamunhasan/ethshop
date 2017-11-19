app.controller('checkoutCtrl', function ($scope, $rootScope) {
    $scope.togglePane = function ($event) {
        $event.preventDefault();

        $('.menu_drop > li > ul').addClass('hide');

        var element = angular.element($event.target),
            sibling = $(element).parent().find('ul').first();

        $(sibling).toggleClass('hide');
    };

    $scope.placeOrder = function ($event) {
        $event.preventDefault();

        if ($scope.order.name == "") {
            alert("Name cannot be empty");
            return;
        }

        if ($scope.order.phone == "") {
            alert("Phone cannot be empty");
            return;
        }

        if ($scope.order.city == "") {
            alert("City cannot be empty");
            return;
        }

        if ($rootScope.shopping_cart.total_price == 0) {
            alert("Cart cannot be empty");
            return;
        }


    };
});