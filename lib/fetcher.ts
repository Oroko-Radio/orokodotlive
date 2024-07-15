export default async function fetcher<T>(
  url: string,
  apiKey: string
): Promise<T> {
  const r = await fetch(url, { headers: { "x-api-key": apiKey } });

  if (r.ok) {
    return r.json();
  }

  throw new Error(r.status + " " + r.statusText);
}
