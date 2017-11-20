app.controller('detailsCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.product = {};

    var productId = $location.absUrl().split('/')[5];
    $http.get("/api/product/" + productId).then(function (response) {
        if (response.data.status == 200) {
            $scope.product = response.data.data;
        }
        else {
            console.log(response.data);
        }
    });

    $scope.togglePane = function ($event) {
        $event.preventDefault();

        var element = angular.element($event.target),
            sibling = $(element).parent().find('ul').first(),
            current = $(sibling).hasClass('hide');

        $('.menu_drop > li > ul').addClass('hide');

        if (current) {
            $(sibling).removeClass('hide');
        }
        else {
            $(sibling).addClass('hide');
        }
    };

    $scope.addToCart = function ($event) {
        $event.preventDefault();

        var quantity = $('#quantity').val(),
            price = $scope.product.price * quantity;

        var cart_item = {
            sku: $scope.product.sku,
            title: $scope.product.title,
            image: $scope.product.image,
            quantity: quantity,
            price: price
        }

        $rootScope.shopping_cart.total_price += price;
        $rootScope.shopping_cart.cart_items.push(cart_item);

        alert('Product Added To Cart.');
    }
});