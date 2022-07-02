var canvas=document.querySelector('canvas')
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext("2d"); 
var lives=3
c.fillRect(0, 0, canvas.width, canvas.height)

function restart(){
c.beginPath();
c.moveTo(0,0)
var score=0

for (let i=0;i<50;i++){
    c.lineTo(30+(60*i),40);
    c.lineTo(60+60*i,0);
    c.strokeStyle='#ff0000';
    c.fillStyle = "#FF0000";
    c.fill();
    c.stroke();}



/*function healthdrop(){
    hx=Math.random()*innerWidth;
    hy=Math.random()*innerHeight;
    moveTo(hx,hy) 
    c.arc(hx,hy, 15,0 ,Math.PI*2); 
    c.fill()
    //c.stroke()
    return
}*/
var platformArray=[];
var healtharray=[];
function healthdrop(hx,hy,r){
    this.x=x;
    this.y=y;
    this.r=r;

    this.draw=function(){
        c.beginPath()
        moveTo(x+15,y) 
        c.arc(x,y, 15,0 ,Math.PI*2); 
        c.fill()
    }
    this.update2=function(){
        if (this.y>700){
            this.r=0
        }
        this.y+=1;
        this.draw();
    }
}
function platform(x,y,w,h){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;

    this.draw=function(){
        c.beginPath()
        
        c.fillRect(this.x,this.y,this.w,this.h);
        //if(platformArray.length%10==0 && lives<3){
        //}
        //c.stroke();
    }
    /*this.healthdrop=function(){
        if (this.y <40){
            this.w=0;
        }
        this.y+=-1;
        c.arc(this.x+(this.w/2)+15,this.y-15, 15,0 ,Math.PI*2);
        this.draw();

    }*/
    this.update=function(){
        if (this.y <40){
            this.w=0;
        } 
        this.y += -1;
        this.draw();
    }
}

var hp={
    hx:Math.random()*innerWidth,
    hy:Math.random()*innerHeight,
    y_v:4,
    radius:15
}

let myint
var ball={
    x:500,
    y:150,
    x_v:0,
    y_v:0,
    jump:true,
    radius:30
};

var gravity = 0.0;
var friction = 0.7;



function renderball(){
    c.fillStyle="#7fffd4";
    c.moveTo(ball.x+30,ball.y)
    //c.clearRect(0,0,innerWidth,innerHeight) 
    c.arc(ball.x, ball.y, ball.radius,0 ,Math.PI*2);
    c.fill()
    //c.stroke()

}
function renderpickup(){
    c.fillStyle="#7fffd4";
    c.moveTo(hp.x+hp.radius,hp.y)
    c.arc(hp.x,hp.y,hp.radius,0,Math.PI*2);
    c.fill()
}
//ball();

// The status of the arrow keys    
var keys = {
    right: false,
    left: false,
    up: false,
    };
// This function is called when one of the arrow keys is pressed
function keydown(e) {
    // 37 is the code for thr left arrow key
    if(e.keyCode == 37) {
        keys.left = true;
    }
    // 37 is the code for the up arrow key
    if(e.keyCode == 38) {
        if(ball.jump == false) {
            ball.y_v = -6;
        }
    }
    // 39 is the code for the right arrow key
    if(e.keyCode == 39) {
        keys.right = true;
    }
}
    // This function is called when the key is released
function keyup(e) {
    if(e.keyCode == 37) {
        keys.left = false;
    }
    if(e.keyCode == 38) {
        if(ball.y_v < -2) {
        ball.y_v = -3;
        }
    }
    if(e.keyCode == 39) {
        keys.right = false;
    }
} 
for(var i=0;i<3;i++){
    
    var platy=700;
    var w=150;
    var h=15;
     myint=setInterval(function() {
        var platx=Math.random()*innerWidth;
        platformArray.push(new platform(platx,platy,w,h));
        clearInterval(myint);
        },1500)
}
/*setInterval(function(){
        x=Math.random()*innerWidth;
        y=0;
        r=0;
        healtharray.push(new healthdrop(x,y,r));
    },6500)*/

function ballcontrol(){
     // If the left key is pressed, move the player to the left
    if(ball.jump == false) {
        ball.x_v *= friction;
    } else {
    // If the player is in the air then apply the effect of gravity
        ball.y_v += gravity;
    }
    ball.jump = true;
    if(keys.left) {
        ball.x+= -2.5;
        }
         // If the right key is pressed, move the player to the right
    if(keys.right) {
        ball.x  += 2.5;
        }
    
    ball.y += ball.y_v;
    ball.x += ball.x_v;
}
var ct=0
function animate(){
    ct++;
    console.log(ct)
    //console.log(platformArray.length)
    ani=requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    ballcontrol()
   
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    c.beginPath();
    c.moveTo(0,0)
    for (let i=0;i<50;i++){
        c.lineTo(30+(60*i),40);
        c.lineTo(60+60*i,0);
        c.strokeStyle='#ff0000';
        c.fillStyle = "#FF0000";
        c.fill();
        c.stroke();
    }
    for (var j=0;j<healtharray.length;j++){
        var delx=healtharray[i].x-ball.x;
        var dely=healtharray[i].y-ball.y;
        if(delx==0 && dely==0){
            healtharray[i].r=0;
            lives+=1

            //healtharray.remove
        }
        healtharray[j].update2();
        
    }
   
    for(var i=0;i<platformArray.length;i++){
        
        //console.log(ball.x)
        if(platformArray[i].x < ball.x +10 && ball.x  < platformArray[i].x + 150/*platformArray[i].w*/ && 
        platformArray[i].y< ball.y+30  && ball.y +30 < platformArray[i].y + platformArray[i].h){
            ball.jump = false;
            ball.y = platformArray[i].y-30;
        }
        
        if ((ball.y<40 || ball.y>700) && platformArray.length>4){
            ball.y_v=3
            ball.x=500
            ball.y=150
            lives+=-1;
        }
        /*if (i%10==0 ){
           platformArray[i].healthdrop(); 
        }*/
        platformArray[i].update();
        
        gravity=0.15
        
        
    }
    renderball()
    c.stroke()
    console.log(lives)
    heart1=document.getElementById('h1')
    heart2=document.getElementById('h2')
    heart3=document.getElementById('h3')
    heart=new Image()
    heart.src='heart.png'
    
    switch(lives){
        case 0:
            
        //clearInterval(interval);
            score=Math.ceil(platformArray.length/5)
            heart1.parentNode.removeChild(heart1)
            canvas.parentElement.removeChild(canvas)
            let hiscr2=localStorage.getItem("highscore");
            if (hiscr2<score){
                localStorage.setItem("highscore",score); 
            }
            var elem =document.getElementById("strtbtn");
            elem.parentNode.removeChild(elem);
            
            document.getElementById("restrtbtn").innerHTML=`<button id="q" class="button" onclick='(function(){document.location.reload();})();'>restart</button>`

            document.getElementById('over').innerHTML="GAMEOVER"
            document.getElementById('score').innerHTML="SCORE :" + score
            document.getElementById('highscr').innerHTML="HIGHSCORE :" + hiscr2
            
           
        case 1:
            heart1.innerHTML="<img src=\"heart.png\" width=\"30px\" height=\"30px\" >";
            heart2.parentNode.removeChild(heart2)
            
        case 2:
            heart1.innerHTML="<img src=\"heart.png\" width=\"30px\" height=\"30px\" >";
            heart2.innerHTML="<img src=\"heart.png\" width=\"30px\" height=\"30px\" >";
            heart3.parentNode.removeChild(heart3)
        case 3:
            heart1.innerHTML="<img src=\"heart.png\" width=\"30px\" height=\"30px\" >";
            heart2.innerHTML="<img src=\"heart.png\" width=\"30px\" height=\"30px\" >";
            heart3.innerHTML="<img src=\"heart.png\" width=\"30px\" height=\"30px\" >";
            //drawheart()*/      
        }
    c.stroke()
    
    
    
}
//console.log(platformArray)
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);


animate()       
}