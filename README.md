<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# grafana

![Version: 9.3.1-bb.2](https://img.shields.io/badge/Version-9.3.1--bb.2-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 12.1.0](https://img.shields.io/badge/AppVersion-12.1.0-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

The leading tool for querying and visualizing time series and metrics.

## Upstream References

- <https://grafana.com>
- <https://github.com/grafana/grafana>
- <https://github.com/grafana/helm-charts>

## Upstream Release Notes

- [Find our upstream chart's CHANGELOG here](https://github.com/grafana/helm-charts/tree/main/charts/grafana#upgrading-an-existing-release-to-a-new-major-version)
- [and our upstream application release notes here](https://grafana.com/docs/grafana/latest/release-notes/)

## Learn More

- [Application Overview](docs/overview.md)
- [Other Documentation](docs/)

## Pre-Requisites

- Kubernetes Cluster deployed
- Kubernetes config installed in `~/.kube/config`
- Helm installed

Kubernetes: `^1.8.0-0`

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

- Clone down the repository
- cd into directory

```bash
helm install grafana chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| global.imageRegistry | string | `"registry1.dso.mil"` | Overrides the Docker registry globally for all images |
| global.imagePullSecrets | list | `[]` |  |
| openshift | bool | `false` |  |
| enterprise | object | `{"createSecret":false,"license":null}` | Toggle creation of Enterprise License Secret See https://docs-bigbang.dso.mil/latest/packages/grafana/docs/enterprise |
| alertmanager | object | `{"enabled":true}` | kube-prometheus-stack dashboard backward-compatibility values |
| coreDns.enabled | bool | `true` |  |
| kubeEtcd.enabled | bool | `true` |  |
| kubeApiServer.enabled | bool | `true` |  |
| kubeControllerManager.enabled | bool | `true` |  |
| kubeScheduler.enabled | bool | `true` |  |
| kubeProxy.enabled | bool | `true` |  |
| nodeExporter.enabled | bool | `true` |  |
| nodeExporter.operatingSystems.linux.enabled | bool | `true` |  |
| nodeExporter.operatingSystems.aix.enabled | bool | `true` |  |
| nodeExporter.operatingSystems.darwin.enabled | bool | `true` |  |
| nodeExporter.operatingSystems.windows.enabled | bool | `true` |  |
| kubelet.enabled | bool | `true` |  |
| kubelet.namespace | string | `"kube-system"` |  |
| windowsMonitoring.enabled | bool | `true` |  |
| prometheusRemoteWriteDashboards | bool | `true` |  |
| grafana.forceDeployDashboards.enabled | bool | `true` |  |
| grafana.defaultDashboardsEnabled.enabled | bool | `true` |  |
| grafana.operator.dashboardsConfigMapRefEnabled | bool | `false` |  |
| grafana.operator.annotations | object | `{}` |  |
| grafana.operator.matchLabels | object | `{}` |  |
| grafana.defaultDashboardsEditable | bool | `true` |  |
| grafana.sidecar.dashboards.label | string | `"grafana_dashboard"` |  |
| grafana.sidecar.dashboards.labelValue | string | `"1"` |  |
| grafana.sidecar.dashboards.annotations | object | `{}` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"public-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| domain | string | `"dev.bigbang.mil"` |  |
| istio.enabled | bool | `false` |  |
| istio.namespace | string | `"istio-system"` |  |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| istio.hardened.customAuthorizationPolicies | list | `[]` |  |
| istio.hardened.kiali.enabled | bool | `true` |  |
| istio.hardened.kiali.namespaces[0] | string | `"kiali"` |  |
| istio.hardened.kiali.principals[0] | string | `"cluster.local/ns/kiali/sa/kiali-service-account"` |  |
| istio.grafana.enabled | bool | `true` |  |
| istio.grafana.annotations | object | `{}` |  |
| istio.grafana.labels | object | `{}` |  |
| istio.grafana.gateways[0] | string | `"istio-system/main"` |  |
| istio.grafana.hosts[0] | string | `"grafana.{{ .Values.domain }}"` |  |
| istio.grafana.service | string | `""` |  |
| istio.grafana.port | string | `""` |  |
| istio.grafana.namespace | string | `""` |  |
| istio.injection | string | `"disabled"` |  |
| istio.mtls.mode | string | `"STRICT"` |  |
| sso.enabled | bool | `false` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_grafana_url | string | `"http://grafana:80"` |  |
| bbtests.cypress.resources.requests.cpu | int | `2` |  |
| bbtests.cypress.resources.requests.memory | string | `"2Gi"` |  |
| bbtests.cypress.resources.limits.cpu | int | `2` |  |
| bbtests.cypress.resources.limits.memory | string | `"2Gi"` |  |
| bbtests.istio.sidecar.resources.cpu.requests | string | `"100m"` |  |
| bbtests.istio.sidecar.resources.cpu.limits | string | `"2000m"` |  |
| bbtests.istio.sidecar.resources.memory.requests | string | `"512Mi"` |  |
| bbtests.istio.sidecar.resources.memory.limits | string | `"2048Mi"` |  |
| upstream.rbac.create | bool | `true` |  |
| upstream.rbac.pspEnabled | bool | `false` |  |
| upstream.rbac.pspUseAppArmor | bool | `false` |  |
| upstream.rbac.namespaced | bool | `false` |  |
| upstream.rbac.extraRoleRules | list | `[]` |  |
| upstream.rbac.extraClusterRoleRules | list | `[]` |  |
| upstream.serviceAccount.create | bool | `true` |  |
| upstream.serviceAccount.name | string | `nil` |  |
| upstream.serviceAccount.nameTest | string | `nil` |  |
| upstream.serviceAccount.labels | object | `{}` |  |
| upstream.serviceAccount.automountServiceAccountToken | bool | `false` |  |
| upstream.replicas | int | `1` |  |
| upstream.headlessService | bool | `false` |  |
| upstream.automountServiceAccountToken | bool | `true` |  |
| upstream.autoscaling.enabled | bool | `false` |  |
| upstream.autoscaling.minReplicas | int | `1` |  |
| upstream.autoscaling.maxReplicas | int | `5` |  |
| upstream.autoscaling.targetCPU | string | `"60"` |  |
| upstream.autoscaling.targetMemory | string | `""` |  |
| upstream.autoscaling.behavior | object | `{}` |  |
| upstream.podDisruptionBudget | object | `{}` |  |
| upstream.deploymentStrategy.type | string | `"RollingUpdate"` |  |
| upstream.readinessProbe.httpGet.path | string | `"/api/health"` |  |
| upstream.readinessProbe.httpGet.port | int | `3000` |  |
| upstream.livenessProbe.httpGet.path | string | `"/api/health"` |  |
| upstream.livenessProbe.httpGet.port | int | `3000` |  |
| upstream.livenessProbe.initialDelaySeconds | int | `60` |  |
| upstream.livenessProbe.timeoutSeconds | int | `30` |  |
| upstream.livenessProbe.failureThreshold | int | `10` |  |
| upstream.image.registry | string | `"registry1.dso.mil"` |  |
| upstream.image.repository | string | `"ironbank/big-bang/grafana/grafana-plugins"` |  |
| upstream.image.tag | string | `"12.1.0"` |  |
| upstream.image.pullPolicy | string | `"IfNotPresent"` |  |
| upstream.image.pullSecrets[0] | string | `"private-registry"` |  |
| upstream.testFramework.enabled | bool | `false` |  |
| upstream.testFramework.image.registry | string | `"registry1.dso.mil"` |  |
| upstream.testFramework.image.repository | string | `"ironbank/opensource/bats/bats"` |  |
| upstream.testFramework.image.tag | string | `"1.12.0"` |  |
| upstream.testFramework.imagePullPolicy | string | `"IfNotPresent"` |  |
| upstream.testFramework.securityContext | object | `{}` |  |
| upstream.testFramework.containerSecurityContext | object | `{}` |  |
| upstream.testFramework.resources | object | `{}` |  |
| upstream.dnsPolicy | string | `nil` |  |
| upstream.dnsConfig | object | `{}` |  |
| upstream.securityContext.runAsNonRoot | bool | `true` |  |
| upstream.securityContext.runAsUser | int | `65532` |  |
| upstream.securityContext.runAsGroup | int | `65532` |  |
| upstream.securityContext.fsGroup | int | `65532` |  |
| upstream.containerSecurityContext.allowPrivilegeEscalation | bool | `false` |  |
| upstream.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.containerSecurityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| upstream.createConfigmap | bool | `true` |  |
| upstream.extraConfigmapMounts | list | `[]` |  |
| upstream.extraEmptyDirMounts | list | `[]` |  |
| upstream.extraLabels | object | `{}` |  |
| upstream.downloadDashboardsImage.registry | string | `"registry1.dso.mil"` |  |
| upstream.downloadDashboardsImage.repository | string | `"ironbank/big-bang/base"` |  |
| upstream.downloadDashboardsImage.tag | string | `"2.1.0"` |  |
| upstream.downloadDashboardsImage.pullPolicy | string | `"IfNotPresent"` |  |
| upstream.downloadDashboards.env | object | `{}` |  |
| upstream.downloadDashboards.envFromSecret | string | `""` |  |
| upstream.downloadDashboards.resources.limits.cpu | string | `"20m"` |  |
| upstream.downloadDashboards.resources.limits.memory | string | `"20Mi"` |  |
| upstream.downloadDashboards.resources.requests.cpu | string | `"20m"` |  |
| upstream.downloadDashboards.resources.requests.memory | string | `"20Mi"` |  |
| upstream.downloadDashboards.securityContext.allowPrivilegeEscalation | bool | `false` |  |
| upstream.downloadDashboards.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.downloadDashboards.securityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| upstream.downloadDashboards.envValueFrom | object | `{}` |  |
| upstream.podLabels | object | `{}` |  |
| upstream.podPortName | string | `"grafana"` |  |
| upstream.gossipPortName | string | `"gossip"` |  |
| upstream.service.enabled | bool | `true` |  |
| upstream.service.type | string | `"ClusterIP"` |  |
| upstream.service.ipFamilyPolicy | string | `""` |  |
| upstream.service.ipFamilies | list | `[]` |  |
| upstream.service.loadBalancerIP | string | `""` |  |
| upstream.service.loadBalancerClass | string | `""` |  |
| upstream.service.loadBalancerSourceRanges | list | `[]` |  |
| upstream.service.port | int | `80` |  |
| upstream.service.targetPort | int | `3000` |  |
| upstream.service.annotations | object | `{}` |  |
| upstream.service.labels | object | `{}` |  |
| upstream.service.portName | string | `"http-service"` |  |
| upstream.service.appProtocol | string | `""` |  |
| upstream.service.sessionAffinity | string | `""` |  |
| upstream.serviceMonitor.enabled | bool | `false` |  |
| upstream.serviceMonitor.path | string | `"/metrics"` |  |
| upstream.serviceMonitor.labels | object | `{}` |  |
| upstream.serviceMonitor.interval | string | `"1m"` |  |
| upstream.serviceMonitor.scheme | string | `"http"` |  |
| upstream.serviceMonitor.tlsConfig | object | `{}` |  |
| upstream.serviceMonitor.scrapeTimeout | string | `"30s"` |  |
| upstream.serviceMonitor.relabelings | list | `[]` |  |
| upstream.serviceMonitor.metricRelabelings | list | `[]` |  |
| upstream.serviceMonitor.basicAuth | object | `{}` |  |
| upstream.serviceMonitor.targetLabels | list | `[]` |  |
| upstream.extraExposePorts | list | `[]` |  |
| upstream.hostAliases | list | `[]` |  |
| upstream.ingress.enabled | bool | `false` |  |
| upstream.ingress.annotations | object | `{}` |  |
| upstream.ingress.labels | object | `{}` |  |
| upstream.ingress.path | string | `"/"` |  |
| upstream.ingress.pathType | string | `"Prefix"` |  |
| upstream.ingress.hosts[0] | string | `"chart-example.local"` |  |
| upstream.ingress.extraPaths | list | `[]` |  |
| upstream.ingress.tls | list | `[]` |  |
| upstream.route | object | `{"main":{"additionalRules":[],"annotations":{},"apiVersion":"gateway.networking.k8s.io/v1","enabled":false,"filters":[],"hostnames":[],"kind":"HTTPRoute","labels":{},"matches":[{"path":{"type":"PathPrefix","value":"/"}}],"parentRefs":[]}}` | BETA: Configure the gateway routes for the chart here. More routes can be added by adding a dictionary key like the 'main' route. Be aware that this is an early beta of this feature, kube-prometheus-stack does not guarantee this works and is subject to change. Being BETA this can/will change in the future without notice, do not use unless you want to take that risk [[ref]](https://gateway-api.sigs.k8s.io/references/spec/#gateway.networking.k8s.io%2fv1alpha2) |
| upstream.route.main.enabled | bool | `false` | Enables or disables the route |
| upstream.route.main.apiVersion | string | `"gateway.networking.k8s.io/v1"` | Set the route apiVersion, e.g. gateway.networking.k8s.io/v1 or gateway.networking.k8s.io/v1alpha2 |
| upstream.route.main.kind | string | `"HTTPRoute"` | Set the route kind Valid options are GRPCRoute, HTTPRoute, TCPRoute, TLSRoute, UDPRoute |
| upstream.resources.requests.cpu | string | `"100m"` |  |
| upstream.resources.requests.memory | string | `"256Mi"` |  |
| upstream.nodeSelector | object | `{}` |  |
| upstream.tolerations | list | `[]` |  |
| upstream.affinity | object | `{}` |  |
| upstream.topologySpreadConstraints | list | `[]` |  |
| upstream.extraInitContainers | list | `[]` |  |
| upstream.extraContainers | string | `""` |  |
| upstream.extraContainerVolumes | list | `[]` |  |
| upstream.persistence.type | string | `"pvc"` |  |
| upstream.persistence.enabled | bool | `false` |  |
| upstream.persistence.volumeName | string | `""` |  |
| upstream.persistence.accessModes[0] | string | `"ReadWriteOnce"` |  |
| upstream.persistence.size | string | `"10Gi"` |  |
| upstream.persistence.finalizers[0] | string | `"kubernetes.io/pvc-protection"` |  |
| upstream.persistence.extraPvcLabels | object | `{}` |  |
| upstream.persistence.disableWarning | bool | `false` |  |
| upstream.persistence.inMemory.enabled | bool | `false` |  |
| upstream.persistence.lookupVolumeName | bool | `true` |  |
| upstream.initChownData.enabled | bool | `false` |  |
| upstream.initChownData.image.registry | string | `"registry1.dso.mil"` |  |
| upstream.initChownData.image.repository | string | `"ironbank/redhat/ubi/ubi9-minimal"` |  |
| upstream.initChownData.image.tag | string | `"9.6"` |  |
| upstream.initChownData.image.sha | string | `""` |  |
| upstream.initChownData.image.pullPolicy | string | `"IfNotPresent"` |  |
| upstream.initChownData.resources.requests.cpu | string | `"100m"` |  |
| upstream.initChownData.resources.requests.memory | string | `"128Mi"` |  |
| upstream.initChownData.securityContext.readOnlyRootFilesystem | bool | `false` |  |
| upstream.initChownData.securityContext.runAsNonRoot | bool | `false` |  |
| upstream.initChownData.securityContext.runAsUser | int | `0` |  |
| upstream.initChownData.securityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| upstream.initChownData.securityContext.capabilities.add[0] | string | `"CHOWN"` |  |
| upstream.initChownData.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.adminUser | string | `"admin"` |  |
| upstream.adminPassword | string | `"prom-operator"` |  |
| upstream.admin.existingSecret | string | `""` |  |
| upstream.admin.userKey | string | `"admin-user"` |  |
| upstream.admin.passwordKey | string | `"admin-password"` |  |
| upstream.env | object | `{}` |  |
| upstream.envValueFrom | object | `{}` |  |
| upstream.envFromSecret | string | `""` |  |
| upstream.envRenderSecret | object | `{}` |  |
| upstream.envFromSecrets | list | `[]` |  |
| upstream.envFromConfigMaps | list | `[]` |  |
| upstream.enableServiceLinks | bool | `true` |  |
| upstream.extraSecretMounts | list | `[]` |  |
| upstream.extraVolumeMounts | list | `[]` |  |
| upstream.extraVolumes | list | `[]` |  |
| upstream.lifecycleHooks | object | `{}` |  |
| upstream.plugins | list | `[]` |  |
| upstream.datasources | object | `{}` |  |
| upstream.alerting | object | `{}` |  |
| upstream.notifiers | object | `{}` |  |
| upstream.dashboardProviders | object | `{}` |  |
| upstream.defaultCurlOptions | string | `"-skf"` |  |
| upstream.dashboards | object | `{}` |  |
| upstream.dashboardsConfigMaps | object | `{}` |  |
| upstream."grafana.ini".paths.data | string | `"/var/lib/grafana/"` |  |
| upstream."grafana.ini".paths.logs | string | `"/var/log/grafana"` |  |
| upstream."grafana.ini".paths.plugins | string | `"/var/lib/grafana/plugins"` |  |
| upstream."grafana.ini".paths.provisioning | string | `"/etc/grafana/provisioning"` |  |
| upstream."grafana.ini".analytics.reporting_enabled | bool | `false` |  |
| upstream."grafana.ini".analytics.check_for_updates | bool | `false` |  |
| upstream."grafana.ini".log.mode | string | `"console"` |  |
| upstream."grafana.ini".grafana_net.url | string | `"https://grafana.net"` |  |
| upstream."grafana.ini".server.domain | string | `"{{ if (and .Values.ingress.enabled .Values.ingress.hosts) }}{{ tpl (.Values.ingress.hosts \| first) . }}{{ else }}''{{ end }}"` |  |
| upstream."grafana.ini"."auth.generic_oauth".enabled | bool | `false` |  |
| upstream."grafana.ini"."auth.generic_oauth".client_id | string | `"grafana"` |  |
| upstream."grafana.ini"."auth.generic_oauth".client_secret | string | `"secret"` |  |
| upstream."grafana.ini"."auth.generic_oauth".scopes | string | `"Grafana"` |  |
| upstream."grafana.ini"."auth.generic_oauth".auth_url | string | `"https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/auth"` |  |
| upstream."grafana.ini"."auth.generic_oauth".token_url | string | `"https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/token"` |  |
| upstream."grafana.ini"."auth.generic_oauth".api_url | string | `"https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/userinfo"` |  |
| upstream."grafana.ini"."auth.generic_oauth".allow_sign_up | bool | `true` |  |
| upstream."grafana.ini"."auth.generic_oauth".role_attribute_path | string | `"Viewer"` |  |
| upstream."grafana.ini"."plugin.grafana-piechart-panel".path | string | `"/var/lib/bb-plugins/piechart-panel"` |  |
| upstream."grafana.ini"."plugin.grafana-polystat-panel".path | string | `"/var/lib/bb-plugins/polystat-panel"` |  |
| upstream."grafana.ini"."plugin.redis-datasource".path | string | `"/var/lib/bb-plugins/redis-datasource"` |  |
| upstream."grafana.ini".security.angular_support_enabled | bool | `false` |  |
| upstream.ldap.enabled | bool | `false` |  |
| upstream.ldap.existingSecret | string | `""` |  |
| upstream.ldap.config | string | `""` |  |
| upstream.shareProcessNamespace | bool | `false` |  |
| upstream.smtp.existingSecret | string | `""` |  |
| upstream.smtp.userKey | string | `"user"` |  |
| upstream.smtp.passwordKey | string | `"password"` |  |
| upstream.sidecar.image.registry | string | `"registry1.dso.mil"` |  |
| upstream.sidecar.image.repository | string | `"ironbank/kiwigrid/k8s-sidecar"` |  |
| upstream.sidecar.image.tag | string | `"1.30.7"` |  |
| upstream.sidecar.imagePullPolicy | string | `"IfNotPresent"` |  |
| upstream.sidecar.resources.requests.cpu | string | `"100m"` |  |
| upstream.sidecar.resources.requests.memory | string | `"100Mi"` |  |
| upstream.sidecar.securityContext.allowPrivilegeEscalation | bool | `false` |  |
| upstream.sidecar.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.sidecar.securityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| upstream.sidecar.enableUniqueFilenames | bool | `false` |  |
| upstream.sidecar.readinessProbe | object | `{}` |  |
| upstream.sidecar.livenessProbe | object | `{}` |  |
| upstream.sidecar.alerts.enabled | bool | `false` |  |
| upstream.sidecar.alerts.env | object | `{}` |  |
| upstream.sidecar.alerts.envValueFrom | object | `{}` |  |
| upstream.sidecar.alerts.label | string | `"grafana_alert"` |  |
| upstream.sidecar.alerts.labelValue | string | `""` |  |
| upstream.sidecar.alerts.searchNamespace | string | `nil` |  |
| upstream.sidecar.alerts.watchMethod | string | `"WATCH"` |  |
| upstream.sidecar.alerts.resource | string | `"both"` |  |
| upstream.sidecar.alerts.resourceName | string | `""` |  |
| upstream.sidecar.alerts.reloadURL | string | `"http://localhost:3000/api/admin/provisioning/alerting/reload"` |  |
| upstream.sidecar.alerts.script | string | `nil` |  |
| upstream.sidecar.alerts.skipReload | bool | `false` |  |
| upstream.sidecar.alerts.initAlerts | bool | `false` |  |
| upstream.sidecar.alerts.extraMounts | list | `[]` |  |
| upstream.sidecar.alerts.sizeLimit | string | `""` |  |
| upstream.sidecar.dashboards.enabled | bool | `true` |  |
| upstream.sidecar.dashboards.env | object | `{}` |  |
| upstream.sidecar.dashboards.envValueFrom | object | `{}` |  |
| upstream.sidecar.dashboards.SCProvider | bool | `true` |  |
| upstream.sidecar.dashboards.label | string | `"grafana_dashboard"` |  |
| upstream.sidecar.dashboards.labelValue | string | `"1"` |  |
| upstream.sidecar.dashboards.folder | string | `"/tmp/dashboards"` |  |
| upstream.sidecar.dashboards.defaultFolderName | string | `nil` |  |
| upstream.sidecar.dashboards.searchNamespace | string | `"ALL"` |  |
| upstream.sidecar.dashboards.watchMethod | string | `"WATCH"` |  |
| upstream.sidecar.dashboards.resource | string | `"both"` |  |
| upstream.sidecar.dashboards.folderAnnotation | string | `nil` |  |
| upstream.sidecar.dashboards.resourceName | string | `""` |  |
| upstream.sidecar.dashboards.reloadURL | string | `"http://localhost:3000/api/admin/provisioning/dashboards/reload"` |  |
| upstream.sidecar.dashboards.script | string | `nil` |  |
| upstream.sidecar.dashboards.skipReload | bool | `false` |  |
| upstream.sidecar.dashboards.provider.name | string | `"sidecarProvider"` |  |
| upstream.sidecar.dashboards.provider.orgid | int | `1` |  |
| upstream.sidecar.dashboards.provider.folder | string | `""` |  |
| upstream.sidecar.dashboards.provider.folderUid | string | `""` |  |
| upstream.sidecar.dashboards.provider.type | string | `"file"` |  |
| upstream.sidecar.dashboards.provider.disableDelete | bool | `false` |  |
| upstream.sidecar.dashboards.provider.allowUiUpdates | bool | `false` |  |
| upstream.sidecar.dashboards.provider.foldersFromFilesStructure | bool | `false` |  |
| upstream.sidecar.dashboards.extraMounts | list | `[]` |  |
| upstream.sidecar.dashboards.sizeLimit | string | `""` |  |
| upstream.sidecar.dashboards.multicluster.global.enabled | bool | `true` |  |
| upstream.sidecar.dashboards.multicluster.etcd.enabled | bool | `true` |  |
| upstream.sidecar.datasources.enabled | bool | `true` |  |
| upstream.sidecar.datasources.env | object | `{}` |  |
| upstream.sidecar.datasources.envValueFrom | object | `{}` |  |
| upstream.sidecar.datasources.label | string | `"grafana_datasource"` |  |
| upstream.sidecar.datasources.labelValue | string | `"1"` |  |
| upstream.sidecar.datasources.searchNamespace | string | `nil` |  |
| upstream.sidecar.datasources.watchMethod | string | `"WATCH"` |  |
| upstream.sidecar.datasources.resource | string | `"both"` |  |
| upstream.sidecar.datasources.resourceName | string | `""` |  |
| upstream.sidecar.datasources.reloadURL | string | `"http://localhost:3000/api/admin/provisioning/datasources/reload"` |  |
| upstream.sidecar.datasources.script | string | `nil` |  |
| upstream.sidecar.datasources.skipReload | bool | `false` |  |
| upstream.sidecar.datasources.initDatasources | bool | `false` |  |
| upstream.sidecar.datasources.extraMounts | list | `[]` |  |
| upstream.sidecar.datasources.sizeLimit | string | `""` |  |
| upstream.sidecar.plugins.enabled | bool | `false` |  |
| upstream.sidecar.plugins.env | object | `{}` |  |
| upstream.sidecar.plugins.label | string | `"grafana_plugin"` |  |
| upstream.sidecar.plugins.labelValue | string | `""` |  |
| upstream.sidecar.plugins.searchNamespace | string | `nil` |  |
| upstream.sidecar.plugins.watchMethod | string | `"WATCH"` |  |
| upstream.sidecar.plugins.resource | string | `"both"` |  |
| upstream.sidecar.plugins.resourceName | string | `""` |  |
| upstream.sidecar.plugins.reloadURL | string | `"http://localhost:3000/api/admin/provisioning/plugins/reload"` |  |
| upstream.sidecar.plugins.script | string | `nil` |  |
| upstream.sidecar.plugins.skipReload | bool | `false` |  |
| upstream.sidecar.plugins.initPlugins | bool | `false` |  |
| upstream.sidecar.plugins.extraMounts | list | `[]` |  |
| upstream.sidecar.plugins.sizeLimit | string | `""` |  |
| upstream.sidecar.notifiers.enabled | bool | `false` |  |
| upstream.sidecar.notifiers.env | object | `{}` |  |
| upstream.sidecar.notifiers.label | string | `"grafana_notifier"` |  |
| upstream.sidecar.notifiers.labelValue | string | `""` |  |
| upstream.sidecar.notifiers.searchNamespace | string | `nil` |  |
| upstream.sidecar.notifiers.watchMethod | string | `"WATCH"` |  |
| upstream.sidecar.notifiers.resource | string | `"both"` |  |
| upstream.sidecar.notifiers.resourceName | string | `""` |  |
| upstream.sidecar.notifiers.reloadURL | string | `"http://localhost:3000/api/admin/provisioning/notifications/reload"` |  |
| upstream.sidecar.notifiers.script | string | `nil` |  |
| upstream.sidecar.notifiers.skipReload | bool | `false` |  |
| upstream.sidecar.notifiers.initNotifiers | bool | `false` |  |
| upstream.sidecar.notifiers.extraMounts | list | `[]` |  |
| upstream.sidecar.notifiers.sizeLimit | string | `""` |  |
| upstream.namespaceOverride | string | `""` |  |
| upstream.revisionHistoryLimit | int | `10` |  |
| upstream.imageRenderer.deploymentStrategy | object | `{}` |  |
| upstream.imageRenderer.enabled | bool | `false` |  |
| upstream.imageRenderer.replicas | int | `1` |  |
| upstream.imageRenderer.autoscaling.enabled | bool | `false` |  |
| upstream.imageRenderer.autoscaling.minReplicas | int | `1` |  |
| upstream.imageRenderer.autoscaling.maxReplicas | int | `5` |  |
| upstream.imageRenderer.autoscaling.targetCPU | string | `"60"` |  |
| upstream.imageRenderer.autoscaling.targetMemory | string | `""` |  |
| upstream.imageRenderer.autoscaling.behavior | object | `{}` |  |
| upstream.imageRenderer.serverURL | string | `""` |  |
| upstream.imageRenderer.renderingCallbackURL | string | `""` |  |
| upstream.imageRenderer.image.registry | string | `"registry1.dso.mil"` |  |
| upstream.imageRenderer.image.repository | string | `"ironbank/opensource/grafana/grafana-image-renderer"` |  |
| upstream.imageRenderer.image.tag | string | `"v4.0.10"` |  |
| upstream.imageRenderer.image.sha | string | `""` |  |
| upstream.imageRenderer.image.pullSecrets | list | `[]` |  |
| upstream.imageRenderer.image.pullPolicy | string | `"Always"` |  |
| upstream.imageRenderer.env.HTTP_HOST | string | `"0.0.0.0"` |  |
| upstream.imageRenderer.env.XDG_CONFIG_HOME | string | `"/tmp/.chromium"` |  |
| upstream.imageRenderer.env.XDG_CACHE_HOME | string | `"/tmp/.chromium"` |  |
| upstream.imageRenderer.envValueFrom | object | `{}` |  |
| upstream.imageRenderer.serviceAccountName | string | `""` |  |
| upstream.imageRenderer.automountServiceAccountToken | bool | `false` |  |
| upstream.imageRenderer.securityContext | object | `{}` |  |
| upstream.imageRenderer.containerSecurityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| upstream.imageRenderer.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.imageRenderer.containerSecurityContext.allowPrivilegeEscalation | bool | `false` |  |
| upstream.imageRenderer.containerSecurityContext.readOnlyRootFilesystem | bool | `true` |  |
| upstream.imageRenderer.podAnnotations | object | `{}` |  |
| upstream.imageRenderer.hostAliases | list | `[]` |  |
| upstream.imageRenderer.priorityClassName | string | `""` |  |
| upstream.imageRenderer.service.enabled | bool | `true` |  |
| upstream.imageRenderer.service.portName | string | `"http-web"` |  |
| upstream.imageRenderer.service.port | int | `8081` |  |
| upstream.imageRenderer.service.targetPort | int | `8081` |  |
| upstream.imageRenderer.service.appProtocol | string | `""` |  |
| upstream.imageRenderer.serviceMonitor.enabled | bool | `false` |  |
| upstream.imageRenderer.serviceMonitor.path | string | `"/metrics"` |  |
| upstream.imageRenderer.serviceMonitor.labels | object | `{}` |  |
| upstream.imageRenderer.serviceMonitor.interval | string | `"1m"` |  |
| upstream.imageRenderer.serviceMonitor.scheme | string | `"http"` |  |
| upstream.imageRenderer.serviceMonitor.tlsConfig | object | `{}` |  |
| upstream.imageRenderer.serviceMonitor.scrapeTimeout | string | `"30s"` |  |
| upstream.imageRenderer.serviceMonitor.relabelings | list | `[]` |  |
| upstream.imageRenderer.serviceMonitor.targetLabels | list | `[]` |  |
| upstream.imageRenderer.grafanaProtocol | string | `"http"` |  |
| upstream.imageRenderer.grafanaSubPath | string | `""` |  |
| upstream.imageRenderer.podPortName | string | `"http"` |  |
| upstream.imageRenderer.revisionHistoryLimit | int | `10` |  |
| upstream.imageRenderer.networkPolicy.limitIngress | bool | `true` |  |
| upstream.imageRenderer.networkPolicy.limitEgress | bool | `false` |  |
| upstream.imageRenderer.networkPolicy.extraIngressSelectors | list | `[]` |  |
| upstream.imageRenderer.resources | object | `{}` |  |
| upstream.imageRenderer.nodeSelector | object | `{}` |  |
| upstream.imageRenderer.tolerations | list | `[]` |  |
| upstream.imageRenderer.affinity | object | `{}` |  |
| upstream.imageRenderer.extraConfigmapMounts | list | `[]` |  |
| upstream.imageRenderer.extraSecretMounts | list | `[]` |  |
| upstream.imageRenderer.extraVolumeMounts | list | `[]` |  |
| upstream.imageRenderer.extraVolumes | list | `[]` |  |
| upstream.networkPolicy.enabled | bool | `false` |  |
| upstream.networkPolicy.ingress | bool | `true` |  |
| upstream.networkPolicy.allowExternal | bool | `true` |  |
| upstream.networkPolicy.explicitNamespacesSelector | object | `{}` |  |
| upstream.networkPolicy.egress.enabled | bool | `false` |  |
| upstream.networkPolicy.egress.blockDNSResolution | bool | `false` |  |
| upstream.networkPolicy.egress.ports | list | `[]` |  |
| upstream.networkPolicy.egress.to | list | `[]` |  |
| upstream.enableKubeBackwardCompatibility | bool | `false` |  |
| upstream.useStatefulSet | bool | `false` |  |
| upstream.extraObjects | list | `[]` |  |
| upstream.assertNoLeakedSecrets | bool | `false` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

