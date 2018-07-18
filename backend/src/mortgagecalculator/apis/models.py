# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class HouseInfo(models.Model):
    address = models.CharField(max_length = 500)
    price = models.FloatField()
    realtorFname = models.CharField(max_length = 30, blank = True, null = True)
    realtorLname = models.CharField(max_length = 30, blank = True, null = True)
    realtorEmail = models.EmailField(blank = True, null = True)
    phone_regex = RegexValidator(regex = r'^\+?1?\d{9,15}$', message = "Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators = [phone_regex], max_length = 17, blank = True, null = True) # validators should be a list

class HousePicture(models.Model):
    houseFkey = models.ForeignKey(HouseInfo, on_delete = models.CASCADE)
    picURL = models.URLField()
