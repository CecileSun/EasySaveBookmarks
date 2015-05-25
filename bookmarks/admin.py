from django.contrib import admin
from bookmarks.models import tag, bookmark

# Register your models here.
admin.site.register(tag)
admin.site.register(bookmark)
