//
for(let i=0;i<100;i++){
    for(let j=0;j<26;j++){
        let col=String.fromCharCode(65+j);
        let cell = document.querySelector(`.grid .cell[rId='${i+1}'][cId='${col}']`);
        cell.addEventListener("blur",function(e){

            let address=addressInput.value;
            let [activeCell,cellProp]=getCell(address);
            let enteredData=activeCell.innerText;
            
            if(enteredData==cellProp.value){
                return;
            }
            cellProp.value=enteredData;
            // console.log(cellProp);
            // if data modifies remove P-C relation,formula empty,update children cells
            removeChildFromParent(cellProp.formula);
            cellProp.formula="";
            updateChildrenCells(address);
        })

    }
}

let formulaInput=document.querySelector(".formula_input");
formulaInput.addEventListener("keydown", async function(e){
    let formula=formulaInput.value;
    if(e.key=="Enter"&&formula){

// if change in formula,break old P-C relation,evaluate new formula,add new P-C relation
        let address=addressInput.value;
        let [cell,cellProp]=getCell(address);
        if(formula != cellProp.formula){
            removeChildFromParent(cellProp.formula);
        }
        addChildToGraphComponent(formula,address);
        // check is graph cylic
        let cycleResponse=isGraphCyclic(graphComponentMatrix);
        if(cycleResponse){
            // alert(" Your Formula is Cyclic");
            let response=confirm("Your Formula is Cyclic. Do you want to trace Cycle Path?");
            while(response==true){
                //keep on tracking color
                await isGraphCyclicTracePath(graphComponentMatrix,cycleResponse);
                response=confirm("Your Formula is Cyclic. Do you want to trace Cycle Path?");
            }

            removeChildFromGraphComponent(formula,address);
            return;
        }

        let evaluatedData=evaluateFormula(formula);
        // to update ui and cell prop in DB
        setCellUiAndCellProp(evaluatedData,formula,address);
        addChildToParent(formula);
        formulaInput.value="";
        updateChildrenCells(address);
    }

});

function addChildToGraphComponent(formula,childAddress){
    let [crid,ccid]=decodeRidAndCidFromAddress(childAddress);
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [prid,pcid]=decodeRidAndCidFromAddress(encodedFormula[i]);
            //rid -> i , cid -> j
            graphComponentMatrix[prid][pcid].push([crid,ccid]);

        }
    }
}

function removeChildFromGraphComponent(formula,childAddress){
    let [crid,ccid]=decodeRidAndCidFromAddress(childAddress);
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [prid,pcid]=decodeRidAndCidFromAddress(encodedFormula[i]);
            //rid -> i , cid -> j
            graphComponentMatrix[prid][pcid].pop();

        }
    }
}

//recursively update children cells
function updateChildrenCells(parentAddress){
    let [parentCell,parentCellProp]=getCell(parentAddress);
    let children = parentCellProp.children;

    for(let i=0;i<children.length;i++){
        let childAddress=children[i];
        let [childCell,childCellProp]=getCell(childAddress);
        let childFormula = childCellProp.formula;

        let evaluatedValue = evaluateFormula(childFormula);
        setCellUiAndCellProp(evaluatedValue,childFormula,childAddress);

        //recursive function
        updateChildrenCells(childAddress);

    }
}

function addChildToParent(formula){
    let childAddress=addressInput.value;
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [cell,parentCellProp]=getCell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula){
    let childAddress=addressInput.value;
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [cell,parentCellProp]=getCell(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx,1);
        }
    }

}

function evaluateFormula(formula){
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [cell,cellProp]=getCell(encodedFormula[i]);
            encodedFormula[i]=cellProp.value;
        }
    }
    let decodedFormula=encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUiAndCellProp(evaluatedData,formula,address){
    let [cell,cellProp]=getCell(address);
    //set ui data
    cell.innerText=evaluatedData;

    //set db data
    cellProp.value=evaluatedData;
    cellProp.formula=formula;

}