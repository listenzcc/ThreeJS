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
