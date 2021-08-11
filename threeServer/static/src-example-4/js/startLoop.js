// Start Rendering Loop

startLoop = (THREE) => {
    // Define an animation Loop
    function animate() {
        requestAnimationFrame(animate);

        objectsRender(THREE);

        // ! Render the scene BEFORE render the Lights
        // ! To prevent texture is `none`
        quickRender();
        lightsRender();
    }

    // Start the Loop
    animate();
    console.log("Started animating loop");
};
