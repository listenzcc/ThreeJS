from django.shortcuts import render


def example1(request):
    print('\nYou are requiring example-1', request, end='\n\n')
    return render(request, 'example-1.html')


def example2(request):
    print('\nYou are requiring example-2', request, end='\n\n')
    return render(request, 'example-2.html')


def example3(request):
    print('\nYou are requiring example-3', request, end='\n\n')
    return render(request, 'example-3.html')
