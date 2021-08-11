// Place Object to the 3D Scene

Globals.arm1 = {
    mesh: undefined,
    group: undefined,
    color: 0xaa00a0,
    size: [1, 10, 2],
    norm: [0, 1, 0],
    pivot: [0, 0, 0],
    arc: 0,
    arcTarget: arc(0),
    maxOmega: Math.PI,
    minAng: 0,
    maxAng: 360,
    gid: "inp-1",
    name: "arm-1",
};

Globals.arm2 = {
    mesh: undefined,
    group: undefined,
    color: 0xa0aa00,
    size: [1, 8, 2],
    norm: [1, 0, 0],
    pivot: [0, 10, 0],
    arc: 0,
    arcTarget: arc(0),
    maxOmega: Math.PI / 2,
    minAng: 0,
    maxAng: 90,
    gid: "inp-2",
    name: "arm-2",
};

Globals.arm3 = {
    mesh: undefined,
    group: undefined,
    color: 0x00a0aa,
    size: [1, 6, 2],
    norm: [1, 0, 0],
    pivot: [0, 8, 0],
    arc: 0,
    arcTarget: arc(0),
    maxOmega: Math.PI / 2,
    minAng: -90,
    maxAng: 90,
    gid: "inp-3",
    name: "arm-3",
};

Globals.sphere = {
    mesh: undefined,
    color: 0xff0000,
    size: 1,
    position: [0, 30, 0],
    namePre: "sphere-",
};
// ! Used for Initialize the Objects
placeObjects = (THREE) => {
    placeFloor(THREE);
    placeArm(THREE, Globals.arm1);
    placeArm(THREE, Globals.arm2);
    placeArm(THREE, Globals.arm3);
    placeSphere(THREE, Globals.sphere);

    Globals.arm2.group.add(Globals.arm3.group);
    Globals.arm1.group.add(Globals.arm2.group);
};

// ! Used for Render the Objects' motion,
// ! Translate, Rotate and Scale
objectsRender = () => {
    const delta = Globals.clock.getDelta();
    // console.log(delta);

    const arm1 = Globals.arm1;
    const arm2 = Globals.arm2;
    const arm3 = Globals.arm3;

    // Arm-1

    if (arm1.arc < arm1.arcTarget) {
        const d = arm1.arcTarget - arm1.arc;
        const w = Math.min(d, arm1.maxOmega * delta);
        arm1.group.rotateOnWorldAxis(arm1.norm, w);
        arm1.arc += w;
    }

    if (arm1.arc > arm1.arcTarget) {
        const d = arm1.arc - arm1.arcTarget;
        const w = Math.min(d, arm1.maxOmega * delta);
        arm1.group.rotateOnWorldAxis(arm1.norm, -w);
        arm1.arc -= w;
    }

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

    // Arm-3
    if (arm3.arc < arm3.arcTarget) {
        const d = arm3.arcTarget - arm3.arc;
        const w = Math.min(d, arm3.maxOmega * delta);
        arm3.group.rotateOnAxis(arm3.norm, w);
        arm3.arc += w;
    }

    if (arm3.arc > arm3.arcTarget) {
        const d = arm3.arc - arm3.arcTarget;
        const w = Math.min(d, arm3.maxOmega * delta);
        arm3.group.rotateOnAxis(arm3.norm, -w);
        arm3.arc -= w;
    }

    // Update real-time report
    document.getElementById("out-ang").innerText = [
        parseInt(deg(arm1.arc)),
        parseInt(deg(arm2.arc)),
        parseInt(deg(arm3.arc)),
    ].join(" | ");

    document.getElementById("out-angTarget").innerText = [
        parseInt(deg(arm1.arcTarget)),
        parseInt(deg(arm2.arcTarget)),
        parseInt(deg(arm3.arcTarget)),
    ].join(" | ");

    // Update the position of sphere
    Globals.sphere.mesh.position.set(
        Globals.sphere.position[0],
        Globals.sphere.position[1],
        Globals.sphere.position[2]
    );
};

placeFloor = (THREE) => {
    geometry = new THREE.BoxGeometry(300, 0.2, 300);
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

placeArm = (THREE, arm) => {
    arm.norm = new THREE.Vector3(arm.norm[0], arm.norm[1], arm.norm[2]);

    geometry = new THREE.BoxGeometry(arm.size[0], arm.size[1], arm.size[2]);
    material = new THREE.MeshPhongMaterial({
        color: arm.color,
        shininess: 50,
        specular: 0x111111,
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(0, arm.size[1] / 2, 0);

    var group = new THREE.Group();
    group.add(mesh);
    group.position.set(arm.pivot[0], arm.pivot[1], arm.pivot[2]);

    arm.mesh = mesh;
    arm.group = group;

    Globals.scene.add(group);

    document.getElementById(arm.gid).value = deg(arm.arcTarget);

    console.log("Placed", arm.name, "to scene");
};

placeSphere = (THREE, sphere) => {
    geometry = new THREE.SphereGeometry(sphere.size);
    material = new THREE.MeshPhongMaterial({
        color: sphere.color,
        shininess: 50,
        specular: 0x111111,
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(
        sphere.position[0],
        sphere.position[1],
        sphere.position[2]
    );

    sphere.mesh = mesh;

    Globals.scene.add(mesh);

    document.getElementById(sphere.namePre + "x").value = sphere.position[0];
    document.getElementById(sphere.namePre + "y").value = sphere.position[1];
    document.getElementById(sphere.namePre + "z").value = sphere.position[2];

    console.log("Placed sphere to scene");
};
