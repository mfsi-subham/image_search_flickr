from django.db import models


class FavouritePhoto(models.Model):
    """
    Stores the url of favourite photos
    """
    photo_url = models.URLField(unique=True, max_length=200)

    def __str__(self):
        return self.photo_url
