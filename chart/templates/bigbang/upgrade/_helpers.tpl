{{/*
This helper determines if upgrading to 9.3.1-bb.1 which updates immutable fields requiring deployment resources to be manually recreated
*/}}
{{- define "grafana.shouldDeployUpgradeResources" -}}
{{- $upgradeVersion := "9.3.1-bb.2" -}}

{{- if and .Values.autoRollingUpgrade.enabled .Release.IsUpgrade -}}
  {{- $helmRelease := lookup "helm.toolkit.fluxcd.io/v2" "HelmRelease" "bigbang" "grafana" -}}
  {{- if and $helmRelease (hasKey $helmRelease "status") (hasKey $helmRelease.status "history") -}}
    {{- $history := $helmRelease.status.history -}}
    {{- if and $history (gt (len $history) 0) -}}
      {{- $currentVersion := index $history 0 "chartVersion" -}}
      {{- if semverCompare (print "<" $upgradeVersion) $currentVersion -}}
        true
      {{- end -}}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{- end -}}