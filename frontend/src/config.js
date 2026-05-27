// Centralised configuration for the Wiki‑ilmix app
// Render will inject the actual API URL at build time via Vite’s env vars.
// You can override locally by creating a `.env` file in the `frontend/` folder.
export const API_ROOT = import.meta.env.VITE_API_ROOT || "http://localhost:8000";

