# Kubernetes HA Cluster Setup on AWS Using kubeadm

## Architecture Overview

This guide creates:

- 3 Control Plane (Master) Nodes
- 6 Worker Nodes
- Highly Available Kubernetes Cluster using kubeadm
- AWS Network Load Balancer for Kubernetes API HA

### Final Topology

```text
                ┌─────────────────────┐
                │ AWS Load Balancer   │
                │ (API Server LB)     │
                │ :6443               │
                └─────────┬───────────┘
                          │
      ┌───────────────────┼───────────────────┐
      │                   │                   │
┌────────────┐     ┌────────────┐     ┌────────────┐
│ Master-1   │     │ Master-2   │     │ Master-3   │
│ kube-apiserver    kube-apiserver    kube-apiserver
│ etcd       │     │ etcd       │     │ etcd       │
└─────┬──────┘     └─────┬──────┘     └─────┬──────┘
      │                  │                  │
 ┌────┴────┐        ┌────┴────┐        ┌────┴────┐
 │Worker-1 │        │Worker-3 │        │Worker-5 │
 │Worker-2 │        │Worker-4 │        │Worker-6 │
 └─────────┘        └─────────┘        └─────────┘
```

---

# AWS Infrastructure Requirements

## Recommended EC2 Instance Types

### Control Plane Nodes

| Component | Recommendation |
|---|---|
| Instance Type | t3.medium or t3.large |
| CPU | Minimum 2 vCPU |
| RAM | Minimum 4 GB |
| Storage | 30 GB |

### Worker Nodes

| Component | Recommendation |
|---|---|
| Instance Type | t3.medium |
| CPU | 2 vCPU |
| RAM | 4 GB |
| Storage | 30 GB |

---

# Step 1 — Create AWS VPC and Networking

## Recommended VPC Layout

| Component | CIDR |
|---|---|
| VPC | 10.0.0.0/16 |
| Public Subnet | 10.0.1.0/24 |
| Private Subnet | 10.0.2.0/24 |

## Recommendations

- Keep worker nodes in private subnet
- Use NAT Gateway
- Use Internet Gateway for public access
- Keep control plane nodes private if possible

---

# Step 2 — Create EC2 Instances

Create the following instances:

| Name | Role |
|---|---|
| master-1 | Control Plane |
| master-2 | Control Plane |
| master-3 | Control Plane |
| worker-1 | Worker |
| worker-2 | Worker |
| worker-3 | Worker |
| worker-4 | Worker |
| worker-5 | Worker |
| worker-6 | Worker |

## Recommended OS

- Ubuntu 24.04 LTS
OR
- Ubuntu 22.04 LTS

---

# Step 3 — Configure Security Groups

## Control Plane Required Ports

| Port | Purpose |
|---|---|
| 6443 | Kubernetes API Server |
| 2379-2380 | etcd server client API |
| 10250 | kubelet API |
| 10257 | kube-controller-manager |
| 10259 | kube-scheduler |

## Worker Node Required Ports

| Port | Purpose |
|---|---|
| 10250 | kubelet API |
| 30000-32767 | NodePort Services |

## Additional Rules

Allow:

- All internal node-to-node communication
- SSH (22)
- ICMP (optional)

---

# Step 4 — Create AWS Network Load Balancer

## Why Load Balancer is Required

Multiple control plane nodes require a single stable API endpoint.

Example:

```text
k8s-api.internal:6443
```

Without a Load Balancer:

- kubectl fails if one master dies
- workers lose API connectivity
- no HA benefits

---

## Create Network Load Balancer

### Listener

- TCP :6443

### Target Group

Add:

- master-1
- master-2
- master-3

### Health Check

- TCP
- Port 6443

### Final Endpoint

```text
k8s-api.internal:6443
```

This becomes your:

```text
CONTROL_PLANE_ENDPOINT
```

---

# Step 5 — Configure All Nodes

Run the following commands on ALL 9 nodes.

---

## Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

---

## Set Hostnames

### Example for master-1

```bash
sudo hostnamectl set-hostname master-1
```

### Example for worker-1

```bash
sudo hostnamectl set-hostname worker-1
```

---

## Configure /etc/hosts

Edit:

```bash
sudo nano /etc/hosts
```

Add:

```text
10.0.1.10 master-1
10.0.1.11 master-2
10.0.1.12 master-3

10.0.2.10 worker-1
10.0.2.11 worker-2
10.0.2.12 worker-3
10.0.2.13 worker-4
10.0.2.14 worker-5
10.0.2.15 worker-6
```

---

# Step 6 — Disable Swap

Run on ALL nodes:

```bash
sudo swapoff -a
```

Disable permanently:

```bash
sudo sed -i '/ swap / s/^/#/' /etc/fstab
```

Verify:

```bash
free -h
```

---

# Step 7 — Enable Kernel Modules

```bash
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF
```

Load modules:

```bash
sudo modprobe overlay
sudo modprobe br_netfilter
```

---

# Step 8 — Configure Sysctl Settings

```bash
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF
```

Apply settings:

```bash
sudo sysctl --system
```

Verify:

```bash
sysctl net.ipv4.ip_forward
```

---

# Step 9 — Install Container Runtime (containerd)

Run on ALL nodes.

---

## Install Dependencies

```bash
sudo apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates
```

---

## Install containerd

```bash
sudo apt install -y containerd
```

---

## Generate Default Configuration

```bash
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
```

---

## Enable SystemdCgroup

Edit:

```bash
sudo nano /etc/containerd/config.toml
```

Find:

```toml
SystemdCgroup = false
```

Change to:

```toml
SystemdCgroup = true
```

---

## Restart containerd

```bash
sudo systemctl restart containerd
sudo systemctl enable containerd
```

Verify:

```bash
sudo systemctl status containerd
```

---

# Step 10 — Install Kubernetes Components

Run on ALL nodes.

---

## Add Kubernetes Repository

```bash
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | \
sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
```

```bash
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] \
https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | \
sudo tee /etc/apt/sources.list.d/kubernetes.list
```

---

## Install kubeadm, kubelet and kubectl

```bash
sudo apt update
sudo apt install -y kubelet kubeadm kubectl
```

---

## Prevent Automatic Upgrades

```bash
sudo apt-mark hold kubelet kubeadm kubectl
```

---

# Step 11 — Initialize First Control Plane Node

Run ONLY on master-1.

---

## Initialize Kubernetes Cluster

Replace with your actual Load Balancer DNS:

```bash
sudo kubeadm init \
--control-plane-endpoint "k8s-api.internal:6443" \
--upload-certs \
--pod-network-cidr=192.168.0.0/16
```

### Important Flags

| Flag | Purpose |
|---|---|
| --control-plane-endpoint | Stable API endpoint |
| --upload-certs | Required for HA cluster |
| --pod-network-cidr | Required for CNI |

---

# Step 12 — Configure kubectl Access

Run on master-1:

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

Verify:

```bash
kubectl get nodes
```

---

# Step 13 — Install CNI Plugin (Calico)

Run on master-1:

```bash
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.0/manifests/calico.yaml
```

Verify:

```bash
kubectl get pods -A
```

Wait until all pods become:

```text
Running
```

---

# Step 14 — Join Remaining Control Plane Nodes

After kubeadm init completes, kubeadm outputs a join command.

Example:

```bash
kubeadm join k8s-api.internal:6443 \
--token abcdef.123456789 \
--discovery-token-ca-cert-hash sha256:xxxxx \
--control-plane \
--certificate-key xxxxx
```

Run this command on:

- master-2
- master-3

---

# Step 15 — Join Worker Nodes

kubeadm also outputs a worker join command.

Example:

```bash
kubeadm join k8s-api.internal:6443 \
--token abcdef.123456789 \
--discovery-token-ca-cert-hash sha256:xxxxx
```

Run on:

- worker-1
- worker-2
- worker-3
- worker-4
- worker-5
- worker-6

---

# Step 16 — Verify Cluster Status

Run on master-1:

```bash
kubectl get nodes
```

Expected Output:

```text
master-1   Ready control-plane
master-2   Ready control-plane
master-3   Ready control-plane

worker-1   Ready
worker-2   Ready
worker-3   Ready
worker-4   Ready
worker-5   Ready
worker-6   Ready
```

---

# Step 17 — Test High Availability

Stop kubelet on one master node:

```bash
sudo systemctl stop kubelet
```

Verify cluster still works:

```bash
kubectl get nodes
```

The cluster should continue functioning.

---

# Step 18 — Install Helm

## Install Helm

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Verify:

```bash
helm version
```

---

# Step 19 — Install NGINX Ingress Controller

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```

Verify:

```bash
kubectl get pods -n ingress-nginx
```

---

# Step 20 — Install Metrics Server

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Verify:

```bash
kubectl top nodes
```

---

# Step 21 — Install cert-manager

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
```

Verify:

```bash
kubectl get pods -n cert-manager
```

---

# Step 22 — Install AWS EBS CSI Driver

## Create IAM Role

Attach:

```text
AmazonEBSCSIDriverPolicy
```

---

## Install EBS CSI Driver

```bash
kubectl apply -k "github.com/kubernetes-sigs/aws-ebs-csi-driver/deploy/kubernetes/overlays/stable/?ref=master"
```

---

# Step 23 — Verify Storage Classes

```bash
kubectl get storageclass
```

---

# Step 24 — Backup etcd

Run on control plane node:

```bash
ETCDCTL_API=3 etcdctl snapshot save snapshot.db
```

Verify:

```bash
ls -lh snapshot.db
```

---

# Step 25 — Generate New Join Token (If Expired)

```bash
kubeadm token create --print-join-command
```

---

# Common Troubleshooting

## Node Status Not Ready

Possible Causes:

- CNI not installed
- Security Group issue
- Container runtime issue

Check:

```bash
kubectl describe node <node-name>
```

---

## kubeadm join Fails

Possible Causes:

- Token expired
- Port blocked
- Incorrect hostname

Generate new token:

```bash
kubeadm token create --print-join-command
```

---

## API Server Unreachable

Possible Causes:

- Load Balancer health check failed
- Security Group blocking 6443
- kube-apiserver not running

Check:

```bash
kubectl get pods -n kube-system
```

---

# Recommended Production Enhancements

## Use External etcd

Default kubeadm uses stacked etcd.

Recommended for:

- Small and medium production clusters

For large production environments:

- Use dedicated external etcd cluster

---

## Use Auto Scaling Groups

Recommended:

- Worker nodes inside ASG
- Control plane fixed size

---

## Use Private Networking

Avoid public IPs on:

- Control plane nodes
- etcd

---

## Monitoring Stack

Recommended:

- Prometheus
- Grafana
- Loki
- Alertmanager

---

# Useful Commands

## View Cluster Info

```bash
kubectl cluster-info
```

## View All Pods

```bash
kubectl get pods -A
```

## View Nodes

```bash
kubectl get nodes -o wide
```

## Drain Node

```bash
kubectl drain <node-name> --ignore-daemonsets
```

## Uncordon Node

```bash
kubectl uncordon <node-name>
```

---

# Official Documentation

- Kubernetes kubeadm Documentation
- Calico Documentation
- Containerd Documentation
- ingress-nginx Documentation
- cert-manager Documentation
- Metrics Server Documentation

---

# Final Notes

This setup provides:

- Highly Available Kubernetes Control Plane
- Fault Tolerance
- Production-ready kubeadm Architecture
- AWS-based scalable infrastructure
- Multi-master Kubernetes cluster

This architecture is suitable for:

- Production workloads
- CI/CD platforms
- Microservices deployment
- Container orchestration
- Enterprise Kubernetes environments
