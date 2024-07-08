#!/bin/bash

# Aplicar los despliegues
kubectl delete -f postgres-deployment.yaml
kubectl delete -f nestjs-deployment.yaml
kubectl delete -f reactjs-deployment.yaml

# Aplicar los servicios
kubectl delete -f postgres-service.yaml
kubectl delete -f nestjs-service.yaml
kubectl delete -f reactjs-service.yaml
