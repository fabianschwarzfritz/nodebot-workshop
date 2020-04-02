const {Board, Led, Button} = require("johnny-five");
const board = new Board();

const BUTTON_PIN = 2;
const LED_PIN = 13;

board.on("ready", () => {
  const greenLed = new Led(LED_PIN);
  const button = new Button(BUTTON_PIN);

  let greenLight = false;
  button.on("press", function() {
    greenLight = !greenLight;
    applyLight(greenLight, greenLed);
  })
});

function applyLight(lightValue, led) {
  lightValue ? led.on() : led.off();
}
