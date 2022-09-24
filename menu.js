let collectedSheetDB=[];
let sheetDB=[];

{
    let addSheetIcon=document.querySelector(".sheet_add_icon");
    addSheetIcon.click();
}

// for(let i=0;i<100;i++){
//     let sheetRow=[];
    
//     for(let j=0;j<26;j++){
//         let cellProp={
//             bold:false,
//             italic:false,
//             underline:false,
//             alignment:"left",
//             fontFamily:"Calibri",
//             fontSize:"14",
//             fontColor:"#000000",
//             BGColor:"#FFFFFF",
//             value:"",
//             formula:"",
//             children:[]
//         }
//         sheetRow.push(cellProp);

//     }
//     sheetDB.push(sheetRow);

// }
// console.log(sheetDB[0][0]);

let activeColorProp="#d1d8e0";
let inactiveColorProp="#ecf0f1";


//font size
let fontSizeInput=document.querySelector(".font_size_input");
//change event
fontSizeInput.addEventListener("change",function(){
    let fontSize=fontSizeInput.value;
    let address=addressInput.value;

    let ridCidObj=getRidCidFromAddress(address);
    let rowNo=(ridCidObj.rid) - 1 ;
    let colNo=(ridCidObj.cid).charCodeAt(0) - 65 ;
    let cellProp=sheetDB[rowNo][colNo];
    cellProp.fontSize = fontSize;//data change

    let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
    toBeChangedCell.style.fontSize=cellProp.fontSize+"px";
    fontSize=cellProp.fontSize;
})

//font family
let fontFamilyInput=document.querySelector(".font_family_input");
//change event
fontFamilyInput.addEventListener("change",function(){
    let fontFamily=fontFamilyInput.value;
    let address=addressInput.value;
    let ridCidObj=getRidCidFromAddress(address);
    let rowNo=(ridCidObj.rid) - 1 ;
    let colNo=(ridCidObj.cid).charCodeAt(0) - 65 ;
    let cellProp=sheetDB[rowNo][colNo];
    cellProp.fontFamily = fontFamily;//data change
    
    let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
    toBeChangedCell.style.fontFamily=cellProp.fontFamily;
    fontFamily=cellProp.fontFamily;
})

//bold
let boldFont=document.querySelector(".bold");
boldFont.addEventListener("click",function(){
    let address=addressInput.value;
    let ridCidObj=getRidCidFromAddress(address);
    let rowNo=(ridCidObj.rid) - 1 ;
    let colNo=(ridCidObj.cid).charCodeAt(0) - 65 ;
    let cellProp=sheetDB[rowNo][colNo];
    cellProp.bold = !cellProp.bold;//data change
    let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
    toBeChangedCell.style.fontWeight=cellProp.bold?"bold":"normal";
    boldFont.style.backgroundColor=cellProp.bold?activeColorProp:inactiveColorProp;
})
//underline
let underlineFont=document.querySelector(".underline");
underlineFont.addEventListener("click",function(){
    let address=addressInput.value;
    let ridCidObj=getRidCidFromAddress(address);
    let rowNo=(ridCidObj.rid) - 1 ;
    let colNo=(ridCidObj.cid).charCodeAt(0) - 65 ;
    let cellProp=sheetDB[rowNo][colNo];
    cellProp.underline = !cellProp.underline;//data change
    let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
    toBeChangedCell.style.textDecoration=cellProp.underline?"underline":"none";
    underlineFont.style.backgroundColor=cellProp.underline?activeColorProp:inactiveColorProp;
})
//italic
let italicFont=document.querySelector(".italic");
italicFont.addEventListener("click",function(){
    let address=addressInput.value;
    let ridCidObj=getRidCidFromAddress(address);
    let rowNo=(ridCidObj.rid) - 1 ;
    let colNo=(ridCidObj.cid).charCodeAt(0) - 65 ;
    let cellProp=sheetDB[rowNo][colNo];
    cellProp.italic = !cellProp.italic;//data change
    let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
    toBeChangedCell.style.fontStyle=cellProp.italic?"italic":"normal";
    italicFont.style.backgroundColor=cellProp.italic?activeColorProp:inactiveColorProp;
})

//alignment
let alignment=document.querySelectorAll(".alignment");
leftAlign=alignment[0];
centerAlign=alignment[1];
rightAlign=alignment[2];
alignment.forEach((alignElem) => {
    alignElem.addEventListener("click",(e)=>{
        let alignValue=e.target.classList[0];
        let address=addressInput.value;
        let ridCidObj=getRidCidFromAddress(address);
        let rowNo=(ridCidObj.rid) - 1 ;
        let colNo=(ridCidObj.cid).charCodeAt(0) - 65 ;
        let cellProp=sheetDB[rowNo][colNo];
        cellProp.alignment = alignValue;
        let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
        toBeChangedCell.style.textAlign=cellProp.alignment;
    
        switch(alignValue){
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp; 
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;

        }

    });
});
// alignRight.addEventListener("click",function(){
//     let address=addressInput.value;
//     let ridCidObj=getRidCidFromAddress(address);
//     let rowNo=(ridCidObj.rid) - 1 ;
//     let colNo=(ridCidObj.cid).charCodeAt(0) - 65 ;
//     let cellProp=sheetDB[rowNo][colNo];
//     cellProp. = !cellProp.underline;
//     let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
//     toBeChangedCell.style.textAlign="right";
// })
// //align center
// let alignCenter=document.querySelector(".fa-align-center");
// alignCenter.addEventListener("click",function(){
//     let address=addressInput.value;
//     let ridCidObj=getRidCidFromAddress(address);
//     let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
//     toBeChangedCell.style.textAlign="center";
// })
// //align justify
// // let alignJustify=document.querySelector(".fa-align-justify");
// // alignJustify.addEventListener("click",function(){
// //     let address=addressInput.value;
// //     let ridCidObj=getRidCidFromAddress(address);
// //     let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
// //     toBeChangedCell.style.textAlign="justify";
// // })
// //align left
// let alignLeft=document.querySelector(".fa-align-left");
// alignLeft.addEventListener("click",function(){
//     let address=addressInput.value;
//     let ridCidObj=getRidCidFromAddress(address);

//     let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
//     toBeChangedCell.style.textAlign="left";
// })

//text color
let textColor=document.querySelector(".fontColor");
textColor.addEventListener("change",function(){
    let address=addressInput.value;
    let fontColor=textColor.value;
    let ridCidObj=getRidCidFromAddress(address);
    let rowNo=(ridCidObj.rid) - 1 ;
    let colNo=(ridCidObj.cid).charCodeAt(0) - 65 ;
    let cellProp=sheetDB[rowNo][colNo];
    cellProp.fontColor = fontColor;
    let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
    toBeChangedCell.style.color=cellProp.fontColor;
    fontColor=cellProp.fontColor;
})
//bg color
let bgColor=document.querySelector(".BGcolor");
bgColor.addEventListener("change",function(){
    let address=addressInput.value;
    let BGColor=bgColor.value;
    let ridCidObj=getRidCidFromAddress(address);
    let rowNo=(ridCidObj.rid) - 1 ;
    let colNo=(ridCidObj.cid).charCodeAt(0) - 65 ;
    let cellProp=sheetDB[rowNo][colNo];
    cellProp.BGColor = BGColor;
    let toBeChangedCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
    toBeChangedCell.style.backgroundColor=cellProp.BGColor;
    BGColor=cellProp.BGColor;
})

let allCells=document.querySelectorAll(".cell");
for(let i=0;i<allCells.length;i++){
    addListenerToAttachCellProp(allCells[i]);
}

function addListenerToAttachCellProp(cell){
    cell.addEventListener("click",(e) => {
        let address=addressInput.value;
        let ridCidObj=getRidCidFromAddress(address);
        let rowNo=(ridCidObj.rid) - 1 ;
        let colNo=(ridCidObj.cid).charCodeAt(0) - 65 ;
        let cellProp=sheetDB[rowNo][colNo];

        //apply cell properties
        cell.style.fontSize=cellProp.fontSize + "px";
        cell.style.fontFamily=cellProp.fontFamily;
        cell.style.fontWeight=cellProp.bold?"bold":"normal";
        cell.style.fontStyle=cellProp.italic?"italic":"normal";
        cell.style.textDecoration=cellProp.underline?"underline":"none";
        cell.style.textAlign=cellProp.alignment;
        cell.style.color=cellProp.fontColor;
        cell.style.backgroundColor=cellProp.BGColor;


        //apply properties to ui containers
        fontSizeInput.value=cellProp.fontSize;
        fontFamilyInput.value=cellProp.fontFamily;
        boldFont.style.backgroundColor=cellProp.bold?activeColorProp:inactiveColorProp;
        underlineFont.style.backgroundColor=cellProp.underline?activeColorProp:inactiveColorProp;
        italicFont.style.backgroundColor=cellProp.italic?activeColorProp:inactiveColorProp;
        textColor.value=cellProp.fontColor;
        bgColor.value=cellProp.BGColor;
        switch(cellProp.alignment){
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp; 
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;

        }
        
        let formulaInput=document.querySelector(".formula_input");
        formulaInput.value=cellProp.formula;
        // cell.value=cellProp.value;
        cell.textContent=cellProp.value;

    })
}

function getCell(address){

    let ridCidObj=getRidCidFromAddress(address);
    let cell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
    let rowNo=(ridCidObj.rid) - 1 ;
    let colNo=(ridCidObj.cid).charCodeAt(0) - 65 ;
    let cellProp=sheetDB[rowNo][colNo];
    
    return [cell,cellProp];

}

//get first element
let firstCell = document.querySelector(".grid .cell[rId='1'][cId='A']");
firstCell.click();
firstCell.focus();

function decodeRidAndCidFromAddress(address){

    let rid=Number(address.slice(1) - 1);
    let cid=Number(address.charCodeAt(0)) - 65;
    return [rid,cid];

}