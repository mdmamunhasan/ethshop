app.controller('productsCtrl', function ($scope, $http) {

    $scope.products = [];

    $http.get("http://localhost:3000/api/products").then(function (response) {
        if (response.data.status == 200) {
            $scope.products = response.data.data;
        }
        else {
            console.log(response.data);
        }
    });

});