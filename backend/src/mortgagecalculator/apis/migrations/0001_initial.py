# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-07-18 15:29
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HouseInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=500)),
                ('lat', models.FloatField()),
                ('lon', models.FloatField()),
                ('price', models.FloatField()),
                ('realtorFname', models.CharField(blank=True, max_length=30, null=True)),
                ('realtorLname', models.CharField(blank=True, max_length=30, null=True)),
                ('realtorEmail', models.EmailField(blank=True, max_length=254, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=17, null=True, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", regex='^\\+?1?\\d{9,15}$')])),
            ],
        ),
        migrations.CreateModel(
            name='HousePicture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picURL', models.URLField()),
                ('houseFkey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.HouseInfo')),
            ],
        ),
    ]
