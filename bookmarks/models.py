from django.db import models

# Create your models here.
class tag(models.Model):
    tag_name = models.CharField(max_length=100)
    tag_description = models.TextField(blank=True)

    def __str__(self):
        return self.tag_name

    class Meta:
        ordering = ('tag_name',)

class bookmark(models.Model):
    tag = models.ForeignKey(tag)
    description = models.TextField()
    where = models.URLField()

    def __str__(self):
        return self.where

    class Meta:
        ordering = ('tag__tag_name',)

