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

