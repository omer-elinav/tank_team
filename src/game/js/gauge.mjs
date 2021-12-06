export {Gauge};

const gauge_bg_texture = PIXI.Texture.from('assets/speed/speed_bg2.png');
const gauge_dial_texture = PIXI.Texture.from('assets/speed/speed_dial.png');


class Gauge {
    constructor(app,
                position,
                angle_range,
                base_angle,
                step_size,
                size,
                bg_texture = gauge_bg_texture,
                dial_texture = gauge_dial_texture) {

        this._range = angle_range;
        this._base_angle = base_angle;
        this._step_size = step_size;

        var gauge = new PIXI.Container()

        gauge.position.x = position.x
        gauge.position.y = position.y

        let gauge_bg = gauge.addChild(new PIXI.Sprite(bg_texture))
        gauge_bg.anchor.set(0.5)

        var gauge_dial = new PIXI.Sprite(dial_texture)
        gauge.addChild(gauge_dial)

        gauge_dial.anchor.x = 0.5
        gauge_dial.anchor.y = 0.5
        gauge_dial.angle = base_angle;

        console.log(gauge.width)
        gauge.width = size
        gauge.height = size

        this.dial = gauge_dial;

        this._set_angle(0)
        app.stage.addChild(gauge)
    }

    _set_angle(angle) {
        let new_angle = (angle + 360) % 360
        if ((this._range.start > new_angle) || (new_angle > this._range.end)) {
            return;
        }
        this.dial.angle = (this._base_angle + new_angle) % 360;
    }

    step_up(){
        this._set_angle(this.get_angle() + this._step_size)
    }
    step_down(){
        this._set_angle(this.get_angle() - this._step_size)
    }
    get_angle(){
        return this.dial.angle - this._base_angle;
    }


}