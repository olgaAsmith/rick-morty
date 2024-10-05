export interface Character {
  id: string;
  name: string;
  status: 'Dead' | 'Alive' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: string;
  image: string;
  episode: string[];
}
