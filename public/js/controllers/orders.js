app.controller('ordersCtrl', function ($scope) {
    $scope.orderList = [];

    App.getUserOrderList(null, function (result) {
        if(result.orderId){
            $scope.orderList.push(result);
            console.log($scope.orderList);
        }
    });
});