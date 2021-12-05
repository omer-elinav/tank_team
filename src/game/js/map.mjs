import {app} from "./app.mjs";

export {Map};

const grassTexture = PIXI.Texture.from("assets/map/grass.jpg");

class Map {
    constructor(
        app,
        position,
        window_size,
        map_size,
        initial_position
    ) {
        this._map_size = map_size
        this._position = position


        this.window_border = new PIXI.Graphics()
        this.window_border.lineStyle(10, 0x110000);
        this.window_border.drawRect(position.x - (window_size.width / 2), position.y- (window_size.height / 2), window_size.width, window_size.height);
        app.stage.addChild(this.window_border)

        this.window = new PIXI.Graphics()
        this.window.drawRect(position.x - (window_size.width / 2), position.y- (window_size.height / 2), window_size.width, window_size.height);

        this.view = new PIXI.Container()
        this.view.width = map_size.width
        this.view.height = map_size.height
        this.view.mask = this.window

        this.walls = new PIXI.Container()

        this.grass = new PIXI.Sprite(grassTexture)
        this.view.addChild(this.grass)
        this.view.addChild(this.walls)
        console.log(this.window.y, this.window.x)

        this.set_position(initial_position)
        app.stage.addChild(this.view)
    }

    set_position(position){
        this.view.position.y = this._position.y + position.y
        this.view.position.x = this._position.x + position.x
    }

    add_wall(point1, point2){
        /**
         * @param point1 The top-left point
         * @param point2 The bottom-right point
         */

        this.initial_wall = new PIXI.Graphics()
        this.initial_wall.beginFill(0x000000);
        this.initial_wall.lineStyle(2, 0x000000);
        this.initial_wall.drawRect(point1.x , point1.y, point2.x - point1.x, point2.y, point1.y);
        this.walls.addChild(this.initial_wall)

    }
}