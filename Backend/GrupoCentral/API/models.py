from django.db import models

class Encabezados(models.Model):
    nombre = models.CharField(max_length = 254)
    fieldName = models.CharField(max_length = 255, null=True)


    def __str__(self):
        return self.nombre

class Annos(models.Model):
    nombre = models.CharField(max_length = 4)

    def __str__(self):
        return self.nombre

class Enfermedades(models.Model):
    nombre = models.CharField(max_length = 255)
    fieldName = models.CharField(max_length = 255, null=True)
    totalCasos = models.IntegerField()

    def __str__(self):
        return self.nombre

class Datos(models.Model):
    position = models.IntegerField()
    jurisdiction_of_occurrence = models.CharField(max_length = 13)
    year = models.IntegerField()
    month = models.IntegerField()
    all_cause = models.IntegerField()
    natural_cause = models.IntegerField()
    septicemia = models.IntegerField()
    malignant_neoplasms = models.IntegerField()
    diabetes_mellitus = models.IntegerField()
    alzheimer_disease = models.IntegerField()
    influenza_and_pneumonia = models.IntegerField()
    chronic_lower_respiratory = models.IntegerField()
    other_diseases_of_respiratory = models.IntegerField()
    nephritis_nephrotic_syndrom = models.IntegerField()
    symptoms_signs_and_abnormal = models.IntegerField()
    diseases_of_heart = models.IntegerField()
    cerebrovascular_diseases = models.IntegerField()
    accidents_unintentional = models.IntegerField()
    motor_vehicle_accidents = models.IntegerField()
    intentional_self_harm_suicide = models.IntegerField()
    assault_homicide = models.IntegerField()
    drug_overdose = models.IntegerField()


    def __str__(self):
        return self.id
    