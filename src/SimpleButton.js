const Container = PIXI.Container;
const Sprite = PIXI.Sprite;

export class SimpleButton extends Container {
    button;
    dash;

    constructor(screen_width, screen_height) {
        super();

        this.button = Sprite.from("speed_bg.png");
        this.button.x = screen_width / 2;
        this.button.y = screen_height / 2;

        this.addChild(this.button);
        this.button.interactive = true;
        this.button.on("pointerdown", this.some_function, this.button);
    }

    some_function(e) {
        console.log("an event!")
    }


}
