from django.shortcuts import render
from .models import Upload
import json
from django.http import JsonResponse
from django.core import serializers
from .forms import PhotoFrom


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


def index(request):
    form = PhotoFrom(request.POST or None, request.FILES or None)
    data = {}
    if is_ajax(request):
        pic_id = json.loads(request.POST.get('id'))
        action = request.POST.get('action')
        print(action)
        print("post data", request.POST)
        if pic_id is None:
            if form.is_valid():
                obj = form.save(commit=False)
        else:
            obj = Upload.objects.get(id=pic_id)
        obj.action = action
        obj.save()
        data = serializers.serialize('json', [obj])
        return JsonResponse({"data": data})
    context = {
        "form": form,
    }

    return render(request, "editor/main.html", context)
