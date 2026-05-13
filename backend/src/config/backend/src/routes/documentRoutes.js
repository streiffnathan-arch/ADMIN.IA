 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/backend/src/routes/documentRoutes.js b/backend/src/routes/documentRoutes.js
new file mode 100644
index 0000000000000000000000000000000000000000..31999c903eebc81f75f9d6c831c0b00da0da3548
--- /dev/null
+++ b/backend/src/routes/documentRoutes.js
@@ -0,0 +1,25 @@
+import express from 'express';
+import fs from 'fs/promises';
+import pdfParse from 'pdf-parse';
+import { summarizeDocument, classifyDocument, extractInvoiceData } from '../services/aiService.js';
+import { uploadPdf } from '../middleware/upload.js';
+
+const router = express.Router();
+
+router.post('/analyze', uploadPdf.single('file'), async (req, res) => {
+  try {
+    if (!req.file) return res.status(400).json({ error: 'Fichier PDF requis' });
+    const buffer = await fs.readFile(req.file.path);
+    const { text } = await pdfParse(buffer);
+    const [summary, classification, invoice] = await Promise.all([
+      summarizeDocument(text),
+      classifyDocument(text),
+      extractInvoiceData(text)
+    ]);
+    res.json({ summary, classification, invoice });
+  } catch (e) {
+    res.status(400).json({ error: 'Analyse impossible', detail: e.message });
+  }
+});
+
+export default router;
 
EOF
)
