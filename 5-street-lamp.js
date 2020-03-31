const five = require("johnny-five");
const board = five.Board();

board.on("ready", function() {
  const led = new five.Led(9);
  const sensor = new five.Sensor({
    pin: "A0",
  });
  sensor.on("data", function() {
    this.value > 600 ? led.on() : led.off();
  });
});

