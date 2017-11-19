app.controller('productsCtrl', function ($scope, $rootScope, $http) {

    $http.get("http://localhost:3000/api/products?q="+$rootScope.keyword).then(function (response) {
        if (response.data.status == 200) {
            $rootScope.products = response.data.data;
        }
        else {
            console.log(response.data);
        }
    });

});