
let userscore=0;
let comscore=0;
let user_Score = document.getElementById("user-score");
let comp_Score = document.getElementById("comp-score");
let msg = document.getElementById("msg");


// Shared AudioContext banayein taaki browser block na kare
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 1. Jeetne (Win) par tez aur khushi wala sound
function playWinSound() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = "triangle"; // Sharp aur loud sound ke liye
  osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5 note
  osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5 note
  osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5 note

  gain.gain.setValueAtTime(1.0, audioCtx.currentTime); // Full volume
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.4);
}


// 2. Haarne (Lose) par tez buzzer/down sound
function playLoseSound() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = "sawtooth"; // Heavy buzzer sound ke liye
  osc.frequency.setValueAtTime(300, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.35);

  gain.gain.setValueAtTime(1.0, audioCtx.currentTime); // Full volume
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.35);
}

// 3. Draw (Match Tie) hone par neutral sound
function playDrawSound() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(440, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
}



let comChoice = ()=>{
    let options = ["rock" ,"paper" ,"scisor"]
    const ranoption = Math.floor(Math.random()*3)
    return options[ranoption];


}

const shoWin = (userWin,userchoice,compchoice) => {
    if (userWin){
        playWinSound()
        userscore++;
        user_Score.innerText = userscore;
        msg.innerText ="YOU WIN!"
        msg.style.backgroundColor = "red"
        setTimeout(()=> {
            msg.innerText = "play your move again!!!"
            msg.style.backgroundColor = "#a0a5aa"
},800)
    }else{
        playLoseSound()
        comscore++;
        comp_Score.innerText = comscore;
        msg.innerText = "YOU LOSE!"
        msg.style.backgroundColor = "green"
        setTimeout(()=> {
            msg.innerText = "play your move again!!!"
            msg.style.backgroundColor = "#a0a5aa"
},800)
    }
}

let drwGame = ()=>{
    playDrawSound()
    msg.innerHTML = "GAME DRWWW!!!"
    msg.style.backgroundColor = "#FFE4F6"
   setTimeout(()=> {
    msg.innerText = "play your move again!!!"
    msg.style.backgroundColor = "#a0a5aa"
},800)
}

const playGame = (userchoice) => {

    let compchoice = comChoice()

    if (userchoice === compchoice){
        drwGame()

    }else{
        let userWin = true;
        if (userchoice === "rock"){
            userWin = compchoice === "paper" ? false : true;
        }else if (userchoice === "paper"){
            userWin = compchoice === "scissor" ? false : true;
        }else {
           userWin = compchoice === "rock" ? false : true;
        }
        shoWin(userWin)
    }
    
}



let choices= document.querySelectorAll(".choice")
choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
       const userchoice = choice.getAttribute("id")
       playGame(userchoice)

       choice.classList.add("clicked-effect")
        setTimeout(() => {
            choice.classList.remove("clicked-effect")
        }, 300);
    })
})
