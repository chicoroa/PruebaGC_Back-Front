from pyexpat import model
from rest_framework import serializers
from .models import Annos, Enfermedades, Encabezados, Datos

class AnnosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annos
        fields = '__all__'


class EnfermedadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enfermedades
        fields = ('nombre','fieldName','totalCasos')

class EncabezadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encabezados
        fields = '__all__'

class DatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Datos
        fields = '__all__'
        