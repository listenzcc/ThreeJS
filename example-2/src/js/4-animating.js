// Animating Stuff

startLoop = () => {
    // Define an animation Loop
    function animate() {
        requestAnimationFrame(animate);

        render();

        Globals.renderer.render(Globals.scene, Globals.camera);
        Globals.dirLightShadowMapViewer.render(Globals.renderer);
    }

    // Render Method for each Loop
    function render() {
        const delta = Globals.clock.getDelta();
        Globals.cube1.rotation.y += 1 * delta;
        Globals.stats.update();
    }

    // Start the Loop
    animate();
    console.log("Started animating loop");
};
