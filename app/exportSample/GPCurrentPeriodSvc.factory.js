(function () {

    'use strict';

    angular
        .module('di.Sample')
        .factory('ExportSampleDataSvc', ExportSampleDataSvc);

    function ExportSampleDataSvc($http, $log) {

        var service = {
            getData: getData
        };

        return service;

        //

        function getData() {

            $log.info("Getting ExportSampleDataSvc Data.");
            return $http({
                method: "GET",
                type: "reportService",
                url: "app/test/data/ServiceGPCPSample.json"
            }).then(function (result) {
                console.log("ExportSampleDataSvc loaded.");
                return result.data;
            });

        };

    }

})();