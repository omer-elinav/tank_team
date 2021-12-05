import {SimpleButton} from "./SimpleButton.js";

const Application = PIXI.Application;


const app = new Application({
    view: document.getElementById("pixi-canvas"),
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x6495ed,
    width: 640,
    height: 480
});

const simple_button = new SimpleButton(app.screen.width, app.screen.height);
app.stage.addChild(simple_button);
