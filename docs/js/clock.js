var dom = document.getElementById("clock");
var text = document.getElementById("text");
var cxt = dom.getContext('2d');
var size = Math.min(window.innerWidth/3*2,window.innerHeight/3*2);
var w = cxt.canvas.width = size;
var h = cxt.canvas.height= size;
var hours = [3,4,5,6,7,8,9,10,11,12,1,2];
var r = w/2;

var rem = w/200;
text.style.fontSize=12*rem+'px';

 window.addEventListener('orientationchange',orientationchange);
 window.addEventListener('resize',orientationchange);
 
function orientationchange(){
	size = Math.min(window.innerWidth/3*2,window.innerHeight/3*2);
    w = cxt.canvas.width = size;
	h = cxt.canvas.height= size;
	r = w/2;
    rem = w/200;
    text.style.fontSize=12*rem+'px';
	draw();
}
function drawClock(){
	
	cxt.translate(r,r);
	cxt.lineWidth=10*rem;
	cxt.fillStyle='#f00';
	cxt.beginPath();
	cxt.strokeStyle='#080808';
	cxt.arc(0,0,r-cxt.lineWidth/2,2*Math.PI,false);
	cxt.stroke();
	
	cxt.font=16*rem+'px Arial';
	cxt.textAlign='center';
	cxt.textBaseline='middle';
	hours.forEach(function(hour,i){
		var rad = 2*Math.PI/12*i;
		var x = Math.cos(rad)*(r-30*rem);
		var y = Math.sin(rad)*(r-30*rem);
		cxt.fillText(hour,x,y);
	});
	
	for (var i = 0; i < 60; i++) {
	
		var rad = 2*Math.PI/60*i;
		var x = Math.cos(rad)*(r-18*rem);
		var y = Math.sin(rad)*(r-18*rem);
		
		cxt.beginPath();
		cxt.fillStyle=i%5===0?'#000':'#ccc';
		var rr = i%5===0?1.5:1;
		cxt.arc(x,y,rr*rem,0,2*Math.PI,false);
		cxt.fill();
	}
}

function drawHour(hour,minute){
	var rad = 2*Math.PI/12*hour;
	var mrad = 2*Math.PI/12/60*minute;
	cxt.save();
	cxt.beginPath();
	cxt.rotate(rad+mrad);
	cxt.lineWidth=6*rem;
	cxt.lineCap='round';
	cxt.moveTo(0,10*rem);
	cxt.lineTo(0,-r/2);
	cxt.stroke();
	cxt.restore();
}

function drawMinute(minute){
	
	cxt.save();
	var rad = 2*Math.PI/60*minute;
	cxt.beginPath();
	cxt.rotate(rad);
	
	cxt.lineWidth=3*rem;
	cxt.lineCap='round';
	cxt.moveTo(0,10*rem);
	cxt.lineTo(0,-r+30*rem);
	cxt.stroke();
	cxt.restore();
}


function drawSecond(second){
	
	cxt.save();
	var rad = 2*Math.PI/60*second;
	cxt.fillStyle='#c14543';
	cxt.beginPath();
	cxt.rotate(rad);
	
	cxt.moveTo(-2*rem,20*rem);
	cxt.lineTo(2*rem,20*rem);
	cxt.lineTo(1,-r+18*rem);
	cxt.lineTo(-1,-r+18*rem);
	cxt.fill();
	
	
	cxt.restore();
}
function drawDot(){
	cxt.beginPath();
	cxt.fillStyle='#fff';
	cxt.arc(0,0,3*rem,0,2*Math.PI,false);
	cxt.fill();
}




function draw(){
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	cxt.save();
	cxt.clearRect(0,0,w,h);
	
	drawClock();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	cxt.restore();
	
	text.innerText=now.toLocaleString()+"秒";
}
draw();
setInterval(draw,1000);