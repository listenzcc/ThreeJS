setupSimulation = () => {
    Globals.simulation = d3
        .forceSimulation(Globals.data.nodes, 3)
        .force(
            "link",
            d3.forceLink(Globals.data.links).id((d) => d.uId)
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(0, 100, 0));

    console.log("A new force simulation is established.");
};

mkSimulation = (num) => {
    const mx = 100,
        my = 100,
        mz = 100;
    // Nodes
    const nodes = [];

    for (let i = 0; i < num; i++) {
        nodes.push({
            x: (rnd() - 0.5) * mx,
            y: (rnd() - 0.5) * my,
            z: (rnd() - 0.5) * mz,
            uId: i,
        });
    }

    // Links
    const links = [];

    for (let i = 0; i < num; i++) {
        links.push({
            source: i,
            target: parseInt(rnd() * 2 * num) % num,
            distance: 50 + rnd() * 50,
        });

        links.push({
            source: i,
            target: parseInt(rnd() * 2 * num) % num,
            distance: 50 + rnd() * 50,
        });
    }

    Globals.data = { nodes: nodes, links: links };

    setupSimulation();
    console.log("The force simulation scene is now ready");
};

updateSimulation = () => {
    // Globals.data.links = [];

    const n = Globals.data.nodes.length;
    for (let i = 0; i < Globals.data.links.length; i++) {
        Globals.data.links[i].target = parseInt(rnd() * 2 * n) % n;
        Globals.data.links[i].distance = 50 + rnd() * 50;
    }
    // Globals.data.links.forEach((link) => {
    //     link.target = parseInt(rnd() * 2 * n) % n;
    //     link.distance = 50 + rnd() * 50;
    // });

    // const n = Globals.data.nodes.length;

    // for (let i = 0; i < n - 1; i++) {
    //     Globals.data.links.push({
    //         source: i,
    //         target: parseInt(rnd() * 2 * n) % n,
    //         distance: 50 + rnd() * 50,
    //     });
    // }

    setupSimulation();

    console.log("The force simulation links is updated.");
};

const forceSimulation = mkSimulation(20);
