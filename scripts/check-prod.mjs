import { Client } from "ssh2";

const PASS = process.env.DEPLOY_PASS || "kerkpoort";

const c = new Client();
c.on("ready", () => {
  const cmd = [
    "pm2 logs haemo --lines 15 --nostream 2>&1",
    "pm2 jlist | node -e \"let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const j=JSON.parse(d);for(const p of j)if(p.name==='museum-app'||p.name==='haemo')console.log(p.name,p.pm2_env.status,p.pm2_env.env?.PORT||'-',p.pm2_env.cwd)})\"",
    "ss -tlnp | grep -E ':301[0-9]|:302[0-9]' | sort",
  ].join(" ; echo '---' ; ");
  c.exec(cmd, (_e, stream) => {
    stream.on("data", (d) => process.stdout.write(d.toString()));
    stream.on("close", () => c.end());
  });
}).connect({ host: "192.168.1.32", port: 22, username: "root", password: PASS });
