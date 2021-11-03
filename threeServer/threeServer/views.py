import json
from django.shortcuts import render
from django.http import HttpResponse

from .src.example3 import solve, solve_init, randomArcs, chain


# -----------------------------------------------
# Example-1
def example1(request):
    print('\nYou are requiring example-1', request, end='\n\n')
    return render(request, 'example-1.html')


# -----------------------------------------------
# Example-2
def example2(request):
    print('\nYou are requiring example-2', request, end='\n\n')
    return render(request, 'example-2.html')


# -----------------------------------------------
# Example-3
def example3(request):
    print('\nYou are requiring example-3', request, end='\n\n')
    return render(request, 'example-3.html')


def example3_solve(request, content):
    print('\nYou are requiring example-3 for inverse solution',
          request, content, end='\n\n')
    target = [int(e) for e in content.split(',')]
    res, dest = solve(target)
    data = dict(
        content=content,
        tol=str(res.fun),
        arcs=','.join([str(e) for e in res.x]),
        dest=','.join([str(e) for e in dest])
    )
    return HttpResponse(json.dumps(data))


def example3_solve_init(request, content):
    print('\nYou are requiring example-3 for inverse solution with initial arcs',
          request, content, end='\n\n')

    split = [e for e in content.split(',')]
    target = [int(e) for e in split[:3]]
    initArcs = [float(e) for e in split[3:]]

    res, dest = solve_init(target, initArcs)
    data = dict(
        content=content,
        tol=str(res.fun),
        arcs=','.join([str(e) for e in res.x]),
        dest=','.join([str(e) for e in dest])
    )
    return HttpResponse(json.dumps(data))


def example3_random(request):
    # Used for generating a random and legal position,
    # and of course response it.
    print('\nYou are requiring example-3 for random point',
          request, end='\n\n')

    pivots, _, _ = chain(randomArcs())
    data = dict(
        dest=','.join([str(e) for e in pivots[-1]]),
    )
    return HttpResponse(json.dumps(data))


# -----------------------------------------------
# Example-4
def example4(request):
    print('\nYou are requiring example-4', request, end='\n\n')
    return render(request, 'example-4.html')
