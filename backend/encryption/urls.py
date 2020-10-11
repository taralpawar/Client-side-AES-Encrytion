from django.urls import path, include
from .views import savedata, getdata
urlpatterns = [
    path('savedata/', savedata),
    path('getdata/<str:username>/', getdata)
]
