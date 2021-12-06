import {Handle} from "./handle.mjs";
import {app} from "./app.mjs";
import {Gauge} from "./gauge.mjs";
import {Map} from "./map.mjs";
import {Scope} from "./scope.mjs";
import {FireGame} from "./fire_game.mjs";


$(function () {
    main()

});

function main() {

    // let map = new Map(
    //     app,
    //     new PIXI.Point(0.5 * app.screen.width, 0.5 * app.screen.height),
    //     {width: 200, height: 200},
    //     {width: 800, height: 200},
    //     new PIXI.Point(10, 10)
    // )
    // map.add_wall(new PIXI.Point(10, 10), new PIXI.Point(20, 30))

    // let scope = new Scope(app,
    //         new PIXI.Point(0.5 * app.screen.width, 0.5 * app.screen.height),
    //         {width: 200, height: 200},
    //     {start:0, end:10}
    //     );

    // let gauge = new Gauge(
    //     app,
    //     new PIXI.Point(0.5 * app.screen.width, 0.5 * app.screen.height),
    //     { start: 0, end: 270},
    //     -140,
    //     15,
    //     200
    // );

    let firegame = new FireGame(
        app,
        new PIXI.Point(0.5 * app.screen.width, 0.5 * app.screen.height),
        {width: 200, height: 200},
    );


    // // Make the whole scene interactive
    app.stage.interactive = true;
    // // Make sure stage captures all events when interactive
    app.stage.hitArea = app.renderer.screen;
    // // let gauge = new Gauge(app, new PIXI.Point(0.2 * app.screen.width, 0.2 * app.screen.height), 0.2 * app.screen.width)
    // let gauge = new Gauge(app, new PIXI.Point(200,200), 200)
    //
    // let handle = new Handle(app, new PIXI.Point(0.2 * app.screen.width, 0.5 * app.screen.height), window.innerHeight * 0.8);

    // handle.events.up = () => {
        // gauge.step_up()
        // gauge.dial.angle += 10;
        // document.documentElement.webkitRequestFullScreen();
        // map.view.y -= 20;
        // current_angle += 0.1
        // scope.set_scope_angle(current_angle)
    // }
    // handle.events.center = () => {
    // }
    // handle.events.down = () => {
        // gauge.step_down()
        // current_angle -= 0.1
        // scope.set_scope_angle(current_angle)
        // map.view.y += 20;
        // gauge.dial.angle -= 10;
    // }


}