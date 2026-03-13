<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# grafana

![Version: 10.5.15-bb.1](https://img.shields.io/badge/Version-10.5.15--bb.1-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 12.4.0](https://img.shields.io/badge/AppVersion-12.4.0-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

The leading tool for querying and visualizing time series and metrics.

## Upstream References

- <https://grafana.com>
- <https://github.com/grafana/grafana>
- <https://github.com/grafana-community/helm-charts>

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

Kubernetes: `^1.25.0-0`

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
| networkPolicies | object | `{"egress":{"from":{"grafana":{"to":{"cidr":{"0.0.0.0/0":true},"definition":{"kubeAPI":true}}}}},"enabled":true,"ingress":{"to":{"grafana":{"from":{"k8s":{"kiali-service-account@kiali/kiali":true}}}}},"prependReleaseName":true}` | [bb-common Network Policies configuration](https://repo1.dso.mil/big-bang/product/packages/bb-common/-/blob/main/docs/network-policies/README.md?ref_type=heads) |
| domain | string | `"dev.bigbang.mil"` |  |
| autoRollingUpgrade.enabled | bool | `true` | Enable BigBang specific autoRollingUpgrade support |
| autoRollingUpgrade.image.repository | string | `"registry1.dso.mil/ironbank/big-bang/base"` |  |
| autoRollingUpgrade.image.tag | string | `"2.1.0"` |  |
| istio | object | `{"authorizationPolicies":{"custom":[],"enabled":true,"generateFromNetpol":true},"enabled":false,"mtls":{"mode":"STRICT"},"prependReleaseName":true,"serviceEntries":{"custom":[]},"sidecar":{"enabled":false,"outboundTrafficPolicyMode":"REGISTRY_ONLY"}}` | [bb-common Istio configuration](https://repo1.dso.mil/big-bang/product/packages/bb-common/-/blob/main/docs/istio/README.md) |
| istio.prependReleaseName | bool | `true` | Prepends the release name to istio resources created by bb-common |
| istio.sidecar | object | `{"enabled":false,"outboundTrafficPolicyMode":"REGISTRY_ONLY"}` | [bb-common Sidecar configuration](https://repo1.dso.mil/big-bang/product/packages/bb-common/-/blob/main/docs/istio/README.md#sidecar) |
| istio.serviceEntries | object | `{"custom":[]}` | [bb-common ServiceEntry configuration](https://repo1.dso.mil/big-bang/product/packages/bb-common/-/blob/main/docs/istio/README.md#custom-serviceentries) |
| istio.authorizationPolicies | object | `{"custom":[],"enabled":true,"generateFromNetpol":true}` | [bb-common AuthorizationPolicy configuration](https://repo1.dso.mil/big-bang/product/packages/bb-common/-/blob/main/docs/authorization-policies/README.md) |
| routes | object | `{"inbound":{"grafana":{"enabled":"{{ .Values.istio.enabled }}","gateways":["istio-gateway/public-ingressgateway"],"hosts":["grafana.{{ .Values.domain }}"],"http":[{"match":[{"uri":{"prefix":"/metrics"}}],"redirect":{"uri":"/"}},{"route":[{"destination":{"host":"monitoring-grafana","port":{"number":80}}}]}],"selector":{"app.kubernetes.io/name":"grafana"}}}}` | [bb-common Routes configuration](https://repo1.dso.mil/big-bang/product/packages/bb-common/-/blob/main/docs/routes/README.md) |
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
| upstream | object | Upstream chart values | Values to pass to [the upstream grafana chart](https://github.com/grafana/helm-charts/blob/main/charts/grafana/values.yaml) |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

