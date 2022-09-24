let ctrlKey;
document.addEventListener("keydown",function(e){
    ctrlKey=e.ctrlKey;
});
document.addEventListener("keyup",function(e){
    ctrlKey=e.ctrlKey;
});

for(let i=0;i<100;i++){
    for(let j=0;j<26;j++){
        let col=String.fromCharCode(65+j);
        let cell = document.querySelector(`.grid .cell[rId='${i+1}'][cId='${col}']`);
        handleSelectedCells(cell);
    }
}

let rangeStorage=[];
function handleSelectedCells(cell){

    cell.addEventListener("click",function(){
        if(!ctrlKey){
            return;
        }
        
        
        if(rangeStorage.length>=2){
            defaultSelectedCellsUi();
            rangeStorage=[];
        }

        //UI
        cell.style.border= "3px solid #218c74";

        let rid=Number(cell.getAttribute("rid")-1);
        let cid=Number(cell.getAttribute("cid").charCodeAt(0)-65);
        rangeStorage.push([rid,cid]);
        // console.log(rangeStorage); 
    })
}

function defaultSelectedCellsUi(){
    for(let i=0;i<rangeStorage.length;i++){
        let col=String.fromCharCode(65+rangeStorage[i][1]);
        let cell = document.querySelector(`.grid .cell[rId='${rangeStorage[i][0]+1}'][cId='${col}']`);
        cell.style.border="1px solid lightgrey";

    }
}

let copyBtn=document.querySelector(".copy");
let cutBtn=document.querySelector(".cut");
let pasteBtn=document.querySelector(".paste");

let copyData=[];
copyBtn.addEventListener("click",function(){

    if (rangeStorage.length < 2){
        return;
    } 
    copyData = [];

    let strow=rangeStorage[0][0];
    let stcol=rangeStorage[0][1];
    let endrow=rangeStorage[1][0];
    let endcol=rangeStorage[1][1];

    for(let i=strow;i<=endrow;i++){
        let copyRow=[];
        for(let j=stcol;j<=endcol;j++){
            let cellProp=sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }
    
    defaultSelectedCellsUi();
});

cutBtn.addEventListener("click", function(e){
    if (rangeStorage.length < 2) return;

    let [strow, stcol, endrow, endcol] = [ rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1] ];

    for (let i = strow;i <= endrow;i++) {
        for (let j = stcol;j <= endcol;j++) {
            let col=String.fromCharCode(65+j);
            let cell = document.querySelector(`.grid .cell[rId='${i+1}'][cId='${col}']`);

            // DB
            let cellProp = sheetDB[i][j];
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontSize = 14;
            cellProp.fontFamily = "Calibri";
            cellProp.fontColor = "#000000";
            cellProp.BGColor = "#FFFFFF";
            cellProp.alignment = "left";

            // UI
            cell.click();
        }
    }

    defaultSelectedCellsUi();
});

pasteBtn.addEventListener("click" ,function(e){
    // Past cells data work
    if (rangeStorage.length < 2) return;

    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

    // Target
    let address = addressInput.value;
    let [stRow, stCol] = decodeRidAndCidFromAddress(address);


    // r -> refers copydata row
    // c -> refers copydata col
    for (let i = stRow,r = 0;i <= stRow+rowDiff;i++,r++) {
        for (let j = stCol,c = 0;j <= stCol+colDiff;j++,c++) {
            let col=String.fromCharCode(65+j);
            let cell = document.querySelector(`.grid .cell[rId='${i+1}'][cId='${col}']`);
            // console.log(cell);
            if (!cell) continue;

            // DB
            let data = copyData[r][c];
            let cellProp = sheetDB[i][j];

            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontColor = data.fontColor;
            cellProp.BGColor = data.BGColor;
            cellProp.alignment = data.alignment;

            // UI
            cell.click();
        }
    }
});