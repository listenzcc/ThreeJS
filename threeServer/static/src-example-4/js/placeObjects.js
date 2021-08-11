// Place Object to the 3D Scene

Globals.spheres = [];
Globals.arrows = [];

// ! Used for Initialize the Objects
placeObjects = (THREE) => {
    placeFloor(THREE);
    placeSpheres(THREE);

    Globals.camera.position.set(40 * 1, 80 * 4, 40 * 4);
    Globals.controls.update();
};

// ! Used for Render the Objects' motion,
// ! Translate, Rotate and Scale
objectsRender = (THREE) => {
    const delta = Globals.clock.getDelta();
    // console.log(delta);

    Globals.data.nodes.forEach((node, i) => {
        Globals.spheres[i].position.set(node.x, node.y, node.z);
    });

    Globals.data.links.forEach((link, i) => {
        const ori = new THREE.Vector3(
            link.source.x,
            link.source.y,
            link.source.z
        );

        const dst = new THREE.Vector3(
            link.target.x,
            link.target.y,
            link.target.z
        );

        let dir = new THREE.Vector3(
            link.target.x - link.source.x,
            link.target.y - link.source.y,
            link.target.z - link.source.z
        );

        dir = dir.normalize();

        const length = dst.distanceTo(ori);

        Globals.arrows[i].setLength(length);
        Globals.arrows[i].setDirection(dir);
        Globals.arrows[i].position.set(ori.x, ori.y, ori.z);

        // const arrow = new THREE.ArrowHelper(dir, ori, length);
    });
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

placeSpheres = (THREE) => {
    const material = new THREE.MeshPhongMaterial({
        color: 0xf00000,
        shininess: 50,
        specular: 0x111111,
    });

    Globals.data.nodes.forEach((node, i) => {
        const geometry = new THREE.SphereGeometry(3);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.set(node.x, node.y, node.z);

        Globals.spheres.push(mesh);
        Globals.scene.add(mesh);
        console.log("Placed node-" + i + " to scene");
    });

    Globals.data.links.forEach((link, i) => {
        const ori = new THREE.Vector3(
            link.source.x,
            link.source.y,
            link.source.z
        );

        const dst = new THREE.Vector3(
            link.target.x,
            link.target.y,
            link.target.z
        );

        let dir = new THREE.Vector3(
            link.target.x - link.source.x,
            link.target.y - link.source.y,
            link.target.z - link.source.z
        );

        dir = dir.normalize();

        const length = dst.distanceTo(ori);

        const arrow = new THREE.ArrowHelper(dir, ori, length);

        Globals.arrows.push(arrow);
        Globals.scene.add(arrow);

        console.log("Placed link-" + i + " to scene");
    });

    console.log("Placed spheres to scene");
};
