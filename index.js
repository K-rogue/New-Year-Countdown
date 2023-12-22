class Snowflake{
    constructor(){
        this.x = 0;
        this.y= 0;
        this.vx= 0
        this.vy = 0;
        this.radius = 0;
        this.alpha = 0;

        this.reset()
    }
    reset(){
        this.x = this.randBetween(0,window.innerWidth);
        this.y= this.randBetween(0,window.innerHeight);
        this.vx= this.randBetween(-3,3)
        this.vy = this.randBetween(2,5);
        this.radius = this.randBetween(1,4);
        this.alpha = this.randBetween(0.1,0.9);

    }
    randBetween(min,max){
        return min + Math.random() * (max - min);
    }
    update(){
        this.x += this.vx;
        this.y += this.vy;

        if( this.y + this.radius > window.innerHeight){
            this.reset();
        }
    }
}
class Snow {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        window.addEventListener("resize", () => this.onResize());
        this.onResize();
        this.updateBound = this.update.bind(this);
        requestAnimationFrame(this.updateBound);

        this.createSnowFlakes();
    }
    onResize(){
        this.width =window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    createSnowFlakes(){
        const flakes = this.width /4;

        this.snowflakes  = [];

        for(let s =0; s < flakes; s++){
            this.snowflakes.push( new Snowflake());
        }
    }
    update(){
        this.ctx.clearRect(0,0,this.width, this.height);

        for(let flake of this.snowflakes){
            flake.update();
            this.ctx.save();
            this.ctx.fillStyle = "#FFF";
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI*2);
            this.ctx.closePath();
            this.ctx.globalAlpha = flake.alpha;
            this.ctx.fill();
            this.ctx.restore();
        }
        requestAnimationFrame(this.updateBound);
    }
}

new Snow();
// countdown
const d = document.getElementById("d");
const h = document.getElementById("h");
const m = document.getElementById("m");
const s = document.getElementById("s");
const newYearText = document.getElementById("newYearText");

let countdownCompleted = false;

function getTrueNumber(num){ return num < 10 ? "0" + num : num; }
function calculateRemainingTime(){
    const comingYear = new Date().getFullYear() +1;
    const comingDate = new Date(`Dec 21, ${2023} 23:27:30`);

    const now = new Date();
    const remainingTime = comingDate.getTime() - now.getTime();
    const days = Math.floor(remainingTime / (1000* 60 * 60 *24));
    const hours = Math.floor(remainingTime % (1000* 60 * 60 *24)/ (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    d.innerHTML = getTrueNumber(days);
    h.innerHTML= getTrueNumber(hours);
    m.innerHTML= getTrueNumber(minutes);
    s.innerHTML = getTrueNumber(seconds);

    return remainingTime
}
function initCountdown(){
    if (countdownCompleted) {
        return; // Stop further executions if countdown is completed
    }

    const interval = setInterval(() => {
        const remainingTimeInMS = calculateRemainingTime();
        if (remainingTimeInMS <=1000){
            clearInterval(interval);
            showNewYearText()
            
        }
    }, 1000);
}
function showNewYearText() {
    newYearText.style.opacity = 1;
}
initCountdown();

