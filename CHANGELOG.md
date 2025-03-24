# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

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
