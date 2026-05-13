 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/backend/src/config/env.js b/backend/src/config/env.js
new file mode 100644
index 0000000000000000000000000000000000000000..78e5d4d7dd533ff9b555f85a0b91507e6fbd001c
--- /dev/null
+++ b/backend/src/config/env.js
@@ -0,0 +1,8 @@
+import dotenv from 'dotenv';
+dotenv.config();
+
+export const env = {
+  port: Number(process.env.PORT || 4000),
+  openaiApiKey: process.env.OPENAI_API_KEY || '',
+  openaiModel: process.env.OPENAI_MODEL || 'gpt-4.1-mini'
+};
 
EOF
)
