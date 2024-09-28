// searchHandler
export async function searchHandler(query: string) {
  const response = await fetch(`http://localhost:8080/search/${query}`);
  const data: { summary: string; topDocuments: { title: string; url: string }[] } = await response.json();
  return data;
}