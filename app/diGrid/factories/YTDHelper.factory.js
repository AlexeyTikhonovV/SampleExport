(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('YTDHelper', YTDHelper);

    function YTDHelper() {

        var YTDHelper = {

            getPace: function (value) {
                var yearlyPace = (value / moment().dayOfYear()) * moment([moment().year(), 11, 31]).dayOfYear();
                return yearlyPace;
            }

        };

        return YTDHelper;

    };

    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val === null
    };

    })();