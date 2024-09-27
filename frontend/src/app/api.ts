// searchHandler
export async function searchHandler(query: string) {
  const response = await fetch(`http://localhost:8080/search/${query}`);
  const data = await response.json();
  return data;
}