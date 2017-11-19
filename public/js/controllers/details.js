app.controller('detailsCtrl', function ($scope) {
    $scope.togglePane = function ($event) {
        $event.preventDefault();

        var element = angular.element($event.target),
            sibling = $(element).parent().find('ul').first(),
            current = $(sibling).hasClass('hide');

        $('.menu_drop > li > ul').addClass('hide');

        if (current) {
            $(sibling).removeClass('hide');
        }
        else {
            $(sibling).addClass('hide');
        }
    };

    $scope.addToCart = function ($event) {
        $event.preventDefault();

        alert('Product Added To Cart.');
    }
});