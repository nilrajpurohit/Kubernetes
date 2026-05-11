# Kubernetes Complete Roadmap
### From Beginner to Expert

---

# Table of Contents

## 🟢 Beginner Level — Kubernetes Fundamentals

1. [Prerequisites](#1-prerequisites)
2. [What is Kubernetes?](#2-core-concepts)
3. [Kubernetes Architecture](#2-core-concepts)
4. [Setting Up a Local Cluster](#3-setting-up-a-local-cluster)
5. [kubectl Essentials](#4-essential-kubectl-commands)
6. [Pods, Deployments & Services](#5-core-workload-resources)
7. [Service Types](#6-service-types)
8. [ConfigMaps & Secrets](#7-configuration-resources)
9. [Beginner Hands-On Checklist](#8-beginner-checklist)

---

## 🔵 Intermediate Level — Application Operations

10. [Advanced Workload Controllers](#1-advanced-workload-controllers)
    * ReplicaSet
    * StatefulSet
    * DaemonSet
    * Job & CronJob
11. [Storage & Persistent Data](#2-storage)
    * PersistentVolumes
    * PersistentVolumeClaims
    * StorageClasses
12. [Networking Deep Dive](#3-networking-deep-dive)
    * Ingress
    * Gateway API
    * NetworkPolicy
13. [Resource Management](#4-resource-management)
    * Requests & Limits
    * LimitRange
    * ResourceQuota
14. [Health Checks & Probes](#5-health-probes)
15. [Scheduling & Placement](#6-scheduling--affinity)
    * Node Affinity
    * Pod Affinity
    * Taints & Tolerations
16. [RBAC & Security Basics](#7-rbac-role-based-access-control)
17. [Kustomize & Helm](#8-helm--kubernetes-package-manager)
18. [Kubernetes Troubleshooting](#9-kubernetes-troubleshooting)
19. [Intermediate Hands-On Checklist](#9-intermediate-checklist)

---

## 🟠 Advanced Level — Production Kubernetes

20. [Cluster Administration](#1-cluster-administration)
    * kubeadm
    * etcd Operations
    * Certificate Management
21. [Autoscaling](#2-autoscaling)
    * HPA
    * VPA
    * Cluster Autoscaler
    * KEDA
22. [Observability Stack](#3-observability-stack)
    * Prometheus
    * Grafana
    * Logging
    * Tracing
    * Alerting
23. [GitOps & CI/CD](#4-gitops--cicd)
    * ArgoCD
    * Flux CD
    * GitHub Actions / GitLab CI
24. [Service Mesh](#5-service-mesh--istio--linkerd)
25. [Security Hardening](#6-security-hardening)
    * Pod Security Standards
    * Security Contexts
    * Image Security
    * Supply Chain Security
26. [Custom Resources & Operators](#7-custom-resources--operators)
27. [Managed Kubernetes Platforms](#8-managed-kubernetes-platforms)
    * EKS
    * GKE
    * AKS
28. [Multi-Tenancy Patterns](#9-multi-tenancy-patterns)
29. [Advanced Hands-On Checklist](#9-advanced-checklist)

---

## 🔴 Expert Level — Platform Engineering & Scale

30. [Cluster API (CAPI)](#1-cluster-api-capi)
31. [Multi-Cluster Management](#2-multi-cluster-management)
32. [CNI & eBPF Deep Dive](#3-cni-deep-dive)
33. [Kubernetes API Internals](#4-kubernetes-api-internals)
    * Admission Controllers
    * API Aggregation
    * Policy Engines
34. [Performance Engineering](#5-performance-engineering)
35. [Disaster Recovery & Backup Strategies](#6-disaster-recovery--business-continuity)
36. [Cost Optimization at Scale](#7-cost-optimization-at-scale)
37. [Platform Engineering](#8-platform-engineering)
    * Backstage
    * Crossplane
    * Internal Developer Platforms
38. [Contributing to the Kubernetes Ecosystem](#9-contributing-to-the-ecosystem)
39. [Expert Hands-On Checklist](#10-expert-checklist)

---

## 🧪 Real-World Projects

40. [Beginner Projects](#beginner-projects)
41. [Intermediate Projects](#intermediate-projects)
42. [Advanced Projects](#advanced-projects)
43. [Expert-Level Projects](#expert-level-projects)

---

## 📚 Learning Resources

44. [Official Documentation](#official-documentation)
45. [Books](#books)
46. [Hands-On Labs](#hands-on-labs)
47. [Video Courses](#video-courses)

---

## 🏆 Certification Path

48. [KCNA](#certification-path)
49. [CKAD](#certification-path)
50. [CKA](#certification-path)
51. [CKS](#certification-path)
52. [KCSA](#certification-path)

---

## 🗺️ Learning Timeline Summary

53. [Complete Learning Path Summary](#-complete-learning-path-summary)
---

## 🟢 Beginner Level

> **Goal:** Understand what Kubernetes is, why it exists, and how to interact with a cluster at a basic level.
> **Estimated Time:** 4–6 weeks

---

### 1. Prerequisites

Before touching Kubernetes, be comfortable with:

- **Linux fundamentals** — file system, processes, networking commands (`curl`, `ping`, `netstat`, `ss`)
- **Containers & Docker** — build images, run containers, understand layers, volumes, port mapping
- **Basic networking** — IP addressing, DNS, ports, HTTP/HTTPS
- **YAML syntax** — writing and reading `.yaml` / `.yml` files
- **Command line proficiency** — shell scripting basics, environment variables

---

### 2. Core Concepts

#### What is Kubernetes?
- Container orchestration platform originally developed by Google
- Automates deployment, scaling, and management of containerized applications
- Open-source, governed by the CNCF (Cloud Native Computing Foundation)

#### Architecture Overview

```
Control Plane                     Worker Nodes
┌────────────────────┐            ┌─────────────────────┐
│  API Server        │◄──────────►│  kubelet            │
│  etcd              │            │  kube-proxy         │
│  Scheduler         │            │  Container Runtime  │
│  Controller Manager│            │  (containerd/CRI-O) │
└────────────────────┘            └─────────────────────┘
```

#### Key Components to Learn

| Component | Description |
|-----------|-------------|
| **Node** | A physical or virtual machine running workloads |
| **Pod** | Smallest deployable unit; wraps one or more containers |
| **Namespace** | Virtual cluster for isolating resources |
| **kubelet** | Agent running on each node |
| **kube-proxy** | Network proxy on each node |
| **API Server** | Central management point for the cluster |
| **etcd** | Distributed key-value store for cluster state |
| **Scheduler** | Assigns Pods to Nodes |
| **Controller Manager** | Runs controllers to reconcile desired state |

---

### 3. Setting Up a Local Cluster

Choose one of the following for learning:

- **Minikube** — Single-node cluster on your local machine (recommended for beginners)
- **Kind (Kubernetes in Docker)** — Multi-node clusters using Docker containers
- **k3s** — Lightweight Kubernetes for local or edge use
- **Docker Desktop** — Built-in Kubernetes for Mac/Windows

```bash
# Minikube quick start
minikube start
kubectl cluster-info
kubectl get nodes
```

---

### 4. Essential kubectl Commands

```bash
# Cluster info
kubectl version
kubectl cluster-info
kubectl get nodes

# Namespaces
kubectl get namespaces
kubectl create namespace my-app

# Pods
kubectl get pods
kubectl get pods -n kube-system
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl exec -it <pod-name> -- /bin/bash
kubectl delete pod <pod-name>

# Apply manifests
kubectl apply -f deployment.yaml
kubectl delete -f deployment.yaml

# Get all resources
kubectl get all -n <namespace>
```

---

### 5. Core Workload Resources

#### Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  namespace: default
  labels:
    app: nginx
spec:
  containers:
    - name: nginx
      image: nginx:1.25
      ports:
        - containerPort: 80
```

#### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.25
          ports:
            - containerPort: 80
```

#### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

---

### 6. Service Types

| Type | Description | Use Case |
|------|-------------|----------|
| **ClusterIP** | Internal cluster IP only | Internal communication |
| **NodePort** | Exposes service on a port of each node | Dev/testing |
| **LoadBalancer** | Provisions a cloud load balancer | Production ingress |
| **ExternalName** | Maps to an external DNS name | External services |

---

### 7. Configuration Resources

#### ConfigMap
Store non-sensitive configuration data.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  LOG_LEVEL: info
```

#### Secret
Store sensitive data (base64-encoded).

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  password: cGFzc3dvcmQ=   # base64 encoded "password"
```

---

### 8. Beginner Checklist

- [ ] Install and start Minikube or Kind
- [ ] Deploy a container image using `kubectl run`
- [ ] Write and apply your first Deployment YAML
- [ ] Expose a Deployment using a Service
- [ ] Use `kubectl logs` and `kubectl exec` to debug
- [ ] Create a ConfigMap and mount it in a Pod
- [ ] Create a Secret and use it as an environment variable
- [ ] Scale a Deployment up and down
- [ ] Delete and recreate resources using YAML files

---

## 🔵 Intermediate Level

> **Goal:** Manage real applications, understand storage, networking, and operations with best practices.
> **Estimated Time:** 6–10 weeks

---

### 1. Advanced Workload Controllers

#### ReplicaSet
Ensures a specified number of pod replicas are running. Usually managed by a Deployment.

#### StatefulSet
For stateful applications needing stable network identity and persistent storage.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: "postgres"
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:15
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi
```

#### DaemonSet
Ensures a Pod runs on every (or selected) node — great for log collectors, monitoring agents.

#### Job & CronJob
Run batch tasks and scheduled tasks respectively.

```yaml
# CronJob example
apiVersion: batch/v1
kind: CronJob
metadata:
  name: daily-backup
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: backup
              image: backup-tool:latest
          restartPolicy: OnFailure
```

---

### 2. Storage

#### Volumes & PersistentVolumes

```
Pod → PersistentVolumeClaim (PVC) → PersistentVolume (PV) → Storage Backend
```

| Resource | Description |
|----------|-------------|
| **PersistentVolume (PV)** | Cluster-level storage resource |
| **PersistentVolumeClaim (PVC)** | User request for storage |
| **StorageClass** | Defines storage provisioner and parameters |

```yaml
# StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3

---
# PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  storageClassName: fast-ssd
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

**Access Modes:**
- `ReadWriteOnce (RWO)` — Single node read/write
- `ReadOnlyMany (ROX)` — Multiple nodes read-only
- `ReadWriteMany (RWX)` — Multiple nodes read/write

---

### 3. Networking Deep Dive

#### Ingress
Routes external HTTP/HTTPS traffic to internal services.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 8080
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
  tls:
    - hosts:
        - myapp.example.com
      secretName: tls-secret
```

#### NetworkPolicy
Control traffic flow between Pods.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
spec:
  podSelector: {}
  policyTypes:
    - Ingress
```

---

### 4. Resource Management

#### Requests and Limits

```yaml
resources:
  requests:
    cpu: "250m"       # 0.25 CPU cores
    memory: "128Mi"
  limits:
    cpu: "500m"
    memory: "256Mi"
```

#### LimitRange
Set default resource constraints per namespace.

#### ResourceQuota
Restrict total resource consumption per namespace.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: dev-quota
  namespace: development
spec:
  hard:
    pods: "20"
    requests.cpu: "4"
    requests.memory: 4Gi
    limits.cpu: "8"
    limits.memory: 8Gi
```

---

### 5. Health Probes

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 15

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10

startupProbe:
  httpGet:
    path: /started
    port: 8080
  failureThreshold: 30
  periodSeconds: 10
```

| Probe | Failure Action |
|-------|---------------|
| **Liveness** | Restart container |
| **Readiness** | Remove from Service endpoints |
| **Startup** | Delay other probes until app starts |

---

### 6. Scheduling & Affinity

#### Node Selectors & Node Affinity

```yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
        - matchExpressions:
            - key: kubernetes.io/arch
              operator: In
              values:
                - amd64
```

#### Pod Affinity & Anti-Affinity
Co-locate or spread Pods across nodes/zones.

#### Taints & Tolerations
Repel or allow Pods from specific nodes.

```bash
# Taint a node
kubectl taint nodes node1 key=value:NoSchedule

# Toleration in Pod spec
tolerations:
  - key: "key"
    operator: "Equal"
    value: "value"
    effect: "NoSchedule"
```

---

### 7. RBAC (Role-Based Access Control)

```yaml
# Role
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "watch", "list"]

---
# RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
  - kind: User
    name: jane
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

**Scope Comparison:**

| Resource | Scope |
|----------|-------|
| Role | Namespace |
| ClusterRole | Cluster-wide |
| RoleBinding | Namespace |
| ClusterRoleBinding | Cluster-wide |

---

### 8. Helm — Kubernetes Package Manager

```bash
# Install Helm
brew install helm

# Add a repo
helm repo add bitnami https://charts.bitnami.com/bitnami

# Search for charts
helm search repo bitnami/nginx

# Install a chart
helm install my-nginx bitnami/nginx --namespace prod --create-namespace

# List releases
helm list -A

# Upgrade a release
helm upgrade my-nginx bitnami/nginx --set replicaCount=3

# Rollback
helm rollback my-nginx 1

# Uninstall
helm uninstall my-nginx
```

---

### 9. Intermediate Checklist

- [ ] Deploy a StatefulSet (e.g., a database)
- [ ] Configure PersistentVolumeClaims and StorageClasses
- [ ] Set up an Ingress controller and route traffic
- [ ] Define and apply NetworkPolicies
- [ ] Configure resource requests and limits
- [ ] Write health probes for all containers
- [ ] Implement RBAC for a service account
- [ ] Install and customize a Helm chart
- [ ] Set up Pod affinity and anti-affinity rules
- [ ] Create a CronJob for a scheduled task

---

## 🟠 Advanced Level

> **Goal:** Operate production-grade clusters, implement observability, CI/CD, autoscaling, and multi-cluster patterns.
> **Estimated Time:** 8–12 weeks

---

### 1. Cluster Administration

#### kubeadm — Bootstrapping Clusters

```bash
# Initialize control plane
kubeadm init --pod-network-cidr=10.244.0.0/16

# Join a worker node
kubeadm join <control-plane-host>:<port> \
  --token <token> \
  --discovery-token-ca-cert-hash sha256:<hash>
```

#### etcd Operations
- Back up etcd: `etcdctl snapshot save`
- Restore from snapshot: `etcdctl snapshot restore`
- Understanding etcd quorum: needs majority of members alive

#### Certificate Management
- Certificates expire (default 1 year)
- Use `kubeadm certs check-expiration`
- Rotate with `kubeadm certs renew all`

---

### 2. Autoscaling

#### Horizontal Pod Autoscaler (HPA)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-deployment
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: AverageValue
          averageValue: 512Mi
```

#### Vertical Pod Autoscaler (VPA)
Automatically adjusts CPU/memory requests and limits.

#### Cluster Autoscaler
Adds or removes nodes based on pending Pods. Integrates with cloud provider APIs (AWS, GCP, Azure).

#### KEDA (Kubernetes Event-Driven Autoscaling)
Scale workloads based on external event sources (Kafka, RabbitMQ, Prometheus metrics, SQS, etc.).

---

### 3. Observability Stack

#### Metrics — Prometheus + Grafana

```bash
# Install via Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace
```

Key metrics to monitor:
- `container_cpu_usage_seconds_total`
- `container_memory_working_set_bytes`
- `kube_pod_status_phase`
- `kube_deployment_status_replicas_available`
- `apiserver_request_duration_seconds`

#### Logging — EFK/ELK Stack
- **Elasticsearch** — Log storage and indexing
- **Fluentd / Fluent Bit** — Log shipping (DaemonSet on each node)
- **Kibana** — Log visualization

#### Distributed Tracing — Jaeger / Tempo
Trace requests across microservices using OpenTelemetry instrumentation.

#### Alerting
Define PrometheusRule resources for alerting.

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: pod-restart-alert
spec:
  groups:
    - name: pod.rules
      rules:
        - alert: PodCrashLooping
          expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: "Pod {{ $labels.pod }} is crash looping"
```

---

### 4. GitOps & CI/CD

#### ArgoCD

```yaml
# Application definition
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/repo
    targetRevision: main
    path: k8s/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

#### Flux CD
Pull-based GitOps with Kustomization and HelmRelease controllers.

#### CI/CD Pipeline Integration
- GitHub Actions / GitLab CI → Build image → Push to registry → Update image tag → ArgoCD syncs

---

### 5. Service Mesh — Istio / Linkerd

#### Why Service Mesh?
- **Mutual TLS (mTLS)** — Encrypted service-to-service communication
- **Traffic management** — Canary releases, A/B testing, circuit breaking
- **Observability** — Automatic metrics, tracing for all service calls

#### Istio Traffic Management

```yaml
# VirtualService for canary
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-service
spec:
  hosts:
    - my-service
  http:
    - route:
        - destination:
            host: my-service
            subset: v1
          weight: 90
        - destination:
            host: my-service
            subset: v2
          weight: 10
```

---

### 6. Security Hardening

#### Pod Security Standards (PSS)
Replace deprecated PodSecurityPolicy with:
- **Privileged** — No restrictions
- **Baseline** — Prevents known privilege escalations
- **Restricted** — Heavily restricted, best practices enforced

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: secure-ns
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

#### Security Context

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  runAsGroup: 1000
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL
```

#### Image Security
- Use image digests (`image: nginx@sha256:abc123...`)
- Integrate image scanning (Trivy, Snyk, Anchore)
- Use private registries with imagePullSecrets
- Enforce policies with OPA/Kyverno

---

### 7. Custom Resources & Operators

#### Custom Resource Definitions (CRD)

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: databases.myorg.io
spec:
  group: myorg.io
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                engine:
                  type: string
                replicas:
                  type: integer
  scope: Namespaced
  names:
    plural: databases
    singular: database
    kind: Database
```

#### Building an Operator
- Use **Operator SDK** or **Kubebuilder**
- Operators implement the reconciliation loop (observe → analyze → act)
- Examples: Prometheus Operator, Cert-Manager, Strimzi (Kafka)

---

### 8. Multi-Tenancy Patterns

- **Namespace-based isolation** — Separate namespaces per team/environment
- **Virtual Clusters (vCluster)** — Lightweight isolated clusters inside a namespace
- **Hierarchical Namespaces (HNC)** — Parent-child namespace relationships
- **Cluster-per-tenant** — Full isolation with fleet management (Rancher, Cluster API)

---

### 9. Advanced Checklist

- [ ] Bootstrap a multi-node cluster with kubeadm
- [ ] Configure HPA and VPA for a Deployment
- [ ] Set up Cluster Autoscaler on a cloud provider
- [ ] Deploy Prometheus + Grafana and create dashboards
- [ ] Set up centralized logging with Fluentd/Fluent Bit
- [ ] Implement GitOps with ArgoCD or Flux
- [ ] Install and configure a service mesh (Istio or Linkerd)
- [ ] Harden cluster with Pod Security Standards
- [ ] Write and deploy a CRD
- [ ] Back up and restore etcd
- [ ] Implement canary deployment using Argo Rollouts or Istio

---

## 🔴 Expert Level

> **Goal:** Design, build, and operate large-scale, multi-cluster Kubernetes platforms. Contribute to the ecosystem.
> **Estimated Time:** Ongoing mastery (6+ months)

---

### 1. Cluster API (CAPI)

Declaratively provision and manage Kubernetes clusters using Kubernetes itself.

```yaml
apiVersion: cluster.x-k8s.io/v1beta1
kind: Cluster
metadata:
  name: prod-cluster
spec:
  clusterNetwork:
    pods:
      cidrBlocks: ["192.168.0.0/16"]
  infrastructureRef:
    apiVersion: infrastructure.cluster.x-k8s.io/v1beta2
    kind: AWSCluster
    name: prod-cluster
  controlPlaneRef:
    apiVersion: controlplane.cluster.x-k8s.io/v1beta2
    kind: KubeadmControlPlane
    name: prod-cluster-cp
```

---

### 2. Multi-Cluster Management

#### Fleet Management Tools

| Tool | Use Case |
|------|----------|
| **Cluster API** | Lifecycle management of clusters |
| **Rancher** | Full UI-driven multi-cluster management |
| **ArgoCD ApplicationSet** | GitOps across multiple clusters |
| **Submariner** | Cross-cluster networking |
| **Liqo** | Cross-cluster workload offloading |

#### Federation Patterns
- Active-active: workloads spread across clusters
- Active-passive: failover across regions
- Hub-spoke: central management cluster + leaf clusters

---

### 3. CNI Deep Dive

Understanding Container Network Interface plugins:

| CNI Plugin | Notable Features |
|-----------|-----------------|
| **Calico** | BGP routing, NetworkPolicy, eBPF dataplane |
| **Cilium** | eBPF-based, L7 policies, Hubble observability |
| **Flannel** | Simple overlay, VXLAN |
| **Weave** | Mesh networking, encryption |

#### eBPF with Cilium
Replace kube-proxy entirely, implement L7 policies, observe flows with Hubble.

```bash
# Install Cilium with Hubble
cilium install --set hubble.relay.enabled=true \
               --set hubble.ui.enabled=true \
               --set kubeProxyReplacement=strict
```

---

### 4. Kubernetes API Internals

#### Admission Controllers
- **Webhooks** — Mutating and Validating admission webhooks
- **OPA Gatekeeper** — Policy engine using Rego
- **Kyverno** — Kubernetes-native policy engine

```yaml
# Kyverno policy: require resource limits
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-limits
spec:
  validationFailureAction: enforce
  rules:
    - name: check-limits
      match:
        resources:
          kinds:
            - Pod
      validate:
        message: "Resource limits are required."
        pattern:
          spec:
            containers:
              - resources:
                  limits:
                    cpu: "?*"
                    memory: "?*"
```

#### API Extension Mechanisms

```
API Request → Authentication → Authorization (RBAC) →
Admission Controllers (Mutating → Validating) → etcd
```

#### Custom API Servers (Aggregation Layer)
Extend the API server with custom API groups using API aggregation.

---

### 5. Performance Engineering

#### etcd Tuning
- Use SSD storage for etcd
- Defragment regularly: `etcdctl defrag`
- Monitor `etcd_disk_wal_fsync_duration_seconds`
- Separate etcd from control plane nodes at scale

#### API Server Tuning
- `--max-requests-inflight` — Concurrent non-mutating requests
- `--max-mutating-requests-inflight` — Concurrent mutating requests
- Enable API Priority and Fairness (APF)

#### Scheduler Optimization
- Tune `percentageOfNodesToScore` for large clusters
- Custom scheduler plugins using Scheduling Framework
- `TopologySpreadConstraints` for even distribution

#### Large-Scale Benchmarks
- 5,000 nodes per cluster (official support)
- 150,000 Pods per cluster
- Use `kube-burner` or `clusterloader2` for load testing

---

### 6. Disaster Recovery & Business Continuity

#### Backup Strategy

```bash
# Velero — cluster backup and restore
velero install \
  --provider aws \
  --plugins velero/velero-plugin-for-aws:v1.8.0 \
  --bucket my-backup-bucket \
  --backup-location-config region=us-east-1

# Schedule backups
velero schedule create daily \
  --schedule="0 1 * * *" \
  --include-namespaces production

# Restore
velero restore create --from-backup daily-20240101
```

#### DR Patterns
- **Active-Active** — Traffic split across regions; RPO ~0
- **Active-Passive** — Standby cluster; RTO minutes
- **Backup-Restore** — Cold standby; RTO hours

---

### 7. Cost Optimization at Scale

- **Right-sizing** — Use VPA recommendations, `kubectl-resource-capacity`
- **Spot/Preemptible Instances** — Use with `PodDisruptionBudgets` and tolerations
- **Bin-packing** — Tune Scheduler scoring for resource density
- **Descheduler** — Evict and rebalance Pods to optimal nodes
- **Kubecost / OpenCost** — Track and allocate spend per namespace/team
- **Node pool strategies** — Separate pools by workload type (CPU-optimized, memory-optimized, GPU)

---

### 8. Platform Engineering

#### Internal Developer Platform (IDP)
Build self-service platforms on top of Kubernetes:

- **Backstage** — Developer portal (service catalog, templates)
- **Crossplane** — Infrastructure provisioning via CRDs
- **Port** — Internal developer portal
- **Kratix** — Platform as a Product framework

#### Crossplane — Infrastructure as CRDs

```yaml
apiVersion: database.aws.crossplane.io/v1beta1
kind: RDSInstance
metadata:
  name: prod-db
spec:
  forProvider:
    region: us-east-1
    dbInstanceClass: db.t3.medium
    engine: postgres
    engineVersion: "15"
    allocatedStorage: 100
  writeConnectionSecretsToRef:
    namespace: default
    name: db-connection
```

---

### 9. Contributing to the Ecosystem

#### Areas to Contribute
- **Kubernetes SIGs** — Special Interest Groups (sig-network, sig-storage, sig-scheduling, etc.)
- **CNCF Projects** — Contribute to Prometheus, Argo, Flux, Cilium, etc.
- **KEPs (Kubernetes Enhancement Proposals)** — Design and propose new features

#### How to Start
1. Join the `kubernetes-dev` mailing list and Slack
2. Pick a SIG aligned with your interests
3. Attend weekly SIG meetings (public, recorded)
4. Find `good first issue` labeled issues on GitHub
5. Write docs, tests, bug fixes before tackling features

---

### 10. Expert Checklist

- [ ] Design and provision clusters using Cluster API
- [ ] Manage a fleet of clusters with ArgoCD ApplicationSets
- [ ] Implement eBPF-based networking with Cilium
- [ ] Write a Mutating Admission Webhook
- [ ] Build a Kubernetes Operator with Kubebuilder
- [ ] Implement cluster-wide policy enforcement with Kyverno or OPA
- [ ] Set up Velero for scheduled backups and perform a full restore
- [ ] Load test a cluster with clusterloader2 or kube-burner
- [ ] Build an Internal Developer Platform with Backstage + Crossplane
- [ ] Achieve multi-region active-active deployments
- [ ] Contribute a PR to a CNCF project or Kubernetes itself

---

## 📚 Learning Resources

### Official Documentation
- [kubernetes.io/docs](https://kubernetes.io/docs/home/) — Authoritative reference
- [CNCF Landscape](https://landscape.cncf.io/) — Ecosystem overview
- [Kubernetes GitHub](https://github.com/kubernetes/kubernetes)

### Books
| Book | Level |
|------|-------|
| Kubernetes: Up and Running (Hightower) | Beginner–Intermediate |
| The Kubernetes Book (Poulton) | Beginner |
| Kubernetes Patterns (Ibryam & Huß) | Intermediate–Advanced |
| Programming Kubernetes (Hausenblas & Schimanski) | Advanced–Expert |
| Production Kubernetes (Rosso et al.) | Advanced–Expert |

### Hands-On Labs
- [Killer Shell](https://killer.sh) — CKA/CKAD/CKS exam simulators
- [KodeKloud](https://kodekloud.com) — Interactive labs
- [Katacoda / O'Reilly Scenarios](https://learning.oreilly.com)
- [Play with Kubernetes](https://labs.play-with-k8s.com)

### Video Courses
- Mumshad Mannambeth (KodeKloud) — CKA, CKAD, CKS courses
- Bret Fisher — Docker and Kubernetes on Udemy
- TechWorld with Nana — YouTube tutorials

---

## 🏆 Certification Path

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   KCNA          →   CKA           →   CKS           │
│   (Associate)       (Administrator)    (Security)   │
│   Beginner          Intermediate       Advanced     │
│                                                     │
│               CKAD (Developer) ─────────────────────┤
│               Intermediate                          │
│                                                     │
│               KCSA (Security Associate)             │
│               Beginner–Intermediate                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

| Certification | Focus | Level |
|---------------|-------|-------|
| **KCNA** — Kubernetes and Cloud Native Associate | Conceptual, multiple choice | Beginner |
| **CKAD** — Certified Kubernetes Application Developer | Deploying apps, config, observability | Intermediate |
| **CKA** — Certified Kubernetes Administrator | Cluster ops, networking, storage, troubleshooting | Intermediate–Advanced |
| **CKS** — Certified Kubernetes Security Specialist | Security hardening, runtime security | Advanced |
| **KCSA** — Kubernetes and Cloud Native Security Associate | Security concepts, multiple choice | Beginner–Intermediate |

### Exam Tips
- All hands-on exams are **open book** (kubernetes.io docs allowed)
- Practice speed with `kubectl` — use aliases and shortcuts
- Use `kubectl explain`, `--dry-run=client -o yaml`, and `kubectl api-resources`
- Time management is critical — skip and return to hard questions

```bash
# Useful exam shortcuts
alias k=kubectl
export do="--dry-run=client -o yaml"
export now="--force --grace-period 0"

# Quick pod creation
k run nginx --image=nginx $do > pod.yaml

# Force delete
k delete pod nginx $now
```

---

## 🗺️ Complete Learning Path Summary

```
Week 1–4:   Docker → Minikube → Pods → Deployments → Services
Week 5–8:   StatefulSets → Storage → Ingress → RBAC → Helm
Week 9–14:  Autoscaling → Observability → GitOps → Service Mesh → Security
Week 15–20: Cluster API → Multi-cluster → eBPF → Operators → Platform Engineering
Week 21+:   Production operations, contribute to ecosystem, certifications
```

---

*Last Updated: May 2026 | Kubernetes v1.30+ | CNCF Ecosystem*
