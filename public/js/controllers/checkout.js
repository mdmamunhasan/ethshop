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

        if ($scope.customer.name == "") {
            alert("Name cannot be empty");
            return;
        }

        if ($scope.customer.phone == "") {
            alert("Phone cannot be empty");
            return;
        }

        if ($scope.customer.city == "") {
            alert("City cannot be empty");
            return;
        }

        if ($rootScope.shopping_cart.total_price == 0) {
            alert("Cart cannot be empty");
            return;
        }

        var orderData = {
            name: $scope.customer.name,
            phone: $scope.customer.phone,
            city: $scope.customer.city,
            amount: $rootScope.shopping_cart.total_price,
            skus: [],
            quantities: [],
            prices: []
        };

        $rootScope.shopping_cart.cart_items.forEach(function (item) {
            orderData.skus.push(item.sku);
            orderData.quantities.push(item.quantity);
            orderData.prices.push(item.price);
        });

        App.placeOrder(orderData, function (result) {
            $rootScope.shopping_cart = {
                total_price: 0,
                cart_items: []
            };
            alert("Order Placed");
        });
    };
});