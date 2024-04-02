# How to upgrade the Grafana Package chart

Grafana is a modified/customized version of an upstream chart. The below details the steps required to update to a new version of the Grafana package.

---
1. Navigate to the [upstream chart repo and folder](https://github.com/grafana/helm-charts/tree/main/charts/grafana) and find the tag (e.g., `grafana-x.x.x`) that corresponds with the new chart version for this update.

1. From the root of the repo run `kpt pkg update chart@<tag> --strategy alpha-git-patch` replacing `<tag>` with the tag you got in step 1. You may be prompted to resolve some conflicts - choose what makes sense (if there are BB additions/changes keep them, if there are upstream additions/changes keep them).

1. Modify the `version` in `Chart.yaml` - you will want to append `-bb.0` to the chart version from upstream.

1. Check for changes to the [dashboards provided](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack/templates/grafana/dashboards-1.14) with `kube-prometheus-stack`. Also check for changes to the following [python script from upstream](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/hack/sync_grafana_dashboards.py). If there are changes read the section below for [Syncing Dashboards](#syncing-dashboards)

1. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Grafana chart to x.x.x` and `Updated image versions to latest in IB (grafana: x.x.x, etc)`.

1. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

1. Push up your changes, validate that CI passes. If there are any failures follow the information in the pipeline to make the necessary updates and reach out to the team if needed.

1.  Perform the steps below for manual testing. CI provides a good set of basic smoke tests (use the `debug` label) but it is beneficial to run some additional checks.

# Testing a new Grafana version

### Deploy Grafana as a part of BigBang

`overrides/testing-grafana.yaml`

```yaml
domain: bigbang.dev

flux:
  interval: 1m
  rollback:
    cleanupOnFail: false

networkPolicies:
  enabled: true

clusterAuditor:
  enabled: false

gatekeeper:
  enabled: false

neuvector:
  enabled: false

istioOperator:
  enabled: true

istio:
  enabled: true

monitoring:
  enabled: true

grafana:
  enabled: true
  git:
    tag: null
    branch: "renovate/ironbank"
  sso:
    enabled: true
    grafana:
      client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-grafana
      scopes: "openid Grafana"

loki:
  enabled: true

promtail:
  enabled: true

tempo:
  enabled: true

kyverno:
  enabled: false

kyvernoPolicies:
  enabled: false

kyvernoReporter:
  enabled: false

jaeger:
  enabled: false

kiali:
  enabled: false

elasticsearchKibana:
  enabled: false

eckOperator:
  enabled: false

fluentbit:
  enabled: false

twistlock:
  enabled: false
```

- Visit `https://grafana.bigbang.dev` and login
- Navigate to `Dashboards` and then click on `Kubernetes / Compute Resources / Cluster` and validate that data is loaded

# Modifications made to upstream chart

`values.yaml`

- Set `sso.enabled: false`
- Ensure `assertNoLeakedSecrets: false`
- Ensure the following section is added to the `grafana.ini`
```
grafana.ini:
  ...
  auth.generic_oauth:
    enabled: false
    client_id: grafana    #this is a sample client_id, review docs/KEYCLOAK.md
    client_secret: secret #this is a sample secret, review docs/KEYCLOAK.md
    scopes: Grafana       #this is a sample client scope, review docs/KEYCLOAK.md
    auth_url: https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/auth
    token_url: https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/token
    api_url: https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/userinfo
    allow_sign_up: true
    role_attribute_path: Viewer
    # tls_skip_verify_insecure: false
    # tls_client_cert: ""
    # tls_client_key: ""
    # tls_client_ca : /etc/oidc/ca.pem
    # allowed_domains: mycompany.com mycompany.org
    # empty_scopes: false
  plugin.grafana-piechart-panel:
    path: /var/lib/bb-plugins/piechart-panel
  plugin.grafana-polystat-panel:
    path: /var/lib/bb-plugins/polystat-panel
  plugin.redis-datasource:
    path: /var/lib/bb-plugins/redis-datasource
```

### automountServiceAccountToken
The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads).

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.

### Syncing Dashboards
Since we ship the grafana package separately due to https://repo1.dso.mil/big-bang/product/packages/monitoring/-/issues/110 & https://github.com/prometheus-community/helm-charts/issues/3548 where a solution never bubbled down that fixed the issue for our environments.

When the dashboards and script update upstream we must pull in the new scripts from `hack/` in `kube-prometheus-stack`. Modify them so that any new values are present in this chart, and revert back the references `.Values.grafana`  to just `.Values.` since this is the grafana chart.

Ensure relative locations are correct in the python script, eg: 
```
charts = [
    {
        'source': '../../monitoring/chart/files/dashboards/k8s-coredns.json', #Pointing to local BigBang monitoring chart/files/dashboard
        'destination': '../chart/templates/dashboards/dashboards-1.14', #Pointing to this grafana package chart/templates/dashboards (eg ran from hack/ folder)
        ...,
    },
    {
        ...,
        'destination': '../chart/templates/dashboards/dashboards-1.14',
```

Push up changes to `dashboards/dashboards-1.14` folder. Deploy in dev and ensure modified dashboards from upstream (coredns/node-exporter/etcd) are importing and showing data as before the changes/upgrades.