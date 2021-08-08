// Import me
// to build a basic 3D Scene with Three.js

// Define a set for global usage

const Globals = new Object();
Globals.startup = new Date();
Globals.showHelp = true;

Globals.arm1 = {
    mesh: undefined,
    group: undefined,
    color: 0xaa0000,
    size: [1, 10, 2],
    norm: [0, 1, 0],
    pivot: [0, 0, 0],
    arc: 0,
    arcTarget: arc(100),
    maxOmega: Math.PI,
};

Globals.arm2 = {
    mesh: undefined,
    group: undefined,
    color: 0x00aa00,
    size: [1, 8, 2],
    norm: [1, 0, 0],
    pivot: [0, 10, 0],
    arc: 0,
    arcTarget: arc(100),
    maxOmega: Math.PI,
};

console.log("Globals object is initialized");

// ! Used for Initialize the Scene
quickDeploy = (THREE, OrbitControls, Stats) => {
    init(THREE);
    addMISC(THREE, OrbitControls);
    addStats(Stats);
};

// ! Used for Render the Scene
quickRender = () => {
    Globals.renderer.render(Globals.scene, Globals.camera);
    Globals.stats.update();
};

// Initialize the Scene with Camera, and Renderer.
init = (
    THREE,
    width = 800,
    height = 600,
    container = document.getElementById("canvasContainer")
) => {
    // Setup Renderer
    // It requires scene and camera to draw onto the Screen
    // - scene: The main Scene;
    // - camera: Where to look at the Scene.

    // Setup Renderer and add it to the container
    // var renderer = new THREE.WebGLRenderer();
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    container.appendChild(renderer.domElement);

    // Setup Scene
    var scene = new THREE.Scene();

    // Setup Camera
    var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);
    camera.position.set(20, 20, 20);

    // Render an empty Scene
    renderer.render(scene, camera);

    // Save into Globals
    Globals.renderer = renderer;
    Globals.scene = scene;
    Globals.camera = camera;

    console.log("Rendered at scene with camera by renderer");
};

// Add Interactive Controllers

addMISC = (THREE, OrbitControls) => {
    // Get the required Global Variables
    var camera = Globals.camera,
        renderer = Globals.renderer,
        scene = Globals.scene;

    // Add Ambient Lighting
    scene.add(new THREE.AmbientLight(0x404040));
    console.log("Added Ambient Lighting");

    // Add Axes Lines at R-G-B Colors
    var axesHelper = new THREE.AxesHelper(5);
    if (Globals.showHelp) {
        scene.add(axesHelper);
    }
    console.log("Added axesHelper to scene");

    // Add Mouse Controller with the center of (0, -1, 0) point
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, -1, 0);
    controls.update();
    console.log("Added mouse controller to scene");

    // Add Clock
    var clock = new THREE.Clock();
    Globals.clock = clock;
    console.log("Added clock to scene");
};

addStats = (Stats, container = document.getElementById("statsContainer")) => {
    var stats = new Stats();
    var dom = stats.dom;
    dom.style.position = "";
    container.appendChild(stats.dom);
    Globals.stats = stats;
    console.log("Added Stats to scene");
};
