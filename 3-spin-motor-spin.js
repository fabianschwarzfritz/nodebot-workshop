const five = require('johnny-five')
const board = new five.Board()

board.on('ready', function () {
  const motor = new five.Motor(9);
  motor.start(200);
  board.wait(2000, function() {
    motor.stop();
    board.wait(1000, function() {
      motor.start(200);
    });
  });
});
