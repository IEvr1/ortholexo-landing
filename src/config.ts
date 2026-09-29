export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "https://ortholexo.gr";

export const APP_URL =
  import.meta.env.VITE_APP_URL?.replace(/\/$/, "") ?? "https://app.ortholexo.gr";

export const CONTACT_EMAIL = "info@nexaipla.com";

export function appPath(path: string): string {
  return `${APP_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
