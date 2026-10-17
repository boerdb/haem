import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Haemo — O₂/CO₂ gasuitwisseling & hemoglobine",
    short_name: "Haemo",
    description:
      "Interactieve uitleg van hemoglobine, Bohr- en Haldane-effect, CO₂-transport en gasuitwisseling in de longen.",
    lang: "nl",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#ffffff",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
