app.controller('ordersCtrl', function ($scope, $timeout) {
    $scope.orderList = [];

    $timeout(function () {
        App.getUserOrderList(null, function (result) {
            if (result.orderId) {
                result['productList'] = [];
                for (var i = 0; i < result.skus.length; i++) {
                    var productItem = {
                        sku: result.skus[i],
                        quantity: result.quantities[i],
                        price: result.prices[i]
                    };
                    result.productList.push(productItem);
                }
                $scope.orderList.push(result);
                $scope.$applyAsync();
            }
        });
    }, 1000);

});