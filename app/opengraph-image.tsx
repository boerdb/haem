import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Haemo — O₂/CO₂ gasuitwisseling & hemoglobine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const png = await readFile(join(process.cwd(), "public/icons/icon-192.png"));
  const icon = `data:image/png;base64,${png.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #fef2f2 0%, #ffffff 55%, #eff6ff 100%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} width={80} height={80} alt="" />
          <div style={{ fontSize: 44, fontWeight: 700 }}>Haemo</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Gasuitwisseling & hemoglobine
          </div>
          <div style={{ fontSize: 32, color: "#475569", lineHeight: 1.35, maxWidth: 950 }}>
            Interactief: dissociatiecurve, Bohr- en Haldane-effect, CO₂-transport en
            gasuitwisseling in de longen.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 28, fontWeight: 600 }}>
          <div style={{ display: "flex", padding: "10px 22px", borderRadius: 999, background: "#dbeafe", color: "#1d4ed8" }}>
            O₂
          </div>
          <div style={{ display: "flex", padding: "10px 22px", borderRadius: 999, background: "#ffedd5", color: "#c2410c" }}>
            CO₂
          </div>
          <div style={{ display: "flex", padding: "10px 22px", borderRadius: 999, background: "#fee2e2", color: "#b91c1c" }}>
            Hemoglobine
          </div>
        </div>
      </div>
    ),
    size,
  );
}
