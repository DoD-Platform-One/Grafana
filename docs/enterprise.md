# Grafana Enterprise

Big Bang has added the ability to enable [Grafana Enterprise](https://grafana.com/products/enterprise/) using user-provided license. Grafana Enterprise is required if you want to connect Grafana to
additional Enterprise services such as Grafana Enterprise Logs (GEL) or Grafana Enterprise Metrics (GEM).

This page describes how to pass a license to Grafana and activate Grafana Enterprise and assumes the user already has a license.

## Prerequisites

Before enabling Grafana Enterprise, ensure you have:

- A valid Grafana Enterprise license (JWT token format)
- Access to your Big Bang configuration values
- Appropriate permissions to modify Kubernetes secrets

## Enabling Grafana Enterprise

To enable Grafana Enterprise pass the following values to Grafana with your Big Bang installation.

```yaml
grafana:
  enabled: true
  enterprise:
    enabled: true
    createSecret: true
    license: |
    <INSERT JWT LICENSE HERE>
```

This configuration will handle the following automatically:
  1. Change the Grafana deployment to use the Grafana Enterprise image from Iron Bank.
  2. Create a secret with the content passed to the license key.
  3. Mount the secret to the Grafana deployment, making it available to the software
  4. Configure the `grafana.ini` file to utilize the license

### Self-Managed Secret

Alternatively if you do not want Big Bang to handle the secret creation for you, you can disable that feature.

This approach is recommended when you need to manage secrets through external tools like Vault or when following strict security policies.

```yaml
grafana:
  enabled: true
  enterprise:
    enabled: true
    createSecret: false
    license_path: /etc/grafana/license/license.jwt
  extraSecretMounts:
    # <Add additional secret mounts here>
    - name: enterprise-license
      mountPath: /etc/grafana/license
      secretName: grafana-enterprise-license
      readOnly: true
```

This configuration will handle the following automatically:
  1. Change the Grafana deployment to use the Grafana Enterprise image from Iron Bank.
  2. Configure the Grafana deployment to mount secret named `grafana-enterprise-license` to the `/etc/grafana/license` directory.
  3. Configure the `grafana.ini` to use license file located at `/etc/grafana/license/license.jwt`
      - NOTE: this file will need to be handled and mounted by the user when `grafana.enterprise.createSecret=false` and assumes the license key will be called `license.jwt`

## Validation

To confirm whether or not the enterprise configuration is successful:

1. Confirm Grafana pods are healthy
2. Open your Grafana frontend UI via web browser with an administrator account
3. Go to `Administration` -> `General` -> `Statistics and licensing`
4. Confirm the "License details" box contains your license information and is accurate.