(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('laborTypes', laborTypes);

    function laborTypes() {
        var laborTypes = {
            typeArray: [
                { id: 1, name: "All" },
                { id: 2, name: "Customer" },
                { id: 3, name: "Internal" },
                { id: 4, name: "Warranty" }
            ],

            typeHash: null,

            mapType: function (name) {
                if (laborTypes.typeHash === null) {
                    laborTypes.createtypeHash();
                }

                return laborTypes.typeHash[name];
            },

            createtypeHash: function () {
                laborTypes.typeHash = {};
                laborTypes.typeArray.forEach(function (type) {
                    laborTypes.typeHash[type.name] = type.id;
                });
            },

        };

        return laborTypes;
    };

    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val === null
    }

    })();