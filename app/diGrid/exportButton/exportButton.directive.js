(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .directive('exportButton', exportButton);

    function exportButton($parse, XLSFactory, uiGridExporterService, uiGridExporterConstants) {
        return {
            scope: {
                type: '@',
                grid: '=',
                filename: '@',
                selectedmonth: '=',
                selectedyear: '=',
                negmarg: '@'
            },
            template: 
            `<button id="export-button" ng-click="export()"ng-class="{negMargin15:(negmarg)}" type="button" class="btn btn-default"  style="float:right;">
                <span class="glyphicon glyphicon-export" aria-hidden="true"></span><span class="hide-on-sm">Export ...</span> 
            </button>`
            ,
            link: function ($scope, element, attrs) {

                $scope.export = function () {
                    if ($scope.type == "H0") {
                        XLSFactory.exportH0($scope.grid, $scope.filename, uiGridExporterService, uiGridExporterConstants, $scope.selectedmonth, $scope.selectedyear);
                    } else if ($scope.type == "H1") {
                        XLSFactory.exportH1($scope.grid, $scope.filename, uiGridExporterService, uiGridExporterConstants, $scope.selectedmonth, $scope.selectedyear);
                    } else if ($scope.type == "H2") {
                        XLSFactory.exportH2($scope.grid, $scope.filename, uiGridExporterService, uiGridExporterConstants, $scope.selectedmonth, $scope.selectedyear);
                    }
                }

            },
        };
    };

}());


