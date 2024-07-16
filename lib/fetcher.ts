export default async function fetcher<T>(url: string): Promise<T> {
  const r = await fetch(url);

  if (r.ok) {
    return r.json();
  }

  throw new Error(r.status + " " + r.statusText);
}
