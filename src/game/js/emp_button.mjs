const buttonSprite = PIXI.Texture.from('assets/images/emp_button.png');
const desaturatedButton = PIXI.Texture.from('assets/images/emp_button_desaturated.png');


class EmpButton {
    constructor(app, position) {
        this.sprite = new PIXI.AnimatedSprite([buttonSprite,
            desaturatedButton]);
        this.sprite.autoUpdate = false;
        this.sprite.interactive = true;

        // This button mode will mean the hand cursor appears when you roll over
        // the this.sprite with your mouse
        this.sprite.buttonMode = true;
        this.sprite.pointerdown = e => this.on_click_down(e)
        this.sprite.pointerup = e => this.on_click_up(e)

        // Center the this.sprite's anchor point.
        this.sprite.anchor.set(0.5);
        this.sprite.position = position;

        this.sprite.scale.set(2);

        this.events = {};
        this.events.click = () => {};
    }

    on_click_down(e) {
        this.sprite.gotoAndStop(1);
        this.events.click();
    }

    on_click_up(e) {
        this.sprite.gotoAndStop(0);
    }


}

export {EmpButton};
