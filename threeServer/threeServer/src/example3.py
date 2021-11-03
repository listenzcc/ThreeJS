'''
FileName: example3.py
Author: Chuncheng
Version: V0.0
Purpose: The Python backend of example-3
'''

# %%
import time
import numpy as np
import numpy.linalg as na
from tqdm.auto import tqdm
from scipy.optimize import minimize

# %%


def deg2arc(deg):
    ''' Convert [deg] into arc '''
    return np.pi / 180 * deg


def rotate(vec, norm, arc):
    ''' Compute the Rotated [vec] with [arc] angles,
        around the direction of [norm].
    '''

    l = na.norm(vec)
    x = vec
    y = np.cross(norm, vec)

    if na.norm(y) == 0:
        return x

    x = x / na.norm(x) * l * np.cos(arc)
    y = y / na.norm(y) * l * np.sin(arc)

    return x + y


def chain(arcs):
    ''' Compute the coordinates of the end point
    '''

    pivots = np.array([
        [0, 0, 0],
        [0, 10, 0],
        [0, 18, 0],
        [0, 0, 0]
    ]).astype(np.float32)

    vecs = np.array([
        [0, 10, 0],
        [0, 8, 0],
        [0, 6, 0]
    ]).astype(np.float32)

    norms = np.array([
        [0, 1, 0],
        [1, 0, 0],
        [1, 0, 0]
    ]).astype(np.float32)

    # Arm-1
    kwargs = dict(norm=norms[0], arc=arcs[0])

    vecs[0] = rotate(vecs[0], **kwargs)
    vecs[1] = rotate(vecs[1], **kwargs)
    vecs[2] = rotate(vecs[2], **kwargs)
    pivots[1] = pivots[0] + vecs[0]

    norms[1] = rotate(norms[1], **kwargs)
    norms[2] = rotate(norms[2], **kwargs)

    # Arm-2
    kwargs = dict(norm=norms[1], arc=arcs[1])

    vecs[1] = rotate(vecs[1], **kwargs)
    vecs[2] = rotate(vecs[2], **kwargs)
    pivots[2] = pivots[1] + vecs[1]

    norms[2] = rotate(norms[2], **kwargs)

    # Arm-3
    kwargs = dict(norm=norms[2], arc=arcs[2])

    vecs[2] = rotate(vecs[2], **kwargs)

    pivots[3] = pivots[2] + vecs[2]

    return pivots, vecs, norms


def randomArcs():
    ''' Generate Random Arcs Values '''
    arcs = [
        deg2arc(np.random.randint(0, 360)),
        deg2arc(np.random.randint(0, 90)),
        deg2arc(np.random.randint(-90, 90))
    ]
    return arcs

# %%


def solve(target):
    t0 = time.time()

    def fun(x, target=target):
        pivots, vecs, norms = chain(x)
        d = na.norm(pivots[-1] - target)
        return d

    cons = (
        dict(type='ineq', fun=lambda x: x[0]),
        dict(type='ineq', fun=lambda x: deg2arc(360) - x[0]),
        dict(type='ineq', fun=lambda x: x[1]),
        dict(type='ineq', fun=lambda x: deg2arc(90) - x[1]),
        dict(type='ineq', fun=lambda x: x[2] + deg2arc(90)),
        dict(type='ineq', fun=lambda x: deg2arc(90) - x[2]),
    )

    method = 'COBYLA'
    # t = time.time()
    # aaa = [minimize(fun, randomArcs(), method=method, constraints=cons, tol=1e-3)
    #        for e in range(10)]
    # print(aaa, time.time()-t)

    tol = 5e-2
    res = minimize(fun, randomArcs(), method=method, constraints=cons, tol=tol)
    for j in tqdm(range(10)):
        res1 = minimize(fun, randomArcs(), method=method,
                        constraints=cons, tol=tol)
        if res1.fun < res.fun:
            res = res1
        if res.fun < tol:
            print(f'Lucky escape on {j} runs')
            break

    print(f'Loss funcion is {res.fun}')

    pivots, vecs, norms = chain(res.x)
    print(res.success, res.fun, res.x)

    print('Solving costs {} seconds'.format(time.time() - t0))

    return res, pivots[-1]

# %%


def solve_init(target, initArcs):
    t0 = time.time()

    def fun(x, target=target):
        pivots, vecs, norms = chain(x)
        d = na.norm(pivots[-1] - target)
        return d

    cons = (
        dict(type='ineq', fun=lambda x: x[0]),
        dict(type='ineq', fun=lambda x: deg2arc(360) - x[0]),
        dict(type='ineq', fun=lambda x: x[1]),
        dict(type='ineq', fun=lambda x: deg2arc(90) - x[1]),
        dict(type='ineq', fun=lambda x: x[2] + deg2arc(90)),
        dict(type='ineq', fun=lambda x: deg2arc(90) - x[2]),
    )

    method = 'COBYLA'
    method = 'trust-ncg'
    # t = time.time()
    # aaa = [minimize(fun, randomArcs(), method=method, constraints=cons, tol=1e-3)
    #        for e in range(10)]
    # print(aaa, time.time()-t)

    tol = 5e-2
    res = minimize(fun, initArcs, method=method, constraints=cons, tol=tol)
    print(f'Loss funcion is {res.fun}')

    if res.fun > tol:
        print('------------- Failed to find minimize on initArcs')
        a, b = solve(target)
        return a, b

    pivots, vecs, norms = chain(res.x)
    print(res.success, res.fun, res.x)

    print('Solving costs {} seconds'.format(time.time() - t0))

    return res, pivots[-1]
# %%
