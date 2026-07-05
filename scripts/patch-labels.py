#!/usr/bin/env python3
"""Patch preset-labels in haemo_db op .14 (UTF-8)."""
from pathlib import Path
import paramiko

SCRIPT_DIR = Path(__file__).resolve().parent
PASS = "kerkpoort"

SQL = """\
USE haemo_db;
UPDATE parameter_presets SET label_nl = 'Normaal – longcapilair' WHERE slug = 'normaal-long';
UPDATE parameter_presets SET label_nl = 'Normaal – weefselcapilair' WHERE slug = 'normaal-weefsel';
UPDATE parameter_presets SET label_nl = 'COPD – chronische hypercapnie' WHERE slug = 'copd';
SELECT slug, label_nl FROM parameter_presets ORDER BY sort_order;
"""


def load_secrets():
    path = SCRIPT_DIR / ".secrets.local"
    if path.exists():
        s = {}
        for line in path.read_text(encoding="utf-8").splitlines():
            if "=" in line and not line.strip().startswith("#"):
                k, v = line.split("=", 1)
                s[k.strip()] = v.strip()
        return s
    return {"DB_HOST": "192.168.1.14", "SSH_USER": "root", "SSH_PASS": PASS, "MYSQL_ROOT_PASS": PASS}


def main():
    s = load_secrets()
    host = s.get("DB_HOST", "192.168.1.14")
    root_pw = s.get("MYSQL_ROOT_PASS", PASS)

    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(host, username=s.get("SSH_USER", "root"), password=s.get("SSH_PASS", PASS), timeout=20)

    remote = "/tmp/haemo_patch_labels.sql"
    sftp = c.open_sftp()
    with sftp.file(remote, "w") as f:
        f.write(SQL.encode("utf-8"))
    sftp.close()

    _, o, e = c.exec_command(f"mysql -u root -p{root_pw} --default-character-set=utf8mb4 < {remote}")
    print(o.read().decode("utf-8", errors="replace") or e.read().decode("utf-8", errors="replace"))
    c.exec_command(f"rm -f {remote}")
    c.close()


if __name__ == "__main__":
    main()
