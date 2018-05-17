// Note: upload the StandardFirmata sketch to the Arduino

// the Firmata protocol provides a simple protocol to an embedded system
var Board = require('firmata');
const readline = require('readline');

Board.requestPort(function(error, port) {
    if (error) {
        console.log(error);
        return;
    }
    else {
        console.log("Initializing...");
        console.log("Port: " + port.comName);
    }

    var board = new Board(port.comName);

    board.on('ready', function() {
        console.log('board is ready...');
        var ledOn = true;
        var timer;

        board.pinMode(13, board.MODES.OUTPUT);
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });        

        rl.question('Blink the LED? (y/n) ', (answer) => {
            if(answer == 'y') {
                console.log('Blinking the LED.');
                var counter = 10;

                timer = setInterval(function() {
                            if (ledOn) {
                                console.log('ON');
                                board.digitalWrite(13, board.HIGH);
                            } else {
                                console.log('OFF');
                                board.digitalWrite(13, board.LOW);
                            }

                            ledOn = !ledOn;
                            
                            counter--;

                            if (counter <= 0) {
                                console.log('Done blinking.');
                                board.digitalWrite(13, board.LOW);
                                clearTimeout(timer);
                                rl.close();
                            }
                        }, 500);
            }
            else {
                console.log('Doing nothing.');
            }
        });
    });
});