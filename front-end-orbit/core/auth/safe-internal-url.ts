/**
 * Só aceita caminhos internos da app (ex.: /user/edit).
 */
export function safeInternalUrl(url: string | null | undefined, fallback = '/home'): string {
  if (!url || !url.startsWith('/') || url.startsWith('//')) {
    return fallback;
  }

  if (url.startsWith('/login') || url.startsWith('/new-user') || url.startsWith('/forget-password')) {
    return fallback;
  }

  return url;
}
