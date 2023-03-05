from django import forms
from .models import Upload


class PhotoFrom(forms.ModelForm):
    class Meta:
        model = Upload
        fields = ['image']
