(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('saleTypes', saleTypes);

    function saleTypes() {
        var saleTypes = {
            typeArray: [
                { id: 1, name: "All" },
                { id: 2, name: "RO" },
                { id: 3, name: "Counter Retail" },
                { id: 4, name: "Wholesale" }
            ],

            typeHash: null,

            mapType: function (name) {
                if (saleTypes.typeHash === null) {
                    saleTypes.createtypeHash();
                }

                return saleTypes.typeHash[name];
            },

            createtypeHash: function () {
                saleTypes.typeHash = {};
                saleTypes.typeArray.forEach(function (type) {
                    saleTypes.typeHash[type.name] = type.id;
                });
            },

        };

        return saleTypes;
    };

    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val === null
    }

    })();