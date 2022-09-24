//JAVASCRIPT
//top row
let topRow = document.querySelector(".top_row");
for(let i=0;i<26;i++){
    let div=document.createElement("div");
    div.setAttribute("class","cell");
    div.textContent=String.fromCharCode(65+i);
    topRow.appendChild(div);
}
//left col
let leftCol = document.querySelector(".left_col");
for(let i=1;i<=100;i++){
    let div=document.createElement("div");
    div.setAttribute("class","cell");
    div.textContent=i;
    leftCol.appendChild(div);
}

//2d grid
let grid=document.querySelector(".grid");
for(let i=0;i<100;i++){
    let row=document.createElement("div");
    row.setAttribute("class","row");
    for(let j=0;j<26;j++){
        let div=document.createElement("div");
        div.setAttribute("class","cell");
        div.setAttribute("contentEditable","true");
        div.setAttribute("spellcheck","false");
        // div.classList.add()
        div.setAttribute("rId",i+1);
        div.setAttribute("cId",String.fromCharCode(65+j));
        row.appendChild(div);
    }
    grid.appendChild(row);
}

//hover
// let topRowCell=document.querySelectorAll(".top_row .cell");
// for(let i=0;i<topRowCell.length;i++){
//     topRowCell[i].onmousemove=function(e){
//         let element=e.target;
//         element.style.backgroundColor="rgb(176, 204, 176)";
//     };
//     topRowCell[i].onmouseleave=function(e){
//         let element=e.target;
//         if(isREvent==true){
//             element.style.backgroundColor="rgb(235, 231, 231)";
//         }else{
//             element.style.backgroundColor="lightgrey";
//             isREvent=true;
//         }
//     };
// }
// let leftColCell=document.querySelectorAll(".left_col .cell");
// for(let i=0;i<leftColCell.length;i++){
//     leftColCell[i].onmousemove=function(e){
//         let element=e.target;
//         element.style.backgroundColor="rgb(176, 204, 176)";
//     };
//     leftColCell[i].onmouseleave=function(e){
//         let element=e.target;
//         if(isCEvent==true){
//             element.style.backgroundColor="rgb(235, 231, 231)";
//         }else{
//             element.style.backgroundColor="lightgrey";
//             isCEvent=true;
//         }
        
//     };
// }

//address input
let addressInput=document.querySelector(".address_input");
let cells=grid.querySelectorAll(".grid .cell");
//add event listener to all cells
for(let i=0;i<cells.length;i++){
    cells[i].addEventListener("click",function(){

        let prevAddress = addressInput.value;
        if(prevAddress!=""){
            let ridCidObj=getRidCidFromAddress(prevAddress);
            
            let prevCell=document.querySelector(`.grid .cell[rId='${ridCidObj.rid}'][cId='${ridCidObj.cid}']`);
            prevCell.style.border="1px solid lightgrey";
            let trRid=document.querySelectorAll(".left_col .cell");
            for(let i=0;i<trRid.length;i++){
            if(trRid[i].textContent==ridCidObj.rid){
                trRid[i].style.backgroundColor="#ecf0f1";
                trRid[i].style.borderRight="none";
                trRid[i].style.color="black";
                }
            }
            let lcCid=document.querySelectorAll(".top_row .cell");
            for(let i=0;i<lcCid.length;i++){
            if(lcCid[i].textContent==ridCidObj.cid){
                lcCid[i].style.backgroundColor="#ecf0f1";
                lcCid[i].style.borderBottom="none";
                lcCid[i].style.color="black";
                }
            }
        }


        let rId=cells[i].getAttribute("rId");
        let cId=cells[i].getAttribute("cId");
        let trRid=document.querySelectorAll(".left_col .cell");
        for(let i=0;i<trRid.length;i++){
            if(trRid[i].textContent==rId){
                trRid[i].style.backgroundColor="lightgrey";
                trRid[i].style.borderRight="1.5px solid #218c74";
                trRid[i].style.color="#218c74";
            }
        }
        let lcCid=document.querySelectorAll(".top_row .cell");
        for(let i=0;i<lcCid.length;i++){
            if(lcCid[i].textContent==cId){
                lcCid[i].style.backgroundColor="lightgrey";
                lcCid[i].style.borderBottom="3px solid #218c74";
                lcCid[i].style.color="#218c74";
                
            }
        }
        addressInput.value=cId+rId;

        let cCell=cells[i];
        cCell.style.border="1.5px solid #218c74";
    });
}

function getRidCidFromAddress(address){

    let cid=address.charAt(0);
    let rid=address.substring(1);

    return{
        rid:rid,
        cid:cid
    }

}