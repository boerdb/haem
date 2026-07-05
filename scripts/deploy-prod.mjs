/**
 * Productie-deploy Haemo naar Next.js server (.32).
 * Gebruik: DEPLOY_PASS=kerkpoort node scripts/deploy-prod.mjs
 */
import { Client } from "ssh2";
import { resolve } from "path";

const HOST = process.env.DEPLOY_HOST || "192.168.1.32";
const USER = process.env.DEPLOY_USER || "root";
const PASS = process.env.DEPLOY_PASS;
const APP_DIR = "/var/www/haemo";
const REPO = process.env.DEPLOY_REPO || "https://github.com/boerdb/haem.git";
const PORT = process.env.APP_PORT || "3016";
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "mysql://haemo_app:kerkpoort@192.168.1.14:3306/haemo_db";
const REDIS_URL = process.env.REDIS_URL || "redis://192.168.1.14:6379";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://haemo.clvs.nl";

if (!PASS) {
  console.error("Zet DEPLOY_PASS (SSH-wachtwoord)");
  process.exit(1);
}

function exec(conn, cmd, label) {
  return new Promise((resolvePromise, reject) => {
    console.log(`\n▶ ${label || cmd.slice(0, 80)}`);
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let out = "";
      stream
        .on("close", (code) => {
          if (code !== 0) reject(new Error(`Exit ${code}: ${out.slice(-500)}`));
          else resolvePromise(out);
        })
        .on("data", (d) => {
          out += d.toString();
          process.stdout.write(d.toString());
        })
        .stderr.on("data", (d) => process.stderr.write(d.toString()));
    });
  });
}

async function main() {
  const conn = new Client();
  await new Promise((resolvePromise, reject) => {
    conn
      .on("ready", resolvePromise)
      .on("error", reject)
      .connect({ host: HOST, port: 22, username: USER, password: PASS });
  });

  try {
    await exec(conn, "node -v && pm2 -v", "Check node/pm2");

    const hasDir = await exec(
      conn,
      `test -d ${APP_DIR}/.git && echo yes || echo no`,
      "Check git repo",
    );

    if (hasDir.includes("yes")) {
      await exec(conn, `cd ${APP_DIR} && git pull origin main`, "Git pull");
    } else {
      await exec(
        conn,
        `mkdir -p /var/www && (test -d ${APP_DIR} || git clone ${REPO} ${APP_DIR}) && cd ${APP_DIR} && git pull origin main`,
        "Git clone + pull",
      );
    }

    const envContent = `NODE_ENV=production
PORT=${PORT}
DATABASE_URL=${DATABASE_URL}
REDIS_URL=${REDIS_URL}
NEXT_PUBLIC_APP_URL=${APP_URL}
`;
    const envB64 = Buffer.from(envContent).toString("base64");
    await exec(
      conn,
      `echo '${envB64}' | base64 -d > ${APP_DIR}/.env.local && chmod 600 ${APP_DIR}/.env.local`,
      "Write .env.local",
    );

    await exec(conn, `cd ${APP_DIR} && npm ci && npm run build`, "npm ci + build");

    await exec(
      conn,
      `cd ${APP_DIR} && pm2 delete haemo 2>/dev/null; PORT=${PORT} pm2 start node_modules/next/dist/bin/next --name haemo -- start -p ${PORT} && pm2 save`,
      "PM2 start",
    );

    console.log(`\n✅ Deploy klaar — http://${HOST}:${PORT}`);
    console.log(`   Publiek: ${APP_URL}`);
  } finally {
    conn.end();
  }
}

main().catch((err) => {
  console.error("\n❌ Deploy mislukt:", err.message);
  process.exit(1);
});
