app.controller('ordersCtrl', function ($scope, $timeout) {

    $scope.userAddress = '';
    $scope.orderList = [];

    $timeout(function () {
        $scope.userAddress = App.account;
        App.getUserOrderList(null, function (result) {
            if (result.orderId) {
                $scope.orderList.push(result);
                $scope.$applyAsync();
            }
        });
    }, 1000);

});