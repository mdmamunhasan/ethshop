app.controller('ordersCtrl', function ($scope, $timeout) {
    $scope.isOwner = false;
    $scope.orderList = [];

    $timeout(function () {
        if (!App.owner) {
            return false;
        }

        if (App.account === App.owner) {

            $scope.isOwner = true;
            console.log("User is owner");

            App.getOrderList(function (result) {
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
        }
        else {
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
        }
    }, 1000);

    $scope.processOrder = function ($index, orderId) {
        App.processOrder(orderId, function (result) {
            var orderList = [];
            for (var i = 0; i < $scope.orderList.length; i++) {
                if (i != $index) {
                    orderList.push($scope.orderList[i]);
                }
            }
            $scope.orderList = orderList;
            $scope.$applyAsync();
        });
    };

});