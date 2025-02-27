<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# grafana

![Version: 8.10.1-bb.0](https://img.shields.io/badge/Version-8.10.1--bb.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 11.5.2](https://img.shields.io/badge/AppVersion-11.5.2-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

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
| rbac.create | bool | `true` |  |
| rbac.pspEnabled | bool | `false` |  |
| rbac.pspUseAppArmor | bool | `false` |  |
| rbac.namespaced | bool | `false` |  |
| rbac.extraRoleRules | list | `[]` |  |
| rbac.extraClusterRoleRules | list | `[]` |  |
| serviceAccount.create | bool | `true` |  |
| serviceAccount.name | string | `nil` |  |
| serviceAccount.nameTest | string | `nil` |  |
| serviceAccount.labels | object | `{}` |  |
| serviceAccount.automountServiceAccountToken | bool | `false` |  |
| replicas | int | `1` |  |
| headlessService | bool | `false` |  |
| automountServiceAccountToken | bool | `true` |  |
| autoscaling.enabled | bool | `false` |  |
| autoscaling.minReplicas | int | `1` |  |
| autoscaling.maxReplicas | int | `5` |  |
| autoscaling.targetCPU | string | `"60"` |  |
| autoscaling.targetMemory | string | `""` |  |
| autoscaling.behavior | object | `{}` |  |
| podDisruptionBudget | object | `{}` |  |
| deploymentStrategy.type | string | `"RollingUpdate"` |  |
| readinessProbe.httpGet.path | string | `"/api/health"` |  |
| readinessProbe.httpGet.port | int | `3000` |  |
| livenessProbe.httpGet.path | string | `"/api/health"` |  |
| livenessProbe.httpGet.port | int | `3000` |  |
| livenessProbe.initialDelaySeconds | int | `60` |  |
| livenessProbe.timeoutSeconds | int | `30` |  |
| livenessProbe.failureThreshold | int | `10` |  |
| image.repository | string | `"ironbank/big-bang/grafana/grafana-plugins"` |  |
| image.tag | string | `"11.5.2"` |  |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.pullSecrets[0] | string | `"private-registry"` |  |
| testFramework.enabled | bool | `false` |  |
| testFramework.image | string | `"ironbank/opensource/bats/bats"` |  |
| testFramework.tag | string | `"v1.4.1"` |  |
| testFramework.imagePullPolicy | string | `"IfNotPresent"` |  |
| testFramework.securityContext | object | `{}` |  |
| testFramework.resources | object | `{}` |  |
| dnsPolicy | string | `nil` |  |
| dnsConfig | object | `{}` |  |
| securityContext.runAsNonRoot | bool | `true` |  |
| securityContext.runAsUser | int | `65532` |  |
| securityContext.runAsGroup | int | `65532` |  |
| securityContext.fsGroup | int | `65532` |  |
| containerSecurityContext.allowPrivilegeEscalation | bool | `false` |  |
| containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| containerSecurityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| createConfigmap | bool | `true` |  |
| extraConfigmapMounts | list | `[]` |  |
| extraEmptyDirMounts | list | `[]` |  |
| extraLabels | object | `{}` |  |
| downloadDashboardsImage.repository | string | `"ironbank/big-bang/base"` |  |
| downloadDashboardsImage.tag | string | `"2.1.0"` |  |
| downloadDashboardsImage.pullPolicy | string | `"IfNotPresent"` |  |
| downloadDashboards.env | object | `{}` |  |
| downloadDashboards.envFromSecret | string | `""` |  |
| downloadDashboards.resources.limits.cpu | string | `"20m"` |  |
| downloadDashboards.resources.limits.memory | string | `"20Mi"` |  |
| downloadDashboards.resources.requests.cpu | string | `"20m"` |  |
| downloadDashboards.resources.requests.memory | string | `"20Mi"` |  |
| downloadDashboards.securityContext.allowPrivilegeEscalation | bool | `false` |  |
| downloadDashboards.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| downloadDashboards.securityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| downloadDashboards.envValueFrom | object | `{}` |  |
| podLabels | object | `{}` |  |
| podPortName | string | `"grafana"` |  |
| gossipPortName | string | `"gossip"` |  |
| service.enabled | bool | `true` |  |
| service.type | string | `"ClusterIP"` |  |
| service.ipFamilyPolicy | string | `""` |  |
| service.ipFamilies | list | `[]` |  |
| service.loadBalancerIP | string | `""` |  |
| service.loadBalancerClass | string | `""` |  |
| service.loadBalancerSourceRanges | list | `[]` |  |
| service.port | int | `80` |  |
| service.targetPort | int | `3000` |  |
| service.annotations | object | `{}` |  |
| service.labels | object | `{}` |  |
| service.portName | string | `"http-service"` |  |
| service.appProtocol | string | `""` |  |
| service.sessionAffinity | string | `""` |  |
| serviceMonitor.enabled | bool | `false` |  |
| serviceMonitor.path | string | `"/metrics"` |  |
| serviceMonitor.labels | object | `{}` |  |
| serviceMonitor.interval | string | `"1m"` |  |
| serviceMonitor.scheme | string | `"http"` |  |
| serviceMonitor.tlsConfig | object | `{}` |  |
| serviceMonitor.scrapeTimeout | string | `"30s"` |  |
| serviceMonitor.relabelings | list | `[]` |  |
| serviceMonitor.metricRelabelings | list | `[]` |  |
| serviceMonitor.basicAuth | object | `{}` |  |
| serviceMonitor.targetLabels | list | `[]` |  |
| extraExposePorts | list | `[]` |  |
| hostAliases | list | `[]` |  |
| ingress.enabled | bool | `false` |  |
| ingress.annotations | object | `{}` |  |
| ingress.labels | object | `{}` |  |
| ingress.path | string | `"/"` |  |
| ingress.pathType | string | `"Prefix"` |  |
| ingress.hosts[0] | string | `"chart-example.local"` |  |
| ingress.extraPaths | list | `[]` |  |
| ingress.tls | list | `[]` |  |
| route | object | `{"main":{"additionalRules":[],"annotations":{},"apiVersion":"gateway.networking.k8s.io/v1","enabled":false,"filters":[],"hostnames":[],"kind":"HTTPRoute","labels":{},"matches":[{"path":{"type":"PathPrefix","value":"/"}}],"parentRefs":[]}}` | BETA: Configure the gateway routes for the chart here. More routes can be added by adding a dictionary key like the 'main' route. Be aware that this is an early beta of this feature, kube-prometheus-stack does not guarantee this works and is subject to change. Being BETA this can/will change in the future without notice, do not use unless you want to take that risk [[ref]](https://gateway-api.sigs.k8s.io/references/spec/#gateway.networking.k8s.io%2fv1alpha2) |
| route.main.enabled | bool | `false` | Enables or disables the route |
| route.main.apiVersion | string | `"gateway.networking.k8s.io/v1"` | Set the route apiVersion, e.g. gateway.networking.k8s.io/v1 or gateway.networking.k8s.io/v1alpha2 |
| route.main.kind | string | `"HTTPRoute"` | Set the route kind Valid options are GRPCRoute, HTTPRoute, TCPRoute, TLSRoute, UDPRoute |
| resources.limits.cpu | string | `"100m"` |  |
| resources.limits.memory | string | `"256Mi"` |  |
| resources.requests.cpu | string | `"100m"` |  |
| resources.requests.memory | string | `"256Mi"` |  |
| nodeSelector | object | `{}` |  |
| tolerations | list | `[]` |  |
| affinity | object | `{}` |  |
| topologySpreadConstraints | list | `[]` |  |
| extraInitContainers | list | `[]` |  |
| extraContainers | string | `""` |  |
| extraContainerVolumes | list | `[]` |  |
| persistence.type | string | `"pvc"` |  |
| persistence.enabled | bool | `false` |  |
| persistence.accessModes[0] | string | `"ReadWriteOnce"` |  |
| persistence.size | string | `"10Gi"` |  |
| persistence.finalizers[0] | string | `"kubernetes.io/pvc-protection"` |  |
| persistence.extraPvcLabels | object | `{}` |  |
| persistence.disableWarning | bool | `false` |  |
| persistence.inMemory.enabled | bool | `false` |  |
| persistence.lookupVolumeName | bool | `true` |  |
| initChownData.enabled | bool | `false` |  |
| initChownData.image.repository | string | `"ironbank/redhat/ubi/ubi9-minimal"` |  |
| initChownData.image.tag | string | `"9.5"` |  |
| initChownData.image.sha | string | `""` |  |
| initChownData.image.pullPolicy | string | `"IfNotPresent"` |  |
| initChownData.resources.limits.cpu | string | `"100m"` |  |
| initChownData.resources.limits.memory | string | `"128Mi"` |  |
| initChownData.resources.requests.cpu | string | `"100m"` |  |
| initChownData.resources.requests.memory | string | `"128Mi"` |  |
| initChownData.securityContext.runAsNonRoot | bool | `false` |  |
| initChownData.securityContext.runAsUser | int | `0` |  |
| initChownData.securityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| initChownData.securityContext.capabilities.add[0] | string | `"CHOWN"` |  |
| adminUser | string | `"admin"` |  |
| adminPassword | string | `"prom-operator"` |  |
| admin.existingSecret | string | `""` |  |
| admin.userKey | string | `"admin-user"` |  |
| admin.passwordKey | string | `"admin-password"` |  |
| env | object | `{}` |  |
| envValueFrom | object | `{}` |  |
| envFromSecret | string | `""` |  |
| envRenderSecret | object | `{}` |  |
| envFromSecrets | list | `[]` |  |
| envFromConfigMaps | list | `[]` |  |
| enableServiceLinks | bool | `true` |  |
| extraSecretMounts | list | `[]` |  |
| extraVolumeMounts | list | `[]` |  |
| extraVolumes | list | `[]` |  |
| lifecycleHooks | object | `{}` |  |
| plugins | list | `[]` |  |
| datasources | object | `{}` |  |
| alerting | object | `{}` |  |
| notifiers | object | `{}` |  |
| dashboardProviders | object | `{}` |  |
| dashboards | object | `{}` |  |
| dashboardsConfigMaps | object | `{}` |  |
| "grafana.ini".paths.data | string | `"/var/lib/grafana/"` |  |
| "grafana.ini".paths.logs | string | `"/var/log/grafana"` |  |
| "grafana.ini".paths.plugins | string | `"/var/lib/grafana/plugins"` |  |
| "grafana.ini".paths.provisioning | string | `"/etc/grafana/provisioning"` |  |
| "grafana.ini".analytics.reporting_enabled | bool | `false` |  |
| "grafana.ini".analytics.check_for_updates | bool | `false` |  |
| "grafana.ini".log.mode | string | `"console"` |  |
| "grafana.ini".grafana_net.url | string | `"https://grafana.net"` |  |
| "grafana.ini".server.domain | string | `"{{ if (and .Values.ingress.enabled .Values.ingress.hosts) }}{{ tpl (.Values.ingress.hosts \| first) . }}{{ else }}''{{ end }}"` |  |
| "grafana.ini"."auth.generic_oauth".enabled | bool | `false` |  |
| "grafana.ini"."auth.generic_oauth".client_id | string | `"grafana"` |  |
| "grafana.ini"."auth.generic_oauth".client_secret | string | `"secret"` |  |
| "grafana.ini"."auth.generic_oauth".scopes | string | `"Grafana"` |  |
| "grafana.ini"."auth.generic_oauth".auth_url | string | `"https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/auth"` |  |
| "grafana.ini"."auth.generic_oauth".token_url | string | `"https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/token"` |  |
| "grafana.ini"."auth.generic_oauth".api_url | string | `"https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/userinfo"` |  |
| "grafana.ini"."auth.generic_oauth".allow_sign_up | bool | `true` |  |
| "grafana.ini"."auth.generic_oauth".role_attribute_path | string | `"Viewer"` |  |
| "grafana.ini"."plugin.grafana-piechart-panel".path | string | `"/var/lib/bb-plugins/piechart-panel"` |  |
| "grafana.ini"."plugin.grafana-polystat-panel".path | string | `"/var/lib/bb-plugins/polystat-panel"` |  |
| "grafana.ini"."plugin.redis-datasource".path | string | `"/var/lib/bb-plugins/redis-datasource"` |  |
| "grafana.ini".security.angular_support_enabled | bool | `false` |  |
| ldap.enabled | bool | `false` |  |
| ldap.existingSecret | string | `""` |  |
| ldap.config | string | `""` |  |
| shareProcessNamespace | bool | `false` |  |
| smtp.existingSecret | string | `""` |  |
| smtp.userKey | string | `"user"` |  |
| smtp.passwordKey | string | `"password"` |  |
| sidecar.image.repository | string | `"ironbank/kiwigrid/k8s-sidecar"` |  |
| sidecar.image.tag | string | `"1.30.0"` |  |
| sidecar.imagePullPolicy | string | `"IfNotPresent"` |  |
| sidecar.resources.limits.cpu | string | `"100m"` |  |
| sidecar.resources.limits.memory | string | `"100Mi"` |  |
| sidecar.resources.requests.cpu | string | `"100m"` |  |
| sidecar.resources.requests.memory | string | `"100Mi"` |  |
| sidecar.securityContext.allowPrivilegeEscalation | bool | `false` |  |
| sidecar.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| sidecar.securityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| sidecar.enableUniqueFilenames | bool | `false` |  |
| sidecar.readinessProbe | object | `{}` |  |
| sidecar.livenessProbe | object | `{}` |  |
| sidecar.alerts.enabled | bool | `false` |  |
| sidecar.alerts.env | object | `{}` |  |
| sidecar.alerts.label | string | `"grafana_alert"` |  |
| sidecar.alerts.labelValue | string | `""` |  |
| sidecar.alerts.searchNamespace | string | `nil` |  |
| sidecar.alerts.watchMethod | string | `"WATCH"` |  |
| sidecar.alerts.resource | string | `"both"` |  |
| sidecar.alerts.reloadURL | string | `"http://localhost:3000/api/admin/provisioning/alerting/reload"` |  |
| sidecar.alerts.script | string | `nil` |  |
| sidecar.alerts.skipReload | bool | `false` |  |
| sidecar.alerts.initAlerts | bool | `false` |  |
| sidecar.alerts.extraMounts | list | `[]` |  |
| sidecar.alerts.sizeLimit | object | `{}` |  |
| sidecar.dashboards.enabled | bool | `true` |  |
| sidecar.dashboards.env | object | `{}` |  |
| sidecar.dashboards.envValueFrom | object | `{}` |  |
| sidecar.dashboards.SCProvider | bool | `true` |  |
| sidecar.dashboards.label | string | `"grafana_dashboard"` |  |
| sidecar.dashboards.labelValue | string | `"1"` |  |
| sidecar.dashboards.folder | string | `"/tmp/dashboards"` |  |
| sidecar.dashboards.defaultFolderName | string | `nil` |  |
| sidecar.dashboards.searchNamespace | string | `"ALL"` |  |
| sidecar.dashboards.watchMethod | string | `"WATCH"` |  |
| sidecar.dashboards.resource | string | `"both"` |  |
| sidecar.dashboards.folderAnnotation | string | `nil` |  |
| sidecar.dashboards.reloadURL | string | `"http://localhost:3000/api/admin/provisioning/dashboards/reload"` |  |
| sidecar.dashboards.script | string | `nil` |  |
| sidecar.dashboards.skipReload | bool | `false` |  |
| sidecar.dashboards.provider.name | string | `"sidecarProvider"` |  |
| sidecar.dashboards.provider.orgid | int | `1` |  |
| sidecar.dashboards.provider.folder | string | `""` |  |
| sidecar.dashboards.provider.folderUid | string | `""` |  |
| sidecar.dashboards.provider.type | string | `"file"` |  |
| sidecar.dashboards.provider.disableDelete | bool | `false` |  |
| sidecar.dashboards.provider.allowUiUpdates | bool | `false` |  |
| sidecar.dashboards.provider.foldersFromFilesStructure | bool | `false` |  |
| sidecar.dashboards.extraMounts | list | `[]` |  |
| sidecar.dashboards.sizeLimit | object | `{}` |  |
| sidecar.dashboards.multicluster.global.enabled | bool | `true` |  |
| sidecar.dashboards.multicluster.etcd.enabled | bool | `true` |  |
| sidecar.datasources.enabled | bool | `true` |  |
| sidecar.datasources.env | object | `{}` |  |
| sidecar.datasources.envValueFrom | object | `{}` |  |
| sidecar.datasources.label | string | `"grafana_datasource"` |  |
| sidecar.datasources.labelValue | string | `"1"` |  |
| sidecar.datasources.searchNamespace | string | `nil` |  |
| sidecar.datasources.watchMethod | string | `"WATCH"` |  |
| sidecar.datasources.resource | string | `"both"` |  |
| sidecar.datasources.reloadURL | string | `"http://localhost:3000/api/admin/provisioning/datasources/reload"` |  |
| sidecar.datasources.script | string | `nil` |  |
| sidecar.datasources.skipReload | bool | `false` |  |
| sidecar.datasources.initDatasources | bool | `false` |  |
| sidecar.datasources.extraMounts | list | `[]` |  |
| sidecar.datasources.sizeLimit | object | `{}` |  |
| sidecar.plugins.enabled | bool | `false` |  |
| sidecar.plugins.env | object | `{}` |  |
| sidecar.plugins.label | string | `"grafana_plugin"` |  |
| sidecar.plugins.labelValue | string | `""` |  |
| sidecar.plugins.searchNamespace | string | `nil` |  |
| sidecar.plugins.watchMethod | string | `"WATCH"` |  |
| sidecar.plugins.resource | string | `"both"` |  |
| sidecar.plugins.reloadURL | string | `"http://localhost:3000/api/admin/provisioning/plugins/reload"` |  |
| sidecar.plugins.script | string | `nil` |  |
| sidecar.plugins.skipReload | bool | `false` |  |
| sidecar.plugins.initPlugins | bool | `false` |  |
| sidecar.plugins.extraMounts | list | `[]` |  |
| sidecar.plugins.sizeLimit | object | `{}` |  |
| sidecar.notifiers.enabled | bool | `false` |  |
| sidecar.notifiers.env | object | `{}` |  |
| sidecar.notifiers.label | string | `"grafana_notifier"` |  |
| sidecar.notifiers.labelValue | string | `""` |  |
| sidecar.notifiers.searchNamespace | string | `nil` |  |
| sidecar.notifiers.watchMethod | string | `"WATCH"` |  |
| sidecar.notifiers.resource | string | `"both"` |  |
| sidecar.notifiers.reloadURL | string | `"http://localhost:3000/api/admin/provisioning/notifications/reload"` |  |
| sidecar.notifiers.script | string | `nil` |  |
| sidecar.notifiers.skipReload | bool | `false` |  |
| sidecar.notifiers.initNotifiers | bool | `false` |  |
| sidecar.notifiers.extraMounts | list | `[]` |  |
| sidecar.notifiers.sizeLimit | object | `{}` |  |
| namespaceOverride | string | `""` |  |
| revisionHistoryLimit | int | `10` |  |
| imageRenderer.deploymentStrategy | object | `{}` |  |
| imageRenderer.enabled | bool | `false` |  |
| imageRenderer.replicas | int | `1` |  |
| imageRenderer.autoscaling.enabled | bool | `false` |  |
| imageRenderer.autoscaling.minReplicas | int | `1` |  |
| imageRenderer.autoscaling.maxReplicas | int | `5` |  |
| imageRenderer.autoscaling.targetCPU | string | `"60"` |  |
| imageRenderer.autoscaling.targetMemory | string | `""` |  |
| imageRenderer.autoscaling.behavior | object | `{}` |  |
| imageRenderer.serverURL | string | `""` |  |
| imageRenderer.renderingCallbackURL | string | `""` |  |
| imageRenderer.image.repository | string | `"docker.io/grafana/grafana-image-renderer"` |  |
| imageRenderer.image.tag | string | `"latest"` |  |
| imageRenderer.image.sha | string | `""` |  |
| imageRenderer.image.pullPolicy | string | `"Always"` |  |
| imageRenderer.env.HTTP_HOST | string | `"0.0.0.0"` |  |
| imageRenderer.env.XDG_CONFIG_HOME | string | `"/tmp/.chromium"` |  |
| imageRenderer.env.XDG_CACHE_HOME | string | `"/tmp/.chromium"` |  |
| imageRenderer.envValueFrom | object | `{}` |  |
| imageRenderer.serviceAccountName | string | `""` |  |
| imageRenderer.automountServiceAccountToken | bool | `false` |  |
| imageRenderer.securityContext | object | `{}` |  |
| imageRenderer.containerSecurityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| imageRenderer.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| imageRenderer.containerSecurityContext.allowPrivilegeEscalation | bool | `false` |  |
| imageRenderer.containerSecurityContext.readOnlyRootFilesystem | bool | `true` |  |
| imageRenderer.podAnnotations | object | `{}` |  |
| imageRenderer.hostAliases | list | `[]` |  |
| imageRenderer.priorityClassName | string | `""` |  |
| imageRenderer.service.enabled | bool | `true` |  |
| imageRenderer.service.portName | string | `"http-web"` |  |
| imageRenderer.service.port | int | `8081` |  |
| imageRenderer.service.targetPort | int | `8081` |  |
| imageRenderer.service.appProtocol | string | `""` |  |
| imageRenderer.serviceMonitor.enabled | bool | `false` |  |
| imageRenderer.serviceMonitor.path | string | `"/metrics"` |  |
| imageRenderer.serviceMonitor.labels | object | `{}` |  |
| imageRenderer.serviceMonitor.interval | string | `"1m"` |  |
| imageRenderer.serviceMonitor.scheme | string | `"http"` |  |
| imageRenderer.serviceMonitor.tlsConfig | object | `{}` |  |
| imageRenderer.serviceMonitor.scrapeTimeout | string | `"30s"` |  |
| imageRenderer.serviceMonitor.relabelings | list | `[]` |  |
| imageRenderer.serviceMonitor.targetLabels | list | `[]` |  |
| imageRenderer.grafanaProtocol | string | `"http"` |  |
| imageRenderer.grafanaSubPath | string | `""` |  |
| imageRenderer.podPortName | string | `"http"` |  |
| imageRenderer.revisionHistoryLimit | int | `10` |  |
| imageRenderer.networkPolicy.limitIngress | bool | `true` |  |
| imageRenderer.networkPolicy.limitEgress | bool | `false` |  |
| imageRenderer.networkPolicy.extraIngressSelectors | list | `[]` |  |
| imageRenderer.resources | object | `{}` |  |
| imageRenderer.nodeSelector | object | `{}` |  |
| imageRenderer.tolerations | list | `[]` |  |
| imageRenderer.affinity | object | `{}` |  |
| imageRenderer.extraConfigmapMounts | list | `[]` |  |
| imageRenderer.extraSecretMounts | list | `[]` |  |
| imageRenderer.extraVolumeMounts | list | `[]` |  |
| imageRenderer.extraVolumes | list | `[]` |  |
| networkPolicy.enabled | bool | `false` |  |
| networkPolicy.ingress | bool | `true` |  |
| networkPolicy.allowExternal | bool | `true` |  |
| networkPolicy.explicitNamespacesSelector | object | `{}` |  |
| networkPolicy.egress.enabled | bool | `false` |  |
| networkPolicy.egress.blockDNSResolution | bool | `false` |  |
| networkPolicy.egress.ports | list | `[]` |  |
| networkPolicy.egress.to | list | `[]` |  |
| enableKubeBackwardCompatibility | bool | `false` |  |
| useStatefulSet | bool | `false` |  |
| extraObjects | list | `[]` |  |
| assertNoLeakedSecrets | bool | `false` |  |
| defaultDashboardsEnabled.enabled | bool | `true` |  |
| coreDns.enabled | bool | `true` |  |
| kubeEtcd.enabled | bool | `true` |  |
| kubeApiServer.enabled | bool | `true` |  |
| kubeControllerManager.enabled | bool | `true` |  |
| kubelet.enabled | bool | `true` |  |
| kubelet.namespace | string | `"kube-system"` |  |
| kubeProxy.enabled | bool | `true` |  |
| kubeScheduler.enabled | bool | `true` |  |
| nodeExporter.enabled | bool | `true` |  |
| nodeExporter.operatingSystems.linux.enabled | bool | `true` |  |
| nodeExporter.operatingSystems.darwin.enabled | bool | `true` |  |
| nodeExporter.operatingSystems.windows.enabled | bool | `true` |  |
| windowsMonitoring.enabled | bool | `true` |  |
| prometheusRemoteWriteDashboards | bool | `true` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"public-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| defaultDashboardsEditable | bool | `true` |  |
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

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

