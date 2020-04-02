const dgram = require("dgram");
const dgramData = require("@rainder/dgram-data");
const five = require("johnny-five");
const board = five.Board();

board.on("ready", function() {
  const piezo = new five.Piezo(8);
  const server = dgram.createSocket("udp4");
  server.on("message", function() {
    piezo.play({song: "C D E F", beats: 1/4, tempo: 100});
  });
  server.bind(1337, "127.0.0.1");
});

