function leapInputManager(){
   this.events={};
    this.listen();
}

leapInputManager.prototype.emit=function(event,data)
{
    var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

var controller = new Leap.Controller({
  host: '127.0.0.1',
  port: 6437,
  enableGestures: true,
  frameEventName: 'animationFrame',
  useAllPlugins: true
});
leapInputManager.prototype.listen=function(){
        var self=this;
var d = new Date();
var now = d.getTime();
var prevSwipeTime = now;
var prevGesture="";
controller.on("gesture",function(gesture){
    
        if(gesture.type=="swipe"){
            var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          //Classify as right-left or up-down
          if(isHorizontal){
              if(gesture.direction[0] > 0){
                  swipeDirection = "right";
                  if(gesture.id==1){
                  console.log("right");
                  self.emit("move",1);
                  }
              } else {  
                  if(gesture.id==1){
                  swipeDirection = "left";
                self.emit("move",3);
                  console.log("left");
                  }
              }
              
          } else { //vertical
              if(gesture.direction[1] > 0){
                  swipeDirection = "up";
                  var array=new Array;
                  if(gesture.id==1){
                  self.emit("move",0);
                  console.log("up");
                  console.log(gesture.id);
                  }
              } else {
                  if(gesture.id==1){
                swipeDirection = "down";
                  self.emit("move",2);
                  console.log("down");
                      console.log(gesture.id);
                  }
              }                  
          }
        }
    if(gesture.type=="key"){
        console.log("****restarting the game******");
        self.emit("restart");
    }
    });
    //restarting the game on pressing button restart-button
// this.bindButtonPress(".restart-button", this.restart);
this.bindButtonPress(".keep-playing-button",this.keepPlaying);
    
//restarting the game after finish//    
this.bindButtonPress(".retry-button", this.restart);
}
//end listen function

leapInputManager.prototype.emit=function(event,data){
    var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
}

leapInputManager.prototype.on=function(event,callback)
{
if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

controller.connect();

leapInputManager.prototype.restart = function (event) {
  this.emit("restart");
};

leapInputManager.prototype.keepPlaying=function(event){
    this.emit("restart");
}

leapInputManager.prototype.bindButtonPress = function (selector, fn) {
  var button = document.querySelector(selector);
  button.addEventListener("click", fn.bind(this));
  button.addEventListener(this.eventTouchend, fn.bind(this));
};

//this.bindButtonPress(".retry-button", this.restart);
