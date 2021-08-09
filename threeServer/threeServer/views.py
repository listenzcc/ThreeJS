import json
from django.shortcuts import render
from django.http import HttpResponse

from .src.example3 import solve, randomArcs, chain


def example1(request):
    print('\nYou are requiring example-1', request, end='\n\n')
    return render(request, 'example-1.html')


def example2(request):
    print('\nYou are requiring example-2', request, end='\n\n')
    return render(request, 'example-2.html')


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
