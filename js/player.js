// v= velocity, a=acceleration, f=force, m=mass,r=radius
var Player = function (game,id) {
  Bubble.call(this,game,id)
  this.game=game
  this.x = this.game.w/2;
  this.y = this.game.h/2;
  this.r = 2000;
  this.m = this.r;
  this.r=Math.log(this.m)*2
  this.vx = 0;
  this.vy = 0;
  this.a = 0;
  this.angle = 0;
  this.img.src="./img/player.png"
  this.audio=new Audio("./audio/fart.mp3")
  this.audio.volume=.2
  console.log(this.audio.volume)
  this.crossHair = new CrossHair(this);
  this.start();
}
Player.prototype=Object.create(Bubble.prototype);
Player.prototype.constructor=Player;
Player.prototype.fart = function () {
  volume=Math.floor(this.m*0.01)
  if(volume<10){
    volume=10
  }
  this.crossHair.fart(volume);
  this.m-=volume
  this.audio.play()
  this.audio=new Audio("./audio/fart.mp3")
  this.audio.volume=.2
}
Player.prototype.start=function(){
  this.game.canvas.addEventListener("click",function(e){
    this.fart()
  }.bind(this))
}
