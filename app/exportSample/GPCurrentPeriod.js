/* SERVICE - GROSS PROFIT CURRENT PERIOD */

(function () {

    'use strict';

    angular
        .module('di.Sample', [])
        .controller('ExportSampleCtrl', ExportSampleCtrl);

    function ExportSampleCtrl(ExportSampleDataSvc,
        $scope,
        gridHeaderTemplates,
        uiGridConstants) {

        // DATE VARIABLES
        $scope.selectedYear = '2019';
        $scope.selectedMonth = 9;
        // DATA VARIABLES
        $scope.department = 'Service';

        // GRID OPTIONS
          //INIT GRID OPTIONS 1 - Nonsummary
          $scope.gridOptions1 = {

            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            excessRows: 160,
            excessColumns: 15,
            columnVirtualizationThreshold: 15,
            showGridFooter: true,
            enableFiltering: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi1 = gridApi;
            },
            enablePaginationControls: false,
            treeRowHeaderAlwaysVisible: true,
            headerTemplate: `<div role="rowgroup"
                                        class="ui-grid-header">
                                    <div class="ui-grid-top-panel">
                                        <div class="ui-grid-header-viewport">
                                            <div class="ui-grid-header-canvas">
                                                <div class="ui-grid-header-cell-wrapper"
                                                        ng-style="colContainer.headerCellWrapperStyle()">
                                                    <div role="row"
                                                            class="ui-grid-header-cell-row">
                                                        <div class="ui-grid-header-cell ui-grid-clearfix ui-grid-category categoryblock" ng-repeat="cat in grid.options.category"
                                                                ng-if="cat.visible && (colContainer.renderedColumns | filter:{ colDef:{category: cat.name} }).length > 0" ng-class="{categorySpacer: cat.displayName=='BLANK'}">
                                
                                
                                                            <div ng-if="cat.showCatName === true" ng-style="grid.appScope.getCategoryWidth(colContainer.renderedColumns, cat.name, 'category')" style="border-bottom:solid; border-width: 1px; border-color: #d4d4d4; border-right: 1px solid rgb(212, 212, 212); text-align: left; padding-left:20px">
                                                                <span class="ui-grid-categoryheader" ng-class="{transparentColor:cat.displayName == '-'}">
                                                                    {{cat.displayName}}
                                                                </span>
                                                            </div>
                                
                                                            <div ng-if="cat.showCatName === false" ng-style="grid.appScope.getCategoryWidth(colContainer.renderedColumns, cat.name, 'category')" style="border-bottom:solid; border-width: 1px; border-color: #d4d4d4; border-right: 1px solid rgb(212, 212, 212);">
                                                                <span class="ui-grid-categoryheader transparentColor">
                                                                    -
                                                                </span>
                                                            </div>
                                
                                
                                                            <p class="noMargin" ng-if="cat.showCatName !== true">
                                                            </p>
                                
                                                            <div class="ui-grid-header-cell ui-grid-clearfix ui-grid-category" ng-repeat="subcat in grid.options.subcategory"
                                                                    ng-if="subcat.visible && (colContainer.renderedColumns | filter:{ colDef:{category: cat.name, subcategory: subcat.name} }).length > 0">
                                                                <div ng-style="grid.appScope.getCategoryWidth(colContainer.renderedColumns, subcat.name, 'subcategory')" style="border-bottom:solid; border-width: 1px; border-color: #d4d4d4; border-right: 1px solid rgb(212, 212, 212); padding:5px 0">
                                                                    <span ng-if="subcat.showCatName === true" class="ui-grid-subcategoryheader" ng-class="subcat.cellClass">
                                                                        {{subcat.displayName}}
                                                                    </span>
                                                                    <span ng-if="subcat.showCatName === false" class="ui-grid-subcategoryheader transparentColor" ng-class="subcat.cellClass">
                                                                        -
                                                                    </span>
                                                                </div>
                                                                <p class="noMargin" ng-if="subcat.showCatName !== true">
                                                                </p>
                                                                <div class="ui-grid-header-cell ui-grid-clearfix categoryheadercell"
                                                                        ng-repeat="col in colContainer.renderedColumns | filter:{ colDef:{category: cat.name, subcategory: subcat.name} }"
                                                                        ui-grid-header-cell
                                                                        col="col"
                                                                        render-index="$index">
                                                                </div>
                                                            </div>
                                                            <div class="ui-grid-header-cell ui-grid-clearfix categoryheadercell" ng-if="col.colDef.subcategory === undefined"
                                                                    ng-repeat="col in colContainer.renderedColumns | filter:{ colDef:{category: cat.name}}"
                                                                    ui-grid-header-cell
                                                                    col="col"
                                                                    render-index="$index">
                                                            </div>
                                                        </div><!--!cat.visible && -->
                                                        <div class="ui-grid-header-cell ui-grid-clearfix categoryheadercell" ng-if="col.colDef.category === undefined"
                                                                ng-repeat="col in colContainer.renderedColumns track by col.uid"
                                                                ui-grid-header-cell
                                                                col="col"
                                                                render-index="$index">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`,
            category: [
                {
                    name: 'info',
                    displayName: 'info',
                    visible: true,
                    showCatName: false
                },
                {
                    name: 'spa',
                    displayName: 'spa',
                    visible: true,
                    showCatName: false
                },
                {
                    name: 'currentMonth',
                    displayName: moment().month($scope.selectedMonth - 1).year($scope.selectedYear).format('MMMM YYYY'),
                    visible: true,
                    showCatName: true
                },
                {
                    name: 'spb',
                    displayName: 'spb',
                    visible: true,
                    showCatName: false
                },
                {
                    name: 'yearToDate',
                    displayName: 'January ' + $scope.selectedYear + ' - ' + moment().month($scope.selectedMonth - 1).year($scope.selectedYear).format('MMM YYYY'),
                    visible: true,
                    showCatName: true
                },
            ],
            subcategory: [

                {
                    name: 'subinfo',
                    displayName: 'subinfo',
                    visible: true,
                    showCatName: false
                },
                {
                    name: 'spa',
                    displayName: 'spa',
                    visible: true,
                    showCatName: false
                },
                {
                    name: 'total',
                    displayName: 'Total',
                    visible: true,
                    showCatName: true
                },
                {
                    name: 'spb',
                    displayName: 'spb',
                    visible: true,
                    showCatName: false
                },
                {
                    name: 'customerpay',
                    displayName: 'Customer Pay',
                    visible: true,
                    showCatName: true
                },
                {
                    name: 'spc',
                    displayName: 'spc',
                    visible: true,
                    showCatName: false
                },
                {
                    name: 'warrantypay',
                    displayName: 'Warranty Pay',
                    visible: true,
                    showCatName: true
                },
                {
                    name: 'spd',
                    displayName: 'spd',
                    visible: true,
                    showCatName: false
                },
                {
                    name: 'internalpay',
                    displayName: 'Internal Pay',
                    visible: true,
                    showCatName: true
                },
                {
                    name: 'spe',
                    displayName: 'spe',
                    visible: true,
                    showCatName: false
                },
                {
                    name: 'sublet',
                    displayName: 'Sublet',
                    visible: true,
                    showCatName: true
                },
                {
                    name: 'spf',
                    displayName: 'spf',
                    visible: true,
                    showCatName: false
                },
                {
                    name: 'other',
                    displayName: 'Other',
                    visible: true,
                    showCatName: true
                },
                {
                    name: 'spg',
                    displayName: 'spg',
                    visible: true,
                    showCatName: false
                },
                {
                    name: 'ytd',
                    displayName: 'Year to Date',
                    visible: true,
                    showCatName: true
                },


            ],
            columnDefs: [
                // INFO
                // -- SUBINFO
                {
                    name: 'No',
                    width: 35,
                    field: 'Line_No',
                    displayName: '#',
                    printName: '#',
                    category: 'info',
                    subcategory: 'subinfo',
                    headerCellTemplate: '<div class="headerCell"># <br/> <span style="color:transparent">_</span> </div>',
                    allowCellFocus: false,
                    enableFiltering: false,
                    type: 'number',
                    cellTemplate: `<div ng-class="{ rowHighlight: (row.entity.LineStyleCode == null)? false: row.entity.LineStyleCode == 'H'}" class="ui-grid-cell-contents cellLineNumber">
                                        {{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}
                                    </div>`,
                    pinnedLeft: true,
                },

                //TITLE
                {
                    field: 'Line_Text',
                    category: 'info',
                    subcategory: 'subinfo',
                    printName: 'Description',
                    displayName: '',
                    headerCellTemplate: gridHeaderTemplates.empty.dual,
                    allowCellFocus: false,
                    enableFiltering: false,
                    enableColumnResizing: true,
                    minWidth: 300,
                    //maxWidth: 600,
                    pinnedLeft: true,
                    cellTemplate: `<div ng-class="{boldTitle: (row.entity.LineStyleCode == 'B' || row.entity.LineStyleCode == 'R'|| row.entity.Line_Type == 'T'),
                                                    rowHighlight:  row.entity.LineStyleCode =='H',
                                                    redText:(row.entity.LineStyleCode =='R')}"
                                            class="level{{row.entity.Level_No}}">
                                
                                        {{COL_FIELD}}
                                    </div>`,
                },

                // SPACER
                {
                    field: 'spx',
                    category: 'spa',
                    subcategory: 'spa',
                    enableFiltering: false,
                    displayName: '',
                    headerCellTemplate: gridHeaderTemplates.spacer.dual,
                    minWidth: 7,
                    maxWidth: 7,
                },


                // CURRENT MONTH 
                // -- TOTAL
                //-- -- MONTH - TOTAL ($)
                {
                    field: 'MTD_T',
                    category: 'currentMonth',
                    subcategory: 'total',
                    printName: 'Total',
                    displayName: ['Total'],
                    allowCellFocus: false,
                    headerCellTemplate: gridHeaderTemplates.dualLineTop.total,
                    width: 120,
                    type: 'number',
                    cellTemplate: `<div ng-class="{boldTitle: (row.entity.LineStyleCode == 'B' || row.entity.LineStyleCode == 'R'), 
                                                        rowHighlight:  row.entity.LineStyleCode =='H', 
                                                        redText:(row.entity.LineStyleCode =='R')}" 
                                    class="cellValue-main">

                                    <div style="padding-top:0px"
                                    ng-if="row.entity.Line_Text == 'Units'"
                                    class="cellValue-centered cellUnit cellTotal">

                                    {{COL_FIELD}}

                                    </div>
                                    <div style="padding-top:0px"
                                    ng-if="!(row.entity.Line_Text == 'Units')"
                                    class="cellValue-main"
                                    ng-class="{cellCurrency:(row.entity.Display_Format == 'D0'|| 'D2'),
                                            cellTotal:(row.entity.Display_Format == 'D0'|| 'D2'),
                                            'cellPercentage-total':(row.entity.Display_Format == 'P0'|| row.entity.Display_Format == 'P2')}">

                                    {{COL_FIELD|displayFormatFilter: row.entity.Display_Format}}

                                    </div>

                                    </div>`,
                },
                //MONTH - CHANGE (LAST MONTH) (%)
                {
                    field: 'MTD_PM_T_Change',
                    category: 'currentMonth',
                    subcategory: 'total',
                    printName: 'Change (Last Month)',
                    displayName: ['Change', '(Last Month)'],
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLine.total_percentage,
                    width: 100,
                    type: 'number',
                    cellTemplate: `<div ng-class="{boldTitle:row.entity.LineStyleCode == 'B', rowHighlight: (row.entity.LineStyleCode == null)? false: row.entity.LineStyleCode == 'H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage-total">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },
                //MONTH - CHANGE (LAST YEAR) (%)
                {
                    field: 'MTD_PY_T_Change',
                    category: 'currentMonth',
                    subcategory: 'total',
                    printName: 'Change (Last Year)',
                    displayName: ['Change', '(Last Year)'],
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLine.total_percentage,
                    width: 100,
                    type: 'number',
                    cellTemplate: `<div ng-class="{boldTitle:row.entity.LineStyleCode == 'B', rowHighlight: (row.entity.LineStyleCode == null)? false: row.entity.LineStyleCode == 'H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage-total">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },

                // SPACER
                {
                    field: 'spx',
                    category: 'currentMonth',
                    subcategory: 'spb',
                    enableFiltering: false,
                    displayName: '',
                    headerCellTemplate: gridHeaderTemplates.spacer.dual,
                    minWidth: 7,
                    maxWidth: 7,
                },

                // -- CUSTOMER PAY

                // -- -- MONTH - CUSTOMER PAY($)
                {
                    field: 'MTD_C',
                    category: 'currentMonth',
                    subcategory: 'customerpay',
                    printName: 'Customer Pay',
                    displayName: ['Customer Pay'],
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLineTop.subtotal,
                    width: 120,
                    type: 'number',
                    cellTemplate: `<div ng-class="{boldTitle: (row.entity.LineStyleCode == 'B' || row.entity.LineStyleCode == 'R'), 
                                                    rowHighlight:  row.entity.LineStyleCode =='H', 
                                                    redText:(row.entity.LineStyleCode =='R')}" 
                                        class="cellValue-main">
                                    
                                        <div style="padding-top:0px"
                                            ng-if="row.entity.Line_Text == 'Units'"
                                            class="cellValue-centered cellUnit cellSubtotal">
                                    
                                            {{COL_FIELD}}
                                    
                                        </div>
                                        <div style="padding-top:0px"
                                            ng-if="!(row.entity.Line_Text == 'Units')"
                                            class="cellValue-main"
                                            ng-class="{cellCurrency:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                        cellSubtotal:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                        'cellPercentage-subtotal':(row.entity.Display_Format == 'P0'|| row.entity.Display_Format == 'P2')}">
                                    
                                            {{COL_FIELD|displayFormatFilter: row.entity.Display_Format}}
                                    
                                        </div>
                                    
                                    </div>`,
                },
                // -- -- CHANGE (LAST MONTH) (%)
                {
                    field: 'MTD_PM_C_Change',
                    category: 'currentMonth',
                    subcategory: 'customerpay',
                    printName: 'Change (Last Month)',
                    displayName: ['Change', '(Last Month)'],
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLine.percentage,
                    width: 100,
                    type: 'number',
                    cellTemplate: `<div ng-class="{'boldTitle': (row.entity.LineStyleCode == 'B' || row.entity.Line_Type == 'T'), rowHighlight:  row.entity.LineStyleCode =='H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },

                // -- -- CHANGE (LAST YEAR) (%)
                {
                    field: 'MTD_PY_C_Change',
                    category: 'currentMonth',
                    subcategory: 'customerpay',
                    printName: 'Change (Last Year)',
                    displayName: ['Change', '(Last Year)'],
                    enableFiltering: false,
                    width: 100,
                    headerCellTemplate: gridHeaderTemplates.dualLine.percentage,
                    type: 'number',
                    cellTemplate: `<div ng-class="{'boldTitle': (row.entity.LineStyleCode == 'B' || row.entity.Line_Type == 'T'), rowHighlight:  row.entity.LineStyleCode =='H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },

                // SPACER
                {
                    field: 'spx',
                    category: 'currentMonth',
                    subcategory: 'spc',
                    enableFiltering: false,
                    displayName: '',
                    headerCellTemplate: gridHeaderTemplates.spacer.dual,
                    minWidth: 7,
                    maxWidth: 7,
                },

                // -- WARRANTY PAY 
                // -- -- WARRANTY PAY ($)
                {
                    field: 'MTD_W',
                    category: 'currentMonth',
                    subcategory: 'warrantypay',
                    printName: 'Warranty Pay',
                    displayName: ['Warranty Pay'],
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLineTop.subtotal,
                    width: 120,
                    type: 'number',
                    cellTemplate: `<div ng-class="{boldTitle: (row.entity.LineStyleCode == 'B' || row.entity.LineStyleCode == 'R'), 
                                                    rowHighlight:  row.entity.LineStyleCode =='H', 
                                                    redText:(row.entity.LineStyleCode =='R')}" 
                                        class="cellValue-main">
                                    
                                        <div style="padding-top:0px"
                                            ng-if="row.entity.Line_Text == 'Units'"
                                            class="cellValue-centered cellUnit cellSubtotal">
                                    
                                            {{COL_FIELD}}
                                    
                                        </div>
                                        <div style="padding-top:0px"
                                            ng-if="!(row.entity.Line_Text == 'Units')"
                                            class="cellValue-main"
                                            ng-class="{cellCurrency:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                        cellSubtotal:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                        'cellPercentage-subtotal':(row.entity.Display_Format == 'P0'|| row.entity.Display_Format == 'P2')}">
                                    
                                            {{COL_FIELD|displayFormatFilter: row.entity.Display_Format}}
                                    
                                        </div>
                                    
                                    </div>`
                },
                // -- -- CHANGE (LAST MONTH) (%)
                {
                    field: 'MTD_PM_W_Change',
                    category: 'currentMonth',
                    subcategory: 'warrantypay',
                    printName: 'Change (Last Month)',
                    displayName: ['Change', '(Last Month)'],
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLine.percentage,
                    width: 100,
                    type: 'number',
                    cellTemplate: `<div ng-class="{'boldTitle': (row.entity.LineStyleCode == 'B' || row.entity.Line_Type == 'T'), rowHighlight:  row.entity.LineStyleCode =='H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },

                // -- -- CHANGE (LAST YEAR) (%)
                {
                    field: 'MTD_PY_W_Change',
                    category: 'currentMonth',
                    subcategory: 'warrantypay',
                    displayName: ['Change', '(Last Year)'],
                    printName: 'Change (Last Year)',
                    enableFiltering: false,
                    width: 100,
                    headerCellTemplate: gridHeaderTemplates.dualLine.percentage,
                    type: 'number',
                    cellTemplate: `<div ng-class="{'boldTitle': (row.entity.LineStyleCode == 'B' || row.entity.Line_Type == 'T'), rowHighlight:  row.entity.LineStyleCode =='H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },

                // SPACER
                {
                    field: 'spx',
                    category: 'currentMonth',
                    subcategory: 'spd',
                    enableFiltering: false,
                    displayName: '',
                    headerCellTemplate: gridHeaderTemplates.spacer.dual,
                    minWidth: 7,
                    maxWidth: 7,
                },

                // -- -- INTERNAL PAY ($)
                {
                    field: 'MTD_I',
                    category: 'currentMonth',
                    subcategory: 'internalpay',
                    printName: 'Internal Pay',
                    displayName: ['Internal Pay'],
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLineTop.subtotal,
                    width: 120,
                    type: 'number',
                    cellTemplate: `<div ng-class="{boldTitle: (row.entity.LineStyleCode == 'B' || row.entity.LineStyleCode == 'R'), 
                                                    rowHighlight:  row.entity.LineStyleCode =='H', 
                                                    redText:(row.entity.LineStyleCode =='R')}" 
                                        class="cellValue-main">
                                    
                                        <div style="padding-top:0px"
                                            ng-if="row.entity.Line_Text == 'Units'"
                                            class="cellValue-centered cellUnit cellSubtotal">
                                    
                                            {{COL_FIELD}}
                                    
                                        </div>
                                        <div style="padding-top:0px"
                                            ng-if="!(row.entity.Line_Text == 'Units')"
                                            class="cellValue-main"
                                            ng-class="{cellCurrency:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                        cellSubtotal:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                        'cellPercentage-subtotal':(row.entity.Display_Format == 'P0'|| row.entity.Display_Format == 'P2')}">
                                    
                                            {{COL_FIELD|displayFormatFilter: row.entity.Display_Format}}
                                    
                                        </div>
                                    
                                    </div>`
                },
                // -- -- CHANGE (LAST MONTH) (%)
                {
                    field: 'MTD_PM_I_Change',
                    category: 'currentMonth',
                    subcategory: 'internalpay',
                    displayName: ['Change', '(Last Month)'],
                    printName: 'Change (Last Month)',
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLine.percentage,
                    width: 100,
                    type: 'number',
                    cellTemplate: `<div ng-class="{'boldTitle': (row.entity.LineStyleCode == 'B' || row.entity.Line_Type == 'T'), rowHighlight:  row.entity.LineStyleCode =='H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },

                // -- -- CHANGE (LAST YEAR) (%)
                {
                    field: 'MTD_PY_I_Change',
                    category: 'currentMonth',
                    subcategory: 'internalpay',
                    printName: 'Change (Last Year)',
                    displayName: ['Change', '(Last Year)'],
                    enableFiltering: false,
                    width: 100,
                    headerCellTemplate: gridHeaderTemplates.dualLine.percentage,
                    type: 'number',
                    cellTemplate: `<div ng-class="{'boldTitle': (row.entity.LineStyleCode == 'B' || row.entity.Line_Type == 'T'), rowHighlight:  row.entity.LineStyleCode =='H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },

                // SPACER
                {
                    field: 'spx',
                    category: 'currentMonth',
                    subcategory: 'spe',
                    enableFiltering: false,
                    displayName: '',
                    headerCellTemplate: gridHeaderTemplates.spacer.dual,
                    minWidth: 7,
                    maxWidth: 7,
                },

                // -- SUBLET 

                // -- -- SUBLET ($)
                {
                    field: 'MTD_S',
                    category: 'currentMonth',
                    subcategory: 'sublet',
                    displayName: ['Sublet'],
                    printName: 'Sublet',
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLineTop.subtotal,
                    width: 120,
                    type: 'number',
                    cellTemplate: `<div ng-class="{boldTitle: (row.entity.LineStyleCode == 'B' || row.entity.LineStyleCode == 'R'), 
                                                    rowHighlight:  row.entity.LineStyleCode =='H', 
                                                    redText:(row.entity.LineStyleCode =='R')}" 
                                        class="cellValue-main">
                                    
                                        <div style="padding-top:0px"
                                            ng-if="row.entity.Line_Text == 'Units'"
                                            class="cellValue-centered cellUnit cellSubtotal">
                                    
                                            {{COL_FIELD}}
                                    
                                        </div>
                                        <div style="padding-top:0px"
                                            ng-if="!(row.entity.Line_Text == 'Units')"
                                            class="cellValue-main"
                                            ng-class="{cellCurrency:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                        cellSubtotal:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                        'cellPercentage-subtotal':(row.entity.Display_Format == 'P0'|| row.entity.Display_Format == 'P2')}">
                                    
                                            {{COL_FIELD|displayFormatFilter: row.entity.Display_Format}}
                                    
                                        </div>
                                    
                                    </div>`
                },
                // -- -- CHANGE (LAST MONTH) (%)
                {
                    field: 'MTD_PM_S_Change',
                    category: 'currentMonth',
                    subcategory: 'sublet',
                    printName: 'Change (Last Month)',
                    displayName: ['Change', '(Last Month)'],
                    enableFiltering: false,
                    width: 100,
                    headerCellTemplate: gridHeaderTemplates.dualLine.percentage,
                    type: 'number',
                    cellTemplate: `<div ng-class="{'boldTitle': (row.entity.LineStyleCode == 'B' || row.entity.Line_Type == 'T'), rowHighlight:  row.entity.LineStyleCode =='H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },
                // -- -- CHANGE (LAST YEAR) (%)
                {
                    field: 'MTD_PY_S_Change',
                    category: 'currentMonth',
                    subcategory: 'sublet',
                    printName: 'Change (Last Year)',
                    displayName: ['Change', '(Last Year)'],
                    enableFiltering: false,
                    width: 100,
                    headerCellTemplate: gridHeaderTemplates.dualLine.percentage,
                    type: 'number',
                    cellTemplate: `<div ng-class="{'boldTitle': (row.entity.LineStyleCode == 'B' || row.entity.Line_Type == 'T'), rowHighlight:  row.entity.LineStyleCode =='H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },

                // SPACER
                {
                    field: 'spx',
                    category: 'currentMonth',
                    subcategory: 'spf',
                    enableFiltering: false,
                    displayName: '',
                    headerCellTemplate: gridHeaderTemplates.spacer.dual,
                    minWidth: 7,
                    maxWidth: 7,
                },

                // -- OTHER 
                // -- -- OTHER ($)
                {
                    field: 'MTD_O',
                    category: 'currentMonth',
                    subcategory: 'other',
                    displayName: ['Other'],
                    printName: 'Other',
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLineTop.subtotal,
                    width: 120,
                    type: 'number',
                    cellTemplate: `<div ng-class="{boldTitle: (row.entity.LineStyleCode == 'B' || row.entity.LineStyleCode == 'R'), 
                                                    rowHighlight:  row.entity.LineStyleCode =='H', 
                                                    redText:(row.entity.LineStyleCode =='R')}" 
                                        class="cellValue-main">
                                    
                                        <div style="padding-top:0px"
                                            ng-if="row.entity.Line_Text == 'Units'"
                                            class="cellValue-centered cellUnit cellSubtotal">
                                    
                                            {{COL_FIELD}}
                                    
                                        </div>
                                        <div style="padding-top:0px"
                                            ng-if="!(row.entity.Line_Text == 'Units')"
                                            class="cellValue-main"
                                            ng-class="{cellCurrency:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                        cellSubtotal:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                        'cellPercentage-subtotal':(row.entity.Display_Format == 'P0'|| row.entity.Display_Format == 'P2')}">
                                    
                                            {{COL_FIELD|displayFormatFilter: row.entity.Display_Format}}
                                    
                                        </div>
                                    
                                    </div>`
                },
                //CHANGE (LAST MONTH) (%)
                {
                    field: 'MTD_PM_O_Change',
                    category: 'currentMonth',
                    subcategory: 'other',
                    printName: 'Change (Last Month)',
                    displayName: ['Change', '(Last Month)'],
                    enableFiltering: false,
                    width: 100,
                    headerCellTemplate: gridHeaderTemplates.dualLine.percentage,
                    type: 'number',
                    cellTemplate: `<div ng-class="{'boldTitle': (row.entity.LineStyleCode == 'B' || row.entity.Line_Type == 'T'), rowHighlight:  row.entity.LineStyleCode =='H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },
                //CHANGE (LAST YEAR) (%)
                {
                    field: 'MTD_PY_O_Change',
                    category: 'currentMonth',
                    subcategory: 'other',
                    printName: 'Change (Last Year)',
                    displayName: ['Change', '(Last Year)'],
                    enableFiltering: false,
                    width: 100,
                    headerCellTemplate: gridHeaderTemplates.dualLine.percentage,
                    type: 'number',
                    cellTemplate: `<div ng-class="{'boldTitle': (row.entity.LineStyleCode == 'B' || row.entity.Line_Type == 'T'), rowHighlight:  row.entity.LineStyleCode =='H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },


                // SPACER
                {
                    field: 'spx',
                    category: 'spb',
                    subcategory: 'spg',
                    enableFiltering: false,
                    displayName: '',
                    headerCellTemplate: gridHeaderTemplates.spacer.dual,
                    minWidth: 7,
                    maxWidth: 7,
                },


                // YEAR TO DATE

                // -- YEAR TO DATE
                // -- -- YEAR TO DATE ($)
                {
                    field: 'YTD',
                    category: 'yearToDate',
                    subcategory: 'ytd',
                    displayName: ['YTD'],
                    printName: 'YTD',
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLineTop.total,
                    width: 135,
                    type: 'number',
                    cellTemplate: `<div ng-class="{boldTitle: (row.entity.LineStyleCode == 'B' || row.entity.LineStyleCode == 'R'), 
                                                            rowHighlight:  row.entity.LineStyleCode =='H', 
                                                            redText:(row.entity.LineStyleCode =='R')}" 
                                        class="cellValue-main">

                                        <div style="padding-top:0px"
                                        ng-if="row.entity.Line_Text == 'Units'"
                                        class="cellValue-centered cellUnit cellTotal">

                                        {{COL_FIELD}}

                                        </div>
                                        <div style="padding-top:0px"
                                        ng-if="!(row.entity.Line_Text == 'Units')"
                                        class="cellValue-main"
                                        ng-class="{cellCurrency:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                cellTotal:(row.entity.Display_Format == 'D0'|| 'D2'),
                                                'cellPercentage-total':(row.entity.Display_Format == 'P0'|| row.entity.Display_Format == 'P2')}">

                                        {{COL_FIELD|displayFormatFilter: row.entity.Display_Format}}

                                        </div>

                                        </div>`,
                },
                // -- -- CHANGE (LAST YEAR) (%)
                {
                    field: 'YTD_PY_Change',
                    category: 'yearToDate',
                    subcategory: 'ytd',
                    displayName: ['Change', '(Last Year)'],
                    printName: 'Change (Last Year)',
                    enableFiltering: false,
                    headerCellTemplate: gridHeaderTemplates.dualLine.total_percentage,
                    width: 115,
                    type: 'number',
                    cellTemplate: `<div ng-class="{boldTitle:row.entity.LineStyleCode == 'B', rowHighlight: (row.entity.LineStyleCode == null)? false: row.entity.LineStyleCode == 'H', posPercentage: (COL_FIELD > 0), negPercentage: (COL_FIELD < 0)}" 
                                            class="cellValue-main cellPercentage-total">
                                        {{COL_FIELD | percentageFilter}}
                                    </div>`
                },
                // -- -- Closer
                {
                    field: 'Closer',
                    displayName: '',
                    printName: '',
                    category: 'yearToDate',
                    subcategory: 'ytd',
                    enableFiltering: false,
                    headerCellTemplate: '<div></div>',
                    width: 0,
                },
            ]


        };

        $scope.gridApi1 = {};
        //INITIALIZE DATA USING CURRENT MONTH AND YEAR
        $scope.getInitData = function () {
            $scope.gridOptions1.data = [
                {
                    "Id": 1,
                    "Line_No": 1,
                    "Line_No_": null,
                    "Line_Text": "Financial",
                    "Level_No": 1,
                    "Display_Format": "",
                    "LineStyleCode": "B",
                    "Line_Text_Indented": "    Financial",
                    "MTD_C": null,
                    "MTD_PM_C": null,
                    "MTD_PY_C": null,
                    "MTD_W": null,
                    "MTD_PM_W": null,
                    "MTD_PY_W": null,
                    "MTD_I": null,
                    "MTD_PM_I": null,
                    "MTD_PY_I": null,
                    "MTD_S": null,
                    "MTD_PM_S": null,
                    "MTD_PY_S": null,
                    "MTD_O": null,
                    "MTD_PM_O": null,
                    "MTD_PY_O": null,
                    "MTD_T": null,
                    "MTD_PM_T": null,
                    "MTD_PY_T": null,
                    "YTD": null,
                    "YTD_PY": null,
                    "MTD_PM_C_Change": null,
                    "MTD_PY_C_Change": null,
                    "MTD_PM_W_Change": null,
                    "MTD_PY_W_Change": null,
                    "MTD_PM_I_Change": null,
                    "MTD_PY_I_Change": null,
                    "MTD_PM_S_Change": null,
                    "MTD_PY_S_Change": null,
                    "MTD_PM_O_Change": null,
                    "MTD_PY_O_Change": null,
                    "MTD_PM_T_Change": null,
                    "MTD_PY_T_Change": null,
                    "YTD_PY_Change": null
                },
                {
                    "Id": 2,
                    "Line_No": 2,
                    "Line_No_": 2,
                    "Line_Text": "Sales",
                    "Level_No": 2,
                    "Display_Format": "D0",
                    "LineStyleCode": "",
                    "Line_Text_Indented": "        Sales",
                    "MTD_C": 102386.94,
                    "MTD_PM_C": 118954.12,
                    "MTD_PY_C": 100784.52,
                    "MTD_W": 89997.4,
                    "MTD_PM_W": 88618.82,
                    "MTD_PY_W": 110124.34,
                    "MTD_I": 42553.69,
                    "MTD_PM_I": 40099.75,
                    "MTD_PY_I": 70700.23,
                    "MTD_S": 18059.2,
                    "MTD_PM_S": 7524.36,
                    "MTD_PY_S": 19940.22,
                    "MTD_O": 3630,
                    "MTD_PM_O": 4747.63,
                    "MTD_PY_O": 2647,
                    "MTD_T": 256627.23,
                    "MTD_PM_T": 259944.68,
                    "MTD_PY_T": 304196.31,
                    "YTD": 2156087.19,
                    "YTD_PY": 2247334.65,
                    "MTD_PM_C_Change": -0.139273,
                    "MTD_PY_C_Change": 0.015899,
                    "MTD_PM_W_Change": 0.015556,
                    "MTD_PY_W_Change": -0.182765,
                    "MTD_PM_I_Change": 0.061195,
                    "MTD_PY_I_Change": -0.398111,
                    "MTD_PM_S_Change": 1.400097,
                    "MTD_PY_S_Change": -0.094332,
                    "MTD_PM_O_Change": -0.235407,
                    "MTD_PY_O_Change": 0.371363,
                    "MTD_PM_T_Change": -0.012762,
                    "MTD_PY_T_Change": -0.156376,
                    "YTD_PY_Change": -0.040602
                },
                {
                    "Id": 3,
                    "Line_No": 3,
                    "Line_No_": 3,
                    "Line_Text": "Gross Profit",
                    "Level_No": 2,
                    "Display_Format": "D0",
                    "LineStyleCode": "",
                    "Line_Text_Indented": "        Gross Profit",
                    "MTD_C": 82682.13,
                    "MTD_PM_C": 97759.01,
                    "MTD_PY_C": 76782.23,
                    "MTD_W": 78835.97,
                    "MTD_PM_W": 77563.13,
                    "MTD_PY_W": 92144.89,
                    "MTD_I": 33989.69,
                    "MTD_PM_I": 32423.61,
                    "MTD_PY_I": 54603.59,
                    "MTD_S": -425.38,
                    "MTD_PM_S": 1718.53,
                    "MTD_PY_S": 723.95,
                    "MTD_O": -8982.7,
                    "MTD_PM_O": -14031.21,
                    "MTD_PY_O": -9577.93,
                    "MTD_T": 186099.71,
                    "MTD_PM_T": 195433.07,
                    "MTD_PY_T": 214676.73,
                    "YTD": 1651309.42,
                    "YTD_PY": 1687896.36,
                    "MTD_PM_C_Change": -0.154224,
                    "MTD_PY_C_Change": 0.076839,
                    "MTD_PM_W_Change": 0.01641,
                    "MTD_PY_W_Change": -0.144434,
                    "MTD_PM_I_Change": 0.0483,
                    "MTD_PY_I_Change": -0.377519,
                    "MTD_PM_S_Change": -1.247525,
                    "MTD_PY_S_Change": -1.587582,
                    "MTD_PM_O_Change": -0.359805,
                    "MTD_PY_O_Change": -0.062145,
                    "MTD_PM_T_Change": -0.047757,
                    "MTD_PY_T_Change": -0.133116,
                    "YTD_PY_Change": -0.021676
                },
                {
                    "Id": 4,
                    "Line_No": 4,
                    "Line_No_": 4,
                    "Line_Text": "Gross Margin %",
                    "Level_No": 2,
                    "Display_Format": "P2",
                    "LineStyleCode": "",
                    "Line_Text_Indented": "        Gross Margin %",
                    "MTD_C": 0.8075456694,
                    "MTD_PM_C": 0.8218211357,
                    "MTD_PY_C": 0.7618454699,
                    "MTD_W": 0.8759805283,
                    "MTD_PM_W": 0.8752444458,
                    "MTD_PY_W": 0.8367350034,
                    "MTD_I": 0.7987483577,
                    "MTD_PM_I": 0.8085738689,
                    "MTD_PY_I": 0.7723254931,
                    "MTD_S": -0.0235547533,
                    "MTD_PM_S": 0.2283955047,
                    "MTD_PY_S": 0.0363060187,
                    "MTD_O": -2.4745730028,
                    "MTD_PM_O": -2.9554135432,
                    "MTD_PY_O": -3.6184095202,
                    "MTD_T": 0.7251752279,
                    "MTD_PM_T": 0.7518256192,
                    "MTD_PY_T": 0.7057177321,
                    "YTD": 0.7658824873,
                    "YTD_PY": 0.7510658726,
                    "MTD_PM_C_Change": -0.0142754663,
                    "MTD_PY_C_Change": 0.0457001995,
                    "MTD_PM_W_Change": 0.0007360825,
                    "MTD_PY_W_Change": 0.0392455249,
                    "MTD_PM_I_Change": -0.0098255112,
                    "MTD_PY_I_Change": 0.0264228646,
                    "MTD_PM_S_Change": -0.251950258,
                    "MTD_PY_S_Change": -0.059860772,
                    "MTD_PM_O_Change": 0.4808405404,
                    "MTD_PY_O_Change": 1.1438365174,
                    "MTD_PM_T_Change": -0.0266503913,
                    "MTD_PY_T_Change": 0.0194574958,
                    "YTD_PY_Change": 0.0148166147
                },
                {
                    "Id": 5,
                    "Line_No": 5,
                    "Line_No_": null,
                    "Line_Text": "",
                    "Level_No": 1,
                    "Display_Format": "",
                    "LineStyleCode": "",
                    "Line_Text_Indented": "    ",
                    "MTD_C": null,
                    "MTD_PM_C": null,
                    "MTD_PY_C": null,
                    "MTD_W": null,
                    "MTD_PM_W": null,
                    "MTD_PY_W": null,
                    "MTD_I": null,
                    "MTD_PM_I": null,
                    "MTD_PY_I": null,
                    "MTD_S": null,
                    "MTD_PM_S": null,
                    "MTD_PY_S": null,
                    "MTD_O": null,
                    "MTD_PM_O": null,
                    "MTD_PY_O": null,
                    "MTD_T": null,
                    "MTD_PM_T": null,
                    "MTD_PY_T": null,
                    "YTD": null,
                    "YTD_PY": null,
                    "MTD_PM_C_Change": null,
                    "MTD_PY_C_Change": null,
                    "MTD_PM_W_Change": null,
                    "MTD_PY_W_Change": null,
                    "MTD_PM_I_Change": null,
                    "MTD_PY_I_Change": null,
                    "MTD_PM_S_Change": null,
                    "MTD_PY_S_Change": null,
                    "MTD_PM_O_Change": null,
                    "MTD_PY_O_Change": null,
                    "MTD_PM_T_Change": null,
                    "MTD_PY_T_Change": null,
                    "YTD_PY_Change": null
                },
                {
                    "Id": 6,
                    "Line_No": 6,
                    "Line_No_": null,
                    "Line_Text": "Operating",
                    "Level_No": 1,
                    "Display_Format": "",
                    "LineStyleCode": "B",
                    "Line_Text_Indented": "    Operating",
                    "MTD_C": null,
                    "MTD_PM_C": null,
                    "MTD_PY_C": null,
                    "MTD_W": null,
                    "MTD_PM_W": null,
                    "MTD_PY_W": null,
                    "MTD_I": null,
                    "MTD_PM_I": null,
                    "MTD_PY_I": null,
                    "MTD_S": null,
                    "MTD_PM_S": null,
                    "MTD_PY_S": null,
                    "MTD_O": null,
                    "MTD_PM_O": null,
                    "MTD_PY_O": null,
                    "MTD_T": null,
                    "MTD_PM_T": null,
                    "MTD_PY_T": null,
                    "YTD": null,
                    "YTD_PY": null,
                    "MTD_PM_C_Change": null,
                    "MTD_PY_C_Change": null,
                    "MTD_PM_W_Change": null,
                    "MTD_PY_W_Change": null,
                    "MTD_PM_I_Change": null,
                    "MTD_PY_I_Change": null,
                    "MTD_PM_S_Change": null,
                    "MTD_PY_S_Change": null,
                    "MTD_PM_O_Change": null,
                    "MTD_PY_O_Change": null,
                    "MTD_PM_T_Change": null,
                    "MTD_PY_T_Change": null,
                    "YTD_PY_Change": null
                },
                {
                    "Id": 7,
                    "Line_No": 7,
                    "Line_No_": 7,
                    "Line_Text": "RO Count",
                    "Level_No": 2,
                    "Display_Format": "B0",
                    "LineStyleCode": "",
                    "Line_Text_Indented": "        RO Count",
                    "MTD_C": 444,
                    "MTD_PM_C": 532,
                    "MTD_PY_C": 476,
                    "MTD_W": 314,
                    "MTD_PM_W": 346,
                    "MTD_PY_W": 454,
                    "MTD_I": 249,
                    "MTD_PM_I": 307,
                    "MTD_PY_I": 444,
                    "MTD_S": 888,
                    "MTD_PM_S": 1051,
                    "MTD_PY_S": 1177,
                    "MTD_O": null,
                    "MTD_PM_O": null,
                    "MTD_PY_O": null,
                    "MTD_T": 890,
                    "MTD_PM_T": 1053,
                    "MTD_PY_T": 1177,
                    "YTD": 8387,
                    "YTD_PY": 9392,
                    "MTD_PM_C_Change": -0.165413,
                    "MTD_PY_C_Change": -0.067226,
                    "MTD_PM_W_Change": -0.092485,
                    "MTD_PY_W_Change": -0.30837,
                    "MTD_PM_I_Change": -0.188925,
                    "MTD_PY_I_Change": -0.439189,
                    "MTD_PM_S_Change": -0.15509,
                    "MTD_PY_S_Change": -0.245539,
                    "MTD_PM_O_Change": null,
                    "MTD_PY_O_Change": null,
                    "MTD_PM_T_Change": -0.154795,
                    "MTD_PY_T_Change": -0.24384,
                    "YTD_PY_Change": -0.107005
                },
                {
                    "Id": 8,
                    "Line_No": 8,
                    "Line_No_": null,
                    "Line_Text": "",
                    "Level_No": 1,
                    "Display_Format": "",
                    "LineStyleCode": "",
                    "Line_Text_Indented": "    ",
                    "MTD_C": null,
                    "MTD_PM_C": null,
                    "MTD_PY_C": null,
                    "MTD_W": null,
                    "MTD_PM_W": null,
                    "MTD_PY_W": null,
                    "MTD_I": null,
                    "MTD_PM_I": null,
                    "MTD_PY_I": null,
                    "MTD_S": null,
                    "MTD_PM_S": null,
                    "MTD_PY_S": null,
                    "MTD_O": null,
                    "MTD_PM_O": null,
                    "MTD_PY_O": null,
                    "MTD_T": null,
                    "MTD_PM_T": null,
                    "MTD_PY_T": null,
                    "YTD": null,
                    "YTD_PY": null,
                    "MTD_PM_C_Change": null,
                    "MTD_PY_C_Change": null,
                    "MTD_PM_W_Change": null,
                    "MTD_PY_W_Change": null,
                    "MTD_PM_I_Change": null,
                    "MTD_PY_I_Change": null,
                    "MTD_PM_S_Change": null,
                    "MTD_PY_S_Change": null,
                    "MTD_PM_O_Change": null,
                    "MTD_PY_O_Change": null,
                    "MTD_PM_T_Change": null,
                    "MTD_PY_T_Change": null,
                    "YTD_PY_Change": null
                },
                {
                    "Id": 9,
                    "Line_No": 9,
                    "Line_No_": 9,
                    "Line_Text": "Sales / RO",
                    "Level_No": 2,
                    "Display_Format": "B2",
                    "LineStyleCode": "",
                    "Line_Text_Indented": "        Sales / RO",
                    "MTD_C": 230.6012162162,
                    "MTD_PM_C": 223.5979699248,
                    "MTD_PY_C": 211.7321848739,
                    "MTD_W": 286.6159235669,
                    "MTD_PM_W": 256.1237572254,
                    "MTD_PY_W": 242.5646255507,
                    "MTD_I": 170.8983534137,
                    "MTD_PM_I": 130.6180781759,
                    "MTD_PY_I": 159.2347522523,
                    "MTD_S": 20.3369369369,
                    "MTD_PM_S": 7.1592388202,
                    "MTD_PY_S": 16.9415632965,
                    "MTD_O": null,
                    "MTD_PM_O": null,
                    "MTD_PY_O": null,
                    "MTD_T": 288.3452022472,
                    "MTD_PM_T": 246.8610446344,
                    "MTD_PY_T": 258.4505607477,
                    "YTD": 257.0749004412,
                    "YTD_PY": 239.281798339,
                    "MTD_PM_C_Change": 0.03132,
                    "MTD_PY_C_Change": 0.089117,
                    "MTD_PM_W_Change": 0.119052,
                    "MTD_PY_W_Change": 0.181606,
                    "MTD_PM_I_Change": 0.308382,
                    "MTD_PY_I_Change": 0.073247,
                    "MTD_PM_S_Change": 1.840656,
                    "MTD_PY_S_Change": 0.200416,
                    "MTD_PM_O_Change": null,
                    "MTD_PY_O_Change": null,
                    "MTD_PM_T_Change": 0.168046,
                    "MTD_PY_T_Change": 0.115668,
                    "YTD_PY_Change": 0.07436
                },
                {
                    "Id": 10,
                    "Line_No": 10,
                    "Line_No_": 10,
                    "Line_Text": "Gross Profit / RO",
                    "Level_No": 2,
                    "Display_Format": "B2",
                    "LineStyleCode": "",
                    "Line_Text_Indented": "        Gross Profit / RO",
                    "MTD_C": 186.2210135135,
                    "MTD_PM_C": 183.757537594,
                    "MTD_PY_C": 161.3072058824,
                    "MTD_W": 251.0699681529,
                    "MTD_PM_W": 224.1708959538,
                    "MTD_PY_W": 202.9623127753,
                    "MTD_I": 136.5047791165,
                    "MTD_PM_I": 105.6143648208,
                    "MTD_PY_I": 122.9810585586,
                    "MTD_S": -0.4790315315,
                    "MTD_PM_S": 1.6351379638,
                    "MTD_PY_S": 0.6150807137,
                    "MTD_O": null,
                    "MTD_PM_O": null,
                    "MTD_PY_O": null,
                    "MTD_T": 209.1007977528,
                    "MTD_PM_T": 185.5964577398,
                    "MTD_PY_T": 182.3931435854,
                    "YTD": 196.8891641827,
                    "YTD_PY": 179.7163926746,
                    "MTD_PM_C_Change": 0.013406,
                    "MTD_PY_C_Change": 0.154449,
                    "MTD_PM_W_Change": 0.119993,
                    "MTD_PY_W_Change": 0.237027,
                    "MTD_PM_I_Change": 0.292483,
                    "MTD_PY_I_Change": 0.109965,
                    "MTD_PM_S_Change": -1.29296,
                    "MTD_PY_S_Change": -1.77881,
                    "MTD_PM_O_Change": null,
                    "MTD_PY_O_Change": null,
                    "MTD_PM_T_Change": 0.126642,
                    "MTD_PY_T_Change": 0.146429,
                    "YTD_PY_Change": 0.095554
                },
                {
                    "Id": 11,
                    "Line_No": 11,
                    "Line_No_": 11,
                    "Line_Text": "Hours / RO",
                    "Level_No": 2,
                    "Display_Format": "B2",
                    "LineStyleCode": "",
                    "Line_Text_Indented": "        Hours / RO",
                    "MTD_C": 1.9022972973,
                    "MTD_PM_C": 1.8856203008,
                    "MTD_PY_C": 1.9358193277,
                    "MTD_W": 1.3760828025,
                    "MTD_PM_W": 1.38,
                    "MTD_PY_W": 1.3523127753,
                    "MTD_I": 2.0277108434,
                    "MTD_PM_I": 1.6905863192,
                    "MTD_PY_I": 1.9038288288,
                    "MTD_S": null,
                    "MTD_PM_S": null,
                    "MTD_PY_S": null,
                    "MTD_O": null,
                    "MTD_PM_O": null,
                    "MTD_PY_O": null,
                    "MTD_T": 2.0018089888,
                    "MTD_PM_T": 1.8989933523,
                    "MTD_PY_T": 2.0226847918,
                    "YTD": 1.9248837487,
                    "YTD_PY": 1.9104003407,
                    "MTD_PM_C_Change": 0.008844,
                    "MTD_PY_C_Change": -0.017316,
                    "MTD_PM_W_Change": -0.002838,
                    "MTD_PY_W_Change": 0.017577,
                    "MTD_PM_I_Change": 0.199412,
                    "MTD_PY_I_Change": 0.065069,
                    "MTD_PM_S_Change": null,
                    "MTD_PY_S_Change": null,
                    "MTD_PM_O_Change": null,
                    "MTD_PY_O_Change": null,
                    "MTD_PM_T_Change": 0.054142,
                    "MTD_PY_T_Change": -0.01032,
                    "YTD_PY_Change": 0.007581
                },
                {
                    "Id": 12,
                    "Line_No": 12,
                    "Line_No_": 12,
                    "Line_Text": "ELR",
                    "Level_No": 2,
                    "Display_Format": "B2",
                    "LineStyleCode": "",
                    "Line_Text_Indented": "        ELR",
                    "MTD_C": 121.2224905875,
                    "MTD_PM_C": 118.5805911379,
                    "MTD_PY_C": 109.3760052092,
                    "MTD_W": 208.283922331,
                    "MTD_PM_W": 185.5969255257,
                    "MTD_PY_W": 179.3702093004,
                    "MTD_I": 84.2814220638,
                    "MTD_PM_I": 77.2619988054,
                    "MTD_PY_I": 83.6392168461,
                    "MTD_S": null,
                    "MTD_PM_S": null,
                    "MTD_PY_S": null,
                    "MTD_O": null,
                    "MTD_PM_O": null,
                    "MTD_PY_O": null,
                    "MTD_T": 144.0423156583,
                    "MTD_PM_T": 129.9957392331,
                    "MTD_PY_T": 127.7759944554,
                    "YTD": 133.5534681615,
                    "YTD_PY": 125.2521752846,
                    "MTD_PM_C_Change": 0.022279,
                    "MTD_PY_C_Change": 0.108309,
                    "MTD_PM_W_Change": 0.122237,
                    "MTD_PY_W_Change": 0.161195,
                    "MTD_PM_I_Change": 0.090852,
                    "MTD_PY_I_Change": 0.007678,
                    "MTD_PM_S_Change": null,
                    "MTD_PY_S_Change": null,
                    "MTD_PM_O_Change": null,
                    "MTD_PY_O_Change": null,
                    "MTD_PM_T_Change": 0.108054,
                    "MTD_PY_T_Change": 0.127303,
                    "YTD_PY_Change": 0.066276
                },
                {
                    "Id": 13,
                    "Line_No": 13,
                    "Line_No_": null,
                    "Line_Text": "",
                    "Level_No": 1,
                    "Display_Format": "",
                    "LineStyleCode": "",
                    "Line_Text_Indented": "    ",
                    "MTD_C": null,
                    "MTD_PM_C": null,
                    "MTD_PY_C": null,
                    "MTD_W": null,
                    "MTD_PM_W": null,
                    "MTD_PY_W": null,
                    "MTD_I": null,
                    "MTD_PM_I": null,
                    "MTD_PY_I": null,
                    "MTD_S": null,
                    "MTD_PM_S": null,
                    "MTD_PY_S": null,
                    "MTD_O": null,
                    "MTD_PM_O": null,
                    "MTD_PY_O": null,
                    "MTD_T": null,
                    "MTD_PM_T": null,
                    "MTD_PY_T": null,
                    "YTD": null,
                    "YTD_PY": null,
                    "MTD_PM_C_Change": null,
                    "MTD_PY_C_Change": null,
                    "MTD_PM_W_Change": null,
                    "MTD_PY_W_Change": null,
                    "MTD_PM_I_Change": null,
                    "MTD_PY_I_Change": null,
                    "MTD_PM_S_Change": null,
                    "MTD_PY_S_Change": null,
                    "MTD_PM_O_Change": null,
                    "MTD_PY_O_Change": null,
                    "MTD_PM_T_Change": null,
                    "MTD_PY_T_Change": null,
                    "YTD_PY_Change": null
                }
            ];
           
        }();


        $scope.getCategoryWidth = function (columns, category, type) {
            var dw = 0;
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].colDef[type] == category) {
                    dw += columns[i].drawnWidth;
                }
            }
            var width = dw.toString() + "px";
            var res = {
                "max-width": width,
                "min-width": width
            };
            return res;
        };


      

        
    }

})();