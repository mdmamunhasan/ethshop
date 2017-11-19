var app = angular.module("myApp", ["ngRoute"]);
app.run(function ($rootScope, $http, $location) {

    $rootScope.site_title = "LUXURY WATCHES";

    $rootScope.keyword = "";
    $rootScope.products = [];

    $rootScope.searchProducts = function ($event) {
        $event.preventDefault();
        $rootScope.keyword = $("#keyword").val();
        $location.path("/");
    }

}).config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/index.html"
        })
        .when("/details/:id", {
            templateUrl: "templates/details.html"
        })
        .when("/checkout", {
            templateUrl: "templates/checkout.html"
        })
        .when("/contact", {
            templateUrl: "templates/contact.html"
        });
});