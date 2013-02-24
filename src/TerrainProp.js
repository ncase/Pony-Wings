var prop = {};
prop.image = {};
prop.image.tree = new Image(600,170);
prop.image.parasprite = new Image(400,200);
prop.image.burst = new Image(750,150);

prop.init = function(){
	
	// TREES
	if(gameIsMobile){
		prop.trees = [];
	}else{
		prop.trees = [{},{},{},{},{},{},{}];
		prop.treeLength = 3;
		prop.treePast = 1000;
		pony.coord.x -= 800;
		prop.addTrees();
		pony.coord.x += 800;
	}
	
	// PARASPRITES
	prop.parasprites = [{},{},{},{}];
	prop.addParasprites();
}

prop.addTrees = function(){
	if(gameIsMobile){
		prop.treeLength = 0;
	}else{
		var i;
		var xxx = 1500;
		prop.treeLength = Math.ceil(3+Math.random()*4);
		prop.treePast = 1000+Math.ceil(Math.random()*2000);
		for(i=0;i<prop.treeLength;i++){
			prop.trees[i].x = xxx+pony.coord.x;
			prop.trees[i].y = terrain.funct(prop.trees[i].x);
			prop.trees[i].rotation = Math.atan( terrain.functDiff(prop.trees[i].x) );
			prop.trees[i].type = Math.floor(Math.random()*3);
			xxx += Math.ceil(Math.random()*400+200);
		}
	}
}

// PARASPRITES
prop.addParasprites = function(){
	var i;
	for(i=0;i<prop.parasprites.length;i++){
		prop.parasprites[i].loop = 2000+Math.floor( Math.random()*2000 );
		prop.parasprites[i].flap = 0;
		prop.resetParasprite(i);
	}
}
prop.resetParasprite = function(i){
	prop.parasprites[i].x = prop.parasprites[i].loop+pony.coord.x;
	prop.parasprites[i].y = -Math.random()*400;
	prop.parasprites[i].color = Math.floor( Math.random()*4 );
	prop.parasprites[i].velX = 3+Math.random()*4;
	prop.parasprites[i].life = 0;
}

// Draw
prop.draw = function(){
	var i;
	for(i=0;i<prop.treeLength;i++){
		ctx.save();
		ctx.translate( prop.trees[i].x-pony.coord.x, prop.trees[i].y );
		ctx.rotate(prop.trees[i].rotation);
		ctx.drawImage( prop.image.tree, prop.trees[i].type*200,0,200,170, -200, -280, 400,340);
		ctx.restore();
	}
}

prop.drawParasprites = function(){
	var i;
	for(i=0;i<prop.parasprites.length;i++){
		ctx.save();
		ctx.translate(prop.parasprites[i].x-pony.coord.x,prop.parasprites[i].y);
		if(prop.parasprites[i].life==0){
			ctx.drawImage( prop.image.parasprite, prop.parasprites[i].color*100, Math.floor(prop.parasprites[i].flap)*100,100,100,
							-50, -50, 100,100);
		}else if(!gameIsMobile){
			ctx.drawImage( prop.image.burst, Math.floor((20-prop.parasprites[i].life)/4)*150,0,150,150,
							-100, -100, 200,200);
		}
		prop.parasprites[i].flap = (prop.parasprites[i].flap+0.1*prop.parasprites[i].velX)%2;
		ctx.restore();
	}
}

// EnterFrame
prop.enterFrame = function(){
	if(!gameIsMobile){
		if(prop.trees[prop.treeLength-1].x-pony.coord.x<-prop.treePast){
			prop.addTrees();
		}
	}
	var i;
	var xxx;
	var yyy;
	for(i=0;i<prop.parasprites.length;i++){
		if(prop.parasprites[i].life==0){
			prop.parasprites[i].x += prop.parasprites[i].velX;
			xxx = prop.parasprites[i].x-pony.coord.x;
			yyy = prop.parasprites[i].y-pony.coord.y;
			if( xxx>prop.parasprites[i].loop || xxx<-500){
				prop.resetParasprite(i);
			}
			if( xxx>-pony.width*0.5 && xxx<pony.width*0.5 && yyy>-pony.height && yyy<0 ){
				prop.parasprites[i].life = 20;
				//alert("CAUGHT");
				pony.vel.x*=1.1;
				pony.vel.y*=1.2;
				HUD.parasprites++;
			}
		}else{
			prop.parasprites[i].life--;
			if(prop.parasprites[i].life==1){
				prop.resetParasprite(i);
			}
		}
	}
}
