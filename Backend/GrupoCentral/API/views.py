import requests, json, numpy
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework import viewsets      

from .serializers import AnnosSerializer, EnfermedadeSerializer, EncabezadoSerializer, DatoSerializer 
from .models import Annos, Enfermedades, Encabezados, Datos 
# Create your views here.


class insertarData(generics.ListAPIView):
    API_URL = "https://data.cdc.gov/api/views/bxq8-mugm/rows.json?"
    data = requests.get(API_URL)
    json_data = data.json()
    meta = json_data.get('meta')
    data = json_data.get('data')

    def obtenerAnnos(meta):
        for m in meta['view']['columns']:
            dataM = json.loads(json.dumps(m))
            if(dataM['fieldName'] == 'year'):
                items = dataM['cachedContents']['top']
                for anno in items:
                    Annos.objects.create(nombre=anno["item"])

    def obtenerEncabezadosEnfermedades(meta):
        x = 0
        for e in meta["view"]["columns"]:
            items = json.loads(json.dumps(e))
            if(items["id"] != -1):
                nombre = items["name"]
                fieldName = items["fieldName"]
                Encabezados.objects.create(nombre=nombre, fieldName = fieldName)
                if(x > 2):
                    Enfermedades.objects.create(nombre=nombre, fieldName = fieldName, totalCasos=0)
                x=x+1

    def obtencionData(data):
        for item in data:
            position = item[2]
            jurisdiction_of_occurrence = item[8] 
            year = item[9]
            month = item[10]
            all_cause = item[11]
            natural_cause = item[12]
            septicemia = item[13]
            malignant_neoplasms = item[14]
            diabetes_mellitus = item[15]
            alzheimer_disease = item[16]
            influenza_and_pneumonia = item[17]
            chronic_lower_respiratory = item[18]
            other_diseases_of_respiratory = item[19]
            nephritis_nephrotic_syndrom = item[20]
            symptoms_signs_and_abnormal = item[21]
            diseases_of_heart = item[22]
            cerebrovascular_diseases = item[23]
            accidents_unintentional = item[24]
            motor_vehicle_accidents = item[25]
            intentional_self_harm_suicide = item[26]
            assault_homicide = item[27]
            drug_overdose = item[28]

            Datos.objects.create(position = position, jurisdiction_of_occurrence = jurisdiction_of_occurrence,
            year = year, month = month, all_cause = all_cause, natural_cause = natural_cause, septicemia = septicemia,
            malignant_neoplasms = malignant_neoplasms, diabetes_mellitus = diabetes_mellitus, alzheimer_disease = alzheimer_disease, 
            influenza_and_pneumonia = influenza_and_pneumonia, chronic_lower_respiratory = chronic_lower_respiratory,
            other_diseases_of_respiratory = other_diseases_of_respiratory,nephritis_nephrotic_syndrom = nephritis_nephrotic_syndrom, 
            symptoms_signs_and_abnormal = symptoms_signs_and_abnormal, diseases_of_heart = diseases_of_heart, 
            cerebrovascular_diseases = cerebrovascular_diseases, accidents_unintentional = accidents_unintentional, 
            motor_vehicle_accidents = motor_vehicle_accidents, intentional_self_harm_suicide = intentional_self_harm_suicide, 
            assault_homicide = assault_homicide,drug_overdose = drug_overdose) 

    obtenerAnnos(meta)
    obtenerEncabezadosEnfermedades(meta)
    obtencionData(data)

    def get(self, request):
        annos = Annos.objects.all()
        enfermedades = Enfermedades.objects.all()
        encabezados = Encabezados.objects.all()
        datos = Datos.objects.all()


        listaAnnos = AnnosSerializer(annos, many=True)
        listaEnfermedades = EnfermedadeSerializer(enfermedades, many=True)
        datosEncabezados = EncabezadoSerializer(encabezados, many=True)
        datosGenerales = DatoSerializer(datos, many=True)

        return Response({
            'Carga':"Se realiza la carga con éxito",
            'Annos':listaAnnos.data,
            'Enfermedades': listaEnfermedades.data,
            'Encabezados': datosEncabezados.data,
            'Datos': datosGenerales.data
        })
    
class obtenerDatos(generics.RetrieveAPIView):  
    def get(self, request):
        annos = Annos.objects.all()
        enfermedades = Enfermedades.objects.all()
        encabezados = Encabezados.objects.all()
        datos = Datos.objects.all()


        listaAnnos = AnnosSerializer(annos, many=True)
        listaEnfermedades = EnfermedadeSerializer(enfermedades, many=True)
        datosEncabezados = EncabezadoSerializer(encabezados, many=True)
        datosGenerales = DatoSerializer(datos, many=True)

        return Response({
            'Annos':listaAnnos.data,
            'Enfermedades': listaEnfermedades.data,
            'Encabezados': datosEncabezados.data,
            'Datos': datosGenerales.data
        })