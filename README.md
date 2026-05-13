diff --git a/README.md b/README.md
index dcaf71693e4a4e96739438640406f4f66c7a2dd4..58fefd12a9e44f59a893a19eaf0095754bcd1585 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,61 @@
-index.html
+# AdminAI — Assistant administratif IA pour PME suisses
+
+## Structure complète
+- `frontend/` : React + Tailwind + Vite (UI SaaS B2B responsive)
+- `backend/` : Express API (upload PDF, IA, sécurité d’entrée)
+- `package.json` racine : orchestration monorepo
+
+## Installation
+```bash
+npm install
+npm install -w frontend
+npm install -w backend
+```
+
+## Variables d'environnement
+Créer `backend/.env` :
+```env
+PORT=4000
+OPENAI_API_KEY=sk-...
+OPENAI_MODEL=gpt-4.1-mini
+```
+Créer `frontend/.env` (optionnel) :
+```env
+VITE_API_URL=http://localhost:4000/api
+```
+
+## Démarrage local
+```bash
+npm run dev
+```
+
+## MVP fonctionnel inclus
+1. Landing page (positionnement Suisse)
+2. Auth simple (UI login/register)
+3. Dashboard
+4. Upload PDF
+5. Résumé IA du PDF
+6. Classification du document
+7. Extraction facture JSON
+8. Générateur d’emails IA
+9. Module tâches simple
+10. Base tableau factures (export Excel prêt à brancher)
+
+## Endpoints API
+- `GET /health`
+- `POST /api/documents/analyze` (PDF max 10MB)
+- `POST /api/emails/generate`
+
+## Sécurité & conformité (MVP)
+- Clé OpenAI uniquement backend
+- Validation payload email via Zod
+- Validation type fichier PDF + limite taille
+- Messages d’erreur structurés
+- Base prête pour RGPD/LPD suisse
+
+## Prochaines étapes SaaS
+- Supabase Auth + workspaces multi-entreprises
+- PostgreSQL + historique actions
+- Stockage sécurisé documents (S3/Supabase Storage)
+- Export Excel complet via SheetJS
+- Logs d’audit + rôles (admin/collaborateur)
