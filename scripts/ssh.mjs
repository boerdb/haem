/**
 * Gedeelde SSH-instellingen voor de homelab-scripts: inloggen met een sleutel,
 * niet met een wachtwoord.
 *
 * SSH_KEY_PATH        pad naar de private key (standaard ~/.ssh/id_ed25519_homelab)
 * SSH_KEY_PASSPHRASE  wachtzin van de sleutel, alleen als die er een heeft
 */
import { existsSync, readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

export const DEFAULT_KEY_PATH = join(homedir(), ".ssh", "id_ed25519_homelab");

export function sshOptions(host, username = "root") {
  const keyPath = process.env.SSH_KEY_PATH || DEFAULT_KEY_PATH;
  if (!existsSync(keyPath)) {
    console.error(`SSH-sleutel niet gevonden: ${keyPath} (zet SSH_KEY_PATH)`);
    process.exit(1);
  }
  return {
    host,
    port: 22,
    username,
    privateKey: readFileSync(keyPath),
    passphrase: process.env.SSH_KEY_PASSPHRASE || undefined,
    readyTimeout: 20000,
  };
}
