from django.shortcuts import render_to_response, HttpResponse
import urllib
# Create your views here.
def index(request):
    index = urllib.urlopen('static/bookMark.html').read()
    return HttpResponse(index)
    #return HttpResponse("<script>alert('welcome');</script>")