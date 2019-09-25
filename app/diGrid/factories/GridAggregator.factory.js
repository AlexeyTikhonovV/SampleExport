(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('GridAggregator', GridAggregator);


    function GridAggregator() {
        var GridAggregator = {

            COUNT_deal_status: function (rowData, status) {
                //console.log(rowData);
                var count = 0;
                angular.forEach(rowData, function (row) {
                    //console.log(row.entity.deal_status);
                    //console.log(status);
                    if (row.entity.deal_status == status) {
                        count++;
                    }
                })
                return count;
            },

            COUNT_sale_type: function (rowData, type) {
                //console.log(rowData);
                var count = 0;
                angular.forEach(rowData, function (row) {
                    //console.log(row.entity.deal_status);
                    //console.log(status);
                    if (row.entity.sale_type == type) {
                        count++;
                    }
                })
                return count;
            },

            COUNT_stocktype: function (rowData, type, bucket) {
                var count = 0;

                if (bucket) {
                    switch (bucket) {
                        case 0:
                            angular.forEach(rowData, function (row) {
                                if (type == 'OTHER') {
                                    if ((row.entity.stocktype != 'NEW') && (row.entity.stocktype != 'USED')) {
                                        count++;
                                    }
                                } else {
                                    if (row.entity.stocktype == type) {
                                        count++;
                                    }
                                }
                            });
                            break;
                        case 1:
                            angular.forEach(rowData, function (row) {
                                var itemDate = new Date(row.entity.inventrydate);
                                var today = new Date();
                                var timeDiff = Math.abs(today.getTime() - itemDate.getTime());
                                var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

                                if (diffDays < 31) {
                                    if (type == 'OTHER') {
                                        if ((row.entity.stocktype != 'NEW') && (row.entity.stocktype != 'USED')) {
                                            count++;
                                        }
                                    } else {
                                        if (row.entity.stocktype == type) {
                                            count++;
                                        }
                                    }
                                }
                            });
                            break;
                        case 2:
                            angular.forEach(rowData, function (row) {

                                var itemDate = new Date(row.entity.inventrydate);
                                var today = new Date();
                                var timeDiff = Math.abs(today.getTime() - itemDate.getTime());
                                var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

                                if ((diffDays > 30) && (diffDays < 61)) {
                                    if (type == 'OTHER') {
                                        if ((row.entity.stocktype != 'NEW') && (row.entity.stocktype != 'USED')) {
                                            count++;
                                        }
                                    } else {
                                        if (row.entity.stocktype == type) {
                                            count++;
                                        }
                                    }
                                }
                            });
                            break;
                        case 3:
                            angular.forEach(rowData, function (row) {

                                var itemDate = new Date(row.entity.inventrydate);
                                var today = new Date();
                                var timeDiff = Math.abs(today.getTime() - itemDate.getTime());
                                var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

                                if ((diffDays > 60) && (diffDays < 91)) {
                                    if (type == 'OTHER') {
                                        if ((row.entity.stocktype != 'NEW') && (row.entity.stocktype != 'USED')) {
                                            count++;
                                        }
                                    } else {
                                        if (row.entity.stocktype == type) {
                                            count++;
                                        }
                                    }
                                }
                            });
                            break;
                        case 4:
                            angular.forEach(rowData, function (row) {

                                var itemDate = new Date(row.entity.inventrydate);
                                var today = new Date();
                                var timeDiff = Math.abs(today.getTime() - itemDate.getTime());
                                var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

                                if (diffDays > 90) {
                                    if (type == 'OTHER') {
                                        if ((row.entity.stocktype != 'NEW') && (row.entity.stocktype != 'USED')) {
                                            count++;
                                        }
                                    } else {
                                        if (row.entity.stocktype == type) {
                                            count++;
                                        }
                                    }
                                }
                            });
                            break;

                    }
                    return count;
                } else {
                    angular.forEach(rowData, function (row) {
                        if (type == 'OTHER') {
                            if ((row.entity.stocktype != 'NEW') && (row.entity.stocktype != 'USED')) {
                                count++;
                            }
                        } else {
                            if (row.entity.stocktype == type) {
                                count++;
                            }
                        }

                    });
                    return count;
                }

            },

            TOTAL_a_back_gross: function (rowData) {
                //console.log(rowData);
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.a_back_gross + total;
                })

                return total;
            },

            TOTAL_a_cogs: function (rowData) {
                //console.log(rowData);
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.a_cogs + total;
                });

                return total;
            },

            TOTAL_a_dealer_fee: function (rowData) {
                //console.log(rowData);
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.a_dealer_fee + total;
                });

                return total;
            },

            TOTAL_a_front_gross: function (rowData) {
                //console.log(rowData);
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.a_front_gross + total;
                })

                return total;
            },

            TOTAL_a_gross_total: function (rowData) {
                //console.log(rowData);
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.a_total_gross + total;
                })

                return total;
            },

            TOTAL_a_holdback_fee: function (rowData) {
                //console.log(rowData);
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.a_holdback_fee + total;
                });

                return total;
            },

            TOTAL_a_product_gross: function (rowData) {
                //console.log(rowData);
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.a_product_gross + total;
                })

                return total;
            },

            TOTAL_a_reserve_gross: function (rowData) {
                //console.log(rowData);
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.a_reserve_gross + total;
                })

                return total;
            },

            TOTAL_a_sales: function (rowData) {
                //console.log(rowData);
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.a_sales + total;
                })

                return total;
            },

            TOTAL_a_total_gross: function (rowData) {
                //console.log(rowData);
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.a_total_gross + total;
                });

                return total;
            },

            TOTAL_a_tradingmargin: function (rowData) {
                //console.log(rowData);
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.a_tradingmargin + total;
                });

                return total;
            },

            TOTAL_activity: function (rowData) {
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.activity + total;
                });

                return total;
            },

            TOTAL_balance: function (rowData) {
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.balance + total;
                });

                return total;
            },

            TOTAL_Balance: function (rowData) {
                var total = 0;

                angular.forEach(rowData, function (row) {
                    //console.log(row);
                    total = row.entity.Balance + total;
                });

                return total;
            },

            TOTAL_Cost: function (rowData) {
                var total = 0;

                angular.forEach(rowData, function (row) {
                    total = row.entity.Cost + total;
                });

                return total;
            },

            TOTAL_Total_Cost: function (gridRowData) {
                var total = 0;

                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Total_Cost + total;
                });
                return total;
            },

            TOTAL_Total_Sale: function (gridRowData) {
                var total = 0;

                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Total_Sale + total;
                });
                return total;
            },

            TOTAL_glbalance: function (gridRowData, bucket) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    if (bucket) {
                        switch (bucket) {
                            case 0:
                                total = row.entity.glbalance + total;
                                break;
                            case 1:
                                if (row.entity.instocktime < 31) {
                                    total = row.entity.glbalance + total;
                                }
                                break;
                            case 2:
                                if ((row.entity.instocktime > 30) && (row.entity.instocktime < 61)) {
                                    total = row.entity.glbalance + total;
                                }
                                break;
                            case 3:
                                if ((row.entity.instocktime > 60) && (row.entity.instocktime < 91)) {
                                    total = row.entity.glbalance + total;
                                }
                                break;
                            case 4:
                                if (row.entity.instocktime > 90) {
                                    total = row.entity.glbalance + total;
                                }
                                break;
                        }
                    } else {
                        total = row.entity.glbalance + total;
                    }
                })
                return total;
            },

            TOTAL_Gross: function (gridRowData, flag) {

                var total = 0;

                angular.forEach(gridRowData, function (row) {

                    if (flag) {

                        if (row.entity.FrontBackFlag == flag) {
                            total = total + row.entity.Gross;
                        }

                    } else {
                        total = total + row.entity.Gross;
                    }

                });

                return total;

            },

            TOTAL_Gross_Profit: function (gridRowData) {
                var total = 0;

                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Gross_Profit + total;
                })

                return total;
            },

            TOTAL_invprice: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.invprice + total;
                })
                return total;
            },

            TOTAL_Labor_Cost: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Labor_Cost + total;
                })
                return total;
            },

            TOTAL_Labor_Sale: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Labor_Sale + total;
                })
                return total;
            },

            TOTAL_List_Price: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.List_Price + total;
                });
                return total;
            },

            TOTAL_Misc_Cost: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Misc_Cost + total;
                })
                return total;
            },

            TOTAL_Misc_Sale: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Misc_Sale + total;
                })
                return total;
            },

            TOTAL_msrp: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.msrp + total;
                });
                return total;
            },

            TOTAL_Pack: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Pack + total;
                });
                return total;
            },

            TOTAL_Parts_Cost: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Parts_Cost + total;
                })
                return total;
            },

            TOTAL_Parts_Sale: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Parts_Sale + total;
                })
                return total;
            },

            TOTAL_posted_amt: function (gridRowData, Amount_Type) {
                var total = 0;

                angular.forEach(gridRowData, function (row) {

                    if (Amount_Type) {

                        if (Amount_Type == row.entity.Amount_Type) {
                            total = row.entity.posted_amt + total;
                        }

                    } else {
                        total = row.entity.posted_amt + total;
                    }

                })


                return total;
            },

            TOTAL_Quantity_Sold: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Quantity_Sold + total;
                })
                return total;
            },

            TOTAL_retailprice: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.retailprice + total;
                })
                return total;
            },

            TOTAL_Sold_Hours: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Sold_Hours + total;
                })
                return total;
            },

            TOTAL_Super_Gross: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.Super_Gross + total;
                });
                return total;
            },

            TOTAL_value_count: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.value.count + total;
                })
                return total;
            },

            TOTAL_value_grossProfit: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.value.grossProfit + total;
                })
                return total;
            },

            TOTAL_value_hoursSold: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.value.hoursSold + total;
                })
                return total;
            },

            TOTAL_value_laborSale: function (gridRowData) {
                var total = 0;
                angular.forEach(gridRowData, function (row) {
                    total = row.entity.value.laborSale + total;
                })
                return total;
            },

        };

        return GridAggregator;
    };

})();