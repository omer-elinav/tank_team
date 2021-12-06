export {app};

const backgroundTexture = PIXI.Texture.from("assets/bg.jpg");

// Create app
const app = new PIXI.Application({
    width: window.innerWidth -10,
    height: window.innerHeight - 10,
    resizeTo: window,
    antialias: true,
    autoDensity: true,
    backgroundColor: 0x000000,
    backgroundAlpha: 0.5,
    resolution: devicePixelRatio  || 1,
});


document.body.appendChild(app.view);
