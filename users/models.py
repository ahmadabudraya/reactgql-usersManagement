from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    #name = models.CharField(max_length=30, blank=True)
    #description = models.TextField()
    email = models.EmailField()
    country = models.CharField(max_length=30)
    job_position = models.CharField(max_length=30)
    date_joined = models.DateField()

    def __str__(self):
        return self.email
