import os
from django.shortcuts import render


def example1(request):
    print(request)
    return render(request, 'example-1.html')


def statics(request, path):
    print(request, path)
    return render(request, 'example-1.html')
