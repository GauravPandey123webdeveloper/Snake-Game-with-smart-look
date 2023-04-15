let inputDir={x:0,y:0};
const foodSound= new Audio('food.mp3');
const turnSound=new Audio('turn.mp3');
const outSound=new Audio('outsong.mp3');
const backgroundSound=new Audio('background.mp3');
let speed=7;
let lasttime=0;
let score=0;
let snakebody=[
    {x:13, y:15}
];
let food={x:6,y:7}

function main(ctime){
    window.requestAnimationFrame(main);
   //console.log(ctime);
    if((ctime-lasttime)/1000<1/speed){
        return;
    }
    lasttime=ctime;
    runGame();
}
function snakecollapse(snake){
    for(let i=1;i<snakebody.length;i++){
        if(snake[i].x===snake[0].x &&snake[i].y===snake[0].y){
            return true;
        }
    }
    if(snake[0].x>=18|| snake[0].x<=0|| snake[0].y>=18|| snake[0].y<=0){
        return true;
    }
    return false;
}
function runGame(){
    //updating the length of the snake 
    if(snakecollapse(snakebody)){
        outSound.play();
        backgroundSound.pause();
        inputDir={x:0, y:0};
        alert(" Game over.better luck next time ☺ Press any key to play Again");
        snakebody=[  {x:13, y:15} ];
       backgroundSound.play();
       score=0;
    }
 // eating food 
    if(snakebody[0].y===food.y &&snakebody[0].x===food.x){
        foodSound.play();
        score +=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakebody.unshift({x : snakebody[0].x+inputDir.x, y : snakebody[0].y+inputDir.y });
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving 
    for(let i=snakebody.length-2;i>=0;i--){
        snakebody[i+1]={...snakebody[i]};
    }
    snakebody[0].x +=inputDir.x;
    snakebody[0].y +=inputDir.y;

//snake part
    playground.innerHTML="";
    snakebody.forEach((ele, index)=>{
        selement=document.createElement('div');
        selement.style.gridRowStart=ele.y;
        selement.style.gridColumnStart=ele.x;
        if(index===0){
        selement.classList.add('head');
        }
        else{
            selement.classList.add('snake'); 
        }
        playground.appendChild(selement);

    });
    //food part
    felement=document.createElement('div');
        felement.style.gridRowStart=food.y;
        felement.style.gridColumnStart=food.x;
        felement.classList.add('food');
        playground.appendChild(felement);
}
//main logic
backgroundSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
    turnSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
       case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;    
        default:
            break;
    }
});