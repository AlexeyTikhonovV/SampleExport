(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('sortResourceService', sortResourceService);

    function sortResourceService(laborTypes) {

        var sortResource = {

            sort: function (a, b, rowA, rowB, dir, field, data) {
                if (!isUndefinedOrNull(rowA)) {

                    var groupIdColumn = 'Service_Advisor';
                    if (isUndefinedOrNull(rowA.entity[groupIdColumn])) {
                        groupIdColumn = 'Tech';
                    }

                    var dirAdjustment = 1;
                    if (dir == 'desc') { dirAdjustment = -1 }
                    // console.log(rowA.entity[field]);                

                    if (rowA.entity[groupIdColumn] === rowB.entity[groupIdColumn]) {
                        if (laborTypes.mapType(rowA.entity.Line_Type_Desc) > laborTypes.mapType(rowB.entity.Line_Type_Desc)) { return 1 * dirAdjustment; }
                        if (laborTypes.mapType(rowA.entity.Line_Type_Desc) < laborTypes.mapType(rowB.entity.Line_Type_Desc)) { return -1 * dirAdjustment }
                        return 0;
                    }
                    else {
                        var maxA = findMaxValueByServiceAdvisorNumber(rowA.entity[groupIdColumn], groupIdColumn, field, data);
                        var maxB = findMaxValueByServiceAdvisorNumber(rowB.entity[groupIdColumn], groupIdColumn, field, data);

                        if (parseFloat(maxA) > parseFloat(maxB)) { return 1; }
                        if (parseFloat(maxA) < parseFloat(maxB)) { return -1; }
                        return 0;
                    }
                }
            }
        }

        return sortResource;
    };

    function findMaxValueByServiceAdvisorNumber(Employee, groupIdColumn, field, data) {
        var maxValue = 0;
        angular.forEach(data, function (row) {
            if (row[groupIdColumn] == Employee && row['Line_Type_Desc'] == 'All') {
                maxValue = parseFloat(row[field]);
            }
        });
        return maxValue;
    };

    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val === null
    }

    })();