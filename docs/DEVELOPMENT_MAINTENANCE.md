# How to upgrade the Grafana Package chart

Grafana is a modified/customized version of an upstream chart. The below details the steps required to update to a new version of the Grafana package.

---
1. Navigate to the [upstream chart repo and folder](https://github.com/grafana/helm-charts/tree/main/charts/grafana) and find the tag (e.g., `grafana-x.x.x`) that corresponds with the new chart version for this update.

1. From the root of the repo run `kpt pkg update chart@<tag> --strategy alpha-git-patch` replacing `<tag>` with the tag you got in step 1. You may be prompted to resolve some conflicts - choose what makes sense (if there are BB additions/changes keep them, if there are upstream additions/changes keep them).

1. Modify the `version` in `Chart.yaml` - you will want to append `-bb.0` to the chart version from upstream.

1. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Grafana chart to x.x.x` and `Updated image versions to latest in IB (grafana: x.x.x, etc)`.

1. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

1. Push up your changes, validate that CI passes. If there are any failures follow the information in the pipeline to make the necessary updates and reach out to the team if needed.

1.  Perform the steps below for manual testing. CI provides a good set of basic smoke tests but it is beneficial to run some additional checks.

# Testing a new Grafana version

1. TBD, per Codeowners

# Modifications made to upstream chart
The following section is added to the `grafana.ini` section of `values.yaml`
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
