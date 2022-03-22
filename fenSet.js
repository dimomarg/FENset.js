const isPiece = function(input){
    input = input.toUpperCase();
    if (input === "K" ||
        input === "Q" ||
        input === "B" ||
        input === "N" ||
        input === "R" ||
        input === "P"){
            return true;
        }
    return false;
}

const isGap = function(input){
    if (input >"0" && input <"9"){
        return true;
    }
    return false;
}

var fenSet = {
    symbols: {
        "K":"Kk",
        "Q":"Qq",
        "B":"Bb",
        "N":"Nn",
        "R":"Rr",
        "P":"Pp",
        "k":"Ll",
        "q":"Ww",
        "b":"Vv",
        "n":"Mm",
        "r":"Tt",
        "p":"Oo",
        empty:"zx"
    },
    
    fenToDiagram: function(fenString){
        let row = 0;
        let square = 0;
        let output = "";
        let currSquare = "";
        let i = 0;
        while(square<64){
            currSquare = fenString[i];
            if (isPiece(currSquare)){
                output += this.symbols[currSquare][(square+row)%2];
                ++square;
                ++i;
            }
            else if (isGap(currSquare)){
                while (currSquare > 0){
                    output += this.symbols.empty[(square+row)%2];
                    ++square;
                    --currSquare;
                }
                ++i;
            }
            else if (currSquare === "/"){
                output += "\n";
                ++i;
                ++row;
            }
        }
        return(output);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    var fenDivs = document.getElementsByClassName("fen");

    for (var i = 0; i < fenDivs.length; i++){
        console.log("entered for loop");
        fenDivs[i].innerText = fenSet.fenToDiagram(fenDivs[i].innerText);
    }
})