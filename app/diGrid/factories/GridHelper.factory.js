(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('GridHelper', GridHelper);

    function GridHelper() {
        var GridHelper = {

            getDaysOpen: function (rowEntity) {
                var days = "N/A"
                //console.log(rowEntity);
                if (rowEntity) {
                    if (rowEntity.contract_date) {
                        var contractDate = moment(rowEntity.contract_date);
                        if (rowEntity.deal_status == 'F') {
                            var finalizedDate = moment(rowEntity.finalized_date);
                            days = finalizedDate.diff(contractDate, 'days');
                        } else {
                            var currentDate = moment();
                            days = currentDate.diff(contractDate, 'days');
                        };
                    };
                };

                return days;
            }

        };

        return GridHelper;
    };


    })();


