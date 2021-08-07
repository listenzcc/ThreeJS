from django.shortcuts import render


def example1(request):
    print(request)
    return render(request, 'example-1.html')


def example2(request):
    print(request)
    return render(request, 'example-2.html')
