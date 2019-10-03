(function () {

    'use strict';

    angular
        .module('app.diGrid')
        .factory('XLSFactory', XLSFactory);

   function XLSFactory($filter) {
    console.log($filter, '$filter')
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
                
                console.log(filename, 'filename');
                console.log('rows----->', rows);
                console.log(selectedMonth);
                console.log(selectedYear);

                let sheet = [];
                let colorCategory = [];
                let columns = [];

                const imageData = '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';
                const imageData1 = 'iVBORw0KGgoAAAANSUhEUgAAAhQAAABBCAMAAAC+eM26AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEaUExURf//////tmYAAAAAZrb/////6mZwwABwwABw1f//27ZmAAAAAAA6kNv////bkGY6AGa2/7aQZjo6AAAAOjpmkLbb///btpBmOjoAAAA6Oma229u2kGY6Ojo6ZraiwACi6tuQOv/o4DpwwJA6ADo6OjpmtrZmOgBmtv//9ZCKwACK4AA6ZpC22zqQttu2Zv+2ZmZmZgBmZgBwypDo/2aQ2zqQ22a2tpDb/5Dbttu6ypDS/9vS1f/o9baiyjqK1bbo9f/S1WbS///o6maKymbS9ba61Tqi6tv/2zqKyjqi1Tq64GaKwDq69WZmOrbo/5DS9dvS4La6ytu2tpBmZmaQttuQZpDb22ZmADpmZraQOtvo6jqi4Nvb/wAAAD1UTo0AAABedFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wCxyC4mAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGQElEQVR4Xu2ZC3PTRhSFFUNQbSUO4OI6pAl2iNE0KUmqllIGmEkKpUwf9EHf9P//jp577+5qV5Zst5GtJr4fM0S72tXuPTr7kiNFURRFURRFURRFURRFURRFURRFURRFURRFURTl/89a69p1c6kogprikrF+I2ay9y783tqdRNjYNDmGuk3R3UpumkuP9q3bSdJ7/46k+h8MkmT7riSCKjsfoou7pli97ImWRHbP5FUCtTyhhkkyn0jLCH60b6KowRT3k94BMTYZlnpN0X6AuCZ16beS5ABaXOOIu7iiVMr3/CpQv3dQ+oSL85HRkjgsjIwiUMvrxBp6P49Iywm+XlOUN1arKWD7o9slDXV3P8b/OwOWAho/xEs5lvD9KidJghGESa3eyUvwZop41kwBtU7zqWKYfDKPSEsKHqbIPjXXF2Qppmjf731W2RCQgE+M3B1SKajSSR7RHwhX+YiLMa+g6NHnrd5jm+h9MYdIywrej+FJmj3+cT++h0c+e76fpdnrN5Q9iuPzL19gmTyPoq9Q/BU3+Xwi9rC7vK4dkYHZFDtbdi1ba218jRntEWY5keFE5jlZFsf0cFtkKHeCJ+/cKTQUMmRdTPR4NKW8Kp4+8uja8QWFipBNVCwKRj2x8ZEEZuTkKjQYfGCKLH6d8mo4GsscmL5C9lkav5NF5ptv+Q/NjLRB/Y5rOYLuYl07Ov0+SWh/gXhxhbWMB8Za62gr6Q3Sgil4IYQg5HJbpDuQoWRLGqbrgge4AvYBLscNEi63CDxBrYoxqVgUjHrk4uokN8UUngoNBh+YggLI0sPN0RjeEM6jZyOXMFCFGaZYk5mxz3/QGTIv7lNfKMUb44IpeFmEKHiGLYIabHo3ogS/oQJSw7TuXdgq9olodGGmSI2ggYqlprC96Q42No0pchXszQaChykEDH8yxeGbaDPay+IMz8NSQtPGWZohe/0n3M1eRk+RiRjLlw85feB9Dk3z/Nc6VKyLlNwLTWHguc8VEUtjXZToDFN0kQnU08WUdFWw7NIi1heDLoB8lO3FGauI+YKOIiXLh307pJJZPgRWobngC6bgg9Q6jlZs6jPsK67TnoKyqSQ53t6cAG0LCKiT7J4SW/TCbbzSORd9qSmMi0wRCZAGEicN1bpgiJGbpuiCnGSbzmsLN4UTCvqVHO24R9I/DjcwhVGhqeALpuCD1PoNMwPiJsLBnoJMgfmPc3HuqjSF7S4uLaEp/DdeNEX757fkIr+IHTIUbE6lLgiaH+XpYi7yKu0HEGX7l199J9ZJbgqn4rjSFAgN3eD/nEhOheaCdzGAJ3FqTGHy2BS0p/gPpvB6Ppcp+BsL4Rfh+dUFZ6nSBfkpjwA3Rib2Wo6i1rXh9hS5ilNMQR2UBUJi9lVoLvjQFHamsMtHKjNF9m9NISa3eKZAgQpTYEH8jf8EpiBNJrZFFbog2xTElTQvpzJQrFLxiBrwZgqrYvXywT2V+CRmX4Xmgi8zBd57mv0gG01kmD1FwRTTv1MEhx7rXbvRNH21g8B8ZJEyBVMgnQYGI8qDQq5r0zbvDuTFKhNa10YuqFURG02StWyjyW/ud77gmAMVmgu+1BQjnDdS/JPTZ+mewo2DHL9tbHrG1HD/Lba7MEUPJxJseqmX7o2jPCY8mjDFFBS9bJY8U8BIZkLJyRvyvsIgMw/V7LmO5csIcFX6/AHtmE++C8E7kgYqFgUzPYI2MqCtKXIVmgs+NIXsKdgeFEtKHzHL9xQzTAE30kZXvlfJtygk8uhdGeT+MaDgkNjFBquwp6CH5rETf+LMSz/rHDxEwtNlSO0xdAMp/k2IP4j4VXCDE3xjEXiCiorQkY7wFaagDrEBJGZfheaC903x1M4UUfTXCywd2Tv+QIuZgr58h6aYsXzAlfzzLf+YS1+tbyElv+x6b1y+fXfZFJzYvntSMAUFEvja/j7PiniTKykhyNO834j9Ktyt3vhvvrEIfEF9FSuWD5oNeECbmD0VwGULflnY7WgZE1vzq8ZKBz+FwlfegFlHq0vPSgdfjTt1l4Blye2uriQrHfwU3GG7hJNepWRXg5UOfgod/vF9RVnp4BVFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFURRFUZQo+gddhPkbCLhg+AAAAABJRU5ErkJggg==';
                const imageData2 = 'iVBORw0KGgoAAAANSUhEUgAAAd8AAABaCAMAAADO1Ky1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFTUExURf//////tmYAAAAAZrb////o4DpwwABwwDqKyma66tv//7ZmAAAAAAAAOmaQ29uQOgBmtv//29u2Zjo6OjpmkLbb/zo6AP/S1QBwyma69f//9ZCKwJDS/5A6AP/btmY6ADoAADqQ2wA6Ojq69WbS/wA6ZtvbkP+2ZpDb/zo6ZpDo///o9ba61ZC2kAA6kJBmkACi6v/o6maKygCKymbS9baiyjqi6pC61TqKwNu6ytvS1ZCiwJCiyraiwJBmOpC222a2///bkLaQZjpmttv/27ZmOma22wCK4Ga64Dqi1Tq64GaKwGai1f//6mZwwGZmZmZmOgBw1bbo/zqi4Dpwytvo/7a6ygCK1WZmANu2tpBmZtvb/5Db29vS4JDbtrZmZjpmZmYAOmaQttu2kGY6OjqK1ZDS9dvo6rbo9du61f+2kP/b27a222Y6kDo6kDqQtgAAACGdfgYAAABxdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AKUzAZQAAAAlwSFlzAAAOxAAADsQBlSsOGwAACnBJREFUeF7tnP9zFMcRxVdYsDLai/akmNsqGSETsFBcIRJYLgQmQBRKVIiwAZsyTkjimLKTkOT//zHvdffszu7tCu50Z7hzf8rFzZeeXmne9szsyduJ4ziO4ziO4ziO4ziO4ziO846xcOq9RSs6c8hc6rt7JhWW3j9rLW+f5az3Cy2tZLkW3oz+6lqW9X75gVU7WT3XZjaX+g5UXlDctaYRWc+LK1Ycja6B/fNZZjM9mr4bFyDb2maWfWQNHSxn2UXcCE0151zfNP2VtY3E0XqRXrLySHQO7J/vnTNdR9J34VR2mTH58YXjddrKeryvVrd/JvoWv8Yy/R+s0yyMznqaj6Vvsl60D4S+v9kUCUbTdzm7qntM/7fH6rTcEd/zrK8G8g4Lu9dQui4z/ypPL32yB4vPZOJ279yQLlb20+LKi4N05xZaijSHDxrvXsuL4tMk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';
                const imageData3 = 'iVBORw0KGgoAAAANSUhEUgAAAPYAAABqCAMAAAC4aFzCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEUUExURf///7ZmAAAAAGa2/9u2ZjqQ2///tmYAAAA6kNv//wAAZrb//9vS4GaKygBwwDqK1ZDS9To6AAAAOjpmkLbb///bkGY6ANuQOv//9baiwGbS/5CKwABwypDS/wA6Ojo6Ov//27ZmOpA6AJDb//+2Ztu6yjq69To6ZgA6ZjoAAACK4GaKwGaQ25Do///o9baiyjpwwLbo9dvS1QCi6v/o6gCKymbS9QBmtv/b2zpmttv/2//btpBmOpC229u2kP/S1Tqi6jqKyv//6mZwwGa222ZmZmZmOv/o4Lbo/wBw1Tpwytvo/wCK1WYAOmaQtpBmZraQOjqQttvo6pCiyjqKwNu61Tqi4LaQZmY6OpA6Otvb/wAAAJ2ix3sAAABcdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8Ag20X4AAAAAlwSFlzAAAOxAAADsQBlSsOGwAABndJREFUeF7tnA1T20YQhu0rMSUYTXFjmAQNdvgoGNrCNCHCdQrBJCGlk36kaZv2//+Qvrt3p7sTkoUlE8nMPZmB82kt7r3d29PHThoej8fj8Xg8n4mm+EK1UlkQD1TrXtFa/HJJNVNpLT5cVs2paa8EYfRge+L5b8XCqhCdrx+pTwXoriWcux570zlkPuREwwQeB0QUPUF7Iwi3ZW8BmkJs9oTg+TfjvT39p0K4KvpbHTkc55D9YUdMDodMdll1EITfNBrjjZDVF2JH8BgX9grKhgv3V13Z3YEU5RxyPrQW1cRMy0YQHODc7UPp7aCw7KatdHrZ8Oy3/S1XtjqLcyhhVzDKx1AKPzMc7mEUfof290dDtC7eUf9uFG63r6NnmJ3nK1EYncipOZKWmqaIVAvDZdhVp08HWPFD9hoy1I+IUNIyeonu/Z+oV3H2CJJcEVqTc8i1Wzd/dSogO3whm3KVs8PPhyG1ouAV+nfD6CLioMAEcPcz9I4vw3jCCGh9rZoLvYHo9HqktQt1PUp1FIutxf010RlgoOjef/NWiKH8giIh245g55D1oejiPicdJy/ou0o2fHh1LZvwPeZALf+DpbibZmZ8GUS2bIxF7Ok0roO8tShI/GiLR4dPcmqUoFFiZSZkdwdme8qSbdtMhRTLHqeI5wB+HHFKbx9LH+P4wbvGEpniN/+CiCOaIIv+SwS2ilste105ozsggZCtu93fikKy3Zm7Pe1DFk6e2whkJtcL/jQIfl4m2SST/MuzcnUcoTeFEQnnZaz16DyHgaIRX100xd4bYs1dmQnZdgBnyS6cysHzFfL3cuzt/qVy5NWQZUcBLWbIxgqXpMvGN1XGUrLN+Fi/lo1uTZWy5fKFYCUbblWyj5W3lWypGbD3U2nyWHNl2/JiPrtsGb/wNgc5uZWD/DxKyHZXcxo7fJlmZPNvNVAryGV3goTsO1zbV9evfoGgI07gck2POWmFX8mUBsHYwKRsHD5BShu3D2lSEvu2QiYxvbaTKU3p0N0JCsk2NlOAMFZAGekKovBJ4xSLOMI/ORna2+gOqRM/IZsChENC0np/SErOBizYyJUbmMxdsWzV3Rj95ty4JGTf4b4dy+bVSkvc3qoDTIElG3tWIK9XWHZo79u0J3dwmSIiOhF0dVal2+XlCg8ulo3RyvsWK0J/7/Woo9f7Q3UYdc4h167oVdqHPz9Cx4X683/RTk1D+7CCVvg3X5z+oDI5sLsT+/bpP1An9tT15gImgMc1+kQKX7NLjGx5cbpp36XiBk5idGhNziHXrvidZ33Jj+Byibym5IsquLRrjt4QMsnYCecc/ZwhCytZ3CtyMtbOvXS2x+PxeDwej8dTI3KuyX01Q3WUq2bo00OpxNfN/bYpYHDsavBMqVw1w2hRCHoC+dDSnVbN4NpV/3SlZDVDlx8+ng3sJ6Fp1QyuXfXP0pznO9PLVjRltEjUWdIKHbRd5VFetppBsm7L1ppSCh20XdHn5DNjBtUMwH5NlPlWBGi7yhc3Bla2moFPYlZH5jswy67gO7AZUr6agTosFRNkx3bFqxlmR9lqBoiw58EOYFe2savHa5Fy1QyIBvtzpmzLrh6ySR+NNVe2HbEadPPrUk2WbNuuLrKLVzPAxsgkMta2Y1eHtU3IJKbXdjKlKR32NqW5oTpDtmtXdSZvvf+VBlO4muGmaieAY9kJu6r3bdqTy1QzwHCzx0yuZkjYVX6VdrOa4SM1blvNoC5ogdGRVs2QsKvBnefMyY/guiTymZIvquqlfTfoDSGT1J1w7vHVDKn4agaPx+PxeDwej+eOybkm99UM1eGrGXKfD9wgrlKw3DexmoHtqn+6MpNqhu4tqxm0XfXP0pznO9PLVsh3SQp1lvRqBmlXeZTPqprBkq01pVYzSLv7Uc0AdUZG6lsRSWxX+eLGSEpXMyB1WSkt+7W+sav6HRjGUq6aofUvRYW9gaXLdu3mvpqBQkF/XWIHsCXbsavHa5Fy1QyN/gLWfOzhdNmEsauHbNJHY82VbWlwQK7jbxLZso1dXWSX+b8ZAAzjAMhOacZu7qsZJHHWA5Nka7uqM3nZaobm8D/87DetN/2p+3bCrup9mxJsmWoG3Mh0+LrGODWWalczJOzmvZqhcfYJPe6NZ1o1Q8KuBneeMyc/guuSyGdKvqiql/bdoDeETLJ3wnnGVzOk4qsZPB6Px3OPaDT+B6RB+iJ4uQ04AAAAAElFTkSuQmCC';
                const ex = ExcelBuilder.Builder;
                let drawings = new ExcelBuilder.Drawings();
                
                let artistWorkbook = ex.createWorkbook();
                let albumList = artistWorkbook.createWorksheet({name: 'Album List'});

                let stylesheet = artistWorkbook.getStyleSheet();

                const category2 = {
                    font: {
                        bold: true,
                        color: '0279d1',
                        size: 12,
                    },                  
                    "alignment": { "wrapText": true },
                    "fill": { "type": "pattern", "patternType": "solid", "fgColor": "F2F2F2F2" },
                };

                const categoryStyle2 = stylesheet.createFormat(category2);

                const category1 = {
                    font: {
                        bold: true,
                        color: '0279d1',
                        size: 12,
                    },
                    "alignment": { "wrapText": true },
                    "fill": { "type": "pattern", "patternType": "solid", "fgColor": "d9d9d9" },
                };

                const categoryStyle1 = stylesheet.createFormat(category1);

                var headerStyle = {
                    "font": { "size": 12, "fontName": "Calibri", "bold": true }
                };
                var header = stylesheet.createFormat(headerStyle);

                const cols1 = [{value: ''}, {value: ''}, {value:''}];
                const cols2 = [{value: ''}, {value: ''}, {value:''}];
                const cols3 = [{value: ''}, {value: ''}, {value:''}];
                const cols4 = [{value: ''}, {value: 'Sale Transactions - New Sales', metadata: {style: header.id}}];
                const cols5 = [{value: ''}, {value: ''}, {value:''}];
                    
                sheet.push(cols1);
                sheet.push(cols2);
                sheet.push(cols3);
                sheet.push(cols4);
                sheet.push(cols5);

                const category = [
                    [{value: ''},{value: ''},{value: ''}],
                    [{value: "Total"},
                    {value: ''},{value: ''},{value: ''}],
                    [{value: "Customer Pay"},
                    {value: ''},{value: ''},{value: ''}],
                    [{value: "Warranty Pay"},
                    {value: ''},{value: ''},{value: ''}],
                    [{value: "Internal Pay"},
                    {value: ''},{value: ''},{value: ''}],
                    [{value: "Sublet"},
                    {value: ''},{value: ''},{value: ''}],
                    [{value: "Other"},
                    {value: ''},{value: ''},{value: ''}],
                    [{value: "Year to Date"},
                    {value: ''}]
                ];

                category.forEach(function(item, i, arr) {
                    for (let selItem of item) {
                        if(i % 2 == 0){
                            colorCategory.push(Object.assign(selItem, {metadata: {style: categoryStyle2.id}}))                      
                        } else {
                            colorCategory.push(Object.assign(selItem, {metadata: {style: categoryStyle1.id}})) 
                        }
                    };
                  });

                console.log(category, 'category');
                console.log(colorCategory, 'category');

                const subcategory = [
                    {value: "#"},
                    {value: "Description"},
                    {value: ''},
                    {value: "Total"},
                    {value: "Change (Last Month) (%)"},
                    {value: "Change (Last Year) (%)"},
                    {value: ''},
                    {value: "Customer Pay"},
                    {value: "Change (Last Month) (%)"},
                    {value: "Change (Last Year) (%)"},
                    {value: ''},
                    {value: "Warranty Pay"},
                    {value: "Change (Last Month) (%)"},
                    {value: "Change (Last Year) (%)"},
                    {value: ''},
                    {value: "Internal Pay"},
                    {value: "Change (Last Month) (%)"},
                    {value: "Change (Last Year) (%)"},
                    {value: ''},
                    {value: "Sublet"},
                    {value: "Change (Last Month) (%)"},
                    {value: "Change (Last Year) (%)"},
                    {value: ''},
                    {value: "Other"},
                    {value: "Change (Last Month) (%)"},
                    {value: "Change (Last Year) (%)"},
                    {value: ""},
                    {value: "YTD"},
                    {value: "Change (Last Year) (%)"}
                ];

                const importantFormatter = stylesheet.createFormat({
                    font: {
                        bold: true,
                        color: '00000000',
                        size: 10
                    }
                });

                for (let item of subcategory) {
                    Object.assign(item, {metadata: {style: importantFormatter.id}})
                };

                for (let item of subcategory) {
                    if(item.value === ''){
                        columns.push({width: 1})
                    } else if (item.value === '#') {
                        columns.push({width: 5})
                    } else {
                        columns.push({width: 21})
                    }
                };
                albumList.setColumns([...columns]);

                const exw = new ExcelBuilder.Workbook;

                let picRef = exw.addMedia('image', 'strawberry.jpg', imageData);
                console.log(picRef,'picRef');

                var picture = new ExcelBuilder.Drawing.Picture();
                picture.createAnchor('twoCellAnchor', {
                    from: {
                        x: 1,
                        y: 1
                    },
                    to: {
                        x: 2,
                        y: 3
                    }
                });
                console.log(picture,'picture');
                picture.setMedia(picRef);
                drawings.addDrawing(picture);

                let picRef1 = exw.addMedia('image', 'strawberry1.jpg', imageData1);
                var picture1 = new ExcelBuilder.Drawing.Picture();
                picture1.createAnchor('twoCellAnchor', {
                    from: {
                        x: 15,
                        y: 3
                    },
                    to: {
                        x: 17,
                        y: 5
                    }
                });
                console.log(picture1,'picture1');
                picture1.setMedia(picRef1);
                drawings.addDrawing(picture1);

                let picRef2 = exw.addMedia('image', 'strawberry2.jpg', imageData2);
                var picture2 = new ExcelBuilder.Drawing.Picture();
                picture2.createAnchor('twoCellAnchor', {
                    from: {
                        x: 24,
                        y: 1
                    },
                    to: {
                        x: 26,
                        y: 4
                    }
                });
                picture2.setMedia(picRef2);
                drawings.addDrawing(picture2);

                let picRef3 = exw.addMedia('image', 'strawberry3.jpg', imageData3);
                var picture3 = new ExcelBuilder.Drawing.Picture();
                picture3.createAnchor('twoCellAnchor', {
                    from: {
                        x: 28,
                        y: 1
                    },
                    to: {
                        x: 29,
                        y: 5
                    }
                });
                picture3.setMedia(picRef3);
                drawings.addDrawing(picture3);

                let xlsData = [...sheet, colorCategory, subcategory, ...rows]

                albumList.setData(xlsData);

                albumList.addDrawings(drawings);
                artistWorkbook.addDrawings(drawings);
                artistWorkbook.addWorksheet(albumList);
                console.log(artistWorkbook);

                let photo = artistWorkbook.drawings[0].drawings[0].mediaData;
                let photo1 = artistWorkbook.drawings[0].drawings[1].mediaData;
                let photo2 = artistWorkbook.drawings[0].drawings[2].mediaData;
                let photo3 = artistWorkbook.drawings[0].drawings[3].mediaData;
                let image = Object.assign({'strawberry.jpg': photo}, {'strawberry1.jpg': photo1},
                                        {'strawberry2.jpg': photo2},{'strawberry3.jpg': photo3});

                console.log(image, 'image');
                Object.assign(artistWorkbook, {media: image});

                console.log(artistWorkbook);

                ex.createFile(artistWorkbook, {
                    type: "blob"
                }).then(function(xlsData) {
                    saveAs(new Blob([xlsData], {
                        type: "base64"
                    }), filename + ".xlsx");
                });
            },
        };

        function isUndefinedOrNull(val) {
            return angular.isUndefined(val) || val === null
        }

        return XLSFactory;
    };
})(); 