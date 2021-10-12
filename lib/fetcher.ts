export default async function fetcher<T>(
  ...args: [RequestInfo, RequestInit]
): Promise<T> {
  const r = await fetch(...args);

  if (r.ok) {
    return r.json();
  }

  throw new Error(r.status + " " + r.statusText);
}
