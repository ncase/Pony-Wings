var HUD = {};
HUD.timerImage = new Image(100,100);

HUD.init = function(){
	HUD.awesome = 0;
	HUD.timer = 1;
	HUD.points = 0;
	HUD.parasprites = 0;
	HUD.groundvel = 0;
	HUD.maxalt = 0;
	HUD.endTimer = 0;
}


HUD.draw = function(){
	
	hudCTX.clearRect(0, 0, 960, 640); // Clear the canvas
	
	// Draw Night
	if(HUD.timer<0.2){
		hudCTX.save();
		hudCTX.fillStyle = "#003";
		if(HUD.timer>0){
			hudCTX.globalAlpha = 0.8*(0.2-HUD.timer)/0.2;
		}else{
			hudCTX.globalAlpha = 0.8;
		}
		hudCTX.fillRect(0,0,480,300);
		hudCTX.restore();
	}
	
			
	// Draw Outer Circle
	hudCTX.fillStyle = "#333";
	hudCTX.beginPath();
	hudCTX.arc(0,300,60,0,Math.PI*2,false);
	hudCTX.fill();
		
	// Draw Sun & Moon
	hudCTX.save();
	hudCTX.translate(0,300);
	hudCTX.rotate((1-HUD.timer)*0.5*Math.PI);
	hudCTX.drawImage( HUD.timerImage, -50, -50, 100, 100 );
	hudCTX.restore();
		
	// Draw Arc
	if(HUD.awesome>=0){
		hudCTX.beginPath();
		hudCTX.arc(0,300,55,0,-HUD.awesome*0.5*Math.PI,true);
	    hudCTX.lineWidth = 10;
	    hudCTX.strokeStyle = "#FFF";
	    hudCTX.stroke();
    }
	
}

HUD.enterFrame = function(){
	if(pony.startMoving){
		
		HUD.awesome *= 3;
		HUD.awesome += 0.02*(-0.04*pony.coord.y+pony.vel.x*1.2); // Originally 0.04 not 0.02. Halved for better judge of awesome.
		HUD.awesome *= 0.25;
		HUD.timer-=(1/(60*30)-pony.vel.x*(1/(60*30))*(1/20));
		
		if(HUD.groundvel<pony.vel.x){
			HUD.groundvel = pony.vel.x;
		}
		if(HUD.maxalt < -pony.coord.y){
			HUD.maxalt = -pony.coord.y;
		} 
	
		if(HUD.timer<0){
			HUD.timer = 0;
			//alert("YOU LOSE");
			if(HUD.endTimer==0){
				if(pony.vel.x<2 && pony.touchGround2){
					HUD.endTimer=60;
				}
			}else{
				HUD.endTimer--;
				if(HUD.endTimer==1){
					menu.gameover();
				}
			}
		}else if(HUD.timer>1){
			HUD.timer = 1;
		}
		
		if(document.getElementById('instructions').style.display!='none'){
			document.getElementById('instructions').style.opacity -= 0.06;
			if(document.getElementById('instructions').style.opacity<=0.061){
				document.getElementById('instructions').style.display='none';
			}
		}
	}
	
	// POINTS
	document.getElementById('points').innerHTML = HUD.points+"m";
	HUD.points = Math.floor(pony.coord.x/100);
	if(HUD.points<0){
		HUD.points=0;
	}
}

HUD.printStats = function(){
	document.getElementById('stats_points').innerHTML = document.getElementById('points').innerHTML;
	document.getElementById('stats_altitude').innerHTML = Math.ceil(HUD.maxalt*0.01);
	document.getElementById('stats_velocity').innerHTML = Math.ceil(3.6*60*HUD.groundvel*0.01);
	document.getElementById('stats_parasprites').innerHTML = HUD.parasprites;
}
