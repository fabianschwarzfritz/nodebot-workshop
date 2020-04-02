const five = require('johnny-five')
const board = new five.Board()

board.on('ready', function () {
  const trigger = new five.Button(5);
  const led = new five.Led(9);

  let light = true;
  led.on();
  trigger.on("down", function() {
    light ? led.off() : led.on();
    light = !light;
  });
});

