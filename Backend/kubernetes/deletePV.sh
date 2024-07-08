# Borrar PersistentVolume y PersistentVolumeClaim para PostgreSQL
kubectl delete -f postgres-pv.yaml
kubectl delete -f postgres-pvc.yaml