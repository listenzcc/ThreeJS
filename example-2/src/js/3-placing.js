// Place Objects into the Scene

// Overall Placing all the objects
placeAll = (THREE, ShadowMapViewer) => {
    placeCube1(THREE);
    placeFloor(THREE);
    placeDirLight(THREE, ShadowMapViewer);
};

placeCube1 = (THREE) => {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({
        color: 0xa00000,
        shininess: 150,
        specular: 0x222200,
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.y = 1;
    cube.castShadow = true;
    cube.receiveShadow = true;

    Globals.scene.add(cube);

    Globals.cube1 = cube;

    console.log("Placed cube1 to scene");
};

placeFloor = (THREE) => {
    geometry = new THREE.BoxGeometry(10, 0.2, 10);
    material = new THREE.MeshPhongMaterial({
        color: 0xa0adaf,
        shininess: 150,
        specular: 0x111111,
    });

    var floor = new THREE.Mesh(geometry, material);
    // floor.scale.multiplyScalar(3);
    floor.castShadow = false;
    floor.receiveShadow = true;
    floor.position.y = -1;

    Globals.scene.add(floor);

    Globals.floor = floor;

    console.log("Placed floor to scene");
};

placeDirLight = (THREE, ShadowMapViewer) => {
    var dirLight = new THREE.DirectionalLight(0xaaaaaa, 1);
    dirLight.name = "Dir. Light";
    dirLight.position.set(0, 10, 0);
    dirLight.castShadow = true;
    // dirLight.shadow.camera.near = 1;
    // dirLight.shadow.camera.far = 10;
    // dirLight.shadow.camera.right = 15;
    // dirLight.shadow.camera.left = -15;
    // dirLight.shadow.camera.top = 15;
    // dirLight.shadow.camera.bottom = -15;
    // dirLight.shadow.mapSize.width = 1024;
    // dirLight.shadow.mapSize.height = 1024;

    Globals.scene.add(dirLight);
    Globals.scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
    Globals.dirLight = dirLight;

    dirLightShadowMapViewer = new ShadowMapViewer(dirLight);
    Globals.dirLightShadowMapViewer = dirLightShadowMapViewer;

    console.log("Placed dir light to scene");
};
