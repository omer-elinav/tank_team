export {FireGame};

const bombTexture = PIXI.Texture.from("assets/bomb.png");


class FireGame {
    constructor(
        app,
        position,
        size,
        fire_callback = () => {},
        max_score = 10,
        interval = 0.6,
        cooldown= 3
    ) {
        this._cooldown = cooldown;
        this._current_count = 0;
        this._position = position;
        this._size = size;
        this._max_score = max_score
        this.fire_callback = fire_callback;
        this._interval = interval;

        this.in_cooldown = false;
        this.stopped = true;

        let bomb_size = Math.min(size.width, size.height);
        this.bomb = new PIXI.Sprite(bombTexture);
        this.bomb.anchor.set(0.5)
        this.bomb.width = bomb_size / 5;
        this.bomb.height = bomb_size / 5 ;
        this.bomb.position = position;
        this.bomb.interactive = false;
        this.bomb.visible = false;

        this.window_border = new PIXI.Graphics()
        this.window_border.lineStyle(10, 0x110000);
        this.window_border.drawRect(position.x - (size.width / 2), position.y- (size.height / 2), size.width, size.height);
        app.stage.addChild(this.window_border)



        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: size.height * 0.15,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#b10000', '#ff9100'], // gradient
            stroke: '#000000',
            strokeThickness: 5,
            lineJoin: 'round',
        });
        // Set interactions on our goose
        this.bomb
            .on('mousedown', () => {})
            .on('mouseup', () => {this.bomb_touched()})
            .on('mouseupoutside', () => {})
            .on('touchstart', () => {})
            .on('touchend', () => {this.bomb_touched()})
            .on('touchendoutside', () => {});

        this.is_bomb_exploded = false;

        this.basicText = new PIXI.Text('...', style);
        this.basicText.x = position.x - (size.width / 2);
        this.basicText.y = position.y- (size.height / 2) - size.height * 0.15 ;


        app.stage.addChild(this.basicText);



        app.stage.addChild(this.bomb)
        this.game_loop()
    }

    bomb_touched(e){
        this.bomb.interactive = false;
        this.bomb.visible = false;
        this.is_bomb_exploded = true;
    }

    put_new_bomb(){
        let x_range = {start: this._position.x - (this._size.width / 2), size: this._size.width}
        let y_range = {start: this._position.y - (this._size.height / 2), size: this._size.height}

        this.bomb.x = Math.floor(Math.random() * x_range.size + x_range.start);
        this.bomb.y = Math.floor(Math.random() * y_range.size + y_range.start);

        this.bomb.visible = true;
        this.bomb.interactive = true;
    }

    game_loop(){

        this.bomb.interactive = false;
        this.bomb.visible = false;
        if (this.in_cooldown || this.stopped){

            setTimeout(()=>this.game_loop(), this._interval * 1000)
            return true;
        }

        if (this.is_bomb_exploded){
            this._current_count += 1;
        }else{
            this._current_count = 0;
        }
        this.is_bomb_exploded = false;

        console.log(this._current_count >= this._max_score)
        if (this._current_count >= this._max_score){
            console.log("Cooldown")
            this.basicText.text = "Cooldown"
            this.in_cooldown = true;
            this._current_count = 0;
            this.fire_callback();
            setTimeout(()=>{
                this.in_cooldown = false;
            }, this._cooldown * 1000)
            setTimeout(()=>this.game_loop(), this._interval * 1000)
            return;
        }

        this.basicText.text = this._current_count + "/" + this._max_score
        this.put_new_bomb();

        setTimeout(()=>this.game_loop(), this._interval * 1000)
    }

    stop_game(){

        this.basicText.text = "Stopped";
        this.stopped = true;
    }


    strat_game(){
        this.stopped = false;
    }
}