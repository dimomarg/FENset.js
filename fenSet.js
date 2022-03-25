const isPiece = function(input){
    if (typeof fenSet.symbolMap[input] === 'undefined'){ //bit dodgy, but works
        return false;
    }
    else return true;
}

const isEmpty = function(input){
    if (input >"0" && input <"9"){
        return true;
    }
    return false;
}

var fenSet = {
    symbolMap: {
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
    
    fenToDiagram: function(fenString, flip, darkMode){
        let row = 0; //row is used to determine square colour
        
        if (darkMode){
            ++row;
        }
        
        let square = 0;
        let output = "";
        let currSquare = "";
        let i = 0;
        
        while(square<64){
            currSquare = fenString[i];
            if (isPiece(currSquare)){
                if (darkMode){
                    if (currSquare<="Z"){ //checks if uppercase assuming currSquare is an ASCII letter
                        currSquare = currSquare.toLowerCase();
                    }
                    else{
                        currSquare = currSquare.toUpperCase();
                    }
                }
                output += this.symbolMap[currSquare][(square+row)%2];
                ++square;
            }
            
            else if (isEmpty(currSquare)){
                while (currSquare > 0){
                    output += this.symbolMap.empty[(square+row)%2];
                    ++square;
                    --currSquare;
                }
            }
            
            else if (currSquare === "/"){
                output += "\n";
                ++row;
                if (square%8 != 0){ //if row is the wrong size, the FEN string is invalid
                    console.log("invalid FEN string!");
                    return("");
                }
            
            }
            
            else{ //if unexpected character, the FEN string is invalid
                console.log("invalid FEN string!");
                return("");
            }
            
            ++i;
        }
        
        if (flip){
            output = output.split(""); //string reversal
            output = output.reverse();
            output = output.join("");
        }
        
        if (fenString[i]!=" "){ //if  after 64 squares, there's still things to parse, the FEN string is invalid
            console.log("invalid FEN string!");
            return("");
        }

        return(output);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    var fenDivs = document.getElementsByClassName("fen");

    for (var i = 0; i < fenDivs.length; i++){
        let darkMode = fenDivs[i].className.includes("darkmode");
        let flipped = fenDivs[i].className.includes("flipped");
        
        fenDivs[i].innerText = fenSet.fenToDiagram(fenDivs[i].innerText, flipped, darkMode);
    }


})