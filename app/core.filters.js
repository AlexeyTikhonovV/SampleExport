(function () {

    'use strict';

    angular
        .module('app')
        .filter('acctFilter', acctFilter)
        .filter('ActualsDataFilter', ActualsDataFilter)
        .filter('BudgetsDataFilter', BudgetsDataFilter)
        .filter('CITExceptions', CITExceptions)
        .filter('ClosedROFilter', ClosedROFilter)
        .filter('dateConv', dateConv)
        .filter('dealStatusFilter', dealStatusFilter)
        .filter('dealTypeFilter', dealTypeFilter)
        .filter('displayFormatFilter', displayFormatFilter)
        .filter('excludeZeroLaborROs', excludeZeroLaborROs)
        .filter('excludeZeroLaborLines', excludeZeroLaborLines)
        .filter('FinalizedDeals', FinalizedDeals)
        .filter('FIMgrTransactions', FIMgrTransactions)
        .filter('FITransactions', FITransactions)
        .filter('greetingFilter', greetingFilter)
        .filter("inventorySummaryStyle", inventorySummaryStyle)
        .filter('monthName', monthName)
        .filter('MTDDataType', MTDDataType)
        .filter("MTDFilter", MTDFilter)
        .filter('MTDServiceFilter', MTDServiceFilter)
        .filter('nameFilterDD', nameFilterDD)
        .filter('name2FilterDD', name2FilterDD)
        .filter('NewSalesTransactions', NewSalesTransactions)
        .filter('NoDealerTrade', NoDealerTrade)
        .filter('NoPendingDeals', NoPendingDeals)
        .filter('NoUnwound', NoUnwound)
        .filter('NoWholesale', NoWholesale)
        .filter('OpenROFilter', OpenROFilter)
        .filter('OpCodeTagFilter', OpCodeTagFilter)
        .filter('percentageFilter', percentageFilter)
        .filter("PrevMTDFilter", PrevMTDFilter)
        .filter('refFilterDD', refFilterDD)
        .filter('removeROTotalLine', removeROTotalLine)
        .filter('removePartsInvoiceTotalLine', removePartsInvoiceTotalLine)
        .filter('RemoveZeroDollar', RemoveZeroDollar)
        .filter('RemoveZeroHour', RemoveZeroHour)
        .filter('RemoveZeroPostedAmount', RemoveZeroPostedAmount)
        .filter('RetailTransaction', RetailTransaction)
        .filter('Sale_Type_ROFilter', Sale_Type_ROFilter)
        .filter('stockTypeFilter', stockTypeFilter)
        .filter('storeFilterDD', storeFilterDD)
        .filter('summaryFilter', summaryFilter)
        .filter('UnitsTransactions', UnitsTransactions)    
        .filter('UsedSalesTransactions', UsedSalesTransactions)
        .filter('YTDDataType', YTDDataType)
        
        ;
        

    //
    function acctFilter() {
        return function (items, acct) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.acct == acct) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    };

    function ActualsDataFilter() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.Data_Type == 'A') {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    };

    function BudgetsDataFilter() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.Data_Type == 'B') {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    };

    function CITExceptions() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {

                if (item.Exception_flag) {
                    filtered.push(item);
                }

            });
            return filtered;
        };
    };

    function ClosedROFilter() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (!isUndefinedOrNull(item.Close_Date)) {
                    // if (item.Ro_status != 'OPEN') //DOES NOT WORK IRREGULAR DATA
                         filtered.push(item);
                }
            });
            return filtered;
        };
    };

    function dateConv($filter) {
        return function (dateData) {

            if (!dateData || !dateData.length) {
                return;
            } else {
                var dateCode = dateData.slice(6, -2);
                return $filter('date')(dateCode, 'yyyy-MM-dd');
            }


        }
    };

    function dealStatusFilter() {
        return function (code) {
            var output = 'N/A';

            if (code == 'B') {
                output = 'Booked';
            } else if (code == 'F') {
                output = 'Finalized'
            } else if (code == 'I') {
                output = 'Intermediate'
            } else if (code == 'P') {
                output = 'Pending'
            } else if (code == 'U') {
                output = 'Unwound'
            } else {
                output = '--'
            }

            return output;
        }
    };

    function dealTypeFilter() {
        return function (code) {
            var output = 'N/A';

            if (code == 'L') {
                output = 'Lease';
            } else if (code == 'P') {
                output = 'Purchase'
            } else {
                output = '--'
            }

            return output;
        }
    };

    function displayFormatFilter($filter) {
        return function (value, displayCode) {

            var output = '';

            if (displayCode == 'B0') { //BALANCE, NO DECIMALS
                output = $filter('number')(value, 0);
            } else if (displayCode == 'B2') { //BALANCE, 2 DECIMALS
                output = $filter('number')(value, 2);
            } else if (displayCode == 'D0') {  //CURRENCY ($), NO DECIMALS
                output = $filter('currency')(value, "$", 0);
            } else if (displayCode == 'D2') {  //CURRENCY ($), 2 DECIMALS
                output = $filter('currency')(value)
            } else if (displayCode == 'P0') {    //PERCENTAGE (%), NO DECIMALS
                output = $filter('number')(value * 100, 0) + '%';
            } else if (displayCode == 'P2') {    //PERCENTAGE (%), NO DECIMALS
                output = $filter('number')(value * 100, 2) + '%';
            }
            else {
                //output = value; 
                output = $filter('currency')(value, "$", 2) //FOR NOW
            }

            /*if (value == null || value === false) {
                output = 'none';
            }*/

            return output;
        }
    };

    function excludeZeroLaborROs($filter) {
        return function (items) {
            var filtered = [];

            angular.forEach(items, function (item) {

                if (!isUndefinedOrNull(item.Labor_Sale_Customerpay)) {
                    if (item.Labor_Sale_Customerpay != 0) {
                        filtered.push(item);
                    }
                }

            });

            return filtered;
        }
    };

    function excludeZeroLaborLines($filter) {
        return function (items) {
            var filtered = [];

            angular.forEach(items, function (item) {

                if ((item.Labor_Sale != 0) || (item.Labor_Cost != 0 || item.Sold_Hours != 0)) {
                        filtered.push(item);
                    }
            });

            return filtered;
        }
    };


    function FinalizedDeals() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (!isUndefinedOrNull(item.deal_status)){
                    if (item.deal_status.toUpperCase() == 'F') {
                        filtered.push(item);
                    }
                }                
            });
            return filtered;
        };
    };

    function FIMgrTransactions($filter) {
        return function (items) {
            var filtered = [];

            angular.forEach(items, function (item) {

                if (!isUndefinedOrNull(item.stock_type)) {

                    if (!isUndefinedOrNull(item.sale_type)) {
                        if (item.sale_type != 'Dealer Trade') {
                            if (item.sale_type != 'Wholesale') {
                                filtered.push(item);
                            }
                        }
                    }
                }

            });

            return filtered;
        }
    };

    function FITransactions($filter) {
        return function (items) {
            var filtered = [];

            angular.forEach(items, function (item) {

                if (!isUndefinedOrNull(item.stock_type)) {
                    if (item.sale_type == 'Retail' || item.sale_type == 'Fleet' || item.sale_type == 'Dealer Trade') {
                        filtered.push(item);
                    }
                }

            });

            return filtered;
        }
    };

    function greetingFilter() {
        return function (time) {
            var timeOfDay = ""
            if (time.hour() < 12) {
                timeOfDay = "morning";
            } else if ((time.hour() > 11) && (time.hour() < 18)) {
                timeOfDay = "afternoon";
            } else {
                timeOfDay = "evening";
            }
            return timeOfDay;
        };
    };

    function inventorySummaryStyle($filter) { 
        return function (input, Line_Code) {

            var output = '';

            var currencyCodes = ["TVALUE", "TPRICE", "AUV", "ASP", "OACAP", "FPCOST"];
            var unitCodes = ["UNITS", "HSUP", "LTMAS", "DS", "OUUNITS"];
            var decimalCodes = ["TURNS"];

            if (unitCodes.indexOf(Line_Code) >= 0) { //BALANCE, NO DECIMALS
                output = $filter('number')(input, 0);
            } else if (decimalCodes.indexOf(Line_Code) >= 0) { //BALANCE, NO DECIMALS
                output = $filter('number')(input, 2);
            } else if (currencyCodes.indexOf(Line_Code) >= 0) {  //CURRENCY ($), NO DECIMALS
                output = $filter('currency')(input, "$", 0);
            }
            else {
                output = input;
            }

            return output;
        };
    };

    function monthName() {
        return function (monthNumber) { //1 = January
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            return monthNames[monthNumber - 1];
        }
    };

    function MTDDataType() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.DataType == 'MTD') {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    };

    function MTDFilter(diDate) {
        return function (items, periodCode) {
                        
            var filtered = [];
            
            angular.forEach(items, function (item) {
                // Get Month
                var ms_month;
                if (periodCode) {
                    if (periodCode == 'cur') {
                        ms_month = moment();
                    } else if (periodCode == 'prv') {
                        ms_month = moment().subtract(1, 'months');
                    } else {
                        ms_month = moment(diDate.getDIRefDate());
                    }
                } else {
                    ms_month = moment(diDate.getDIRefDate());
                }

                // Check accounting date on F deals only. Takes care of deals copied over.
                if (item.deal_status == "F" && !isUndefinedOrNull(item.acct_date)) {
                    var acc_str_date = item.acct_date;
                    var res = moment(acc_str_date);
                    if (res.isSame(ms_month, 'month')) {
                        filtered.push(item);
                        
                    }

                } else if (!isUndefinedOrNull(item.contract_date)) {
                    var acc_str_date = item.contract_date;
                    var res = moment(acc_str_date);
                    if (res.isSame(ms_month, 'month')) {
                        filtered.push(item);
                    }
                }
            });
            return filtered;
        };
    };

    function MTDServiceFilter(diDate) {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                // Get Month
                var ms_month = moment(diDate.getDIRefDate());

                if (!isUndefinedOrNull(item.Close_Date)) {
                    //Check if closed this month 
                    var acc_str_date = item.Close_Date;
                    var res = moment(acc_str_date);

                    if (res.isSameOrAfter(ms_month, 'month')) {
                        filtered.push(item);
                    }
                } else {
                    filtered.push(item); // PUSH OPEN ROs
                }
            });
            return filtered;
        };
    };

    function nameFilterDD($filter) {
        return function (items, name) {
            var filtered = [];

            angular.forEach(items, function (item) {
                if (name == item.name) {
                    filtered.push(item);
                }
            })
            return filtered;
        };
    };

    function name2FilterDD($filter) {
        return function (items, name) {
            var filtered = [];

            angular.forEach(items, function (item) {
                if (name == item.name2) {
                    filtered.push(item);
                }
            })
            return filtered;
        };
    };

    function NewSalesTransactions() {
        return function (items) {
            var filtered = [];

            angular.forEach(items, function (item) {

                if (!isUndefinedOrNull(item.Dept_Flag)) {
                    if (item.Dept_Flag.toUpperCase() == 'A') {
                        filtered.push(item);
                    }
                }
            });

            return filtered;
        }
    };



    function NoDealerTrade() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.sale_type != 'Dealer Trade') {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    };

    function NoPendingDeals() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.deal_status != 'P') {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    };

    function NoUnwound() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                //  deal_status != "U"               
                if (item.deal_status != "U") {
                    filtered.push(item);
                }

            });
            return filtered;
        };
    };

    function NoWholesale() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.sale_type != 'Wholesale') {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    };

    function OpenROFilter() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (!isUndefinedOrNull(item.Ro_status)) {
                    if (item.Ro_status == "OPEN" && item.Close_Date == null)
                        filtered.push(item);
                }
            });
            return filtered;
        };
    };

    function OpCodeTagFilter() {
        return function (transactions, tagsList) {
            var filtered = [];
            angular.forEach(transactions, function (line) {
                angular.forEach(tagsList, function (tag) {
                    if (tag.key.toUpperCase() != line.Op_Code.toUpperCase()) {
                        filtered.push(line);
                    }
                });
            });
            return filtered;
        };
    };

    function percentageFilter($filter) {
        return function (input, decimals) {
            if (input === null) {
                return null;
            }
            else {
                return $filter('number')(input * 100, 1) + '%';
            }

        }
    };

    function PrevMTDFilter(diDate) {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                // Get Month
                var ms_month = moment(diDate.getDIRefDate()).subtract(1, 'months');

                // Check accounting date on F deals only. Takes care of deals copied over.
                if (item.deal_status == "F" && !isUndefinedOrNull(item.acct_date)) {
                    var acc_str_date = item.acct_date;
                    var res = moment(acc_str_date);
                    if (res.isSame(ms_month, 'month')) {
                        filtered.push(item);

                    }

                } else if (!isUndefinedOrNull(item.contract_date)) {
                    var acc_str_date = item.contract_date;
                    var res = moment(acc_str_date);
                    if (res.isSame(ms_month, 'month')) {
                        filtered.push(item);
                    }
                }
            });
            return filtered;
        };
    };

    function refFilterDD($filter) {
        return function (items, refNum) {
            var filtered = [];

            angular.forEach(items, function (item) {
                if (refNum == item.reference_num) {
                    filtered.push(item);
                }
            })

            return filtered;
        };
    };

    function removePartsInvoiceTotalLine($filter) {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.invoicenumber != "Total") {
                    filtered.push(item);
                }
            })

            return filtered;
        }
    };

    function removeROTotalLine($filter) {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.RO != "Total") {
                    filtered.push(item);
                }
            })

            return filtered;
        }
    };

    function RetailTransaction() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {

                if (item.sale_type == 'Retail') {
                    filtered.push(item);
                }

            });
            return filtered;
        };
    };

    function RemoveZeroHour($filter) {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.Sold_Hours) {
                    if (item.Sold_Hours != 0) {
                        filtered.push(item);
                    }
                }                
            })

            return filtered;
        }
    };

    function RemoveZeroDollar($filter) {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.Labor_Sale) {
                    if (item.Labor_Sale != 0) {
                        filtered.push(item);
                    }
                }                
            })

            return filtered;
        }
    };

    function RemoveZeroPostedAmount($filter) {
        return function (items) {
            var filtered = [];

            angular.forEach(items, function (item) {
                if (item.posted_amt) {
                    if (item.posted_amt != 0) {
                        filtered.push(item);
                    }
                }
            });

            return filtered;
        };
    }
    

    function Sale_Type_ROFilter($filter) {
        return function (items, type) {
            var filtered = [];

            angular.forEach(items, function (item) {
                if (type == item.Sale_Type) {
                    filtered.push(item);
                }
            })

            return filtered;
        };
    };

    function stockTypeFilter($filter) {
        return function (code) {
            var output = 'N/A';

            if (code == 'A') {
                output = 'NEW';
            } else if (code == 'B') {
                output = 'USED'
            } else {
                output = '--'
            }

            return output;
        }
    };

    function storeFilterDD($filter) {
        return function (items, storeID) {
            var filtered = [];

            angular.forEach(items, function (item) {
                if (storeID == item.store_id) {
                    filtered.push(item);

                }
            })

            return filtered;
        };
    };

    function summaryFilter() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                //console.log(item);
                if (item.Summary_Line == "S") {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    };

    function UnitsTransactions() {
        return function (items) {
            var filtered = [];

            angular.forEach(items, function (item) {


                if (!isUndefinedOrNull(item.sale_type)) {
                    if (item.sale_type == 'Retail') {
                        if ((item.deal_status == "U") || (item.deal_status == 'F') || (item.deal_status == 'I')) {
                            filtered.push(item);
                        }
                    }                    
                }
            });

            return filtered;
        }
    };

    function UsedSalesTransactions() {
        return function (items) {
            var filtered = [];

            angular.forEach(items, function (item) {

                if (!isUndefinedOrNull(item.Dept_Flag)) {
                    if (item.Dept_Flag.toUpperCase() == 'B') {
                        filtered.push(item);
                    }
                }

            });

            return filtered;
        }
    };

    function YTDDataType() {
        return function (items) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.DataType == 'YTD') {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    };


    // HELPERS
    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val === null
    }
})(); 