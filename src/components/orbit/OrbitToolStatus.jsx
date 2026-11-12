import {Check, Loader2, AlertCircle} from 'lucide-react';
export default function OrbitToolStatus({tool}) {
  const active=['pending','running','in_progress'].includes(tool.status);
  const failed=['error','failed'].includes(tool.status) || /error|failed/i.test(JSON.stringify(tool.results || '')) || tool.results?.success===false;
  const projection=tool.display_projection;
  const label=projection?.hide_details && projection?.details_redacted ? (active?projection.active_label:failed?projection.error_label:projection.label) : active?'Keresek a katalógusban…':failed?'A lekérdezés nem sikerült':'Katalógus ellenőrizve';
  const Icon=active?Loader2:failed?AlertCircle:Check;
  return <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Icon className={`h-3 w-3 ${active?'animate-spin':''}`}/>{label}</div>;
}