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
    scene.add(axesHelper);
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
