const request = require('request')
const { five, Board, Led } = require('johnny-five')
const board = new Board()

board.on('ready', function () {
  const led = new Led(13);
  request.get({
    url: 'https://opendata.rnv-online.de/sites/default/files/Haltestellen_153.json'
  }, function(error, response, body) {
    error = "hlllo"
    if (error) {
        console.log(`Error requesting data ${error}`);
        signalError(led);
        return;
    }
    console.log(`Body response: ${body}`);
  });

  signalActive(led);
});

function signalActive(l) {
    l.strobe(1000);
}

function signalError(l) {
  l.strobe(100);
}
