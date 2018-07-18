# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View
from apis.models import *
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# Create your views here.
import json
"""
address = models.CharField(max_length = 500)
    price = models.FloatField()
    realtorFname = models.CharField(max_length = 30, blank = True)
    realtorLname = models.CharField(max_length = 30, blank = True)
    realtorEmail = models.EmailField(blank = True)
    phone_regex = RegexValidator(regex = r'^\+?1?\d{9,15}$', message = "Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators = [phone_regex], max_length = 17, blank = True) # validators should be a list
"""
FIELDS  = [
        'address',
        'price',
        'realtorFname',
        'realtorLname',
        'realtorEmail',
        'phone_number',
]

@method_decorator(csrf_exempt, name='dispatch')
class PostPictureView(View):
    PICTURE_FIELDS = ['houseFkey', 'picURL']
    def post(self, request):
        body = request.body.decode("utf-8")
        request.POST = json.loads(body)
        data = request.POST['data']
        picture = {}
        for key in data.keys():
            if key in PICTURE_FIELDS:
                picture[key] = data[key]

        try:
            obj = HousePicture.objects.create(
                houseFkey = picture['houseFkey'],
                picURL = picture['picURL']
            )
        except Exception as e:
            return HttpResponse('failed to create picture object, please contact a dev')
        else:
            return HttpResponse('success!')  

@method_decorator(csrf_exempt, name='dispatch')
class PostDataView(View):

    def post(self, request):
        body = request.body.decode("utf-8")
        request.POST = json.loads(body)

        data = request.POST
        house = {}
        for key in data.keys():
            if key in FIELDS:
                house[key] = data[key]

        try:
            obj = HouseInfo.objects.create(
                address = house['address'],
                price = house['price'],
                lat = house['latitude'],
                lon = house['longitude'],
                realtorFname = house['realtorFname'],
                realtorLname = house['realtorLname'],
                realtorEmail = house['realtorEmail'],
                phone_number = house['phone_number']
            )
        except Exception as e:
            return HttpResponse(e)
        else:
            return JsonResponse({ 'houseID' : obj.id}, safe = False)

class GetDataView(View):
    def newHouseJsonObj(self):
        return {
            'primary_key' : None,
            'address' : None,
            'realtorFname' : None,
            'realtorLname' : None,
            'realtorEmail' : None,
            'phone_number' : None,
            'pictures' : [],
        }
    def get(self, request):
        jsonOutput = {'houses' : []}
        houseList = HouseInfo.objects.all()
        fieldList = HouseInfo._meta.get_fields()

        for house in houseList:
            # gets the json representation of this modelobj
            jsonify = house.__dict__

            #creates the house json object
            currHouse = self.newHouseJsonObj()

            #set PK
            currHouse['primary_key'] = house.id
            houseId = house.id

            # set all applicable fields
            for f in FIELDS:
                currHouse[f] = jsonify[f]

            # gets all pictures
            pictures = HousePicture.objects.filter(houseFkey = houseId)
            for p in pictures:
                currHouse['pictures'].append(p)
            jsonOutput['houses'].append(currHouse)
        return JsonResponse(jsonOutput, safe=False)


