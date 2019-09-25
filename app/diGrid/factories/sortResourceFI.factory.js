(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('sortResourceFI', sortResourceFI);

    function sortResourceFI(incomeTypes) {

        var sortResource = {

            sort: function (a, b, rowA, rowB, dir, field, data) {
                if (!isUndefinedOrNull(rowA)) {

                    var groupIdColumn = 'fimgr';

                    var dirAdjustment = 1;
                    if (dir == 'desc') { dirAdjustment = -1 }
                    // console.log(rowA.entity[field]);                

                    if (rowA.entity[groupIdColumn] === rowB.entity[groupIdColumn]) {
                        if (incomeTypes.mapType(rowA.entity.data_type_desc) > incomeTypes.mapType(rowB.entity.data_type_desc)) { return 1 * dirAdjustment; }
                        if (incomeTypes.mapType(rowA.entity.data_type_desc) < incomeTypes.mapType(rowB.entity.data_type_desc)) { return -1 * dirAdjustment }
                        return 0;
                    }
                    else {
                        var maxA = findMaxValueByFIMAnagerNumber(rowA.entity[groupIdColumn], groupIdColumn, field, data);
                        var maxB = findMaxValueByFIMAnagerNumber(rowB.entity[groupIdColumn], groupIdColumn, field, data);

                        if (parseFloat(maxA) > parseFloat(maxB)) { return 1; }
                        if (parseFloat(maxA) < parseFloat(maxB)) { return -1; }
                        return 0;
                    }
                }
            }
        }

        return sortResource;
    };

    function findMaxValueByFIMAnagerNumber(Employee, groupIdColumn, field, data) {
        var maxValue = 0;
        angular.forEach(data, function (row) {
            if (row[groupIdColumn] == Employee && row['data_type_desc'] == 'F&I Total') {
                maxValue = parseFloat(row[field]);
            }
        });
        return maxValue;
    };

    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val === null
    }

    })();