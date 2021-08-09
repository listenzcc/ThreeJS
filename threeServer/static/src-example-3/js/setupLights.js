// Setup Lights to the Scene

// ! Used for Initialize the Lights
setupLights = (THREE, ShadowMapViewer) => {
    placeDirLight(THREE, ShadowMapViewer);
    placeSpotLight(THREE, ShadowMapViewer);
};

// ! Used for Render the Shadow Maps of Lighting
lightsRender = () => {
    Globals.dirLightShadowMapViewer.render(Globals.renderer);
    Globals.spotLightShadowMapViewer.render(Globals.renderer);
};

placeDirLight = (THREE, ShadowMapViewer) => {
    var dirLight = new THREE.DirectionalLight(0x8a8a8a, 1);
    dirLight.name = "Dir. Light";
    dirLight.position.set(0, 80, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 100;
    dirLight.shadow.camera.right = 150;
    dirLight.shadow.camera.left = -150;
    dirLight.shadow.camera.top = 150;
    dirLight.shadow.camera.bottom = -150;

    Globals.scene.add(dirLight);
    if (Globals.showHelp) {
        Globals.scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
    }
    Globals.dirLight = dirLight;

    dirLightShadowMapViewer = new ShadowMapViewer(dirLight);
    Globals.dirLightShadowMapViewer = dirLightShadowMapViewer;

    console.log("Placed dir light to scene");
};

// white spotlight shining from the side, casting a shadow

placeSpotLight = (THREE, ShadowMapViewer) => {
    var spotLight = new THREE.SpotLight(0xaaaaaa);
    spotLight.position.set(30, 50, 10);
    spotLight.angle = Math.PI / 6;

    spotLight.castShadow = true;

    // spotLight.shadow.mapSize.width = 10;
    // spotLight.shadow.mapSize.height = 20;

    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 100;

    Globals.scene.add(spotLight);
    if (Globals.showHelp) {
        Globals.scene.add(new THREE.CameraHelper(spotLight.shadow.camera));
    }
    Globals.spotLight = spotLight;

    spotLightShadowMapViewer = new ShadowMapViewer(spotLight);
    Globals.spotLightShadowMapViewer = spotLightShadowMapViewer;

    console.log("Placed spot light to scene");
};
