var background = {};
background.cloud = new Image(300,150);

background.init = function(){
	if(!gameIsMobile){
		background.clouds = [{"x":675,"y":-250,"velX":1},
					 {"x":0,"y":-500,"velX":2},
					 {"x":1000,"y":-750,"velX":3}];
	}
}

background.enterFrame = function()
{
	if(!gameIsMobile){
		var i;
		for(i=0;i<background.clouds.length;i++){
			background.clouds[i].x -= background.clouds[i].velX;
			if(background.clouds[i].x<-1000){
				background.clouds[i].x = 1425;
			}
		}
	}
}

background.draw = function()
{
	// Background Sun
	ctx.save();
	ctx.translate(800,600-HUD.timer*1000);
	ctx.fillStyle = "#FFD";
	ctx.beginPath();
	ctx.arc(0,0,330,0,Math.PI*2,false);
  	ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#FFA";
    ctx.stroke();
	ctx.restore();
	
	// Background Clouds
	if(!gameIsMobile){
		ctx.save();
		ctx.globalAlpha = 0.8;
		var i;
		for(i=0;i<background.clouds.length;i++){
			ctx.drawImage( background.cloud, background.clouds[i].x, background.clouds[i].y, background.cloud.width*2, background.cloud.height*2);
		}
		ctx.restore();
	}
}