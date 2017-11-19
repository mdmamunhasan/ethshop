app.controller('checkoutCtrl', function ($scope) {
    $scope.togglePane = function ($event) {
        $event.preventDefault();

        $('.menu_drop > li > ul').addClass('hide');

        var element = angular.element($event.target),
            sibling = $(element).parent().find('ul').first();

        $(sibling).toggleClass('hide');
    };

    $scope.placeOrder = function ($event) {
        $event.preventDefault();
    };
});