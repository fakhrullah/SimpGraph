/*
 * SimpleGraph
 * 
 * SimpleGraph is a engine to building graph for web using html syntax easily.
 * This engine is created using javascript, css, html5 canvas.
 * 
 * ---------------------------------------------
 * author:  Mohd Fakhrullah Mohd Padzil
 * version: 0.0.1 
 * ----------------------------------------------
 * 
 */

var SimpGraph = new Object();
window.onload = function (){
    // get class simpgraph
    var allGraph = document.getElementsByClassName("simpgraph").length;
    
    for(var i=0 ; i<allGraph; i++){
        var simpleGraph = document.getElementsByClassName("simpgraph")[i];
        // graph naming start by g0,g1, ... important for css height
        // simpleGraph.className += "g"+i; no need bcoz i add style on html
        SimpGraph.buildGraph(simpleGraph);
        
    }
}

SimpGraph.getData = function(element){
    
    
}
SimpGraph.buildGraph = function(element){
    
    // get must value ( e.g height,width,type) so that i can use as basic to create bars
    var graphType = element.getAttribute("data-sg-type");
    var graphWidth = element.getAttribute("data-sg-width");
    var graphHeight = element.getAttribute("data-sg-height");
    var graphValue = element.getAttribute("data-sg-value");
    
    //console.log(graphType+"-"+graphWidth+"-"+graphHeight+"-"+graphValue);
    //set width height for element
    element.setAttribute("style","width: "+graphWidth+"px; height: "+graphHeight+"px;");
    // get optional value
    
    // analysis data-sg-value (count to plot data)
    var allValue = SimpGraph.analysisGraphValue(graphValue,graphType,graphWidth,graphHeight);
    console.log(allValue);
    
    // bar width and height
    if(graphType == "bar-horizontal-css"){
        
        // get bar height only
        var barHeight = Math.floor( ( graphHeight-3*allValue.length /*minus margintopbottom*/) / allValue.length );
        //var barWidth = allValue;
        // for horizontal bar allValue means bar width
        // #build graph
        for( var i=0 ; i<allValue.length ; i++){
           //for css starting from bar1,bar2,..
           SimpGraph.addBar(element,i+1, allValue[i], barHeight); 
        }
        
    }else if (graphType == "bar-vertical-css"){
        // bar wrapper to position absolute from bottom for vertical graph
        var graphWrapper = document.createElement("div");
        graphWrapper.className = "graph-wrapper";
        element.appendChild(graphWrapper);
    
        element.className += " vbar";
        //get bar width only
        var barWidth = Math.floor( ( graphWidth-5*allValue.length /*minus margintopbottom*/) / allValue.length );
        for( i=0 ; i<allValue.length ; i++){
           //for css starting from bar1,bar2,..
           SimpGraph.addBar(graphWrapper,i+1, barWidth, allValue[i]); 
        }
        
    }
    
    
    
    // adjust div height width
}
SimpGraph.addBar = function(element,num,barWidth,barHeight) {
    
    var bar = document.createElement("div");
    bar.className = "bar";
    //bar number for every bar (e.g bar1,bar2,...)
    bar.className += " bar"+num;
    
    //set width, height for bar
    bar.setAttribute("style","width: "+barWidth+"px; height: "+barHeight+"px;");
    
    // add class to div
    element.appendChild(bar);
    
}
SimpGraph.analysisGraphValue = function(value,graphType,graphWidth,graphHeight){
    
    var barArray = value.split(",");
    if( graphType == "bar-horizontal-css"){
        // count value to plot in graph if data value is 0.00~1.00
        for( var i=0 ; i<barArray.length ; i++){
            barArray[i] = Math.round( barArray[i]*graphWidth );
        }
    }
    else if( graphType == "bar-vertical-css"){
        // count value to plot in graph if data value is 0.00~1.00
        for( i=0 ; i<barArray.length ; i++){
            barArray[i] = Math.round( barArray[i]*graphHeight );
        }
    }
    
    return barArray;
}