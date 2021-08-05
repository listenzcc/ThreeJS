// Place Objects into the Scene

// Overall Placing all the objects
placeAll = (THREE, ShadowMapViewer) => {
    placeCube1(THREE);
    placeCube2(THREE);
    placeFloor(THREE);
    // placeDirLight(THREE, ShadowMapViewer);
    placePntLight(THREE, ShadowMapViewer);
};

placeCube1 = (THREE) => {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({
        color: 0x00a0a0,
        shininess: 150,
        specular: 0x222222,
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(10, 1, 0);
    cube.castShadow = true;
    cube.receiveShadow = true;

    Globals.scene.add(cube);

    Globals.cube1 = cube;

    console.log("Placed cube1 to scene");
};

placeCube2 = (THREE) => {
    var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    var material = new THREE.MeshPhongMaterial({
        color: 0xa0a0a0,
        shininess: 150,
        specular: 0x222222,
    });

    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(13, 1, 0);
    cube.castShadow = true;
    cube.receiveShadow = true;

    Globals.scene.add(cube);

    Globals.cube2 = cube;

    console.log("Placed cube2 to scene");
};

placeFloor = (THREE) => {
    geometry = new THREE.BoxGeometry(30, 0.2, 30);
    material = new THREE.MeshPhongMaterial({
        color: 0xa0adaf,
        shininess: 50,
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
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 12;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = -15;

    Globals.scene.add(dirLight);
    Globals.scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
    Globals.dirLight = dirLight;

    dirLightShadowMapViewer = new ShadowMapViewer(dirLight);
    Globals.dirLightShadowMapViewer = dirLightShadowMapViewer;

    console.log("Placed dir light to scene");
};

placePntLight = (THREE, ShadowMapViewer) => {
    var pntLight = new THREE.PointLight(0xffff00, 1, 100);
    pntLight.name = "Pnt. Light";
    pntLight.position.set(0, 1, 0);
    pntLight.castShadow = true;

    Globals.scene.add(pntLight);
    Globals.scene.add(new THREE.CameraHelper(pntLight.shadow.camera));
    Globals.pntLight = pntLight;

    pntLightShadowMapViewer = new ShadowMapViewer(pntLight);
    Globals.pntLightShadowMapViewer = pntLightShadowMapViewer;

    console.log("Placed point light to scene");
};
