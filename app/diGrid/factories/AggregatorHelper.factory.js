(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('AggregatorHelper', AggregatorHelper);


        
    function AggregatorHelper(diDate) {

        var AggregatorHelper = {
            getMonth: function (datefield) {
                if (!isUndefinedOrNull(datefield)) {
                    return (moment(datefield).format('M'));
                } else { return 0 }
            },


            isPurchaseRecord: function (saleTypes) {
                if (!isUndefinedOrNull(saleTypes)) {
                    return saleTypes == 'Retail'
                }
            },

            isRetailRecord: function (saleTypes) {
                if (!isUndefinedOrNull(saleTypes)) {
                    return saleTypes == 'Retail'
                }
            },

            isUndefinedOrNull: function (val) {
                return angular.isUndefined(val) || val === null
            },

            isLeaseRecord: function (saleTypes) {
                if (!isUndefinedOrNull(saleTypes)) {
                    return saleTypes == 'Lease'
                }
            },
            isHouseRecord: function (saleTypes) {
                if (!isUndefinedOrNull(saleTypes)) {
                    return saleTypes == 'House'
                }
            },
            isWholesaleRecord: function (saleTypes) {
                if (!isUndefinedOrNull(saleTypes)) {
                    return saleTypes == 'Wholesale'
                }
            },
            isFleetRecord: function (saleTypes) {
                if (!isUndefinedOrNull(saleTypes)) {
                    return saleTypes == 'Fleet'
                }
            },
            isDealerTradeRecord: function (saleTypes) {
                if (!isUndefinedOrNull(saleTypes)) {
                    return saleTypes == 'Dealer Trade'
                }
            },

            isNoSTRecord: function (saleTypes) {
                if (!isUndefinedOrNull(saleTypes)) {
                    return saleTypes == 'NO ST'
                }
            },
            isRecordOfMonth: function (monthNumber, datefield, year) {
                if (!isUndefinedOrNull(datefield)) {

                    if (year) {
                        return (moment(datefield).format('M') == monthNumber && moment(datefield).format('YYYY') == year);
                    } else {
                        //console.log('null year');
                        return (moment(datefield).format('M') == monthNumber && moment(datefield).format('YYYY') == diDate.getYear());
                    }
                } else {
                    return false;
                }

            },
            isRecordOfQuarter: function (QuarterNumber, datefield) {

                if (!isUndefinedOrNull(datefield)) {

                   
                    var date = new Date(datefield);
                    var day = date.getDate();

                    switch (QuarterNumber) {
                        case 1:
                            return (day < 8);
                            break;
                        case 2:
                            return (day > 7 && day < 15);
                            break;
                        case 3:
                            return (day > 14 && day < 22);
                            break;
                        case 4:
                            return (day > 21);
                        default:
                            return false;
                    }
                }

            },

            GetLineOrderGpSaleType: function (lineName) {

                switch (lineName) {
                    case " - Front Gross (Total Retailed)":
                        return 10;
                        break;
                    case " - Incentives":
                        return 11;
                        break;
                    case " - Purchased":
                        return 13;
                        break;
                    case " - Purchase":
                        return 13;
                        break;
                    case " - Lease":
                        return 12;
                        break;
                    case " - Leased":
                        return 12;
                        break;
                    case " - Commercial":
                        return 24;
                        break;
                    case " - House":
                        return 24;
                        break;
                    case " - Wholesale":
                        return 23;
                        break;
                    case " - Fleet":
                        return 22;
                        break;
                    case " - Dealer Trades":
                        return 21;
                        break;
                    case " - Dealer Trade":
                        return 21;
                        break;
                    default:
                        return 29;
                }
            },
            isRecordOfFIReserve: function (reservefield) {
                if (!isUndefinedOrNull(reservefield)) {
                    return (reservefield != 0);
                } else {
                    return false;
                }

            },
            isRecordOfFIProduct: function (productfield) {
                if (!isUndefinedOrNull(productfield)) {
                    return (productfield != 0);
                } else {
                    return false;
                }

            },
            isRecordPending: function (statusfield) {
                if (!isUndefinedOrNull(statusfield)) {
                    return (statusfield == "P")
                } else {
                    return false;
                }

            },
            isRecordBooked: function (statusfield) {
                if (!isUndefinedOrNull(statusfield)) {
                    return (statusfield == "B")
                } else {
                    return false;
                }

            },
            isRecordFinalized: function (statusfield) {
                if (!isUndefinedOrNull(statusfield)) {
                    return (statusfield == "F")
                } else {
                    return false;
                }

            },
            isRecordIntermediate: function (statusfield) {
                if (!isUndefinedOrNull(statusfield)) {
                    return (statusfield == "I")
                } else {
                    return false;
                }

            },
            isRecordUnwound: function (statusfield) {
                if (!isUndefinedOrNull(statusfield)) {
                    return (statusfield == "U")
                } else {
                    return false;
                }

            },
            isRetailDeal: function (dealtype) {
                if (!isUndefinedOrNull(dealtype)) {
                    return (dealtype == "P")
                } else {
                    return false;
                }

            },
            isPurchaseDeal: function (dealtype) {
                if (!isUndefinedOrNull(dealtype)) {
                    return (dealtype == "P")
                } else {
                    return false;
                }

            },
            isLeaseDeal: function (dealtype) {
                if (!isUndefinedOrNull(dealtype)) {
                    return (dealtype == "L")
                } else {
                    return false;
                }

            },
            isFiReserveRecord: function (a_reserve_gross) {
                if (!isUndefinedOrNull(a_reserve_gross)) {
                    return (a_reserve_gross != 0)
                } else {
                    return false;
                }

            },

            isCashDeal: function (finco, deal_type, term, buy_rate, sell_rate) {
                if (!isUndefinedOrNull(finco)) {
                    return ((finco == "CASH" || finco == "DRAFT") ||
                        (deal_type == "P" && (isUndefinedOrNull(buy_rate) || buy_rate == 0 || isUndefinedOrNull(sell_rate) || sell_rate == 0))
                        )
                }
                else {
                    return false;
                }

            },

            isNewDeal: function (stock_type) {
                if (!isUndefinedOrNull(stock_type)) {
                    return (stock_type == "NEW")
                }
                else {
                    return false;
                }
            },

            isUsedDeal: function (stock_type) {
                if (!isUndefinedOrNull(stock_type)) {
                    return (stock_type == "USED")
                }
                else {
                    return false;
                }
            },

            isNewDealByLineCode: function (Line_Code) {
                if (!isUndefinedOrNull(Line_Code)) {
                    return (Line_Code == "FIPD-NEW")
                }
                else {
                    return false;
                }
            },
            isUsedDealByLineCode: function (Line_Code) {
                if (!isUndefinedOrNull(Line_Code)) {
                    return (Line_Code == "FIPD-USD")
                }
                else {
                    return false;
                }
            },

            isNewDealByDepartment: function (Dept_Flag) {
                if (!isUndefinedOrNull(Dept_Flag)) {
                    return (Dept_Flag == "A")
                }
                else {
                    return false;
                }
            },

            isUsedDealByDepartment: function (Dept_Flag) {
                if (!isUndefinedOrNull(Dept_Flag)) {
                    return (Dept_Flag == "B")
                }
                else {
                    return false;
                }
            },

            isCustomerPayRecord: function (laborSale, laborCost, partsSale, partsCost, miscSale, miscCost) {
                //if ( ( ( laborSale - laborCost ) + ( partsSale - partsCost ) + ( miscSale - miscCost ) ) != 0) {
                if (((laborSale) + (partsSale) + (miscSale)) != 0) {
                    return true;
                } else {
                    return false;
                }
            },

            isWarrantyRecord: function (laborSale, laborCost, partsSale, partsCost, miscSale, miscCost) {
                //if ( ( ( laborSale - laborCost ) + ( partsSale - partsCost ) + ( miscSale - miscCost ) ) != 0) {
                if (((laborSale) + (partsSale) + (miscSale)) != 0) {
                    return true;
                } else {
                    return false;
                }
            },

            isInternalRecord: function (laborSale, laborCost, partsSale, partsCost, miscSale, miscCost) {
                // if (((laborSale - laborCost) + (partsSale - partsCost) + (miscSale - miscCost)) != 0) {
                if (((laborSale) + (partsSale) + (miscSale)) != 0) {
                    return true;
                } else {
                    return false;
                }
            },

            SplitDeal: function (saleman2, value) {

                if (!isUndefinedOrNull(saleman2)) {
                    return value / 2;
                } else {
                    return value;
                }
            },
            isSplitDeal: function (saleman2) {

                if (!isUndefinedOrNull(saleman2)) {
                    return true;
                } else {
                    return false;
                }
            },




        };

        return AggregatorHelper;



    };

    function isUndefinedOrNull(val) {
        return angular.isUndefined(val) || val === null
    }

    })();
