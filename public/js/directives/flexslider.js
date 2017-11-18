app.directive('flexslider', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            $timeout(function(){
                element.flexslider({
                    animation: "slide",
                    controlNav: "thumbnails"
                });
            })
        }
    }
});