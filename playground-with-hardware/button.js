const {Board, Led, Button} = require("johnny-five");
const board = new Board();

const BUTTON_PIN = 2;
const LED_PIN = 13;

board.on("ready", () => {
  const greenLed = new Led(LED_PIN);
  const button = new Button({
    pin: BUTTON_PIN,
    holdtime: 3000
  });

  button.on("press", function() {
    greenLed.stop();
    greenLed.toggle();
  });

  button.on("hold", function() {
    greenLed.blink();
  });
});
