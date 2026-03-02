from django.db import models
from django.contrib.auth.models import User

class Booking(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    table = models.CharField(max_length=20)

    booking_date = models.DateField()
    booking_time = models.TimeField()

    guests = models.IntegerField()
