(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('sortResource', sortResource);

    function sortResource(saleTypes) {

        var sortResource = {

            sort: function (a, b, rowA, rowB, dir, field, data) {
                if (!isUndefinedOrNull(rowA)) {

                    var dirAdjustment = 1;
                    if (dir == 'desc') { dirAdjustment = -1 }
                    // console.log(rowA.entity[field]);               

                    if (rowA.entity['Employee_ID'] === rowB.entity['Employee_ID']) {
                        if (saleTypes.mapType(rowA.entity.Line_Type_Desc) > saleTypes.mapType(rowB.entity.Line_Type_Desc)) { return 1 * dirAdjustment; }
                        if (saleTypes.mapType(rowA.entity.Line_Type_Desc) < saleTypes.mapType(rowB.entity.Line_Type_Desc)) { return -1 * dirAdjustment }
                        return 0;
                    }
                    else {
                        var maxA = findMaxValueBySalesPersonNumber(rowA.entity['Employee_ID'], field, data);
                        var maxB = findMaxValueBySalesPersonNumber(rowB.entity['Employee_ID'], field, data);
                        if (parseFloat(maxA) > parseFloat(maxB)) { return 1; }
                        if (parseFloat(maxA) < parseFloat(maxB)) { return -1; }
                        return 0;
                    }
                }
            }
        }

        return sortResource;
    };

    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val === null
    }

    function findMaxValueBySalesPersonNumber(Employee, field, data) {
        var maxValue = 0;
        angular.forEach(data, function (row) {
            if (row['Employee_ID'] == Employee && row['Line_Type_Desc'] == 'All') {
                maxValue = parseFloat(row[field]);
            }
        });
        return maxValue;
    };

    })();