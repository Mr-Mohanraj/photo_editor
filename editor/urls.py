from django.urls import path
from editor import views

app_name = 'editor'

urlpatterns = [
    path("", views.index, name="index"),
]
