docker build -t observability-node-app .
minikube image load observability-node-app
kubectl create namespace monitoring
1. Install Prometheus Stack: 
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo update
    helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring -f prometheus-values.yaml

2. Install Loki:
    helm repo add grafana https://grafana.github.io/helm-charts
    helm repo update
    helm install loki grafana/loki -n monitoring -f loki-values.yaml

3. Install Tempo:
    helm install tempo grafana/tempo -n monitoring -f tempo-values.yaml

kubectl apply -f mysql-deployment.yaml
kubectl apply -f app-deployment.yaml
kubectl apply -f otel-collector.yaml

kubectl port-forward svc/prometheus-grafana 3000:80 -n monitoring
kubectl get secret prometheus-grafana -n monitoring -o jsonpath="{.data.admin-password}" | base64 -d

helm uninstall prometheus -n monitoring
helm uninstall loki -n monitoring
helm uninstall tempo -n monitoring
kubectl delete namespace monitoring

192.168.49.2	grafana.local
192.168.49.2	prometheus.local
192.168.49.2	loki.local
192.168.49.2	tempo.local
192.168.49.2	app.local
