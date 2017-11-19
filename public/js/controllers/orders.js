app.controller('ordersCtrl', function ($scope, $timeout) {
    $scope.orderList = [];

    $timeout(function () {
        App.getUserOrderList(null, function (result) {
            if (result.orderId) {
                $scope.orderList.push(result);
                console.log($scope.orderList);
            }
        });
    }, 1000);

});