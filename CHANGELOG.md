# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [7.2.1-bb.2] - 2023-01-22
### Added
- Stopped exposing `/metrics` via virtual services

## [7.2.1-bb.1] - 2023-01-19
### Added
- Updated cypress health test

## [7.2.1-bb.0] - 2023-01-18
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
