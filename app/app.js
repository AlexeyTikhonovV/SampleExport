(function () {
    'use strict';

    angular
        .module('app', [            
            'ui.grid',
            'ui.grid.autoResize',
            'ui.grid.cellNav',
            'ui.grid.edit',
            'ui.grid.exporter',
            'ui.grid.grouping',
            'ui.grid.pinning',
            'ui.grid.resizeColumns',
            'ui.grid.selection',  
            /* Angular Modules */
            'ngAnimate',
            'ngResource',
            'ngRoute',
            'ngTouch',
            'ngSanitize', 
            'di.Sample',
            'app.diGrid'
        ])


})(); 