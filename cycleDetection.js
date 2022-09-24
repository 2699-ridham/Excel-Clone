//Storage -> 2D Matrix
let collectedGraphComponent=[];
let graphComponentMatrix=[];
// for(let i=0;i<100;i++){
//     let row=[];
//     for(let i=0;i<26;i++){
//         // Why Array -> more than 1 cild relation(dependency)
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }

function isGraphCyclic(graphComponentMatrix){

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

    for(let i=0;i<100;i++){
        for(let j=0;j<26;j++){
            if(visited[i][j]==false){
                let response=dfsCycleDetection(graphComponentMatrix,i,j,visited,dfsVisited);
                // Found cycle so return immediately, no need to explore more path
                if(response==true){
                    return [i,j];
                }
            }
        }
    }
    return null;
}

// Start -> vis(TRUE) dfsVis(TRUE)
// End -> dfsVis(FALSE)
// If vis[i][j] -> already explored path, so go back no use to explore again
// Cycle detection condition -> if (vis[i][j] == true && dfsVis[i][j] == true) -> cycle
// Return -> True/False
// True -> cyclic, False -> Not cyclic
function dfsCycleDetection(graphComponentMatrix,srcr,srcc,visited,dfsVisited){

    visited[srcr][srcc]=true;
    dfsVisited[srcr][srcc]=true;
    
    // A1 -> [ [0, 1], [1, 0], [5, 10], .....  ]
    for(let children=0;children<graphComponentMatrix[srcr][srcc].length;children++){
        let [crid,ccid]=graphComponentMatrix[srcr][srcc][children];

        if(visited[crid][ccid]==false){
            let response=dfsCycleDetection(graphComponentMatrix,crid,ccid,visited,dfsVisited);
            // Found cycle so return immediately, no need to explore more path
            if(response==true){
                return true;
            }
        }
        else if(visited[crid][ccid]==true && dfsVisited[crid][ccid]==true){
            // Found cycle so return immediately, no need to explore more path
            return true;
        }

    }

    dfsVisited[srcr][srcc]=false;

    return false;

}