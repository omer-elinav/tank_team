export {Scope};


const targetTexture = PIXI.Texture.from('assets/scope/target.png');

class Scope {
    constructor(app,
                position,
                window_size,
                range,
                window_angle = 0.5
    ) {
        this._range = range;
        this._window_width = window_size.width;
        this._window_angle = window_angle;
        this._window_center = position.x;

        this.window_border = new PIXI.Graphics()
        this.window_border.lineStyle(10, 0x110000);
        this.window_border.drawRect(position.x - (window_size.width / 2), position.y- (window_size.height / 2), window_size.width, window_size.height);
        app.stage.addChild(this.window_border)

        this.window = new PIXI.Graphics()
        this.window.drawRect(position.x - (window_size.width / 2), position.y- (window_size.height / 2), window_size.width, window_size.height);


        this.view = new PIXI.Container()
        this.view.height = window_size.height
        this.view.width = window_size.width * ((range.end - range.start) / window_angle)
        this.view.mask = this.window;

        this.target = new PIXI.Sprite(targetTexture)
        this.view.addChild(this.target)
        this.target.anchor.set(0.5)
        this.target.width = window_size.width * 0.3
        this.target.height = window_size.height * 0.3
        this.target.y = position.y

        this.target.visible = false
        app.stage.addChild(this.view)

    }

    _angle_to_pixel(angle){
        /**
         * Convert angle to absolute pixel position in view
         */
        return (angle/ this._window_angle) * this._window_width;
    }

    set_scope_angle(angle) {
        if (!(this._range.start < angle < this._range.end)){
            return;
        }
        let abs_pixel = this._angle_to_pixel(angle)
        this.view.x = this._window_center - abs_pixel
    }

    set_target_angle(angle) {
        this.target.visible = true;
        let abs_pixel = this._angle_to_pixel(angle)
        this.target.x = this.view.x + abs_pixel

    }

    delete_target() {
        this.target.visible = false;

    }
}