from django.core.serializers.json import DjangoJSONEncoder
import json
from tastypie.serializers import Serializer
from tastypie.resources import ModelResource
from tastypie import fields
from tastypie.authorization import DjangoAuthorization
from models import bookmark, tag


# Make tastypie API output Json more readable
class PrettyJSONSerializer(Serializer):
    json_indent = 4

    def to_json(self, data, options=None):
        options = options or {}
        data = self.to_simple(data, options)
        return json.dumps(data, cls=DjangoJSONEncoder,
                         sort_keys=True, ensure_ascii=False, indent=self.json_indent)


class tagResource(ModelResource):
    class Meta:
        queryset = tag.objects.all()
        serializer = PrettyJSONSerializer()
        # fields = ['tag_name']
        resource_name = 'tag'
        authorization = DjangoAuthorization()


class bookmarkResource(ModelResource):
    tag = fields.ToOneField(tagResource, 'tag', full=True)
    #tag = fields.CharField(attribute='tag_name')
    class Meta:
        queryset = bookmark.objects.all()
        serializer = PrettyJSONSerializer()
        resource_name = 'bookmark'
        authorization = DjangoAuthorization()

        #fields = ['description','where', 'tag__tag_name']
