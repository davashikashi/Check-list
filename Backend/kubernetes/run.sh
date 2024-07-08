#!/bin/bash

# Crear PersistentVolume y PersistentVolumeClaim para PostgreSQL
kubectl apply -f postgres-pv.yaml
kubectl apply -f postgres-pvc.yaml

# Aplicar los despliegues
kubectl apply -f postgres-deployment.yaml
kubectl apply -f nestjs-deployment.yaml
kubectl apply -f reactjs-deployment.yaml

# Aplicar los servicios
kubectl apply -f postgres-service.yaml
kubectl apply -f nestjs-service.yaml
kubectl apply -f reactjs-service.yaml
