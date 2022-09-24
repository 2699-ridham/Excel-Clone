// Color Tracking -> using delay and await
async function isGraphCyclicTracePath(graphComponentMatrix,cycleResponse){
    let [srcr,srcc]=cycleResponse;
    let visited=[];
    let dfsVisited=[];

    for(let i=0;i<100;i++){
        let visitedRow=[];
        let dfsVisitedRow=[];
        for(let i=0;i<26;i++){
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    let response= await dfsCycleDetectionTracePath(graphComponentMatrix,srcr,srcc,visited,dfsVisited);
    if(response==true){
        return Promise.resolve(true);
    }
    return Promise.resolve(false);

}
function colorPromise(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve();
        },1000);
    });
}
setTimeout(function(){

},1000);


async function dfsCycleDetectionTracePath(graphComponentMatrix,srcr,srcc,visited,dfsVisited){

    visited[srcr][srcc]=true;
    dfsVisited[srcr][srcc]=true;

    let row=srcr+1;
    let col=String.fromCharCode(65 + srcc);

    let cell=document.querySelector(`.grid .cell[rId='${row}'][cId='${col}']`);
    cell.style.backgroundColor="lightblue";
    await colorPromise();

    for(let children=0;children<graphComponentMatrix[srcr][srcc].length;children++){
        let [crid,ccid]=graphComponentMatrix[srcr][srcc][children];

        if(visited[crid][ccid]==false){
            let response= await dfsCycleDetectionTracePath(graphComponentMatrix,crid,ccid,visited,dfsVisited);
            if(response==true){
                cell.style.backgroundColor="white";
                await colorPromise();
                return Promise.resolve(true);
            }
        }
        else if(visited[crid][ccid]==true && dfsVisited[crid][ccid]==true){
            let row=crid+1;
            let col=String.fromCharCode(65 + ccid);

            let cyclicCell=document.querySelector(`.grid .cell[rId='${row}'][cId='${col}']`);
            cyclicCell.style.backgroundColor="lightsalmon";
            await colorPromise();
            cyclicCell.style.backgroundColor="white";
            
            await colorPromise();
            cell.style.backgroundColor="white";
            return Promise.resolve(true);
        }

    }

    dfsVisited[srcr][srcc]=false;

    return Promise.resolve(false);

}