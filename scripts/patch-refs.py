#!/usr/bin/env python3
"""Patch literatuurreferenties in haemo_db op .14 (UTF-8)."""
from pathlib import Path
import paramiko

SCRIPT_DIR = Path(__file__).resolve().parent
PASS = "kerkpoort"

SQL = """\
USE haemo_db;
UPDATE references_lit SET title = 'Respiratory Physiology — The Essentials' WHERE citation_key = 'west-2020';
UPDATE references_lit SET title = 'Blood HbO₂ and HbCO₂ dissociation curves at varied O₂, CO₂, pH, 2,3-DPG and temperature' WHERE citation_key = 'dash-2004';
SELECT citation_key, title FROM references_lit ORDER BY year DESC;
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

    remote = "/tmp/haemo_patch_refs.sql"
    sftp = c.open_sftp()
    with sftp.file(remote, "w") as f:
        f.write(SQL.encode("utf-8"))
    sftp.close()

    _, o, e = c.exec_command(f"mysql -u root -p{root_pw} --default-character-set=utf8mb4 < {remote}")
    out = o.read().decode("utf-8", errors="replace") or e.read().decode("utf-8", errors="replace")
    print(out.encode("ascii", errors="backslashreplace").decode("ascii"))
    c.exec_command(f"rm -f {remote}")
    c.close()


if __name__ == "__main__":
    main()
