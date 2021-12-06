const frame1 = PIXI.Texture.from('assets/images/orb-original.png');
const frame2 = PIXI.Texture.from('assets/images/orb-bright.png');
const frame3 = PIXI.Texture.from('assets/images/orb-dark.png');


class Alert {
  constructor(app, position) {
    this.sprite = new PIXI.AnimatedSprite([frame1, frame2, frame3]);
    this.sprite.animationSpeed = 0.1;
    this.sprite.interactive = true;

    // This button mode will mean the hand cursor appears when you roll over
    // the this.sprite with your mouse
    this.sprite.buttonMode = true;
    this.sprite.pointerdown = e => this.start_animation(e)
    this.sprite.pointerup = e => this.stop_animation(e)

    // Center the this.sprite's anchor point.
    this.sprite.anchor.set(0.5);
    this.sprite.position = position;

    this.sprite.scale.set(2);

  }

  start_animation(e) {
    this.sprite.play();
  }

  stop_animation(e) {
    this.sprite.gotoAndStop(0);
  }


}

export {Alert};
