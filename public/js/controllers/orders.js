app.controller('ordersCtrl', function ($scope) {
    $scope.orders = [];

    App.getUserOrderList(null, function (result) {
        if(result.orderId){
            $scope.orders.push(result);
            console.log($scope.orders);
        }
    });
});