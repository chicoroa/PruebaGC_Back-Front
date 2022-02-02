from django.contrib import admin
from django.urls import path
from API.views import insertarData, obtenerDatos


urlpatterns = [
    path('admin/', admin.site.urls),
    path('insertarData/', insertarData.as_view()), 
    path('obtenerDatos/', obtenerDatos.as_view()), 
]
