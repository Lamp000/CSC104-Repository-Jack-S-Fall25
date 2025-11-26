// Faction colors, for bg
let arrColorRed = [205,58,96,161,243,91,146,144,225,125];
let arrColorGreen = [111,102,173,161,233,195,59,92,34,125];
let arrColorBlue = [50,165,79,161,48,186,49,164,50,125];
let arrFactions = ["Cat", "Bird", "Toast", "VB", "Lizard", "Otter", "Mole", "Crow", "Rat", "Keeper"];
let arrFactionAmount = 10;
let factionCurrent = 0;
let faction1 = factionCurrent;
let faction2 = factionCurrent;
let factionProg = faction1%1;
let goal = 0;

changeBGC();
// if the array number is a decimal, multiply the floored color of the list to 1-"the decimal" and the ceiled color multiplied by the decimal (makes a smooth fade color to color) 
function adjustFactionColor(array){
    return (factionProg)*array[faction1]+(1-factionProg)*array[faction2];
}
        
function changeBGC(){
    // Set current background to this color
    let bgColorRed = adjustFactionColor(arrColorRed);
    let bgColorGreen = adjustFactionColor(arrColorGreen);
    let bgColorBlue = adjustFactionColor(arrColorBlue);
    // change the body background color
    document.getElementById("factionBody").style.backgroundColor = 'rgb('+bgColorRed+','+bgColorGreen+','+bgColorBlue+')';
}
                
function setButtonLocation(){
    for(let i=0; i<arrFactionAmount; i++){
        let ButtonCurrentFaction = document.getElementById("button" + i);
        if(i==faction1){
            ButtonCurrentFaction.style.bottom = 0.5+5*factionProg+"%";
            ButtonCurrentFaction.style.height = 4+2*factionProg+"%";
        }
        else{
            ButtonCurrentFaction.style.bottom = 0.5+"%";
            ButtonCurrentFaction.style.height = 4+"%";
        }
        if(i==faction2){
            ButtonCurrentFaction.style.bottom = 0.5+5*(1-factionProg)+"%";
            ButtonCurrentFaction.style.height = 4+2*(1-factionProg)+"%";
        }
        ButtonCurrentFaction.style.left = 50+4*(i-factionCurrent)+"%";
    }
}

function setFactionLocation(){
    for(let j=0; j<arrFactionAmount; j++){
        let coolFaction = document.getElementById("div"+arrFactions[j]);
        coolFaction.style.transform = "translate("+100*(j-factionCurrent)+"vw, "+0+"vh)"
        if(faction2==j){
            
            coolFaction.style.opacity=1/(1/(1-factionProg)*1/(1-factionProg))

        }
        else{
            coolFaction.style.opacity=(factionProg)
        }
    }
}

let audioElem = document.createElement("audio");
audioElem.setAttribute("id", "myAudio");
audioElem.setAttribute("src", "Popsoundeffect4-[AudioTrimmer.com].mp3");
document.getElementById("divAudio").appendChild(audioElem);
function buttonSound(){
    // function to play a pop sound (right now it's a pop, but I'll probably change it to fit what I want
    document.getElementById("myAudio").play();
}
for(let o=0; o<arrFactionAmount; o++){
    let c1 = arrColorRed[o]*0.9;
    let c2 = arrColorGreen[o]*0.9;
    let c3 = arrColorBlue[o]*0.9;
    document.getElementById("button"+o).style.backgroundColor = 'rgb('+c1+','+c2+','+c3+')';
}
// Faction target sets the current "goal" faction of a specific number
function factionTarget(number){
    goal=number
    }

setInterval(function(){
    if(Math.abs(goal - factionCurrent) <= 0.0015){
        faction1 = goal;
        factionCurrent = faction1;
    }
    else{
        let thing = 0.94+0.005*Math.abs(goal-factionCurrent);
        factionCurrent = thing*factionCurrent+(1-thing)*goal;
    }
    if(factionCurrent < 0){
        faction1 = arrFactionAmount + factionCurrent;
    }
    else{
        faction1 = factionCurrent%arrFactionAmount;
    }
    factionProg = faction1%1;
    faction2 = Math.floor(faction1);
    faction1 = Math.ceil(faction1)%arrFactionAmount;
    changeBGC();
    setButtonLocation();
    setFactionLocation();
},10);
