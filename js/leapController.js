
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
var controller = Leap.loop({enableGestures: true}, function(frame){
    controller.setBackground(true); 
  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
          case "circle":
            //  console.log("Circle Gesture");
              break;
          case "keyTap":
            //  console.log("Key Tap Gesture");
              break;
          case "screenTap":
           //   console.log("Screen Tap Gesture");
              break;
          case "swipe":
        //      console.log("Swipe Gesture");
              break;
        }
    });
  }
});
/*
leapInputManager.prototype.listen=function(){
    
    controller.on("gesture",function(gesture){
        if(gesture.type=="swipe"){
            console.log("This is swipe gesture");
            var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          //Classify as right-left or up-down
          if(isHorizontal){
              if(gesture.direction[0] > 0){
                  swipeDirection = "right";
                  console.log("right");
              } else {
                  swipeDirection = "left";
                this.emit("move");
                  console.log(this.emit("move",3));
              }
          } else { //vertical
              if(gesture.direction[1] > 0){
                  swipeDirection = "up";
                  
                  console.log("up");

              } else {
                swipeDirection = "down";
               //   GameManager.prototype.move(2);
                  this.emit("move",2);
                  console.log("down");
              }                  
          }
     //   console.log(swipeDirection);
      }
    });
};

/*leapInputManager.prototype.on=function(event,callback){

if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};
controller.connect();*/
leapInputManager.prototype.listen=function(){
        var self=this;

controller.on("gesture",function(gesture){
        if(gesture.type=="swipe"){
            console.log("This is swipe gesture");
            var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          //Classify as right-left or up-down
          if(isHorizontal){
              if(gesture.direction[0] > 0){
                  swipeDirection = "right";
                  console.log("right");
                  self.emit("move",1);
              } else {
                  swipeDirection = "left";
                self.emit("move",3);
                  console.log(self.emit("move",3));
              }
          } else { //vertical
              if(gesture.direction[1] > 0){
                  swipeDirection = "up";
                  self.emit("move",0);
                  console.log("up");

              } else {
                swipeDirection = "down";
               //   GameManager.prototype.move(2);
                  this.emit("move",2);
                  console.log("down");
              }                  
          }
     //   console.log(swipeDirection);
        }
    if(gesture.type=="screenTap"||gesture.type=="keyTap"){
        console.log("this is keyTap");
        self.emit("restart");
    }
    });
    //restarting the game on pressing button restart-button
 this.bindButtonPress(".restart-button", this.restart);

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

leapInputManager.prototype.bindButtonPress = function (selector, fn) {
  var button = document.querySelector(selector);
  button.addEventListener("click", fn.bind(this));
  button.addEventListener(this.eventTouchend, fn.bind(this));
};

//this.bindButtonPress(".retry-button", this.restart);
