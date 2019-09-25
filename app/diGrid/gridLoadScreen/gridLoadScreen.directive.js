//gridLoadScreen

(function () {
    'use restrict';

    angular
        .module('app.diGrid')
        .directive('gridLoadScreen', gridLoadScreen);

    function gridLoadScreen($parse) {
        return {
            restrict: 'E',
            template: '<div class="grid-msg-overlay" ng-hide="!loading"><div class="msg"><span>Loading Data...<i class="fa fa-spinner fa-spin"></i></span></div></div>'
        };
    };

}());


