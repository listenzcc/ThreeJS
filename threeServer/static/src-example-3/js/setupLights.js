// Setup Lights to the Scene

// ! Used for Initialize the Lights
setupLights = (THREE, ShadowMapViewer) => {
    placeDirLight(THREE, ShadowMapViewer);
};

// ! Used for Render the Shadow Maps of Lighting
lightsRender = () => {
    Globals.dirLightShadowMapViewer.render(Globals.renderer);
};

placeDirLight = (THREE, ShadowMapViewer) => {
    var dirLight = new THREE.DirectionalLight(0xaaaaaa, 1);
    dirLight.name = "Dir. Light";
    dirLight.position.set(0, 30, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 100;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = -15;

    Globals.scene.add(dirLight);
    if (Globals.showHelp) {
        Globals.scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
    }
    Globals.dirLight = dirLight;

    dirLightShadowMapViewer = new ShadowMapViewer(dirLight);
    Globals.dirLightShadowMapViewer = dirLightShadowMapViewer;

    console.log("Placed dir light to scene");
};
