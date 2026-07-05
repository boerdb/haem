#!/usr/bin/env python3
"""Maak haemo_db + haemo_app user op .14 (zelfde patroon als dash-next-app)."""
from pathlib import Path
import paramiko

SCRIPT_DIR = Path(__file__).resolve().parent
SCHEMA = (SCRIPT_DIR.parent / "sql" / "schema.sql").read_text(encoding="utf-8")
PASS = "kerkpoort"
HOSTS = ["192.168.1.%", "192.168.1.32", "localhost"]


def load_secrets():
    for name in (".secrets.local", ".secrets.local.example"):
        path = SCRIPT_DIR / name
        if path.exists():
            s = {}
            for line in path.read_text().splitlines():
                if "=" in line and not line.strip().startswith("#"):
                    k, v = line.split("=", 1)
                    s[k.strip()] = v.strip()
            return s
    return {
        "DB_HOST": "192.168.1.14",
        "SSH_USER": "root",
        "SSH_PASS": PASS,
        "MYSQL_ROOT_PASS": PASS,
    }


def main():
    s = load_secrets()
    host = s.get("DB_HOST", "192.168.1.14")
    user = s.get("SSH_USER", "root")
    pw = s.get("SSH_PASS", PASS)
    root_pw = s.get("MYSQL_ROOT_PASS", pw)

    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Verbinden met {host}...")
    c.connect(host, username=user, password=pw, timeout=20)

    for h in HOSTS:
        sql = (
            f"CREATE USER IF NOT EXISTS 'haemo_app'@'{h}' IDENTIFIED BY '{PASS}'; "
            f"GRANT ALL PRIVILEGES ON haemo_db.* TO 'haemo_app'@'{h}'; "
        )
        _, o, e = c.exec_command(f"mysql -u root -p{root_pw} -e \"{sql} FLUSH PRIVILEGES;\"")
        out = o.read().decode() + e.read().decode()
        print(out.strip() or f"OK haemo_app@{h}")

    # Schema via temp file on server
    sftp = c.open_sftp()
    remote = "/tmp/haemo_schema.sql"
    with sftp.file(remote, "w") as f:
        f.write(SCHEMA)
    sftp.close()

    _, o, e = c.exec_command(f"mysql -u root -p{root_pw} < {remote}")
    out = o.read().decode() + e.read().decode()
    if out.strip():
        print(out.strip())

    _, o, e = c.exec_command(
        f"mysql -u root -p{root_pw} -e \"USE haemo_db; SELECT COUNT(*) AS presets FROM parameter_presets; SELECT COUNT(*) AS refs FROM references_lit;\""
    )
    print(o.read().decode() or e.read().decode())

    c.exec_command(f"rm -f {remote}")
    c.close()
    print("\nKlaar.")
    print("DATABASE_URL=mysql://haemo_app:kerkpoort@192.168.1.14:3306/haemo_db")


if __name__ == "__main__":
    main()
