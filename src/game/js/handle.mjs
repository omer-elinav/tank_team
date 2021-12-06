import {app} from "./app.mjs";


const imageTexture = PIXI.Texture.from('assets/ball.png');
const pullTexture = PIXI.Texture.from('assets/shaft/pull.png');
// const shaftTexture = PIXI.Texture.from('assets/shaft/shaft.png');
const shaftTexture = PIXI.Texture.from('assets/shaft/shaft_alpha.png');

imageTexture.baseTexture.resolution = devicePixelRatio;
imageTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

class Handle {
    constructor(app, position, size = 200) {
        this.app = app;

        this.original_pos = position;
        this.step_size = size / 2 - 25;

        // Create rectangle
        this.shaft = new PIXI.Sprite(shaftTexture);
        this.shaft.position.set(position.x -5 , position.y - (size/2))
        this.shaft.width = 10
        this.shaft.height = size
        // this.shaft.beginFill(0x000000);

        // set the line style to have a width of 5 and set the color to red
        // this.shaft.lineStyle(5, 0x000000);

        // draw a rectangle
        // this.shaft.drawRect(position.x -5 , position.y - (size/2), 10, size);


        this.sprite = new PIXI.Sprite(pullTexture);
        this.sprite.width = 50
        this.sprite.height = 50
        this.sprite.interactive = true;

        // This button mode will mean the hand cursor appears when you roll over
        // the this.sprite with your mouse
        this.sprite.buttonMode = true;

        // Center the this.sprite's anchor point.
        this.sprite.anchor.set(0.5);
        this.sprite.position = position;

        // Make it a bit bigger, so it's easier to grab.
        // this.sprite.scale.set(0.1);

        // Setup events for mouse + touch using the pointer events

        this.old_onmode_handler = this.app.stage.pointermove;
        this.sprite.pointerdown = e => this.onDragStart(e)
        this.sprite.pointerup = this.sprite.pointerupoutside = () => this.onDragEnd()

        this.app.stage.addChild(this.shaft);
        this.app.stage.addChild(this.sprite);

        this.events = {}
        this.events.up = () => {};
        this.events.center = () => {};
        this.events.down = () => {};
    }


    onDragStart(e) {
        // Show that the bunny can now be dragged.
        // this.sprite.alpha = 0.5;

        // Start listening to dragging on the stage
        this.old_onmode_handler = this.app.stage.pointermove;
        this.app.stage.pointermove = e => this.onDragMove(e)
        // app.stage.addEventListener('pointermove', onDragMove);
    }

    onDragEnd() {
        // Restore the original bunny alpha.
        // this.sprite.alpha = 1;

        if (this.sprite.position.y > this.original_pos.y + this.step_size / 2) {
            this.events.down()
            // this.sprite.position.y = this.original_pos.y + this.step_size
        } else if (this.sprite.position.y < this.original_pos.y - this.step_size / 2) {
            this.events.up()
            // this.sprite.position.y = this.original_pos.y - this.step_size
        } else {

            this.events.center()
            // this.sprite.position.y = this.original_pos.y
        }

        this.sprite.position.y = this.original_pos.y
        window.navigator.vibrate(100);

        // Stop listening to dragging on the stage
        this.app.stage.pointermove = this.old_onmode_handler;
    }

    onDragMove(e) {
        // Don't use e.target because the pointer might move out of the bunny if
        // the user drags fast, which would make e.target become the stage.
        let point = new PIXI.Point()
        this.sprite.parent.toLocal(e.data.global, null, point);
        if (point.y < this.original_pos.y + this.step_size && point.y > this.original_pos.y - this.step_size) {
            this.sprite.position.y = point.y;
        }
    }


}

export {Handle};
