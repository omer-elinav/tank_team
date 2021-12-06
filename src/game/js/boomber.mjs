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

    app.stage.interactive = true;
    app.stage.hitArea = app.renderer.screen;

    let map_size = Math.min(app.screen.width, app.screen.height) * 0.8
    let map = new Map(
        app,
        new PIXI.Point(0.8 * app.screen.width, 0.5 * app.screen.height),
        {width: map_size, height: map_size},
        {width: 800, height: 200},
        new PIXI.Point(10, 10)
    )
    map.add_wall(new PIXI.Point(10, 10), new PIXI.Point(20, 30))

    let gauge_size = Math.min(app.screen.width, app.screen.height) * 0.3
    let angle_gauge = new Gauge(
        app,
        new PIXI.Point(gauge_size *0.6, gauge_size *0.6),
        { start: 0, end: 360},
        0,
        10,
        gauge_size,
        PIXI.Texture.from('assets/speed/compass.png')
    );
    let mini_angle_gauge = new Gauge(
        app,
        new PIXI.Point(gauge_size *2, gauge_size *0.6),
        { start: 0, end: 180},
        -90,
        5,
        gauge_size,
        PIXI.Texture.from('assets/speed/mini_angle.png')
    );


    let handle_size = gauge_size * 1.5;
    let handle_angle = new Handle(
        app,
        new PIXI.Point(gauge_size *0.6, 0.6 * app.screen.height),
        handle_size
    );
    let mini_handle_angle = new Handle(
        app,
        new PIXI.Point(gauge_size *2, 0.6 * app.screen.height),
        handle_size
    );

    handle_angle.events.up = () =>{
        angle_gauge.step_up();
    }
    handle_angle.events.down = () =>{
        angle_gauge.step_down();
    }

    mini_handle_angle.events.up = () =>{
        mini_angle_gauge.step_up();
    }
    mini_handle_angle.events.down = () =>{
        mini_angle_gauge.step_down();
    }

}