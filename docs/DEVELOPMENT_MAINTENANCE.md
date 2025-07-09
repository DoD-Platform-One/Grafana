# Development and Maintenance Guide for the Grafana Package

Grafana is a modified/customized version of an upstream chart. The below details the steps required to update to a new version of the Grafana package.

## How to upgrade the Grafana Package chart

1. Navigate to the [upstream chart repo and folder](https://github.com/grafana/helm-charts/tree/main/charts/grafana) and find the tag (e.g., `grafana-x.x.x`) that corresponds with the new chart version for this update.

2. From the root of the repo run `kpt pkg update chart@<tag> --strategy alpha-git-patch` replacing `<tag>` with the tag you got in step 1. You may be prompted to resolve some conflicts - choose what makes sense (if there are BB additions/changes keep them, if there are upstream additions/changes keep them).

3. See the [Big Bang Modifications](#big-bang-modifications) section below for the changes that need to be made to the [`chart/values.yaml`](#chartvaluesyaml) and [`chart/templates/_helpers.tpl`](#charttemplates_helperstpl) files.

4. Modify the `version` in `Chart.yaml`. You will want to append `-bb.0` to the chart version from upstream.

5. Update dependencies to latest BB gluon library version using `helm dependency update ./chart`

6. Check for changes to the [dashboards provided](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack/templates/grafana/dashboards-1.14) with `kube-prometheus-stack`. Also check for changes to the following [python script from upstream](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/hack/sync_grafana_dashboards.py). If there are changes read the section below for [Syncing Dashboards](#syncing-dashboards)

7. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Grafana chart to x.x.x` and `Updated image versions to latest in IB (grafana: x.x.x, etc)`.

8. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

9. Push up your changes, validate that CI passes. If there are any failures follow the information in the pipeline to make the necessary updates and reach out to the team if needed.

## Testing a new Grafana version

1. (_Optional, only required if package changes are expected to have cascading effects on bigbang umbrella chart_) As part of your MR that modifies bigbang packages, you should modify the bigbang  [bigbang/tests/test-values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/tests/test-values.yaml?ref_type=heads) against your branch for the CI/CD MR testing by enabling your packages.

    - To do this, at a minimum, you will need to follow the instructions at [bigbang/docs/developer/test-package-against-bb.md](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/developer/test-package-against-bb.md?ref_type=heads) with changes for Grafana enabled (the below is a reference, actual changes could be more depending on what changes were made to Grafana in the package MR).

    **[test-values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/tests/test-values.yaml?ref_type=heads)**

    ```yaml
    grafana:
      enabled: true
      git:
        tag: null
        branch: "renovate/ironbank"
      values:
        istio:
          hardened:
            enabled: true
      ### Additional components of Grafana should be changed to reflect testing changes introduced in the package MR
    ```

2. Perform the steps below for manual testing. Our CI provides a good set of basic smoke tests (use the `debug` label), but it is beneficial to run some additional checks.

### Deploy Grafana as a part of BigBang

`overrides/testing-grafana.yaml`

```yaml
sso:
  name: P1 SSO
  url: https://login.dso.mil/auth/realms/baby-yoda

istiod:
  enabled: true
  values:
    hardened:
      enabled: true
istioCRDs:
  enabled: true
istioGateway:
  enabled: true

flux:
  interval: 1m
  rollback:
    cleanupOnFail: false

networkPolicies:
  enabled: true

alloy:
  enabled: true
  alloyLogs:
    enabled: true

gatekeeper:
  enabled: false

neuvector:
  enabled: false

monitoring:
  enabled: true

loki:
  enabled: true

tempo:
  enabled: true

kyverno:
  enabled: true

kyvernoPolicies:
  enabled: true

kyvernoReporter:
  enabled: true

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
  values:
    istio:
      enabled: true
      hardened:
        enabled: true
```

- Login to [Grafana](https://grafana.dev.bigbang.mil)
- Navigate to `Dashboards` and then click on `Kubernetes / Compute Resources / Cluster` and validate that data is loaded

## Big Bang Modifications

Modifications made to upstream chart

### `chart/values.yaml`

- Ensure `global.imageRegistry` is set to to `registry1.dso.mil`.

  ```yaml
  global:
    # -- Overrides the Docker registry globally for all images
    imageRegistry: registry1.dso.mil
  ```

- Ensure `openshift: false` is present.

  ```yaml
  openshift: false
  ```

- Ensure the `image` configuration is set to the following, where `X.Y.Z` is the correct version:

  ```yaml
  image:
    registry: registry1.dso.mil
    repository: ironbank/big-bang/grafana/grafana-plugins
    # Overrides the Grafana image tag whose default is the chart appVersion
    tag: "X.Y.Z"
    #sha: ""
  ```

- Ensure `image.pullSecrets` is supplied.

  ```yaml
  pullSecrets:
  - private-registry
  ```

- Ensure the `testFramework` configuration is set to the following, where `X.Y.Z` is the correct version:

  ```yaml
  testFramework:
    enabled: false
    image:
      registry: registry1.dso.mil
      repository: ironbank/opensource/bats/bats
      tag: "X.Y.Z"
  ```

- Ensure the `securityContext` values for `runAsUser`, `runAsGroup`, and `fsGroup` are set to `65532`:

  ```yaml
  securityContext:
    runAsNonRoot: true
    runAsUser: 65532
    runAsGroup: 65532
    fsGroup: 65532
  ```

- Ensure the `downloadDashboardsImage` configuration is set to the following, where `X.Y.Z` is the correct version:

  ```yaml
  downloadDashboardsImage:
    registry: registry1.dso.mil
    repository: ironbank/big-bang/base
    tag: X.Y.Z
    #sha: ""
  ```

- Ensure the `downloadDashboards.resources` configuration is set to the following:

  ```yaml
  resources:
    limits:
      cpu: 20m
      memory: 20Mi
    requests:
      cpu: 20m
      memory: 20Mi
  ```

- Ensure `service.portName` is set to `http-service`.

  ```yaml
  portName: http-service
  ```

- Ensure `serviceMonitor.interval` is set to `1m`.

  ```yaml
  interval: 1m
  ```

- Ensure `resources` is set to the following:

  ```yaml
  resources:
#    limits:
#      cpu: 100m
#      memory: 256Mi
    requests:
      cpu: 100m
      memory: 256Mi
    ```

- Ensure `initChownData.enabled` is set to `false`.

  ```yaml
  initChownData:
    ## If false, data ownership will not be reset at startup
    ## This allows the grafana-server to be run with an arbitrary user
    ##
    enabled: false
  ```

- Ensure `initChownData.image` is set to the following, where `X.Y` is the correct version:

  ```yaml
  image:
    registry: registry1.dso.mil
    repository: ironbank/redhat/ubi/ubi9-minimal
    tag: "X.Y"
    sha: ""
    pullPolicy: IfNotPresent
  ```

- Ensure `initChownData.resources` is set to the following:

  ```yaml
  resources:
#    limits:
#      cpu: 100m
#      memory: 128Mi
    requests:
      cpu: 100m
      memory: 128Mi
    ```

- Ensure `adminPassword` is set to `prom-operator`.

  ```yaml
  adminPassword: prom-operator
  ```

- Ensure that `grafana.ini.analytics` has these values:

  ```yaml
   analytics:
    reporting_enabled: false
    check_for_updates: false
  ```

- Ensure the following section is added to the `grafana.ini` configuration:

  ```yaml
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
  security:
    angular_support_enabled: false
  ```

- Ensure that `sidecar.image` is set to the following, where `X.Y.Z` is the correct version:

  ```yaml
  sidecar:
    image:
      registry: registry1.dso.mil
      repository: ironbank/kiwigrid/k8s-sidecar
      tag: X.Y.Z
  ```

- Ensure that `sidecar.resources` is set to the following:

  ```yaml
  resources:
#    limits:
#      cpu: 100m
#      memory: 100Mi
    requests:
      cpu: 100m
      memory: 100Mi
  ```

- Ensure `sidecar.dashboards.enabled` is set to `true`.

  ```yaml
  dashboards:
    enabled: true
  ```

- Ensure `sidecar.dashboards.labelValue` is set to `"1"`.

  ```yaml
  labelValue: "1"
  ```

- Ensure `sidecar.dashboards.searchNameSpace` is set to `ALL`.

  ```yaml
  searchNamespace: ALL
  ```

- Ensure `sidecar.dashboards.multicluster` is set to the following:

  ```yaml
  multicluster:
    global:
      enabled: true
    etcd:
      enabled: true
  ```

- Ensure `sidecar.datasources.enabled` is set to `true`.

  ```yaml
  datasources:
    enabled: true
  ```

- Ensure `sidecar.datasources.labelValue` is set to `"1"`.

  ```yaml
  labelValue: "1"
  ```

- Ensure `imageRenderer.image` is set to the following, where `X.Y.Z` is the correct version.

  ```yaml
  image:
    registry: registry1.dso.mil
    # image-renderer Image repository
    repository: ironbank/opensource/grafana/grafana-image-renderer
    # image-renderer Image tag
    tag: X.Y.Z
    # image-renderer Image sha (optional)
    sha: ""
    # image-renderer Image pull secrets (optional)
    pullSecrets: []
    # image-renderer ImagePullPolicy
    pullPolicy: Always
  ```

- Ensure `imageRenderer.service.portName` is set to `http-web`

  ```yaml
  portName: http-web
  ```

- Ensure `assertNoLeakedSecrets` is set to `false`.

  ```yaml
  assertNoLeakedSecrets: false
  ```

- Add the following extra configurations to the bottom of the file:

  ```yaml
  defaultDashboardsEnabled:
    enabled: true
  coreDns:
    enabled: true
  kubeEtcd:
    enabled: true
  kubeApiServer:
    enabled: true
  kubeControllerManager:
    enabled: true
  kubelet:
    enabled: true
    namespace: kube-system
  kubeProxy:
    enabled: true
  kubeScheduler:
    enabled: true
  nodeExporter:
    enabled: true
    operatingSystems:
      linux:
        enabled: true
      darwin:
        enabled: true
      windows:
        enabled: true
  windowsMonitoring:
    enabled: true
  prometheusRemoteWriteDashboards: true
  networkPolicies:
    enabled: false
    ingressLabels:
      app: public-ingressgateway
      istio: ingressgateway
    additionalPolicies: []
  defaultDashboardsEditable: true

  domain: dev.bigbang.mil

  istio:
    enabled: false
    hardened:
      enabled: false
      outboundTrafficPolicyMode: "REGISTRY_ONLY"
      customServiceEntries: []
        # - name: "allow-google"
        #   enabled: true
        #   spec:
        #     hosts:
        #       - google.com
        #     location: MESH_EXTERNAL
        #     ports:
        #       - number: 443
        #         protocol: TLS
        #         name: https
        #     resolution: DNS
      customAuthorizationPolicies: []
      # - name: "allow-nothing"
      #   enabled: true
      #   spec: {}
      kiali:
        enabled: true
        namespaces:
        - kiali
        principals:
        - cluster.local/ns/kiali/sa/kiali-service-account

    grafana:
      # Toggle vs creation
      enabled: true
      annotations: {}
      labels: {}
      gateways:
        - istio-system/main
      hosts:
        - grafana.{{ .Values.domain }}
      service: ""
      port: ""
      namespace: ""
    injection: disabled
    mtls:
      # Note that setting this to STRICT requires additional configuration for Prometheus and monitors.
      # Review `./docs/istio-mtls-metrics.md` for additional information.
      mode: STRICT

  sso:
    enabled: false

  bbtests:
    enabled: false
    cypress:
      artifacts: true
      envs:
        cypress_grafana_url: 'http://grafana:80'
      resources:
        requests:
          cpu: 2
          memory: 2Gi
        limits:
          cpu: 2
          memory: 2Gi
    istio:
      sidecar:
        resources:
          cpu:
            requests: 100m
            limits: 2000m
          memory:
            requests: 512Mi
            limits: 2048Mi
  ```

### `chart/templates/_helpers.tpl`

- Set `app.kubernetes.io/instance` to `monitoring-monitoring`.

  ```yaml
  app.kubernetes.io/instance: monitoring-monitoring
  ```

- Set `app.kubernetes.io/instance` to `monitoring-monitoring`.

  ```yaml
  app.kubernetes.io/instance: monitoring-monitoring
  ```

- Ensure this section is added to the bottom of the file:

  ```yaml
  {{/*
  Find hostname from uri
  */}}
  {{- define "grafana.hostnameFromUri" -}}
  {{- $match := . | toString | regexFind "//.*" -}}
  {{- $hostWithPort := regexSplit "/" ($match | trimAll "//") -1 -}}
  {{- $host := regexSplit ":" (first $hostWithPort) -1 -}}
  {{- printf "%s" (first $host) -}}
  {{- end -}}
  ```

### `hack/sync_grafana_dashboards.py`

- Change the value of `condition_map['prometheus_remote_write']` to be:

  ```python
    'prometheus-remote-write': ' .Values.prometheusRemoteWriteDashboards',
  ```

## automountServiceAccountToken

The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads).

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.

## Syncing Dashboards

We ship the grafana package separately due to <https://repo1.dso.mil/big-bang/product/packages/monitoring/-/issues/110> & <https://github.com/prometheus-community/helm-charts/issues/3548> as a solution never bubbled down that fixed the issue for our environments.

When the dashboards and script are updated upstream, we must pull in the new scripts from `hack/` in `kube-prometheus-stack`, modify them so that any new values are present in this chart, and revert any references to `.Values.grafana` back to just `.Values.` since this is the grafana chart.

Before running the Python script, ensure the relative locations are correct in hack/sync_grafana_dashboards.py file, eg:

  ```python
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

Push up any changes to the `dashboards/dashboards-1.14` folder. Deploy the chart in dev and ensure modified dashboards from upstream (coredns/node-exporter/etcd) are importing and showing data as before the changes/upgrades.
