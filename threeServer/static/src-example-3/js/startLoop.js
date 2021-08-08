// Start Rendering Loop

startLoop = () => {
    // Define an animation Loop
    function animate() {
        requestAnimationFrame(animate);

        objectsRender();

        // ! Render the scene BEFORE render the Lights
        // ! To prevent texture is `none`
        quickRender();
        lightsRender();
    }

    // Start the Loop
    animate();
    console.log("Started animating loop");
};
