(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('XLSFactory', XLSFactory);

   function XLSFactory($filter) {

        var XLSFactory = {


            // EXPORT grid with no Category and Subcategory Headers
            exportH0: function (grid, filename, uiGridExporterService, uiGridExporterConstants) {
                //console.log(grid);
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
                //console.log(rows);

                var sheet = {};
                var wscols = [];

                // PRINT COLUMN HEADERS
                grid.columns.forEach(function (col, i) {
                    if (col.visible) {

                        if (grid.options.enableGrouping && i > 0) {

                            var loc = XLSX.utils.encode_cell({ r: 0, c: i - 1 })
                            if (col.colDef.name.substring(0, 2) == 'sp' || col.colDef.name == 'Closer') {
                                sheet[loc] = {
                                    v: ' ',
                                    t: 's'
                                };
                            } else {
                                if (col.colDef.type == 'number') {
                                    if (col.colDef.cellTemplate.toString().includes('currency')) {
                                        sheet[loc] = {
                                            v: col.colDef.printName + ' ($)',
                                            t: 's'
                                        };
                                    } else if (col.colDef.cellTemplate.toString().includes('percentage')) {
                                        sheet[loc] = {
                                            v: col.colDef.printName + ' (%)',
                                            t: 's'
                                        };
                                    } else {
                                        sheet[loc] = {
                                            v: col.colDef.printName,
                                            t: 's'
                                        };
                                    }
                                } else {
                                    sheet[loc] = {
                                        v: col.colDef.printName,
                                        t: 's'
                                    };
                                }
                            }
                        } else {
                            var loc = XLSX.utils.encode_cell({ r: 0, c: i })
                            if (col.colDef.name.substring(0, 2) == 'sp' || col.colDef.name == 'Closer') {
                                sheet[loc] = {
                                    v: ' ',
                                    t: 's'
                                };
                                wscols.push({ wch: 1 });
                            } else {
                                if (col.colDef.type == 'number') {
                                    if (col.colDef.cellTemplate.toString().includes('currency')) {
                                        sheet[loc] = {
                                            v: col.colDef.printName + ' ($)',
                                            t: 's'
                                        };
                                    } else if (col.colDef.cellTemplate.toString().includes('percentage')) {
                                        sheet[loc] = {
                                            v: col.colDef.printName + ' (%)',
                                            t: 's'
                                        };
                                    } else {
                                        sheet[loc] = {
                                            v: col.colDef.printName,
                                            t: 's'
                                        };
                                    }
                                } else {
                                    sheet[loc] = {
                                        v: col.colDef.printName,
                                        t: 's'
                                    };
                                }
                                if (col.colDef.printName) {
                                    wscols.push({ wch: col.colDef.printName.toString().length + 3 });
                                }
                            }
                        }                       

                    }


                });

                //console.log(sheet);

                var endLoc;
                var lineNo = 1;
                //console.log(rows);
                //console.log("ROWS.LENGTH: " + rows.length);

                //PRINT GRID DATA
                console.log('rows----->', rows);
                rows.forEach(function (row, ri) {
                    ri += 1;
                    //console.log("ROW: "+ ri);
                    //console.log(row);
                    //console.log(gridApi.columns);
                    //console.log("COLUMNS.LENGTH: " + gridApi.columns.length);
                    grid.columns.forEach(function (col, ci) {
                        var loc = XLSX.utils.encode_cell({ r: ri, c: ci });

                        if (!isUndefinedOrNull(row[ci])) {
                            if (!isUndefinedOrNull(row[ci].value)) {
                                if (col.colDef.type == 'number') {
                                    var newVal = normalize(row[ci].value)
                                    sheet[loc] = {
                                        v: newVal,
                                        t: 'n'
                                    };
                                } else {

                                    var str = new String(row[ci].value);
                                    let dateRegEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))T\d{2}:\d{2}:\d{2}/gmi;
                                    //console.log(str);
                                    var n = str.search(dateRegEx);

                                    if (n > -1) {
                                        sheet[loc] = {
                                            v: str.substring(0, 10),
                                            t: 's'
                                        };
                                    } else {
                                        sheet[loc] = {
                                            v: str,
                                            t: 's'
                                        };
                                    }
                                    
                                }
                            } else {
                                sheet[loc] = {
                                    v: ' ',
                                    t: 's'
                                };
                            }
                        } else {
                            sheet[loc] = {
                                v: ' ',
                                t: 's'
                            };
                        }

                        // #
                        if (col.colDef.name == 'No') {
                            sheet[loc] = {
                                v: lineNo,
                                t: 'n'
                            };
                        }

                        endLoc = loc;

                    });
                    lineNo++;
                });

                //console.log(wscols);
                sheet['!cols'] = wscols;               
                sheet['!ref'] = XLSX.utils.encode_range({ s: 'A1', e: endLoc });



                var workbook = {
                    SheetNames: ['Sheet1'],
                    Sheets: {
                        Sheet1: sheet
                    }
                };

                var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
                var wbout = XLSX.write(workbook, wopts);
                console.log('----->',sheet);
                saveAs(new Blob([s2ab(wbout)], { type: "" }), filename +"_" +  moment().format()+  ".xlsx");

            },

            // EXPORT grid with Category Headers
            exportH1: function (grid, filename, uiGridExporterService, uiGridExporterConstants, selectedMonth, selectedYear) {
                //console.log(grid);
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
                //console.log(rows);

                var sheet = {};
                var wscols = [];

                var mergeObjectsArray = [];
                var mergeStart = 1;

                //PRINT CATEGORY HEADERS
                grid.columns.forEach(function (col, i) {
                    //console.log('PRINT CATEGORY HEADERS');

                    if (col.visible) {
                        //console.log(col);
                        if (grid.options.enableGrouping && i > 0) {
                            var loc = XLSX.utils.encode_cell({ r: 0, c: i - 1 })
                            if (!isUndefinedOrNull(col.colDef.category)) {
                                if (col.colDef.category.substring(0, 2) == 'sp') {
                                    sheet[loc] = {
                                        v: ' ',
                                        t: 's'
                                    };
                                } else {
                                    sheet[loc] = {
                                        v: resolveCategory(col.colDef.category, selectedMonth, selectedYear),
                                        t: 's'
                                    };
                                }
                            } else {
                                sheet[loc] = {
                                    v: resolveCategory(col.colDef.category, selectedMonth, selectedYear),
                                    t: 's'
                                };
                            }


                            if (i > 2) {

                                var prevLoc = XLSX.utils.encode_cell({ r: 0, c: i - 2 })
                                if (sheet[loc].v !== sheet[prevLoc].v) {
                                    //console.log('MERGE: ' + mergeStart + ' until ' + i-1 );
                                    mergeObjectsArray.push({
                                        s: { r: 0, c: mergeStart - 1 },
                                        e: { r: 0, c: i - 2 }
                                    })
                                    mergeStart = i;
                                } else {
                                    if (i == grid.columns.length - 1) {
                                        mergeObjectsArray.push({
                                            s: { r: 0, c: mergeStart - 1 },
                                            e: { r: 0, c: i - 1 }
                                        })
                                    }
                                }
                            }
                        } else {
                            var loc = XLSX.utils.encode_cell({ r: 0, c: i })
                            if (!isUndefinedOrNull(col.colDef.category)) {
                                if (col.colDef.category.substring(0, 2) == 'sp') {
                                    sheet[loc] = {
                                        v: ' ',
                                        t: 's'
                                    };
                                } else {
                                    sheet[loc] = {
                                        v: resolveCategory(col.colDef.category, selectedMonth, selectedYear),
                                        t: 's'
                                    };
                                }
                            } else {
                                sheet[loc] = {
                                    v: resolveCategory(col.colDef.category, selectedMonth, selectedYear),
                                    t: 's'
                                };
                            }


                            if (i > 2) {
                                var prevLoc = XLSX.utils.encode_cell({ r: 0, c: i - 1 })
                                if (sheet[loc].v !== sheet[prevLoc].v) {
                                    //console.log('MERGE: ' + mergeStart + ' until ' + i-1 );
                                    mergeObjectsArray.push({
                                        s: { r: 0, c: mergeStart },
                                        e: { r: 0, c: i - 1 }
                                    })
                                    mergeStart = i;
                                } else {
                                    if (i == grid.columns.length - 1) {
                                        mergeObjectsArray.push({
                                            s: { r: 0, c: mergeStart },
                                            e: { r: 0, c: i }
                                        })
                                    }
                                }
                            }
                        }




                    }
                });

                //PRINT COLUMN HEADERS
                grid.columns.forEach(function (col, i) {
                    //console.log('PRINT COLUMN HEADERS');
                    if (col.visible) {

                        if (grid.options.enableGrouping && i > 0) {
                            var loc = XLSX.utils.encode_cell({ r: 1, c: i - 1 })
                            if (col.colDef.name.substring(0, 2) == 'sp' || col.colDef.name == 'Closer') {
                                sheet[loc] = {
                                    v: ' ',
                                    t: 's'
                                };
                                wscols.push({ wch: 1 });
                            } else {
                                if (col.colDef.type == 'number') {
                                    if (col.colDef.cellTemplate.toString().includes('currency')) {
                                        sheet[loc] = {
                                            v: col.colDef.printName + ' ($)',
                                            t: 's'
                                        };
                                    } else if (col.colDef.cellTemplate.toString().includes('percentage')) {
                                        sheet[loc] = {
                                            v: col.colDef.printName + ' (%)',
                                            t: 's'
                                        };
                                    } else {
                                        sheet[loc] = {
                                            v: col.colDef.printName,
                                            t: 's'
                                        };
                                    }
                                } else {
                                    sheet[loc] = {
                                        v: col.colDef.printName,
                                        t: 's'
                                    };
                                }
                                if (col.colDef.printName) {
                                    wscols.push({ wch: col.colDef.printName.toString().length + 3 });
                                }
                            }
                        } else {
                            var loc = XLSX.utils.encode_cell({ r: 1, c: i })
                            if (col.colDef.name.substring(0, 2) == 'sp' || col.colDef.name == 'Closer') {
                                sheet[loc] = {
                                    v: ' ',
                                    t: 's'
                                };
                                wscols.push({ wch: 1 });
                            } else {
                                if (col.colDef.type == 'number') {
                                    if (col.colDef.cellTemplate.toString().includes('currency')) {
                                        sheet[loc] = {
                                            v: col.colDef.printName + ' ($)',
                                            t: 's'
                                        };
                                    } else if (col.colDef.cellTemplate.toString().includes('percentage')) {
                                        sheet[loc] = {
                                            v: col.colDef.printName + ' (%)',
                                            t: 's'
                                        };
                                    } else {
                                        sheet[loc] = {
                                            v: col.colDef.printName,
                                            t: 's'
                                        };
                                    }
                                } else {
                                    sheet[loc] = {
                                        v: col.colDef.printName,
                                        t: 's'
                                    };
                                }
                                //console.log(col);
                                if (col.colDef.printName){
                                    wscols.push({ wch: col.colDef.printName.toString().length + 3 });
                                } 
                            }
                        }




                    }
                });

                //PRINT GRID DATA 
                //console.log('PRINT GRID DATA');
                var endLoc;
                var lineNo = 1;
                //console.log(rows);
                //console.log("ROWS.LENGTH: " + rows.length);
                rows.forEach(function (row, ri) {
                    ri += 2;
                    //console.log('ROW:' + ri);
                    //console.log(row);
                    grid.columns.forEach(function (col, ci) {
                       // console.log('COL: ' + ci);
                        //console.log(col.colDef);
                        var loc = XLSX.utils.encode_cell({ r: ri, c: ci });
                        if (!isUndefinedOrNull(row[ci])) {
                            if (!isUndefinedOrNull(row[ci].value)) {
                                if (grid.columns[ci].colDef.type == 'number') {
                                    //console.log('CASE 1');
                                    //console.log('TO NORMALIZE:');
                                    //console.log(row[ci].value);
                                    var newVal = normalize(row[ci].value)
                                    sheet[loc] = {
                                        v: newVal,
                                        t: 'n'
                                    };
                                } else {
                                    //console.log('CASE 2');
                                    //console.log('STRING');
                                    //console.log(row[ci].value);
                                    var str = new String(row[ci].value);
                                    let dateRegEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))T\d{2}:\d{2}:\d{2}/gmi;
                                    //console.log(str);
                                    var n = str.search(dateRegEx);

                                    if (n > -1) {
                                        sheet[loc] = {
                                            v: str.substring(0, 10),
                                            t: 's'
                                        };
                                    } else {
                                        sheet[loc] = {
                                            v: str,
                                            t: 's'
                                        };
                                    }
                                }
                            } else {
                                //console.log('CASE 3');
                                //console.log('BLANK');
                                sheet[loc] = {
                                    v: ' ',
                                    t: 's'
                                };
                            }
                        } else {
                            //console.log('CASE 4');
                            //console.log('BLANK');
                            sheet[loc] = {
                                v: ' ',
                                t: 's'
                            };
                        }


                        if (col.colDef.name == 'No') {
                            sheet[loc] = {
                                v: lineNo,
                                t: 'n'
                            };
                        }
                        //console.log('OUTPUT:');
                        //console.log(sheet[loc].v);
                        endLoc = loc;

                    });
                    lineNo++;
                });


                //console.log(mergeObjectsArray);
                sheet['!merges'] = mergeObjectsArray;
                //console.log(wscols);
                sheet['!cols'] = wscols;
                sheet['!ref'] = XLSX.utils.encode_range({ s: 'A1', e: endLoc });

                var workbook = {
                    SheetNames: ['Sheet1'],
                    Sheets: {
                        Sheet1: sheet
                    }
                };

                var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
                var wbout = XLSX.write(workbook, wopts);
                console.log('----->',sheet);
                saveAs(new Blob([s2ab(wbout)], { type: "" }), filename + "_" + moment().format() + ".xlsx");

            },

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
                //console.log(rows);
                console.log('rows----->', rows);
                var sheet = {};
                var wscols = [];
                var mergeStartC = 1;
                var mergeStartS = 1;
                var mergeObjectsArray = [];

                // PRINT CATEGORY
                grid.columns.forEach(function (col, i) {
                    //console.log(col);
                    if (col.visible) {
                        var loc = XLSX.utils.encode_cell({ r: 0, c: i })
                        if (col.colDef.category.substring(0, 2) == 'sp') {
                            sheet[loc] = {
                                v: ' ',
                                t: 's'
                            };

                        } else {
                            sheet[loc] = {
                                v: resolveCategory(col.colDef.category, selectedMonth, selectedYear),
                                t: 's'
                            };
                        }
                        if (i > 2) {

                            var prevLoc = XLSX.utils.encode_cell({ r: 0, c: i - 1 })
                            if (sheet[loc].v !== sheet[prevLoc].v) {
                                //console.log('MERGE: ' + mergeStartC + ' until ' + i - 1);
                                mergeObjectsArray.push({
                                    s: { r: 0, c: mergeStartC },
                                    e: { r: 0, c: i - 1 }
                                })
                                mergeStartC = i;
                            } else {
                                if (i == grid.columns.length - 1) {
                                    mergeObjectsArray.push({
                                        s: { r: 0, c: mergeStartC },
                                        e: { r: 0, c: i }
                                    })
                                }
                            }
                        }
                    }
                });
                // PRINT SUBCATEGORY
                grid.columns.forEach(function (col, i) {
                    //console.log(col);
                    if (col.visible) {
                        var loc = XLSX.utils.encode_cell({ r: 1, c: i })
                        if (col.colDef.subcategory.substring(0, 2) == 'sp') {
                            sheet[loc] = {
                                v: ' ',
                                t: 's'
                            };

                        } else {
                            sheet[loc] = {
                                v: resolveSubcategory(col.colDef.subcategory, selectedMonth, selectedYear),
                                t: 's'
                            };
                        }
                        if (i > 2) {

                            var prevLoc = XLSX.utils.encode_cell({ r: 1, c: i - 1 })
                            if (sheet[loc].v !== sheet[prevLoc].v) {
                                //console.log('MERGE: ' + String(mergeStartS) + ' until ' + String(i - 1));
                                mergeObjectsArray.push({
                                    s: { r: 1, c: mergeStartS },
                                    e: { r: 1, c: i - 1 }
                                })
                                mergeStartS = i;
                            } else {
                                if (i == grid.columns.length - 1) {
                                    mergeObjectsArray.push({
                                        s: { r: 1, c: mergeStartS },
                                        e: { r: 1, c: i }
                                    })
                                }
                            }
                        }
                    }
                });

                // PRINT HEADER
                grid.columns.forEach(function (col, i) {
                    if (col.visible) {
                        var loc = XLSX.utils.encode_cell({ r: 2, c: i })
                        if (col.colDef.name.substring(0, 2) == 'sp' || col.colDef.name == 'Closer') {
                            sheet[loc] = {
                                v: ' ',
                                t: 's'
                            };
                            wscols.push({ wch: 1 });
                            var data = EB.createFile(artistWorkbook);
} else {
                            if (col.colDef.type == 'number') {
                                if (col.colDef.cellTemplate.toString().includes('currency')) {
                                    sheet[loc] = {
                                        v: col.colDef.printName + ' ($)',
                                        t: 's'
                                    };
                                } else if (col.colDef.cellTemplate.toString().includes('percentage')) {
                                    sheet[loc] = {
                                        v: col.colDef.printName + ' (%)',
                                        t: 's'
                                    };
                                } else {
                                    sheet[loc] = {
                                        v: col.colDef.printName,
                                        t: 's'
                                    };
                                }
                            } else {
                                sheet[loc] = {
                                    v: col.colDef.printName,
                                    t: 's'
                                };
                            }
                            if (col.colDef.printName) {
                                wscols.push({ wch: col.colDef.printName.toString().length + 3 });
                            }
                        }
                    }
                });


                //PRINT GRID DATA 
                //console.log('PRINT GRID DATA');
                var endLoc;
                var lineNo = 1;
                //console.log(rows);
                //console.log("ROWS.LENGTH: " + rows.length);
                rows.forEach(function (row, ri) {
                    ri += 3;
                    //console.log('ROW:' + ri);
                    //console.log(row);
                    grid.columns.forEach(function (col, ci) {
                        //console.log('COL: ' + ci);
                        //console.log(col.colDef);
                        var loc = XLSX.utils.encode_cell({ r: ri, c: ci });
                        if (!isUndefinedOrNull(row[ci])) {
                            if (!isUndefinedOrNull(row[ci].value)) {
                                if (grid.columns[ci].colDef.type == 'number') {
                                    //console.log('CASE 1');
                                    //console.log('TO NORMALIZE:');
                                    //console.log(row[ci].value);
                                    var newVal = normalize(row[ci].value)
                                    sheet[loc] = {
                                        v: newVal,
                                        t: 'n'
                                    };
                                } else {
                                    //console.log('CASE 2');
                                    //console.log('NO CHANGE:');
                                    //console.log(row[ci].value);
                                    var str = new String(row[ci].value);
                                    let dateRegEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))T\d{2}:\d{2}:\d{2}/gmi;
                                    //console.log(str);
                                    var n = str.search(dateRegEx);

                                    if (n > -1) {
                                        sheet[loc] = {
                                            v: str.substring(0, 10),
                                            t: 's'
                                        };
                                    } else {
                                        sheet[loc] = {
                                            v: str,
                                            t: 's'
                                        };
                                    }
                                }
                            } else {
                                //console.log('CASE 3');
                                //console.log('BLANK');
                                sheet[loc] = {
                                    v: ' ',
                                    t: 's'
                                };
                            }
                        } else {
                            //console.log('CASE 4');
                            //console.log('BLANK');
                            sheet[loc] = {
                                v: ' ',
                                t: 's'
                            };
                        }


                        if (col.colDef.name == 'No') {
                            sheet[loc] = {
                                v: lineNo,
                                t: 'n'
                            };
                        }
                        //console.log('OUTPUT:');
                        //console.log(sheet[loc].v);
                        endLoc = loc;

                    });
                    lineNo++;
                });

                //console.log(mergeObjectsArray);
                
                sheet['!cols'] = wscols;
                sheet['!merges'] = mergeObjectsArray;
                sheet['!ref'] = XLSX.utils.encode_range({ s: 'A1', e: endLoc });
                console.log('----->',sheet);
                var workbook = {
                    SheetNames: ['Sheet1'],
                    Sheets: {
                        Sheet1: sheet
                    }
                };

                var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
                var wbout = XLSX.write(workbook, wopts);

                saveAs(new Blob([s2ab(wbout)], { type: "" }), filename + "_" + moment().format() + ".xlsx");


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
                amo: "Amount",
                amount: "Amount",
                averagePricing: "Average Pricing",
                blank: " ",
                blank1: " ",
                blank2: " ",
                blank3: " ",
                booked: "Booked",
                combined: "Parts & Labor Combined",
                cost: "Cost of Parts",
                count: "Count",
                cus: "Customer",
                customer: "Customer",
                currentMonth: $filter('monthName')(selectedMonth) + ' ' + selectedYear,
                customerPay: "Customer Pay",
                deal: "Deal",
                expenses: "Expenses",
                fi: "F&I",
                finalized: "Finalized",
                financial: "Financial",
                finres: "Financial Reserve",
                first: "1st Quarter of Month",
                fleet: "Fleet",
                fouth: "4th Quarter of the Month",
                gp: "Gross Profit & Financial",
                grossprofit: "Gross Profit",
                grossProfitByLabor: "Gross Profit By Labor Type",
                grossProfitByTicket: "Gross Profit By Ticket",
                grossProfitRatio: "Gross Profit Ratio",
                hours: "Hours",
                income: "F&I Income",
                info: " ",
                internal: "Internal",
                inv: "Invoice",
                inventory: "Inventory",
                inventoryMetrics: "Inventory Metrics",
                invoice: "Invoice",
                labor: "Labor",
                lease: "Lease",
                leased: "Leased",
                lessThan30: "Less Than 30 Days",
                metrics: "Metrics",
                moreThan90: "More Than 90 Days",
                monthly: "Monthly",
                mtd: "Month to Date",
                new: "New",
                newCar: "New Car",
                opcode: "Opcode",
                part: "Part",
                parts: "Parts",
                payytpe: "Payment",
                pending: "Pending",
                physicalPU: "Physical Part Units",
                pOwned: "Certified Pre-Owned",
                previousMonth: $filter('monthName')(moment().month(selectedMonth - 1).subtract(1, 'months').endOf('month').month() + 1) + ' ' + moment().subtract(1, 'months').endOf('month').year(),
                product: "Product",
                products: "F&I Reserve and Products Sold",
                profitPerCPO: "Profit Per CPO Unit",
                profitPerRetail: "Profit Per Retail Unit",
                profitPerUnitLeased: "Profit Per Unit Leased",
                profitPerUnitRetailed: "Profit Per Unit Retailed",
                profitPerWholesale: "Profit Per Wholesale Unit",
                purchase: "Purchase",
                purchased: "Purchased",
                quantity: "Quantity",
                range1: "Less than 30 Days",
                range2: "31 to 60 Days",
                range3: "61 to 90 Days",
                range4: "More than 90 Days",
                retail: "Retail",
                ro: "Repair Orders",
                rocount: "RO Count",
                rodetails: "Repair Order Details",
                rotickets: "RO & Tickets",
                sales: "Sales",
                salesp: "Sales Personnel",
                salesperson: "Salesperson",
                salesPersonnel: "Sales Personnel",
                second: "2nd Quarter of the Month",
                service: "Service",
                status: "Deal Status",
                sto: "Store",
                store: "Store",
                third: "3rd Quarter of the Month",
                ticketMetrics: "Ticket Metrics",
                total: "Total",
                totalInventory: "Total Inventory",
                trade: "Trade-In",
                tradeIn: "Trade-In",
                type: "Deal Type",
                unitssold: "Units Sold",
                uniquePN: "Unique Part Numbers",
                used: "Used",
                usedCar: "Used Car",
                vehicle: "Vehicle",
                warranty: "Warranty",
                warrantyPay: "Warranty Pay",
                wholesale: "Wholesale",
                yearToDate: 'January ' + selectedYear + ' - ' + $filter('monthName')(selectedMonth) + ' ' + selectedYear,
                ytd: "Year to Date",
                "31to60": "31 to 60 Days",
                "61to90": "61 to 90 Days"
            };

            return category[codeName];
        };

        function resolveSubcategory(codeName) {

            var subcategory = {
                blank: " ",
                counterretail: "Counter Retail",
                customerpay: "Customer Pay",
                info: " ",
                internalpay: "Internal Pay",
                lease: "Lease Deals",
                other: "Other",
                purchase: "Purchase Deals",
                subinfo: " ",
                sublet: "Sublet",
                total: "Total",
                warrantypay: "Warranty Pay",
                wholesale: "Wholesale",
                ytd: "Year to Date",

            };

            return subcategory[codeName];
        };

        return XLSFactory;

    };

})(); 