var PWG = {};
PWG.timer_enterFrame = null;
PWG.timer_draw = null;
PWG.playGame = function(){
	PWG.timer_enterFrame = setInterval(PWG.enterFrame,enterFrameRate);
	PWG.timer_draw = setInterval(PWG.draw,drawFrameRate);
}
PWG.pauseGame = function(){
	clearInterval(PWG.timer_enterFrame);
	clearInterval(PWG.timer_draw);
}
PWG.enterFrame = function(){
	prop.enterFrame();
	pony.enterFrame();
	background.enterFrame();
	HUD.enterFrame();
	
	// SCALE / TRANSLATE DEPENDING ON PONY
	if(pony.startMoving){
		PWG.gScale*=9;
		PWG.yDisp*=9;
		if(pony.coord.y<-100){
			PWG.yDisp += (pony.coord.y+100)*0.5;
		}else{
			PWG.yDisp += 0;
		}
		if(pony.touchGround3){
			PWG.gScale += 0.7;
			PWG.yDisp += 100;
		}else{
			if(pony.coord.y<-100){
				PWG.gScale += 0.30;
			}else{
				PWG.gScale += 0.40;
			}
		}
		PWG.gScale*=0.1;
		PWG.yDisp*=0.1;
		if(PWG.yDisp<-300){
			PWG.yDisp*=3;
			PWG.yDisp += -300;
			PWG.yDisp*=0.25;
		}
		// SPLAT
		PWG.yDisp += PWG.shake;
		PWG.shake *= -0.5;
	}
}
PWG.draw = function(){
	ctx.clearRect(0, 0, 960, 640); // Clear the canvas
	
	// SCALE PROPER
	ctx.save();
	ctx.translate(100,150-PWG.yDisp*PWG.gScale);
	ctx.scale(PWG.gScale,PWG.gScale);
	
	background.draw(); // Background
	prop.draw(); // Props like Trees
	terrain.draw(pony.coord.x); // Terrain
	pony.draw(); // Pony Player
	prop.drawParasprites(); // Parasprites
	HUD.draw(); // HUD
	
	// RESTORE
	ctx.restore();
	
}

PWG.init = function(){
	PWG.gScale = 1;
	PWG.yDisp = -310;
	PWG.shake = 0;
	menu.init();
	HUD.init();
	background.init();
	pony.init();
	terrain.init();
	prop.init();
}

PWG.artAssets = 7;
PWG.loadArtAssets = function(){
	
	if(gameIsMobile){
		PWG.artAssets -= 4;
	}
	
	pony.image.onload =
	background.cloud.onload = 
	prop.image.tree.onload = 
	prop.image.parasprite.onload = 
	prop.image.burst.onload = 
	HUD.timerImage.onload = 
		PWG.onAssetLoad;
	
	pony.image.src = "art/Scootaloo.png";
	prop.image.parasprite.src = "art/Parasprite.png";
	HUD.timerImage.src = "art/Timer.png";
	
	if(!gameIsMobile){
		background.cloud.src = "art/Cloud.png";
		prop.image.tree.src = "art/Tree.png";
		prop.image.burst.src = "art/Burst.png";
		// Music
		music.src = music_source;
		music.addEventListener('canplaythrough', function(){
			musicLoopInit();
			PWG.musicLoaded = true;
			PWG.onAssetLoad();
		}, false);
		music.load();
	}
	
}

PWG.onAssetLoad = function(){
	PWG.artAssets--;
	//alert(PWG.artAssets);
	if(PWG.artAssets==0){
		
		// Music
		//music.play();
		//menu.toggleAudio();
		document.getElementById("bmusic").className = "hud_button toggle";
		
		// Remove Loading Screen
		document.getElementById("loading").style.display = "none";
		document.getElementById("game_container").style.display = "block";
		gameIsLoaded = true;
		
		PWG.startTheGame();
	}
}
PWG.startTheGame = function(){
	PWG.enterFrame(); PWG.draw(); PWG.playGame();
	document.getElementById("screen").style.display = "none";
	
	// If Not Home Screen Web App
	if(notHomeScreened && !PWG.alreadyNotified){
		menu.pause();
		document.getElementById("homeScreen").style.display = "block";
		PWG.alreadyNotified = true;
	}
}
PWG.alreadyNotified = false;
PWG.musicLoaded = false;

var canvas;
var ctx;
var hudCanvas;
var hudCTX;