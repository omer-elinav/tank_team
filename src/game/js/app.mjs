export {app};

// Create app
const app = new PIXI.Application({
    width: window.innerWidth -10,
    height: window.innerHeight - 10,
    resizeTo: window,
    antialias: true,
    autoDensity: true,
    backgroundColor: 0x1099bb,
    resolution: devicePixelRatio  || 1,
});
document.body.appendChild(app.view);