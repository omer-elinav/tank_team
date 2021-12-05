import {Container, InteractionEvent, Sprite} from "pixi.js";
import {AdjustmentFilter, ColorReplaceFilter, SimpleLightmapFilter} from "pixi-filters";

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

        this.button.on("pointerdown", this.get_dark, this.button);
        this.button.on("pointerup", this.get_bright, this.button);
        this.button.interactive = true;
    }

    get_dark(e) {
        this.filters = [
            new AdjustmentFilter({saturation: 0.8})
        ]
    }

    get_bright(e) {
        this.filters = []
    }

}