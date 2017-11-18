var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "templates/index.html"
        })
        .when("/details", {
            templateUrl : "templates/details.html"
        })
        .when("/checkout", {
            templateUrl : "templates/checkout.html"
        })
        .when("/contact", {
            templateUrl : "templates/contact.html"
        });
});