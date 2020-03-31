const { Board, Thermometer } = require("johnny-five");
const dnode = require('dnode');

const board = new Board();

board.on("ready", function() {
  const sensor = new Thermometer({
    controller: "TMP36",
    pin: "A0",
  });

  let lastTemperature = 0;
  sensor.on("change", function() {
    const { celsius } = sensor;
    lastTemperature = celsius;
  });
  const server = dnode({
    getTemperature: function(cb) {
      cb(lastTemperature);
    }
  });
  server.listen(1337);
});

