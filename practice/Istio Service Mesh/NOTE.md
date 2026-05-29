minikube start --cpus=4 --memory=6144

curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

helm repo add istio https://istio-release.storage.googleapis.com/charts
helm repo update

kubectl create namespace istio-system

curl -L https://istio.io/downloadIstio | sh -

helm install istio-base istio/base -n istio-system

helm install istiod istio/istiod -n istio-system --wait

helm install istio-ingressgateway istio/gateway -n istio-system --wait

kubectl get pods -A

kubectl get ns default --show-labels

kubectl label namespace default istio-injection=enabled

kubectl apply -f kubernetes-manifests.yaml

kubectl apply -f samples/addons

grafana, prometheus, jaeger, kiali