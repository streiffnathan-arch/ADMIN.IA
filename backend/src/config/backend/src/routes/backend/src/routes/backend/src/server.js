 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/backend/src/server.js b/backend/src/server.js
new file mode 100644
index 0000000000000000000000000000000000000000..323ecaeae2747656dd89a1af050d34be04a36aa7
--- /dev/null
+++ b/backend/src/server.js
@@ -0,0 +1,17 @@
+import express from 'express';
+import cors from 'cors';
+import { env } from './config/env.js';
+import documentRoutes from './routes/documentRoutes.js';
+import emailRoutes from './routes/emailRoutes.js';
+
+const app = express();
+app.use(cors());
+app.use(express.json({ limit: '1mb' }));
+
+app.get('/health', (_, res) => res.json({ status: 'ok' }));
+app.use('/api/documents', documentRoutes);
+app.use('/api/emails', emailRoutes);
+
+app.use((err, _req, res, _next) => res.status(500).json({ error: 'Erreur serveur', detail: err.message }));
+
+app.listen(env.port, () => console.log(`AdminAI API running on ${env.port}`));
 
EOF
)
