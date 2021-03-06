"""threeServer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'example1', views.example1),
    path(r'example2', views.example2),
    path(r'example3', views.example3),
    path(r'example3/solve/<str:content>', views.example3_solve),
    path(r'example3/solve_init/<str:content>', views.example3_solve_init),
    path(r'example3/random', views.example3_random),
    path(r'example4', views.example4),
]
