var terrain = {};

terrain.init = function()
{
	terrain.nodes = [ {"x":-200,"y":-100}, {"x":0,"y":-200}, {"x":400,"y":300}, {"x":700,"y":100} ];
	terrain.lastX = 2;
	terrain.drawFarBack = 600;
	var i;
	for(i=0;i<17;i++){
		terrain.newNode();
	}
}

terrain.newNode = function()
{
	if(terrain.nodes.length<=20){
		terrain.nodes.push( {} );
	}else{
		terrain.nodes.push( terrain.nodes[terrain.lastX-2] );
		terrain.nodes[terrain.lastX-2] = null;
	}
	terrain.nodes[terrain.nodes.length-1].x = terrain.nodes[terrain.nodes.length-2].x + Math.random()*150+250;
	if(terrain.nodes[terrain.nodes.length-2].y<130){
		terrain.nodes[terrain.nodes.length-1].y = 200+Math.random()*70;
	}else{
		terrain.nodes[terrain.nodes.length-1].y = 130-Math.random()*70;
	}
}

terrain.updateX = function(xx)
{
	while( xx > terrain.nodes[terrain.lastX].x ){
		terrain.newNode();
		terrain.lastX++;
	}
}

terrain.funct = function(xx)
{
	var i=terrain.lastX-1;
	while(terrain.nodes[i].x<xx){
		i++;
	}
	var ANode = terrain.nodes[i-1];
	var BNode = terrain.nodes[i];
	return ANode.y
			- (BNode.y-ANode.y)*0.5
			* ( Math.cos( Math.PI*( xx-ANode.x )/( BNode.x-ANode.x ) ) - 1 );
}

terrain.functDiff = function(xx)
{
	var i=terrain.lastX-1;
	while(terrain.nodes[i].x<xx){
		i++;
	}
	var ANode = terrain.nodes[i-1];
	var BNode = terrain.nodes[i];
	return (BNode.y-ANode.y)*0.5
			* Math.PI/( BNode.x-ANode.x )
			* ( Math.sin( Math.PI*( xx-ANode.x )/( BNode.x-ANode.x ) ) );
}

terrain.draw = function( starttt )
{
	// Later, ALL HEX?
	ctx.lineWidth = 50;
	if(gameIsMobile){
		ctx.strokeStyle = "rgb(170,200,47)"; // Top
		ctx.fillStyle = "rgb(152,179,43)"; // Middle
		terrain.drawFrom(starttt,25);
	}else{
		ctx.strokeStyle = "rgb(170,200,47)"; // Top
		terrain.drawFrom(starttt,25);
		ctx.strokeStyle = "rgb(152,179,43)"; // Middle
		ctx.fillStyle = "#8FA927"; // Bottom 
		terrain.drawFrom(starttt,70);
	}
}

terrain.drawFrom = function( starttt, yOff )
{
	ctx.beginPath();
	var tmpTerrYDraw = terrain.funct(starttt-terrain.drawFarBack);
	ctx.moveTo( 0-terrain.drawFarBack, tmpTerrYDraw+yOff );
	var i;
	if(pony.startMoving){
		if(gameIsMobile){
			if(PWG.gScale<0.35){
				for( i=30-terrain.drawFarBack; i<=1440; i+=75 ){
					tmpTerrYDraw = terrain.funct(starttt+i);
					ctx.lineTo( i, tmpTerrYDraw+yOff );
				}
			}else{
				for( i=30-terrain.drawFarBack; i<=1200; i+=50 ){
					tmpTerrYDraw = terrain.funct(starttt+i);
					ctx.lineTo( i, tmpTerrYDraw+yOff );
				}
			}
		}else{
			if(PWG.gScale<0.35){
				for( i=30-terrain.drawFarBack; i<=1440; i+=30 ){
					tmpTerrYDraw = terrain.funct(starttt+i);
					ctx.lineTo( i, tmpTerrYDraw+yOff );
				}
			}else{
				for( i=30-terrain.drawFarBack; i<=1200; i+=20 ){
					tmpTerrYDraw = terrain.funct(starttt+i);
					ctx.lineTo( i, tmpTerrYDraw+yOff );
				}
			}
		}
	}else{
		if(gameIsMobile){
			for( i=30-terrain.drawFarBack; i<=500; i+=30 ){
				tmpTerrYDraw = terrain.funct(starttt+i);
				ctx.lineTo( i, tmpTerrYDraw+yOff );
			}
		}else{
			for( i=30-terrain.drawFarBack; i<=500; i+=10 ){
				tmpTerrYDraw = terrain.funct(starttt+i);
				ctx.lineTo( i, tmpTerrYDraw+yOff );
			}
		}
	}
	ctx.lineTo(1425,1000);
	ctx.lineTo(0-terrain.drawFarBack,1000);
	ctx.fill();
	ctx.stroke();
}