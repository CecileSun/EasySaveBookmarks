from tastypie.resources import ModelResource
from tastypie import fields
from tastypie.authorization import DjangoAuthorization
from tastypie.constants import ALL
from models import bookmark, tag


class tagResource(ModelResource):
    class Meta:
        queryset = tag.objects.all()
        resource_name = 'tag'
        authorization = DjangoAuthorization()
        #fields=['tag_name']

class bookmarkResource(ModelResource):
    tag = fields.ForeignKey(tagResource, 'tag')

    class Meta:
        queryset = bookmark.objects.all()
        resource_name = 'bookmark'
        authorization = DjangoAuthorization()

        #fields = ['description', 'where', 'tag__tag_name']
