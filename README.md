# Haemo — O₂/CO₂ gasuitwisseling & hemoglobine

Interactieve Next.js-site voor professionals: Bohr- en Haldane-effect, dissociatiecurve, CO₂-transport en gasuitwisseling in de longen.

**Publiek:** [https://haemo.clvs.nl](https://haemo.clvs.nl) · **Poort:** 3016

## Ontwikkeling

```bash
npm install
cp .env.example .env.local   # pas aan indien nodig
npm run dev                    # http://localhost:3016
```

## Infrastructuur (homelab)

| Host | Rol |
|------|-----|
| **192.168.1.14** | MariaDB `haemo_db` + Redis |
| **192.168.1.32** | Next.js productie (PM2 `haemo`, poort 3016) |

```env
DATABASE_URL=mysql://haemo_app:kerkpoort@192.168.1.14:3306/haemo_db
REDIS_URL=redis://192.168.1.14:6379
```

## Database aanmaken

```bash
python scripts/setup-db.py
npm run test:db
npm run test:redis
```

## Health checks

```bash
curl http://localhost:3016/api/health/db
curl http://localhost:3016/api/health/redis
```

## Deploy (.32)

```bash
DEPLOY_PASS=... node scripts/deploy-prod.mjs
```

Cloudflare Tunnel: `haemo.clvs.nl` → `http://192.168.1.32:3016`

## Pagina's

- `/` — Overzicht
- `/erytrocyt` — Hemoglobine & erytrocyt
- `/dissociatiecurve` — Interactieve Hill-curve
- `/bohr-effect` · `/haldane-effect`
- `/co2-transport` · `/longen`
- `/circulatie` — Scroll-verhaal
- `/appendix` — Formules & literatuur
