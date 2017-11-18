var app = angular.module("myApp", ["ngRoute"]);
app.run(function ($rootScope) {
    $rootScope.site_title = "LUXURY WATCHES";
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