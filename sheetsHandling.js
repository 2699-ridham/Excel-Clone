let addSheetIcon=document.querySelector(".sheet_add_icon");
let sheetsFolderCont=document.querySelector(".sheet_folder_container");
addSheetIcon.addEventListener("click",function(){
    let sheet = document.createElement("div");
    sheet.setAttribute("class","sheet_folder");

    let allSheetFolders = document.querySelectorAll(".sheet_folder");
    sheet.setAttribute("id",allSheetFolders.length);

    sheet.innerHTML=`
    <div class="sheet_content">Sheet ${allSheetFolders.length+1}</div>`;

    sheetsFolderCont.appendChild(sheet);
    sheet.scrollIntoView();

    createSheetDB();
    createGraphComponent();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
});

function handleSheetDB(sheetIdx){
    sheetDB=collectedSheetDB[sheetIdx];
    graphComponentMatrix=collectedGraphComponent[sheetIdx];

}

function handleSheetProperties(){
    for(let i=0;i<100;i++){
        for(let j=0;j<26;j++){

            let col=String.fromCharCode(65+j);
            let cell = document.querySelector(`.grid .cell[rId='${i+1}'][cId='${col}']`);
            cell.click();

        }
    }
    //get first element
    let firstCell = document.querySelector(".grid .cell[rId='1'][cId='A']");
    firstCell.click();
    firstCell.focus();
}

function handleSheetUi(sheet){
    let allSheetFolders = document.querySelectorAll(".sheet_folder");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].style.backgroundColor="transparent";
    }
    sheet.style.backgroundColor="#ced6e0";

    
}

function handleSheetUiRemoval(sheet){

    sheet.remove();

    let allSheetFolders = document.querySelectorAll(".sheet_folder");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].setAttribute("id",i);
        let sheetContent=allSheetFolders[i].querySelector(".sheet_content");
        sheetContent.innerText = `Sheet ${i+1}`;
        allSheetFolders[i].style.backgroundColor="transparent";
    }

    allSheetFolders[0].style.backgroundColor="#ced6e0";

}

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",function(e){
        if(e.button!=2){
            return;
        }

        let allSheetFolders = document.querySelectorAll(".sheet_folder");
        if (allSheetFolders.length === 1) {
            alert("You need to have atleast one sheet!!");
            return;
        }
        let response=confirm("Your Sheet will be removed permanently, Are You Sure?");
        if(response==false){
            return;
        }
        
        let sheetIdx = Number(sheet.getAttribute("id"));
        //DB
        collectedSheetDB.splice(sheetIdx,1);
        collectedGraphComponent.splice(sheetIdx,1);

        //UI
        handleSheetUiRemoval(sheet);

        //By default DB to sheet 1 (active)
        sheetDB=collectedSheetDB[0];
        graphComponentMatrix=collectedGraphComponent[0];
        handleSheetProperties();
    })

}

function handleSheetActiveness(sheet){
    sheet.addEventListener("click",function(){
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties();
        handleSheetUi(sheet);

    });
}

function createSheetDB(){

    let sheetDB=[];

for(let i=0;i<100;i++){
    let sheetRow=[];
    
    for(let j=0;j<26;j++){
        let cellProp={
            bold:false,
            italic:false,
            underline:false,
            alignment:"left",
            fontFamily:"Calibri",
            fontSize:"14",
            fontColor:"#000000",
            BGColor:"#FFFFFF",
            value:"",
            formula:"",
            children:[]
        }
        sheetRow.push(cellProp);

    }
    sheetDB.push(sheetRow);

}
collectedSheetDB.push(sheetDB);

}

function createGraphComponent(){

    let graphComponentMatrix=[];
for(let i=0;i<100;i++){
    let row=[];
    for(let i=0;i<26;i++){
        // Why Array -> more than 1 cild relation(dependency)
        row.push([]);
    }
    graphComponentMatrix.push(row);
}

collectedGraphComponent.push(graphComponentMatrix);
}