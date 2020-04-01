const five = require('johnny-five')
const board = new five.Board()

five.Servo.prototype.reset = function() {
  this.stop();
  this.center();
}

board.on('ready', function () {
  const servo = new five.Servo(9);
  servo.sweep([0, 180]);
  board.wait(3000, function() {
    servo.reset();
  });
});


// Create a new Servo instance attached to pin 9
//   » Use servo.sweep to rotate between 0˚ and 180˚
//   » Use board.wait to schedule a 'reset' callback after 3 seconds
//   » The 'reset' callback should stop and center the servo
//   » Check the docs to see how to bring it back into line
