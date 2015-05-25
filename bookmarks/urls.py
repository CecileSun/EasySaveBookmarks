__author__ = 'cecile'

from django.conf.urls import patterns, include, url
from tastypie.api import Api
from api import bookmarkResource, tagResource
from . import views

bookmark_resource = bookmarkResource()
tag_resource = tagResource()
bookmark_api = Api(api_name='info')
bookmark_api.register(bookmark_resource)
bookmark_api.register(tag_resource)


urlpatterns = patterns('',
                       url(r'^api/', include(bookmark_api.urls)),
                       # all tags: http://localhost:8000/bookmarks/api/info/tag/?format=json
                       # all bookmarks: http://localhost:8000/bookmarks/api/info/bookmark/?format=json
                       # first bookmark: http://localhost:8000/bookmarks/api/info/bookmark/1/?format=json
                       # first tag: http://localhost:8000/bookmarks/api/info/tag/1/?format=json
                       url(r'^$', views.index),
                       )