# Development and Maintenance Guide for the Grafana Package

Grafana is a modified/customized version of an upstream chart. The below details the steps required to update to a new version of the Grafana package.

## How to upgrade the Grafana Package chart

**IMPORTANT**: This renovate process includes an extra step to run a script which pulls the latest kube-prometheus-stack dashboards, follow the instructions carefully.

1. Navigate to the [upstream chart repo and folder](https://github.com/grafana/helm-charts/tree/main/charts/grafana) and find the tag (e.g., `grafana-x.x.x`) that corresponds with the new chart version for this update.

2. `git clone` the [grafana repository](https://repo1.dso.mil/big-bang/product/packages/grafana) from Repo1 and checkout the `renovate/ironbank` branch.

3. Modify the `version` in `Chart.yaml`. You will want to append `-bb.0` to the chart version from upstream.

4. Ensure the Big Bang ./chart/Chart.yaml and the target upstream version Chart.yaml align correctly with the following:

    - Check `appVersion` and `bigbang.dev/applicationVersions` in ./chart/Chart.yaml to make sure they match and have updated to the correct version
    - Check the upstream chart dependencies and compare the dependency versions against the corresponding image tags in `./chart/values.yaml` to make sure they match

  **NOTE:** The Renovate issue may be blocked by one of the following conditions:
    - The upstream chart expects a newer image tag that does not yet exist in Iron Bank
      - If so, ensure that an issue exists in the associated Iron Bank container repository to track the upgrade version. Link the Iron Bank issue to the package Renovate issue for tracking purposes.
    - There is a newer image tag in Iron Bank, but is not yet supported or tested by upstream
    - If the newer image is a [major version](https://semver.org/) bump and/or contains breaking changes, the Renovate issue can be moved to `status::blocked` until the upstream chart catches up. If the newer image is only [a *patch* or *minor* version](https://semver.org/) bump, you can proceed with the Renovate (upgrading the image beyond the version referenced in the upstream chart).

5. Update `upstream.image.tag` in `./chart/values.yaml` to match the updated version in Iron Bank.

6. Update the `helm.sh/images` annotations in `./chart/Chart.yaml` to match updated versions in Iron Bank.

7. Update dependencies and binaries using helm dependency update `./chart.`

8. Check for changes to the [dashboards provided](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack/templates/grafana/dashboards-1.14) with `kube-prometheus-stack`. Also check for changes to the following [python script from upstream](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/hack/sync_grafana_dashboards.py). If there are changes read the section below for [Syncing Dashboards](#syncing-dashboards)

9. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Grafana chart to x.x.x` and `Updated image versions to latest in IB (grafana: x.x.x, etc)`.

10. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

11. Push up your changes, add upgrade notices if applicable, validate that CI passes.
    - If there are any failures, follow the information in the pipeline to make the necessary updates.
    - Add the `debug` label to the MR for more detailed information.
    - Reach out to the CODEOWNERS if needed.

12. (_Optional, only required if package changes are expected to have cascading effects on bigbang umbrella chart_) As part of your MR that modifies bigbang packages, you should modify the bigbang  [bigbang/tests/test-values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/tests/test-values.yaml?ref_type=heads) against your branch for the CI/CD MR testing by enabling your packages.

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

13. Perform the steps below for manual testing. Our CI provides a good set of basic smoke tests (use the `debug` label), but it is beneficial to run some additional checks.

14. Once all manual testing is complete, take your MR out of "Draft" status, assign reviewers, and add the review label.

## Syncing Dashboards

Context: We ship the grafana package separately due to <https://repo1.dso.mil/big-bang/product/packages/monitoring/-/issues/110> & <https://github.com/prometheus-community/helm-charts/issues/3548> as a solution never bubbled down that fixed the issue for our environments.

1. Check for changes to the [kube-prometheus-stack dashboards](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack/templates/grafana/dashboards-1.14)
    - If the dashboards have been updated since the last renovate - continue with the steps below.
2. Check for changes to the [sync_grafana_dashboards.py](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/hack/sync_grafana_dashboards.py) script.
    - If the `sync_grafana_dashboards.py` script has been updated, pull in the latest copy into your branch. A simple copy/paste will suffice.
3. Before running the Python script, ensure the relative locations are correct in `hack/sync_grafana_dashboards.py` file, eg:

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
4. Run the `hack/sync_grafana_dashboards.py` script.
    - For first time users, you may need to setup a virtual python environment, and install the required pip packages through `pip3 install -r requirements.txt`
5. Push up any changes to the `dashboards/dashboards-1.14` folder. Deploy the chart in dev and ensure modified dashboards from upstream are importing and showing data as before the changes/upgrades.
    - If any dashboards are missing, they may be silently failing to render. You may need to review the dashboard helm logic and confirm the values are set appropriately.

## Testing new Grafana Version

Refer to [docs/dev-overrides.yaml](https://repo1.dso.mil/big-bang/product/packages/grafana/-/blob/main/docs/dev-overrides.yaml) for YAML values to deploy against Big Bang.

- Login to [Grafana](https://grafana.dev.bigbang.mil)
- Navigate to `Dashboards` and then click on `Kubernetes / Compute Resources / Cluster` and validate that data is loaded

## Big Bang Modifications

Modifications made to upstream chart

### `chart/values.yaml`

- All values under the `.upstream` key override the default values within the upstream chart
- All values not under the `.upstream` key (or another reference another dependency chart) are additions made by Big Bang.

### `hack/sync_grafana_dashboards.py`

- Change the value of `condition_map['prometheus_remote_write']` to be:

  ```python
    'prometheus-remote-write': ' .Values.prometheusRemoteWriteDashboards',
  ```

## automountServiceAccountToken

The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads).

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.