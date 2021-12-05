import {Handle} from "./handle.mjs";
import {app} from "./app.mjs";
import {Gauge} from "./gauge.mjs";
const loader = new PIXI.Loader();

$(function () {
    loader
        .add([
            'assets/speed/speed_bg2.png',
            'assets/speed/speed_dial.png',
            'assets/ball.png'
        ])
        .load(main)

});

function main() {
    // Make the whole scene interactive
    app.stage.interactive = true;
    // Make sure stage captures all events when interactive
    app.stage.hitArea = app.renderer.screen;
    console.log(app.screen)
    // let gauge = new Gauge(app, new PIXI.Point(0.2 * app.screen.width, 0.2 * app.screen.height), 0.2 * app.screen.width)
    let gauge = new Gauge(app, new PIXI.Point(100,100), 100)

    let handle = new Handle(app, new PIXI.Point(0.5 * app.screen.width, 0.5 * app.screen.height), window.innerHeight * 0.8);
    handle.events.up = () => {
        // app.renderer.backgroundColor = 0x108810
        gauge.dial.angle += 10;
        document.documentElement.webkitRequestFullScreen();
    }
    handle.events.center = () => {
        // app.renderer.backgroundColor = 0x1099bb
    }
    handle.events.down = () => {

        gauge.dial.angle -= 10;
        // app.renderer.backgroundColor = 0x88bb10
    }


    app.stage.addChild(handle.sprite);

}