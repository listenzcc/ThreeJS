// Animating Stuff

startLoop = () => {
    // Define an animation Loop
    function animate() {
        requestAnimationFrame(animate);

        render();

        Globals.renderer.render(Globals.scene, Globals.camera);
        // Globals.dirLightShadowMapViewer.render(Globals.renderer);
        Globals.pntLightShadowMapViewer.render(Globals.renderer);
    }

    // Render Method for each Loop
    function render() {
        var delta = Globals.clock.getDelta();
        Globals.cube1.rotation.y += (Math.PI * 2 * delta) / 1;
        Globals.cube1.rotation.z += (Math.PI * 2 * delta) / 1 / 3;

        var r = Globals.cube1.position.toArray();
        var r1 = rotate(r, [0, 1, 0], (360 * delta) / 36.5);
        Globals.cube1.position.set(r1[0], r1[1], r1[2]);

        Globals.cube2.rotation.y += (Math.PI * 2 * delta) / 1 / 2;
        Globals.cube2.rotation.z += (Math.PI * 2 * delta) / 1 / 3 / 2;
        var r2 = sub(Globals.cube2.position.toArray(), r);
        var r3 = add(rotate(r2, [0, 1, 0.3], (360 * delta) / 2.7), r1);
        Globals.cube2.position.set(r3[0], r3[1], r3[2]);

        Globals.stats.update();
    }

    // Start the Loop
    animate();
    console.log("Started animating loop");
};
