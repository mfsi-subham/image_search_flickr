from django.contrib import admin
from apps.coordinates.models import Coordinate

# Registering Coordinate model with admin site
admin.site.register(Coordinate)
