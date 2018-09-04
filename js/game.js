var Game = function () {
  this.canvas = document.getElementById("game");
  this.context = canvas.getContext("2d");
  this.zoom = 1;
  this.canvas.width=800;
  this.canvas.height=400;
  this.w = this.canvas.width * this.zoom;
  this.h = this.canvas.height * this.zoom;
  this.offsetX = this.w - this.canvas.width;
  this.offsetY = this.h - this.canvas.height;
  this.center = {
    x: this.canvas.width / 2 + this.offsetX,
    y: this.canvas.height / 2 + this.offsetY
  }
  this.intervalID = 0;
  this.time=0;
  this.bubbles=[]
  this.reset();
  this.drawBackground()
  this.bubblesId=0
}
Game.prototype.move = function () {

}
Game.prototype.start = function () {
  this.time=new Date();
  this.intervalID = setInterval(function () {
    var now=new Date();
    if(now.getTime()-this.time.getTime()>30000){
      this.stop()
    }
    this.clear();
    this.moveAll();
    this.drawAll();
  }.bind(this),1000/60)
}
Game.prototype.stop=function(){
  clearInterval(this.intervalID)
}
Game.prototype.reset = function () {
  this.bubbles = [];
  this.player=new Player(this,0)
  this.bubbles.push(this.player)
}

Game.prototype.clear = function () {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.moveAll = function () {
  this.move();
  this.player.move();
  this.player.crossHair.move()
  this.moveBubbles();
  this.collisions();
}
Game.prototype.drawAll = function () {
  this.draw();
  this.player.draw();
  this.player.crossHair.draw()
  this.drawBubbles();
}
Game.prototype.draw = function () {
  
  // context.fillStyle='black';
  context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  context.fill();
  context.putImageData(this.background,0,0);
}
Game.prototype.drawBubbles=function(){
  this.bubbles.forEach(function(bubble){
    // console.log(bubble)
    bubble.draw()
  })
}
Game.prototype.moveBubbles=function(){
  this.bubbles.forEach(function(bubble){
    bubble.move()
  })
}
Game.prototype.drawBackground=function(){
  this.background=context.createImageData(this.canvas.width, this.canvas.height);
  for (var i = 0; i < this.background.data.length; i+=4) {
    if(Math.floor(Math.random()*100)<1){
      random=Math.floor(Math.random()*155+0)
      this.background.data[i]=random
      this.background.data[i+1]=random;
      this.background.data[i+2]=random;
      this.background.data[i+3]=255;
    }else{
      this.background.data[i]=0;
      this.background.data[i+1]=0;
      this.background.data[i+2]=0;
      this.background.data[i+3]=255;
    }
  }
}
Game.prototype.collisions=function(){
  for(var i = 0;i < this.bubbles.length; i++){
    var bubble=this.bubbles[i]
    for(var j=i+1,distance;j<this.bubbles.length;j++){
      var bubble2=this.bubbles[j]
      distance=Trig.getVector(bubble.x-bubble2.x,bubble.y-bubble2.y).module
      if(distance<bubble.r+bubble2.r){
        if(bubble.r<bubble2.r){
          bubble2.absorb(bubble,distance)
        }else{
          bubble.absorb(bubble2,distance)
        }
      }
    }
  }
  this.bubbles=this.bubbles.filter(function(bubble){
      return bubble.r>0
  })
}