const request = require('request');
const { five, Board, Led } = require('johnny-five');
const board = new Board();

/**
 * We abort the process when any of the required environmen variables is not set
 */
if (!process.env.RNV_API_TOKEN) {
  throw new Error('No API token via RNV_API_TOKEN set!');
}

// Interval in ms how often we want to update the data
const INTERVAL = 1000;

/**
 * Main function called when the board is booted and in ready state
 */
board.on('ready', function () {
  const led = new Led(13);

  setInterval(function() {
    request.get({
      url: getUrl(),
      headers: getHeaders()
    }, function(error, response, body) {
      if (error) {
          console.log(`Error requesting data ${error}`);
          signalError(led);
          return;
      }

      const stop = JSON.parse(body);
      const workrelevant = stop.listOfDepartures.filter(function(departure) {
        return departure.direction == "Bismarckplatz";
      });
      const next = workrelevant[0];
      const nextTime = predictedTime(next.time);
      console.log(`Next departure is at ${nextTime} towards ${next.direction}. Current time: ${stop.time}`);

      if(typeof stop.pastRequestText !== undefined
        && stop.pastRequestText !== 'n/a') {
        console.log(`Past Request Text: ${stop.pastRequestText}`);
      }

      signalActive(led);
    });
  }, INTERVAL);

  signalActive(led);
});

/**
 * Signals running status.
 */
function signalActive(l) {
    l.strobe(1000);
}

/**
 * Signals an error retrieving data.
 */
function signalError(l) {
  l.strobe(100);
}

/** 
 * Prettifies the station time
 */
// When next day this comes back: { time: '18.04.2020 06:23',
//    status: 'OK',
//    direction: 'Bismarckplatz',
//    platform: 'B',
//    transportation: 'STRAB',
//    tourId: '2,224984',
//    kindOfTour: '452',
//    positionInTour: '7',
//    statusNote: '',
//    lineId: '22',
//    lineLabel: '22',
//    differenceTime: '400',
//    foreignLine: 'false',
//    newsAvailable: 'false' },
function predictedTime(stationTime) {
  // The station time displays planned and actual departure.
  // For example:
  //  - 19:03+0 (tram is on time)
  //  - 19:03+3 (tram is 3 minutes late)
  //
  // We want to return the predicted time.
  const info = stationTime.split('+');
  const planned = info[0];
  let minutesLater = info[1];

  const datestring = '1970-01-01T' + planned + ':00+01:00';
  const predicted = new Date(datestring);
  minutesLater = parseInt(minutesLater);
  predicted.setUTCMinutes(predicted.getUTCMinutes() + minutesLater);
  
  const result = `${predicted.getHours()}:${predicted.getMinutes()}`;
  return result
}

/**
 * Returns the URL to request the data for station "Eppelheimer Terasse".
 */
function getUrl() {
  // This is the stop id for station "Eppelheimer Terasse"
  const stopId = '4275';
  // When we set the *time* url parameter to 'null', we get the current time.
  return `http://rnv.the-agent-factory.de:8080/easygo2/api/regions/rnv/modules/stationmonitor/element?hafasID=${stopId}&time=null`;
}

/**
 * Returns an object containing all header information required for authentication and a correct request to the API.
 */
function getHeaders() {
  return {
    'RNV_API_TOKEN': process.env.RNV_API_TOKEN,
    'Content-Type': 'application/json'
  };
}

