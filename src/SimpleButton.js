const Container = PIXI.Container;
const Sprite = PIXI.Sprite;

export class SimpleButton extends Container {
    button;
    dash;

    constructor(screen_width, screen_height) {
        super();

        this.button = Sprite.from("button_pressable.png");
        this.button.x = screen_width / 2;
        this.button.y = screen_height / 2;


        this.dash = Sprite.from("button_not_pressable.png");
        this.dash.x = screen_width / 2;
        this.dash.y = screen_height / 2;
        this.addChild(this.dash);
        this.addChild(this.button);
        this.button.interactive = true;
    }


}
