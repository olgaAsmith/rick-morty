import { Character } from '../interfaces';

const baseUrl = 'https://rickandmortyapi.com/api/character';

export async function fetchByIDRickAndMortyCharacters(
  id: string
): Promise<Character | null> {
  try {
    const res = await fetch(`${baseUrl}/${id}`);
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Fail to fetch');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
    throw new Error('Fail');
  }
}


export const fetchFilterRickAndMortyCharacters = async (
  filters?: Record<string, string>
) => {
  const query = new URLSearchParams(filters).toString();
  const url = query ? `${baseUrl}?${query}` : baseUrl;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Fail to fetch');
  } else {
    const data = await res.json();
    return data.results;
  }
};
