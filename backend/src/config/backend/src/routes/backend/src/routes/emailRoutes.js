 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/backend/src/routes/emailRoutes.js b/backend/src/routes/emailRoutes.js
new file mode 100644
index 0000000000000000000000000000000000000000..eba945f75ed795589a7061a328d8069dc96c7703
--- /dev/null
+++ b/backend/src/routes/emailRoutes.js
@@ -0,0 +1,14 @@
+import express from 'express';
+import { z } from 'zod';
+import { generateEmail } from '../services/aiService.js';
+
+const router = express.Router();
+const schema = z.object({ type: z.string().min(2), tone: z.string().min(2), context: z.string().min(10) });
+
+router.post('/generate', async (req, res) => {
+  const parsed = schema.safeParse(req.body);
+  if (!parsed.success) return res.status(400).json({ error: 'Payload invalide', detail: parsed.error.flatten() });
+  res.json(await generateEmail(parsed.data.context, parsed.data.tone, parsed.data.type));
+});
+
+export default router;
 
EOF
)
