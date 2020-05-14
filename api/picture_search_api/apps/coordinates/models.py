from django.db import models


class Coordinate(models.Model):
    """
    Stores predefined coordinates of a place
    """
    longitude = models.DecimalField(max_digits=10, decimal_places=4)
    latitude = models.DecimalField(max_digits=10, decimal_places=4)
    place_name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.place_name
