# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-07-19 18:50
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='houseinfo',
            name='lat',
        ),
        migrations.RemoveField(
            model_name='houseinfo',
            name='lon',
        ),
    ]
