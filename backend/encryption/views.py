from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserData
from .serializers import UserDataSerializer
# Create your views here.


@api_view(['GET', 'POST'])
def savedata(request):
    if request.method == 'POST':
        userdata = UserData()
        serializer = UserDataSerializer(userdata, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getdata(request, username):
    user = UserData.objects.get(username=username)
    serializer = UserDataSerializer(user)
    return Response(serializer.data)
