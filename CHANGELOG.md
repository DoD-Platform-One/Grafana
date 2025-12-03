# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [10.2.0-bb.1] (2025-12-03)
### Changed
- downgraded kiwigrid/k8s-sidecar from 1.30.11 to 1.30.9 per [this issue](https://github.com/kiwigrid/k8s-sidecar/issues/431)

## [10.2.0-bb.0] (2025-11-27)
### Changed
- bb-common updated from 0.9.1 to 0.10.0
- gluon updated from 0.9.5 to 0.9.6
- grafana updated from 10.1.2 to 10.2.0

## [10.1.2-bb.0] (2025-10-29)
### Changed
- grafana updated from 10.0.0 to 10.1.2
- gluon updated from 0.9.2 to 0.9.5
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins updated from 12.2.0 to 12.2.1
- registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar updated from 1.30.10 to 1.30.11
- registry1.dso.mil/ironbank/opensource/grafana/grafana-image-renderer updated from v4.0.15 to v4.1.2

## [10.0.0-bb.1] (2025-10-10)
### Changed
- integrate bb-common with grafana networkpolicies.

## [10.0.0-bb.0] (2025-10-01)
### Changed
- grafana updated from 9.3.1 to 10.0.0
- gluon updated from 0.7.0 to 0.9.2
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins updated from 12.1.0 to 12.2.0
- registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar updated from 1.30.7 to 1.30.10
- registry1.dso.mil/ironbank/opensource/grafana/grafana-image-renderer updated from v4.0.10 to v4.0.15
- Updated ImagePullPolicy to Always to ensure nightly IB image rebuilds are pulled
- Updated istio custom resources apiVersion to v1 instead of v1beta1

## [9.3.1-bb.2] (2025-08-21)
### Added
- Added additional templates to `templates/bigbang/upgrade/9.3.1-bb.1` to automatically handle deletion of the Grafana deployment due to immutable
  fields for the 9.3.1-bb.1 chart upgrade

### Changed
- Refactored chart to Big Bang passthrough chart pattern

## [9.3.1-bb.1] (2025-08-20)
### Changed
- Fixed issue with Prometheus / Remote-Write dashboard not populating in Grafana.

## [9.3.1-bb.0] (2025-08-04)
### Added
- Added `templates/bigbang/_helpers.tpl` to ensure backwards compatibility with the values in the `kube-prometheus-stack` dashboards.

### Changed
- Updated to latest [kube-prometheus stack dashboards](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack/templates/grafana/dashboards-1.14)
- Moved `.Values` related to kube-prometheus-stack dashboards under .Values.grafana for backwards compatibility, and moved them into their own section within `values.yaml` for transparency
- gluon updated from 0.6.3 to 0.7.0
- grafana updated from 9.2.10 to 9.3.1
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins updated from 12.0.2 to 12.1.0
- registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar updated from 1.30.6 to 1.30.7
- registry1.dso.mil/ironbank/opensource/grafana/grafana-image-renderer updated from 3.12.9 to v4.0.10

## [9.2.10-bb.0] (2025-07-08)
### Changed
- gluon updated from 0.6.2 to 0.6.3
- grafana updated from 9.2.7 to 9.2.10
- registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar updated from 1.30.3 to 1.30.6
- registry1.dso.mil/ironbank/opensource/grafana/grafana-image-renderer updated from 3.12.7 to 3.12.9

## [9.2.7-bb.1] (2025-07-07)
### Added
- Added ability to enable Grafana Enterprise and optional enterprise license secret template.

## [9.2.7-bb.0] (2025-06-21)
### Changed
- grafana updated from 9.2.2 to 9.2.7
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins updated from 12.0.1 to 12.0.2
- registry1.dso.mil/ironbank/opensource/grafana/grafana-image-renderer updated from 3.12.6 to 3.12.7

## [9.2.2-bb.1] (2025-06-18)
### Removed
- Removed (via comments) default resource limits in `values.yaml` on grafana and sidecar containers to improve dashboard loading performance.

## [9.2.2-bb.0] (2025-06-03)
### Changed
- gluon updated from 0.5.19 to 0.6.2
- grafana updated from 9.0.0 to 9.2.2
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins from 12.0.0 to 12.0.1
- registry1.dso.mil/ironbank/opensource/bats/bats updated from 1.11.1 to 1.12.0
- registry1.dso.mil/ironbank/opensource/grafana/grafana-image-renderer updated from 3.12.5 to 3.12.6
- registry1.dso.mil/ironbank/redhat/ubi/ubi9-minimal updated from 9.5 to 9.6

## [9.0.0-bb.0] (2025-05-13)
### Changed
- gluon updated from 0.5.16 to 0.5.19
- grafana updated from 8.14.0 to 9.0.0
- ironbank/big-bang/grafana/grafana-plugins updated from 11.6.1 to 12.0.0

## [8.14.0-bb.0] (2025-04-26)
### Changed
- gluon chart updated from 0.5.15 to 0.5.16
- grafana chart updated from 8.12.1 to 8.14.0
- ironbank/big-bang/grafana/grafana-plugins updated from 11.6.0 to 11.6.1
- ironbank/kiwigrid/k8s-sidecar updated from 1.30.2 to 1.30.3
- ironbank/opensource/bats/bats updated from v1.4.1 to 1.11.1
- grafana-image-renderer changed from public image (docker.io/grafana/grafana-image-renderer:latest) to Iron Bank (ironbank/opensource/grafana/grafana-image-renderer:3.12.5)

## [8.12.1-bb.0] (2025-04-18)
### Changed
- gluon updated from 0.5.14 to 0.5.15
- grafana chart updated from 8.11.0 to 8.12.1

## [8.11.0-bb.0] (2025-03-29)
### Changed
- grafana updated from 8.10.4 to 8.11.0

## [8.10.4-bb.1] (2025-03-26)
### Changed
- Added netpol for backstage integration

## [8.10.4-bb.0] (2025-03-20)
### Changed
- grafana chart updated from 8.10.1 to 8.10.4
- ironbank/kiwigrid/k8s-sidecar updated from 1.30.0 to 1.30.2

## [8.10.1-bb.0] - 2025-02-21
### Changed
- ironbank/big-bang/grafana/grafana-plugins updated from 11.5.1 to 11.5.2
- ironbank/kiwigrid/k8s-sidecar updated from 1.29.1 to 1.30.0

## [8.9.0-bb.0] - 2025-02-05
### Changed
- grafana chart updated from 8.8.5 to 8.9.0
- grafana updated from 11.4.0 to 11.5.1
- grafana-plugins updated from 11.4.0 to 11.5.1

## [8.8.5-bb.1] - 2025-02-03
### Changed
- Added support for istio Operatorless network policy values

## [8.8.5-bb.0] - 2025-01-28
### Changed
- grafana chart updated from 8.8.2 to 8.8.5
- gluon updated from 0.5.12 to 0.5.14
- ironbank/kiwigrid/k8s-sidecar updated from 1.29.0 to 1.29.1

## [8.8.2-bb.1] - 2025-01-11
### Changed
- ironbank/kiwigrid/k8s-sidecar updated from 1.28.4 to 1.29.0

## [8.8.2-bb.0] - 2024-12-24
### Changed
- ironbank/big-bang/grafana/grafana-plugins updated from 11.3.1 to 11.4.0
- ironbank/kiwigrid/k8s-sidecar updated from 1.28.0 to 1.28.4
- ironbank/opensource/bats/bats updated from v1.11.0 to 1.11.1

## [8.6.2-bb.0] - 2024-11-26
### Changed
- gluon updated from 0.5.10 to 0.5.12
- ironbank/big-bang/grafana/grafana-plugins updated from 11.3.0 to 11.3.1

## [8.6.0-bb.0] - 2024-11-16
### Changed
- gluon updated from 0.5.8 to 0.5.10
- ironbank/big-bang/grafana/grafana-plugins updated from 11.2.2 to 11.3.0
- ironbank/redhat/ubi/ubi9-minimal updated from 9.4 to 9.5
- Added the maintenance track annotation and badge

## [8.5.5-bb.0] - 2024-10-15
### Changed
- gluon updated from 0.5.4 to 0.5.8
- ironbank/big-bang/grafana/grafana-plugins updated from 11.2.1 to 11.2.2

## [8.5.2-bb.1] - 2024-10-11

### Added
- Added authoriztaion policy for kiali

## [8.5.2-bb.0] - 2024-10-01

### Changed
- ironbank/big-bang/grafana/grafana-plugins updated from 11.2.0 to 11.2.1
- ironbank/kiwigrid/k8s-sidecar updated from 1.27.6 to 1.28.0

## [8.5.1-bb.0] - 2024-09-06

### Changed

- gluon updated from 0.5.3 to 0.5.4
- ironbank/big-bang/grafana/grafana-plugins updated from 11.1.4 to 11.2.0
- ironbank/kiwigrid/k8s-sidecar updated from 1.27.5 to 1.27.6

## [8.4.6-bb.1] - 2024-08-26

### Updated

- Removed previous kiali label epic changes and updated to new pattern

## [8.4.6-bb.0] - 2024-08-20

### Changed

- ironbank/big-bang/grafana/grafana-plugins updated from 11.1.3 to 11.1.4

## [8.4.4-bb.0] - 2024-08-09

### Changed

- gluon updated from 0.5.2 to 0.5.3
- ironbank/big-bang/grafana/grafana-plugins updated from 11.1.0 to 11.1.3

## [8.3.6-bb.1] - 2024-08-01

### Changed

- Remove redundant items from `test/test-values.yaml`

## [8.3.6-bb.0] - 2024-07-25

### Changed

- gluon updated from 0.5.0 to 0.5.2

## [8.3.4-bb.2] - 2024-07-24

### Changed

- Updated `templates/deployment.yaml` and `templates/statefulset.yaml` to use `tpl` for `.Values.podLabels` to allow setting Kiali required `app` and `version` labels
- Set `app` and `version` label defaults via `.Values.podLabels`

## [8.3.4-bb.1] - 2024-07-24

### Changed

- Added update helm dep step to DEVELOPMENT_MAINTENANCE
- Updated gluon helm dependency from 0.4.10 to 0.5.0

## [8.3.4-bb.0] - 2024-07-15

### Changed

- ironbank/kiwigrid/k8s-sidecar updated from 1.27.4 to 1.27.5

## [8.2.2-bb.1] - 2024-07-02

### Removed

- Removed shared authPolicies set at the Istio level

## [8.2.2-bb.0] - 2024-07-02

### Changed

- Updated `ironbank/big-bang/grafana/grafana-plugins` 11.0.0 -> 11.1.0
- Updated `ironbank/kiwigrid/k8s-sidecar` 1.27.2 -> 1.27.4
- Updated `registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins` 11.0.0 -> 11.1.0
- Updated `registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar` 1.27.2 -> 1.27.4
- Fix readme version log to use chart version instead of app version

## [8.0.0-bb.1] - 2024-07-02

### Changed

- Synchronized with upstream helm chart version 8.0.0

## [8.0.0-bb.0] - 2024-06-04

### Changed

- gluon updated from 0.4.10 to 0.5.0
- ironbank/big-bang/grafana/grafana-plugins updated from 10.4.2 to 11.0.0
- ironbank/kiwigrid/k8s-sidecar updated from 1.26.1 to 1.27.2
- ironbank/redhat/ubi/ubi9-minimal updated from 9.3 to 9.4

## [7.3.9-bb.2] - 2024-05-09

### Changed

- Use ironbank `bats` image

## [7.3.9-bb.1] - 2024-05-08

### Changed

- Disable anonymous reporting to Grafana Labs

## [7.3.9-bb.0] - 2024-04-29

### Updated

- Updated Grafana chart to 7.3.9
- Updated image versions to latest in IB (grafana: 10.4.2)
- Custom network policies

## [7.3.7-bb.3] - 2024-04-17

### Changed

- Adding an authorization policy to allow kiali traffic through when istio hardening is enabled

## [7.3.7-bb.2] - 2024-04-11

### Changed

- Removing unneeded openshift network-attachment-definition in monitoring namespace as monitoring already creates one

## [7.3.7-bb.1] - 2024-03-29

### Changed

- Updating dashboards and sync script from upstream kube-prometheus-stack chart

## [7.3.7-bb.0] - 2024-03-19

### Changed

- Updated chart base to 7.3.1 -> 7.3.7
- Updated grafana-plugins 10.3.3 -> 10.4.0
- Updated k8s-sidecar 1.25.4 -> 1.26.1

## [7.3.1-bb.5] - 2024-03-06

### Modified

- Modify Sidecar to include a workloadSelector, modified values.yaml to set default for `sso.enabled` to `false`

## [7.3.1-bb.4] - 2024-03-05

### Changed

- Added Openshift update for deploying grafana into Openshift cluster

## [7.3.1-bb.3] - 2024-02-29

### Changed

- renamed policies for clarity

## [7.3.1-bb.2] - 2024-02-28

### Added

- Added auth policy template
- renamed allow-nothing policy

## [7.3.1-bb.1] - 2024-02-26

### Added

- Add egress whitelist

## [7.3.1-bb.0] - 2024-02-21

### Added

- Updated chart base to 7.3.0 -> 7.3.1
- Updated grafana-plugins 10.3.1 -> 10.3.3
- Updated k8s-sidecar 1.25.3 -> 1.25.4

## [7.3.0-bb.1] - 2024-02-15

### Changed

- Updated the allow-all-in-namespace istio auth policy

## [7.3.0-bb.0] - 2024-02-09

### Added

- Updated chart base to 7.2.1 -> 7.3.0
- Updated grafana-plugins 10.2.3 -> 10.3.1

## [7.2.1-bb.5] - 2024-02-02

### Added

- Update Gluon to 0.4.8

## [7.2.1-bb.4] - 2024-01-29

### Added

- Added support for Istio Authorization Policies

## [7.2.1-bb.3] - 2024-01-23

### Added

- Updated cypress health test to use coreDNS for testing

## [7.2.1-bb.2] - 2024-01-22

### Added

- Stopped exposing `/metrics` via virtual services

## [7.2.1-bb.1] - 2024-01-19

### Added

- Updated cypress health test

## [7.2.1-bb.0] - 2024-01-18

### Added

- Updated grafana to 10.1.5 -> 10.2.3
- Updated grafana-plugins 10.1.5 -> 10.2.3
- Updated chart base to 6.60.6 -> 7.2.1
- Updated base 2.0.0 -> 2.1.0
- Updated k8s-sidecar 1.25.2 -> 1.25.3
- Updated bats 1.9.0 -> v1.10.0
- Updated cypress health test as General folder was removed

## [6.60.6-bb.5] - 2023-12-14

### Added

- Upgrade ubi8-minimal:8.8 to ubi9-minimal:9.3

## [6.60.6-bb.4] - 2023-12-07

### Added

- Adding OSCAL Component File.

## [6.60.6-bb.3] - 2023-11-13

### Added

- `docs/DEVELOPMENT_MAINTENANCE.md` with upstream helm deviations

### Changed

- Added values back to `grafana.ini`

## [6.60.6-bb.2] - 2023-11-02

### Changed

- Moved redis-dashboards.yaml over to Redis package

## [6.60.6-bb.1] - 2023-11-01

### Added

- Added NetworkPolicy for egress to thanos query

## [6.60.6-bb.0] - 2023-10-30

### Changed

- Updated grafana to 10.1.5
- Updated chart base to 6.60.6

## [6.58.9-bb.4] - 2023-09-26

### Changed

- Updated Cypress test
- Updated Gluon 0.4.1

## [6.58.9-bb.2] - 2023-08-30

### Changed

- Updated Cypress test so that it verifies data is getting pulled in and is visible
- Updated URL in test-values.yaml

## [6.58.9-bb.2] - 2023-08-30

### Changed

- Added default data source to test-values.yaml to enable testing at package level

## [6.58.9-bb.1] - 2023-08-25

### Changed

- Updated `chart\tests\cypress\grafana-healthspec.js` to re-enable cypress keycloak SSO test on Big Bang

## [6.58.9-bb.0] - 2023-08-22

### Changed

- Update grafana 6.57.4 -> 6.58.9
- Update registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins 9.5.3 -> 10.0.3
- Update registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar 1.24.4 -> 1.25.0

## [6.57.4-bb.1] - 2023-08-02

### Changed

- grafana.ini settings syntax updates

## [6.57.4-bb.0] - 2023-07-03

### Added

- Initial commit of chart based on grafana helm-chart version 6.57.4
