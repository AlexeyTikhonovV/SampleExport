(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('MTDHelper', MTDHelper);

    function MTDHelper(diDate) {

        var refDate = diDate.getDIRefDate();

        var MTDHelper = {

            getStartOfMonth: function () {
                var dateSm = moment(refDate).startOf('month');
                return dateSm;
            },

            getEndOfMonth: function () {
                var dateEm = moment(refDate).endOf('month');

                return dateEm;
            },

            getEndOfLastMonth: function () {
                var dateLm = moment(refDate).subtract(1, 'months').endOf('month');
                return dateLm;
            },

            setRefDate: function (momentDate) {
                refDate = momentDate;
            },

            isMTDRecord: function (acct_date) {

                if (!isUndefinedOrNull(acct_date)) {

                    var marginDate = this.getStartOfMonth();
                    var endDate = this.getEndOfMonth();
                    var recorddate = moment(acct_date);

                    return ((recorddate >= marginDate) && (recorddate <= endDate));

                } else {
                    return false;
                }

            },

            isMTDRecordAll: function (status, acct_date, contract_date, periodCode) {
                                
                if (status == "F" && !isUndefinedOrNull(acct_date)) {
                    
                    var marginDate = this.getStartOfMonth();
                    var endDate = this.getEndOfMonth();

                    if (periodCode) {
                        if (periodCode == 'cur') {
                            marginDate = moment().startOf('month');
                            endDate = moment().endOf('month');
                        } else if (periodCode == 'prv') {
                            marginDate = moment().subtract(1, 'months').startOf('month');
                            endDate = moment().subtract(1, 'months').endOf('month');
                        }
                    }

                    var recorddate = moment(acct_date);

                    return ((recorddate >= marginDate) && (recorddate <= endDate));
                }
                else if (!isUndefinedOrNull(contract_date)) {
                    var marginDate = this.getEndOfLastMonth();
                    var endDate = this.getEndOfMonth();

                    if (periodCode) {
                        if (periodCode == 'cur') {
                            marginDate = moment().startOf('month');
                            endDate = moment().endOf('month');
                        } else if (periodCode == 'prv') {
                            marginDate = moment().subtract(1, 'months').startOf('month');
                            endDate = moment().subtract(1, 'months').endOf('month');
                        }
                    }

                    var recorddate = moment(contract_date);

                    return ((recorddate >= marginDate) && (recorddate <= endDate));

                }

                return false;
            },

               
            

            getPace: function (value, periodCode) {

                var monthlyPace;


                if (periodCode) {

                    if (periodCode == 'cur') {
                        monthlyPace = (value / moment().date()) * moment().daysInMonth();
                    } else {
                        monthlyPace = value;
                    }

                } else {
                    if (moment().isSameOrAfter(moment(refDate))) {
                        monthlyPace = (value / moment(refDate).date()) * moment(refDate).daysInMonth();

                    } else {
                        monthlyPace = value;
                    }
                }

                


                return monthlyPace;
            },

            isMTDRO: function (closeDate) {

                if (isUndefinedOrNull(closeDate)) {
                    return true;
                } else {
                    var ms_date = this.getStartOfMonth();
                    var me_date = this.getEndOfMonth();
                    var res = moment(closeDate);
                    if ((res >= ms_date) && (res <= me_date)) {
                        return true;
                    } else {
                        return false
                    }
                }

            }

        };

        return MTDHelper;

    };

    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val === null
    }

    })();