## Overview

This package contains an extensible and configurable abstract installation of Grafana based on the [upstream chart](https://github.com/grafana/helm-charts/tree/main/charts/grafana) provided by grafana.

Grafana is an open-source analytics and interactive visualization web application. It provides a powerful platform for monitoring and observability, allowing users to query, visualize, alert on, and explore metrics, logs, and traces from various data sources.

## Grafana Features

- **Multi-Source Data Integration**: Connects to numerous data sources including Prometheus, Loki, Elasticsearch, InfluxDB, and many others
- **Customizable Dashboards:** Create rich, interactive dashboards with a variety of visualization options (graphs, charts, tables, heatmaps)
- **Alerting:** Set up alert rules with customizable notification channels
- **Plugin Ecosystem:** Extend functionality with community and commercial plugins
- **User Management:** Role-based access control and team management
- **Query Editor:** Powerful query builders for different data sources

## Big Bang Customizations

### Automatic Data Source Configuration

Big Bang automatically configures Grafana data sources based on which packages are enabled in the deployment. The following integrations are created dynamically:

- **Prometheus** (`monitoring.enabled: true`): Primary metrics source using the `monitoring-monitoring-kube-prometheus` service
- **Thanos** (`addons.thanos.enabled: true`): Replaces Prometheus as the primary metrics source when enabled, providing long-term storage and query federation
- **Loki** (`loki.enabled: true`): Log aggregation configured for either monolith or distributed architecture
- **Tempo** (`tempo.enabled: true`): Distributed tracing with automatic trace-to-logs correlation when Loki is also enabled
- **Mimir** (`addons.mimir.enabled: true`): Long-term metrics storage alternative to Thanos

### Tempo Integration

When Tempo is enabled, Big Bang automatically enables Grafana feature toggles for enhanced tracing capabilities:
- `traceqlEditor`: Advanced trace query language editor
- `tempoSearch`: Improved trace search functionality
- `tempoServiceGraph`: Visual service dependency mapping

### Enterprise Support

Big Bang supports Grafana Enterprise deployments with automatic license secret creation and mounting
- Reference [Grafana Enterprise Documentation](https://repo1.dso.mil/big-bang/product/packages/grafana/-/blob/main/docs/enterprise.md) for more details.

### Additional Integrations

- **Pre-configured Dashboards**: Ships with dashboards from kube-prometheus-stack and other sources for Kubernetes monitoring
- **Single Sign-On**: Integrated with Keycloak for centralized authentication using OpenID Connect with configurable role mapping
- **Service Mesh Integration**: Istio integration with mTLS support for secure service-to-service communication and metrics collection
- **ServiceMonitor**: Automatic Prometheus ServiceMonitor creation with Istio certificate-based authentication when injection is enabled
- **Network Policies**: Pre-configured egress rules for control plane access, Tempo, Thanos, and ingress from Istio gateway, Kiali, and Backstage