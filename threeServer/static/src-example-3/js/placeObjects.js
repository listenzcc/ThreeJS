// Place Object to the 3D Scene

// ! Used for Initialize the Objects
placeObjects = (THREE) => {
    placeFloor(THREE);
    placeArm1(THREE);
    placeArm2(THREE);
};

// ! Used for Render the Objects' motion,
// ! Translate, Rotate and Scale
objectsRender = () => {
    const delta = Globals.clock.getDelta();
    // console.log(delta);

    const arm1 = Globals.arm1;
    const arm2 = Globals.arm2;
    arm2.group.position.set(arm1.pivot[0], arm1.pivot[1], arm1.pivot[2]);

    // Arm-1
    if (arm1.arc < arm1.arcTarget) {
        const d = arm1.arcTarget - arm1.arc;
        const w = Math.min(d, arm1.maxOmega * delta);
        arm1.group.rotateOnWorldAxis(arm1.norm, w);
        arm2.group.rotateOnWorldAxis(arm1.norm, w);
        // arm2.norm.applyAxisAngle(arm1.norm, w);
        arm1.arc += w;
    }

    if (arm1.arc > arm1.arcTarget) {
        const d = arm1.arc - arm1.arcTarget;
        const w = Math.min(d, arm1.maxOmega * delta);
        arm1.group.rotateOnWorldAxis(arm1.norm, -w);
        arm2.group.rotateOnWorldAxis(arm1.norm, -w);
        // arm2.norm.applyAxisAngle(arm1.norm, -w);
        arm1.arc -= w;
    }

    arm2.group.position.set(arm2.pivot[0], arm2.pivot[1], arm2.pivot[2]);
    // Arm-2
    if (arm2.arc < arm2.arcTarget) {
        const d = arm2.arcTarget - arm2.arc;
        const w = Math.min(d, arm2.maxOmega * delta);
        arm2.group.rotateOnAxis(arm2.norm, w);
        arm2.arc += w;
    }

    if (arm2.arc > arm2.arcTarget) {
        const d = arm2.arc - arm2.arcTarget;
        const w = Math.min(d, arm2.maxOmega * delta);
        arm2.group.rotateOnAxis(arm2.norm, -w);
        arm2.arc -= w;
    }

    document.getElementById("out-ang").innerText = [
        parseInt(deg(arm1.arc)),
        parseInt(deg(arm2.arc)),
        -1,
    ].join(" | ");

    document.getElementById("out-angTarget").innerText = [
        parseInt(deg(arm1.arcTarget)),
        parseInt(deg(arm2.arcTarget)),
        -1,
    ].join(" | ");
};

placeFloor = (THREE) => {
    geometry = new THREE.BoxGeometry(30, 0.2, 30);
    material = new THREE.MeshPhongMaterial({
        color: 0xa0adaf,
        shininess: 50,
        specular: 0x111111,
    });

    var floor = new THREE.Mesh(geometry, material);
    floor.castShadow = false;
    floor.receiveShadow = true;
    floor.position.y = -1;

    Globals.scene.add(floor);

    Globals.floor = floor;

    console.log("Placed floor to scene");
};

placeArm1 = (THREE) => {
    const arm1 = Globals.arm1;

    arm1.norm = new THREE.Vector3(arm1.norm[0], arm1.norm[1], arm1.norm[2]);

    geometry = new THREE.BoxGeometry(arm1.size[0], arm1.size[1], arm1.size[2]);
    material = new THREE.MeshPhongMaterial({
        color: arm1.color,
        shininess: 50,
        specular: 0x111111,
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(0, arm1.size[1] / 2, 0);

    var group = new THREE.Group();
    group.add(mesh);
    group.position.set(arm1.pivot[0], arm1.pivot[1], arm1.pivot[2]);

    arm1.mesh = mesh;
    arm1.group = group;

    Globals.scene.add(group);

    document.getElementById("inp-1").value = deg(arm1.arcTarget);

    console.log("Placed arm1 to scene");
};

placeArm2 = (THREE) => {
    const arm1 = Globals.arm1;
    const arm2 = Globals.arm2;

    arm2.norm = new THREE.Vector3(arm2.norm[0], arm2.norm[1], arm2.norm[2]);

    geometry = new THREE.BoxGeometry(arm2.size[0], arm2.size[1], arm2.size[2]);
    material = new THREE.MeshPhongMaterial({
        color: arm2.color,
        shininess: 50,
        specular: 0x111111,
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(0, arm2.size[1] / 2, 0);

    var group = new THREE.Group();
    group.add(mesh);
    group.position.set(arm2.pivot[0], arm2.pivot[1], arm2.pivot[2]);

    arm2.mesh = mesh;
    arm2.group = group;

    Globals.scene.add(group);

    document.getElementById("inp-2").value = deg(arm2.arcTarget);

    console.log("Placed arm1 to scene");
};
