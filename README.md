# Many Nas Ruas
1. `cp .env.example .env.local` e preencha (APP_SECRET: `openssl rand -hex 32`).
2. `npm install && npm run dev` → http://localhost:3000/admin
3. No app Meta: webhook `APP_URL/api/webhook` (campos `comments`, `messages`, `messaging_postbacks`, `messaging_seen`) e redirect OAuth `APP_URL/api/oauth/callback`.
4. Conecte o Instagram, teste no Simulador e só então libere o cadeado.
Fluxo: comentário → resposta privada com botão → clique (postback) → DM com o link do material.

## CI e fila
- `.github/workflows/ci.yml` roda testes (vitest), typecheck (`tsc -p tsconfig.check.json`) e `next build` a cada push e pull request. Localmente: `npm run ci`. O CI só verifica; não publica.
- A fila roda a cada `QUEUE_INTERVAL_SECONDS` (mín. 10, padrão 60) em lotes de `QUEUE_BATCH` (1–20, padrão 5), além do processamento imediato no webhook. Falhas esperam 30s × tentativa antes de repetir.
- Hospedagem que dorme ou limita processos em segundo plano: `QUEUE_MODE=external` e agende uma chamada a `/api/cron` com `Authorization: Bearer $CRON_SECRET`.
- Ícones: `python3 scripts/gerar-icones.py` refaz tudo a partir de `design/emblema-original.png`.
