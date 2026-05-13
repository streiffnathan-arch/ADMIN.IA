 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/backend/src/services/aiService.js b/backend/src/services/aiService.js
new file mode 100644
index 0000000000000000000000000000000000000000..262d2b52a5200d46141cad6943a3d4d393887130
--- /dev/null
+++ b/backend/src/services/aiService.js
@@ -0,0 +1,23 @@
+import OpenAI from 'openai';
+import { env } from '../config/env.js';
+import { PROMPTS } from '../utils/prompts.js';
+
+const client = env.openaiApiKey ? new OpenAI({ apiKey: env.openaiApiKey }) : null;
+
+async function askJSON(system, user, fallback) {
+  if (!client) return fallback;
+  const r = await client.chat.completions.create({
+    model: env.openaiModel,
+    temperature: 0.2,
+    response_format: { type: 'json_object' },
+    messages: [{ role: 'system', content: system }, { role: 'user', content: user }]
+  });
+  return JSON.parse(r.choices[0].message.content || '{}');
+}
+
+export const summarizeDocument = (text) => askJSON(PROMPTS.summarize, text, { summary: 'Résumé indisponible (mode mock).' });
+export const classifyDocument = (text) => askJSON(PROMPTS.classify, text, { document_type: 'autre', title: 'Document importé', summary: 'Classification mockée', important_dates: [], parties: [], suggested_tags: ['mvp'], suggested_tasks: [], confidence_score: 0.5 });
+export const extractInvoiceData = (text) => askJSON(PROMPTS.invoice, text, { supplier_name: '', invoice_number: '', invoice_date: '', due_date: '', currency: 'CHF', net_amount: '', vat_amount: '', gross_amount: '', iban: '', description: '', confidence_score: 0.3 });
+export const generateEmail = (context, tone, type) => askJSON(PROMPTS.email, `Type:${type}\nTon:${tone}\nContexte:${context}`, { subject: 'Objet', body: 'Email mocké.' });
+export const cleanExcelData = async (data, instruction) => ({ instruction, rows: data?.length || 0, status: 'ok' });
+export const generateTasksFromDocument = async (text) => ({ tasks: text ? ['Relire et valider le document'] : [] });
 
EOF
)
