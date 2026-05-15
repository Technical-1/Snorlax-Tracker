export function buildIdQueries(ids: string[], chunkSize = 40): string[] {
  const queries: string[] = [];
  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize);
    queries.push(chunk.map((id) => `id:${id}`).join(" OR "));
  }
  return queries;
}
