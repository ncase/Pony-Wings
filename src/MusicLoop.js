var music = new Audio();
function musicLoopInit(){
	setInterval( function(){ 
		if(music.currentTime>57){
			music.currentTime = 0; 
			music.play();
		} 
	},200);
	//music.currentTime = 40;
}
var music_source;
if (music.canPlayType('audio/mpeg;')) {
    music.type= 'audio/mpeg';
    music_source = 'music/WinterLoop.mp3';
} else {
    music.type= 'audio/ogg';
    music_source = 'music/WinterLoop.ogg';
}