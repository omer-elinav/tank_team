import {SimpleButton} from "./SimpleButton.js";

const Application = PIXI.Application;
const socket = io();

var game_date = {
    map: [],
    players: [],
    events: []
};

const app = new Application({
    view: document.getElementById("pixi-canvas"),
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x6495ed,
    width: 640,
    height: 480
});

// Event from server
socket.on('update', data => {
    // Update logic goes here
    game_data = data;
});

const simple_button = new SimpleButton(app.screen.width, app.screen.height);
app.stage.addChild(simple_button);
