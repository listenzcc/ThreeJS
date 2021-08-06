// Useful Tools

// Convert degrees into arc values on normalized circle.
arc = (deg) => {
    return (deg / 180) * Math.PI;
};

// Triangle functions
sin = (deg) => {
    return Math.sin(arc(deg));
};

cos = (deg) => {
    return Math.cos(arc(deg));
};

tan = (deg) => {
    return Math.tan(arc(deg));
};

// Add two 3-D vector [a] and [b]
add = (a, b) => {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
};

// Sub two 3-D vector [a] and [b]
sub = (a, b) => {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
};

// Compute the norm-2 of a 3-D vector
norm = (r) => {
    return Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]);
};

// Compute the cross product of 3-D vectors of [a] and [b]
cross = (a, b) => {
    var c = [0, 0, 0];
    c[0] = a[1] * b[2] - a[2] * b[1];
    c[1] = a[0] * b[2] - a[2] * b[0];
    c[1] *= -1;
    c[2] = a[0] * b[1] - a[1] * b[0];
    return c;
};

// Rotate [r] around [n] with [deg] degrees
rotate = (r, n, deg) => {
    var c = cross(n, r);
    var x = (tan(deg) * norm(r)) / norm(c);
    var r1 = [r[0] + c[0] * x, r[1] + c[1] * x, r[2] + c[2] * x];

    var y = norm(r) / norm(r1);
    return [r1[0] * y, r1[1] * y, r1[2] * y];
};
