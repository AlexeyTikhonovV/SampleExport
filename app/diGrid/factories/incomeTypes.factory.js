(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('incomeTypes', incomeTypes);

    function incomeTypes() {
        var incomeTypes = {
            typeArray: [
                { id: 1, name: "F&I Total" },
                { id: 2, name: "F&I Reserve" },
                { id: 3, name: "F&I Product" }
            ],

            typeHash: null,

            mapType: function (name) {
                if (incomeTypes.typeHash === null) {
                    incomeTypes.createtypeHash();
                }

                return incomeTypes.typeHash[name];
            },

            createtypeHash: function () {
                incomeTypes.typeHash = {};
                incomeTypes.typeArray.forEach(function (type) {
                    incomeTypes.typeHash[type.name] = type.id;
                });
            },

        };

        return incomeTypes;
    };

    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val === null
    }

})();