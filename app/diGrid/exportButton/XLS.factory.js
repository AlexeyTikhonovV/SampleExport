(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('XLSFactory', XLSFactory);

   function XLSFactory($filter) {

        var XLSFactory = {
            // EXPORT grid with Category and Subcategory Headers
            exportH2: function (grid, filename, uiGridExporterService, uiGridExporterConstants, selectedMonth, selectedYear) {
                console.log(grid);
                var rows;
                if (grid.grouping) {
                    if (angular.equals(grid.grouping.groupingHeaderCache, {})) {
                        rows = uiGridExporterService.getData(grid, uiGridExporterConstants.VISIBLE, uiGridExporterConstants.ALL, true);
                    } else if (isUndefinedOrNull(grid.grouping.groupingHeaderCache)) {
                        rows = uiGridExporterService.getData(grid, uiGridExporterConstants.ALL, uiGridExporterConstants.ALL, true);
                    } else {
                        rows = uiGridExporterService.getData(grid, uiGridExporterConstants.ALL, uiGridExporterConstants.ALL, true);
                    }
                } else {
                    rows = uiGridExporterService.getData(grid, uiGridExporterConstants.VISIBLE, uiGridExporterConstants.ALL, true);

                }
              
                console.log('rows----->', rows);
                let sheet = [];

                const ex = ExcelBuilder.Builder;
                
                var artistWorkbook = ex.createWorkbook();
                var albumList = artistWorkbook.createWorksheet({name: 'Album List'});


                var stylesheet = artistWorkbook.getStyleSheet();

                var aFormatDefn = {
                    "size": 9,
                    "alignment": { "wrapText": true },
                    "fill": { "type": "pattern", "patternType": "solid", "fgColor": "F2F2F2F2" },
                };

                var formatterId = stylesheet.createFormat(aFormatDefn);

                var FormatDefn = {
                    "size": 9,
                    "alignment": { "wrapText": true },
                    "fill": { "type": "pattern", "patternType": "solid", "fgColor": "DADADADA" },
                };

                var formatter = stylesheet.createFormat(FormatDefn);

                const cols1 = [{value: ''}, {value: ''}, {value:''}];
                const cols2 = [{value: ''}, {value: ''}, {value:''}];
                const cols3 = [{value: ''}, {value: ''}, {value:''}];
                const cols4 = [{value: ''}, {value: 'Sale Transactions - New Sales'}];
                const cols5 = [{value: ''}, {value: ''}, {value:''}];
                    
                sheet.push(cols1);
                sheet.push(cols2);
                sheet.push(cols3);
                sheet.push(cols4);
                sheet.push(cols5);

                const subcategory = [
                    {value: "#", metadata: {style: formatterId.id}},
                    {value: "Counter Retail", metadata: {style: formatter.id}},
                    {value: "Customer Pay", metadata: {style: formatterId.id}},
                    {value: " ", metadata: {style: formatter.id}},
                    {value: "Internal Pay", metadata: {style: formatterId.id}},
                    {value: "Lease Deals", metadata: {style: formatter.id}},
                    {value: "Other", metadata: {style: formatterId.id}},
                    {value: "Purchase Deals", metadata: {style: formatter.id}},
                    {value: " ", metadata: {style: formatterId.id}},
                    {value: "Sublet", metadata: {style: formatter.id}},
                    {value: "Total", metadata: {style: formatterId.id}},
                    {value: "Warranty Pay", metadata: {style: formatter.id}},
                    {value: "Wholesale", metadata: {style: formatterId.id}},
                    {value: "Year to Date", metadata: {style: formatter.id}},
    
                ];

                let data = [...sheet, subcategory, ...rows]

                albumList.setData(data);

                console.log(data);
                artistWorkbook.addWorksheet(albumList);

                ex.createFile(artistWorkbook, {
                    type: "blob"
                }).then(function(data) {
                    saveAs(new Blob([data], {
                        type: "base64"
                    }), "Demo.xlsx");
                });
            },
        };

        // HELPER FUNCTIONS:
        function normalize(value) {
             //console.log(value.toString());
            var newValue;

            if (value.toString()[0] == '$') {
                newValue = value.toString().replace('$', '');
                return newValue.toString().replace(/,/g, '');
            } else if (value.toString()[0] == '(') {
                newValue = '-' + value.toString().slice(2, value.toString().length - 1);
                return newValue.toString().replace(/,/g, '');
            } else if (value.toString()[value.toString().length - 1] == '%') {
                newValue = value.slice(0, value.toString().length - 2);
                return newValue.toString().replace(/,/g, '');
            } else if (value.toString() == 'NaN') {
                return 0;
            } else if (isUndefinedOrNull(value)){
                return ' ';
            } else {
                return value.toString().replace(/,/g, '');
            }
        }

        function isUndefinedOrNull(val) {
            return angular.isUndefined(val) || val === null
        }

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        };

        function sheet_from_array_of_arrays(data, opts) {
            var ws = {};
            // 	var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
            var range = { e: { c: 10000000, r: 10000000 }, s: { c: 0, r: 0 } };
            for (var R = 0; R != data.length; ++R) {
                for (var C = 0; C != data[R].length; ++C) {
                    if (range.s.r > R) range.s.r = R;
                    if (range.s.c > C) range.s.c = C;
                    if (range.e.r < R) range.e.r = R;
                    if (range.e.c < C) range.e.c = C;
                    var cell = { v: data[R][C] };
                    if (cell.v == null) continue;
                    var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

                    if (typeof cell.v === 'number') cell.t = 'n';
                    else if (typeof cell.v === 'boolean') cell.t = 'b';
                    else if (cell.v instanceof Date) {
                        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                        cell.v = datenum(cell.v);
                    }
                    else cell.t = 's';

                    ws[cell_ref] = cell;
                }
            }
            if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
            return ws;
        };

        function resolveCategory(codeName, selectedMonth, selectedYear) {

            var category = {
                // amo: "Amount",
                // amount: "Amount",
                // averagePricing: "Average Pricing",
                // blank: " ",
                // blank1: " ",
                // blank2: " ",
                // blank3: " ",
                // booked: "Booked",
                // combined: "Parts & Labor Combined",
                // cost: "Cost of Parts",
                // count: "Count",
                // cus: "Customer",
                // customer: "Customer",
                // currentMonth: $filter('monthName')(selectedMonth) + ' ' + selectedYear,
                // customerPay: "Customer Pay",
                 // deal: "Deal",
                // expenses: "Expenses",
                // fi: "F&I",
                // finalized: "Finalized",
                // financial: "Financial",
                // finres: "Financial Reserve",
                // first: "1st Quarter of Month",
                // fleet: "Fleet",
                // fouth: "4th Quarter of the Month",
                // gp: "Gross Profit & Financial",
                // grossprofit: "Gross Profit",
                // grossProfitByLabor: "Gross Profit By Labor Type",
                // grossProfitByTicket: "Gross Profit By Ticket",
                // grossProfitRatio: "Gross Profit Ratio",
                // hours: "Hours",
                // income: "F&I Income",
                // info: " ",
                // internal: "Internal",
                // inv: "Invoice",
                // inventory: "Inventory",
                // inventoryMetrics: "Inventory Metrics",
                // invoice: "Invoice",
                // labor: "Labor",
                // lease: "Lease",
                // leased: "Leased",
                // lessThan30: "Less Than 30 Days",
                // metrics: "Metrics",
                // moreThan90: "More Than 90 Days",
                // monthly: "Monthly",
                // mtd: "Month to Date",
                // new: "New",
                // newCar: "New Car",
                // opcode: "Opcode",
                // part: "Part",
                // parts: "Parts",
                // payytpe: "Payment",
                // pending: "Pending",
                // physicalPU: "Physical Part Units",
                // pOwned: "Certified Pre-Owned",
                // previousMonth: $filter('monthName')(moment().month(selectedMonth - 1).subtract(1, 'months').endOf('month').month() + 1) + ' ' + moment().subtract(1, 'months').endOf('month').year(),
                // product: "Product",
                // products: "F&I Reserve and Products Sold",
                // profitPerCPO: "Profit Per CPO Unit",
                // profitPerRetail: "Profit Per Retail Unit",
                // profitPerUnitLeased: "Profit Per Unit Leased",
                // profitPerUnitRetailed: "Profit Per Unit Retailed",
                // profitPerWholesale: "Profit Per Wholesale Unit",
                // purchase: "Purchase",
                // purchased: "Purchased",
                // quantity: "Quantity",
                // range1: "Less than 30 Days",
                // range2: "31 to 60 Days",
                // range3: "61 to 90 Days",
                // range4: "More than 90 Days",
                // retail: "Retail",
                // ro: "Repair Orders",
                // rocount: "RO Count",
                // rodetails: "Repair Order Details",
                // rotickets: "RO & Tickets",
                // sales: "Sales",
                // salesp: "Sales Personnel",
                // salesperson: "Salesperson",
                // salesPersonnel: "Sales Personnel",
                // second: "2nd Quarter of the Month",
                // service: "Service",
                // status: "Deal Status",
                // sto: "Store",
                // store: "Store",
                // third: "3rd Quarter of the Month",
                // ticketMetrics: "Ticket Metrics",
                // total: "Total",
                // totalInventory: "Total Inventory",
                // trade: "Trade-In",
                // tradeIn: "Trade-In",
                // type: "Deal Type",
                // unitssold: "Units Sold",
                // uniquePN: "Unique Part Numbers",
                // used: "Used",
                // usedCar: "Used Car",
                // vehicle: "Vehicle",
                // warranty: "Warranty",
                // warrantyPay: "Warranty Pay",
                // wholesale: "Wholesale",
                // yearToDate: 'January ' + selectedYear + ' - ' + $filter('monthName')(selectedMonth) + ' ' + selectedYear,
                // ytd: "Year to Date",
                // "31to60": "31 to 60 Days",
                // "61to90": "61 to 90 Days"
            };

            return category[codeName];
        };

        function resolveSubcategory(codeName) {

            // var subcategory = {
            //     blank: " ",
            //     counterretail: "Counter Retail",
            //     customerpay: "Customer Pay",
            //     info: " ",
            //     internalpay: "Internal Pay",
            //     lease: "Lease Deals",
            //     other: "Other",
            //     purchase: "Purchase Deals",
            //     subinfo: " ",
            //     sublet: "Sublet",
            //     total: "Total",
            //     warrantypay: "Warranty Pay",
            //     wholesale: "Wholesale",
            //     ytd: "Year to Date",

            // };

            return subcategory[codeName];
        };

        return XLSFactory;

    };

})(); 